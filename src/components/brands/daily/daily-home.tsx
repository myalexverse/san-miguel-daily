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
  
  // Data Mapping for New Architecture
  const heroPost = newsPosts[0]; 
  const latestSidebarPosts = newsPosts.slice(1, 6); // Up to 5 items
  const edicionPosts = newsPosts.slice(6, 11); // Up to 5 items
  
  // Reportaje Especial
  const reportajePost = newsPosts.find(p => p.category === 'san-miguel' && p !== heroPost) || newsPosts[11];
  
  // Category Grid (4 items for San Miguel, Politics, Economy, Culture)
  const categoryPosts = [
    newsPosts.find(p => p.category?.toLowerCase() === 'san-miguel' && p !== heroPost && p !== reportajePost) || newsPosts[12],
    newsPosts.find(p => p.category?.toLowerCase() === 'politica') || newsPosts[13],
    newsPosts.find(p => p.category?.toLowerCase() === 'economia') || newsPosts[14],
    newsPosts.find(p => p.category?.toLowerCase() === 'cultura') || newsPosts[15]
  ].filter(Boolean); // Filter out undefined if missing

  // Bottom Row (Tourism)
  const turismoPost = newsPosts.find(p => p.category?.toLowerCase() === 'turismo') || newsPosts[16];

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
