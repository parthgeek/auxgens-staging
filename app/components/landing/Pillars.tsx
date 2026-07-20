"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PiCrosshairSimpleLight, PiScalesLight, PiVaultLight } from "react-icons/pi";
import SectionHead from "./SectionHead";
import { EASE } from "./motion";

const pillars = [
  {
    icon: PiScalesLight,
    index: "01",
    title: "Governance Risk & Compliance",
    body: "Frameworks, policies, and oversight that align security to business risk and regulatory requirements. GRC ensures everyone moves in sync.",
  },
  {
    icon: PiCrosshairSimpleLight,
    index: "02",
    title: "Cyber Security",
    body: "Proactive threat detection and response. Penetration testing, threat hunting, and 24/7 monitoring close vulnerabilities before attackers find them.",
  },
  {
    icon: PiVaultLight,
    index: "03",
    title: "Information Security",
    body: "Data-centric protection across the full lifecycle. Encryption, classification, access controls, and privacy ensure sensitive information stays secure.",
  },
];

export default function Pillars() {
  const reduce = useReducedMotion();

  return (
    <section className="lx-section lx-section-tight">
      <div className="lx-wrap">
        <SectionHead
          eyebrow="Our approach"
          lines={[
            <>Three pillars.</>,
            <>
              One integrated <em>shield.</em>
            </>,
          ]}
          note="Governance, cyber security, and information protection — working together to close every gap."
        />
        <div className="lx-pillar-rows">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.article
                className="lx-pillar-row"
                key={p.title}
                initial={reduce ? false : { opacity: 0, x: i % 2 === 0 ? -56 : 56 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-14% 0px" }}
                transition={{ duration: 1, ease: EASE }}
              >
                <span className="lx-pillar-index lx-serif" aria-hidden="true">
                  {p.index}
                </span>
                <div className="lx-pillar-title">
                  <span className="lx-card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="lx-serif">{p.title}</h3>
                </div>
                <p className="lx-pillar-body">{p.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
