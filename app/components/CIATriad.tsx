export default function CIATriad() {
  const triad = [
    {
      gifSrc: "/document.gif",
      title: "Confidentiality",
      body: "Only authorised individuals access sensitive data. Encryption, access controls, and classification ensure information stays private.",
    },
    {
      gifSrc: "/integration.gif",
      title: "Integrity",
      body: "Data remains accurate and unchanged. Detection of unauthorised modifications protects against tampering and corruption.",
    },
    {
      gifSrc: "/24-hours.gif",
      title: "Availability",
      body: "Systems are always accessible when needed. Redundancy, disaster recovery, and incident response keep operations running.",
    },
  ];

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
          {triad.map((t) => (
            <div key={t.title} className="cia-box">
              <div className="cia-icon">
                <img
                  src={t.gifSrc}
                  alt={`${t.title} icon`}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <h4>{t.title}</h4>
              <p>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}