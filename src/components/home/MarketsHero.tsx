import { ChevronRight, Landmark, Globe2, Bitcoin, TrendingUp, Cpu, Trophy, Sparkles } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { COMPOSITE, COMPOSITE_SERIES, TOP_CATEGORIES } from "@/data/fixtures/markets";
import { Sparkline } from "./Sparkline";
import { Delta } from "./Delta";

const CATEGORY_ICON: Record<string, typeof Landmark> = {
  Politics: Landmark,
  Geopolitics: Globe2,
  Crypto: Bitcoin,
  Economy: TrendingUp,
  Tech: Cpu,
  Sports: Trophy,
  Culture: Sparkles,
};

export function MarketsHero() {
  const negative = COMPOSITE.change24h < 0;
  const lineColor = negative ? "hsl(var(--negative))" : "hsl(var(--positive))";

  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-12 lg:px-12">
        {/* Header */}
        <div className="mb-6 flex items-center gap-1">
          <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
            Markets summary
          </h2>
          <ChevronRight className="h-6 w-6 text-muted-foreground" strokeWidth={2} />
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT — Big chart card */}
          <article className="col-span-12 lg:col-span-8">
            <div className="flex h-[420px] flex-col rounded-lg border border-border bg-surface-1 p-6">
              {/* Top: avatar + title */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2">
                    <span className="font-mono text-[12px] font-semibold text-foreground">OCI</span>
                  </div>
                  <div>
                    <h3 className="font-display text-[18px] font-semibold leading-none text-foreground">
                      {COMPOSITE.name}
                    </h3>
                    <span className="mt-2 inline-block rounded bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {COMPOSITE.symbol}
                    </span>
                  </div>
                </div>
              </div>

              {/* Big stat row */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-mono text-[36px] font-bold leading-none text-foreground">
                  {COMPOSITE.value.toFixed(3)}
                </span>
                <span className="text-[12px] text-muted-foreground">USD</span>
                <Delta value={COMPOSITE.change24h} className="text-[16px]" />
              </div>

              {/* Chart */}
              <div className="-mx-2 mt-4 flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={COMPOSITE_SERIES} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
                    <defs>
                      <linearGradient id="oci-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={lineColor} stopOpacity={0.30} />
                        <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      stroke="hsl(var(--border))"
                      strokeOpacity={0.5}
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="time"
                      ticks={["09:00", "11:00", "13:00", "15:00", "17:00"]}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "JetBrains Mono" }}
                      axisLine={{ stroke: "hsl(var(--border))" }}
                      tickLine={false}
                      interval={0}
                    />
                    <YAxis hide domain={[0.52, 0.56]} />
                    <Tooltip
                      cursor={{ stroke: "hsl(var(--border-hover))", strokeDasharray: "3 3" }}
                      contentStyle={{
                        background: "hsl(var(--surface-3))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: 6,
                        fontSize: 12,
                        fontFamily: "JetBrains Mono",
                      }}
                      labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                      formatter={(v: number) => [v.toFixed(4), "OCI"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={lineColor}
                      strokeWidth={1.5}
                      fill="url(#oci-fill)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </article>

          {/* RIGHT — Top categories */}
          <article className="col-span-12 lg:col-span-4">
            <div className="flex h-[420px] flex-col rounded-lg border border-border bg-surface-1 p-6">
              <h3 className="font-display text-[18px] font-semibold text-foreground">Top categories</h3>
              <ul className="mt-2 flex-1">
                {TOP_CATEGORIES.map((c, i) => {
                  const Icon = CATEGORY_ICON[c.id] ?? Sparkles;
                  const positive = c.change24h >= 0;
                  return (
                    <li
                      key={c.id}
                      className={`flex items-center justify-between py-3 ${
                        i < TOP_CATEGORIES.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2">
                          <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-medium text-foreground">{c.name}</span>
                          <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {c.code}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Sparkline
                          data={c.spark}
                          width={56}
                          height={20}
                          tone={positive ? "positive" : "negative"}
                        />
                        <div className="text-right leading-tight">
                          <div className="font-mono text-[13px] font-medium text-foreground">
                            {c.prob.toFixed(3)} <span className="text-[10px] text-muted-foreground">USD</span>
                          </div>
                          <Delta value={c.change24h} className="text-[12px]" />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <a
                href="/markets"
                className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-info hover:opacity-80"
              >
                View all categories <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
