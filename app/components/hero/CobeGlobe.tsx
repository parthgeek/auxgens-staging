"use client";

import createGlobe, { type Arc, type Marker } from "cobe";
import { useEffect, useRef } from "react";
import { HUBS, type AttackEvent, type ThreatSource } from "../../data/threats";

const ARC_LIFE = 2600;

const SEV_RGB: Record<string, [number, number, number]> = {
  low: [0.45, 0.76, 0.21],
  med: [0.96, 0.66, 0.2],
  high: [1, 0.45, 0.22],
  critical: [0.95, 0.24, 0.22],
};

/**
 * Light, dotted cobe globe. Hubs are lime markers (SOC hubs carry ids for
 * CSS-anchored labels), hostile source countries are small red markers
 * sized by today's DShield weight, and attacks are short-lived arcs.
 */
export default function CobeGlobe({
  events,
  sources,
  className,
}: {
  events: AttackEvent[];
  sources: ThreatSource[];
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const state = useRef({ events, sources });
  state.current = { events, sources };
  const drag = useRef<{ x: number; phi: number } | null>(null);
  const extraPhi = useRef(0);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = el.offsetWidth;
    // cobe faces lng L when phi = π − (L·π/180 − π/2). Start on India.
    let phi = Math.PI - ((78 * Math.PI) / 180 - Math.PI / 2);
    let raf = 0;
    let visible = true;

    const globe = createGlobe(el, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi,
      theta: 0.28,
      dark: 0,
      diffuse: 1.25,
      scale: 1,
      mapSamples: 36000,
      mapBrightness: 5.2,
      mapBaseBrightness: 0.02,
      baseColor: [1, 1, 1],
      markerColor: [0.45, 0.76, 0.21],
      glowColor: [0.93, 0.96, 0.91],
      arcColor: [1, 0.4, 0.3],
      arcWidth: 0.5,
      arcHeight: 0.28,
      markerElevation: 0.015,
      opacity: 0.92,
      markers: [],
      arcs: [],
    });

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const ro = new ResizeObserver(() => (width = el.offsetWidth));
    ro.observe(el);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (!drag.current && !reduce) phi += 0.0016;
      const now = Date.now();
      const { events: evs, sources: srcs } = state.current;
      const maxW = Math.max(1, ...srcs.map((s) => s.weight));

      const markers: Marker[] = [
        ...HUBS.map((h) => ({
          location: [h.lat, h.lng] as [number, number],
          size: h.kind === "soc" ? 0.042 : 0.022,
          id: h.kind === "soc" ? h.id : undefined,
        })),
        ...srcs.slice(0, 18).map((s) => ({
          location: [s.lat, s.lng] as [number, number],
          size: 0.012 + (s.weight / maxW) * 0.028,
          color: [0.95, 0.3, 0.26] as [number, number, number],
        })),
      ];

      const arcs: Arc[] = evs
        .filter((e) => now - e.at < ARC_LIFE)
        .map((e) => ({
          from: [e.from.lat, e.from.lng],
          to: [e.to.lat, e.to.lng],
          color: SEV_RGB[e.kind.severity],
        }));

      globe.update({
        phi: phi + extraPhi.current,
        width: width * dpr,
        height: width * dpr,
        markers,
        arcs,
      });
    };
    raf = requestAnimationFrame(frame);
    el.style.opacity = "1";

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      className={className}
      style={{
        width: "100%",
        aspectRatio: "1",
        opacity: 0,
        transition: "opacity 1.2s ease",
        cursor: "grab",
        contain: "layout paint size",
        touchAction: "pan-y",
      }}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, phi: extraPhi.current };
        e.currentTarget.style.cursor = "grabbing";
      }}
      onPointerUp={(e) => {
        drag.current = null;
        e.currentTarget.style.cursor = "grab";
      }}
      onPointerOut={() => (drag.current = null)}
      onPointerMove={(e) => {
        if (!drag.current) return;
        extraPhi.current = drag.current.phi + (e.clientX - drag.current.x) / 200;
      }}
    />
  );
}
