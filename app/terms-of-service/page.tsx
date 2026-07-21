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
    title: "Using This Website",
    body: [
      "You may use this website to learn about Auxgens, review our AI, cybersecurity, compliance, privacy, and secure application development services, and contact us for business enquiries.",
      "You agree not to misuse the website, interfere with its operation, attempt unauthorised access, submit harmful code, scrape content at unreasonable volume, or use the site in a way that violates applicable law.",
    ],
  },
  {
    title: "Services And Engagements",
    body: [
      "Information on this website describes Auxgens capabilities and does not create an AI, consulting, managed services, SOC, Virtual CISO, compliance, privacy, or development engagement by itself.",
      "Any client work will be governed by the applicable proposal, statement of work, order form, master services agreement, data processing terms, or other written agreement signed or accepted by the parties.",
    ],
  },
  {
    title: "Client Responsibilities",
    body: [
      "Clients are responsible for providing accurate information, timely access, authorised points of contact, and any approvals needed for Auxgens to perform agreed work.",
      "For assessments, monitoring, penetration testing, incident response, or secure development work, clients must ensure they have the authority to permit Auxgens activity on the relevant systems, networks, applications, data, and third-party environments.",
    ],
  },
  {
    title: "Security Testing Authorization",
    body: [
      "Auxgens will only perform intrusive security testing, vulnerability validation, or similar technical activity when the scope, permissions, timing, and rules of engagement have been agreed in writing.",
      "Activities outside an agreed scope are not authorised by these Terms of Service and must not be inferred from general website content or marketing descriptions.",
    ],
  },
  {
    title: "Confidentiality",
    body: [
      "Information exchanged during enquiries or engagements may be confidential. Each party should protect confidential information using reasonable care and only use it for the purpose for which it was shared.",
      "More specific confidentiality, security, and data handling obligations may be set out in a separate written agreement.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "The Auxgens name, logo, website content, service descriptions, graphics, and related materials are owned by Auxgens or its licensors and may not be copied, modified, or reused without permission except as allowed by law.",
      "Deliverables, pre-existing tools, templates, methodologies, and client-owned materials will be handled according to the applicable written agreement for the engagement.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "Our website or services may reference third-party platforms, tools, cloud providers, frameworks, or regulatory resources. Auxgens is not responsible for third-party websites or services that we do not control.",
    ],
  },
  {
    title: "Disclaimers",
    body: [
      "Website content is provided for general business information and does not guarantee a security outcome, certification result, audit result, compliance status, or absence of vulnerabilities.",
      "Except where a separate written agreement states otherwise, the website is provided on an as-is and as-available basis.",
    ],
  },
  {
    title: "Limitation Of Liability",
    body: [
      "To the extent permitted by applicable law, Auxgens will not be liable for indirect, incidental, special, consequential, punitive, or exemplary damages arising from website use.",
      "Any liability related to a paid engagement will be governed by the applicable written agreement for that engagement.",
    ],
  },
  {
    title: "Changes To These Terms",
    body: [
      "We may update these Terms of Service as our website, services, or operating requirements change. The latest version will be posted on this page with the updated date.",
    ],
  },
];

export const metadata: Metadata = {
  title: "Terms of Service | Auxgens",
  description:
    "Review the Auxgens Terms of Service for website use, enquiries, and AI, cybersecurity, compliance, privacy, and secure development engagement boundaries.",
};

export default function TermsOfServicePage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav />
      <Announce />
      <main>
        <PageHero
          eyebrow="Legal"
          lines={[
            <Fragment key="a">Terms of</Fragment>,
            <Fragment key="b">
              <em>Service.</em>
            </Fragment>,
          ]}
          lead="The baseline terms for using the Auxgens website and discussing potential AI, security, compliance, privacy, and development work."
        />
        <LegalDoc sections={sections} updated="June 2026" />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
