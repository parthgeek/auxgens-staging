import type { Metadata } from "next";
import Announce from "../components/Announce";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ScrollFade from "../components/ScrollFade";
import Stats from "../components/Stats";
import SvcSidebar from "../components/SvcSidebar";
import { detailedServices } from "../data/services";

type ServiceInsight = {
  title: string;
  copy: string;
  steps: string[];
};

const serviceInsights: Record<string, ServiceInsight> = {
  grc: {
    title: "Assessment to audit-ready operations",
    copy:
      "A practical operating rhythm that maps controls, prioritises gaps, and keeps governance evidence ready for leadership and auditors.",
    steps: ["Map controls", "Prioritise risk", "Track evidence"],
  },
  vciso: {
    title: "Security leadership without the full-time overhead",
    copy:
      "Executive security direction, policy ownership, and incident decision support shaped around the organisation's current maturity.",
    steps: ["Set cadence", "Own policy", "Guide response"],
  },
  cybersecurity: {
    title: "Detection, response, and reporting in one loop",
    copy:
      "Threat monitoring, investigation, and compliance reporting stay connected so security teams can act faster and explain decisions clearly.",
    steps: ["Detect events", "Investigate risk", "Report posture"],
  },
  gdpr: {
    title: "Privacy evidence that can stand up to review",
    copy:
      "Personal data discovery, process alignment, and breach readiness are organised into a maintained compliance programme.",
    steps: ["Discover data", "Align process", "Maintain records"],
  },
  "app-dev": {
    title: "Security built into delivery",
    copy:
      "Application teams get secure patterns, review gates, and testing practices that reduce exposure before code reaches production.",
    steps: ["Design controls", "Test releases", "Harden APIs"],
  },
  ccpa: {
    title: "Consumer rights handled with clear ownership",
    copy:
      "Data inventories, request workflows, and processor oversight are kept visible so privacy obligations do not drift between teams.",
    steps: ["Map data use", "Handle requests", "Review processors"],
  },
};

export const metadata: Metadata = {
  title: "Services | Auxgens",
  description:
    "Explore Auxgens cybersecurity, compliance, data protection, and security services — GRC, Virtual CISO, Cyber Security, GDPR, and CCPA.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <Announce />
      <main>
        {/* ── HERO ── */}
        <section className="hero service-hero">
          <div className="wrap hero-grid">
            <div>
              <div className="hero-badge">
                <div className="badge-dot"></div>
                <span className="eyebrow">Auxgens services</span>
              </div>
              <h1>
                Protection at<br />every <em>layer.</em>
              </h1>
              <div className="hero-metrics">
                <div className="metric">
                  <strong>6</strong>
                  <span>Service pillars</span>
                </div>
                <div className="metric-sep"></div>
                <div className="metric">
                  <strong>24/7</strong>
                  <span>SOC coverage</span>
                </div>
                <div className="metric-sep"></div>
                <div className="metric">
                  <strong>3</strong>
                  <span>Global regions</span>
                </div>
              </div>
            </div>
            <div className="hero-right">
              <p className="hero-tagline">Securing Your Digital Future.</p>
              <p className="hero-desc">
                From governance and risk frameworks to 24/7 security operations
                and data privacy compliance — Auxgens covers every aspect of
                your security posture.
              </p>
              <div className="hero-btns">
                <a href="#grc" className="btn-lime">
                  Explore Services
                </a>
                
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICE SIDEBAR ── */}
        <SvcSidebar />

        {/* ── SERVICE SECTIONS ── */}
        {detailedServices.map((service, idx) => {
          const insight = serviceInsights[service.id];
          const shouldSpanInsight = service.offerings.length % 2 === 0;

          return (
            <section
              key={service.id}
              id={service.id}
              className={`svc-section section${idx % 2 === 1 ? " section-alt" : ""}`}
            >
              <div className="wrap">
                {/* Header */}
                <div className="svc-header anim">
                  <p className="eyebrow" style={{ marginBottom: ".7rem" }}>
                    {service.eyebrow}
                  </p>
                  <h2 className="svc-title">{service.title}</h2>
                  <p className="svc-desc">{service.description}</p>
                </div>

                {/* Body: challenges + offerings */}
                <div className="svc-body anim">
                  {service.challenges.length > 0 && (
                    <div className="svc-challenges">
                      <p className="svc-col-label">Key Challenges</p>
                      <ul className="svc-challenges-list">
                        {service.challenges.map((c) => (
                          <li key={c}>
                            <span className="svc-challenge-dot" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="svc-offerings">
                    <p className="svc-col-label">Our Services</p>
                    <div className="svc-offerings-grid">
                      {service.offerings.map((offering) => (
                        <div key={offering.name} className="svc-offering-group">
                          <h4 className="svc-offering-name">{offering.name}</h4>
                          <ul className="svc-offering-list">
                            {offering.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {insight && (
                        <div
                          className={`svc-offering-group svc-insight-card${
                            shouldSpanInsight ? " svc-insight-wide" : ""
                          }`}
                        >
                          <div>
                            <p className="svc-insight-label">Engagement Focus</p>
                            <h4 className="svc-offering-name">{insight.title}</h4>
                            <p className="svc-insight-copy">{insight.copy}</p>
                          </div>
                          <div className="svc-insight-steps">
                            {insight.steps.map((step, stepIdx) => (
                              <div key={step} className="svc-insight-step">
                                <span>{String(stepIdx + 1).padStart(2, "0")}</span>
                                <strong>{step}</strong>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        <Stats />
        <CTA />
      </main>
      <Footer />
      <ScrollFade />
    </>
  );
}
