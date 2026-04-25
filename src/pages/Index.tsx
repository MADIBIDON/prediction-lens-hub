import { Header } from "@/components/oracle/Header";
import { Footer } from "@/components/oracle/Footer";
import { Hero } from "@/components/oracle/Hero";
import { CategoryPills } from "@/components/oracle/CategoryPills";
import { ThreeColumns } from "@/components/oracle/ThreeColumns";
import { CategorySection } from "@/components/oracle/CategorySection";
import { TopMoving } from "@/components/oracle/TopMoving";
import { GainersLosers } from "@/components/oracle/GainersLosers";
import { GlobalMap } from "@/components/oracle/GlobalMap";
import { VenueCompare } from "@/components/oracle/VenueCompare";
import { ResolutionCalendar } from "@/components/oracle/ResolutionCalendar";
import { NewsGrid } from "@/components/oracle/NewsGrid";
import { ScreenerPreview } from "@/components/oracle/ScreenerPreview";
import { Guides } from "@/components/oracle/Guides";
import { Platforms } from "@/components/oracle/Platforms";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <Hero />
    <CategoryPills />
    <main>
      <ThreeColumns />
      <CategorySection
        category="Politics"
        description="Elections, approval ratings, legislative votes and political outcomes worldwide."
      />
      <CategorySection
        category="Geopolitics"
        description="Conflicts, ceasefires, sanctions and major diplomatic outcomes."
      />
      <CategorySection
        category="Crypto"
        description="Token prices, ETF flows, regulation and protocol-level events."
      />
      <CategorySection
        category="Economy"
        description="Central banks, inflation, growth, employment and recession risk."
      />
      <CategorySection
        category="Tech"
        description="Product launches, AI milestones, releases and tech industry outcomes."
      />
      <CategorySection
        category="Sports"
        description="Tournaments, championships and outcome markets across major sports."
      />
      <CategorySection
        category="Regulation"
        description="Court rulings, regulatory votes and policy decisions affecting markets."
      />
      <TopMoving />
      <GainersLosers />
      <GlobalMap />
      <VenueCompare />
      <ResolutionCalendar />
      <NewsGrid />
      <ScreenerPreview />
      <Guides />
      <Platforms />
    </main>
    <Footer />
  </div>
);

export default Index;
