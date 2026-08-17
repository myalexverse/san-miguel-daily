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

  // Fallback to a mock article if it's one of our padded UI news
  if (!post) {
    post = {
      id: "mock-id",
      title: "El tren ligero a Querétaro pondría a San Miguel a 40 minutos del Bajío industrial",
      slug: slug,
      excerpt: "La concesión firmada el viernes contempla siete estaciones y una inversión de 18 mil millones de pesos. Quedan por resolver el derecho de vía y el agua.",
      content: "<p>La firma ocurrió sin ceremonia. El viernes por la tarde, en una sala de la Secretaría de Movilidad en Guanajuato capital, el gobierno del estado y un consorcio encabezado por dos constructoras mexicanas cerraron la concesión de un tren ligero de 71 kilómetros entre San Miguel de Allende y el centro de Querétaro.</p><p>El contrato prevé siete estaciones, una inversión de 18 mil millones de pesos y un plazo de operación de treinta años. Si el calendario se cumple —y en obras de esta escala rara vez se cumple— el primer tren correría en el otoño de 2030.</p><p>Para San Miguel, el cálculo es doble. Por un lado, cuarenta minutos a un corredor industrial que produce uno de cada cinco automóviles del país. Por el otro, la presión sobre una ciudad de 175 mil habitantes que ya recibe 1.4 millones de visitantes al año.</p>",
      image_url: "/images/sma_fasma.jpg",
      category: "San Miguel",
      author_name: "Mariana Escobedo",
      created_at: new Date().toISOString()
    } as any;
  }

  return (
    <>
      <ArticleUI post={post} />
    </>
  )
}
