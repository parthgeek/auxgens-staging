export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-badge">
            <div className="badge-dot"></div>
            <span className="eyebrow">Trusted by 150+ enterprises globally</span>
          </div>
          <h1>
            Secure Your<br />Every <em>Click.</em><br />Every Layer.
          </h1>
          <div className="hero-metrics">
            <div className="metric"><strong>150+</strong><span>Enterprise clients</span></div>
            <div className="metric-sep"></div>
            <div className="metric"><strong>24/7</strong><span>SOC coverage</span></div>
            <div className="metric-sep"></div>
            <div className="metric"><strong>3</strong><span>Global regions</span></div>
          </div>
        </div>
        <div className="hero-right">
          <p className="hero-tagline">Securing Your Digital Future.</p>
          <p className="hero-desc">
            Auxgens is a global cybersecurity partner helping organisations protect data, systems, and trust — with{" "}
            <strong>experienced professionals</strong> across Asia, EMEA, and North America.
          </p>
          <div className="hero-btns">
            <a href="#contact" className="btn-lime">Connect With Us</a>
            <a href="#services" className="btn-border">Our Services</a>
          </div>
        </div>
      </div>
    </section>
  );
}
