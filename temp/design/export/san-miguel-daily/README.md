# San Miguel Daily — maqueta en Next.js + Tailwind

Maqueta del periódico digital, escrita como app de **Next.js 14 (App Router)** con
**TypeScript** y **Tailwind CSS**. No hay CSS por componente: el único archivo de
estilos es `app/globals.css`, y ahí solo viven las variables de color del sistema
Broadsheet (claro y oscuro). Todo lo demás son clases de Tailwind en el JSX.

## Correr el proyecto

    npm install
    npm run dev     # http://localhost:3000

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Portada |
| `/articulo` | Artículo con muro de pago |
| `/seccion/san-miguel` | Sección San Miguel |
| `/seccion/politica` | Sección Política |
| `/seccion/economia` | Sección Economía (incluye tabla de indicadores) |
| `/seccion/cultura` | Sección Cultura |
| `/seccion/turismo` | Sección Turismo |
| `/buscar` | Búsqueda en el archivo |
| `/boletin` | Boletines + vista previa del correo |
| `/dashboard` | Dashboard de redacción |

Las cinco secciones son rutas delgadas que renderizan el mismo
`<SectionScreen data={...} />` con datos de `lib/sections.ts`. Si prefieren un
segmento dinámico, colapsen las cinco en `app/seccion/[slug]/page.tsx` y usen
`generateStaticParams()` (el archivo trae el comentario correspondiente).

## Componentes

    components/
      Logo.tsx             Logo SVG (wordmark) y LogoMark (monograma cuadrado)
      UiProvider.tsx       Idioma (ES/EN), modo oscuro, muro de pago, menú — Context + localStorage
      ui.tsx               Button, Tag, Kicker, SectionHeading, LangThemeControls
      SiteHeader.tsx       Barra de utilidades + masthead + nav (variantes "full" y "slim")
      MenuOverlay.tsx      Menú/buscador a pantalla completa
      Paywall.tsx          Modal de suscripción con los tres planes
      NewsletterSignup.tsx Bloque de alta al boletín
      Footer.tsx           Pie
      MobileTabBar.tsx     Barra inferior en móvil (objetivos de 44px)
      ImagePlaceholder.tsx Hueco de fotografía
      SectionScreen.tsx    Portada de sección, alimentada por datos
      home/                HeroSection, NewsGrid, TrendingAndLatest, GalleryStrip,
                           OpinionRow, VideoAndEvents, BreakingStrip

## Contenido

Todo el texto es bilingüe y vive en `lib/content.ts` y `lib/sections.ts` como
pares `{ es, en }`. En los componentes se resuelve con el hook `useT()`:

    const t = useT();
    <h1>{t(heroStory.title)}</h1>

Los titulares son ejemplos verosímiles de San Miguel de Allende, escritos para la
maqueta. Sustituirlos por contenido real del CMS.

## Diseño

- **Mobile first.** Las clases sin prefijo son la versión móvil; `md:` y `lg:`
  construyen el desktop.
- **Tokens.** Colores, tipografía, radios y tracking están en `tailwind.config.ts`
  apuntando a las variables de `globals.css`: `paper`, `paper2`, `ink`, `ink2`,
  `ink3`, `rule`, `hairline`, `spot` (cian), `spot2` (magenta). No usen hex sueltos.
- **Modo oscuro** por clase `dark` en `<html>`, que conmuta el mismo juego de
  variables. Persistido en localStorage.
- **Tipografía.** Source Serif 4 para todo, cargada desde Google Fonts en
  `app/layout.tsx`. Cámbienla a `next/font` si quieren autohospedarla.

## Fotografía

`ImagePlaceholder` marca cada hueco de imagen con `data-treatment`:

- `cmyk` — fotografías que en el diseño se imprimen como cuatro planchas de
  cuatricromía desfasadas.
- `halftone` — trama de puntos de periódico, para imágenes de interfaz.

Ese efecto se logra con filtros SVG en la maqueta original y no se incluyó aquí
para no cargar el bundle. Al conectar fotografía real, sustituyan el componente
por `next/image` y apliquen el filtro que corresponda.

## Logotipo

`components/Logo.tsx` trae el SVG listo para pegar en cualquier parte. Usa
`<text>` en vivo con Source Serif 4 y `currentColor`, así que hereda el color de
la tinta y funciona en claro y oscuro. Si necesitan un SVG independiente de la
fuente (impresión, terceros), conviertan el texto a contornos en Figma o con
`fonttools`.
