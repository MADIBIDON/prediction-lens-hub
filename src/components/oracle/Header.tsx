import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { to: "/markets", label: "Markets" },
  { to: "/calendar", label: "Calendar" },
  { to: "/news", label: "News" },
  { to: "/signals", label: "Signals" },
  { to: "/pricing", label: "Pricing" },
  { to: "/docs", label: "Docs" },
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
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-4 md:px-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden flex-1 md:block">
          <label className="group relative flex h-9 max-w-[520px] items-center rounded-md border border-border bg-[hsl(var(--surface-1))] pl-3 pr-2 text-sm transition-colors focus-within:border-info hover:border-hover">
            <Search className="h-4 w-4 text-subtle" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search markets, events, categories, platforms, regions"
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

        <div className="ml-auto flex items-center gap-1.5">
          <button className="hidden h-8 rounded-md px-3 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex md:items-center">
            Sign in
          </button>
          <button className="inline-flex h-8 items-center rounded-md bg-foreground px-3 text-[13px] font-semibold text-[hsl(var(--background))] transition-opacity hover:opacity-90">
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};