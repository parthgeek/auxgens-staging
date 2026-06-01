import type { IconType } from "react-icons";
import { PiDatabaseDuotone, PiScalesDuotone, PiShieldCheckDuotone } from "react-icons/pi";

const pillars = [
  {
    icon: PiScalesDuotone,
    title: "Governance & Compliance",
    body: "Frameworks, policies, and oversight that align security to business risk and regulatory requirements. GRC ensures everyone moves in sync.",
  },
  {
    icon: PiShieldCheckDuotone,
    title: "Cyber Security",
    body: "Proactive threat detection and response. Penetration testing, threat hunting, and 24/7 monitoring close vulnerabilities before attackers find them.",
  },
  {
    icon: PiDatabaseDuotone,
    title: "Information Security",
    body: "Data-centric protection across the full lifecycle. Encryption, classification, access controls, and privacy ensure sensitive information stays secure.",
  },
] satisfies Array<{ icon: IconType; title: string; body: string }>;

export default function Pillars() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-hdr">
          <div>
            <p className="eyebrow" style={{ marginBottom: ".8rem" }}>Our Approach</p>
            <div className="h-display">
              Three pillars.<br />
              One integrated <em style={{ fontStyle: "italic", color: "var(--lime-2)" }}>shield.</em>
            </div>
          </div>
          <p className="sec-note">
            Governance, cyber security, and information protection — working together to close every gap.
          </p>
        </div>
        <div className="pillars-grid anim" style={{ marginBottom: "3rem" }}>
          {pillars.map((p) => {
            const Icon = p.icon;

            return (
              <div key={p.title} className="pillar-item">
                <div className="pillar-icon">
                  <Icon aria-hidden="true" focusable="false" />
                </div>
                <h4>{p.title}</h4>
                <p>{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
