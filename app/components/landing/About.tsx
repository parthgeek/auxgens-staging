"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  PiChartDonutLight,
  PiCheckLight,
  PiClipboardTextLight,
  PiCreditCardLight,
  PiFingerprintSimpleLight,
  PiGlobeSimpleLight,
  PiHeartbeatLight,
  PiLockSimpleLight,
  PiScalesLight,
  PiSealCheckLight,
  PiShieldCheckLight,
} from "react-icons/pi";
import SectionHead from "./SectionHead";
import { Reveal, Stagger, staggerItem } from "./motion";

const checks = [
  {
    title: "Outcome-driven engagements",
    body: "Scoped to measurable risk reduction — not open-ended retainers.",
  },
  {
    title: "Global reach, local expertise",
    body: "Teams embedded across Asia, EMEA, and the United States.",
  },
  {
    title: "Certified practitioners",
    body: "CISSP, CISM, CISA certified professionals from regulated industries.",
  },
  {
    title: "Vendor-agnostic approach",
    body: "Best-of-breed tooling across RSA, Dell, Seceon, and IBSFINtech — no lock-in.",
  },
];

const certs = [
  { icon: PiClipboardTextLight, title: "ISO 27001", sub: "Info Security Management" },
  { icon: PiGlobeSimpleLight, title: "GDPR", sub: "Data Protection (EU)" },
  { icon: PiLockSimpleLight, title: "CCPA", sub: "California Privacy Act" },
  { icon: PiCreditCardLight, title: "PCI-DSS", sub: "Payment Card Security" },
  { icon: PiScalesLight, title: "SOX 404", sub: "Financial Compliance" },
  { icon: PiSealCheckLight, title: "FERPA", sub: "Student Privacy" },
  { icon: PiHeartbeatLight, title: "HIPAA", sub: "Healthcare Privacy" },
  { icon: PiShieldCheckLight, title: "NIST CSF", sub: "Cybersecurity Framework" },
  { icon: PiChartDonutLight, title: "SOC 2 Type II", sub: "Audited Controls" },
  { icon: PiFingerprintSimpleLight, title: "DPDP Act", sub: "India Privacy Law" },
] satisfies Array<{ icon: IconType; title: string; sub: string }>;

export default function About() {
  const [expanded, setExpanded] = useState(false);
  const visibleCerts = expanded ? certs : certs.slice(0, 6);

  return (
    <section className="lx-section" id="about">
      <div className="lx-wrap">
        <SectionHead
          eyebrow="About Auxgens"
          lines={[
            <>Security that moves</>,
            <>
              at <em>your pace.</em>
            </>,
          ]}
        />
        <div className="lx-about-grid">
          <div>
            <Reveal y={24}>
              <p className="lx-about-lead">
                Auxgens is a managed cybersecurity partner operating across
                Asia, EMEA, and the United States. We deploy senior
                practitioners from banking, healthcare, government, and
                technology sectors — combining deep regulatory expertise with
                hands-on threat response capability.
              </p>
            </Reveal>
            <Stagger className="lx-checklist" delay={0.15} gap={0.09}>
              {checks.map((c) => (
                <motion.div className="lx-check-row" key={c.title} variants={staggerItem}>
                  <span className="lx-check-ico" aria-hidden="true">
                    <PiCheckLight />
                  </span>
                  <span>
                    <strong>{c.title}</strong>
                    <span>{c.body}</span>
                  </span>
                </motion.div>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.2} y={30}>
            <div className="lx-certs">
              <p className="lx-eyebrow">Compliance &amp; certifications</p>
              <div className="lx-certs-grid">
                {visibleCerts.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div className="lx-cert" key={c.title}>
                      <span className="lx-cert-ico" aria-hidden="true">
                        <Icon />
                      </span>
                      <span>
                        <strong>{c.title}</strong>
                        <span>{c.sub}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <button
                type="button"
                className="lx-link lx-certs-toggle"
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "View less" : "View all certifications"}
              </button>
              <p className="lx-trust-note">
                Every engagement is governed by strict NDA and ISO 27001 data
                handling controls. We operate on a need-to-know access model
                with encrypted channels throughout.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
