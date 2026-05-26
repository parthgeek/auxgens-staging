import Nav from "./components/Nav";
import Announce from "./components/Announce";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import CIATriad from "./components/CIATriad";
import Pillars from "./components/Pillars";
import Services from "./components/Services";
import Stats from "./components/Stats";
import About from "./components/About";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ScrollFade from "./components/ScrollFade";

export default function Page() {
  return (
    <>
      <Nav />
      <Announce />
      <Hero />
      <Ticker />
      <CIATriad />
      <Pillars />
      <Services />
      <Stats />
      <About />
      <CTA />
      <Footer />
      <ScrollFade />
    </>
  );
}
