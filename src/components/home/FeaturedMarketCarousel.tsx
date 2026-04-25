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
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[22px] font-semibold tracking-tight text-foreground">
            Featured markets
          </h2>
          <div className="flex items-center gap-2">
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

        <Slide market={market} />

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

  return (
    <article className="flex flex-col gap-6 rounded-lg border border-border bg-surface-1 p-6 lg:flex-row">
      {/* LEFT — visual */}
      <div className="flex shrink-0 flex-col gap-3 lg:w-[272px]">
        <div className="flex h-[180px] w-full items-center justify-center rounded-lg bg-surface-2 text-[64px]">
          {m.imageUrl ? (
            <img
              src={m.imageUrl}
              alt={m.visualFallback.alt}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <span role="img" aria-label={m.visualFallback.alt}>
              {m.visualFallback.emojiFallback ?? "📊"}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {m.category}
          </span>
          <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {m.platform}
          </span>
          {m.oracleScore != null && (
            <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-foreground">
              OS {m.oracleScore}
            </span>
          )}
        </div>
      </div>

      {/* CENTER — market data */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div>
          <h2 className="font-display text-[20px] font-semibold leading-snug text-foreground lg:text-[22px]">
            {m.title}
          </h2>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-mono text-[32px] font-bold leading-none text-foreground">
              {fmtProb(m.probability)}
            </span>
            <Delta value={m.probabilityChange24h} className="text-[14px]" />
          </div>
        </div>

        <div className="-mx-1">
          <Sparkline
            data={sparkData}
            width={280}
            height={56}
            tone={tone}
            strokeWidth={1.5}
          />
        </div>

        <div className="flex items-center gap-5 font-mono text-[12px] text-muted-foreground">
          <span>
            Closes in{" "}
            <span className="text-foreground">{days}d</span>
          </span>
          <span>
            Vol{" "}
            <span className="text-foreground">{fmtVol(m.volume24h)}</span>
          </span>
          {m.liquidity > 0 && (
            <span>
              Liq{" "}
              <span className="text-foreground">{fmtVol(m.liquidity)}</span>
            </span>
          )}
        </div>
      </div>

      {/* RIGHT — related news */}
      <div className="flex shrink-0 flex-col justify-between gap-3 rounded-lg border border-border bg-surface-2 p-4 lg:w-[220px]">
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Related news
        </p>
        {topNews ? (
          <div className="flex flex-1 flex-col gap-2">
            <p className="font-mono text-[10px] text-muted-foreground">
              {topNews.source}
            </p>
            <p className="line-clamp-4 text-[13px] font-medium leading-snug text-foreground">
              {topNews.headline}
            </p>
            {topNews.probabilityImpact !== 0 && (
              <span
                className={`font-mono text-[12px] ${
                  topNews.probabilityImpact >= 0
                    ? "text-positive"
                    : "text-negative"
                }`}
              >
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
