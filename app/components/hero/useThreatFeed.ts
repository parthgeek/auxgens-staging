"use client";

import { useEffect, useRef, useState } from "react";
import {
  FALLBACK_SNAPSHOT,
  makeAttackEvent,
  type AttackEvent,
  type ThreatSnapshot,
} from "../../data/threats";

type Options = {
  /** ms between generated events */
  interval?: number;
  /** how many recent events to keep */
  keep?: number;
  /** pause generation (e.g. hero scrolled offscreen) */
  paused?: boolean;
};

export function useThreatSnapshot() {
  const [snap, setSnap] = useState<ThreatSnapshot>(FALLBACK_SNAPSHOT);
  useEffect(() => {
    let alive = true;
    fetch("/api/threats")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((s: ThreatSnapshot) => alive && setSnap(s))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return snap;
}

/**
 * Streams visualised attack events, weighted by the live source snapshot.
 * Also returns running counters for the UI.
 */
export function useThreatFeed({ interval = 900, keep = 24, paused = false }: Options = {}) {
  const snapshot = useThreatSnapshot();
  const [events, setEvents] = useState<AttackEvent[]>([]);
  const [count, setCount] = useState(0);
  const srcRef = useRef(snapshot.sources);
  srcRef.current = snapshot.sources;

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tick = () => {
      const e = makeAttackEvent(srcRef.current);
      setEvents((prev) => [e, ...prev].slice(0, keep));
      setCount((c) => c + 1);
    };
    // seed a few so the globe isn't empty on first paint
    for (let i = 0; i < 4; i++) tick();
    const id = window.setInterval(tick, reduce ? interval * 4 : interval);
    return () => window.clearInterval(id);
  }, [interval, keep, paused]);

  return { snapshot, events, count };
}

export function timeAgo(at: number, now: number) {
  const s = Math.max(0, Math.round((now - at) / 1000));
  if (s < 2) return "now";
  if (s < 60) return `${s}s`;
  return `${Math.round(s / 60)}m`;
}

export function useNow(every = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), every);
    return () => window.clearInterval(id);
  }, [every]);
  return now;
}
