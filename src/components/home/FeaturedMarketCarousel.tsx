import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getFeaturedMarkets, FIXTURE_MARKETS } from "@/lib/market-data";
import type { OracleMarket } from "@/lib/market-data";
import { fmtProb, fmtVol } from "@/data/fixtures/markets";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";

const FEATURED = getFeaturedMarkets(FIXTURE_MARKETS, 6);

function daysUntil(iso: string): number {
  const now = Date.now();
  const target = new Date(iso).getTime();
  return Math.max(0, Math.ceil((target - now) / 86_400_000));
}

function visualToneClass(type: OracleMarket["visualFallback"]["type"]): string {
  switch (type) {
    case "country-flag":
    case "flag-pair":
      return "bg-blue-950/40 border-blue-900/40";
    case "crypto-logo":
      return "bg-yellow-950/40 border-yellow-900/40";
    case "person":
      return "bg-slate-900/60 border-slate-700/40";
    case "team-logo":
      return "bg-emerald-950/40 border-emerald-900/40";
    case "company-logo":
      return "bg-violet-950/40 border-violet-900/40";
    case "category-icon":
    case "generated-symbol":
    case "image":
    default:
      return "bg-surface-2 border-border";
  }
}

function visualAccentColor(type: OracleMarket["visualFallback"]["type"]): string {
  switch (type) {
    case "country-flag":
    case "flag-pair":
      return "rgba(59,130,246,0.08)";
    case "crypto-logo":
      return "rgba(234,179,8,0.08)";
    case "person":
      return "rgba(148,163,184,0.06)";
    case "team-logo":
      return "rgba(16,185,129,0.08)";
    case "company-logo":
      return "rgba(139,92,246,0.08)";
    default:
      return "transparent";
  }
}

export function FeaturedMarketCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || FEATURED.length === 0) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % FEATURED.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  if (FEATURED.length === 0) return null;

  const market = FEATURED[activeIndex];

  function prev() {
    setActiveIndex((i) => (i - 1 + FEATURED.length) % FEATURED.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % FEATURED.length);
  }

  return (
    <section
      className="border-b border-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-[22px] font-semibold tracking-tight text-foreground">
              Featured markets
            </h2>
            <p className="mt-1 max-w-[520px] text-[13px] text-muted-foreground">
              High-signal markets ranked by volume, liquidity, movement and news pressure.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-1">
            <button
              onClick={prev}
              className="flex h-8 w-8 items-center justify-center rounded border border-border bg-surface-1 text-muted-foreground transition-colors hover:border-hover hover:text-foreground"
              aria-label="Previous market"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              className="flex h-8 w-8 items-center justify-center rounded border border-border bg-surface-1 text-muted-foreground transition-colors hover:border-hover hover:text-foreground"
              aria-label="Next market"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Slide key={activeIndex} market={market} />

        {/* Dot indicators */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {FEATURED.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex
                  ? "w-4 bg-foreground"
                  : "w-1.5 bg-surface-3 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Slide({ market: m }: { market: OracleMarket }) {
  const tone = m.probabilityChange24h >= 0 ? "positive" : "negative";
  const sparkData = m.chartData.map((p) => p.probability);
  const topNews = m.relatedNews[0] ?? null;
  const days = daysUntil(m.closeDate);
  const toneClass = visualToneClass(m.visualFallback.type);
  const accentColor = visualAccentColor(m.visualFallback.type);

  return (
    <article
      className="flex flex-col gap-0 overflow-hidden rounded-lg border border-border bg-surface-1 lg:flex-row"
      style={{ animation: "fadeIn 0.25s ease-out" }}
    >
      {/* LEFT — visual poster */}
      <div
        className={`relative flex shrink-0 flex-col items-center justify-center border-b border-border p-6 lg:w-[272px] lg:border-b-0 lg:border-r ${toneClass}`}
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${accentColor} 0%, transparent 70%)`,
        }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <span
            role="img"
            aria-label={m.visualFallback.alt}
            className="select-none text-[80px] leading-none"
          >
            {m.visualFallback.emojiFallback ?? "📊"}
          </span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {m.region}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            {m.category}
          </p>
        </div>

        {/* Badges pinned to bottom */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
          <span className="rounded bg-black/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
            {m.platform}
          </span>
          {m.oracleScore != null && (
            <span className="rounded bg-black/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-sm">
              OS {m.oracleScore}
            </span>
          )}
        </div>

        {/* Image override */}
        {m.imageUrl && (
          <img
            src={m.imageUrl}
            alt={m.visualFallback.alt}
            className="absolute inset-0 h-full w-full rounded-l-lg object-cover"
          />
        )}
      </div>

      {/* CENTER — market data */}
      <div className="flex min-w-0 flex-1 flex-col gap-5 p-6">
        {/* Title + probability */}
        <div>
          <h2 className="font-display text-[20px] font-semibold leading-snug text-foreground lg:text-[22px]">
            {m.title}
          </h2>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-mono text-[36px] font-bold leading-none text-foreground">
              {fmtProb(m.probability)}
            </span>
            <Delta value={m.probabilityChange24h} className="text-[15px]" />
          </div>
        </div>

        {/* Chart */}
        <div className="w-full">
          <Sparkline
            data={sparkData}
            width={420}
            height={96}
            tone={tone}
            strokeWidth={2.5}
          />
        </div>

        {/* Stat blocks */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          <StatBlock label="Probability" value={fmtProb(m.probability)} />
          <StatBlock
            label="24h Move"
            value={`${m.probabilityChange24h >= 0 ? "+" : ""}${m.probabilityChange24h.toFixed(1)}pp`}
            valueClass={m.probabilityChange24h >= 0 ? "text-positive" : "text-negative"}
          />
          <StatBlock label="Volume" value={fmtVol(m.volume24h)} />
          {m.liquidity > 0 && (
            <StatBlock label="Liquidity" value={fmtVol(m.liquidity)} />
          )}
          <StatBlock label="Closes" value={`${days}d`} />
        </div>
      </div>

      {/* RIGHT — news panel */}
      <div className="flex shrink-0 flex-col gap-4 border-t border-border bg-surface-2/50 p-5 lg:w-[228px] lg:border-l lg:border-t-0">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Market-moving news
        </p>
        {topNews ? (
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[10px] text-muted-foreground">
              {topNews.source}
            </p>
            <p className="line-clamp-4 text-[13px] font-medium leading-snug text-foreground">
              {topNews.headline}
            </p>
            {topNews.probabilityImpact !== 0 && (
              <span
                className={`mt-1 inline-flex items-center font-mono text-[11px] font-semibold ${
                  topNews.probabilityImpact >= 0 ? "text-positive" : "text-negative"
                }`}
              >
                Impact&nbsp;
                {topNews.probabilityImpact >= 0 ? "+" : ""}
                {topNews.probabilityImpact.toFixed(1)}pp
              </span>
            )}
          </div>
        ) : (
          <p className="text-[12px] text-muted-foreground">No recent news</p>
        )}
      </div>
    </article>
  );
}

function StatBlock({
  label,
  value,
  valueClass = "text-foreground",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded bg-surface-2 px-3 py-2">
      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className={`font-mono text-[13px] font-semibold tabular-nums ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}
