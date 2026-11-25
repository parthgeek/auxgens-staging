/*
  Shared data for the globe heroes.

  Attack *origins* come from /api/threats (SANS ISC DShield: today's most
  active hostile source IPs, aggregated by country). Individual attack
  paths drawn on the globe are visualisations generated from those
  weights — they are not a 1:1 log of real intrusions, and the UI says so.
*/

export type GeoPoint = { lat: number; lng: number };

export type Country = GeoPoint & { cc: string; name: string };

export type Hub = GeoPoint & {
  id: string;
  name: string;
  kind: "soc" | "client";
};

export type ThreatSource = {
  cc: string;
  name: string;
  lat: number;
  lng: number;
  /** Relative weight (DShield attack reports for that country's top IPs). */
  weight: number;
  ips: number;
  sampleAs?: string;
};

export type ThreatSnapshot = {
  live: boolean;
  source: string;
  sourceUrl: string;
  updated: string;
  totalReports: number;
  sources: ThreatSource[];
};

export type AttackKind = {
  id: string;
  label: string;
  service: string;
  serviceId: string;
  actions: string[];
  severity: "low" | "med" | "high" | "critical";
};

export type AttackEvent = {
  id: number;
  at: number;
  from: ThreatSource;
  to: Hub;
  kind: AttackKind;
  action: string;
  srcIp: string;
};

/** ISO-3166 alpha-2 → approximate centroid. Covers the usual DShield top talkers. */
export const COUNTRIES: Record<string, Country> = Object.fromEntries(
  (
    [
      ["US", "United States", 39.8, -98.6],
      ["CA", "Canada", 56.1, -106.3],
      ["MX", "Mexico", 23.6, -102.5],
      ["BR", "Brazil", -10.8, -52.9],
      ["AR", "Argentina", -34.6, -64.0],
      ["CL", "Chile", -33.4, -70.6],
      ["CO", "Colombia", 4.6, -74.1],
      ["PE", "Peru", -9.2, -75.0],
      ["VE", "Venezuela", 7.1, -66.2],
      ["GB", "United Kingdom", 52.4, -1.5],
      ["IE", "Ireland", 53.4, -8.2],
      ["FR", "France", 46.6, 2.4],
      ["DE", "Germany", 51.2, 10.4],
      ["NL", "Netherlands", 52.1, 5.3],
      ["BE", "Belgium", 50.6, 4.6],
      ["LU", "Luxembourg", 49.8, 6.1],
      ["CH", "Switzerland", 46.8, 8.2],
      ["AT", "Austria", 47.6, 14.1],
      ["IT", "Italy", 42.8, 12.6],
      ["ES", "Spain", 40.2, -3.6],
      ["PT", "Portugal", 39.6, -8.0],
      ["SE", "Sweden", 62.2, 17.6],
      ["NO", "Norway", 61.0, 8.5],
      ["FI", "Finland", 64.5, 26.0],
      ["DK", "Denmark", 56.0, 9.5],
      ["PL", "Poland", 52.1, 19.4],
      ["CZ", "Czechia", 49.8, 15.5],
      ["SK", "Slovakia", 48.7, 19.7],
      ["HU", "Hungary", 47.2, 19.4],
      ["RO", "Romania", 45.9, 24.9],
      ["BG", "Bulgaria", 42.7, 25.5],
      ["GR", "Greece", 39.1, 22.0],
      ["RS", "Serbia", 44.0, 20.9],
      ["UA", "Ukraine", 49.0, 31.4],
      ["MD", "Moldova", 47.2, 28.5],
      ["BY", "Belarus", 53.7, 28.0],
      ["LT", "Lithuania", 55.2, 23.9],
      ["LV", "Latvia", 56.9, 24.6],
      ["EE", "Estonia", 58.6, 25.0],
      ["RU", "Russia", 56.0, 38.0],
      ["TR", "Türkiye", 39.0, 35.2],
      ["IL", "Israel", 31.4, 35.0],
      ["IR", "Iran", 32.4, 53.7],
      ["IQ", "Iraq", 33.2, 43.7],
      ["SA", "Saudi Arabia", 23.9, 45.1],
      ["AE", "UAE", 24.4, 54.4],
      ["QA", "Qatar", 25.3, 51.2],
      ["EG", "Egypt", 26.8, 30.8],
      ["MA", "Morocco", 31.8, -7.1],
      ["DZ", "Algeria", 28.0, 1.7],
      ["TN", "Tunisia", 34.0, 9.5],
      ["NG", "Nigeria", 9.1, 8.7],
      ["GH", "Ghana", 7.9, -1.0],
      ["KE", "Kenya", -0.0, 37.9],
      ["ZA", "South Africa", -30.6, 22.9],
      ["SC", "Seychelles", -4.7, 55.5],
      ["IN", "India", 21.0, 78.0],
      ["PK", "Pakistan", 30.4, 69.3],
      ["BD", "Bangladesh", 23.7, 90.4],
      ["LK", "Sri Lanka", 7.9, 80.8],
      ["NP", "Nepal", 28.4, 84.1],
      ["CN", "China", 35.9, 104.2],
      ["HK", "Hong Kong", 22.3, 114.2],
      ["TW", "Taiwan", 23.7, 121.0],
      ["KR", "South Korea", 36.5, 127.9],
      ["KP", "North Korea", 40.3, 127.5],
      ["JP", "Japan", 36.2, 138.3],
      ["VN", "Vietnam", 14.1, 108.3],
      ["TH", "Thailand", 15.9, 100.9],
      ["MY", "Malaysia", 4.2, 102.0],
      ["SG", "Singapore", 1.35, 103.8],
      ["ID", "Indonesia", -0.8, 113.9],
      ["PH", "Philippines", 12.9, 121.8],
      ["KH", "Cambodia", 12.6, 104.9],
      ["KZ", "Kazakhstan", 48.0, 66.9],
      ["UZ", "Uzbekistan", 41.4, 64.6],
      ["AU", "Australia", -25.3, 133.8],
      ["NZ", "New Zealand", -40.9, 174.9],
      ["PA", "Panama", 8.5, -80.8],
      ["BZ", "Belize", 17.2, -88.5],
      ["VG", "British Virgin Islands", 18.4, -64.6],
      ["CY", "Cyprus", 35.1, 33.4],
      ["MT", "Malta", 35.9, 14.4],
      ["IS", "Iceland", 64.96, -19.0],
      ["GE", "Georgia", 42.3, 43.4],
      ["AM", "Armenia", 40.1, 45.0],
      ["AZ", "Azerbaijan", 40.1, 47.6],
    ] as const
  ).map(([cc, name, lat, lng]) => [cc, { cc, name, lat, lng }]),
);

/** Where Auxgens defends from / for. */
export const HUBS: Hub[] = [
  { id: "blr", name: "Bengaluru SOC", lat: 12.97, lng: 77.59, kind: "soc" },
  { id: "aus", name: "Austin, TX", lat: 30.51, lng: -97.82, kind: "soc" },
  { id: "lon", name: "London", lat: 51.51, lng: -0.13, kind: "client" },
  { id: "dxb", name: "Dubai", lat: 25.2, lng: 55.27, kind: "client" },
  { id: "sin", name: "Singapore", lat: 1.29, lng: 103.85, kind: "client" },
  { id: "fra", name: "Frankfurt", lat: 50.11, lng: 8.68, kind: "client" },
  { id: "bom", name: "Mumbai", lat: 19.08, lng: 72.88, kind: "client" },
  { id: "nyc", name: "New York", lat: 40.71, lng: -74.0, kind: "client" },
  { id: "syd", name: "Sydney", lat: -33.87, lng: 151.21, kind: "client" },
  { id: "tor", name: "Toronto", lat: 43.65, lng: -79.38, kind: "client" },
];

export const ATTACK_KINDS: AttackKind[] = [
  {
    id: "bruteforce",
    label: "SSH brute-force burst",
    service: "SOC as a Service",
    serviceId: "soc",
    actions: ["Blocked", "Rate-limited"],
    severity: "med",
  },
  {
    id: "ransomware",
    label: "Ransomware C2 beacon",
    service: "Infrastructure Security",
    serviceId: "infra",
    actions: ["Quarantined", "Contained"],
    severity: "critical",
  },
  {
    id: "phishing",
    label: "Credential phishing campaign",
    service: "Security Culture",
    serviceId: "culture",
    actions: ["Sinkholed", "Reported"],
    severity: "high",
  },
  {
    id: "sqli",
    label: "SQL injection on API",
    service: "Application Development",
    serviceId: "appsec",
    actions: ["Blocked at WAF", "Patched"],
    severity: "high",
  },
  {
    id: "exfil",
    label: "Data exfiltration attempt",
    service: "Data Protection",
    serviceId: "data",
    actions: ["DLP blocked", "Contained"],
    severity: "critical",
  },
  {
    id: "recon",
    label: "Port scan / reconnaissance",
    service: "Threat & Risk Intelligence",
    serviceId: "intel",
    actions: ["Fingerprinted", "Blocked"],
    severity: "low",
  },
  {
    id: "promptinj",
    label: "Prompt-injection on AI agent",
    service: "Forward Deployed AI Engineer",
    serviceId: "ai",
    actions: ["Guardrail tripped", "Blocked"],
    severity: "high",
  },
  {
    id: "policy",
    label: "Privileged access policy breach",
    service: "Governance Risk & Compliance",
    serviceId: "grc",
    actions: ["Access revoked", "Flagged for audit"],
    severity: "med",
  },
  {
    id: "ddos",
    label: "Volumetric DDoS burst",
    service: "Infrastructure Security",
    serviceId: "infra",
    actions: ["Scrubbed", "Mitigated"],
    severity: "high",
  },
  {
    id: "ferpa",
    label: "Student-record access anomaly",
    service: "FERPA Compliance",
    serviceId: "ferpa",
    actions: ["Session terminated", "Escalated"],
    severity: "med",
  },
];

/** The 11 service pillars, in homepage order. */
export const SERVICE_PILLARS = [
  { id: "ai", title: "Forward Deployed AI Engineer", short: "AI Engineering" },
  { id: "soc", title: "SOC as a Service", short: "24/7 SOC" },
  { id: "intel", title: "Threat & Risk Intelligence", short: "Threat Intel" },
  { id: "infra", title: "Infrastructure Security", short: "Infra Security" },
  { id: "grc", title: "Governance Risk & Compliance", short: "GRC" },
  { id: "ferpa", title: "FERPA Compliance", short: "FERPA" },
  { id: "data", title: "Data Protection", short: "Data Protection" },
  { id: "culture", title: "Security Culture", short: "Security Culture" },
  { id: "appsec", title: "Application Development", short: "AppSec / DevSecOps" },
  { id: "staff", title: "Staff Augmentation / PM", short: "Staff Aug" },
  { id: "docs", title: "Documentation & Support", short: "Docs & DPO" },
] as const;

/** Used when the live feed is unavailable (offline dev, upstream down). */
export const FALLBACK_SOURCES: ThreatSource[] = (
  [
    ["US", 120],
    ["CN", 95],
    ["RU", 80],
    ["NL", 60],
    ["DE", 48],
    ["BR", 40],
    ["IN", 36],
    ["VN", 30],
    ["GB", 26],
    ["FR", 24],
    ["KR", 20],
    ["SG", 18],
    ["ID", 16],
    ["UA", 14],
    ["IR", 12],
    ["HK", 12],
    ["BG", 10],
    ["RO", 9],
    ["TR", 8],
    ["ZA", 6],
  ] as const
).map(([cc, weight]) => ({ ...COUNTRIES[cc], weight, ips: 1 }));

export const FALLBACK_SNAPSHOT: ThreatSnapshot = {
  live: false,
  source: "Sample distribution (live feed unavailable)",
  sourceUrl: "https://isc.sans.edu/",
  updated: new Date(0).toISOString(),
  totalReports: 0,
  sources: FALLBACK_SOURCES,
};

const SEVERITY_WEIGHT: Record<AttackKind["severity"], number> = {
  low: 5,
  med: 4,
  high: 3,
  critical: 1.5,
};

function pickWeighted<T>(items: T[], weight: (t: T) => number): T {
  const total = items.reduce((s, t) => s + weight(t), 0);
  let r = Math.random() * total;
  for (const t of items) {
    r -= weight(t);
    if (r <= 0) return t;
  }
  return items[items.length - 1];
}

let seq = 0;

export function makeAttackEvent(sources: ThreatSource[]): AttackEvent {
  const list = sources.length ? sources : FALLBACK_SOURCES;
  // sqrt flattens the distribution so the globe isn't 90% one country.
  const from = pickWeighted(list, (s) => Math.sqrt(s.weight));
  const targets = HUBS.filter(
    (h) => Math.hypot(h.lat - from.lat, h.lng - from.lng) > 12,
  );
  const to = pickWeighted(targets.length ? targets : HUBS, (h) =>
    h.kind === "soc" ? 2.2 : 1,
  );
  const kind = pickWeighted(ATTACK_KINDS, (k) => SEVERITY_WEIGHT[k.severity]);
  const action = kind.actions[Math.floor(Math.random() * kind.actions.length)];
  const a = 1 + Math.floor(Math.random() * 222);
  const b = Math.floor(Math.random() * 255);
  return {
    id: ++seq,
    at: Date.now(),
    from,
    to,
    kind,
    action,
    srcIp: `${a}.${b}.x.x`,
  };
}

export const SEVERITY_COLOR: Record<AttackKind["severity"], string> = {
  low: "#8fd14f",
  med: "#f5b544",
  high: "#ff8a3d",
  critical: "#ff4d4d",
};
