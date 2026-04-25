import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { to: "/markets", label: "Markets" },
  { to: "/calendar", label: "Calendar" },
  { to: "/news", label: "News" },
  { to: "/docs", label: "Docs" },
  { to: "/pricing", label: "Pricing" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 md:px-6 lg:px-16">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden flex-1 md:block">
          <label className="group relative mx-auto flex h-9 max-w-[520px] items-center rounded-md border border-border bg-[hsl(var(--surface-1))] pl-3 pr-2 text-sm transition-colors focus-within:border-info hover:border-hover">
            <Search className="h-4 w-4 text-subtle" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search markets, events, categories…"
              className="ml-2 w-full bg-transparent text-sm text-foreground placeholder:text-subtle focus:outline-none"
            />
            <kbd className="mono ml-2 hidden rounded border border-border bg-[hsl(var(--surface-3))] px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
              ⌘K
            </kbd>
          </label>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="inline-flex h-8 items-center rounded-md px-3.5 text-[13px] font-semibold transition-opacity hover:opacity-90"
            style={{ background: "hsl(var(--accent-lime))", color: "hsl(var(--background))" }}
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};