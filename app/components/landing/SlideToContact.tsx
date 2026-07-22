"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PiArrowRightLight, PiCheckLight } from "react-icons/pi";

const KNOB = 52;
const PAD = 5;

export default function SlideToContact({
  href = "/contact-us",
  label = "Slide to connect",
  doneLabel = "Opening…",
  light = false,
}: {
  href?: string;
  label?: string;
  doneLabel?: string;
  /** For dark backgrounds — inverts the track and knob. */
  light?: boolean;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);
  const [done, setDone] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setMax(Math.max(0, el.offsetWidth - KNOB - PAD * 2));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const progress = useTransform(x, [0, max || 1], [0, 1]);
  const labelOpacity = useTransform(progress, [0, 0.55], [1, 0]);
  const fillWidth = useTransform(x, (v) => v + KNOB + PAD * 2);

  const complete = useCallback(() => {
    if (done) return;
    setDone(true);
    animate(x, max, { type: "spring", stiffness: 320, damping: 34 });
    window.setTimeout(() => router.push(href), 260);
  }, [done, href, max, router, x]);

  return (
    <div
      ref={trackRef}
      className={`lx-slide${light ? " lx-slide-light" : ""}${done ? " is-done" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
          e.preventDefault();
          complete();
        }
      }}
    >
      <motion.span className="lx-slide-fill" style={{ width: fillWidth }} aria-hidden="true" />
      <motion.span className="lx-slide-label" style={{ opacity: labelOpacity }}>
        {label}
      </motion.span>
      <span className="lx-slide-done" aria-hidden="true">
        {doneLabel}
      </span>
      <motion.span
        className="lx-slide-knob"
        drag="x"
        dragConstraints={{ left: 0, right: max }}
        dragElastic={0.04}
        dragMomentum={false}
        style={{ x }}
        whileTap={{ scale: reduce ? 1 : 1.05 }}
        onDragEnd={() => {
          if (x.get() >= max * 0.82) complete();
          else animate(x, 0, { type: "spring", stiffness: 420, damping: 38 });
        }}
        aria-hidden="true"
      >
        {done ? <PiCheckLight /> : <PiArrowRightLight />}
      </motion.span>
    </div>
  );
}
