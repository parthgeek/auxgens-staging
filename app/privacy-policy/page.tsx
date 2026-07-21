import type { Metadata } from "next";
import { Fragment } from "react";
import Nav from "../components/Nav";
import Announce from "../components/landing/Announce";
import Footer from "../components/Footer";
import SmoothScroll from "../components/landing/SmoothScroll";
import { ScrollProgress } from "../components/landing/motion";
import CTA from "../components/landing/CTA";
import PageHero from "../components/pages/PageHero";
import LegalDoc, { type LegalSection } from "../components/pages/LegalDoc";

const sections: LegalSection[] = [
  {
    title: "Information We Collect",
    body: [
      "We collect business contact details you provide when you contact Auxgens, request a proposal, subscribe to updates, or discuss an AI, security, compliance, privacy, or application development engagement.",
      "This may include your name, work email, phone number, company, role, country, message content, engagement requirements, and any documents or technical context you choose to share with us.",
      "We may also collect basic website usage information such as pages viewed, browser type, approximate location, referral source, and device information to understand site performance and protect our systems.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use information to respond to enquiries, assess engagement fit, prepare proposals, deliver contracted services, manage client relationships, improve the website, secure our infrastructure, and meet legal or regulatory obligations.",
      "Where Auxgens supports AI, cybersecurity, governance, privacy, SOC, Virtual CISO, GDPR, CCPA, or secure application development work, project data is used only for the agreed business purpose and handled according to the applicable statement of work or client agreement.",
    ],
  },
  {
    title: "Sharing And Disclosure",
    body: [
      "We do not sell personal information. We may share information with trusted service providers, professional advisers, regulators, or counterparties where needed to operate the business, deliver services, comply with law, or protect rights and security.",
      "When a third party supports an Auxgens engagement, we expect them to handle information under appropriate confidentiality, security, and purpose-limitation obligations.",
    ],
  },
  {
    title: "Cookies And Analytics",
    body: [
      "Our website may use essential cookies or similar technologies for site operation, security, analytics, and performance measurement. You can control cookies through your browser settings, though some site functions may not work as intended if cookies are disabled.",
    ],
  },
  {
    title: "International Handling",
    body: [
      "Auxgens works across Asia, EMEA, and United States of America. Information may be processed in countries where Auxgens, clients, partners, or service providers operate. We apply reasonable safeguards for cross-border handling where required by applicable law or contract.",
    ],
  },
  {
    title: "Retention And Security",
    body: [
      "We retain information for as long as needed for the purpose it was collected, to maintain business records, resolve disputes, comply with legal obligations, and support security operations.",
      "We use administrative, technical, and organisational measures designed to protect information from unauthorised access, loss, misuse, or disclosure. No system is perfectly secure, but we work to keep protection proportionate to the nature of the data and engagement.",
    ],
  },
  {
    title: "Your Choices And Rights",
    body: [
      "Depending on your location and applicable law, you may have rights to request access, correction, deletion, portability, objection, restriction, or opt-out of certain processing. We will respond to valid requests as required by applicable law.",
      "To make a privacy request, contact us at contact@auxgens.net with enough detail for us to identify the relevant information and verify the request.",
    ],
  },
  {
    title: "Updates",
    body: [
      "We may update this Privacy Policy as our website, services, or legal obligations change. The latest version will be posted on this page with the updated date.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy | Auxgens",
  description:
    "Read the Auxgens Privacy Policy for website visitors, enquiries, and AI, cybersecurity, compliance, privacy, and secure application development engagements.",
};

export default function PrivacyPolicyPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav />
      <Announce />
      <main>
        <PageHero
          eyebrow="Legal"
          lines={[
            <Fragment key="a">Privacy</Fragment>,
            <Fragment key="b">
              <em>Policy.</em>
            </Fragment>,
          ]}
          lead="How Auxgens handles information shared through our website, enquiries, proposals, and security consulting engagements."
        />
        <LegalDoc sections={sections} updated="June 2026" />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
