## oracle — homepage visual prototype

A serious, financial-grade market discovery platform for prediction markets. Long vertical homepage in the spirit of TradingView, adapted to probabilities, with realistic fake data across politics, crypto, macro, sports and global events. Stub pages for the rest of the navigation.

---

### Foundations

**Design system (from your spec, applied globally)**
- Dark, calm financial UI. Background `#0E0E11`, surfaces `#16161A` / `#1A1A1F` / `#1F1F25`, borders `#232329` / `#2E2E36` / `#343C4A`.
- Text: primary `#F0F0F2`, secondary `#A8A8B3`, muted `#6B6B76`.
- Functional color only:
  - green `#26D67C` = probability up
  - red `#F23F4D` = probability down
  - blue `#4A90E2` = links, selected filters, neutral actions
  - amber `#F59E0B` = warnings (rare)
  - lime `#B8FF00` reserved for a single primary CTA — used once or twice on the page max
- Map choropleth scale: `#1A2E4A → #2D5A8C → #4A90E2 → #7AB1E8 → #B5D4F2`.
- All colors wired through `index.css` HSL tokens and `tailwind.config.ts` so every component pulls from semantic tokens (no hardcoded hex in components).

**Typography**
- Inter Tight — headlines, semibold, tight tracking
- Inter — body
- JetBrains Mono — every numeric value (probabilities, %, volume, dates, countdowns)
- Loaded from Google Fonts in `index.html`

**Logo**
- `oracle-mark-preferred-transparent-512.png` placed in `src/assets/`, used as-is (three white dots, transparent), next to a lowercase `oracle` wordmark in Inter Tight semibold. No glow, no background, no recoloring.

**Routing**
- `/` — full homepage (the prototype)
- `/markets`, `/calendar`, `/news`, `/signals`, `/pricing`, `/docs` — minimal stub pages that share the same header + footer shell, with a short "Coming next" message and a back link. Keeps the top nav functional without scope creep.

**Tech choices (per your answers)**
- Stylized hand-built SVG world silhouette for the Global Prediction Map (regions filled with the blue choropleth scale, hotspot dots, hover tooltips on regions, side panel for "Top regions today").
- Recharts for the single hero probability chart (Oracle Composite Index, multi-timeframe). All other charts are pure inline SVG sparklines so card grids stay light.
- No real APIs, no auth, no Supabase, no payments. All data lives in typed mock files.

---

### Homepage sections (top to bottom)

1. **Sticky top navigation**
   - Left: oracle mark + lowercase wordmark
   - Center: search bar with `⌘K` hint, placeholder "Search markets, events, categories, platforms, regions"
   - Right: links Markets · Calendar · News · Signals · Pricing · Docs · `Sign in` (ghost) · `Get started` (primary CTA — the one allowed lime accent or blue, decided in build)
   - Subtle bottom border, blurred background on scroll

2. **Hero / Market Overview**
   - Headline: "Track the world's probabilities."
   - Subheadline: "Discover, compare and monitor prediction markets across politics, crypto, macro, sports and global events."
   - Left ~⅔: large Recharts area chart for a fake **Oracle Composite Index**, with timeframe tabs `1H · 24H · 7D · 30D · ALL` and current value + delta.
   - Right ⅓: stacked stat panel — Total active markets, 24h volume, Biggest probability move (with mini sparkline), Most liquid market, plus a "Live activity" sparkline.
   - Reads as a market overview, not a marketing hero.

3. **Sticky category pill bar**
   - Pills: All · Politics · Geopolitics · Crypto · Economy · Tech · Sports · Culture · Regulation · Platforms
   - Becomes sticky directly under the nav once scrolled past hero. Active pill = blue underline + lighter surface. Clicking scrolls to the matching section id.

4. **Three market columns**
   - Most Active Today · Resolving This Week · Top Oracle Scores
   - 5 rows each, dense table-style rows with mono numerics, blue "View all" link at the bottom of each column.
   - Oracle Score shown as a 0–100 value with a tiny segmented bar; tooltip clarifies it's a prioritization indicator, not a profit guarantee.

5. **Category deep sections** (one block per category — Politics, Geopolitics, Crypto, Economy, Tech, Sports, Regulation)
   - Each block: section header + small chart, then a 4-tile row showing Trending markets · Biggest movers · Most liquid · Related news, with an upcoming resolution event card on the side.
   - Repeating rhythm gives the page TradingView-like density without feeling like marketing cards.

6. **Top moving markets grid**
   - Responsive grid of market cards. Each card: title, category chip, platform chip, current probability (large, mono), 24h change (green/red), volume, liquidity, sparkline, close date. Subtle hover lift and border highlight.

7. **Gainers and losers**
   - Two columns: "Markets Moving Up" (green deltas) · "Markets Moving Down" (red deltas).
   - Tabular rows: title, probability, 24h Δ, volume, category, platform. Language stays neutral — "probability movement", never "profit".

8. **Global Prediction Map**
   - Full-width section with the stylized SVG world silhouette on the left, regions filled by the blue choropleth scale based on fake 24h volume.
   - Hotspot dots over countries with major active events (US, EU, Middle East, China, Ukraine, India, Brazil). Hover = tooltip with active markets + top market.
   - Right side panel "Top regions today" lists regions with: active markets count, 24h volume, top market (e.g. "Will the Fed cut rates before July?").

9. **Polymarket vs Kalshi venue comparison**
   - Title: "Compare venues before you trade."
   - Comparison table: market title · Polymarket prob · Kalshi prob · Polymarket vol · Kalshi vol · spread · est. fees · liquidity · resolution clarity · best venue badge.
   - Rows include: Fed cut before July, US recession in 2026, BTC > $120k by year-end, Trump approval > 45%, Ukraine ceasefire before Q3.
   - Framed as market intelligence, never arbitrage.

10. **Resolution Calendar**
    - Horizontal scroll of date cards (intentional horizontal overflow). Each card: date, UTC time, event name, related markets (chips), current probability, volume in play.
    - Mix of Fed decision, CPI release, election result, EU regulation vote, Champions League final, Apple AI event, crypto regulation deadline, court ruling.

11. **News driving markets**
    - 3-column grid of news cards. Each card: source · time ago · headline · related market chip · probability change badge (green/red).
    - Reads as market intelligence, not a news blog.

12. **Prediction Market Screener preview**
    - Filter bar (visual only): category, platform, probability, 24h move, volume, liquidity, close date, region, Oracle Score.
    - Below: a compact preview table of ~8 markets with sortable-looking column headers. CTA "Open the full screener →".

13. **Prediction Market Guides / Documentation**
    - Title: "Understand prediction markets."
    - Card grid of 9–10 guides: What are prediction markets · Polymarket vs Kalshi · How probabilities work · Understanding liquidity · Understanding spreads · Resolution rules · Market risk · How Oracle Score works · Event calendars · How news moves probabilities.
    - Calm, editorial tone — feels like a serious product resource hub.

14. **Platform Aggregation**
    - Three platform cards: Polymarket · Kalshi · Manifold.
    - Each: number of markets, 24h volume, strongest category, average spread, "Browse →" link.
    - Headline: "One view across prediction markets."

15. **Footer**
    - Multi-column structured footer: Product · Markets · Resources · Company · Legal · Connect.
    - Bottom row: oracle mark + wordmark, short tagline (no all-caps slogan), copyright.
    - Institutional density without copying TradingView.

---

### Mock data

A typed `src/data/` module with realistic prediction market fixtures covering all your example markets (Trump approval, EU AI regulation, Ukraine ceasefire, Iran strike, BTC $120k, ETH ETF inflows, Fed cuts, US recession, GPT-5, Apple AI event, France tournament, crypto court ruling, etc.) plus generated sparkline arrays, region stats, calendar events, and news items. Shared across all sections so numbers feel coherent.

---

### Interaction & responsive

- Sticky nav + sticky category pill bar
- Category pills smooth-scroll to section ids
- Subtle card hover (border + slight elevation), no glow, no neon, no parallax, no 3D
- Hero chart timeframe tabs swap the dataset
- Map regions show tooltips on hover
- Desktop: dense, multi-column, premium feel
- Tablet: stays readable, columns collapse to 2
- Mobile: clean vertical stack; only the resolution calendar keeps intentional horizontal scroll

---

### Acceptance check (built into the work)

Reads instantly as "TradingView for prediction markets" · shows markets, probabilities, movement, volume, categories · includes a strong global map · includes Polymarket vs Kalshi comparison · includes a useful resolution calendar · news linked to probability moves · documentation hub · zero hacker-terminal / casino / Robinhood vibes · credible enough for finance users.

After build, I'll do a visual pass on desktop, tablet and mobile widths and tighten any section that drifts off-spec.