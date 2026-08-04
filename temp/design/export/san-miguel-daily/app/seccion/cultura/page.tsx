import { SiteHeader } from "@/components/SiteHeader";
import { MenuOverlay } from "@/components/MenuOverlay";
import { Paywall } from "@/components/Paywall";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { SectionScreen } from "@/components/SectionScreen";
import { getSection } from "@/lib/sections";

/**
 * One thin route per section. Every one renders the same <SectionScreen />
 * from lib/sections.ts — collapse these into app/seccion/[slug]/page.tsx with
 * generateStaticParams() if you prefer a dynamic segment.
 */
export default function Page() {
  return (
    <>
      <SiteHeader variant="slim" />
      <SectionScreen data={getSection("cultura")!} />
      <Footer />
      <MobileTabBar />
      <MenuOverlay />
      <Paywall />
    </>
  );
}
