const pillars = [
  {
    icon: "⚖️",
    title: "Governance & Compliance",
    body: "Frameworks, policies, and oversight that align security to business risk and regulatory requirements. GRC ensures everyone moves in sync.",
  },
  {
    icon: "🛡️",
    title: "Cyber Security",
    body: "Proactive threat detection and response. Penetration testing, threat hunting, and 24/7 monitoring close vulnerabilities before attackers find them.",
  },
  {
    icon: "🔐",
    title: "Information Security",
    body: "Data-centric protection across the full lifecycle. Encryption, classification, access controls, and privacy ensure sensitive information stays secure.",
  },
];

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
          {pillars.map((p) => (
            <div key={p.title} className="pillar-item">
              <div className="pillar-icon">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
