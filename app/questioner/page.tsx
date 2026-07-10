import type { Metadata } from "next";
import Link from "next/link";
import {
  PiArrowRightDuotone,
  PiCertificateDuotone,
  PiClockDuotone,
  PiFingerprintSimpleDuotone,
  PiShieldCheckDuotone,
  PiTargetDuotone,
} from "react-icons/pi";
import type { IconType } from "react-icons";
import Announce from "../components/Announce";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import ScrollFade from "../components/ScrollFade";
import { frameworkSummaries } from "../data/questionnaires";

export const metadata: Metadata = {
  title: "Questionnaire | Auxgens",
  description:
    "Run focused self-assessments for SOC 2, ISO 27001:2022, GDPR, and VAPT readiness.",
};

const iconMap: Record<string, IconType> = {
  certificate: PiCertificateDuotone,
  privacy: PiFingerprintSimpleDuotone,
  shield: PiShieldCheckDuotone,
  target: PiTargetDuotone,
};

export default function QuestionerPage() {
  return (
    <>
      <Nav />
      <Announce />
      <main>
        <section className="questioner-hero">
          <div className="wrap questioner-hero-grid">
            <div className="questioner-hero-copy anim">
              <div className="hero-badge">
                <div className="badge-dot"></div>
                <span className="eyebrow">Compliance questionnaire</span>
              </div>
              <h1 className="questioner-title">
                Readiness checks for practical security teams.
              </h1>
              <p className="questioner-lede">
                Complete a focused 15-20 question assessment, save progress in
                the browser, and receive category scores with prioritized next
                steps.
              </p>
            </div>
            <div className="questioner-hero-panel anim d1" aria-label="Questionnaire summary">
              <div>
                <span className="questioner-panel-kicker">Included frameworks</span>
                <strong>{frameworkSummaries.length}</strong>
              </div>
              <div>
                <span className="questioner-panel-kicker">Total questions</span>
                <strong>
                  {frameworkSummaries.reduce(
                    (total, framework) => total + framework.questionCount,
                    0,
                  )}
                </strong>
              </div>
              <div>
                <span className="questioner-panel-kicker">Scoring</span>
                <strong>Auto</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section questioner-library">
          <div className="wrap">
            <div className="questioner-section-head anim">
              <p className="eyebrow">Choose an assessment</p>
              <h2>Four focused tracks, built from audit-ready control themes.</h2>
            </div>
            <div className="questioner-framework-grid">
              {frameworkSummaries.map((framework, index) => {
                const Icon = iconMap[framework.icon] ?? PiShieldCheckDuotone;

                return (
                  <article
                    key={framework.slug}
                    className={`questioner-framework-card anim d${index}`}
                  >
                    <div className="questioner-card-top">
                      <div className="questioner-card-icon">
                        <Icon aria-hidden="true" focusable="false" />
                      </div>
                      <span className="questioner-difficulty">
                        {framework.difficulty}
                      </span>
                    </div>
                    <h3>{framework.framework}</h3>
                    <p>{framework.description}</p>
                    <div className="questioner-card-meta">
                      <span>{framework.questionCount} questions</span>
                      <span>
                        <PiClockDuotone aria-hidden="true" focusable="false" />
                        {framework.estimatedTime}
                      </span>
                    </div>
                    <div className="questioner-card-cats" aria-label="Categories">
                      {framework.categories.slice(0, 4).map((category) => (
                        <span key={category}>{category}</span>
                      ))}
                    </div>
                    <Link href={`/questioner/${framework.slug}`} className="btn-lime questioner-start">
                      Start Assessment
                      <PiArrowRightDuotone aria-hidden="true" focusable="false" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollFade />
    </>
  );
}
