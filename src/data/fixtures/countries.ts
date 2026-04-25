/** Stylized country/region volume data for the global map. */
export interface RegionVol {
  id: string;
  name: string;
  vol: number; // USD
  topMarket: string;
  // Approximate (cx,cy) on a 1000x500 stylized world canvas
  cx: number;
  cy: number;
  tier: 1 | 2 | 3 | 4; // color tier
}

export const REGIONS: RegionVol[] = [
  { id: "us",  name: "United States", vol: 84_200_000, topMarket: "Trump approval >45%",          cx: 240, cy: 200, tier: 4 },
  { id: "eu",  name: "European Union",vol: 32_100_000, topMarket: "EU AI Act amendments pass",    cx: 510, cy: 175, tier: 3 },
  { id: "uk",  name: "United Kingdom",vol: 9_600_000,  topMarket: "UK calls early election",      cx: 478, cy: 158, tier: 2 },
  { id: "ru",  name: "Russia",        vol: 12_400_000, topMarket: "Russia-Ukraine ceasefire Q3",  cx: 645, cy: 150, tier: 3 },
  { id: "ua",  name: "Ukraine",       vol: 11_700_000, topMarket: "Russia-Ukraine ceasefire Q3",  cx: 555, cy: 180, tier: 3 },
  { id: "il",  name: "Israel",        vol: 14_300_000, topMarket: "Iran-Israel ceasefire holds",  cx: 590, cy: 235, tier: 3 },
  { id: "ir",  name: "Iran",          vol: 18_400_000, topMarket: "Iran-Israel ceasefire holds",  cx: 625, cy: 230, tier: 3 },
  { id: "cn",  name: "China",         vol: 21_800_000, topMarket: "Taiwan Strait incident",       cx: 770, cy: 220, tier: 3 },
  { id: "tw",  name: "Taiwan",        vol: 6_400_000,  topMarket: "Taiwan Strait incident",       cx: 800, cy: 248, tier: 2 },
  { id: "in",  name: "India",         vol: 9_200_000,  topMarket: "Pakistan-India border clash",  cx: 705, cy: 265, tier: 2 },
  { id: "br",  name: "Brazil",        vol: 4_300_000,  topMarket: "BTC > \$200K by EOY",          cx: 340, cy: 360, tier: 1 },
  { id: "jp",  name: "Japan",         vol: 5_200_000,  topMarket: "GPT-6 released before Sept",   cx: 845, cy: 215, tier: 2 },
  { id: "kr",  name: "South Korea",   vol: 3_100_000,  topMarket: "North Korea missile test",     cx: 815, cy: 220, tier: 1 },
  { id: "au",  name: "Australia",     vol: 1_900_000,  topMarket: "Olympics 2028 LA host issue",  cx: 845, cy: 395, tier: 1 },
  { id: "ca",  name: "Canada",        vol: 4_700_000,  topMarket: "Trump approval >45%",          cx: 235, cy: 130, tier: 1 },
  { id: "mx",  name: "Mexico",        vol: 1_400_000,  topMarket: "US recession 2026",            cx: 220, cy: 250, tier: 1 },
];

export const TOP_REGIONS = [
  { name: "United States",  vol: "\$84.2M", topMarket: "Trump approval >45%" },
  { name: "European Union", vol: "\$32.1M", topMarket: "EU AI Act amendments pass" },
  { name: "Middle East",    vol: "\$18.4M", topMarket: "Iran-Israel ceasefire" },
  { name: "Asia-Pacific",   vol: "\$14.7M", topMarket: "Taiwan Strait incident" },
];
