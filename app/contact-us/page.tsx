import type { Metadata } from "next";
import { Fragment } from "react";
import Nav from "../components/Nav";
import Announce from "../components/landing/Announce";
import Footer from "../components/Footer";
import SmoothScroll from "../components/landing/SmoothScroll";
import { ScrollProgress } from "../components/landing/motion";
import PageHero from "../components/pages/PageHero";
import ContactDetails from "./ContactDetails";

export const metadata: Metadata = {
  title: "Contact Us | Auxgens",
  description:
    "Contact Auxgens for Forward Deployed AI Engineer, SOC, cybersecurity, GRC, privacy, compliance, and secure application development enquiries.",
};

export default function ContactUsPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav />
      <Announce />
      <main>
        <PageHero
          eyebrow="Get in touch"
          lines={[
            <Fragment key="a">Let&rsquo;s close</Fragment>,
            <Fragment key="b">
              the <em>gap.</em>
            </Fragment>,
          ]}
          lead="Tell us what needs protection. Auxgens responds through the primary sales inbox within one business day — across Asia, EMEA, and the United States."
        />
        <ContactDetails />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
