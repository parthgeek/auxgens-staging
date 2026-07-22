"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const disciplines = [
  "Security operations",
  "Risk & governance",
  "Privacy & compliance",
  "Secure engineering",
];

function PractitionerDossierVisual() {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      className="lx-dossier"
      aria-label="Auxgens practitioner dossier showing more than 25 years of combined field experience across security operations, risk and governance, privacy and compliance, and secure engineering."
      initial={reduce ? false : { opacity: 0, y: 28, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 72, damping: 18, delay: 0.3 }}
    >
      <div className="lx-dossier-sheet lx-dossier-sheet-left" aria-hidden="true" />
      <div className="lx-dossier-sheet lx-dossier-sheet-right" aria-hidden="true" />

      <article className="lx-dossier-card">
        <span className="lx-dossier-scan" aria-hidden="true" />

        <header className="lx-dossier-head">
          <div>
            <span className="lx-dossier-overline">Auxgens / Field credential</span>
            <strong>Practitioner dossier</strong>
          </div>
          <span className="lx-dossier-status">
            <span aria-hidden="true" /> Active
          </span>
        </header>

        <div className="lx-dossier-body">
          <div className="lx-dossier-experience">
            <span>Combined field experience</span>
            <strong>25<sup>+</sup></strong>
            <small>Years across regulated environments</small>
          </div>

          <div className="lx-dossier-disciplines">
            <p>Core disciplines</p>
            <ul>
              {disciplines.map((discipline, index) => (
                <li
                  className={`lx-dossier-discipline lx-dossier-discipline-${index + 1}`}
                  key={discipline}
                >
                  <span>{discipline}</span>
                  <i aria-hidden="true">
                    <span />
                  </i>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="lx-dossier-regions">
          <span>Delivery network</span>
          <div>
            <strong>Asia</strong>
            <i aria-hidden="true" />
            <strong>EMEA</strong>
            <i aria-hidden="true" />
            <strong>United States</strong>
          </div>
        </footer>
      </article>

      <div className="lx-dossier-stamp" aria-hidden="true">
        <span>Senior</span>
        <strong>Practitioners</strong>
        <small>Every engagement</small>
      </div>

      <figcaption>
        <span className="lx-dossier-caption-label">Operating principle</span>
        <strong>Experience applied in practice</strong>
        <ul className="lx-dossier-tags">
          <li>Outcome-first</li>
          <li>Vendor-independent</li>
        </ul>
      </figcaption>
    </motion.figure>
  );
}

export default memo(PractitionerDossierVisual);
