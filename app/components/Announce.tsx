"use client";
import { useState, useEffect, useRef } from "react";

const slides: Array<{ text: string; link?: { href: string; label: string } }> = [
  { text: "Securing today for a better tomorrow." },
  {
    text: "Auxgens achieves ISO 27001 certification for",
    link: { href: "https://www.ibsfintech.com/", label: "IBSFINtech →" },
  },
];

export default function Announce() {
  const [idx, setIdx] = useState(0);
  const [state, setState] = useState<"idle" | "exit" | "enter">("idle");
  const nextIdx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextIdx.current = (idx + 1) % slides.length;
      setState("exit");
    }, 4000);
    return () => clearInterval(interval);
  }, [idx]);

  function handleAnimationEnd() {
    if (state === "exit") {
      setIdx(nextIdx.current);
      setState("enter");
    } else if (state === "enter") {
      setState("idle");
    }
  }

  const slide = slides[idx];
  const cls =
    state === "exit"
      ? "announce-slide announce-exit"
      : state === "enter"
      ? "announce-slide announce-enter"
      : "announce-slide";

  return (
    <div className="announce">
      <span className={cls} onAnimationEnd={handleAnimationEnd}>
        {slide.text}{" "}
        {slide.link && (
          <a href={slide.link.href} target="_blank" rel="noopener noreferrer">
            {slide.link.label}
          </a>
        )}
      </span>
    </div>
  );
}
