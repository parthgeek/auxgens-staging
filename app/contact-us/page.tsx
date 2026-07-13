import type { Metadata } from "next";
import Image from "next/image";
import {
  PiClockCountdownDuotone,
  PiEnvelopeSimpleDuotone,
} from "react-icons/pi";
import Announce from "../components/Announce";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ScrollFade from "../components/ScrollFade";
import ContactForm from "./ContactForm";

type Office = {
  
  label: string;
  address: string[];
  country: "in" | "us";
  countryName: string;
  phone?: string;
};

const offices: Office[] = [
  {
  
    label: "India operations",
    address: ["C3834, Brigade Meadows", "Udayapura, Bengaluru 560082"],
    country: "in",
    countryName: "India",
  },
  {
  
    label: "United States of America operations",
    address: ["Cedar Park, Austin, TX 78613"],
    country: "us",
    countryName: "United States",
    phone: "+1 360 875 2205",
  },
];

const responseNotes = [
  { label: "Primary inbox", value: "contact@auxgens.net" },
  { label: "Response window", value: "1 business day" },
  { label: "Coverage", value: "Asia, EMEA, United States of America" },
];

const linkedInUrl = "https://www.linkedin.com/company/auxgen";

export const metadata: Metadata = {
  title: "Contact Us | Auxgens",
  description:
    "Contact Auxgens for Forward Deployed AI Engineer, SOC, cybersecurity, GRC, privacy, compliance, and secure application development enquiries.",
};

export default function ContactUsPage() {
  return (
    <>
      <Nav />
      <Announce />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="wrap contact-hero-grid contact-hero-form-grid">
            <ContactForm />

            <aside className="contact-command anim d1" aria-label="Contact summary">
              <div className="contact-command-top">
                <span>Primary contact</span>
                <PiClockCountdownDuotone aria-hidden="true" focusable="false" />
              </div>
              <a className="contact-email-large" href="mailto:contact@auxgens.net">
                contact@auxgens.net
              </a>
              <div className="contact-signal-list">
                {responseNotes.map((note) => (
                  <div key={note.label} className="contact-signal-row">
                    <span>{note.label}</span>
                    <strong>{note.value}</strong>
                  </div>
                ))}
              </div>
              <a href="mailto:contact@auxgens.net" className="btn-lime btn-icon contact-email-action">
                <PiEnvelopeSimpleDuotone aria-hidden="true" focusable="false" />
                <span>Email sales</span>
              </a>
            </aside>
          </div>
        </section>

        <section className="contact-content">
          <div className="wrap">
            <div className="contact-details contact-details-panel anim">
              <p className="eyebrow">Contact</p>
              <h2>Direct lines and office addresses.</h2>
              <p className="contact-details-copy">
                Send your enquiry to the Auxgens sales inbox, or reference the
                closest office for regional coordination.
              </p>

              <div className="contact-channel-list">
                <a className="contact-email-card" href="mailto:contact@auxgens.net">
                  <span className="contact-card-icon" style={{ width: 'auto', height: 'auto' }}>
                    <Image
                      className="contact-channel-image"
                      src="/gmail-removebg-preview.png"
                      alt=""
                      width={60}
                      height={60}
                      style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                    />
                  </span>
                  <span>
                    <small>Email</small>
                    <strong>contact@auxgens.net</strong>
                  </span>
                </a>

                <a
                  className="contact-email-card"
                  href={linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-card-icon" style={{ width: 'auto', height: 'auto' }}>
                    <Image
                      className="contact-channel-image"
                      src="/linkedin-removebg-preview.png"
                      alt=""
                      width={40}
                      height={40}
                      style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    />
                  </span>
                  <span>
                    <small>LinkedIn</small>
                    <strong>Auxgens on LinkedIn</strong>
                  </span>
                </a>
              </div>

              <div className="contact-office-grid">
                {offices.map((office) => (
                  <article key={office.country} className="contact-office-card">
                    <span className="contact-card-icon">
                      <span
                        className={`flag-mark flag-mark-${office.country} contact-flag`}
                        aria-label={`${office.countryName} flag`}
                        role="img"
                      />
                    </span>
                    <div>
                      <small>{office.label}</small>
                      <h3>{office.countryName}</h3>
                      <address>
                        {office.address.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                        {office.phone && (
                          <a href={`tel:${office.phone.replace(/\s/g, "")}`}>
                            {office.phone}
                          </a>
                        )}
                      </address>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFade />
    </>
  );
}
