import type { Metadata } from "next";
import type { IconType } from "react-icons";
import {
  PiBuildingsDuotone,
  PiClockCountdownDuotone,
  PiEnvelopeSimpleDuotone,
  PiLinkedinLogoDuotone,
  PiMapPinLineDuotone,
  PiShieldCheckDuotone,
} from "react-icons/pi";
import Announce from "../components/Announce";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ScrollFade from "../components/ScrollFade";
import ContactForm from "./ContactForm";

type Office = {
  city: string;
  label: string;
  address: string[];
  icon: IconType;
};

const offices: Office[] = [
  {
    city: "Bengaluru",
    label: "India operations",
    address: ["C3834, Brigade Meadows", "Udayapura, Bengaluru 560082"],
    icon: PiBuildingsDuotone,
  },
  {
    city: "Bothell",
    label: "North America operations",
    address: ["17710, 35th Dr Se", "Bothell, WA 98012"],
    icon: PiMapPinLineDuotone,
  },
];

const responseNotes = [
  { label: "Primary inbox", value: "sales@auxgens.net" },
  { label: "Response window", value: "1 business day" },
  { label: "Coverage", value: "Asia, EMEA, North America" },
];

const linkedInUrl = "https://www.linkedin.com/company/auxgen";

export const metadata: Metadata = {
  title: "Contact Us | Auxgens",
  description:
    "Contact Auxgens for cybersecurity, GRC, Virtual CISO, GDPR, CCPA, and secure application development enquiries.",
};

export default function ContactUsPage() {
  return (
    <>
      <Nav />
      <Announce />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="wrap contact-hero-grid">
            <div className="contact-hero-copy anim">
              <div className="hero-badge">
                <div className="badge-dot"></div>
                <span className="eyebrow">Contact Auxgens</span>
              </div>
              <h1>
                Let&apos;s talk before risk becomes a <em>headline.</em>
              </h1>
              <p className="contact-hero-intro">
                Reach our team for cybersecurity, compliance, privacy, Virtual
                CISO, and secure application development enquiries.
              </p>
              <div className="contact-hero-actions">
                <a href="mailto:sales@auxgens.net" className="btn-lime btn-icon">
                  <PiEnvelopeSimpleDuotone aria-hidden="true" focusable="false" />
                  <span>Email sales</span>
                </a>
                <a href="#contact-form" className="btn-border btn-icon">
                  <PiShieldCheckDuotone aria-hidden="true" focusable="false" />
                  <span>Send enquiry</span>
                </a>
              </div>
            </div>

            <aside className="contact-command anim d1" aria-label="Contact summary">
              <div className="contact-command-top">
                <span>Primary contact</span>
                <PiClockCountdownDuotone aria-hidden="true" focusable="false" />
              </div>
              <a className="contact-email-large" href="mailto:sales@auxgens.net">
                sales@auxgens.net
              </a>
              <div className="contact-signal-list">
                {responseNotes.map((note) => (
                  <div key={note.label} className="contact-signal-row">
                    <span>{note.label}</span>
                    <strong>{note.value}</strong>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="contact-content">
          <div className="wrap contact-content-grid">
            <div className="contact-details anim">
              <p className="eyebrow">Contact</p>
              <h2>Direct lines and office addresses.</h2>
              <p className="contact-details-copy">
                Send your enquiry to the Auxgens sales inbox, or reference the
                closest office for regional coordination.
              </p>

              <div className="contact-channel-list">
                <a className="contact-email-card" href="mailto:sales@auxgens.net">
                  <span className="contact-card-icon">
                    <PiEnvelopeSimpleDuotone aria-hidden="true" focusable="false" />
                  </span>
                  <span>
                    <small>Email</small>
                    <strong>sales@auxgens.net</strong>
                  </span>
                </a>

                <a
                  className="contact-email-card"
                  href={linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-card-icon">
                    <PiLinkedinLogoDuotone aria-hidden="true" focusable="false" />
                  </span>
                  <span>
                    <small>LinkedIn</small>
                    <strong>linkedin.com/company/auxgen</strong>
                  </span>
                </a>
              </div>

              <div className="contact-office-grid">
                {offices.map((office) => {
                  const Icon = office.icon;

                  return (
                    <article key={office.city} className="contact-office-card">
                      <span className="contact-card-icon">
                        <Icon aria-hidden="true" focusable="false" />
                      </span>
                      <div>
                        <small>{office.label}</small>
                        <h3>{office.city}</h3>
                        <address>
                          {office.address.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                        </address>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFade />
    </>
  );
}
