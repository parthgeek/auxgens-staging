import Image from "next/image";
import logo from "../../Auxgens_newLogo.png";

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
            <a href="#" className="foot-logo" aria-label="Auxgens home">
              <Image src={logo} alt="Auxgens" className="foot-logo-img" />
            </a>
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
