"use client";

import { type ReactNode } from "react";
import { MaskLines, Reveal } from "../landing/motion";

export default function PageHero({
  eyebrow,
  lines,
  lead,
  meta,
  wide = false,
}: {
  eyebrow: string;
  lines: ReactNode[];
  lead?: ReactNode;
  meta?: string[];
  wide?: boolean;
}) {
  return (
    <section className="lx-page-hero">
      <div className="lx-page-hero-rings" aria-hidden="true" />
      <div className="lx-page-hero-dots" aria-hidden="true" />
      <div className="lx-wrap">
        <div className={`lx-page-hero-inner${wide ? " lx-page-hero-wide" : ""}`}>
          <Reveal className="lx-page-hero-badge" y={14} trigger="mount">
            <span className="lx-dot" aria-hidden="true" />
            <span className="lx-eyebrow">{eyebrow}</span>
          </Reveal>

          <h1 className="lx-display lx-page-hero-title">
            <MaskLines lines={lines} delay={0.08} />
          </h1>

          {lead ? (
            <Reveal delay={0.4} y={20} trigger="mount">
              <p className="lx-page-hero-lead">{lead}</p>
            </Reveal>
          ) : null}

          {meta && meta.length > 0 ? (
            <Reveal delay={0.55} y={16} trigger="mount">
              <div className="lx-page-hero-meta">
                {meta.map((m, i) => (
                  <span key={m} className="lx-page-hero-meta-item">
                    {i > 0 && <span className="lx-page-hero-meta-sep" aria-hidden="true" />}
                    {m}
                  </span>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
