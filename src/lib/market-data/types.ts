/**
 * Oracle normalized market data layer — domain types.
 * Probabilities are always 0..1. Changes are percentage points (e.g. +3.1 = +3.1pp).
 */

/** Prediction platform that hosts or originally listed the market */
export type PredictionPlatform =
  | "polymarket"
  | "kalshi"
  | "manifold"
  | "oracle-fixture";

/** Thematic category used for navigation, filtering and section layout */
export type MarketCategory =
  | "politics"
  | "geopolitics"
  | "crypto"
  | "economy"
  | "tech"
  | "sports"
  | "culture"
  | "regulation"
  | "platforms"
  | "other";

export type MarketStatus = "active" | "closed" | "resolved" | "disputed";

/** Geographic region associated with a market's primary subject */
export type MarketRegion =
  | "united-states"
  | "europe"
  | "middle-east"
  | "ukraine"
  | "china"
  | "india"
  | "brazil"
  | "global-macro"
  | "asia-pacific"
  | "latin-america"
  | "africa"
  | "other";

/** A single possible outcome within a market (YES/NO or multi-choice) */
export interface MarketOutcome {
  id: string;
  label: string;
  /** 0..1 */
  probability: number;
  /** USDC or USD price of a $1 contract */
  price?: number;
  volume?: number;
  /** Percentage points change in last 24h */
  change24h?: number;
  colorKey?: string;
}

/** One time-stamped probability reading, used to build chart series */
export interface ProbabilityPoint {
  /** Unix millisecond timestamp */
  timestamp: number;
  /** 0..1 */
  probability: number;
  outcomeId?: string;
  volume?: number;
  /** Optional label for a specific news catalyst at this point */
  eventLabel?: string;
}

/** Named chart series for multi-outcome markets */
export interface MarketChartSeries {
  outcomeId: string;
  label: string;
  color: string;
  points: ProbabilityPoint[];
}

/** How a market should be rendered when no official image is available */
export interface MarketVisualFallback {
  type:
    | "image"
    | "flag-pair"
    | "crypto-logo"
    | "person"
    | "team-logo"
    | "company-logo"
    | "country-flag"
    | "category-icon"
    | "generated-symbol";
  /** Primary entity key (flag code, token ticker, team name…) */
  primary?: string;
  /** Secondary entity key for comparisons (flag-pair, versus markets) */
  secondary?: string;
  imageUrl?: string;
  emojiFallback?: string;
  alt: string;
}

/** A news article linked to a market and its measured probability impact */
export interface MarketNewsItem {
  id: string;
  source: string;
  headline: string;
  url?: string;
  /** ISO 8601 */
  publishedAt: string;
  relatedMarketId: string;
  /** Percentage points change attributed to this article */
  probabilityImpact: number;
  probabilityImpactWindow: "1h" | "24h" | "7d";
  category: MarketCategory;
  region?: MarketRegion;
  credibility: "high" | "medium" | "low";
}

/** Aggregated market statistics for a geographic region */
export interface RegionMarketStats {
  region: MarketRegion;
  label: string;
  count: number;
  activeMarkets: number;
  totalVolume24h: number;
  /** Average of probabilityChange24h across all markets in region */
  avgProbabilityChange24h: number;
  topMarketId?: string;
  /** 1 = quiet, 5 = very high activity — derived from relative volume */
  heatLevel: 1 | 2 | 3 | 4 | 5;
}

/**
 * Side-by-side comparison of the same real-world event across Polymarket and Kalshi.
 * Used to surface price divergences that may represent an edge.
 */
export interface VenueComparison {
  id: string;
  title: string;
  category: MarketCategory;
  polymarketMarketId?: string;
  kalshiMarketId?: string;
  polymarketProbability?: number;
  kalshiProbability?: number;
  polymarketVolume24h?: number;
  kalshiVolume24h?: number;
  polymarketLiquidity?: number;
  kalshiLiquidity?: number;
  /** Absolute difference between venue probabilities (percentage points) */
  probabilityGap?: number;
  spreadGap?: number;
  bestVenue?: PredictionPlatform;
  bestVenueReason?: string;
  matchConfidence: "high" | "medium" | "low";
  comparisonType: "same-event" | "similar-event" | "theme-related";
}

/**
 * Oracle's proprietary quality and activity score for a market.
 * Combines liquidity, volume, movement, news pressure, resolution clarity and venue divergence.
 */
export interface OracleScore {
  marketId: string;
  /** 0–100 composite score */
  score: number;
  components: {
    liquidity: number;
    volume: number;
    movement: number;
    newsPressure: number;
    resolutionClarity: number;
    venueDivergence?: number;
  };
  label:
    | "low-signal"
    | "watch"
    | "active"
    | "strong-signal"
    | "exceptional";
  explanation: string;
  /** ISO 8601 */
  updatedAt: string;
}

/**
 * The core normalized market object.
 * All platform-specific fields are mapped to a common schema so the UI never
 * reads from raw Polymarket / Kalshi / Manifold response shapes directly.
 */
export interface OracleMarket {
  id: string;
  /** Original ID on the source platform */
  sourceId: string;
  slug: string;
  title: string;
  /** ≤ 34 characters — used in compact table and pill views */
  shortTitle: string;
  description: string;
  platform: PredictionPlatform;
  isFixture: boolean;
  category: MarketCategory;
  subcategory?: string;
  status: MarketStatus;
  /** Primary YES probability, 0..1 */
  probability: number;
  /** Percentage points change over last 24h */
  probabilityChange24h: number;
  /** Percentage points change over last 7d */
  probabilityChange7d: number;
  volume24h: number;
  volumeTotal: number;
  liquidity: number;
  /** Bid-ask spread in percentage points */
  spread: number;
  /** ISO 8601 — market close date */
  closeDate: string;
  resolutionDate?: string;
  /** ISO 8601 */
  createdAt: string;
  /** ISO 8601 */
  updatedAt: string;
  imageUrl?: string;
  iconKey?: string;
  visualFallback: MarketVisualFallback;
  region: MarketRegion;
  countryCodes: string[];
  tags: string[];
  outcomes: MarketOutcome[];
  /** 20-point probability history for the sparkline / chart */
  chartData: ProbabilityPoint[];
  chartSeries?: MarketChartSeries[];
  relatedNews: MarketNewsItem[];
  sourceUrl: string;
  /** 0–100 composite Oracle signal score */
  oracleScore?: number;
  confidenceScore?: number;
  resolutionClarity: "clear" | "ambiguous" | "disputed";
  venueComparisons?: VenueComparison[];
  /** Raw platform response, retained for debugging */
  raw?: unknown;
}
