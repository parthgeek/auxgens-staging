"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRightIcon, BroadcastIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { SERVICE_PILLARS, SEVERITY_COLOR } from "../../data/threats";
import { timeAgo, useNow, useThreatFeed } from "./useThreatFeed";

const ThreatGlobe = dynamic(() => import("./ThreatGlobe"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="aspect-square w-[62%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(114,193,53,.18),transparent_60%)]" />
    </div>
  ),
});

const EASE = [0.16, 1, 0.3, 1] as const;

export default function HeroThreatMap() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const { snapshot, events, count } = useThreatFeed({ interval: 650, paused: !inView });
  const now = useNow(1000);
  const [focus, setFocus] = useState<string | null>(null);

  const lastHit = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of events) if (!m.has(e.kind.serviceId)) m.set(e.kind.serviceId, e.at);
    return m;
  }, [events]);

  const hostileIps = snapshot.sources.reduce((s, x) => s + x.ips, 0);
  const updated = snapshot.live
    ? new Date(snapshot.updated).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : null;

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section id="home" ref={ref} className="relative bg-white px-2.5 pb-4 pt-2.5 font-sans sm:px-4">
      <div className="relative isolate flex flex-col overflow-hidden rounded-[22px] lg:block bg-night text-[#eef5ec] sm:rounded-[30px] lg:min-h-[max(640px,calc(100svh-176px))]">
        {/* atmosphere */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-[10%] top-[-20%] h-[90%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(114,193,53,.16),transparent)]" />
          <div className="absolute -left-[15%] bottom-[-30%] h-[70%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(46,159,154,.10),transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_70%_45%,#000_10%,transparent_70%)]" />
        </div>

        {/* globe */}
        <div className="relative order-2 -mt-4 h-[380px] w-full sm:h-[520px] lg:absolute lg:mt-0 lg:inset-y-0 lg:right-[-6%] lg:h-auto lg:w-[64%]">
          <ThreatGlobe events={events} sources={snapshot.sources} focusService={focus} />
        </div>

        {/* copy */}
        <div className="relative z-10 order-1 flex flex-col gap-10 px-6 pb-2 pt-10 sm:px-10 lg:min-h-[inherit] lg:max-w-[48%] lg:justify-between lg:px-14 lg:pb-28 lg:pt-14">
          <div>
            <motion.p
              {...rise(0.05)}
              className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/55"
            >
              <span className="h-px w-8 bg-white/30" />
              Managed security · Asia · EMEA · US
            </motion.p>
            <motion.h1
              {...rise(0.12)}
              className="text-[clamp(2.6rem,5.6vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-balance"
            >
              Secure your every click,{" "}
              <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-lime">
                every layer.
              </span>
            </motion.h1>
            <motion.p
              {...rise(0.22)}
              className="mt-7 max-w-[46ch] text-[1.05rem] leading-relaxed text-white/65"
            >
              Auxgens watches the attack surface around the clock — from our SOC in Bengaluru and
              Austin — and turns every probe, payload and phishing wave into a contained,
              audit-ready event.
            </motion.p>
            <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="/contact-us"
                className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-[15px] font-medium text-night transition hover:bg-[#86d64a]"
              >
                Talk to a security lead
                <ArrowUpRightIcon
                  weight="bold"
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[15px] text-white/85 transition hover:border-white/40 hover:text-white"
              >
                Explore services
              </a>
            </motion.div>
          </div>

          <motion.dl {...rise(0.4)} className="grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
            {[
              ["25+", "years in the field"],
              ["24/7", "SOC coverage"],
              [String(count).padStart(3, "0"), "events visualised"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">{l}</dt>
                <dd className="mt-1.5 text-3xl font-medium tracking-[-0.03em] tabular-nums">{n}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* live source chip */}
        <motion.a
          {...rise(0.5)}
          href={snapshot.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-5 top-5 z-20 hidden items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 font-mono text-[11px] text-white/70 backdrop-blur-md transition hover:border-white/25 sm:flex"
        >
          <span className="relative flex h-2 w-2">
            <span className={cn("hk-ping absolute inset-0 rounded-full", snapshot.live ? "bg-threat" : "bg-amber")} />
            <span className={cn("relative h-2 w-2 rounded-full", snapshot.live ? "bg-threat" : "bg-amber")} />
          </span>
          {snapshot.live ? (
            <>
              {hostileIps} hostile sources today · {snapshot.source} · {updated}
            </>
          ) : (
            <>Sample threat distribution</>
          )}
        </motion.a>

        {/* live feed */}
        <motion.div
          {...rise(0.6)}
          className="relative z-20 order-3 mx-4 mb-4 rounded-2xl border border-white/10 bg-[#07100b]/75 p-4 backdrop-blur-xl sm:mx-6 lg:absolute lg:bottom-24 lg:right-8 lg:m-0 lg:w-[380px]"
        >
          <div className="mb-3 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/50">
            <span className="flex items-center gap-2">
              <BroadcastIcon weight="bold" className="text-lime" /> Threat feed
            </span>
            <span>Auto-contained</span>
          </div>
          <ul className="space-y-2.5" aria-live="off">
            <AnimatePresence initial={false} mode="popLayout">
              {events.slice(0, 4).map((e) => (
                <motion.li
                  key={e.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="grid grid-cols-[auto_1fr_auto] items-start gap-x-3 text-[12.5px]"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 rounded-full"
                    style={{ background: SEVERITY_COLOR[e.kind.severity] }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-white/90">{e.kind.label}</span>
                    <span className="block truncate font-mono text-[10.5px] text-white/45">
                      {e.from.cc} {e.srcIp} → {e.to.name}
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block font-mono text-[10.5px] text-lime">{e.action}</span>
                    <span className="block font-mono text-[10px] text-white/35">{timeAgo(e.at, now)}</span>
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </motion.div>

        {/* service rail */}
        <div className="relative z-20 order-4 border-t border-white/10 lg:absolute lg:inset-x-0 lg:bottom-0">
          <div className="flex items-center gap-2 overflow-x-auto px-4 py-3.5 [scrollbar-width:none] sm:px-6 lg:px-14">
            <span className="mr-2 shrink-0 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/40">
              Services in action
            </span>
            {SERVICE_PILLARS.map((s) => {
              const hot = now - (lastHit.get(s.id) ?? 0) < 1600;
              const active = focus === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onMouseEnter={() => setFocus(s.id)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(s.id)}
                  onBlur={() => setFocus(null)}
                  className={cn(
                    "shrink-0 cursor-default rounded-full border bg-transparent px-3 py-1.5 font-sans text-[12px] transition-colors duration-500",
                    active
                      ? "border-lime bg-lime text-night"
                      : hot
                        ? "border-lime/60 bg-lime/10 text-lime"
                        : "border-white/10 text-white/55",
                  )}
                >
                  {s.short}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-2.5 max-w-5xl px-2 text-center font-mono text-[10.5px] leading-relaxed text-ink/45">
        Red columns: countries hosting today&rsquo;s most active hostile IPs (SANS ISC DShield, refreshed every 15
        min). Attack paths are illustrative and weighted by that data — not a log of client incidents.
      </p>
    </section>
  );
}
