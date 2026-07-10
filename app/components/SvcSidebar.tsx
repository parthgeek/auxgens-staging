"use client";

import { useEffect, useRef, useState } from "react";
import { PiCaretLeftDuotone, PiCaretRightDuotone } from "react-icons/pi";
import { detailedServices } from "../data/services";

const SIDE_RAIL_MIN_WIDTH = 1720;
const SIDE_RAIL_SCROLL_Y = 420;

export default function SvcSidebar() {
  const [mode, setMode] = useState<"top" | "side">("top");
  const [sideHidden, setSideHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const sideRailQuery = window.matchMedia(
      `(min-width: ${SIDE_RAIL_MIN_WIDTH}px)`,
    );

    const syncPosition = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (!sideRailQuery.matches || y < SIDE_RAIL_SCROLL_Y) {
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

    syncPosition();

    window.addEventListener("scroll", syncPosition, { passive: true });
    window.addEventListener("resize", syncPosition);
    sideRailQuery.addEventListener("change", syncPosition);

    return () => {
      window.removeEventListener("scroll", syncPosition);
      window.removeEventListener("resize", syncPosition);
      sideRailQuery.removeEventListener("change", syncPosition);
    };
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
          aria-expanded={!sideHidden}
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
