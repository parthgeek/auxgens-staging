const services = [
  {
    title: "Threat & Risk Intelligence",
    items: [
      "Cyber risk analytics",
      "Vulnerability management",
      "Security assessments",
      "Threat modelling",
      "Architecture reviews",
      "Forensic analytics",
    ],
  },
  {
    title: "Infrastructure Security",
    items: [
      "SOC-as-a-Service (24/7)",
      "SIEM & monitoring",
      "Incident response",
      "Endpoint solutions",
      "Threat intelligence",
      "Network architecture",
    ],
  },
  {
    title: "Governance & Compliance",
    items: [
      "ISO 27001 implementation",
      "GDPR & privacy compliance",
      "PCI-DSS & SOX audits",
      "Cloud security assessment",
      "BCP/DR consulting",
      "CISO-as-a-Service",
    ],
  },
  {
    title: "Data Protection",
    items: [
      "Data classification",
      "Encryption strategies",
      "Data loss prevention",
      "Privacy-by-design",
      "Application security",
      "Payment security",
    ],
  },
  {
    title: "Security Culture",
    items: [
      "Security awareness training",
      "Staff programmes",
      "Developer training",
      "Phishing simulations",
      "Compliance education",
      "Leadership workshops",
    ],
  },
  {
    title: "Documentation & Support",
    items: [
      "Security policies",
      "Procedures & guidelines",
      "SOP templates",
      "Standards documentation",
      "Audit readiness",
      "DPO-as-a-Service",
    ],
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sec-hdr">
          <div>
            <p className="eyebrow" style={{ marginBottom: ".8rem" }}>Comprehensive Coverage</p>
            <div className="h-display">
              What we deliver.<br />
              End-to-end <em style={{ fontStyle: "italic", color: "var(--lime-2)" }}>protection.</em>
            </div>
          </div>
          <p className="sec-note">
            Six service pillars covering every aspect of your security posture — from risk assessment to 24/7 threat response.
          </p>
        </div>
        <div className="services-grid anim">
          {services.map((s) => (
            <div key={s.title} className="service-box">
              <h4>{s.title}</h4>
              <ul className="service-list">
                {s.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
