import { Playfair_Display, Inter, Roboto, Oswald } from 'next/font/google'
import type { Metadata } from 'next'
import { UiProvider } from "@/components/brands/daily/UiProvider"

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' })
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-sans' })
const oswald = Oswald({ subsets: ['latin'], variable: '--font-heading' })

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  
  if (resolvedParams.domain === 'daily') {
    return { title: 'San Miguel Daily | El periódico digital premium' }
  }
  if (resolvedParams.domain === 'central') {
    return { title: 'Central SMA | El periódico de información general' }
  }
  return { title: 'Radar San Miguel | Noticias Inmediatas' }
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
