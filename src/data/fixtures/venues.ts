export interface VenuePlatform {
  id: "Polymarket" | "Kalshi" | "Manifold";
  initial: string;
  subtitle: string;
  markets: string;
  vol24h: string;
  avgSpread: string;
  strongest: string;
}

export const PLATFORMS: VenuePlatform[] = [
  { id: "Polymarket", initial: "P", subtitle: "Decentralized prediction markets", markets: "12,450", vol24h: "$87.4M", avgSpread: "1.2%", strongest: "Politics, Crypto" },
  { id: "Kalshi",     initial: "K", subtitle: "CFTC-regulated event markets",      markets: "1,840",  vol24h: "$22.1M", avgSpread: "0.8%", strongest: "Economics, Sports" },
  { id: "Manifold",   initial: "M", subtitle: "Play-money market sandbox",         markets: "3,200",  vol24h: "$1.8M",  avgSpread: "2.1%", strongest: "Tech, Culture" },
];

export interface VenueCompareRow {
  market: string;
  category: "Politics" | "Geopolitics" | "Crypto" | "Economy" | "Tech" | "Sports" | "Regulation";
  poly: number;
  kal: number;
  spread: number;
  polyVol: string;
  kalVol: string;
  fees: string;          // e.g. "0.20% / 0.50%"
  liquidity: number;     // 0..100 score
  clarity: "High" | "Medium" | "Low";
  best: "Polymarket" | "Kalshi";
  reason: string;        // short why
}

export const VENUE_COMPARE: VenueCompareRow[] = [
  { market: "Fed cuts 50bps before July",       category: "Economy",     poly: 0.34, kal: 0.36, spread: 0.02, polyVol: "$1.2M", kalVol: "$890K", fees: "0.20% / 0.50%", liquidity: 88, clarity: "High",   best: "Kalshi",     reason: "Tighter book on regulated venue" },
  { market: "US recession 2026 (NBER)",         category: "Economy",     poly: 0.28, kal: 0.31, spread: 0.03, polyVol: "$4.1M", kalVol: "$720K", fees: "0.20% / 0.50%", liquidity: 92, clarity: "Medium", best: "Polymarket", reason: "Deeper book and higher volume" },
  { market: "BTC > $120K by year-end",          category: "Crypto",      poly: 0.62, kal: 0.59, spread: 0.03, polyVol: "$3.8M", kalVol: "$410K", fees: "0.20% / 0.50%", liquidity: 95, clarity: "High",   best: "Polymarket", reason: "9× the depth on Polymarket" },
  { market: "Trump approval >45% by July",      category: "Politics",    poly: 0.42, kal: 0.44, spread: 0.02, polyVol: "$5.2M", kalVol: "$1.1M", fees: "0.20% / 0.50%", liquidity: 96, clarity: "High",   best: "Polymarket", reason: "Highest 24h volume on platform" },
  { market: "Ukraine ceasefire before Q3",      category: "Geopolitics", poly: 0.27, kal: 0.29, spread: 0.02, polyVol: "$890K", kalVol: "$640K", fees: "0.20% / 0.50%", liquidity: 78, clarity: "Medium", best: "Polymarket", reason: "Slightly tighter spread" },
  { market: "ECB cuts 75bps total in 2026",     category: "Economy",     poly: 0.52, kal: 0.51, spread: 0.01, polyVol: "$1.4M", kalVol: "$980K", fees: "0.20% / 0.50%", liquidity: 84, clarity: "High",   best: "Polymarket", reason: "Marginally better fill price" },
  { market: "GPT-6 released before September",  category: "Tech",        poly: 0.39, kal: 0.42, spread: 0.03, polyVol: "$720K", kalVol: "$310K", fees: "0.20% / 0.50%", liquidity: 71, clarity: "Medium", best: "Polymarket", reason: "More liquidity on AI events" },
  { market: "EU AI Act enforcement before EOY", category: "Regulation",  poly: 0.66, kal: 0.62, spread: 0.04, polyVol: "$1.1M", kalVol: "$540K", fees: "0.20% / 0.50%", liquidity: 80, clarity: "High",   best: "Polymarket", reason: "Stronger geopolitical depth" },
  { market: "Ethereum ETF inflows > $2B",       category: "Crypto",      poly: 0.48, kal: 0.45, spread: 0.03, polyVol: "$2.3M", kalVol: "$520K", fees: "0.20% / 0.50%", liquidity: 87, clarity: "High",   best: "Polymarket", reason: "Tighter market on ETF flows" },
  { market: "Real Madrid wins UCL 2026",        category: "Sports",      poly: 0.32, kal: 0.35, spread: 0.03, polyVol: "$1.8M", kalVol: "$440K", fees: "0.20% / 0.50%", liquidity: 76, clarity: "High",   best: "Polymarket", reason: "Cleaner resolution rules" },
];
