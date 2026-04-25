import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface StubPageProps {
  title: string;
  description: string;
}

export const StubPage = ({ title, description }: StubPageProps) => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <main className="mx-auto flex min-h-[60vh] max-w-[900px] flex-col items-start justify-center px-6 py-24">
      <span className="mono text-[11px] uppercase tracking-wider text-info">Coming next</span>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-[640px] text-base leading-relaxed text-muted-foreground">{description}</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-info hover:text-[hsl(var(--info-hover))]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to market overview
      </Link>
    </main>
    <Footer />
  </div>
);