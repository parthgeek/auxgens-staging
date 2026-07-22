"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  PiArrowRightLight,
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
  PiTargetLight,
  PiUsersThreeLight,
} from "react-icons/pi";
import PageHero from "../components/pages/PageHero";
import PractitionerDossierVisual from "../components/pages/PractitionerDossierVisual";
import SectionHead from "../components/landing/SectionHead";
import { Reveal, Stagger, staggerItem } from "../components/landing/motion";

const values = [
  {
    icon: PiTargetLight,
    title: "Outcome-first",
    body: "Every engagement is scoped to measurable risk reduction. We do not bill by the hour — we close gaps.",
  },
  {
    icon: PiUsersThreeLight,
    title: "Senior practitioners, always",
    body: "No junior analysts on client accounts. CISSP, CISM, and CISA certified professionals drawn from banking, healthcare, and government.",
  },
  {
    icon: PiGlobeSimpleLight,
    title: "Vendor-agnostic",
    body: "Best-of-breed tooling. Partnerships across RSA, Dell, Seceon, and IBSFINtech — chosen for the client, not the margin.",
  },
  {
    icon: PiShieldCheckLight,
    title: "Zero-trust by default",
    body: "Every engagement runs on a strict need-to-know access model, end-to-end encrypted communications, comprehensive NDA protections, and industry-recognised security standards.",
  },
];

const certs: Array<{ icon: IconType; title: string; sub: string }> = [
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
];

const differentiators = [
  "Deep regulatory expertise across 10+ compliance standards and frameworks.",
  "Global delivery from Cedar Park, Austin, TX, and EMEA hubs.",
  "Consultants available on demand, based on project requirements.",
  "Experienced practitioners with deep expertise in technology, compliance, and regulatory frameworks.",
];

export default function AboutContent() {
  return (
    <>
      <PageHero
        eyebrow="About Auxgens"
        lines={[
          <>Built by</>,
          <>practitioners.</>,
          <>
            For <em>practitioners.</em>
          </>,
        ]}
        lead="A managed cybersecurity partner operating across Asia, EMEA, and the United States — senior talent, vendor-independent advice, and engagements measured by outcomes."
        meta={["Est. 2018", "Asia · EMEA · United States", "25+ years combined field experience"]}
        visual={<PractitionerDossierVisual />}
      />

      {/* ── story ── */}
      <section className="lx-story">
        <div className="lx-wrap lx-story-grid">
          <Reveal y={24}>
            <blockquote className="lx-quote">
              The gap between compliance paperwork and actual security posture is
              where organisations get breached.
            </blockquote>
          </Reveal>
          <Reveal delay={0.15} y={28} className="lx-story-body">
            <p className="lx-eyebrow">Our story</p>
            <p>
              Auxgens is led by senior practitioners and industry professionals
              with extensive experience delivering complex projects across
              diverse sectors, ensuring customer requirements are driven by deep
              domain expertise and proven execution capabilities.
            </p>
            <p>
              That experience revealed a consistent pattern: security programmes
              built around audit checkboxes leave exploitable gaps. We built
              Auxgens to close those gaps — with senior talent, vendor-independent
              advice, and engagements measured by outcomes.
            </p>
            <a href="/contact-us#contact-form" className="lx-inline-link">
              Talk to our team
              <PiArrowRightLight aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── values ── */}
      <section className="lx-section">
        <div className="lx-wrap">
          <SectionHead
            eyebrow="What we stand for"
            lines={[
              <>Four principles that</>,
              <>
                shape every <em>engagement.</em>
              </>,
            ]}
          />
          <Stagger className="lx-values-grid" gap={0.1}>
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.article className="lx-value-card" key={v.title} variants={staggerItem}>
                  <span className="lx-value-ico" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </motion.article>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ── differentiators ── */}
      <section className="lx-section lx-section-tight">
        <div className="lx-wrap">
          <SectionHead
            eyebrow="Why Auxgens"
            lines={[
              <>What makes us</>,
              <>
                different in <em>practice.</em>
              </>,
            ]}
          />
          <Stagger className="lx-checklist" gap={0.09}>
            {differentiators.map((d) => (
              <motion.div className="lx-check-row" key={d} variants={staggerItem}>
                <span className="lx-check-ico" aria-hidden="true">
                  <PiCheckLight />
                </span>
                <span>
                  <strong>{d}</strong>
                </span>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── certifications ── */}
      <section className="lx-section lx-section-tight">
        <div className="lx-wrap">
          <SectionHead
            eyebrow="Compliance & standards"
            lines={[
              <>Frameworks we implement</>,
              <>
                and operate <em>within.</em>
              </>,
            ]}
          />
          <Stagger className="lx-cert-board" gap={0.05}>
            {certs.map((c) => {
              const Icon = c.icon;
              return (
                <motion.div className="lx-cert-tile" key={c.title} variants={staggerItem}>
                  <span className="lx-cert-ico" aria-hidden="true">
                    <Icon />
                  </span>
                  <strong>{c.title}</strong>
                  <span>{c.sub}</span>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>
    </>
  );
}
