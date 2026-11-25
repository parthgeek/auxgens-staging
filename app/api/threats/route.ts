import { NextResponse } from "next/server";
import {
  COUNTRIES,
  FALLBACK_SNAPSHOT,
  type ThreatSnapshot,
  type ThreatSource,
} from "../../data/threats";

/*
  Today's most active hostile sources from the SANS Internet Storm Center
  (DShield sensor network), grouped by the AS country of each IP.
  Cached for 15 minutes so we make at most ~4 upstream rounds an hour.
  https://isc.sans.edu/api/
*/

export const revalidate = 900;

const ISC = "https://isc.sans.edu/api";
const UA = "auxgens-website/1.0";
const TOP_N = 30;

async function getJson<T>(url: string, ms = 6000): Promise<T> {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/json" },
    signal: AbortSignal.timeout(ms),
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return (await res.json()) as T;
}

type IscSource = { ip: string; attacks: number; count: number; lastseen: string };
type IscIp = { ip?: { ascountry?: string | null; asname?: string | null } };

async function buildSnapshot(): Promise<ThreatSnapshot> {
  const top = await getJson<IscSource[]>(`${ISC}/sources/attacks/${TOP_N}?json`);
  if (!Array.isArray(top) || top.length === 0) throw new Error("empty feed");

  const looked = await Promise.allSettled(
    top.map(async (s) => {
      const info = await getJson<IscIp>(`${ISC}/ip/${s.ip}?json`);
      return { ...s, cc: info.ip?.ascountry ?? null, as: info.ip?.asname ?? undefined };
    }),
  );

  const byCountry = new Map<string, ThreatSource>();
  let totalReports = 0;
  for (const r of looked) {
    if (r.status !== "fulfilled") continue;
    const { cc, attacks, as } = r.value;
    const c = cc ? COUNTRIES[cc] : undefined;
    if (!c) continue;
    totalReports += attacks;
    const prev = byCountry.get(c.cc);
    if (prev) {
      prev.weight += attacks;
      prev.ips += 1;
    } else {
      byCountry.set(c.cc, { ...c, weight: attacks, ips: 1, sampleAs: as });
    }
  }

  const sources = [...byCountry.values()].sort((a, b) => b.weight - a.weight);
  if (sources.length < 3) throw new Error("too few geolocated sources");

  return {
    live: true,
    source: "SANS ISC · DShield",
    sourceUrl: "https://isc.sans.edu/",
    updated: new Date().toISOString(),
    totalReports,
    sources,
  };
}

export async function GET() {
  try {
    return NextResponse.json(await buildSnapshot());
  } catch {
    return NextResponse.json(
      { ...FALLBACK_SNAPSHOT, updated: new Date().toISOString() },
      { headers: { "Cache-Control": "public, max-age=60" } },
    );
  }
}
