import { SiteHeader } from "@/components/brands/daily/SiteHeader";
import { MenuOverlay } from "@/components/brands/daily/MenuOverlay";
import { Paywall } from "@/components/brands/daily/Paywall";
import { BreakingStrip } from "@/components/brands/daily/home/BreakingStrip";
import { Footer } from "@/components/brands/daily/Footer";
import { MobileTabBar } from "@/components/brands/daily/MobileTabBar";

// New Architecture Components
import { HeroWithSidebar } from "@/components/brands/daily/home/HeroWithSidebar";
import { LaEdicion } from "@/components/brands/daily/home/LaEdicion";
import { ReportajeEspecial } from "@/components/brands/daily/home/ReportajeEspecial";
import { GalleryStrip } from "@/components/brands/daily/home/GalleryStrip";
import { CategoryGrid } from "@/components/brands/daily/home/CategoryGrid";
import { BottomRow } from "@/components/brands/daily/home/BottomRow";

import { latest, opinion as opinionMock, secondary, trending } from "@/components/brands/daily/lib/content";

export default function DailyHome({ posts }: { posts?: any[] }) {
  // Merge mock data for robust titles
  const allPosts = (posts || []).map(p => {
    const mock = latest.find(l => l.slug === p.slug);
    if (mock) {
      return { ...p, title: mock.title };
    }
    return p;
  });
  
  // Categorize
  const newsPosts = allPosts.filter(p => p.category !== 'opinion');
  const opinionPosts = allPosts.filter(p => p.category === 'opinion');
  
  // Pinned Posts (User explicitly requested to keep these specific stories as Hero and Special Report)
  const pinnedHeroSlug = 'mejor-ciudad-del-mundo-2026';
  const pinnedReportajeSlug = 'tren-ligero-queretaro';

  let heroPost = newsPosts.find(p => p.slug === pinnedHeroSlug);
  let reportajePost = newsPosts.find(p => p.slug === pinnedReportajeSlug);

  // Fallback to index if pinned posts not found (safety)
  if (!heroPost) heroPost = newsPosts[0];
  if (!reportajePost) reportajePost = newsPosts.find(p => p.category === 'san-miguel' && p.slug !== heroPost?.slug) || newsPosts[11];

  // Filter out the pinned posts so they don't duplicate in the regular lists
  const availablePosts = newsPosts.filter(p => p.slug !== heroPost?.slug && p.slug !== reportajePost?.slug);

  // Data Mapping for remaining slots
  const latestSidebarPosts = availablePosts.slice(0, 5);
  const edicionPosts = availablePosts.slice(5, 10);
  
  // Category Grid (4 items)
  const categoryPosts = [
    availablePosts.find(p => p.category?.toLowerCase() === 'san-miguel') || availablePosts[10],
    availablePosts.find(p => p.category?.toLowerCase() === 'politica') || availablePosts[11],
    availablePosts.find(p => p.category?.toLowerCase() === 'economia') || availablePosts[12],
    availablePosts.find(p => p.category?.toLowerCase() === 'cultura') || availablePosts[13]
  ].filter(Boolean);

  // Bottom Row (Tourism)
  const turismoPost = availablePosts.find(p => p.category?.toLowerCase() === 'turismo' && !categoryPosts.includes(p)) || availablePosts[14];

  return (
    <>
      <SiteHeader />
      <main>
        {/* Breaking (Top Bar) */}
        <BreakingStrip />
        
        {/* 1. Hero with Sidebar Timeline */}
        <HeroWithSidebar 
          heroPost={heroPost} 
          latestPosts={latestSidebarPosts} 
        />
        
        {/* 2. La Edición (Text-only 5-column block) */}
        <LaEdicion 
          posts={edicionPosts} 
        />
        
        {/* 3. Reportaje Especial (One huge photo) */}
        <ReportajeEspecial 
          post={reportajePost} 
        />
        
        {/* Galería Fotográfica Restored */}
        <GalleryStrip />
        
        {/* 4. Categorías Principales (4 Columns) */}
        <CategoryGrid 
          posts={categoryPosts} 
        />
        
        {/* 5. Fila Final (Turismo, Opinión, Newsletter) */}
        <BottomRow 
          turismoPost={turismoPost} 
          opinionPosts={opinionPosts} 
        />
        
      </main>
      <Footer />
      <MobileTabBar />
      <MenuOverlay />
      <Paywall />
    </>
  );
}
