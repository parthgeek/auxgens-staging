import type { Metadata } from "next";
import Nav from "../components/Nav";
import Announce from "../components/landing/Announce";
import Footer from "../components/Footer";
import SmoothScroll from "../components/landing/SmoothScroll";
import { ScrollProgress } from "../components/landing/motion";
import Stats from "../components/landing/Stats";
import CTA from "../components/landing/CTA";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | Auxgens",
  description:
    "Explore Auxgens AI engineering, cybersecurity, compliance, data protection, application development, and staff augmentation services — including GRC, Virtual CISO, SOC as a Service, GDPR, FERPA, and CCPA.",
};

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav />
      <Announce />
      <main>
        <ServicesContent />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
