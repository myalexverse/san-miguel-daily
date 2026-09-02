import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sanmigueldaily.com'

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  let posts: any[] = []
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data } = await supabase
      .from('posts')
      .select('slug, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(1000)
    posts = data || []
  }

  // Generate sitemap items for all published posts with bilingual alternates
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/p/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at || Date.now()),
    changeFrequency: 'daily',
    priority: 0.9,
    alternates: {
      languages: {
        'es': `${baseUrl}/p/${post.slug}`,
        'en': `${baseUrl}/p/${post.slug}?lang=en`,
        'es-MX': `${baseUrl}/p/${post.slug}`,
        'en-US': `${baseUrl}/p/${post.slug}?lang=en`,
        'x-default': `${baseUrl}/p/${post.slug}`,
      },
    },
  }))

  const sections = ['san-miguel', 'politica', 'economia', 'cultura', 'turismo']
  const sectionUrls: MetadataRoute.Sitemap = sections.map((sec) => ({
    url: `${baseUrl}/seccion/${sec}`,
    lastModified: new Date(),
    changeFrequency: 'hourly',
    priority: 0.8,
    alternates: {
      languages: {
        'es': `${baseUrl}/seccion/${sec}`,
        'en': `${baseUrl}/seccion/${sec}?lang=en`,
        'es-MX': `${baseUrl}/seccion/${sec}`,
        'en-US': `${baseUrl}/seccion/${sec}?lang=en`,
        'x-default': `${baseUrl}/seccion/${sec}`,
      },
    },
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
      alternates: {
        languages: {
          'es': baseUrl,
          'en': `${baseUrl}?lang=en`,
          'es-MX': baseUrl,
          'en-US': `${baseUrl}?lang=en`,
          'x-default': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/boletin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          'es': `${baseUrl}/boletin`,
          'en': `${baseUrl}/boletin?lang=en`,
          'es-MX': `${baseUrl}/boletin`,
          'en-US': `${baseUrl}/boletin?lang=en`,
          'x-default': `${baseUrl}/boletin`,
        },
      },
    },
    {
      url: `${baseUrl}/buscar`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          'es': `${baseUrl}/buscar`,
          'en': `${baseUrl}/buscar?lang=en`,
          'es-MX': `${baseUrl}/buscar`,
          'en-US': `${baseUrl}/buscar?lang=en`,
          'x-default': `${baseUrl}/buscar`,
        },
      },
    },
    {
      url: `${baseUrl}/info/quienes-somos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/info/codigo-editorial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/info/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/info/publicidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  return [...staticUrls, ...sectionUrls, ...postUrls]
}
