import type { IconType } from "react-icons";
import { PiFingerprintDuotone, PiLockKeyDuotone, PiPulseDuotone } from "react-icons/pi";

const triad = [
  {
    icon: PiLockKeyDuotone,
    title: "Confidentiality",
    body: "Only authorised individuals access sensitive data. Encryption, access controls, and classification ensure information stays private.",
  },
  {
    icon: PiFingerprintDuotone,
    title: "Integrity",
    body: "Data remains accurate and unchanged. Detection of unauthorised modifications protects against tampering and corruption.",
  },
  {
    icon: PiPulseDuotone,
    title: "Availability",
    body: "Systems are always accessible when needed. Redundancy, disaster recovery, and incident response keep operations running.",
  },
] satisfies Array<{ icon: IconType; title: string; body: string }>;

export default function CIATriad() {
  return (
    <section className="section section-alt">
      <div className="wrap">
        <div className="sec-hdr">
          <div>
            <p className="eyebrow" style={{ marginBottom: ".8rem" }}>Our Foundation</p>
            <div className="h-display">
              The CIA Triad.<br />
              Security <em style={{ fontStyle: "italic", color: "var(--lime-2)" }}>at its core.</em>
            </div>
          </div>
          <p className="sec-note">
            Every engagement, every service, every control — rooted in the three pillars of information security.
          </p>
        </div>
        <div className="cia-grid anim">
          {triad.map((t) => {
            const Icon = t.icon;

            return (
              <div key={t.title} className="cia-box">
                <div className="cia-icon">
                  <Icon aria-hidden="true" focusable="false" />
                </div>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
