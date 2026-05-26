"use client";
import { useEffect } from "react";

export default function ScrollFade() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const els = document.querySelectorAll(".anim");
    els.forEach((el) => el.classList.add("will-animate"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    const t = setTimeout(() => els.forEach((el) => io.observe(el)), 100);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);
  return null;
}
