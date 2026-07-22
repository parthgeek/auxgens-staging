"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  PiArrowsClockwiseLight,
  PiPulseLight,
  PiSealCheckLight,
  PiShieldCheckLight,
} from "react-icons/pi";
import { complianceStandards } from "../../data/complianceStandards";
import { EASE, MaskLines, Reveal, Stagger, staggerItem } from "./motion";
import SlideToContact from "./SlideToContact";

const principles = [
  {
    icon: PiPulseLight,
    title: "Monitor",
    body: "AI-powered visibility & threat detection",
  },
  {
    icon: PiShieldCheckLight,
    title: "Protect",
    body: "Adaptive defense & automated containment",
  },
  {
    icon: PiArrowsClockwiseLight,
    title: "Recover",
    body: "Rapid response & cyber resilience",
  },
];

const metrics = [
  { n: "25+", lbl: "Years of field experience" },
  { n: "24/7", lbl: "SOC coverage" },
  { n: "Global", lbl: "Delivery model" },
];

function HandUnderline({ delay }: { delay: number }) {
  return (
    <svg viewBox="0 0 220 14" fill="none" className="lx-underline" aria-hidden="true">
      <motion.path
        d="M4 9.5C40 4.5 90 3.5 130 6c30 1.8 60 3 86 1.5"
        stroke="#72c135"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 110]), {
    stiffness: 65,
    damping: 30,
  });
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 70]), {
    stiffness: 65,
    damping: 30,
  });
  const clusterY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -70]), {
    stiffness: 65,
    damping: 30,
  });

  return (
    <section className="lx-hero" id="home" ref={ref}>
      <motion.div
        className="lx-hero-bg"
        style={reduce ? undefined : { y: bgY }}
        aria-hidden="true"
      >
        <div className="lx-hero-rings" />
        <div className="lx-hero-dots" />
        <div className="lx-hero-gridlines" />
        <div className="lx-hero-noise" />
        <div className="lx-hero-blob lx-blob-a" />
        <div className="lx-hero-blob lx-blob-b" />
      </motion.div>

      <div className="lx-wrap lx-hero-grid">
        <motion.div
          className="lx-hero-left"
          style={reduce ? undefined : { y: copyY }}
        >
          <Reveal className="lx-hero-badge" y={14} trigger="mount">
            <span className="lx-dot" aria-hidden="true" />
            <span className="lx-eyebrow">Trusted across regulated industries globally</span>
          </Reveal>

          <h1 className="lx-display lx-hero-title">
            <MaskLines
              delay={0.08}
              lines={[
                <>Secure your</>,
                <>
                  <span className="lx-underline-wrap">
                    every <em>click,</em>
                    <HandUnderline delay={1.25} />
                  </span>
                </>,
                <>every layer.</>,
              ]}
            />
          </h1>

          <Reveal delay={0.5} y={22} trigger="mount">
            <p className="lx-hero-desc">
              Auxgens is a global cybersecurity partner helping organisations
              protect data, systems, and trust — with experienced professionals
              across Asia, EMEA, and the United States.
            </p>
          </Reveal>

          <Reveal delay={0.62} y={18} className="lx-hero-btns" trigger="mount">
            <SlideToContact label="Slide to connect" />
            <a href="#services" className="lx-link">
              Our services
            </a>
          </Reveal>

          <Stagger className="lx-hero-metrics" delay={0.7} gap={0.1} trigger="mount">
            {metrics.map((s) => (
              <motion.div className="lx-metric" key={s.lbl} variants={staggerItem}>
                <strong className="lx-serif">{s.n}</strong>
                <span>{s.lbl}</span>
              </motion.div>
            ))}
          </Stagger>
        </motion.div>

        <motion.div
          className="lx-hero-cluster"
          style={reduce ? undefined : { y: clusterY }}
        >
          <motion.div
            className="lx-float-card lx-float-triad"
            initial={reduce ? false : { opacity: 0, y: 34, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -1.4 }}
            transition={{ duration: 1.1, delay: 0.75, ease: EASE }}
            whileHover={{ rotate: 0, y: -6 }}
          >
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div className="lx-float-row" key={p.title}>
                  <span className="lx-float-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="lx-float-copy">
                    <strong>{p.title}</strong>
                    <span>{p.body}</span>
                  </span>
                </div>
              );
            })}
          </motion.div>

          <motion.div
            className="lx-float-card lx-float-note"
            initial={reduce ? false : { opacity: 0, y: 30, rotate: 4 }}
            animate={{ opacity: 1, y: 0, rotate: 1.6 }}
            transition={{ duration: 1.1, delay: 0.95, ease: EASE }}
            whileHover={{ rotate: 0, y: -5 }}
          >
            <span className="lx-float-note-icon" aria-hidden="true">
              <PiSealCheckLight />
            </span>
            <div className="lx-float-note-body">
              <strong>Compliance we deliver against</strong>
              <ul className="lx-float-chips">
                {complianceStandards.map((c) => (
                  <li key={c.title}>{c.title}</li>
                ))}
              </ul>
              <span>Compliance-first delivery, audit-ready evidence.</span>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <motion.div
        className="lx-scroll-hint"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1, ease: EASE }}
      >
        <span className="lx-scroll-line" />
        Scroll
      </motion.div>
    </section>
  );
}
