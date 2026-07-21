"use client";

import { Reveal } from "../landing/motion";

export type LegalSection = { title: string; body: string[] };

function slug(title: string) {
  return title.toLowerCase().replaceAll(" ", "-");
}

export default function LegalDoc({
  sections,
  updated,
}: {
  sections: LegalSection[];
  updated: string;
}) {
  return (
    <section className="lx-legal">
      <div className="lx-wrap lx-legal-layout">
        <aside className="lx-legal-toc" aria-label="On this page">
          <p>On this page</p>
          {sections.map((section) => (
            <a key={section.title} href={`#${slug(section.title)}`}>
              {section.title}
            </a>
          ))}
        </aside>

        <div className="lx-legal-doc">
          {sections.map((section, i) => (
            <Reveal key={section.title} y={20} delay={Math.min(i, 3) * 0.04}>
              <section id={slug(section.title)} className="lx-legal-section">
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            </Reveal>
          ))}
          <p className="lx-legal-updated">Last updated: {updated}</p>
        </div>
      </div>
    </section>
  );
}
