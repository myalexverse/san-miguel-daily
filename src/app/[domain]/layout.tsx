import { Playfair_Display, Inter, Roboto, Oswald } from 'next/font/google'
import type { Metadata } from 'next'
import { UiProvider } from "@/components/brands/daily/UiProvider"

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-sans' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' })

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  
  const siteTitles: Record<string, string> = {
    daily: 'San Miguel DAILY | El periódico local de estándar internacional',
    central: 'Central SMA | El periódico de información general',
    radar: 'Radar San Miguel | Noticias Inmediatas'
  }

  const siteDescriptions: Record<string, string> = {
    daily: 'Noticias locales, política, economía, cultura y turismo de San Miguel de Allende.',
    central: 'Información general y actualidad del estado de Guanajuato y la región del Bajío.',
    radar: 'Noticias inmediatas y de última hora en San Miguel de Allende.'
  }

  const domainKey = resolvedParams.domain || 'daily'
  const title = siteTitles[domainKey] || siteTitles.daily
  const description = siteDescriptions[domainKey] || siteDescriptions.daily

  return {
    title: {
      template: '%s | San Miguel DAILY',
      default: title,
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: 'https://sanmigueldaily.com',
      siteName: 'San Miguel DAILY',
      images: [
        {
          url: 'https://sanmigueldaily.com/images/news_patrimony_law.jpg',
          width: 1200,
          height: 630,
          alt: 'San Miguel DAILY',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['https://sanmigueldaily.com/images/news_patrimony_law.jpg'],
    },
  }
}

export default async function DomainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ domain: string }>
}) {
  const resolvedParams = await params
  const domain = resolvedParams.domain

  // Determinar los estilos y tipografías según el medio
  let themeClass = ''
  let fontVariables = ''

  if (domain === 'daily') {
    themeClass = 'theme-daily'
    fontVariables = `${inter.variable} ${playfair.variable}`
  } else if (domain === 'central') {
    themeClass = 'theme-central'
    // Central usa Roboto tanto para títulos como para cuerpo
    fontVariables = `${roboto.variable}`
  } else if (domain === 'radar') {
    themeClass = 'theme-radar'
    fontVariables = `${inter.variable} ${oswald.variable}`
  }

  return (
    <div className={`${themeClass} ${fontVariables} min-h-screen bg-background text-foreground font-sans`}>
      <UiProvider>{children}</UiProvider>
    </div>
  )
}
