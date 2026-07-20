"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
  trigger?: "view" | "mount";
}) {
  const inViewProps =
    trigger === "mount"
      ? { animate: "visible" as const }
      : {
          whileInView: "visible" as const,
          viewport: { once: true, margin: "-10% 0px" },
        };
  return (
    <motion.div
      className={className}
      initial="hidden"
      {...inViewProps}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: gap, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  trigger = "view",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  trigger?: "view" | "mount";
}) {
  const reduce = useReducedMotion();
  const target = { opacity: 1, y: 0 };
  const inViewProps =
    trigger === "mount"
      ? { animate: target }
      : {
          whileInView: target,
          viewport: { once: true, margin: "-12% 0px" },
        };
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      {...inViewProps}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function MaskLines({
  lines,
  className,
  delay = 0,
  stagger = 0.11,
}: {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span className="lx-mask" key={i}>
            <span className="lx-mask-inner">{line}</span>
          </span>
        ))}
      </span>
    );
  }

  const lineVariants: Variants = {
    hidden: { y: "115%", rotate: 1.2 },
    visible: (i: number) => ({
      y: "0%",
      rotate: 0,
      transition: { duration: 1.05, delay: delay + i * stagger, ease: EASE },
    }),
  };

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {lines.map((line, i) => (
        <span className="lx-mask" key={i}>
          <motion.span className="lx-mask-inner" variants={lineVariants} custom={i}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Parallax({
  children,
  className,
  from = -36,
  to = 36,
  style,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [from, to]);
  const y = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.6 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? style : { ...style, y }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(mv, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, mv, to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function Magnetic({
  children,
  className,
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 240, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 240, damping: 18, mass: 0.4 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  return <motion.div className="lx-progress" style={{ scaleX }} />;
}
