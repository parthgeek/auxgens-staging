"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  PiClockCountdownLight,
  PiLockSimpleLight,
  PiSealCheckLight,
} from "react-icons/pi";
import { MaskLines, Reveal } from "./motion";

const triad = [
  {
    icon: PiLockSimpleLight,
    index: "01",
    title: "Confidentiality",
    body: "Only authorised individuals access sensitive data. Encryption, access controls, and classification ensure information stays private.",
  },
  {
    icon: PiSealCheckLight,
    index: "02",
    title: "Integrity",
    body: "Data remains accurate and unchanged. Detection of unauthorised modifications protects against tampering and corruption.",
  },
  {
    icon: PiClockCountdownLight,
    index: "03",
    title: "Availability",
    body: "Systems are always accessible when needed. Redundancy, disaster recovery, and incident response keep operations running.",
  },
];

function TriadCard({ item }: { item: (typeof triad)[number] }) {
  const Icon = item.icon;
  return (
    <article className="lx-cia-card">
      <span className="lx-cia-num lx-serif" aria-hidden="true">
        {item.index}
      </span>
      <span className="lx-cia-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3 className="lx-serif">{item.title}</h3>
      <p>{item.body}</p>
    </article>
  );
}

function IntroPanel() {
  return (
    <div className="lx-cia-intro">
      <Reveal y={14}>
        <p className="lx-eyebrow">Our foundation</p>
      </Reveal>
      <h2 className="lx-display lx-cia-title">
        <MaskLines
          delay={0.1}
          lines={[
            <>The CIA triad.</>,
            <>
              Security <em>at its core.</em>
            </>,
          ]}
        />
      </h2>
      <Reveal delay={0.25} y={16}>
        <p className="lx-cia-note">
          Every engagement, every service, every control — rooted in the three
          pillars of information security.
        </p>
      </Reveal>
      <Reveal delay={0.4} y={10}>
        <p className="lx-cia-hint" aria-hidden="true">
          <span className="lx-cia-hint-line" />
          Scroll to explore
        </p>
      </Reveal>
    </div>
  );
}

/** Pinned section — vertical scroll drives the triad gallery horizontally. */
export default function Foundation() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const update = () => setStaticMode(mq.matches || !!reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: ref });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    mass: 0.6,
  });
  const x = useTransform(smooth, [0, 1], ["0%", "-35%"]);
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
  });

  if (staticMode) {
    return (
      <section className="lx-section" id="foundation">
        <div className="lx-wrap">
          <IntroPanel />
          <div className="lx-cia-static">
            {triad.map((t) => (
              <TriadCard item={t} key={t.title} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="lx-cia" id="foundation" ref={ref}>
      <div className="lx-cia-sticky">
        <motion.div className="lx-cia-track" style={{ x }}>
          <IntroPanel />
          {triad.map((t) => (
            <TriadCard item={t} key={t.title} />
          ))}
        </motion.div>
        <div className="lx-cia-progress" aria-hidden="true">
          <motion.span style={{ scaleX: progressScale }} />
        </div>
      </div>
    </section>
  );
}
