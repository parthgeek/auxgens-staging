"use client";

import { Reveal } from "./motion";

const brands = [
  { id: "dell", name: "Dell", url: "https://www.dell.com/", src: "/dell.png" },
  { id: "rsa", name: "RSA", url: "https://www.rsa.com/", src: "/rsa.png" },
  { id: "versa", name: "Versa", url: "https://versa-networks.com/", src: "/versa-logo-color.svg" },
  { id: "ssrvm", name: "SSRVM", url: "https://ssrvm.org/", src: "/ssrvm.avif" },
  { id: "ibsfintech", name: "IBSFINtech", url: "https://www.ibsfintech.com/", src: "/ibs-new.png" },
  { id: "seceon", name: "Seceon", url: "https://seceon.com/", src: "/seceon.png" },
  { id: "docq", name: "DocQ", url: "https://docq.com/", src: "/docq2.png" },
  { id: "virtusa", name: "Virtusa", url: "https://www.virtusa.com/", src: "/virtusa.png" },
  { id: "bank-of-india", name: "Bank Of India", url: "https://bankofindia.bank.in/", src: "/bank%20of%20india.png" },
];

export default function Marquee() {
  return (
    <section className="lx-marquee" aria-label="Partners and clients">
      <div className="lx-wrap">
        <Reveal y={12}>
          <p className="lx-eyebrow lx-marquee-label">
            Trusted by industry leaders
          </p>
        </Reveal>
      </div>
      <div className="lx-marquee-mask">
        <div className="lx-marquee-track">
          {[0, 1].map((group) => (
            <div
              className="lx-marquee-group"
              key={group}
              aria-hidden={group === 1 || undefined}
            >
              {brands.map((b) => (
                <a
                  key={`${b.id}-${group}`}
                  className={`lx-marquee-item lx-mq-${b.id}`}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={group === 1 ? -1 : 0}
                  aria-label={`Visit ${b.name}`}
                >
                  <img src={b.src} alt={b.name} loading="lazy" />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
