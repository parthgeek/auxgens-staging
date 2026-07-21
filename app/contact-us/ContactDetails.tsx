"use client";

import Image from "next/image";
import { PiClockCountdownLight, PiEnvelopeSimpleLight } from "react-icons/pi";
import SectionHead from "../components/landing/SectionHead";
import { Reveal } from "../components/landing/motion";
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
    label: "United States operations",
    address: ["Office 242, 1205 BMC Drive", "Cedar Park, Austin, TX 78613"],
    country: "us",
    countryName: "United States",
    phone: "+1 360 875 2205",
  },
];

const responseNotes = [
  { label: "Primary inbox", value: "contact@auxgens.net" },
  { label: "Response window", value: "1 business day" },
  { label: "Coverage", value: "Asia · EMEA · US" },
];

const linkedInUrl = "https://www.linkedin.com/company/auxgen";

export default function ContactDetails() {
  return (
    <>
      <section className="lx-section lx-section-tight">
        <div className="lx-wrap lx-contact-grid">
          <Reveal y={26}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.15} y={30}>
            <aside className="lx-contact-aside" aria-label="Contact summary">
              <div className="lx-contact-aside-top">
                <span>Primary contact</span>
                <PiClockCountdownLight aria-hidden="true" />
              </div>
              <a className="lx-contact-email-lg" href="mailto:contact@auxgens.net">
                contact@auxgens.net
              </a>
              <div>
                {responseNotes.map((note) => (
                  <div key={note.label} className="lx-contact-signal">
                    <span>{note.label}</span>
                    <strong>{note.value}</strong>
                  </div>
                ))}
              </div>
              <a
                href="mailto:contact@auxgens.net"
                className="lx-btn"
                style={{ marginTop: "1.6rem" }}
              >
                Email sales
                <span className="lx-btn-chip" aria-hidden="true">
                  <PiEnvelopeSimpleLight />
                </span>
              </a>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="lx-section lx-section-tight">
        <div className="lx-wrap">
          <SectionHead
            eyebrow="Contact"
            lines={[
              <>Direct lines and</>,
              <>
                office <em>addresses.</em>
              </>,
            ]}
            note="Send your enquiry to the Auxgens sales inbox, or reference the closest office for regional coordination."
          />

          <Reveal y={24}>
            <div className="lx-contact-channels">
              <a className="lx-contact-channel" href="mailto:contact@auxgens.net">
                <Image
                  src="/gmail-removebg-preview.png"
                  alt=""
                  width={38}
                  height={38}
                />
                <span>
                  <small>Email</small>
                  <strong>contact@auxgens.net</strong>
                </span>
              </a>
              <a
                className="lx-contact-channel"
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src="/linkedin-removebg-preview.png"
                  alt=""
                  width={38}
                  height={38}
                />
                <span>
                  <small>LinkedIn</small>
                  <strong>Auxgens on LinkedIn</strong>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={24}>
            <div className="lx-contact-offices">
              {offices.map((office) => (
                <article key={office.country} className="lx-contact-office">
                  <span
                    className={`flag-mark flag-mark-${office.country}`}
                    aria-label={`${office.countryName} flag`}
                    role="img"
                  />
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
