import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // Permitir acceso directo a /admin y /images
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/images')) {
    return NextResponse.next()
  }

  // Definir subdominios en desarrollo local o dominios en producción
  // Ejemplos: daily.localhost:3000 -> daily
  let domain = 'daily' // fallback por defecto

  if (hostname.includes('daily')) {
    domain = 'daily'
  } else if (hostname.includes('central')) {
    domain = 'central'
  } else if (hostname.includes('radar')) {
    domain = 'radar'
  }

  // Reescribir la ruta internamente hacia /app/[domain]/...
  return NextResponse.rewrite(new URL(`/${domain}${url.pathname}`, req.url))
}
