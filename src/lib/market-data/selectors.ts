/**
 * Oracle market selectors — pure functions only.
 * No side-effects, no mutations. All sort operations work on copies.
 */

import type {
  OracleMarket,
  MarketCategory,
  MarketRegion,
  PredictionPlatform,
  RegionMarketStats,
} from "./types";

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const REGION_LABELS: Record<MarketRegion, string> = {
  "united-states": "United States",
  europe: "Europe",
  "middle-east": "Middle East",
  ukraine: "Ukraine",
  china: "China",
  india: "India",
  brazil: "Brazil",
  "global-macro": "Global Macro",
  "asia-pacific": "Asia-Pacific",
  "latin-america": "Latin America",
  africa: "Africa",
  other: "Other",
};

/**
 * Normalizes a value to the 0..1 range given observed min and max.
 * Returns 0.5 when min === max to avoid division by zero.
 */
function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

// ---------------------------------------------------------------------------
// Category / region / platform filters
// ---------------------------------------------------------------------------

export function getMarketsByCategory(
  markets: OracleMarket[],
  category: MarketCategory
): OracleMarket[] {
  return markets.filter((m) => m.category === category);
}

export function getMarketsByRegion(
  markets: OracleMarket[],
  region: MarketRegion
): OracleMarket[] {
  return markets.filter((m) => m.region === region);
}

export function getMarketsByPlatform(
  markets: OracleMarket[],
  platform: PredictionPlatform
): OracleMarket[] {
  return markets.filter((m) => m.platform === platform);
}

// ---------------------------------------------------------------------------
// Activity / liquidity
// ---------------------------------------------------------------------------

/** Markets sorted by 24h volume, descending */
export function getMostActive(
  markets: OracleMarket[],
  limit = 8
): OracleMarket[] {
  return [...markets].sort((a, b) => b.volume24h - a.volume24h).slice(0, limit);
}

/** Markets sorted by liquidity, descending */
export function getHighestLiquidity(
  markets: OracleMarket[],
  limit = 8
): OracleMarket[] {
  return [...markets].sort((a, b) => b.liquidity - a.liquidity).slice(0, limit);
}

// ---------------------------------------------------------------------------
// Movement
// ---------------------------------------------------------------------------

/** Markets sorted by absolute 24h probability change, descending */
export function getTopMovers(
  markets: OracleMarket[],
  limit = 8
): OracleMarket[] {
  return [...markets]
    .sort(
      (a, b) =>
        Math.abs(b.probabilityChange24h) - Math.abs(a.probabilityChange24h)
    )
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

const NOW_MS = new Date("2026-04-25").getTime();
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Markets closing within `limitDays` days from today, sorted by closeDate ascending.
 * Only includes active markets.
 */
export function getResolvingSoon(
  markets: OracleMarket[],
  limitDays = 14,
  limit = 8
): OracleMarket[] {
  const cutoff = NOW_MS + limitDays * DAY_MS;
  return [...markets]
    .filter((m) => {
      if (m.status !== "active") return false;
      const closeMs = new Date(m.closeDate).getTime();
      return closeMs >= NOW_MS && closeMs <= cutoff;
    })
    .sort(
      (a, b) =>
        new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime()
    )
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Featured scoring
// ---------------------------------------------------------------------------

/**
 * Returns the top `limit` markets by a composite featured score.
 * Score weights:
 *   30% normalized 24h volume
 *   25% normalized liquidity
 *   20% normalized absolute 24h movement
 *   15% has imageUrl or non-empty visualFallback
 *   10% has at least one related news item
 */
export function getFeaturedMarkets(
  markets: OracleMarket[],
  limit = 6
): OracleMarket[] {
  if (markets.length === 0) return [];

  const volumes = markets.map((m) => m.volume24h);
  const liquidities = markets.map((m) => m.liquidity);
  const movements = markets.map((m) => Math.abs(m.probabilityChange24h));

  const minVol = Math.min(...volumes);
  const maxVol = Math.max(...volumes);
  const minLiq = Math.min(...liquidities);
  const maxLiq = Math.max(...liquidities);
  const minMov = Math.min(...movements);
  const maxMov = Math.max(...movements);

  const scored = markets.map((m) => {
    const hasVisual = m.imageUrl != null || m.visualFallback != null ? 1 : 0;
    const hasNews = m.relatedNews.length > 0 ? 1 : 0;
    const score =
      0.3 * normalize(m.volume24h, minVol, maxVol) +
      0.25 * normalize(m.liquidity, minLiq, maxLiq) +
      0.2 * normalize(Math.abs(m.probabilityChange24h), minMov, maxMov) +
      0.15 * hasVisual +
      0.1 * hasNews;
    return { market: m, score };
  });

  return [...scored]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.market);
}

// ---------------------------------------------------------------------------
// News
// ---------------------------------------------------------------------------

/** Markets that have at least one linked news item */
export function getMarketsWithNews(markets: OracleMarket[]): OracleMarket[] {
  return markets.filter((m) => m.relatedNews.length > 0);
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/**
 * Full-text search across title, shortTitle, description, and tags.
 * Case-insensitive. Returns markets with at least one field matching the query.
 */
export function searchMarkets(
  markets: OracleMarket[],
  query: string
): OracleMarket[] {
  const q = query.toLowerCase().trim();
  if (!q) return markets;
  return markets.filter((m) => {
    return (
      m.title.toLowerCase().includes(q) ||
      m.shortTitle.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q))
    );
  });
}

// ---------------------------------------------------------------------------
// Region stats
// ---------------------------------------------------------------------------

/**
 * Aggregates per-region statistics from a market list.
 * heatLevel is 1–5 based on each region's share of the max regional volume.
 */
export function getRegionStats(markets: OracleMarket[]): RegionMarketStats[] {
  const buckets = new Map<MarketRegion, OracleMarket[]>();

  for (const m of markets) {
    const existing = buckets.get(m.region);
    if (existing) {
      existing.push(m);
    } else {
      buckets.set(m.region, [m]);
    }
  }

  const allTotals: number[] = [];
  for (const list of buckets.values()) {
    allTotals.push(list.reduce((s, m) => s + m.volume24h, 0));
  }
  const maxVol = Math.max(...allTotals, 1);

  const stats: RegionMarketStats[] = [];

  for (const [region, list] of buckets.entries()) {
    const totalVolume24h = list.reduce((s, m) => s + m.volume24h, 0);
    const activeMarkets = list.filter((m) => m.status === "active").length;
    const avgProbabilityChange24h =
      list.reduce((s, m) => s + m.probabilityChange24h, 0) / list.length;
    const topMarket = [...list].sort((a, b) => b.volume24h - a.volume24h)[0];

    const relVol = totalVolume24h / maxVol;
    const heatLevel =
      relVol > 0.8
        ? 5
        : relVol > 0.6
        ? 4
        : relVol > 0.4
        ? 3
        : relVol > 0.2
        ? 2
        : 1;

    stats.push({
      region,
      label: REGION_LABELS[region],
      count: list.length,
      activeMarkets,
      totalVolume24h,
      avgProbabilityChange24h: Number(avgProbabilityChange24h.toFixed(3)),
      topMarketId: topMarket?.id,
      heatLevel: heatLevel as 1 | 2 | 3 | 4 | 5,
    });
  }

  return stats.sort((a, b) => b.totalVolume24h - a.totalVolume24h);
}
