import { TopNav } from "@/components/home/TopNav";
import { MarketsHero } from "@/components/home/MarketsHero";
import { FeaturedMarketCarousel } from "@/components/home/FeaturedMarketCarousel";
import { OverviewCards } from "@/components/home/OverviewCards";
import { CategoryPillBar } from "@/components/home/CategoryPillBar";
import { CategorySection } from "@/components/home/CategorySection";
import { ResolutionCalendar } from "@/components/home/ResolutionCalendar";
import { GlobalMap } from "@/components/home/GlobalMap";
import { VenueComparison } from "@/components/home/VenueComparison";
import { NewsGrid } from "@/components/home/NewsGrid";
import { PlatformAggregation } from "@/components/home/PlatformAggregation";
import { DocumentationGrid } from "@/components/home/DocumentationGrid";
import { SiteFooter } from "@/components/home/SiteFooter";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <TopNav />
    <MarketsHero />
    <FeaturedMarketCarousel />
    <OverviewCards />
    <CategoryPillBar />
    <main>
      <CategorySection category="Politics" />
      <CategorySection category="Geopolitics" />
      <CategorySection category="Crypto" />
      <CategorySection category="Economy" />
      <CategorySection category="Tech" />
      <CategorySection category="Sports" />
      <CategorySection category="Culture" />
      <CategorySection category="Regulation" />
      <ResolutionCalendar />
      <GlobalMap />
      <VenueComparison />
      <NewsGrid />
      <PlatformAggregation />
      <DocumentationGrid />
    </main>
    <SiteFooter />
  </div>
);

export default Index;
