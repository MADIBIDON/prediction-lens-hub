import { Logo } from "./Logo";

const COLS: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Markets", "Calendar", "News", "Signals", "Watchlist", "Screener"] },
  { title: "Markets", links: ["Politics", "Geopolitics", "Crypto", "Economy", "Tech", "Sports", "Regulation"] },
  { title: "Resources", links: ["Documentation", "Oracle Score", "Methodology", "API reference", "Changelog", "Status"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact", "Brand"] },
  { title: "Legal", links: ["Terms", "Privacy", "Disclosures", "Risk", "Compliance"] },
  { title: "Connect", links: ["X / Twitter", "LinkedIn", "GitHub", "RSS", "Newsletter"] },
];

export const Footer = () => (
  <footer className="border-t border-border bg-[hsl(var(--surface-1))]">
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
        {COLS.map((c) => (
          <div key={c.title}>
            <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-subtle">
              {c.title}
            </h4>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-4 border-t border-border pt-6 text-[12px] text-subtle md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden md:inline">— the market platform for prediction markets.</span>
        </div>
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4">
          <span>© 2026 oracle research labs.</span>
          <span>oracle is a market intelligence product. It is not a broker, exchange, or trading venue.</span>
        </div>
      </div>
    </div>
  </footer>
);