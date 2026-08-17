import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import DailyHome from '@/components/brands/daily/daily-home'

export const dynamic = 'force-dynamic'

export default async function DomainHomePage({
  params,
}: {
  params: Promise<{ domain: string }>
}) {
  const resolvedParams = await params
  const domain = resolvedParams.domain
  const supabase = await createClient()

  // Buscar el tenant ID basado en el dominio local
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

  // Buscar las noticias publicadas de este medio
  let posts: any[] = []
  if (tenant) {
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, created_at, category, image_url, author_name, author_avatar')
      .eq('tenant_id', tenant.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(30)
    
    if (data) posts = data
  }

  if (domain === 'daily') {
    return <DailyHome posts={posts} />
  }

  // Diferenciar el diseño de la portada (Hero) dependiendo de la marca
  return (
    <div>
      {/* Header específico de la marca */}
      <header className="border-b border-border/50 bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold font-heading tracking-tight text-primary">
              {tenant?.name || 'San Miguel Platform'}
            </h1>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <Link href="#" className="hover:text-primary transition-colors">Política</Link>
            <Link href="#" className="hover:text-primary transition-colors">Economía</Link>
            <Link href="#" className="hover:text-primary transition-colors">Opinión</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-primary">Suscríbete</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {domain === 'radar' && (
          <div className="bg-primary text-primary-foreground p-3 text-center text-sm font-bold tracking-widest uppercase mb-8 rounded">
            🔴 Breaking News: Accidente en la carretera a Dolores Hidalgo
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Hero Story */}
          <div className="lg:col-span-8 space-y-6">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative border border-border">
              {/* Imagen Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <span className="font-heading text-lg">Fotografía Destacada</span>
              </div>
            </div>
            
            <div>
              {posts.length > 0 ? (
                <>
                  <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight mb-4 text-foreground">
                    <Link href={`/p/${posts[0].slug}`} className="hover:text-primary transition-colors">
                      {posts[0].title}
                    </Link>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    {posts[0].excerpt || 'Un análisis detallado sobre el impacto económico en la región y las nuevas medidas gubernamentales que afectarán al sector inmobiliario local.'}
                  </p>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Hace 2 horas • Por Equipo Editorial
                  </div>
                </>
              ) : (
                <div className="py-10 text-center text-muted-foreground border-2 border-dashed rounded-lg border-border">
                  <h3 className="font-heading text-xl mb-2">Aún no hay noticias publicadas</h3>
                  <p>Las noticias que publiques en el panel de control aparecerán aquí.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Trending */}
          <div className="lg:col-span-4 space-y-6">
            <div className="border-t-4 border-primary pt-2 mb-6">
              <h3 className="font-heading text-xl font-bold uppercase tracking-wider">Últimas Noticias</h3>
            </div>
            
            <div className="space-y-6">
              {posts.slice(1).map((post: any) => (
                <div key={post.id} className="border-b border-border/50 pb-6 last:border-0">
                  <h4 className="text-xl font-bold font-heading leading-tight mb-2">
                    <Link href={`/p/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h4>
                  <div className="text-xs text-muted-foreground uppercase">
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}

              {posts.length <= 1 && (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-border/50 pb-6 last:border-0">
                      <h4 className="text-lg font-bold font-heading leading-tight mb-2 text-foreground/50">
                        Espacio para más noticias secundarias y reportajes
                      </h4>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Card className="bg-card mt-8 rounded-none border-t-4 border-primary">
              <CardHeader>
                <CardTitle className="font-heading text-xl">Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Recibe las noticias más importantes de San Miguel de Allende directo en tu correo.
                </p>
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full p-2 text-sm border border-border bg-background rounded mb-2"
                />
                <button className="w-full bg-primary text-primary-foreground py-2 text-sm font-medium rounded hover:opacity-90">
                  Suscribirse
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
