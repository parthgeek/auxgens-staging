"use client";

const words = [
  "SOC as a Service",
  "Virtual CISO",
  "GRC",
  "Threat Intelligence",
  "GDPR",
  "Zero Trust",
  "AppSec",
  "SOC 2",
  "Incident Response",
];

export default function TextMarquee() {
  const doubled = [...words, ...words];
  return (
    <section className="lx-tm" aria-hidden="true">
      <div className="lx-tm-track">
        {doubled.map((word, i) => (
          <span className="lx-tm-item" key={`${word}-${i}`}>
            <span className="lx-tm-word lx-serif lx-tm-filled">{word}</span>
            <span className="lx-tm-dot" />
          </span>
        ))}
      </div>
    </section>
  );
}
