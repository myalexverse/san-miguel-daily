import { createClient } from '@/lib/supabase/server'
import { SiteHeader } from "@/components/brands/daily/SiteHeader";
import { MenuOverlay } from "@/components/brands/daily/MenuOverlay";
import { Paywall } from "@/components/brands/daily/Paywall";
import { Footer } from "@/components/brands/daily/Footer";
import { MobileTabBar } from "@/components/brands/daily/MobileTabBar";
import { SectionScreen } from "@/components/brands/daily/SectionScreen";
import { getSection } from "@/components/brands/daily/lib/sections";

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ domain: string, slug: string }>
}) {
  const { domain, slug } = await params;
  const supabase = await createClient();

  const localDomainMapping: Record<string, string> = {
    'daily': 'daily.localhost',
    'central': 'central.localhost',
    'radar': 'radar.localhost'
  }
  const targetDomain = localDomainMapping[domain] || 'daily.localhost'

  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', targetDomain)
    .single();

  let posts = []
  if (tenant) {
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, created_at, category, image_url, author_name, author_avatar')
      .eq('tenant_id', tenant.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(30);
    
    if (data) posts = data;
  }

  // Filter posts for this specific section, plus opinions to show in the column
  const sectionPosts = posts.filter(p => p.category === slug || p.category === 'opinion');

  return (
    <>
      <SiteHeader variant="slim" />
      <SectionScreen data={getSection(slug) || getSection("cultura")!} posts={sectionPosts} />
      <Footer />
      <MobileTabBar />
      <MenuOverlay />
      <Paywall />
    </>
  );
}
