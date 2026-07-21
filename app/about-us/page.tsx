import type { Metadata } from "next";
import Nav from "../components/Nav";
import Announce from "../components/landing/Announce";
import Footer from "../components/Footer";
import SmoothScroll from "../components/landing/SmoothScroll";
import { ScrollProgress } from "../components/landing/motion";
import Stats from "../components/landing/Stats";
import CTA from "../components/landing/CTA";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us | Auxgens",
  description:
    "Auxgens is a managed cybersecurity partner operating across Asia, EMEA, and United States of America — senior practitioners, measurable outcomes, no lock-in.",
};

export default function AboutPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav />
      <Announce />
      <main>
        <AboutContent />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
