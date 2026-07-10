import { homepageServices } from "../data/services";

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
            {homepageServices.length} service pillars covering every aspect of your security posture — from embedded AI engineering to 24/7 threat response and audit-ready governance.
          </p>
        </div>
        <div className="services-grid anim">
          {homepageServices.map((s) => (
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
