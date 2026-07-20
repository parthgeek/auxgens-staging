"use client";

import { type ReactNode } from "react";
import { MaskLines, Reveal } from "./motion";

export default function SectionHead({
  eyebrow,
  lines,
  note,
}: {
  eyebrow: string;
  lines: ReactNode[];
  note?: string;
}) {
  return (
    <div className="lx-sec-head">
      <div className="lx-sec-main">
        <Reveal y={14}>
          <p className="lx-eyebrow">{eyebrow}</p>
        </Reveal>
        <h2 className="lx-display lx-sec-title">
          <MaskLines lines={lines} delay={0.1} />
        </h2>
      </div>
      {note ? (
        <Reveal className="lx-sec-note" delay={0.3} y={18}>
          <p>{note}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
