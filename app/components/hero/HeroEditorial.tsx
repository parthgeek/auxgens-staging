"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { HUBS, SERVICE_PILLARS, SEVERITY_COLOR } from "../../data/threats";
import { complianceStandards } from "../../data/complianceStandards";
import { timeAgo, useNow, useThreatFeed } from "./useThreatFeed";

const CobeGlobe = dynamic(() => import("./CobeGlobe"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

const TAGS = [
  { n: "01", t: "24/7 SOC", pos: "left-[6%] top-[14%]" },
  { n: "02", t: "Threat intelligence", pos: "right-[7%] top-[10%]" },
  { n: "03", t: "GRC & compliance", pos: "left-[13%] top-[40%]" },
  { n: "04", t: "AI engineering", pos: "right-[12%] top-[38%]" },
];

/* Labels pinned to cobe's anchor elements (CSS Anchor Positioning). Browsers
   without anchor support simply don't show them. */
function HubLabel({ id, name }: { id: string; name: string }) {
  const style = {
    position: "absolute",
    positionAnchor: `--cobe-${id}`,
    bottom: "anchor(top)",
    left: "anchor(center)",
    translate: "-50% -10px",
    opacity: `var(--cobe-visible-${id}, 0)`,
    transition: "opacity .4s",
  } as CSSProperties;
  return (
    <span
      style={style}
      className="pointer-events-none hidden whitespace-nowrap rounded-full border border-hair bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink shadow-[0_6px_20px_rgba(12,20,14,.08)] backdrop-blur supports-[anchor-name:--a]:block"
    >
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-lime align-middle" />
      {name}
    </span>
  );
}

export default function HeroEditorial() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const { snapshot, events, count } = useThreatFeed({ interval: 750, paused: !inView });
  const now = useNow(1000);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const globeY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const lastHit = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of events) if (!m.has(e.kind.serviceId)) m.set(e.kind.serviceId, e.at);
    return m;
  }, [events]);

  const hostileIps = snapshot.sources.reduce((s, x) => s + x.ips, 0);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 1.1, delay, ease: EASE },
        };

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-hidden bg-paper font-sans text-ink antialiased"
    >
      {/* hairline grid + soft lime haze */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,20,14,.045)_1px,transparent_1px)] bg-[size:calc(100%/12)_100%] [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" />
        <div className="absolute left-1/2 top-[48%] h-[70vw] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(114,193,53,.14),transparent)]" />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 pt-12 text-center sm:px-8 lg:pt-16">
        <motion.p
          {...rise(0)}
          className="mx-auto mb-8 flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-mute"
        >
          <span className="h-px w-8 bg-ink/25" />
          Cyber &amp; information security · Asia · EMEA · US
          <span className="h-px w-8 bg-ink/25" />
        </motion.p>

        <motion.h1
          {...rise(0.08)}
          className="mx-auto max-w-[14ch] text-[clamp(2.75rem,6.6vw,6rem)] font-medium leading-[0.96] tracking-[-0.05em] text-balance"
        >
          Every click secured. Every layer{" "}
          <span className="font-serif text-[1.06em] font-normal italic tracking-[-0.02em] text-lime-deep">
            defended.
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.18)}
          className="mx-auto mt-7 max-w-[54ch] text-[1.075rem] leading-relaxed text-ink-2/75"
        >
          Auxgens is a global cybersecurity partner. Senior practitioners from banking, healthcare
          and government run your SOC, harden your stack and keep you audit-ready — so trust is
          something you can prove.
        </motion.p>

        <motion.div {...rise(0.26)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/contact-us"
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_10px_30px_-10px_rgba(12,20,14,.5)] transition hover:bg-forest"
          >
            Start a conversation
            <ArrowRightIcon weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center rounded-full border border-hair bg-white px-6 py-3.5 text-[15px] text-ink transition hover:border-ink/30"
          >
            See our services
          </a>
        </motion.div>
      </div>

      {/* globe stage */}
      <div className="relative mx-auto -mt-2 h-[clamp(360px,50vw,640px)] max-w-[1400px] sm:mt-4">
        <motion.div
          style={reduce ? undefined : { y: globeY, scale: globeScale }}
          className="absolute left-1/2 top-0 w-[min(920px,130vw)] -translate-x-1/2"
        >
          <div className="relative">
            <CobeGlobe events={events} sources={snapshot.sources} />
            {HUBS.filter((h) => h.kind === "soc").map((h) => (
              <HubLabel key={h.id} id={h.id} name={h.name} />
            ))}
          </div>
        </motion.div>

        {/* bottom fade into page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />

        {/* floating service tags */}
        {TAGS.map((t, i) => (
          <motion.span
            key={t.n}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease: EASE }}
            className={cn(
              "absolute hidden items-center gap-2 rounded-full border border-hair bg-white/80 px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-2 backdrop-blur md:inline-flex",
              t.pos,
            )}
          >
            <span className="text-mute">{t.n}</span>
            {t.t}
          </motion.span>
        ))}

        {/* threat ledger */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE }}
          className="absolute bottom-14 left-5 z-10 hidden w-[330px] rounded-2xl border border-hair bg-white/85 p-4 text-left shadow-[0_24px_60px_-28px_rgba(12,20,14,.35)] backdrop-blur-xl lg:block xl:left-10"
        >
          <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="hk-ping absolute inset-0 rounded-full bg-threat" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-threat" />
              </span>
              Threat ledger
            </span>
            <span className="tabular-nums">{String(count).padStart(4, "0")}</span>
          </div>
          <ul className="space-y-2">
            <AnimatePresence initial={false} mode="popLayout">
              {events.slice(0, 4).map((e) => (
                <motion.li
                  key={e.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex items-start gap-2.5 text-[12.5px]"
                >
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: SEVERITY_COLOR[e.kind.severity] }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-ink">{e.kind.label}</span>
                    <span className="block truncate font-mono text-[10.5px] text-mute">
                      {e.from.name} → {e.to.name}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-lime-deep">{timeAgo(e.at, now)}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>

        {/* services engaged */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE }}
          className="absolute bottom-14 right-5 z-10 hidden w-[280px] rounded-2xl border border-hair bg-white/85 p-4 text-left shadow-[0_24px_60px_-28px_rgba(12,20,14,.35)] backdrop-blur-xl lg:block xl:right-10"
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-mute">Services engaged</p>
          <ul className="grid grid-cols-1 gap-1.5">
            {SERVICE_PILLARS.slice(0, 9).map((s) => {
              const hot = now - (lastHit.get(s.id) ?? 0) < 1800;
              return (
                <li key={s.id} className="flex items-center justify-between text-[12.5px]">
                  <span className={cn("transition-colors duration-500", hot ? "text-ink" : "text-ink/45")}>
                    {s.short}
                  </span>
                  <span
                    className={cn(
                      "grid h-4 w-4 place-items-center rounded-full transition-all duration-500",
                      hot ? "scale-100 bg-lime text-white" : "scale-75 bg-hair text-transparent",
                    )}
                  >
                    <CheckIcon weight="bold" className="h-2.5 w-2.5" />
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>

      {/* compact ledger for small screens */}
      <div className="relative z-10 mx-5 -mt-10 mb-6 rounded-2xl border border-hair bg-white/90 px-4 py-3 text-left shadow-[0_18px_40px_-24px_rgba(12,20,14,.35)] backdrop-blur lg:hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {events.slice(0, 1).map((e) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex items-center gap-3 text-[12.5px]"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: SEVERITY_COLOR[e.kind.severity] }} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-ink">{e.kind.label}</span>
                <span className="block truncate font-mono text-[10.5px] text-mute">
                  {e.from.name} → {e.to.name} · {e.kind.service}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[10.5px] text-lime-deep">{e.action}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* proof strip */}
      <div className="relative border-y border-hair bg-white/60 backdrop-blur">
        <dl className="mx-auto grid max-w-[1240px] grid-cols-2 divide-hair sm:grid-cols-4 sm:divide-x">
          {[
            ["25+", "Years of field experience"],
            ["24/7", "SOC coverage, two hubs"],
            [snapshot.live ? String(hostileIps) : "—", "Hostile sources tracked today"],
            ["11", "Service pillars"],
          ].map(([n, l]) => (
            <div key={l} className="px-5 py-6 text-left sm:px-8">
              <dd className="text-[2rem] font-medium leading-none tracking-[-0.04em] tabular-nums">{n}</dd>
              <dt className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-mute">{l}</dt>
            </div>
          ))}
        </dl>
        <div className="overflow-hidden border-t border-hair py-3 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div className="hk-marquee flex w-max gap-10 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
            {[...complianceStandards, ...complianceStandards].map((c, i) => (
              <span key={i} className="flex items-center gap-10">
                {c.title}
                <span className="h-1 w-1 rounded-full bg-lime" />
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="bg-paper px-5 py-2 text-center font-mono text-[10px] text-mute/80">
        Red markers: countries hosting today&rsquo;s most active hostile IPs ({snapshot.live ? snapshot.source : "sample data"}).
        Arcs are illustrative, weighted by that data.
      </p>
    </section>
  );
}
