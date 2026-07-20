import Nav from "./components/Nav";
import Announce from "./components/landing/Announce";
import Hero from "./components/landing/Hero";
import Marquee from "./components/landing/Marquee";
import TextMarquee from "./components/landing/TextMarquee";
import Foundation from "./components/landing/Foundation";
import Pillars from "./components/landing/Pillars";
import Services from "./components/landing/Services";
import Stats from "./components/landing/Stats";
import About from "./components/landing/About";
import CTA from "./components/landing/CTA";
import Footer from "./components/Footer";
import SmoothScroll from "./components/landing/SmoothScroll";
import { ScrollProgress } from "./components/landing/motion";

export default function Page() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav />
      <Announce />
      <main>
        <Hero />
        <Marquee />
        <Foundation />
        <Pillars />
        <TextMarquee />
        <Services />
        <Stats />
        <About />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
