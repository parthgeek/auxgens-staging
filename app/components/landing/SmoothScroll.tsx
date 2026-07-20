"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: prefersReduced ? 1 : 0.09,
          duration: prefersReduced ? 0 : 1.2,
          smoothWheel: !prefersReduced,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
