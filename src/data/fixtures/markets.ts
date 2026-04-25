/**
 * Markets fixtures for the new TradingView-style homepage.
 * Pure mock data — no API calls. Probabilities are 0..1 (decimal),
 * change24h is in percentage points (e.g., +3.1 means +3.1%).
 */

export type HomeCategory =
  | "Politics"
  | "Geopolitics"
  | "Crypto"
  | "Economy"
  | "Tech"
  | "Sports";

export type HomeVenue = "Polymarket" | "Kalshi" | "Manifold";

export interface HomeMarket {
  id: string;
  title: string;
  category: HomeCategory;
  venue: HomeVenue;
  prob: number;        // 0..1
  change24h: number;   // percent points
  vol24h: number;      // USD
  spark: number[];     // 24 points, normalized values
  oracleScore?: number; // 0..100
  resolvesIn?: number; // days
}

/** Seeded sparkline so the prototype is stable across reloads. */
function spark(seed: number, end: number, vol = 4): number[] {
  const out: number[] = [];
  let v = end - (((seed * 11) % 18) - 9);
  for (let i = 0; i < 23; i++) {
    const noise = (Math.sin(seed + i * 0.7) + Math.cos(seed * 0.3 + i)) * vol;
    v += noise * 0.4;
    v = Math.max(2, Math.min(98, v));
    out.push(Number(v.toFixed(2)));
  }
  out.push(end);
  return out;
}

const m = (
  id: string,
  title: string,
  category: HomeCategory,
  venue: HomeVenue,
  prob: number,
  change24h: number,
  vol24h: number,
  seed: number,
  oracleScore?: number,
  resolvesIn?: number,
): HomeMarket => ({
  id,
  title,
  category,
  venue,
  prob,
  change24h,
  vol24h,
  spark: spark(seed, prob * 100, Math.abs(change24h) > 3 ? 6 : 4),
  oracleScore,
  resolvesIn,
});

export const POLITICS: HomeMarket[] = [
  m("pol-1", "Trump approval >45% by July 2026", "Politics", "Polymarket", 0.42, 3.1, 5_200_000, 101, 84, 70),
  m("pol-2", "Macron ends PM term before EOY", "Politics", "Polymarket", 0.18, -1.4, 1_120_000, 102, 61, 220),
  m("pol-3", "US House majority changes 2026 midterms", "Politics", "Kalshi", 0.31, 0.8, 2_310_000, 103, 72, 200),
  m("pol-4", "EU Parliament passes AI Act amendments by Q3", "Politics", "Polymarket", 0.66, 2.2, 1_840_000, 104, 79, 56),
  m("pol-5", "Vance wins GOP nomination 2028", "Politics", "Polymarket", 0.29, 1.7, 980_000, 105, 58, 580),
  m("pol-6", "UK calls early election before EOY", "Politics", "Kalshi", 0.14, -0.6, 720_000, 106, 49, 250),
  m("pol-7", "Pelosi resigns from Congress in 2026", "Politics", "Polymarket", 0.22, 0.4, 410_000, 107, 44, 240),
  m("pol-8", "DOJ indicts another major figure in 2026", "Politics", "Polymarket", 0.55, -0.9, 1_640_000, 108, 67, 240),
];

export const GEOPOLITICS: HomeMarket[] = [
  m("geo-1", "Iran-Israel ceasefire holds 90 days", "Geopolitics", "Polymarket", 0.61, -2.3, 4_120_000, 121, 78, 90),
  m("geo-2", "Russia-Ukraine ceasefire by Q3 2026", "Geopolitics", "Polymarket", 0.27, 1.1, 3_410_000, 122, 71, 120),
  m("geo-3", "Taiwan Strait incident before EOY", "Geopolitics", "Polymarket", 0.19, 0.3, 2_640_000, 123, 65, 240),
  m("geo-4", "NATO admits new member in 2026", "Geopolitics", "Kalshi", 0.24, -0.8, 880_000, 124, 53, 240),
  m("geo-5", "Saudi-Israel normalization signed in 2026", "Geopolitics", "Polymarket", 0.12, -0.2, 540_000, 125, 47, 240),
  m("geo-6", "China invades Taiwan in 2026", "Geopolitics", "Polymarket", 0.04, 0.1, 1_240_000, 126, 41, 240),
  m("geo-7", "Pakistan-India border clash escalates", "Geopolitics", "Polymarket", 0.31, 1.8, 690_000, 127, 60, 180),
  m("geo-8", "North Korea missile test before June", "Geopolitics", "Kalshi", 0.78, 0.5, 470_000, 128, 56, 38),
];

export const CRYPTO: HomeMarket[] = [
  m("cry-1", "BTC > $200K by EOY 2026", "Crypto", "Polymarket", 0.31, 4.2, 8_900_000, 141, 86, 240),
  m("cry-2", "ETH ETF inflows > $5B in Q2", "Crypto", "Polymarket", 0.48, 2.1, 3_240_000, 142, 74, 70),
  m("cry-3", "SEC drops Coinbase case", "Crypto", "Polymarket", 0.71, 1.4, 2_180_000, 143, 69, 160),
  m("cry-4", "Solana flips ETH market cap by 2027", "Crypto", "Polymarket", 0.16, -0.8, 1_540_000, 144, 51, 600),
  m("cry-5", "Stablecoin bill passes US Senate", "Crypto", "Kalshi", 0.62, 3.3, 1_980_000, 145, 81, 90),
  m("cry-6", "MicroStrategy adds 50K BTC in Q2", "Crypto", "Polymarket", 0.44, 0.7, 740_000, 146, 58, 70),
  m("cry-7", "BTC dominance > 60% in 2026", "Crypto", "Polymarket", 0.39, -1.2, 920_000, 147, 62, 240),
  m("cry-8", "Tornado Cash sanctions lifted", "Crypto", "Polymarket", 0.21, 0.4, 380_000, 148, 49, 180),
];

export const ECONOMY: HomeMarket[] = [
  m("eco-1", "Fed cuts 50bps before July", "Economy", "Polymarket", 0.34, -2.4, 4_120_000, 161, 82, 70),
  m("eco-2", "US recession 2026 (NBER)", "Economy", "Polymarket", 0.28, 1.1, 3_780_000, 162, 76, 240),
  m("eco-3", "CPI > 4% in Q3", "Economy", "Kalshi", 0.41, 0.6, 1_540_000, 163, 68, 130),
  m("eco-4", "Unemployment > 5% by EOY", "Economy", "Kalshi", 0.36, 0.2, 1_840_000, 164, 65, 240),
  m("eco-5", "ECB cuts 75bps total in 2026", "Economy", "Polymarket", 0.52, 1.8, 1_120_000, 165, 71, 240),
  m("eco-6", "Oil > $100 before EOY", "Economy", "Polymarket", 0.23, -0.4, 920_000, 166, 54, 240),
  m("eco-7", "S&P 500 closes >7200 by EOY", "Economy", "Kalshi", 0.48, 0.9, 2_410_000, 167, 73, 240),
  m("eco-8", "10-year yield > 5% in 2026", "Economy", "Polymarket", 0.31, 0.5, 640_000, 168, 59, 240),
];

export const TECH: HomeMarket[] = [
  m("tec-1", "GPT-6 released before September", "Tech", "Polymarket", 0.39, 2.1, 720_000, 181, 71, 130),
  m("tec-2", "OpenAI valuation > $500B by EOY", "Tech", "Polymarket", 0.62, 1.4, 1_120_000, 182, 78, 240),
  m("tec-3", "Apple ships AR glasses 2026", "Tech", "Polymarket", 0.19, -0.7, 540_000, 183, 49, 240),
  m("tec-4", "Tesla Robotaxi commercial rollout", "Tech", "Polymarket", 0.44, 3.2, 1_640_000, 184, 67, 180),
  m("tec-5", "Anthropic IPOs in 2026", "Tech", "Polymarket", 0.07, -0.3, 320_000, 185, 38, 240),
  m("tec-6", "Nvidia stock split 2026", "Tech", "Kalshi", 0.31, 0.6, 480_000, 186, 52, 240),
  m("tec-7", "TSMC Arizona fab fully operational by Q4", "Tech", "Polymarket", 0.55, 0.9, 410_000, 187, 64, 200),
  m("tec-8", "EU fines Google >$5B in 2026", "Tech", "Polymarket", 0.41, 1.2, 380_000, 188, 56, 240),
];

export const SPORTS: HomeMarket[] = [
  m("spo-1", "Real Madrid wins Champions League 2026", "Sports", "Polymarket", 0.32, 1.4, 1_240_000, 201, 58, 36),
  m("spo-2", "Lakers make NBA playoffs", "Sports", "Kalshi", 0.71, 0.6, 480_000, 202, 49, 14),
  m("spo-3", "Verstappen wins F1 2026 championship", "Sports", "Polymarket", 0.58, -0.8, 620_000, 203, 56, 220),
  m("spo-4", "Djokovic wins another Grand Slam", "Sports", "Polymarket", 0.41, 0.3, 380_000, 204, 51, 60),
  m("spo-5", "Patrick Mahomes MVP 2026", "Sports", "Kalshi", 0.28, 0.4, 290_000, 205, 47, 240),
  m("spo-6", "France wins Euro 2028", "Sports", "Polymarket", 0.19, 0.1, 180_000, 206, 42, 800),
  m("spo-7", "Mbappé top scorer Champions League", "Sports", "Polymarket", 0.36, 1.1, 240_000, 207, 50, 36),
  m("spo-8", "Olympics 2028 Los Angeles host issue", "Sports", "Polymarket", 0.08, -0.2, 110_000, 208, 35, 800),
];

export const ALL_MARKETS: HomeMarket[] = [
  ...POLITICS, ...GEOPOLITICS, ...CRYPTO, ...ECONOMY, ...TECH, ...SPORTS,
];

export const MARKETS_BY_CATEGORY: Record<HomeCategory, HomeMarket[]> = {
  Politics: POLITICS,
  Geopolitics: GEOPOLITICS,
  Crypto: CRYPTO,
  Economy: ECONOMY,
  Tech: TECH,
  Sports: SPORTS,
};

/* ---------- Top-of-page aggregates ---------- */

export interface CategoryAggregate {
  id: HomeCategory | "Culture";
  code: string;
  name: string;
  prob: number;
  change24h: number;
  spark: number[];
}

export const TOP_CATEGORIES: CategoryAggregate[] = [
  { id: "Politics",    code: "POL", name: "Politics",    prob: 0.487, change24h:  1.24, spark: spark(301, 48.7) },
  { id: "Geopolitics", code: "GEO", name: "Geopolitics", prob: 0.312, change24h: -0.43, spark: spark(302, 31.2) },
  { id: "Crypto",      code: "CRY", name: "Crypto",      prob: 0.621, change24h:  2.15, spark: spark(303, 62.1, 7) },
  { id: "Economy",     code: "ECO", name: "Economy",     prob: 0.405, change24h:  0.34, spark: spark(304, 40.5) },
  { id: "Tech",        code: "TEC", name: "Tech",        prob: 0.578, change24h:  0.81, spark: spark(305, 57.8) },
  { id: "Sports",      code: "SPO", name: "Sports",      prob: 0.523, change24h: -1.12, spark: spark(306, 52.3) },
  { id: "Culture",     code: "CUL", name: "Culture",     prob: 0.460, change24h:  0.27, spark: spark(307, 46.0) },
];

/* ---------- Composite Index series ---------- */

export interface CompositePoint { time: string; value: number; }

/** ~48 hourly-ish points 09:00..17:00 with a midday dip and partial recovery. */
export const COMPOSITE_SERIES: CompositePoint[] = (() => {
  const out: CompositePoint[] = [];
  const start = 0.547;
  let v = start;
  for (let i = 0; i < 48; i++) {
    const t = i / 47; // 0..1 across the trading day
    const hour = 9 + t * 8; // 09:00..17:00
    const hh = Math.floor(hour);
    const mm = Math.round((hour - hh) * 60);
    const label = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    // Dip near 0.4..0.55 (around midday), then recover
    const dip = -0.012 * Math.sin(t * Math.PI * 1.2);
    const noise = (Math.sin(i * 0.9) + Math.cos(i * 0.4)) * 0.0009;
    v = start + dip + noise + (t > 0.7 ? (t - 0.7) * 0.006 : 0);
    out.push({ time: label, value: Number(v.toFixed(4)) });
  }
  // Force end value
  out[out.length - 1].value = 0.541;
  return out;
})();

export const COMPOSITE = {
  symbol: "OCI",
  name: "Oracle Composite Index",
  value: 0.541,
  change24h: -0.84, // %
};

/* ---------- Overview cards (Section 3) ---------- */

export const OVERVIEW = {
  active: {
    label: "Most active",
    sublabel: "ACTIVE",
    big: "$167.4M",
    delta: 12.4,
    rows: [
      { title: "Trump approval >45%", prob: 0.42, change: 3.1 },
      { title: "BTC > $200K EOY", prob: 0.31, change: 4.2 },
      { title: "Iran-Israel ceasefire", prob: 0.61, change: -2.3 },
    ],
    spark: spark(401, 62, 5),
    direction: "up" as const,
  },
  resolving: {
    label: "Resolving",
    sublabel: "7 DAYS",
    big: "37 markets",
    sub: "$24.1M in play",
    rows: [
      { title: "Fed decision May 7", days: 12, prob: 0.68 },
      { title: "EU AI Act vote May 12", days: 17, prob: 0.66 },
      { title: "Lakers playoffs lock", days: 14, prob: 0.71 },
    ],
    spark: spark(402, 38, 4).reverse(),
    direction: "down" as const,
  },
  signal: {
    label: "Top Oracle Score",
    sublabel: "SIGNAL",
    big: "94/100",
    sub: "Strong divergence",
    rows: [
      { title: "BTC > $200K EOY", score: 94, prob: 0.31 },
      { title: "Stablecoin bill passes Senate", score: 91, prob: 0.62 },
      { title: "Fed cuts before July", score: 88, prob: 0.34 },
    ],
    spark: spark(403, 88, 5),
    direction: "up" as const,
  },
};

/* ---------- Helpers ---------- */

export function fmtProb(n: number): string {
  return n.toFixed(2);
}

export function fmtPct(n: number): string {
  return `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;
}

export function fmtVol(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export function topByVol(markets: HomeMarket[], n = 6): HomeMarket[] {
  return [...markets].sort((a, b) => b.vol24h - a.vol24h).slice(0, n);
}

export function topByVolatility(markets: HomeMarket[], n = 5): HomeMarket[] {
  return [...markets].sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h)).slice(0, n);
}

export function gainers(markets: HomeMarket[], n = 5): HomeMarket[] {
  return [...markets].filter((m) => m.change24h > 0).sort((a, b) => b.change24h - a.change24h).slice(0, n);
}

export function losers(markets: HomeMarket[], n = 5): HomeMarket[] {
  return [...markets].filter((m) => m.change24h < 0).sort((a, b) => a.change24h - b.change24h).slice(0, n);
}

export const CATEGORY_PILLS = [
  "All",
  "Politics",
  "Geopolitics",
  "Crypto",
  "Economy",
  "Tech",
  "Sports",
  "Culture",
  "Regulation",
  "Platforms",
] as const;
export type Pill = (typeof CATEGORY_PILLS)[number];

export const CATEGORY_ANCHORS: Record<string, string> = {
  All: "top",
  Politics: "section-Politics",
  Geopolitics: "section-Geopolitics",
  Crypto: "section-Crypto",
  Economy: "section-Economy",
  Tech: "section-Tech",
  Sports: "section-Sports",
  Culture: "section-Culture",
  Regulation: "section-Regulation",
  Platforms: "section-Platforms",
};