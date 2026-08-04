import { SiteHeader } from "@/components/brands/daily/SiteHeader";
import { MenuOverlay } from "@/components/brands/daily/MenuOverlay";
import { Paywall } from "@/components/brands/daily/Paywall";
import { Footer } from "@/components/brands/daily/Footer";
import { MobileTabBar } from "@/components/brands/daily/MobileTabBar";
import { SectionScreen } from "@/components/brands/daily/SectionScreen";
import { getSection } from "@/components/brands/daily/lib/sections";

/**
 * One thin route per section. Every one renders the same <SectionScreen />
 * from lib/sections.ts — collapse these into app/seccion/[slug]/page.tsx with
 * generateStaticParams() if you prefer a dynamic segment.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return (
    <>
      <SiteHeader variant="slim" />
      <SectionScreen data={getSection(slug) || getSection("cultura")!} />
      <Footer />
      <MobileTabBar />
      <MenuOverlay />
      <Paywall />
    </>
  );
}
