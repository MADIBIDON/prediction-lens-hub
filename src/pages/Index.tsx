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
    <ThreeColumns />
    <CategoryPills />
    <main>
      <CategorySection category="Politics" />
      <CategorySection category="Geopolitics" />
      <CategorySection category="Crypto" />
      <CategorySection category="Economy" />
      <CategorySection category="Tech" />
      <CategorySection category="Sports" />
      <ResolutionCalendar />
      <GlobalMap />
      <VenueCompare />
      <NewsGrid />
      <TopMoving />
      <GainersLosers />
      <ScreenerPreview />
      <Platforms />
      <Guides />
    </main>
    <Footer />
  </div>
);

export default Index;
