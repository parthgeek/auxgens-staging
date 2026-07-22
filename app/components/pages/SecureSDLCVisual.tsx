"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const stages = ["Plan", "Design", "Build", "Test", "Release", "Monitor"];

function SecureSDLCVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      className="lx-sdlc"
      aria-label="Secure software development lifecycle: Plan, Design, Build, Test, Release, and Monitor, with security controls applied continuously."
      initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.32 }}
    >
      <svg className="lx-sdlc-map" viewBox="0 0 600 600" aria-hidden="true">
        <circle className="lx-sdlc-orbit lx-sdlc-orbit-outer" cx="300" cy="300" r="220" />
        <circle className="lx-sdlc-orbit lx-sdlc-orbit-inner" cx="300" cy="300" r="154" />
        <path className="lx-sdlc-route" d="M300 80 A220 220 0 1 1 299.9 80" />
        <g className="lx-sdlc-tracer">
          <circle className="lx-sdlc-tracer-tail" r="13">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M300 80 A220 220 0 1 1 299.9 80"
            />
          </circle>
          <circle className="lx-sdlc-tracer-dot" r="5">
            <animateMotion
              dur="12s"
              repeatCount="indefinite"
              path="M300 80 A220 220 0 1 1 299.9 80"
            />
          </circle>
        </g>
      </svg>

      <ol className="lx-sdlc-stages">
        {stages.map((stage, index) => (
          <li className={`lx-sdlc-stage lx-sdlc-stage-${index + 1}`} key={stage}>
            <span className="lx-sdlc-stage-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="lx-sdlc-stage-label">{stage}</span>
          </li>
        ))}
      </ol>

      <div className="lx-sdlc-core">
        <span className="lx-sdlc-scan" aria-hidden="true" />
        <span className="lx-sdlc-shield" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <path d="M24 5 39 11v10c0 10.2-5.7 17.7-15 22-9.3-4.3-15-11.8-15-22V11L24 5Z" />
            <path d="m17.5 24.5 4.2 4.2 9.2-10" />
          </svg>
        </span>
        <span className="lx-sdlc-kicker">
          <span aria-hidden="true" /> Continuous assurance
        </span>
        <strong>Secure SDLC</strong>
        <p>Policy gates at every stage</p>
        <div className="lx-sdlc-controls" aria-label="Security controls">
          <span>SAST</span>
          <span>DAST</span>
          <span>SCA</span>
        </div>
      </div>

      <figcaption>
        <span>Lifecycle signal</span>
        <strong>Controls continuously verified</strong>
      </figcaption>
    </motion.figure>
  );
}

export default memo(SecureSDLCVisual);
