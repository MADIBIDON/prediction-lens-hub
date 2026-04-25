import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/markets", label: "Markets" },
  { to: "/calendar", label: "Calendar" },
  { to: "/news", label: "News" },
  { to: "/docs", label: "Docs" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-6 px-6 lg:px-12">
        {/* Left cluster */}
        <div className="flex items-center gap-8">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "text-[14px] transition-colors duration-150",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Center search */}
        <div className="hidden flex-1 justify-center lg:flex">
          <div className="relative w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search markets, events, categories..."
              className="h-9 w-full rounded-md bg-surface-1 pl-9 pr-14 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-info border border-border"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <button className="hidden text-[14px] text-muted-foreground hover:text-foreground md:inline-block">
            Sign in
          </button>
          <button className="h-9 rounded-md bg-accent-lime px-4 text-[13px] font-semibold text-black transition-opacity hover:opacity-90">
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}
