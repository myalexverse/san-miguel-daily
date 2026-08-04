import { SiteHeader } from "@/components/SiteHeader";
import { MenuOverlay } from "@/components/MenuOverlay";
import { Paywall } from "@/components/Paywall";
import { BreakingStrip } from "@/components/home/BreakingStrip";
import { HeroSection } from "@/components/home/HeroSection";
import { NewsGrid } from "@/components/home/NewsGrid";
import { TrendingAndLatest } from "@/components/home/TrendingAndLatest";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { OpinionRow } from "@/components/home/OpinionRow";
import { VideoAndEvents } from "@/components/home/VideoAndEvents";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <BreakingStrip />
        <HeroSection />
        <NewsGrid />
        <TrendingAndLatest />
        <GalleryStrip />
        <OpinionRow />
        <VideoAndEvents />
        <NewsletterSignup />
      </main>
      <Footer />
      <MobileTabBar />
      <MenuOverlay />
      <Paywall />
    </>
  );
}
