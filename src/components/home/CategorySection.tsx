import { ChevronRight, Landmark, Globe2, Bitcoin, TrendingUp, Cpu, Trophy, Sparkles, Scale, MessageSquare, Rocket } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import {
  CATEGORY_ANCHORS,
  fmtPct,
  fmtProb,
  fmtVol,
  gainers,
  losers,
  MARKETS_BY_CATEGORY,
  topByVol,
  topByVolatility,
  type HomeCategory,
  type HomeMarket,
} from "@/data/fixtures/markets";
import { newsByCategory } from "@/data/fixtures/news";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";

const CATEGORY_ICON: Record<HomeCategory, typeof Landmark> = {
  Politics: Landmark,
  Geopolitics: Globe2,
  Crypto: Bitcoin,
  Economy: TrendingUp,
  Tech: Cpu,
  Sports: Trophy,
  Culture: Sparkles,
  Regulation: Scale,
};

interface Props {
  category: HomeCategory;
}

export function CategorySection({ category }: Props) {
  const all = MARKETS_BY_CATEGORY[category];
  const trending = topByVol(all, 6);
  const analysis = all.slice(0, 4);
  const mostActive = topByVol(all, 5);
  const mostVolatile = topByVolatility(all, 5);
  const gainersList = gainers(all, 5);
  const losersList = losers(all, 5);
  const news = newsByCategory(category).slice(0, 12);
  const Icon = CATEGORY_ICON[category];

  return (
    <section
      id={CATEGORY_ANCHORS[category]}
      className="border-b border-border"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12 lg:py-16">
        {/* Section header */}
        <header className="mb-6">
          <div className="flex items-center gap-2.5">
            <Icon className="h-7 w-7 text-foreground" strokeWidth={1.5} />
            <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
              {category}
            </h2>
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
          </div>
          <a href="#" className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80">
            View all {category.toLowerCase()} <ChevronRight className="h-3.5 w-3.5" />
          </a>
        </header>

        {/* SUB A — Trending markets */}
        <SubSection title="Trending markets">
          <div className="-mx-6 overflow-x-auto px-6 pb-1 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:h-1.5">
            <div className="grid grid-flow-col auto-cols-[220px] gap-4 lg:auto-cols-fr lg:grid-cols-6">
              {trending.map((m) => (
                <TrendingCard key={m.id} m={m} />
              ))}
            </div>
          </div>
        </SubSection>

        {/* SUB B — Market analysis (4 col) */}
        <SubSection title="Market analysis" className="mt-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {analysis.map((m) => (
              <AnalysisCard key={m.id} m={m} />
            ))}
          </div>
        </SubSection>

        {/* SUB C — Most active + Most volatile */}
        <div className="mt-10 grid grid-cols-12 gap-6">
          <ListPanel title={`${category} most active`} markets={mostActive} pill={false} />
          <ListPanel title={`${category} most volatile`} markets={mostVolatile} pill={false} />
        </div>

        {/* SUB D — Gainers + Losers */}
        <div className="mt-6 grid grid-cols-12 gap-6">
          <ListPanel title={`${category} gainers`} markets={gainersList} pill />
          <ListPanel title={`${category} losers`} markets={losersList} pill />
        </div>

        {/* SUB E — News */}
        {news.length > 0 && (
          <SubSection title={`${category} news`} className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {news.map((n) => (
                <article key={n.id} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <span className="inline-block h-4 w-4 rounded-full bg-surface-2" />
                    <span className="font-medium">{n.source}</span>
                    <span>·</span>
                    <span>{n.ago}</span>
                  </div>
                  <h4 className="line-clamp-2 text-[15px] font-medium leading-snug text-foreground transition-colors hover:text-info">
                    {n.headline}
                  </h4>
                  <div className="text-[12px] text-muted-foreground">
                    Related: <span className="text-foreground">{n.relatedTitle}</span>{" "}
                    ·{" "}
                    <span
                      className={n.probMove >= 0 ? "font-mono text-positive" : "font-mono text-negative"}
                    >
                      {fmtPct(n.probMove)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <a
              href="/news"
              className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80"
            >
              Continue reading <ChevronRight className="h-3.5 w-3.5" />
            </a>
          </SubSection>
        )}
      </div>
    </section>
  );
}

/* ---------- Building blocks ---------- */

function SubSection({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="mb-3 font-display text-[18px] font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function TrendingCard({ m }: { m: HomeMarket }) {
  const positive = m.change24h >= 0;
  return (
    <article className="flex flex-col rounded-lg border border-border bg-surface-1 p-4 transition-colors hover:border-hover">
      <div className="flex items-center justify-between">
        <div className="h-7 w-7 rounded-full bg-surface-2" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {m.venue}
        </span>
      </div>
      <h4 className="mt-3 line-clamp-2 min-h-[40px] text-[14px] font-medium leading-snug text-foreground">
        {m.title}
      </h4>
      <div className="mt-3 flex-1">
        <Sparkline
          data={m.spark}
          width={188}
          height={32}
          tone={positive ? "positive" : "negative"}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="font-mono text-[16px] font-semibold text-foreground">{fmtProb(m.prob)}</span>
        <Delta value={m.change24h} className="text-[12px]" />
      </div>
      <div className="mono mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        Vol {fmtVol(m.vol24h)}
      </div>
    </article>
  );
}

function AnalysisCard({ m }: { m: HomeMarket }) {
  const positive = m.change24h >= 0;
  const color = positive ? "hsl(var(--positive))" : "hsl(var(--negative))";
  const data = m.spark.map((v, i) => ({ i, v }));
  const id = `analysis-${m.id}`;
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-surface-1 transition-colors hover:border-hover">
      <div className="h-32 w-full bg-surface-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={color}
              strokeWidth={1.5}
              fill={`url(#${id})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4">
        <h4 className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-foreground">
          {m.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-[12px] text-muted-foreground">
          {positive ? "Volume accelerating; bid-ask tightened." : "Spread widened on softer flow into close."}
        </p>
        <div className="mt-4 flex items-center justify-between text-[12px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-surface-3" />
            <span>by Oracle Research</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" /> <span className="font-mono">12</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <Rocket className="h-3.5 w-3.5" /> <span className="font-mono">{Math.round(m.vol24h / 1_000_00)}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function ListPanel({ title, markets, pill }: { title: string; markets: HomeMarket[]; pill: boolean }) {
  return (
    <div className="col-span-12 lg:col-span-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="font-display text-[18px] font-semibold text-foreground">{title}</h3>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <ul className="rounded-lg border border-border bg-surface-1">
        {markets.length === 0 && (
          <li className="px-4 py-6 text-center text-[13px] text-muted-foreground">No markets</li>
        )}
        {markets.map((m) => (
          <li
            key={m.id}
            className="flex items-center justify-between border-b border-border px-4 py-3 transition-colors last:border-0 hover:bg-surface-2"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="h-7 w-7 shrink-0 rounded-full bg-surface-2" />
              <div className="min-w-0">
                <div className="line-clamp-1 text-[14px] text-foreground">{m.title}</div>
                <div className="mt-0.5 inline-flex items-center gap-1.5">
                  <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                    {m.venue === "Polymarket" ? "POLY" : m.venue === "Kalshi" ? "KAL" : "MAN"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[14px] font-medium text-foreground">{fmtProb(m.prob)}</span>
              <Delta value={m.change24h} pill={pill} className="min-w-[60px] justify-end" />
            </div>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80"
      >
        View all {title.toLowerCase()} <ChevronRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
