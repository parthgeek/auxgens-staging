"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { geoContains } from "d3-geo";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import landTopo from "world-atlas/land-110m.json";
import {
  HUBS,
  SERVICE_PILLARS,
  SEVERITY_COLOR,
  type AttackEvent,
} from "../../data/threats";

/* ───────────────────────── geometry helpers ───────────────────────── */

const R_EARTH = 1;
const R_SHIELD = 1.42;
const MAX_IMPACTS = 10;
const FLIGHT_MS = 1300;

function toVec(lat: number, lng: number, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

type Topo = Parameters<typeof feature>[0];
const topo = landTopo as unknown as Topo & { objects: { land: Parameters<typeof feature>[1] } };
const LAND = feature(topo, topo.objects.land) as unknown as GeoJSON.FeatureCollection;

/** Fibonacci-sphere samples that fall on land. */
function landPoints(n: number) {
  const out: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lng = ((((i * golden) % (2 * Math.PI)) * 180) / Math.PI) - 180;
    if (geoContains(LAND, [lng, lat])) {
      const v = toVec(lat, lng, R_EARTH * 1.003);
      out.push(v.x, v.y, v.z);
    }
  }
  return new Float32Array(out);
}

/* ───────────────────────────── Earth ───────────────────────────── */

function Earth({ spin }: { spin: React.RefObject<THREE.Group | null> }) {
  const pts = useMemo(() => landPoints(16000), []);
  const hubPts = useMemo(() => {
    const a: number[] = [];
    HUBS.forEach((h) => {
      const v = toVec(h.lat, h.lng, R_EARTH * 1.01);
      a.push(v.x, v.y, v.z);
    });
    return new Float32Array(a);
  }, []);

  return (
    <group ref={spin}>
      <mesh>
        <sphereGeometry args={[R_EARTH, 64, 64]} />
        <meshStandardMaterial color="#10301a" roughness={0.8} metalness={0.1} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pts, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#a3e46c" size={0.018} sizeAttenuation transparent opacity={0.95} />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubPts, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e9ffd2" size={0.06} sizeAttenuation />
      </points>
    </group>
  );
}

/* ─────────────────────────── Atmosphere ─────────────────────────── */

function Atmosphere() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        uniforms: { uColor: { value: new THREE.Color("#72c135") } },
        vertexShader: /* glsl */ `
          varying vec3 vN;
          void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor; varying vec3 vN;
          void main(){ float i = pow(clamp(0.68 - dot(vN, vec3(0,0,1.)), 0., 1.), 2.2); gl_FragColor = vec4(uColor, i * .9); }`,
      }),
    [],
  );
  return (
    <mesh material={mat} scale={1.12}>
      <sphereGeometry args={[R_EARTH, 48, 48]} />
    </mesh>
  );
}

/* ───────────────────────────── Shield ───────────────────────────── */

type Impact = { dir: THREE.Vector3; t: number; color: THREE.Color };

function Shield({ impacts }: { impacts: React.RefObject<Impact[]> }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.FrontSide,
        uniforms: {
          uTime: { value: 0 },
          uImpacts: { value: Array.from({ length: MAX_IMPACTS }, () => new THREE.Vector4(0, 1, 0, -99)) },
          uImpactColors: { value: Array.from({ length: MAX_IMPACTS }, () => new THREE.Color()) },
          uBase: { value: new THREE.Color("#72c135") },
        },
        vertexShader: /* glsl */ `
          varying vec3 vPos; varying vec3 vN; varying vec3 vView;
          void main(){
            vPos = normalize(position);
            vec4 mv = modelViewMatrix*vec4(position,1.);
            vN = normalize(normalMatrix*normal);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix*mv;
          }`,
        fragmentShader: /* glsl */ `
          #define N ${MAX_IMPACTS}
          uniform float uTime; uniform vec4 uImpacts[N]; uniform vec3 uImpactColors[N]; uniform vec3 uBase;
          varying vec3 vPos; varying vec3 vN; varying vec3 vView;
          float hexGrid(vec2 p){
            p *= vec2(1., 1.1547);
            vec2 a = mod(p, vec2(1., 1.7320508)) - vec2(.5, .8660254);
            vec2 b = mod(p - vec2(.5, .8660254), vec2(1., 1.7320508)) - vec2(.5, .8660254);
            vec2 g = dot(a,a) < dot(b,b) ? a : b;
            vec2 q = abs(g);
            float d = max(q.x*.8660254 + q.y*.5, q.y);
            return smoothstep(.43, .5, d);
          }
          void main(){
            float facing = abs(dot(vN, vView));
            float rim = pow(1. - facing, 2.4);
            vec2 sph = vec2(atan(vPos.z, vPos.x) * 6., asin(vPos.y) * 12.);
            float hex = hexGrid(sph * 1.4);
            vec3 col = uBase;
            float a = rim * .34 + hex * .028 + rim * hex * .2;
            for (int i = 0; i < N; i++) {
              float age = uTime - uImpacts[i].w;
              if (age < 0. || age > 1.6) continue;
              float d = acos(clamp(dot(vPos, uImpacts[i].xyz), -1., 1.));
              float r = age * .55;
              float ring = smoothstep(.06, 0., abs(d - r)) * (1. - age / 1.6);
              float core = smoothstep(.25, 0., d) * max(0., 1. - age * 2.2);
              float local = smoothstep(.55, 0., d) * (1. - age / 1.6);
              col = mix(col, uImpactColors[i], clamp(ring + core, 0., 1.));
              a += ring * .9 + core * .8 + hex * local * .6;
            }
            gl_FragColor = vec4(col, clamp(a, 0., .95));
          }`,
      }),
    [],
  );

  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime;
    const list = impacts.current ?? [];
    const u = mat.uniforms.uImpacts.value as THREE.Vector4[];
    const c = mat.uniforms.uImpactColors.value as THREE.Color[];
    for (let i = 0; i < MAX_IMPACTS; i++) {
      const imp = list[i];
      if (imp) {
        u[i].set(imp.dir.x, imp.dir.y, imp.dir.z, imp.t);
        c[i].copy(imp.color);
      } else u[i].w = -99;
    }
  });

  return (
    <mesh material={mat} renderOrder={2}>
      <sphereGeometry args={[R_SHIELD, 96, 96]} />
    </mesh>
  );
}

/* ─────────────────────────── Projectiles ─────────────────────────── */

type Shot = {
  id: number;
  from: THREE.Vector3;
  hit: THREE.Vector3;
  born: number; // clock seconds
  color: THREE.Color;
};

const MAX_SHOTS = 32;

function Projectiles({
  shots,
  impacts,
}: {
  shots: React.RefObject<Shot[]>;
  impacts: React.RefObject<Impact[]>;
}) {
  const heads = useRef<THREE.InstancedMesh>(null);
  const tails = useRef<THREE.InstancedMesh>(null);
  const tmp = useMemo(() => new THREE.Object3D(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const color = useMemo(() => new THREE.Color(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const list = shots.current ?? [];
    let n = 0;
    for (let i = list.length - 1; i >= 0; i--) {
      const s = list[i];
      const k = (t - s.born) / (FLIGHT_MS / 1000);
      if (k >= 1) {
        // impact!
        impacts.current?.unshift({ dir: s.hit.clone().normalize(), t, color: s.color });
        if (impacts.current && impacts.current.length > MAX_IMPACTS) impacts.current.length = MAX_IMPACTS;
        list.splice(i, 1);
        continue;
      }
      if (n >= MAX_SHOTS) continue;
      const e = 1 - Math.pow(1 - k, 1.6);
      const pos = s.from.clone().lerp(s.hit, e);
      const dir = s.hit.clone().sub(s.from).normalize();
      tmp.position.copy(pos);
      tmp.quaternion.setFromUnitVectors(up, dir);
      tmp.scale.setScalar(1);
      tmp.updateMatrix();
      heads.current?.setMatrixAt(n, tmp.matrix);
      // tail sits behind the head
      tmp.position.copy(pos).addScaledVector(dir, -0.26);
      tmp.scale.set(1, 1, 1);
      tmp.updateMatrix();
      tails.current?.setMatrixAt(n, tmp.matrix);
      color.copy(s.color);
      heads.current?.setColorAt(n, color);
      tails.current?.setColorAt(n, color);
      n++;
    }
    for (const m of [heads.current, tails.current]) {
      if (!m) continue;
      m.count = n;
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
    }
  });

  return (
    <>
      <instancedMesh ref={heads} args={[undefined, undefined, MAX_SHOTS]} frustumCulled={false}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={tails} args={[undefined, undefined, MAX_SHOTS]} frustumCulled={false}>
        <cylinderGeometry args={[0.02, 0.0, 0.5, 10, 1, true]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.6} depthWrite={false} />
      </instancedMesh>
    </>
  );
}

/* ─────────────────────────── Service orbits ─────────────────────────── */

const RINGS = [
  { r: 1.85, tilt: [0.35, 0, 0.15], speed: 0.12 },
  { r: 2.12, tilt: [-0.5, 0, -0.25], speed: -0.085 },
];

function Orbits({
  labels,
  focus,
}: {
  labels: React.RefObject<(HTMLElement | null)[]>;
  focus: string | null;
}) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const nodes = useRef<(THREE.Mesh | null)[]>([]);
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  const camDir = useMemo(() => new THREE.Vector3(), []);

  const layout = useMemo(
    () =>
      SERVICE_PILLARS.map((s, i) => {
        const ring = i % 2;
        const countOnRing = SERVICE_PILLARS.filter((_, j) => j % 2 === ring).length;
        const idx = Math.floor(i / 2);
        return { ...s, ring, angle: (idx / countOnRing) * Math.PI * 2 + ring * 0.4 };
      }),
    [],
  );

  useFrame(({ clock }, dt) => {
    RINGS.forEach((r, i) => {
      const g = groups.current[i];
      if (g) g.rotation.y += r.speed * dt;
    });
    camera.getWorldDirection(camDir);
    layout.forEach((s, i) => {
      const mesh = nodes.current[i];
      const el = labels.current?.[i];
      if (!mesh || !el) return;
      mesh.getWorldPosition(v);
      // behind the earth? fade
      const facing = -v.clone().normalize().dot(camDir); // 1 = toward camera
      const p = v.clone().project(camera);
      const x = (p.x * 0.5 + 0.5) * size.width;
      const y = (-p.y * 0.5 + 0.5) * size.height;
      const op = THREE.MathUtils.clamp(0.25 + facing * 0.9, 0.12, 1);
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -150%)`;
      el.style.opacity = String(focus && focus !== s.id ? op * 0.35 : op);
      el.style.zIndex = String(Math.round(facing * 100) + 100);
      const target = focus === s.id ? 1.8 : 1;
      mesh.scale.lerp(v.set(target, target, target), 0.15);
    });
    void clock;
  });

  return (
    <>
      {RINGS.map((r, ri) => (
        <group key={ri} rotation={r.tilt as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r.r, 0.0025, 6, 200]} />
            <meshBasicMaterial color="#72c135" transparent opacity={0.35} />
          </mesh>
          <group ref={(g) => void (groups.current[ri] = g)}>
            {layout.map((s, i) =>
              s.ring === ri ? (
                <mesh
                  key={s.id}
                  ref={(m) => void (nodes.current[i] = m)}
                  position={[Math.cos(s.angle) * r.r, 0, Math.sin(s.angle) * r.r]}
                >
                  <sphereGeometry args={[0.035, 16, 16]} />
                  <meshBasicMaterial color="#b6f27a" toneMapped={false} />
                </mesh>
              ) : null,
            )}
          </group>
        </group>
      ))}
    </>
  );
}

/* ─────────────────────────────── Scene ─────────────────────────────── */

function Director({
  events,
  shots,
}: {
  events: AttackEvent[];
  shots: React.RefObject<Shot[]>;
}) {
  const seen = useRef(new Set<number>());
  const spin = useRef<THREE.Group>(null);
  const { clock } = useThree();

  useEffect(() => {
    const g = spin.current;
    for (const e of events) {
      if (seen.current.has(e.id)) continue;
      seen.current.add(e.id);
      const rot = g ? g.rotation.y : 0;
      const target = toVec(e.to.lat, e.to.lng).applyAxisAngle(new THREE.Vector3(0, 1, 0), rot);
      const origin = toVec(e.from.lat, e.from.lng)
        .applyAxisAngle(new THREE.Vector3(0, 1, 0), rot)
        .multiplyScalar(3.6)
        .add(new THREE.Vector3((Math.random() - 0.5) * 1.4, (Math.random() - 0.3) * 1.2, (Math.random() - 0.2) * 0.8));
      // where the segment origin→target pierces the shield
      const dir = target.clone().sub(origin).normalize();
      const b = origin.dot(dir);
      const c = origin.lengthSq() - R_SHIELD * R_SHIELD;
      const disc = b * b - c;
      const tHit = disc > 0 ? -b - Math.sqrt(disc) : origin.length() - R_SHIELD;
      const hit = origin.clone().addScaledVector(dir, Math.max(0, tHit));
      shots.current?.push({
        id: e.id,
        from: origin,
        hit,
        born: clock.elapsedTime,
        color: new THREE.Color(SEVERITY_COLOR[e.kind.severity]),
      });
    }
    if (seen.current.size > 300) seen.current = new Set(events.map((e) => e.id));
  }, [events, shots, clock]);

  // Start with India facing the camera.
  useEffect(() => {
    const v = toVec(20, 78);
    if (spin.current) spin.current.rotation.y = Math.atan2(-v.x, v.z);
  }, []);

  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.035;
  });

  return <Earth spin={spin} />;
}

export default function ShieldScene({
  events,
  focus,
  labelRefs,
  onReady,
}: {
  events: AttackEvent[];
  focus: string | null;
  labelRefs: React.RefObject<(HTMLElement | null)[]>;
  onReady?: () => void;
}) {
  const shots = useRef<Shot[]>([]);
  const impacts = useRef<Impact[]>([]);
  const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const narrow = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.35, narrow ? 6.6 : 5.1], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[-3, 2, 4]} intensity={1.4} color="#f2ffe8" />
      <pointLight position={[3, -2, 2]} intensity={6} color="#72c135" distance={8} />
      <Director events={events} shots={shots} />
      <Atmosphere />
      <Projectiles shots={shots} impacts={impacts} />
      <Shield impacts={impacts} />
      <Orbits labels={labelRefs} focus={focus} />
      <OrbitControls
        enabled={!touch}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.68}
        enableDamping
      />
    </Canvas>
  );
}
