import type { HomeCategory } from "./markets";

export interface HomeNewsItem {
  id: string;
  source: string;
  ago: string;
  headline: string;
  category: HomeCategory;
  relatedTitle: string;
  probMove: number; // percent points
}

export const HOME_NEWS: HomeNewsItem[] = [
  // Economy
  { id: "n-1",  source: "Reuters",   ago: "12 min ago", headline: "Fed officials signal patience on rate cuts ahead of June meeting", category: "Economy",     relatedTitle: "Fed cuts 50bps before July",        probMove: -3.2 },
  { id: "n-2",  source: "Bloomberg", ago: "26 min ago", headline: "BLS preview points to softer April payrolls report next week",        category: "Economy",     relatedTitle: "Unemployment > 5% by EOY",          probMove:  2.6 },
  { id: "n-3",  source: "FT",        ago: "44 min ago", headline: "ECB hawks resist further rate cuts as core inflation proves sticky",  category: "Economy",     relatedTitle: "ECB cuts 75bps total in 2026",      probMove: -1.9 },
  { id: "n-4",  source: "Bloomberg", ago: "1 h ago",    headline: "Brent crude slides on demand fears, OPEC+ patience tested",            category: "Economy",     relatedTitle: "Oil > $100 before EOY",             probMove: -0.4 },
  // Geopolitics
  { id: "n-5",  source: "Reuters",   ago: "1 h ago",    headline: "Iran summons IAEA chief amid renewed nuclear talks deadlock",          category: "Geopolitics", relatedTitle: "Iran-Israel ceasefire holds 90 days", probMove: -2.3 },
  { id: "n-6",  source: "AP",        ago: "2 h ago",    headline: "Ukraine talks stall as front-line activity intensifies in the east",   category: "Geopolitics", relatedTitle: "Russia-Ukraine ceasefire by Q3",      probMove:  1.1 },
  { id: "n-7",  source: "Reuters",   ago: "2 h ago",    headline: "China steps up Taiwan strait drills, US carrier repositioned nearby",   category: "Geopolitics", relatedTitle: "Taiwan Strait incident before EOY",   probMove:  0.3 },
  { id: "n-8",  source: "Politico",  ago: "3 h ago",    headline: "Riyadh signals openness to staged normalization framework",            category: "Geopolitics", relatedTitle: "Saudi-Israel normalization 2026",     probMove: -0.2 },
  // Politics
  { id: "n-9",  source: "Politico",  ago: "3 h ago",    headline: "House moderates float vote to oust Speaker before recess",             category: "Politics",    relatedTitle: "DOJ indicts another major figure",   probMove: -0.9 },
  { id: "n-10", source: "AP",        ago: "4 h ago",    headline: "Trump approval ticks up in latest national poll, narrow gain",         category: "Politics",    relatedTitle: "Trump approval >45% by July",        probMove:  3.1 },
  { id: "n-11", source: "Reuters",   ago: "4 h ago",    headline: "EU lawmakers reach preliminary agreement on AI act amendments",        category: "Politics",    relatedTitle: "EU AI Act amendments by Q3",         probMove:  2.2 },
  { id: "n-12", source: "FT",        ago: "5 h ago",    headline: "Macron loses key vote in Assembly as coalition shows cracks",          category: "Politics",    relatedTitle: "Macron ends PM term before EOY",     probMove: -1.4 },
  // Crypto
  { id: "n-13", source: "CoinDesk",  ago: "6 h ago",    headline: "Bitcoin ETF inflows rebound to $1.4B weekly after April drawdown",     category: "Crypto",      relatedTitle: "BTC > $200K by EOY 2026",            probMove:  4.2 },
  { id: "n-14", source: "The Block", ago: "7 h ago",    headline: "SEC filings hint at imminent resolution in Coinbase case",             category: "Crypto",      relatedTitle: "SEC drops Coinbase case",            probMove:  1.4 },
  { id: "n-15", source: "CoinDesk",  ago: "8 h ago",    headline: "Senate banking committee greenlights stablecoin framework markup",     category: "Crypto",      relatedTitle: "Stablecoin bill passes US Senate",   probMove:  3.3 },
  { id: "n-16", source: "The Block", ago: "9 h ago",    headline: "Solana TVL eclipses post-2022 high amid memecoin frenzy",              category: "Crypto",      relatedTitle: "Solana flips ETH market cap by 2027", probMove: -0.8 },
  // Tech
  { id: "n-17", source: "Reuters",   ago: "10 h ago",   headline: "OpenAI announces GPT-6 timeline at developer conference keynote",       category: "Tech",        relatedTitle: "GPT-6 released before September",     probMove:  2.1 },
  { id: "n-18", source: "Bloomberg", ago: "12 h ago",   headline: "Tesla cuts Q1 production in Berlin gigafactory amid demand softness",   category: "Tech",        relatedTitle: "Tesla Robotaxi rollout",             probMove: -3.2 },
  { id: "n-19", source: "FT",        ago: "13 h ago",   headline: "Anthropic in talks for $20B funding round at $200B valuation",          category: "Tech",        relatedTitle: "OpenAI valuation > $500B by EOY",    probMove:  1.4 },
  { id: "n-20", source: "The Information", ago: "14 h ago", headline: "Apple delays AR glasses launch into 2027 according to suppliers", category: "Tech",        relatedTitle: "Apple ships AR glasses 2026",        probMove: -0.7 },
  // Sports
  { id: "n-21", source: "ESPN",      ago: "15 h ago",   headline: "Real Madrid signs new defender ahead of Champions League final",        category: "Sports",      relatedTitle: "Real Madrid wins UCL 2026",          probMove:  1.4 },
  { id: "n-22", source: "ESPN",      ago: "16 h ago",   headline: "Lakers clinch playoff berth after dominant home stretch",               category: "Sports",      relatedTitle: "Lakers make NBA playoffs",           probMove:  0.6 },
  { id: "n-23", source: "Reuters",   ago: "18 h ago",   headline: "Verstappen takes pole in Imola as Red Bull regains pace",               category: "Sports",      relatedTitle: "Verstappen wins F1 2026",            probMove: -0.8 },
  { id: "n-24", source: "ESPN",      ago: "20 h ago",   headline: "Mahomes signs supplementary deal as Chiefs reload roster",              category: "Sports",      relatedTitle: "Mahomes MVP 2026",                   probMove:  0.4 },
  { id: "n-25", source: "Variety",   ago: "30 min ago", headline: "Awards season buzz tightens as biopic clears guild votes",              category: "Culture",     relatedTitle: "Best Picture 2026",                  probMove:  1.6 },
  { id: "n-26", source: "Billboard", ago: "1 h ago",    headline: "Taylor Swift teases tour rehearsal footage on socials",                 category: "Culture",     relatedTitle: "Swift announces new world tour",     probMove:  2.4 },
  { id: "n-27", source: "IGN",       ago: "3 h ago",    headline: "GTA VI second trailer cracks record viewership in 24h",                 category: "Culture",     relatedTitle: "GTA VI ships before Q4 2026",        probMove:  3.1 },
  { id: "n-28", source: "Variety",   ago: "5 h ago",    headline: "Stranger Things finale premiere date moves up by two weeks",            category: "Culture",     relatedTitle: "Netflix top show: ST finale",        probMove:  1.1 },
  { id: "n-29", source: "Reuters",   ago: "20 min ago", headline: "EU Commission tables enforcement timeline for high-risk AI systems",    category: "Regulation",  relatedTitle: "EU AI Act enforcement before EOY",   probMove:  2.2 },
  { id: "n-30", source: "WSJ",       ago: "1 h ago",    headline: "SEC chair signals final crypto custody framework within months",        category: "Regulation",  relatedTitle: "SEC final crypto custody rule",      probMove: -1.1 },
  { id: "n-31", source: "Politico",  ago: "2 h ago",    headline: "Senate banking advances stablecoin bill with bipartisan support",       category: "Regulation",  relatedTitle: "US stablecoin bill signed",          probMove:  3.3 },
  { id: "n-32", source: "Bloomberg", ago: "4 h ago",    headline: "TikTok divestment talks resume as US deadline approaches",              category: "Regulation",  relatedTitle: "TikTok divestment or US ban",        probMove: -0.9 },
  { id: "n-33", source: "Reuters",   ago: "6 h ago",    headline: "DOJ proposes structural remedy in Google antitrust case",               category: "Regulation",  relatedTitle: "DOJ wins Google antitrust remedy",   probMove:  1.6 },
];

export function newsByCategory(c: HomeCategory): HomeNewsItem[] {
  return HOME_NEWS.filter((n) => n.category === c);
}

export function topNews(n = 16): HomeNewsItem[] {
  return HOME_NEWS.slice(0, n);
}
