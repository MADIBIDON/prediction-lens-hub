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
  poly: number;
  kal: number;
  spread: number;
  polyVol: string;
  kalVol: string;
  best: "Polymarket" | "Kalshi";
}

export const VENUE_COMPARE: VenueCompareRow[] = [
  { market: "Fed cuts 50bps before July",   poly: 0.34, kal: 0.36, spread: 0.02, polyVol: "$1.2M", kalVol: "$890K", best: "Kalshi" },
  { market: "US recession 2026",            poly: 0.28, kal: 0.31, spread: 0.03, polyVol: "$4.1M", kalVol: "$720K", best: "Polymarket" },
  { market: "BTC > $120K by year-end",      poly: 0.62, kal: 0.59, spread: 0.03, polyVol: "$3.8M", kalVol: "$410K", best: "Polymarket" },
  { market: "Trump approval >45% by July",  poly: 0.42, kal: 0.44, spread: 0.02, polyVol: "$5.2M", kalVol: "$1.1M", best: "Polymarket" },
  { market: "Ukraine ceasefire before Q3",  poly: 0.27, kal: 0.29, spread: 0.02, polyVol: "$890K", kalVol: "$640K", best: "Polymarket" },
  { market: "ECB cuts 75bps total 2026",    poly: 0.52, kal: 0.51, spread: 0.01, polyVol: "$1.4M", kalVol: "$980K", best: "Polymarket" },
  { market: "GPT-6 released before Sept",   poly: 0.39, kal: 0.42, spread: 0.03, polyVol: "$720K", kalVol: "$310K", best: "Polymarket" },
  { market: "Real Madrid wins UCL 2026",    poly: 0.32, kal: 0.35, spread: 0.03, polyVol: "$1.8M", kalVol: "$440K", best: "Polymarket" },
];
