import { useMemo, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import {
  COMPOSITE,
  COMPOSITE_DELTA_24H,
  COMPOSITE_NOW,
  STATS,
  fmtMoney,
  getMarket,
  type Timeframe,
} from "@/data/mock";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";
import { CategoryChip, PlatformChip } from "./CategoryChip";

const TIMEFRAMES: Timeframe[] = ["1H", "24H", "7D", "30D", "ALL"];

export const Hero = () => {
  const [tf, setTf] = useState<Timeframe>("24H");
  const data = COMPOSITE[tf];
  const positive = COMPOSITE_DELTA_24H >= 0;
  const stroke = positive ? "hsl(var(--positive))" : "hsl(var(--negative))";
  const biggestMover = useMemo(() => getMarket(STATS.biggestMoveId)!, []);
  const mostLiquid = useMemo(() => getMarket(STATS.mostLiquidId)!, []);

  return (
    <section id="overview" className="border-b border-border bg-background">
      <div className="bg-grid-faint">
        <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-10 md:px-6 md:pb-14 md:pt-14">
          <div className="mb-8 max-w-[760px]">
            <span className="mono text-[11px] uppercase tracking-wider text-info">
              Live · {STATS.totalActiveMarkets.toLocaleString()} markets · {fmtMoney(STATS.totalVolume24h)} 24h volume
            </span>
            <h1 className="mt-3 text-[40px] font-semibold leading-[1.05] tracking-tight md:text-[56px]">
              Track the world's probabilities.
            </h1>
            <p className="mt-4 max-w-[620px] text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Discover, compare and monitor prediction markets across politics, crypto, macro, sports
              and global events — all in one market overview.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {/* Composite chart */}
            <div className="rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 lg:col-span-2 lg:p-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-subtle">
                    Oracle Composite Index
                    <span className="rounded bg-info/10 px-1.5 py-0.5 text-[10px] font-medium text-info">
                      OCI
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-3">
                    <span className="mono text-3xl font-semibold tracking-tight md:text-4xl">
                      {COMPOSITE_NOW.toFixed(2)}
                    </span>
                    <Delta value={COMPOSITE_DELTA_24H} size="md" />
                    <span className="mono text-xs text-subtle">past 24h</span>
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

              <div className="h-[260px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="oci-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={stroke} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={stroke} stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="t"
                      hide
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

            {/* Stat panel */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              <StatCard label="Active markets" value={STATS.totalActiveMarkets.toLocaleString()} hint="across 3 platforms" />
              <StatCard label="24h volume" value={fmtMoney(STATS.totalVolume24h)} hint="Polymarket · Kalshi · Manifold" />
              <div className="col-span-2 rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 lg:col-span-1">
                <div className="text-[11px] uppercase tracking-wider text-subtle">Biggest probability move</div>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium text-foreground">{biggestMover.title}</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <CategoryChip category={biggestMover.category} />
                      <PlatformChip platform={biggestMover.platform} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mono text-lg font-semibold">{biggestMover.probability}%</div>
                    <Delta value={biggestMover.change24h} size="sm" />
                  </div>
                </div>
                <div className="mt-3">
                  <Sparkline data={biggestMover.spark} width={260} height={36} color={biggestMover.change24h >= 0 ? "positive" : "negative"} />
                </div>
              </div>
              <div className="col-span-2 rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 lg:col-span-1">
                <div className="text-[11px] uppercase tracking-wider text-subtle">Most liquid market</div>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium text-foreground">{mostLiquid.title}</div>
                    <div className="mt-1 flex items-center gap-1.5">
                      <CategoryChip category={mostLiquid.category} />
                      <PlatformChip platform={mostLiquid.platform} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mono text-lg font-semibold">{fmtMoney(mostLiquid.liquidity)}</div>
                    <div className="mono text-[11px] text-subtle">liquidity</div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4 lg:col-span-1">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-subtle">
                  <span>Live activity</span>
                  <span className="mono lowercase tracking-normal text-positive">● live</span>
                </div>
                <div className="mt-2">
                  <Sparkline data={STATS.liveActivity} width={260} height={42} color="info" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value, hint }: { label: string; value: string; hint: string }) => (
  <div className="rounded-lg border border-border bg-[hsl(var(--surface-1))] p-4">
    <div className="text-[11px] uppercase tracking-wider text-subtle">{label}</div>
    <div className="mono mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    <div className="mt-1 text-[11px] text-subtle">{hint}</div>
  </div>
);