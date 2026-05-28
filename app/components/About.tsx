"use client";
import { useState } from "react";

const checks = [
  {
    title: "Outcome-driven engagements",
    body: "Scoped to measurable risk reduction — not open-ended retainers.",
  },
  {
    title: "Global reach, local expertise",
    body: "Teams embedded across Asia, EMEA, and North America.",
  },
  {
    title: "Certified practitioners",
    body: "CISSP, CISM, CISA certified professionals from regulated industries.",
  },
  {
    title: "Vendor-agnostic approach",
    body: "Best-of-breed tooling and partnerships across RSA, Dell, Seceon, and IBSFINtech — no lock-in.",
  },
];

const certs = [
  { ico: "📋", title: "ISO 27001", sub: "Info Security Management" },
  { ico: "🌐", title: "GDPR", sub: "Data Protection (EU)" },
  { ico: "🔒", title: "CCPA", sub: "California Privacy Act" },
  { ico: "💳", title: "PCI-DSS", sub: "Payment Card Security" },
  { ico: "⚖️", title: "SOX 404", sub: "Financial Compliance" },
  { ico: "✅", title: "SSAE 18", sub: "Service Audits" },
  { ico: "🏥", title: "HIPAA", sub: "Healthcare Privacy" },
  { ico: "🛡️", title: "NIST CSF", sub: "Cybersecurity Framework" },
  { ico: "📊", title: "SOC 2 Type II", sub: "Audited Controls" },
  { ico: "🇮🇳", title: "DPDP Act", sub: "India Privacy Law" },
];

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="section section-alt" id="about">
      <div className="wrap">
        <div className="sec-hdr">
          <div>
            <p className="eyebrow" style={{ marginBottom: ".8rem" }}>About Auxgens</p>
            <div className="h-display">
              Security that moves<br />
              at <em style={{ fontStyle: "italic", color: "var(--lime-2)" }}>your pace.</em>
            </div>
          </div>
        </div>
        <div className="value-grid">
          <div className="anim">
            <p className="value-body">
              Auxgens is a managed cybersecurity partner operating across Asia, EMEA, and North America. We deploy senior practitioners from banking, healthcare, government, and technology sectors — combining deep regulatory expertise with hands-on threat response capability.
            </p>
            <div className="checklist">
              {checks.map((c) => (
                <div key={c.title} className="check-row">
                  <div>
                    <strong>{c.title}</strong>
                    <span>{c.body}</span>
                  </div>
                  <div className="check-ico">✓</div>
                </div>
              ))}
            </div>
          </div>
          <div className="anim d1">
            <div className="certs-box">
              <div className="certs-head">
                <p className="eyebrow">Compliance &amp; Certifications</p>
                <p>Frameworks and standards we implement:</p>
              </div>
              <div className={`certs-grid${expanded ? " expanded" : ""}`}>
                {certs.map((c) => (
                  <div key={c.title} className="cert-item">
                    <div className="cert-ico">{c.ico}</div>
                    <div>
                      <strong>{c.title}</strong>
                      <span>{c.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="view-more-btn"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "View Less" : "View More Certifications"}
              </button>
            </div>
            <div className="trust-banner">
              Every engagement is governed by strict NDA and ISO 27001 data handling controls. We operate on a need-to-know access model with encrypted channels throughout.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
