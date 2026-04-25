export interface ResolutionEvent {
  id: string;
  date: string;     // "May 7"
  timeUTC: string;  // "14:00 UTC"
  event: string;
  chips: string[];
  volInPlay: string;
}

export const RESOLUTION_EVENTS: ResolutionEvent[] = [
  { id: "e-1", date: "May 7",  timeUTC: "14:00 UTC", event: "FOMC Decision",                       chips: ["Fed cuts 50bps", "US recession 2026"], volInPlay: "$8.4M" },
  { id: "e-2", date: "May 12", timeUTC: "18:00 UTC", event: "EU Parliament AI Act Vote",          chips: ["EU AI Act amendments pass"],            volInPlay: "$3.1M" },
  { id: "e-3", date: "May 24", timeUTC: "19:30 UTC", event: "Champions League Final",             chips: ["Real Madrid wins"],                     volInPlay: "$4.2M" },
  { id: "e-4", date: "May 28", timeUTC: "12:30 UTC", event: "US Q1 GDP Final",                    chips: ["US recession 2026"],                    volInPlay: "$2.6M" },
  { id: "e-5", date: "May 31", timeUTC: "23:59 UTC", event: "Iran nuclear deadline",              chips: ["Iran-Israel ceasefire"],                volInPlay: "$5.8M" },
  { id: "e-6", date: "Jun 4",  timeUTC: "14:00 UTC", event: "May CPI Release",                    chips: ["CPI > 4% Q3"],                          volInPlay: "$3.4M" },
  { id: "e-7", date: "Jun 12", timeUTC: "14:00 UTC", event: "FOMC June Decision",                 chips: ["Fed cuts 50bps"],                       volInPlay: "$9.1M" },
  { id: "e-8", date: "Jun 24", timeUTC: "06:00 UTC", event: "UK Election Date Announcement",     chips: ["UK early election"],                    volInPlay: "$1.7M" },
];
