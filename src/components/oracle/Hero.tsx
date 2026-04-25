import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Coins, Cpu, Flag, Globe, Sparkles, TrendingUp, Trophy } from "lucide-react";
import {
  COMPOSITE,
  COMPOSITE_DELTA_24H,
  COMPOSITE_NOW,
  STATS,
  TOP_CATEGORIES,
  fmtMoney,
  fmtProb,
  type Category,
  type Timeframe,
} from "@/data/mock";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";

const TIMEFRAMES: Timeframe[] = ["1H", "24H", "7D", "30D", "ALL"];

const CATEGORY_ICON: Record<Category, typeof Flag> = {
  Politics: Flag,
  Geopolitics: Globe,
  Crypto: Coins,
  Economy: TrendingUp,
  Tech: Cpu,
  Sports: Trophy,
  Culture: Sparkles,
  Regulation: Flag,
};

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export const Hero = () => {
  const [tf, setTf] = useState<Timeframe>("24H");
  const data = COMPOSITE[tf];
  const positive = COMPOSITE_DELTA_24H >= 0;
  const stroke = positive ? "hsl(var(--positive))" : "hsl(var(--negative))";

  return (
    <section id="overview" className="border-b border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-6 md:py-10 lg:px-16 lg:py-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="mono text-[11px] uppercase tracking-wider text-info">
              Live · {STATS.totalActiveMarkets.toLocaleString()} markets · {fmtMoney(STATS.totalVolume24h)} 24h volume
            </span>
            <h1 className="mt-2 text-[28px] font-semibold leading-[1.1] tracking-tight md:text-[34px]">
              Track the world's probabilities.
            </h1>
          </div>
          <p className="max-w-[420px] text-[13px] leading-relaxed text-muted-foreground">
            Discover, compare and monitor prediction markets across politics, crypto, macro, sports
            and global events.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[65fr_35fr]">
          {/* LEFT: large composite chart */}
          <div className="rounded-lg border border-border bg-[hsl(var(--surface-1))] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-[14px] font-semibold tracking-tight">
                    Oracle Composite Index
                  </h2>
                  <span className="mono rounded bg-info/10 px-1.5 py-0.5 text-[10px] font-medium text-info">
                    OCI
                  </span>
                </div>
                <p className="mono mt-0.5 text-[10px] uppercase tracking-wider text-subtle">
                  Aggregate of top 50 markets by liquidity
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="mono text-4xl font-semibold tracking-tight md:text-[56px] md:leading-none">
                    {COMPOSITE_NOW.toFixed(3)}
                  </span>
                  <Delta value={COMPOSITE_DELTA_24H} size="md" />
                  <span className="mono text-[11px] text-subtle">past 24h</span>
                </div>
              </div>
              <div className="flex rounded-md border border-border bg-[hsl(var(--surface-2))] p-0.5">
                {TIMEFRAMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTf(t)}
                    className={`mono rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      tf === t
                        ? "bg-[hsl(var(--surface-3))] text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 h-[280px] md:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                  <defs>
                    <linearGradient id="oci-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={stroke} stopOpacity={0.22} />
                      <stop offset="100%" stopColor={stroke} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="t"
                    type="number"
                    domain={["dataMin", "dataMax"]}
                    ticks={data.length > 8 ? Array.from({ length: 9 }, (_, i) => Math.round((i * (data.length - 1)) / 8)) : undefined}
                    tickFormatter={(_v, i) => HOURS[i] ?? ""}
                    tick={{ fill: "hsl(var(--chart-axis))", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={24}
                  />
                  <YAxis
                    domain={["dataMin - 4", "dataMax + 4"]}
                    width={42}
                    tick={{ fill: "hsl(var(--chart-axis))", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    axisLine={false}
                    tickLine={false}
                    orientation="right"
                  />
                  <Tooltip
                    cursor={{ stroke: "hsl(var(--border-hover))", strokeWidth: 1 }}
                    contentStyle={{
                      background: "hsl(var(--surface-3))",
                      border: "1px solid hsl(var(--border-hover))",
                      borderRadius: 6,
                      fontFamily: "JetBrains Mono",
                      fontSize: 11,
                      color: "hsl(var(--foreground))",
                    }}
                    labelFormatter={() => ""}
                    formatter={(v: number) => [v.toFixed(2), "OCI"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={stroke}
                    strokeWidth={1.75}
                    fill="url(#oci-fill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT: Top Categories panel */}
          <div className="flex flex-col rounded-lg border border-border bg-[hsl(var(--surface-1))]">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-[14px] font-semibold tracking-tight">Top Categories</h2>
              <span className="mono text-[10px] uppercase tracking-wider text-subtle">aggregate</span>
            </div>
            <ul className="flex-1 divide-y divide-border">
              {TOP_CATEGORIES.map((c) => {
                const Icon = CATEGORY_ICON[c.category];
                const targetId = `cat-${c.category}`;
                const onClick = () => {
                  const el = document.getElementById(targetId);
                  if (!el) return;
                  const top = el.getBoundingClientRect().top + window.scrollY - 112;
                  window.scrollTo({ top, behavior: "smooth" });
                };
                return (
                  <li key={c.category}>
                    <button
                      onClick={onClick}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-[hsl(var(--surface-2))]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-foreground">
                        {c.category}
                      </span>
                      <Sparkline
                        data={c.spark}
                        width={64}
                        height={20}
                        color={c.change24h >= 0 ? "positive" : "negative"}
                        fill={false}
                      />
                      <span className="mono w-12 text-right text-[12px] font-semibold text-foreground tabular-nums">
                        {fmtProb(c.prob)}
                      </span>
                      <span className="w-14 text-right">
                        <Delta value={c.change24h} size="sm" withIcon={false} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <a
              href="/markets"
              className="border-t border-border px-4 py-2.5 text-[12px] font-medium text-info transition-colors hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--info-hover))]"
            >
              View all categories →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
