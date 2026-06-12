"use client";

import { useEffect, useRef, useState } from "react";
import { PiCaretLeftDuotone, PiCaretRightDuotone } from "react-icons/pi";
import { detailedServices } from "../data/services";

export default function SvcSidebar() {
  const [mode, setMode] = useState<"top" | "side">("top");
  const [sideHidden, setSideHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (y < 380) {
        setMode("top");
        setSideHidden(false);
        return;
      }

      setMode("side");

      if (delta > 6) {
        setSideHidden(true);
      } else if (delta < -6) {
        setSideHidden(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cls = [
    "svc-snav",
    mode === "side" ? "svc-snav--side" : "svc-snav--top",
    mode === "side" && sideHidden ? "svc-snav--hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={cls} aria-label="Service navigation">
      {mode === "side" && (
        <button
          className="svc-snav-toggle"
          onClick={() => setSideHidden((v) => !v)}
          aria-label={sideHidden ? "Show service nav" : "Hide service nav"}
        >
          {sideHidden ? (
            <PiCaretRightDuotone aria-hidden="true" />
          ) : (
            <PiCaretLeftDuotone aria-hidden="true" />
          )}
        </button>
      )}

      <nav>
        <ul className="svc-snav-list">
          {detailedServices.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="svc-snav-link">
                <span className="svc-snav-eyebrow">{s.eyebrow}</span>
                <span className="svc-snav-title">{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
