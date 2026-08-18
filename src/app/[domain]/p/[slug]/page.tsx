import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ArticleUI from './article-ui'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>
}): Promise<Metadata> {
  const { domain, slug } = await params
  const supabase = await createClient()

  const localDomainMapping: Record<string, string> = {
    'daily': 'daily.localhost',
    'central': 'central.localhost',
    'radar': 'radar.localhost'
  }
  
  const targetDomain = localDomainMapping[domain] || 'daily.localhost'

  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name')
    .eq('domain', targetDomain)
    .single()

  let post: any = null
  if (tenant) {
    const { data } = await supabase
      .from('posts')
      .select('title, excerpt, image_url')
      .eq('tenant_id', tenant.id)
      .eq('slug', slug)
      .single()
    post = data
  }

  const title = post?.title || 'San Miguel DAILY'
  const description = post?.excerpt || 'Periodismo local con estándar internacional en San Miguel de Allende.'
  const rawImage = post?.image_url || '/images/news_patrimony_law.jpg'
  const imageUrl = rawImage.startsWith('http') ? rawImage : `https://sanmigueldaily.com${rawImage}`

  return {
    metadataBase: new URL('https://sanmigueldaily.com'),
    title: `${title} | San Miguel DAILY`,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `https://sanmigueldaily.com/p/${slug}`,
      siteName: 'San Miguel DAILY',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>
}) {
  const resolvedParams = await params
  const { domain, slug } = resolvedParams
  const supabase = await createClient()

  // Buscar el tenant ID
  const localDomainMapping: Record<string, string> = {
    'daily': 'daily.localhost',
    'central': 'central.localhost',
    'radar': 'radar.localhost'
  }
  
  const targetDomain = localDomainMapping[domain] || 'daily.localhost'

  const { data: tenant } = await supabase
    .from('tenants')
    .select('id, name')
    .eq('domain', targetDomain)
    .single()

  if (!tenant) return notFound()

  // Fetch real post
  let { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('tenant_id', tenant.id)
    .eq('slug', slug)
    .single()

  if (!post) return notFound()

  // Fetch real related posts
  const { data: relatedPosts } = await supabase
    .from('posts')
    .select('id, title, slug, category, created_at')
    .eq('tenant_id', tenant.id)
    .neq('slug', slug)
    .order('created_at', { ascending: false })
    .limit(4)

  return (
    <>
      <ArticleUI post={post} relatedPosts={relatedPosts || []} />
    </>
  )
}
