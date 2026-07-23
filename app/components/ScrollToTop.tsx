"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollTop}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "6.5rem",
        right: "2rem",
        zIndex: 999,
        width: "2.9rem",
        height: "2.9rem",
        borderRadius: "50%",
        border: "1px solid #d3e5c9",
        padding: 0,
        background: "#fff",
        color: "var(--forest)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(1rem)",
        transition: "opacity 0.3s, transform 0.3s",
        boxShadow: "0 14px 34px -14px rgba(13, 36, 16, 0.35)",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block" }}
      >
        <polyline points="3,12 9,6 15,12" />
      </svg>
    </button>
  );
}
