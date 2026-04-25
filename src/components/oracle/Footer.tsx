import { Logo } from "./Logo";

const COLS: { title: string; links: string[] }[] = [
  { title: "Product",    links: ["Markets", "Calendar", "News", "Docs", "Pricing"] },
  { title: "Categories", links: ["Politics", "Geopolitics", "Crypto", "Economy", "Tech", "Sports"] },
  { title: "Resources",  links: ["Methodology", "API", "Glossary", "Status"] },
  { title: "Company",    links: ["About", "Manifesto", "Contact", "Careers"] },
  { title: "Legal",      links: ["Terms", "Privacy", "Disclaimers", "Cookies"] },
];

export const Footer = () => (
  <footer className="border-t border-border bg-[hsl(var(--surface-1))]">
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-6 md:py-16 lg:px-16">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
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
          <span>© 2026 oracle</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-[hsl(var(--surface-2))] px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-hover hover:text-foreground"
          >
            <span aria-hidden="true">🌐</span>
            English (Global)
          </button>
        </div>
      </div>
    </div>
  </footer>
);
