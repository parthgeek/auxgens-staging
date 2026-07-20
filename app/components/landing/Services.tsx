"use client";

import { homepageServices } from "../../data/services";
import SectionHead from "./SectionHead";

const themes = ["lx-stack-deep", "lx-stack-light", "lx-stack-forest"];

/** Sticky stacking cards — each service pins and the next slides over it. */
export default function Services() {
  return (
    <section className="lx-section" id="services">
      <div className="lx-wrap">
        <SectionHead
          eyebrow="Comprehensive coverage"
          lines={[
            <>What we deliver.</>,
            <>
              End-to-end <em>protection.</em>
            </>,
          ]}
          note={`${homepageServices.length} service pillars covering every aspect of your security posture — from embedded AI engineering to 24/7 threat response and audit-ready governance.`}
        />
        <div className="lx-stack">
          {homepageServices.map((s, i) => (
            <div
              className="lx-stack-sticky"
              key={s.title}
              style={{ top: `calc(13vh + ${i * 1.6}vh)` }}
            >
              <article className={`lx-stack-card ${themes[i % themes.length]}`}>
                <div className="lx-stack-top">
                  <span className="lx-stack-num lx-serif" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="lx-stack-tag">
                    {s.items.length} capabilities
                  </span>
                </div>
                <div>
                  <div className="lx-stack-rule" aria-hidden="true" />
                  <div className="lx-stack-row">
                    <h3 className="lx-serif">{s.title}</h3>
                    <ul>
                      {s.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
