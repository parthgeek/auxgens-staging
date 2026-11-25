"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { MeshPhongMaterial, Color } from "three";
import { feature } from "topojson-client";
import countriesTopo from "world-atlas/countries-110m.json";
import {
  HUBS,
  SEVERITY_COLOR,
  type AttackEvent,
  type Hub,
  type ThreatSource,
} from "../../data/threats";

const ARC_MS = 1700;
const RING_MS = 2200;

type Ring = { id: number; lat: number; lng: number; color: string };

type Topo = Parameters<typeof feature>[0];
const topo = countriesTopo as unknown as Topo & {
  objects: { countries: Parameters<typeof feature>[1] };
};
const RAW = (feature(topo, topo.objects.countries) as unknown as GeoJSON.FeatureCollection)
  .features;

// world-atlas ships a few degenerate rings (e.g. a 4×same-point sliver on
// North Korea) that make h3's polygonToCells throw. Drop those rings.
const distinct = (ring: GeoJSON.Position[]) => new Set(ring.map((p) => p.join(","))).size;
const LAND = RAW.flatMap((f) => {
  const g = f.geometry;
  if (g.type === "Polygon") return distinct(g.coordinates[0]) >= 4 ? [f] : [];
  if (g.type === "MultiPolygon") {
    const coordinates = g.coordinates.filter((poly) => distinct(poly[0]) >= 4);
    return coordinates.length ? [{ ...f, geometry: { ...g, coordinates } }] : [];
  }
  return [];
});

// Stable accessors — new function identities make three-globe re-digest layers.
const hexColor = () => "rgba(140, 214, 88, 0.55)";
const pointColor = () => "rgba(255, 90, 78, 0.85)";
const arcStartLat = (d: object) => (d as AttackEvent).from.lat;
const arcStartLng = (d: object) => (d as AttackEvent).from.lng;
const arcEndLat = (d: object) => (d as AttackEvent).to.lat;
const arcEndLng = (d: object) => (d as AttackEvent).to.lng;
const arcColor = (d: object) => [SEVERITY_COLOR[(d as AttackEvent).kind.severity], "#b6f27a"];
const ringColor = (d: object) => (t: number) => {
  const a = Math.max(0, 1 - t);
  return (d as Ring).color + Math.round(a * 255).toString(16).padStart(2, "0");
};
const labelText = (d: object) =>
  (d as Hub).kind === "soc" ? (d as Hub).name.toUpperCase() : "";
const labelDot = (d: object) => ((d as Hub).kind === "soc" ? 0.7 : 0.38);
const labelColor = (d: object) =>
  (d as Hub).kind === "soc" ? "#c9f59a" : "rgba(201,245,154,.75)";
const pointLabel = (d: object) => {
  const s = d as ThreatSource;
  return `<div style="font:500 12px/1.4 var(--font-geist-mono),monospace;padding:6px 9px;background:rgba(5,11,8,.9);border:1px solid rgba(255,255,255,.14);border-radius:8px;color:#eaf6ea">${s.name}<br/><span style="color:#ff8a80">${s.ips} hostile IP${s.ips > 1 ? "s" : ""} in today's top list</span></div>`;
};

export default function ThreatGlobe({
  events,
  sources,
  focusService,
}: {
  events: AttackEvent[];
  sources: ThreatSource[];
  focusService: string | null;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const globe = useRef<GlobeMethods | undefined>(undefined);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [rings, setRings] = useState<Ring[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const seen = useRef(new Set<number>());
  const timers = useRef(new Set<number>());

  // Track container size.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Low-frequency clock to expire arcs.
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  // Impact ring when each arc lands.
  useEffect(() => {
    const later = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.current.delete(id);
        fn();
      }, ms);
      timers.current.add(id);
    };
    for (const e of events) {
      if (seen.current.has(e.id)) continue;
      seen.current.add(e.id);
      const ring: Ring = {
        id: e.id,
        lat: e.to.lat,
        lng: e.to.lng,
        color: SEVERITY_COLOR[e.kind.severity],
      };
      later(() => {
        setRings((r) => [...r, ring]);
        later(() => setRings((r) => r.filter((x) => x.id !== ring.id)), RING_MS);
      }, ARC_MS * 0.8);
    }
    if (seen.current.size > 400) seen.current = new Set(events.map((e) => e.id));
  }, [events]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  // Camera + controls once the canvas exists.
  useEffect(() => {
    const g = globe.current;
    if (!g) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const c = g.controls();
    c.autoRotate = !reduce;
    c.autoRotateSpeed = 0.45;
    c.enableZoom = false;
    c.enablePan = false;
    c.enabled = !touch; // phones scroll the page instead of spinning the globe
    g.pointOfView({ lat: 24, lng: 48, altitude: size.w < 640 ? 2.05 : 2.35 }, 0);
  }, [size.w]);

  const material = useMemo(
    () =>
      new MeshPhongMaterial({
        color: new Color("#07130d"),
        emissive: new Color("#0a1f12"),
        emissiveIntensity: 0.35,
        shininess: 6,
        transparent: true,
        opacity: 0.96,
      }),
    [],
  );

  const arcs = useMemo(
    () =>
      events.filter(
        (e) =>
          now - e.at < ARC_MS * 1.6 && (!focusService || e.kind.serviceId === focusService),
      ),
    [events, now, focusService],
  );

  const pointAltitude = useMemo(() => {
    const maxW = Math.max(1, ...sources.map((s) => s.weight));
    return (d: object) => 0.02 + ((d as ThreatSource).weight / maxW) * 0.22;
  }, [sources]);

  return (
    <div ref={wrap} className="absolute inset-0">
      {size.w > 0 && (
        <Globe
          ref={globe}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={material}
          showAtmosphere
          atmosphereColor="#72c135"
          atmosphereAltitude={0.16}
          showGraticules={false}
          /* continents as hex dots */
          hexPolygonsData={LAND}
          hexPolygonResolution={3}
          hexPolygonMargin={0.42}
          hexPolygonUseDots
          hexPolygonColor={hexColor}
          hexPolygonAltitude={0.004}
          /* hostile source density (live snapshot) */
          pointsData={sources}
          pointLat="lat"
          pointLng="lng"
          pointColor={pointColor}
          pointAltitude={pointAltitude}
          pointRadius={0.32}
          pointResolution={8}
          pointsMerge={false}
          pointLabel={pointLabel}
          /* attack paths */
          arcsData={arcs}
          arcStartLat={arcStartLat}
          arcStartLng={arcStartLng}
          arcEndLat={arcEndLat}
          arcEndLng={arcEndLng}
          arcColor={arcColor}
          arcStroke={0.85}
          arcAltitudeAutoScale={0.42}
          arcDashLength={0.6}
          arcDashGap={1.2}
          arcDashInitialGap={1}
          arcDashAnimateTime={ARC_MS}
          arcsTransitionDuration={0}
          /* impact rings at defended hubs */
          ringsData={rings}
          ringLat="lat"
          ringLng="lng"
          ringColor={ringColor}
          ringMaxRadius={4.5}
          ringPropagationSpeed={3.2}
          ringRepeatPeriod={RING_MS / 2.2}
          /* hubs */
          labelsData={HUBS}
          labelLat="lat"
          labelLng="lng"
          labelText={labelText}
          labelSize={1.5}
          labelDotRadius={labelDot}
          labelColor={labelColor}
          labelResolution={2}
          labelAltitude={0.012}
        />
      )}
    </div>
  );
}
