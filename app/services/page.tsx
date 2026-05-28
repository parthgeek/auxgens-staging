import type { Metadata } from "next";
import Announce from "../components/Announce";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ScrollFade from "../components/ScrollFade";
import Stats from "../components/Stats";
import { servicePageServices } from "../data/services";

export const metadata: Metadata = {
  title: "Services | Auxgens",
  description:
    "Explore Auxgens cybersecurity, compliance, data protection, security culture, documentation, and secure web and app development services.",
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <Announce />
      <main>
        <section className="hero service-hero">
          <div className="wrap hero-grid">
            <div>
              <div className="hero-badge">
                <div className="badge-dot"></div>
                <span className="eyebrow">Auxgens services</span>
              </div>
              <h1>
                Services built<br />for every <em>layer.</em>
              </h1>
              <div className="hero-metrics">
                <div className="metric"><strong>7</strong><span>Service pillars</span></div>
                <div className="metric-sep"></div>
                <div className="metric"><strong>24/7</strong><span>SOC coverage</span></div>
                <div className="metric-sep"></div>
                <div className="metric"><strong>3</strong><span>Global regions</span></div>
              </div>
            </div>
            <div className="hero-right">
              <p className="hero-tagline">Securing Your Digital Future.</p>
              <p className="hero-desc">
                Auxgens helps organisations protect data, systems, and trust — from security strategy and operations to secure web and app development.
              </p>
              <div className="hero-btns">
                <a href="#services-list" className="btn-lime">View Services</a>
                <a href="#contact" className="btn-border">Contact Us</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="services-list">
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
                Seven service pillars covering every aspect of your security posture, including secure web and app development.
              </p>
            </div>
            <div className="services-grid services-page-grid anim">
              {servicePageServices.map((service) => (
                <div key={service.title} className="service-box">
                  <h4>{service.title}</h4>
                  <ul className="service-list">
                    {service.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Stats />
        <CTA />
      </main>
      <Footer />
      <ScrollFade />
    </>
  );
}
