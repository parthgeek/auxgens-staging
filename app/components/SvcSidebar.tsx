"use client";

import { useEffect, useRef, useState } from "react";
import { PiCaretLeftDuotone, PiCaretRightDuotone } from "react-icons/pi";
import { detailedServices } from "../data/services";

const SIDE_RAIL_MIN_WIDTH = 1720;
const SIDE_RAIL_SCROLL_Y = 420;

export default function SvcSidebar() {
  const [mode, setMode] = useState<"top" | "side">("top");
  const [sideHidden, setSideHidden] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const lastY = useRef(0);
  const topNavRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const nav = topNavRef.current;
    if (!nav || mode !== "top") return;

    let itemWidth = 0;

    const syncScrollButtons = () => {
      const maxScrollLeft = nav.scrollWidth - nav.clientWidth;
      setCanScrollLeft(nav.scrollLeft > 2);
      setCanScrollRight(nav.scrollLeft < maxScrollLeft - 2);
    };

    const syncNavLayout = () => {
      const firstVisibleIndex = itemWidth
        ? Math.round(nav.scrollLeft / itemWidth)
        : 0;
      const visibleItemCount = Math.max(1, Math.floor(nav.clientWidth / 280));

      itemWidth = nav.clientWidth / visibleItemCount;
      nav.style.setProperty("--svc-item-width", `${itemWidth}px`);
      nav.scrollLeft = Math.min(
        firstVisibleIndex * itemWidth,
        nav.scrollWidth - nav.clientWidth,
      );
      syncScrollButtons();
    };

    syncNavLayout();
    nav.addEventListener("scroll", syncScrollButtons, { passive: true });
    window.addEventListener("resize", syncNavLayout);

    return () => {
      nav.removeEventListener("scroll", syncScrollButtons);
      window.removeEventListener("resize", syncNavLayout);
    };
  }, [mode]);

  const scrollTopNav = (direction: -1 | 1) => {
    const nav = topNavRef.current;
    if (!nav) return;

    nav.scrollBy({
      left: direction * nav.clientWidth,
      behavior: "smooth",
    });
  };

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

      {mode === "top" && (
        <button
          type="button"
          className="svc-snav-scroll-button svc-snav-scroll-button--left"
          onClick={() => scrollTopNav(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll services left"
        >
          <PiCaretLeftDuotone aria-hidden="true" />
        </button>
      )}

      <nav ref={topNavRef} className="svc-snav-scroll-track">
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

      {mode === "top" && (
        <button
          type="button"
          className="svc-snav-scroll-button svc-snav-scroll-button--right"
          onClick={() => scrollTopNav(1)}
          disabled={!canScrollRight}
          aria-label="Scroll services right"
        >
          <PiCaretRightDuotone aria-hidden="true" />
        </button>
      )}
    </aside>
  );
}
