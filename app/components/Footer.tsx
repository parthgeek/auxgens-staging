import LogoLockup from "./LogoLockup";

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
            <LogoLockup
              href="#"
              className="foot-logo"
              logoClassName="foot-logo-img"
              taglineClassName="foot-logo-tagline"
            />
            <p>
              Managed cyber &amp; information security across Asia, EMEA, and North America — protecting what matters most to your business.
            </p>
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
