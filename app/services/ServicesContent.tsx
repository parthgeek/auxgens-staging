"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PageHero from "../components/pages/PageHero";
import SecureSDLCVisual from "../components/pages/SecureSDLCVisual";
import { EASE, Stagger, staggerItem } from "../components/landing/motion";
import { detailedServices } from "../data/services";

type ServiceInsight = { title: string; copy: string; steps: string[] };

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
  "soc-as-a-service": {
    title: "Continuous monitoring with accountable escalation",
    copy:
      "Managed SOC coverage keeps alert triage, investigation, and response coordination moving through defined runbooks and reporting cadences.",
    steps: ["Monitor signals", "Escalate incidents", "Review posture"],
  },
  gdpr: {
    title: "Privacy evidence that can stand up to review",
    copy:
      "Personal data discovery, process alignment, and breach readiness are organised into a maintained compliance programme.",
    steps: ["Discover data", "Align process", "Maintain records"],
  },
  ferpa: {
    title: "Student record protection made operational",
    copy:
      "Education data flows, access controls, vendor risk, and staff handling practices are translated into a maintainable FERPA programme.",
    steps: ["Map records", "Control access", "Maintain evidence"],
  },
  "app-dev": {
    title: "Security built into delivery",
    copy:
      "Application teams get secure patterns, review gates, and testing practices that reduce exposure before code reaches production.",
    steps: ["Design controls", "Test releases", "Harden APIs"],
  },
  "staff-aug": {
    title: "The right people, delivering on plan",
    copy:
      "Vetted specialists integrate with your teams while dedicated project management keeps scope, schedule, and budget visible from kickoff to closure.",
    steps: ["Match talent", "Plan delivery", "Track outcomes"],
  },
  "forward-deployed-engineering": {
    title: "AI embedded into real business workflows",
    copy:
      "A Forward Deployed AI Engineer works inside the client context, turns priority workflows into copilots, agents, and automations, and measures adoption after launch.",
    steps: ["Find use cases", "Build in workflow", "Measure adoption"],
  },
  ccpa: {
    title: "Consumer rights handled with clear ownership",
    copy:
      "Data inventories, request workflows, and processor oversight are kept visible so privacy obligations do not drift between teams.",
    steps: ["Map data use", "Handle requests", "Review processors"],
  },
};

function ServiceNav({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = trackRef.current?.querySelector<HTMLElement>(
      `[data-id="${active}"]`
    );
    link?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <div className="lx-svc-nav">
      <div className="lx-svc-nav-track" role="tablist" ref={trackRef}>
        {detailedServices.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={active === s.id}
            data-id={s.id}
            onClick={() => onSelect(s.id)}
            className={`lx-svc-nav-link${active === s.id ? " is-active" : ""}`}
          >
            {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ServicesContent() {
  const [active, setActive] = useState(detailedServices[0]?.id ?? "");

  /* Highlight the pill for whichever service is currently in view. */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    detailedServices.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const select = (id: string) => {
    setActive(id);
    history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <>
      <PageHero
        eyebrow="Auxgens services"
        lines={[
          <>Protection at</>,
          <>
            every <em>layer.</em>
          </>,
        ]}
        lead="From Forward Deployed AI Engineers to 24/7 security operations, governance, data privacy compliance, secure application development, and specialist team augmentation — Auxgens turns risk, automation, and protection goals into working outcomes."
        meta={[`${detailedServices.length} service pillars`, "24/7 SOC coverage", "Global delivery model"]}
        wide
        visual={<SecureSDLCVisual />}
      />

      <ServiceNav active={active} onSelect={select} />

      {detailedServices.map((service, idx) => {
        const insight = serviceInsights[service.id];
        return (
          <section className="lx-svc" id={service.id} key={service.id}>
            <div className="lx-wrap">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="lx-svc-top">
                  <div className="lx-svc-head">
                    <p className="lx-svc-index">
                      {String(idx + 1).padStart(2, "0")} · {service.eyebrow}
                    </p>
                    <h2 className="lx-svc-title">{service.title}</h2>
                    <p className="lx-svc-desc">{service.description}</p>
                  </div>

                  {service.challenges.length > 0 && (
                    <aside className="lx-svc-challenges">
                      <p className="lx-svc-col-label">Key challenges</p>
                      <ul>
                        {service.challenges.map((c) => (
                          <li key={c}>
                            <span className="lx-svc-challenge-dot" aria-hidden="true" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </aside>
                  )}
                </div>

                <div className="lx-svc-offerings">
                  <p className="lx-svc-col-label">What we deliver</p>
                  <Stagger className="lx-svc-offerings-grid" gap={0.05}>
                    {service.offerings.map((offering) => (
                      <motion.div
                        className="lx-svc-offering"
                        key={offering.name}
                        variants={staggerItem}
                      >
                        <h4 className="lx-svc-offering-name">{offering.name}</h4>
                        <ul>
                          {offering.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </Stagger>
                </div>

                {insight && (
                  <div className="lx-svc-insight">
                    <div>
                      <p className="lx-svc-insight-label">Engagement focus</p>
                      <h4>{insight.title}</h4>
                      <p>{insight.copy}</p>
                    </div>
                    <div className="lx-svc-insight-steps">
                      {insight.steps.map((step, stepIdx) => (
                        <div key={step} className="lx-svc-insight-step">
                          <span>{String(stepIdx + 1).padStart(2, "0")}</span>
                          <strong>{step}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        );
      })}
    </>
  );
}
