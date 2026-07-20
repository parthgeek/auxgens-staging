"use client";

import { PiArrowRightLight } from "react-icons/pi";
import { Magnetic, MaskLines, Parallax, Reveal } from "./motion";

export default function CTA() {
  return (
    <section className="lx-cta" id="contact">
      <div className="lx-wrap lx-cta-grid">
        <Parallax from={34} to={-34}>
          <h2 className="lx-display lx-cta-title">
            <MaskLines
              lines={[
                <>Your next breach</>,
                <>attempt doesn&rsquo;t</>,
                <>
                  wait for <em>Monday.</em>
                </>,
              ]}
            />
          </h2>
        </Parallax>
        <div className="lx-cta-side">
          <Reveal delay={0.2} y={24}>
            <p className="lx-cta-desc">
              Let&rsquo;s talk about where your exposure is — and how Auxgens
              closes the gap before adversaries find it. Our team responds
              within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.32} y={20} className="lx-cta-btns">
            <Magnetic>
              <a href="/contact-us#contact-form" className="lx-btn lx-btn-light">
                Send enquiry
                <span className="lx-btn-chip" aria-hidden="true">
                  <PiArrowRightLight />
                </span>
              </a>
            </Magnetic>
            <a href="mailto:contact@auxgens.net" className="lx-link lx-link-light">
              Email us now
            </a>
          </Reveal>
          <Reveal delay={0.44} y={16}>
            <ul className="lx-cta-meta">
              <li>contact@auxgens.net</li>
              <li>Bengaluru, India</li>
              <li>Office 242, 1205 BMC Drive, Cedar Park, Austin, TX 78613</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
