export default function Hero() {
  const heroPrinciples = [
    {
      gifSrc: "/fingerprint.gif",
      title: "Detect & Analyze",
      body: "Threat hunting & real-time alerts",
    },
    {
      gifSrc: "/shield.gif",
      title: "Defend & Isolate",
      body: "Active defense & containment",
    },
    {
      gifSrc: "/loading.gif",
      title: "Recover & Respond",
      body: "Rapid response & business resilience",
    },
  ];

  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-badge">
            <div className="badge-dot"></div>
            <span className="eyebrow">Trusted across regulated industries globally</span>
          </div>
          <h1>
            Secure Your<br />Every <em>Click.</em><br />Every Layer.
          </h1>
          <div className="hero-metrics">
            <div className="metric"><strong>25+</strong><span>Years of field experience</span></div>
            <div className="metric-sep"></div>
            <div className="metric"><strong>24/7</strong><span>SOC coverage</span></div>
            <div className="metric-sep"></div>
            <div className="metric"><strong>Global</strong><span>Delivery Model</span></div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-triad" aria-label="Cybersecurity detection and response framework">
            {heroPrinciples.map((principle) => (
              <div key={principle.title} className="hero-triad-item">
                <div className="hero-triad-icon">
                  <img
                    src={principle.gifSrc}
                    alt={`${principle.title} icon`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      border: "none",
                      background: "transparent",
                    }}
                  />
                </div>
                <strong>{principle.title}</strong>
                <span>{principle.body}</span>
              </div>
            ))}
          </div>
          <p className="hero-tagline">Securing Your Digital Future.</p>
          <p className="hero-desc">
            Auxgens is a global cybersecurity partner helping organisations protect data, systems, and trust — with{" "}
            <strong>experienced professionals</strong> across Asia, EMEA, and United States of America.
          </p>
          <div className="hero-btns">
            <a href="/contact-us" className="btn-lime">Connect With Us</a>
            <a href="#services" className="btn-border">Our Services</a>
          </div>
        </div>
      </div>
    </section>
  );
}
