/**
 * oracle — mock prediction market dataset.
 * All numbers are fictional. Used purely for the visual prototype.
 */

export type Category =
  | "Politics"
  | "Geopolitics"
  | "Crypto"
  | "Economy"
  | "Tech"
  | "Sports"
  | "Culture"
  | "Regulation";

export type Platform = "Polymarket" | "Kalshi" | "Manifold";

export interface Market {
  id: string;
  title: string;
  category: Category;
  platform: Platform;
  probability: number; // 0-100
  change24h: number;   // percentage points
  volume24h: number;   // USD
  liquidity: number;   // USD
  closeDate: string;   // ISO
  oracleScore: number; // 0-100
  spark: number[];     // 24 points 0-100
}

/**
 * Deterministic pseudo-random sparkline generator so the page is stable.
 */
function spark(seed: number, end: number, volatility = 6): number[] {
  const out: number[] = [];
  let v = end - (((seed * 13) % 18) - 9);
  for (let i = 0; i < 23; i++) {
    const noise = (Math.sin(seed + i * 0.7) + Math.cos(seed * 0.3 + i)) * volatility;
    v += noise * 0.4;
    v = Math.max(2, Math.min(98, v));
    out.push(Number(v.toFixed(1)));
  }
  out.push(end);
  return out;
}

export const MARKETS: Market[] = [
  {
    id: "fed-cut-jul",
    title: "Will the Fed cut rates before July?",
    category: "Economy",
    platform: "Kalshi",
    probability: 38,
    change24h: -3.2,
    volume24h: 4_820_000,
    liquidity: 11_400_000,
    closeDate: "2026-06-30",
    oracleScore: 78,
    spark: spark(1, 38),
  },
  {
    id: "trump-approval-45-jun",
    title: "Will Trump approval be above 45% by June?",
    category: "Politics",
    platform: "Polymarket",
    probability: 42,
    change24h: 1.8,
    volume24h: 6_140_000,
    liquidity: 9_300_000,
    closeDate: "2026-06-15",
    oracleScore: 71,
    spark: spark(2, 42),
  },
  {
    id: "eu-ai-reg-2026",
    title: "Will the EU pass major AI regulation this year?",
    category: "Regulation",
    platform: "Polymarket",
    probability: 64,
    change24h: 4.1,
    volume24h: 1_980_000,
    liquidity: 3_900_000,
    closeDate: "2026-12-31",
    oracleScore: 66,
    spark: spark(3, 64),
  },
  {
    id: "ukraine-ceasefire-q3",
    title: "Will a Ukraine ceasefire be announced before Q3?",
    category: "Geopolitics",
    platform: "Polymarket",
    probability: 22,
    change24h: -2.6,
    volume24h: 3_410_000,
    liquidity: 5_200_000,
    closeDate: "2026-07-01",
    oracleScore: 58,
    spark: spark(4, 22),
  },
  {
    id: "iran-strike-aug",
    title: "Will Iran conduct a major strike before August?",
    category: "Geopolitics",
    platform: "Polymarket",
    probability: 17,
    change24h: 0.9,
    volume24h: 1_120_000,
    liquidity: 2_400_000,
    closeDate: "2026-08-01",
    oracleScore: 49,
    spark: spark(5, 17),
  },
  {
    id: "btc-120k-eoy",
    title: "Will Bitcoin reach $120k before year-end?",
    category: "Crypto",
    platform: "Polymarket",
    probability: 56,
    change24h: 5.4,
    volume24h: 8_900_000,
    liquidity: 14_200_000,
    closeDate: "2026-12-31",
    oracleScore: 82,
    spark: spark(6, 56, 8),
  },
  {
    id: "eth-etf-2b",
    title: "Will Ethereum ETF inflows exceed $2B this month?",
    category: "Crypto",
    platform: "Kalshi",
    probability: 31,
    change24h: -1.2,
    volume24h: 2_240_000,
    liquidity: 4_600_000,
    closeDate: "2026-04-30",
    oracleScore: 63,
    spark: spark(7, 31),
  },
  {
    id: "us-recession-2026",
    title: "Will US recession be called in 2026?",
    category: "Economy",
    platform: "Kalshi",
    probability: 29,
    change24h: 2.1,
    volume24h: 3_780_000,
    liquidity: 7_900_000,
    closeDate: "2026-12-31",
    oracleScore: 74,
    spark: spark(8, 29),
  },
  {
    id: "gpt5-dec",
    title: "Will GPT-5 be released before December?",
    category: "Tech",
    platform: "Manifold",
    probability: 71,
    change24h: 3.6,
    volume24h: 940_000,
    liquidity: 1_700_000,
    closeDate: "2026-12-01",
    oracleScore: 69,
    spark: spark(9, 71),
  },
  {
    id: "apple-ai-2026",
    title: "Will Apple announce a major AI product this year?",
    category: "Tech",
    platform: "Polymarket",
    probability: 83,
    change24h: 1.1,
    volume24h: 1_310_000,
    liquidity: 2_900_000,
    closeDate: "2026-12-31",
    oracleScore: 64,
    spark: spark(10, 83),
  },
  {
    id: "france-tournament",
    title: "Will France win the next major tournament?",
    category: "Sports",
    platform: "Polymarket",
    probability: 24,
    change24h: -0.8,
    volume24h: 720_000,
    liquidity: 1_350_000,
    closeDate: "2026-07-12",
    oracleScore: 47,
    spark: spark(11, 24),
  },
  {
    id: "court-crypto-reg",
    title: "Will a major court ruling change crypto regulation?",
    category: "Regulation",
    platform: "Kalshi",
    probability: 39,
    change24h: 6.2,
    volume24h: 880_000,
    liquidity: 1_900_000,
    closeDate: "2026-09-30",
    oracleScore: 72,
    spark: spark(12, 39),
  },
  {
    id: "india-election-turnout",
    title: "Will India state election turnout exceed 70%?",
    category: "Politics",
    platform: "Polymarket",
    probability: 47,
    change24h: -1.4,
    volume24h: 540_000,
    liquidity: 1_200_000,
    closeDate: "2026-05-22",
    oracleScore: 55,
    spark: spark(13, 47),
  },
  {
    id: "brazil-rate-hike",
    title: "Will Brazil's central bank hike rates in May?",
    category: "Economy",
    platform: "Kalshi",
    probability: 61,
    change24h: 2.4,
    volume24h: 410_000,
    liquidity: 980_000,
    closeDate: "2026-05-08",
    oracleScore: 60,
    spark: spark(14, 61),
  },
  {
    id: "champions-league",
    title: "Will Real Madrid win the Champions League?",
    category: "Sports",
    platform: "Polymarket",
    probability: 33,
    change24h: 4.7,
    volume24h: 1_640_000,
    liquidity: 3_200_000,
    closeDate: "2026-06-01",
    oracleScore: 51,
    spark: spark(15, 33),
  },
  {
    id: "oscar-best-picture",
    title: "Will an A24 film win Best Picture next ceremony?",
    category: "Culture",
    platform: "Manifold",
    probability: 28,
    change24h: -2.1,
    volume24h: 220_000,
    liquidity: 410_000,
    closeDate: "2027-03-15",
    oracleScore: 44,
    spark: spark(16, 28),
  },
  {
    id: "spacex-starship-orbit",
    title: "Will Starship reach full orbit before September?",
    category: "Tech",
    platform: "Polymarket",
    probability: 58,
    change24h: -3.9,
    volume24h: 690_000,
    liquidity: 1_500_000,
    closeDate: "2026-09-01",
    oracleScore: 67,
    spark: spark(17, 58),
  },
  // ---- Politics expansion ----
  { id: "uk-snap-election", title: "UK snap election called before Q4", category: "Politics", platform: "Polymarket", probability: 19, change24h: -1.6, volume24h: 880_000, liquidity: 1_700_000, closeDate: "2026-10-31", oracleScore: 53, spark: spark(31, 19) },
  { id: "biden-2028-run", title: "Biden runs for office again by 2028", category: "Politics", platform: "Manifold", probability: 8, change24h: -0.5, volume24h: 140_000, liquidity: 320_000, closeDate: "2027-12-31", oracleScore: 38, spark: spark(32, 8) },
  { id: "germany-coalition", title: "Germany forms new coalition before July", category: "Politics", platform: "Polymarket", probability: 54, change24h: 2.7, volume24h: 620_000, liquidity: 1_350_000, closeDate: "2026-07-01", oracleScore: 59, spark: spark(33, 54) },
  { id: "speaker-replaced", title: "US House Speaker replaced before EOY", category: "Politics", platform: "Kalshi", probability: 26, change24h: 3.4, volume24h: 1_120_000, liquidity: 2_100_000, closeDate: "2026-12-31", oracleScore: 61, spark: spark(34, 26) },
  // ---- Geopolitics expansion ----
  { id: "taiwan-incident", title: "Taiwan strait incident before EOY 2026", category: "Geopolitics", platform: "Polymarket", probability: 31, change24h: 4.8, volume24h: 2_640_000, liquidity: 4_800_000, closeDate: "2026-12-31", oracleScore: 70, spark: spark(35, 31) },
  { id: "russia-ceasefire-q3", title: "Russia–Ukraine ceasefire by Q3 2026", category: "Geopolitics", platform: "Kalshi", probability: 18, change24h: -2.1, volume24h: 1_540_000, liquidity: 3_100_000, closeDate: "2026-09-30", oracleScore: 64, spark: spark(36, 18) },
  { id: "iran-israel-90d", title: "Iran–Israel ceasefire holds 90 days", category: "Geopolitics", platform: "Polymarket", probability: 41, change24h: 1.6, volume24h: 1_980_000, liquidity: 3_700_000, closeDate: "2026-08-15", oracleScore: 62, spark: spark(37, 41) },
  { id: "nato-new-member", title: "NATO admits new member before EOY", category: "Geopolitics", platform: "Polymarket", probability: 14, change24h: -0.7, volume24h: 320_000, liquidity: 760_000, closeDate: "2026-12-31", oracleScore: 46, spark: spark(38, 14) },
  // ---- Crypto expansion ----
  { id: "btc-200k-eoy", title: "BTC > $200K by EOY 2026", category: "Crypto", platform: "Polymarket", probability: 17, change24h: 2.9, volume24h: 5_200_000, liquidity: 9_400_000, closeDate: "2026-12-31", oracleScore: 73, spark: spark(39, 17, 7) },
  { id: "eth-etf-5b-q2", title: "ETH ETF inflows > $5B in Q2", category: "Crypto", platform: "Kalshi", probability: 23, change24h: 1.7, volume24h: 1_640_000, liquidity: 3_100_000, closeDate: "2026-06-30", oracleScore: 65, spark: spark(40, 23) },
  { id: "sec-coinbase", title: "SEC drops Coinbase case in 2026", category: "Crypto", platform: "Polymarket", probability: 47, change24h: 5.8, volume24h: 2_280_000, liquidity: 4_400_000, closeDate: "2026-12-31", oracleScore: 76, spark: spark(41, 47) },
  { id: "sol-flip-eth", title: "Solana flips Ethereum mcap by 2027", category: "Crypto", platform: "Polymarket", probability: 9, change24h: -1.3, volume24h: 980_000, liquidity: 2_100_000, closeDate: "2027-12-31", oracleScore: 51, spark: spark(42, 9) },
  // ---- Economy expansion ----
  { id: "cpi-q3-4", title: "US CPI > 4% in Q3 2026", category: "Economy", platform: "Kalshi", probability: 19, change24h: 1.4, volume24h: 1_320_000, liquidity: 2_600_000, closeDate: "2026-10-31", oracleScore: 67, spark: spark(43, 19) },
  { id: "unemp-5-eoy", title: "US unemployment > 5% by EOY", category: "Economy", platform: "Kalshi", probability: 27, change24h: 2.6, volume24h: 1_840_000, liquidity: 3_400_000, closeDate: "2026-12-31", oracleScore: 70, spark: spark(44, 27) },
  { id: "ecb-pause", title: "ECB pauses cuts before September", category: "Economy", platform: "Kalshi", probability: 52, change24h: -1.9, volume24h: 920_000, liquidity: 1_900_000, closeDate: "2026-09-30", oracleScore: 58, spark: spark(45, 52) },
  // ---- Tech expansion ----
  { id: "gpt6-sep", title: "GPT-6 released before September", category: "Tech", platform: "Manifold", probability: 22, change24h: 3.1, volume24h: 380_000, liquidity: 820_000, closeDate: "2026-09-01", oracleScore: 60, spark: spark(46, 22) },
  { id: "openai-500b", title: "OpenAI valuation > $500B by EOY", category: "Tech", platform: "Polymarket", probability: 64, change24h: 4.4, volume24h: 1_120_000, liquidity: 2_300_000, closeDate: "2026-12-31", oracleScore: 71, spark: spark(47, 64) },
  { id: "apple-ar-glasses", title: "Apple ships AR glasses in 2026", category: "Tech", platform: "Polymarket", probability: 12, change24h: -2.4, volume24h: 540_000, liquidity: 1_100_000, closeDate: "2026-12-31", oracleScore: 49, spark: spark(48, 12) },
  { id: "tesla-robotaxi", title: "Tesla Robotaxi rollout in 5+ US cities", category: "Tech", platform: "Polymarket", probability: 34, change24h: -3.6, volume24h: 760_000, liquidity: 1_500_000, closeDate: "2026-12-31", oracleScore: 57, spark: spark(49, 34) },
  // ---- Sports expansion ----
  { id: "real-madrid-ucl", title: "Real Madrid wins Champions League 2026", category: "Sports", platform: "Polymarket", probability: 28, change24h: 2.2, volume24h: 1_240_000, liquidity: 2_400_000, closeDate: "2026-06-01", oracleScore: 56, spark: spark(50, 28) },
  { id: "lakers-playoffs", title: "Lakers make the playoffs", category: "Sports", platform: "Kalshi", probability: 71, change24h: 3.8, volume24h: 480_000, liquidity: 980_000, closeDate: "2026-04-30", oracleScore: 52, spark: spark(51, 71) },
  { id: "verstappen-f1", title: "Verstappen wins F1 2026 championship", category: "Sports", platform: "Polymarket", probability: 46, change24h: -1.1, volume24h: 620_000, liquidity: 1_300_000, closeDate: "2026-11-30", oracleScore: 54, spark: spark(52, 46) },
  { id: "warriors-finals", title: "Warriors reach NBA Finals", category: "Sports", platform: "Kalshi", probability: 22, change24h: -2.7, volume24h: 410_000, liquidity: 880_000, closeDate: "2026-06-15", oracleScore: 48, spark: spark(53, 22) },
  // ---- Culture ----
  { id: "a24-bp", title: "A24 film wins Best Picture next ceremony", category: "Culture", platform: "Manifold", probability: 28, change24h: -2.1, volume24h: 220_000, liquidity: 410_000, closeDate: "2027-03-15", oracleScore: 44, spark: spark(54, 28) },
];

export const CATEGORIES: { id: Category | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "Politics", label: "Politics" },
  { id: "Geopolitics", label: "Geopolitics" },
  { id: "Crypto", label: "Crypto" },
  { id: "Economy", label: "Economy" },
  { id: "Tech", label: "Tech" },
  { id: "Sports", label: "Sports" },
  { id: "Culture", label: "Culture" },
  { id: "Regulation", label: "Regulation" },
];

export interface RegionStat {
  id: string;
  name: string;
  activeMarkets: number;
  volume24h: number;
  topMarketId: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  // approximate position on a 1000x500 stylized world canvas
  cx: number;
  cy: number;
}

export const REGIONS: RegionStat[] = [
  { id: "us",  name: "United States", activeMarkets: 142, volume24h: 18_400_000, topMarketId: "fed-cut-jul", intensity: 5, cx: 240, cy: 200 },
  { id: "eu",  name: "Europe",        activeMarkets: 96,  volume24h: 9_700_000,  topMarketId: "eu-ai-reg-2026", intensity: 4, cx: 510, cy: 175 },
  { id: "uk",  name: "United Kingdom",activeMarkets: 38,  volume24h: 2_900_000,  topMarketId: "eu-ai-reg-2026", intensity: 3, cx: 478, cy: 158 },
  { id: "me",  name: "Middle East",   activeMarkets: 64,  volume24h: 6_100_000,  topMarketId: "iran-strike-aug", intensity: 4, cx: 600, cy: 240 },
  { id: "ua",  name: "Ukraine",       activeMarkets: 31,  volume24h: 3_400_000,  topMarketId: "ukraine-ceasefire-q3", intensity: 3, cx: 555, cy: 180 },
  { id: "cn",  name: "China",         activeMarkets: 49,  volume24h: 4_200_000,  topMarketId: "btc-120k-eoy", intensity: 3, cx: 770, cy: 220 },
  { id: "in",  name: "India",         activeMarkets: 27,  volume24h: 1_900_000,  topMarketId: "india-election-turnout", intensity: 2, cx: 705, cy: 265 },
  { id: "br",  name: "Brazil",        activeMarkets: 22,  volume24h: 1_300_000,  topMarketId: "brazil-rate-hike", intensity: 2, cx: 340, cy: 360 },
  { id: "jp",  name: "Japan",         activeMarkets: 18,  volume24h: 1_050_000,  topMarketId: "gpt5-dec", intensity: 2, cx: 845, cy: 215 },
  { id: "au",  name: "Australia",     activeMarkets: 11,  volume24h: 540_000,    topMarketId: "btc-120k-eoy", intensity: 1, cx: 845, cy: 395 },
];

export interface CalendarEvent {
  id: string;
  date: string;       // ISO
  timeUTC: string;    // "14:00 UTC"
  event: string;
  category: Category;
  related: string[];  // market ids
  probability: number;
  volumeInPlay: number;
}

export const CALENDAR: CalendarEvent[] = [
  { id: "fed-may", date: "2026-05-01", timeUTC: "18:00 UTC", event: "FOMC rate decision", category: "Economy", related: ["fed-cut-jul", "us-recession-2026"], probability: 38, volumeInPlay: 12_400_000 },
  { id: "cpi-may", date: "2026-05-13", timeUTC: "12:30 UTC", event: "US CPI release (April)", category: "Economy", related: ["fed-cut-jul"], probability: 41, volumeInPlay: 6_300_000 },
  { id: "india-elec", date: "2026-05-22", timeUTC: "16:00 UTC", event: "India state election results", category: "Politics", related: ["india-election-turnout"], probability: 47, volumeInPlay: 1_900_000 },
  { id: "ucl-final", date: "2026-06-01", timeUTC: "19:00 UTC", event: "Champions League final", category: "Sports", related: ["champions-league"], probability: 33, volumeInPlay: 4_100_000 },
  { id: "apple-wwdc", date: "2026-06-08", timeUTC: "17:00 UTC", event: "Apple WWDC keynote", category: "Tech", related: ["apple-ai-2026"], probability: 83, volumeInPlay: 2_700_000 },
  { id: "eu-ai-vote", date: "2026-06-18", timeUTC: "10:00 UTC", event: "EU AI regulation vote", category: "Regulation", related: ["eu-ai-reg-2026"], probability: 64, volumeInPlay: 3_400_000 },
  { id: "fed-jun", date: "2026-06-17", timeUTC: "18:00 UTC", event: "FOMC rate decision", category: "Economy", related: ["fed-cut-jul"], probability: 38, volumeInPlay: 9_800_000 },
  { id: "world-cup", date: "2026-07-12", timeUTC: "20:00 UTC", event: "World Cup final", category: "Sports", related: ["france-tournament"], probability: 24, volumeInPlay: 5_200_000 },
  { id: "court-crypto", date: "2026-09-30", timeUTC: "15:00 UTC", event: "Crypto regulation ruling", category: "Regulation", related: ["court-crypto-reg"], probability: 39, volumeInPlay: 1_700_000 },
];

export interface NewsItem {
  id: string;
  source: string;
  ago: string;
  headline: string;
  relatedMarketId: string;
  probabilityChange: number;
}

export const NEWS: NewsItem[] = [
  { id: "n1", source: "Reuters", ago: "12 min ago", headline: "Fed officials signal patience on rate cuts", relatedMarketId: "fed-cut-jul", probabilityChange: -3.2 },
  { id: "n2", source: "Bloomberg", ago: "38 min ago", headline: "EU lawmakers reach preliminary agreement on AI act amendments", relatedMarketId: "eu-ai-reg-2026", probabilityChange: 4.1 },
  { id: "n3", source: "FT", ago: "1 h ago", headline: "Bitcoin breaks above $98k as ETF inflows accelerate", relatedMarketId: "btc-120k-eoy", probabilityChange: 5.4 },
  { id: "n4", source: "AP", ago: "2 h ago", headline: "Trump approval ticks up in latest national poll", relatedMarketId: "trump-approval-45-jun", probabilityChange: 1.8 },
  { id: "n5", source: "WSJ", ago: "3 h ago", headline: "Apple confirms on-device AI roadmap ahead of WWDC", relatedMarketId: "apple-ai-2026", probabilityChange: 1.1 },
  { id: "n6", source: "Reuters", ago: "4 h ago", headline: "Ukraine talks stall as front-line activity intensifies", relatedMarketId: "ukraine-ceasefire-q3", probabilityChange: -2.6 },
  { id: "n7", source: "Bloomberg", ago: "5 h ago", headline: "Brazil central bank minutes hint at hawkish turn", relatedMarketId: "brazil-rate-hike", probabilityChange: 2.4 },
  { id: "n8", source: "Politico", ago: "6 h ago", headline: "House panel schedules hearing on stablecoin oversight", relatedMarketId: "court-crypto-reg", probabilityChange: 6.2 },
  { id: "n9", source: "The Information", ago: "7 h ago", headline: "OpenAI internal memo references GPT-5 evals", relatedMarketId: "gpt5-dec", probabilityChange: 3.6 },
  { id: "n10", source: "Reuters", ago: "8 h ago", headline: "Iran signals openness to extended ceasefire framework", relatedMarketId: "iran-israel-90d", probabilityChange: 1.6 },
  { id: "n11", source: "CoinDesk", ago: "9 h ago", headline: "SEC filings hint at imminent resolution in Coinbase case", relatedMarketId: "sec-coinbase", probabilityChange: 5.8 },
  { id: "n12", source: "The Economist", ago: "10 h ago", headline: "Tesla pushes Robotaxi launch into late 2026", relatedMarketId: "tesla-robotaxi", probabilityChange: -3.6 },
  { id: "n13", source: "Bloomberg", ago: "12 h ago", headline: "BLS preview points to softer payrolls report next week", relatedMarketId: "unemp-5-eoy", probabilityChange: 2.6 },
  { id: "n14", source: "FT", ago: "14 h ago", headline: "ECB hawks resist further rate cuts, minutes show", relatedMarketId: "ecb-pause", probabilityChange: -1.9 },
  { id: "n15", source: "AP", ago: "16 h ago", headline: "China steps up Taiwan strait drills, US carrier repositioned", relatedMarketId: "taiwan-incident", probabilityChange: 4.8 },
  { id: "n16", source: "Politico", ago: "18 h ago", headline: "House moderates float vote to oust Speaker", relatedMarketId: "speaker-replaced", probabilityChange: 3.4 },
];

export interface VenueRow {
  marketId: string;
  title: string;
  polyProb: number;
  kalshiProb: number;
  polyVol: number;
  kalshiVol: number;
  spread: number; // pts
  fees: string;
  liquidity: "Deep" | "Moderate" | "Thin";
  resolution: "Clear" | "Standard" | "Subjective";
  best: Platform;
}

export const VENUES: VenueRow[] = [
  { marketId: "fed-cut-jul", title: "Fed cut before July", polyProb: 39, kalshiProb: 38, polyVol: 4_120_000, kalshiVol: 4_820_000, spread: 1.2, fees: "0.0% / 0.0%", liquidity: "Deep", resolution: "Clear", best: "Kalshi" },
  { marketId: "us-recession-2026", title: "US recession in 2026", polyProb: 31, kalshiProb: 29, polyVol: 2_310_000, kalshiVol: 3_780_000, spread: 1.6, fees: "0.0% / 0.0%", liquidity: "Deep", resolution: "Standard", best: "Kalshi" },
  { marketId: "btc-120k-eoy", title: "Bitcoin > $120k by year-end", polyProb: 56, kalshiProb: 54, polyVol: 8_900_000, kalshiVol: 1_240_000, spread: 0.8, fees: "0.0% / 0.0%", liquidity: "Deep", resolution: "Clear", best: "Polymarket" },
  { marketId: "trump-approval-45-jun", title: "Trump approval > 45%", polyProb: 42, kalshiProb: 44, polyVol: 6_140_000, kalshiVol: 980_000, spread: 2.1, fees: "0.0% / 0.0%", liquidity: "Moderate", resolution: "Subjective", best: "Polymarket" },
  { marketId: "ukraine-ceasefire-q3", title: "Ukraine ceasefire before Q3", polyProb: 22, kalshiProb: 19, polyVol: 3_410_000, kalshiVol: 410_000, spread: 2.8, fees: "0.0% / 0.0%", liquidity: "Moderate", resolution: "Subjective", best: "Polymarket" },
];

export interface PlatformStat {
  id: Platform;
  markets: number;
  volume24h: number;
  strongest: Category;
  avgSpread: number; // pts
  url: string;
}

export const PLATFORMS: PlatformStat[] = [
  { id: "Polymarket", markets: 1840, volume24h: 42_300_000, strongest: "Politics", avgSpread: 1.4, url: "#" },
  { id: "Kalshi",     markets: 720,  volume24h: 18_900_000, strongest: "Economy",  avgSpread: 1.1, url: "#" },
  { id: "Manifold",   markets: 4200, volume24h: 380_000,    strongest: "Tech",     avgSpread: 3.6, url: "#" },
];

export const GUIDES = [
  { title: "What are prediction markets?", desc: "How probabilities are formed by collective trading.", topic: "Foundations" },
  { title: "Polymarket vs Kalshi", desc: "Comparing liquidity, fees, jurisdictions and resolution.", topic: "Platforms" },
  { title: "How probabilities work", desc: "Reading prices as probabilities, expected value, and edge.", topic: "Foundations" },
  { title: "Understanding liquidity", desc: "Order books, market depth and slippage in thin markets.", topic: "Mechanics" },
  { title: "Understanding spreads", desc: "Why bid-ask spreads matter for short-horizon trades.", topic: "Mechanics" },
  { title: "Resolution rules", desc: "How a market is resolved and what counts as the source of truth.", topic: "Mechanics" },
  { title: "Market risk", desc: "Stale data, manipulation, and information asymmetry.", topic: "Risk" },
  { title: "How Oracle Score works", desc: "A 0–100 prioritization indicator. Not a profit guarantee.", topic: "Oracle" },
  { title: "Event calendars", desc: "Mapping resolutions, releases, and rulings to markets.", topic: "Workflow" },
  { title: "How news moves probabilities", desc: "Linking catalysts to probability movements over time.", topic: "Workflow" },
];

/**
 * Composite index series — fake aggregate "Oracle Composite Index" by timeframe.
 * Values are an arbitrary index level. Always trends with realistic volatility.
 */
function series(seed: number, points: number, start: number, drift: number, vol: number) {
  const out: { t: number; v: number }[] = [];
  let v = start;
  for (let i = 0; i < points; i++) {
    const noise = (Math.sin(seed + i * 0.6) + Math.cos(seed * 0.7 + i * 0.3)) * vol;
    v += drift / points + noise * 0.35;
    out.push({ t: i, v: Number(v.toFixed(2)) });
  }
  return out;
}

export const COMPOSITE = {
  "1H":  series(21,  60, 1242, 1.4,  0.6),
  "24H": series(22, 96,  1238, 4.2,  1.4),
  "7D":  series(23, 168, 1218, 14.0, 3.0),
  "30D": series(24, 200, 1180, 26.0, 5.5),
  "ALL": series(25, 240, 1000, 244,  9.0),
} as const;

export type Timeframe = keyof typeof COMPOSITE;

export const COMPOSITE_NOW = 0.541;
export const COMPOSITE_DELTA_24H = -0.84; // %

export const STATS = {
  totalActiveMarkets: 6483,
  totalVolume24h: 64_900_000,
  biggestMoveId: "court-crypto-reg",
  mostLiquidId: "btc-120k-eoy",
  liveActivity: spark(99, 62, 5),
};

/**
 * Aggregate per-category state for the hero "Top Categories" panel.
 * Probability is a synthetic mean across the category's markets.
 * 24h change is a synthetic blended movement.
 */
export interface CategoryAggregate {
  category: Category;
  prob: number;
  change24h: number;
  spark: number[];
}

export const TOP_CATEGORIES: CategoryAggregate[] = [
  { category: "Politics",    prob: 38, change24h:  1.2, spark: spark(60, 38) },
  { category: "Geopolitics", prob: 27, change24h: -1.8, spark: spark(61, 27) },
  { category: "Crypto",      prob: 41, change24h:  3.4, spark: spark(62, 41, 7) },
  { category: "Economy",     prob: 33, change24h: -0.9, spark: spark(63, 33) },
  { category: "Tech",        prob: 49, change24h:  2.1, spark: spark(64, 49) },
  { category: "Sports",      prob: 46, change24h:  0.7, spark: spark(65, 46) },
  { category: "Culture",     prob: 31, change24h: -0.4, spark: spark(66, 31) },
];

export function fmtMoney(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export function fmtPct(n: number, signed = false): string {
  const s = `${n.toFixed(1)}%`;
  if (!signed) return s;
  return n > 0 ? `+${s}` : s;
}

/**
 * Probability as 0.XX (TradingView-style decimal). e.g. 42 → "0.42".
 */
export function fmtProb(n: number): string {
  return (n / 100).toFixed(2);
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function daysUntil(iso: string): number {
  const d = new Date(iso).getTime();
  const now = new Date("2026-04-25").getTime();
  return Math.max(0, Math.round((d - now) / (1000 * 60 * 60 * 24)));
}

export function getMarket(id: string): Market | undefined {
  return MARKETS.find((m) => m.id === id);
}

export function byCategory(c: Category): Market[] {
  return MARKETS.filter((m) => m.category === c);
}

export const CATEGORY_PILLS: { id: string; label: string; targetId: string }[] = [
  { id: "all", label: "All", targetId: "overview" },
  { id: "politics", label: "Politics", targetId: "cat-Politics" },
  { id: "geopolitics", label: "Geopolitics", targetId: "cat-Geopolitics" },
  { id: "crypto", label: "Crypto", targetId: "cat-Crypto" },
  { id: "economy", label: "Economy", targetId: "cat-Economy" },
  { id: "tech", label: "Tech", targetId: "cat-Tech" },
  { id: "sports", label: "Sports", targetId: "cat-Sports" },
  { id: "culture", label: "Culture", targetId: "cat-Culture" },
  { id: "regulation", label: "Regulation", targetId: "cat-Regulation" },
  { id: "platforms", label: "Platforms", targetId: "platforms" },
];