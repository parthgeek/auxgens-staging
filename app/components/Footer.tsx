const cols = [
  {
    title: "Services",
    links: ["GRC Consulting", "Cyber Security", "Information Security", "Penetration Testing", "SOC as a Service"],
  },
  { title: "Company", links: ["About Us", "Careers", "Partners", "Blog"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"] },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <strong style={{
              fontSize: ".9rem",
              color: "rgba(237,247,230,.8)",
              letterSpacing: ".15em",
              textTransform: "uppercase",
            }}>
              Auxgens
            </strong>
            <p>
              Managed cyber &amp; information security across Asia, EMEA, and North America — protecting what matters most to your business.
            </p>
            <p className="foot-tag">Securing today for a better tomorrow</p>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="foot-col">
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Auxgens. All rights reserved.</span>
          <span>Bengaluru · Bothell </span>
        </div>
      </div>
    </footer>
  );
}
