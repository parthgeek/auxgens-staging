"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRightIcon,
  ArrowsClockwiseIcon,
  PulseIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { SERVICE_PILLARS, SEVERITY_COLOR } from "../../data/threats";
import { useThreatFeed } from "./useThreatFeed";

const ShieldScene = dynamic(() => import("./ShieldScene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

const PRINCIPLES = [
  { icon: PulseIcon, t: "Monitor", d: "AI-assisted detection across every log, endpoint and identity." },
  { icon: ShieldCheckIcon, t: "Protect", d: "Adaptive controls and automated containment at the edge." },
  { icon: ArrowsClockwiseIcon, t: "Recover", d: "Rapid response, forensics and resilience you can audit." },
];

export default function HeroShield() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const { snapshot, events, count } = useThreatFeed({ interval: 700, paused: !inView });
  const labels = useRef<(HTMLElement | null)[]>([]);
  const [focus, setFocus] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE },
        };

  const latest = events[0];

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-hidden bg-[#f3f7f0] font-sans text-ink antialiased"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-1/2 aspect-square w-[min(1100px,120vw)] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,#ffffff,rgba(255,255,255,0))]" />
        <div className="absolute right-[-6%] top-1/2 aspect-square w-[min(1000px,110vw)] -translate-y-1/2 rounded-full bg-[repeating-radial-gradient(circle,rgba(27,77,34,.06)_0_1px,transparent_1px_64px)] [mask-image:radial-gradient(circle,#000_30%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(12,20,14,.07)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_at_20%_40%,#000,transparent_60%)]" />
      </div>

      <div className="mx-auto grid max-w-[1320px] items-center gap-4 px-5 pb-6 pt-10 sm:px-8 lg:min-h-[max(640px,calc(100svh-150px))] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-0 lg:pt-4">
        {/* copy */}
        <div className="relative z-10 max-w-[620px]">
          <motion.div
            {...rise(0)}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-forest/15 bg-white/70 py-1.5 pl-2 pr-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-forest backdrop-blur"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-forest px-2 py-0.5 text-[9.5px] text-lime">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Shield on
            </span>
            11 layers · 2 SOC hubs · 24/7
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="text-[clamp(2.6rem,5.4vw,5.1rem)] font-medium leading-[0.98] tracking-[-0.048em] text-balance"
          >
            Eleven layers between you and the{" "}
            <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-lime-deep">
              breach.
            </span>
          </motion.h1>

          <motion.p {...rise(0.18)} className="mt-6 max-w-[48ch] text-[1.05rem] leading-relaxed text-ink-2/75">
            Secure your every click, every layer. Auxgens wraps your organisation in managed SOC,
            threat intelligence, GRC and secure engineering — delivered by senior practitioners
            across Asia, EMEA and the United States.
          </motion.p>

          <motion.div {...rise(0.26)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="/contact-us"
              className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_32px_-12px_rgba(12,20,14,.55)] transition hover:bg-forest"
            >
              Book a security review
              <ArrowRightIcon weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="text-[15px] text-ink underline decoration-ink/25 underline-offset-[6px] transition hover:decoration-lime"
            >
              How the layers work
            </a>
          </motion.div>

          <motion.ul {...rise(0.36)} className="mt-10 grid list-none grid-cols-3 gap-4 sm:gap-5 border-t border-ink/10 pt-6 sm:grid-cols-3">
            {PRINCIPLES.map(({ icon: Icon, t, d }) => (
              <li key={t}>
                <span className="mb-2.5 grid h-8 w-8 place-items-center rounded-full bg-white text-forest shadow-[0_4px_14px_rgba(12,20,14,.08)]">
                  <Icon weight="duotone" className="h-4 w-4" />
                </span>
                <p className="text-[14px] font-medium">{t}</p>
                <p className="mt-1 hidden text-[12.5px] leading-snug text-mute sm:block">{d}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* 3D stage */}
        <div className="relative mx-auto mb-24 aspect-square w-full max-w-[760px] sm:mb-0 lg:mr-[-4%]">
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={ready ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <ShieldScene events={events} focus={focus} labelRefs={labels} onReady={() => setReady(true)} />

            {/* orbiting service labels, positioned every frame by the scene */}
            <div className="pointer-events-none absolute inset-0">
              {SERVICE_PILLARS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  ref={(el) => void (labels.current[i] = el)}
                  onMouseEnter={() => setFocus(s.id)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(s.id)}
                  onBlur={() => setFocus(null)}
                  aria-label={s.title}
                  className={cn(
                    "pointer-events-auto absolute left-0 top-0 whitespace-nowrap rounded-full border px-2.5 py-1 font-sans text-[11px] font-medium opacity-0 shadow-[0_6px_18px_rgba(12,20,14,.1)] backdrop-blur transition-colors will-change-transform",
                    focus === s.id
                      ? "border-forest bg-forest text-white"
                      : "border-white/80 bg-white/85 text-ink hover:border-forest/40",
                  )}
                >
                  {s.short}
                </button>
              ))}
            </div>
          </motion.div>

          {/* interception counter */}
          <div className="absolute inset-x-0 top-[calc(100%-1.5rem)] z-10 mx-auto w-full max-w-[360px] sm:inset-x-auto sm:bottom-8 sm:left-2 sm:top-auto sm:mx-0 sm:w-[320px] rounded-2xl border border-white bg-white/80 p-3.5 shadow-[0_20px_50px_-24px_rgba(12,20,14,.4)] backdrop-blur-xl">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">Intercepted at the shield</span>
              <span className="text-xl font-medium tabular-nums tracking-[-0.03em]">{count}</span>
            </div>
            <div className="mt-2 h-[34px] overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                {latest && (
                  <motion.div
                    key={latest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="flex items-start gap-2 text-[12px]"
                  >
                    <span
                      className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: SEVERITY_COLOR[latest.kind.severity] }}
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-ink">
                        {latest.kind.label} · <span className="text-lime-deep">{latest.action}</span>
                      </span>
                      <span className="block truncate font-mono text-[10px] text-mute">
                        {latest.from.name} → {latest.to.name} · {latest.kind.service}
                      </span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <p className="px-5 pb-3 text-center font-mono text-[10px] text-mute/80">
        Projectile origins follow today&rsquo;s most active hostile-source countries
        ({snapshot.live ? snapshot.source : "sample data"}); individual attacks are illustrative.
        Drag the globe to look around.
      </p>
    </section>
  );
}
