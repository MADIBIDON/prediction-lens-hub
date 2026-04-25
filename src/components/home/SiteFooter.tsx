import { Globe } from "lucide-react";
import { Logo } from "./Logo";

const COLUMNS = [
  { title: "PRODUCT", links: ["Markets", "Calendar", "News", "Docs", "Pricing", "API"] },
  { title: "CATEGORIES", links: ["Politics", "Geopolitics", "Crypto", "Economy", "Tech", "Sports", "Culture", "Regulation"] },
  { title: "RESOURCES", links: ["Methodology", "Glossary", "Status", "Changelog", "Brand kit"] },
  { title: "COMPANY", links: ["About", "Manifesto", "Contact", "Careers", "Press"] },
  { title: "LEGAL", links: ["Terms", "Privacy", "Cookies", "Disclaimers", "Compliance"] },
];

const SOCIAL = ["X", "Li", "Yt", "Dc", "Tg"];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface-1">
      {/* Atmospheric horizon — subtle blue glow at the bottom edge,
          like a distant skyline at dusk. No cartoon, no neon. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 130%, hsl(var(--info) / 0.22) 0%, hsl(var(--info) / 0.06) 35%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, hsl(var(--info) / 0.4) 50%, transparent 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
        {/* Top row: logo + socials */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
          <Logo />
          <div className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                aria-label={s}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Column grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-medium uppercase tracking-wider text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Final row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[13px] text-muted-foreground">
          <span>© 2026 Oracle. All rights reserved.</span>
          <span className="inline-flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" />
            English (US)
          </span>
        </div>

        {/* Slogan — split line, low opacity, premium */}
        <div className="mt-16 select-none text-center font-display font-semibold leading-[0.9] tracking-tight text-foreground/[0.07]">
          <div className="text-[56px] sm:text-[96px] lg:text-[128px]">LOOK FIRST.</div>
          <div className="text-[56px] sm:text-[96px] lg:text-[128px]">THEN FORECAST.</div>
        </div>
      </div>
    </footer>
  );
}
