"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "./motion";

const slides: Array<{ text: string; link?: { href: string; label: string } }> = [
  { text: "Securing today for a better tomorrow." },
  {
    text: "Auxgens achieves ISO 27001 certification for",
    link: { href: "https://www.ibsfintech.com/", label: "IBSFINtech →" },
  },
];

export default function Announce() {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[idx];

  return (
    <div className="lx-announce">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={idx}
          className="lx-announce-slide"
          initial={reduce ? false : { y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduce ? undefined : { y: "-110%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {slide.text}{" "}
          {slide.link && (
            <a href={slide.link.href} target="_blank" rel="noopener noreferrer">
              {slide.link.label}
            </a>
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
