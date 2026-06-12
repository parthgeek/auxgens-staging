import type { Metadata } from "next";
import {
  PiCheckCircleDuotone,
  PiChartDonutDuotone,
  PiClipboardTextDuotone,
  PiCreditCardDuotone,
  PiFingerprintSimpleDuotone,
  PiGlobeSimpleDuotone,
  PiHeartbeatDuotone,
  PiLockSimpleDuotone,
  PiScalesDuotone,
  PiSealCheckDuotone,
  PiShieldCheckDuotone,
  PiTargetDuotone,
  PiUsersThreeDuotone,
  PiArrowRightDuotone,
} from "react-icons/pi";
import type { IconType } from "react-icons";
import Announce from "../components/Announce";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ScrollFade from "../components/ScrollFade";
import Stats from "../components/Stats";

export const metadata: Metadata = {
  title: "About Us | Auxgens",
  description:
    "Auxgens is a managed cybersecurity partner operating across Asia, EMEA, and North America — senior practitioners, measurable outcomes, no lock-in.",
};

const values = [
  {
    icon: PiTargetDuotone,
    title: "Outcome-first",
    body: "Every engagement is scoped to measurable risk reduction. We do not bill by the hour — we close gaps.",
  },
  {
    icon: PiUsersThreeDuotone,
    title: "Senior practitioners, always",
    body: "No junior analysts on client accounts. CISSP, CISM, and CISA certified professionals drawn from banking, healthcare, and government.",
  },
  {
    icon: PiGlobeSimpleDuotone,
    title: "Vendor-agnostic",
    body: "Best-of-breed tooling. Partnerships across RSA, Dell, Seceon, and IBSFINtech — chosen for the client, not the margin.",
  },
  {
    icon: PiShieldCheckDuotone,
    title: "Zero-trust by default",
    body: "Every engagement operates on need-to-know access, encrypted channels, and strict NDA controls. ISO 27001 throughout.",
  },
];

const certs: Array<{ icon: IconType; title: string; sub: string }> = [
  { icon: PiClipboardTextDuotone, title: "ISO 27001", sub: "Info Security Management" },
  { icon: PiGlobeSimpleDuotone, title: "GDPR", sub: "Data Protection (EU)" },
  { icon: PiLockSimpleDuotone, title: "CCPA", sub: "California Privacy Act" },
  { icon: PiCreditCardDuotone, title: "PCI-DSS", sub: "Payment Card Security" },
  { icon: PiScalesDuotone, title: "SOX 404", sub: "Financial Compliance" },
  { icon: PiSealCheckDuotone, title: "SSAE 18", sub: "Service Audits" },
  { icon: PiHeartbeatDuotone, title: "HIPAA", sub: "Healthcare Privacy" },
  { icon: PiShieldCheckDuotone, title: "NIST CSF", sub: "Cybersecurity Framework" },
  { icon: PiChartDonutDuotone, title: "SOC 2 Type II", sub: "Audited Controls" },
  { icon: PiFingerprintSimpleDuotone, title: "DPDP Act", sub: "India Privacy Law" },
];

const differentiators = [
  "Deep regulatory expertise across 10+ compliance frameworks",
  "Global delivery from Bengaluru, Bothell, and EMEA hubs",
  "Embedded practitioners — not offshore ticket queues",
  "Rapid onboarding — operational within 72 hours",
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <Announce />
      <main>

        {/* ── HERO ── */}
        <section className="about-hero">
          <div className="wrap about-hero-inner anim">
            <h1 className="about-hero-h1">
              Security built on<br />
              conviction, not<br />
              compliance <em>theater.</em>
            </h1>
            <div className="about-hero-meta">
              <span>Est. 2018</span>
              <span className="about-meta-sep" />
              <span>Asia · EMEA · North America</span>
              <span className="about-meta-sep" />
              <span>25+ years combined field experience</span>
            </div>
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="section about-story">
          <div className="wrap about-story-grid">
            <div className="about-pull anim">
              <blockquote className="about-quote">
                &ldquo;The gap between compliance paperwork and actual security posture is where organisations get breached.&rdquo;
              </blockquote>
              <p className="about-quote-attr">— Auxgens founding principle</p>
            </div>
            <div className="about-story-body anim d1">
              <p className="eyebrow" style={{ marginBottom: ".9rem" }}>Our story</p>
              <p>
                Auxgens was founded by practitioners who spent decades inside the organisations they now help protect — banks, hospitals, government agencies, and software companies operating under real regulatory scrutiny.
              </p>
              <p style={{ marginTop: "1.2rem" }}>
                That experience revealed a consistent pattern: security programmes built around audit checkboxes leave exploitable gaps. We built Auxgens to close those gaps — with senior talent, vendor-independent advice, and engagements measured by outcomes.
              </p>
              <a href="/contact-us#contact-form" className="about-story-link">
                Talk to our team
                <PiArrowRightDuotone aria-hidden="true" focusable="false" />
              </a>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="section section-alt about-values">
          <div className="wrap">
            <div className="about-values-hdr anim">
              <p className="eyebrow" style={{ marginBottom: ".8rem" }}>What we stand for</p>
              <h2 className="about-values-h2">
                Four principles that<br />shape every engagement.
              </h2>
            </div>
            <div className="about-values-grid">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <article key={v.title} className={`about-value-card anim d${i}`}>
                    <div className="about-value-ico">
                      <Icon aria-hidden="true" focusable="false" />
                    </div>
                    <h3 className="about-value-title">{v.title}</h3>
                    <p className="about-value-body">{v.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DIFFERENTIATORS ── */}
        <section className="section about-diff">
          <div className="wrap about-diff-grid">
            <div className="anim">
              <p className="eyebrow" style={{ marginBottom: ".8rem" }}>Why Auxgens</p>
              <h2 className="about-diff-h2">
                What makes us<br />different in practice.
              </h2>
            </div>
            <ul className="about-diff-list anim d1">
              {differentiators.map((d) => (
                <li key={d} className="about-diff-item">
                  <PiCheckCircleDuotone className="about-diff-check" aria-hidden="true" focusable="false" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section className="section section-alt about-certs-section">
          <div className="wrap">
            <div className="about-certs-hdr anim">
              <p className="eyebrow" style={{ marginBottom: ".8rem" }}>Compliance &amp; Standards</p>
              <h2 className="about-certs-h2">
                Frameworks we implement<br />and operate within.
              </h2>
            </div>
            <div className="about-certs-grid anim d1">
              {certs.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="about-cert-item">
                    <div className="about-cert-ico">
                      <Icon aria-hidden="true" focusable="false" />
                    </div>
                    <strong>{c.title}</strong>
                    <span>{c.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Stats />
        <CTA />
      </main>
      <Footer />
      <ScrollFade />
    </>
  );
}
