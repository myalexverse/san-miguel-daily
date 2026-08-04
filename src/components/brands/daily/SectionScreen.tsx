"use client";

import Link from "next/link";
import { useT } from "./UiProvider";
import { Button, Kicker, SectionHeading } from "./ui";
import { nav, latest, trending } from "@/components/brands/daily/lib/content";
import type { SectionData } from "@/components/brands/daily/lib/sections";

export function SectionScreen({ data }: { data: SectionData }) {
  const t = useT();
  return (
    <main className="bg-paper">
      {/* category rail (mobile) */}
      <nav className="flex gap-5 overflow-x-auto whitespace-nowrap border-b border-hairline px-5 py-3 text-xs uppercase tracking-nav md:hidden">
        {nav.map((n) => (
          <Link
            key={n.slug}
            href={"/seccion/" + n.slug}
            className={
              "border-b-2 pb-1 " + (n.slug === data.slug ? "border-spot text-spot" : "border-transparent text-ink")
            }
          >
            {t(n.label)}
          </Link>
        ))}
      </nav>

      <header className="px-5 pt-10 pb-8 md:max-w-7xl md:mx-auto md:px-16 md:pt-16 border-b-2 border-ink">
        <Kicker tone="spot">{t({ es: "SECCIÓN", en: "SECTION" })}</Kicker>
        <h1 className="text-5xl font-serif font-bold leading-[0.9] tracking-tight md:text-6xl mt-2 mb-4">{t(data.title)}</h1>
        <p className="max-w-[42em] text-lg leading-relaxed text-ink2 md:text-xl font-sans">{t(data.dek)}</p>
      </header>

      {/* Hero & Latest News Grid */}
      <section className="px-5 md:px-16 md:max-w-7xl md:mx-auto pt-10 pb-12 border-b border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Left: Hero Story */}
          <article className="lg:col-span-2 relative w-full aspect-video min-h-[400px] lg:min-h-[500px] rounded-[4px] overflow-hidden group cursor-pointer shadow-sm flex flex-col">
            {data.lead.image ? (
              <img src={data.lead.image} alt={t(data.lead.title)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-paper-2" />
            )}
            
            {/* Gradient Overlay (Foolproof inline style) */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 pointer-events-none z-10 flex flex-col justify-end h-full">
              <div className="inline-block w-fit bg-spot2/90 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 mb-4 rounded-sm">
                {t(data.lead.kicker)}
              </div>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold leading-tight mb-3 text-pretty">
                <Link href="/articulo" className="hover:text-spot transition-colors pointer-events-auto" style={{ color: '#ffffff' }}>
                  {t(data.lead.title)}
                </Link>
              </h2>
              <p className="text-base lg:text-lg max-w-3xl mb-4 leading-snug" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {t(data.lead.dek)}
              </p>
              <div className="text-xs font-sans tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {data.lead.byline} · {t(data.lead.meta)}
              </div>
            </div>
          </article>

          {/* Right: Últimas noticias */}
          <aside className="lg:col-span-1 flex flex-col h-full lg:pl-4">
            <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-6">
              <h3 className="text-2xl font-serif font-bold">{t({ es: "Últimas noticias", en: "Latest news" })}</h3>
              <Link href="/latest" className="text-xs font-bold text-spot2 hover:text-ink uppercase tracking-wider flex items-center gap-1">
                {t({ es: "Ver todas", en: "See all" })} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            <div className="flex flex-col gap-6">
              {latest.map((item, idx) => (
                <article key={idx} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 h-[72px] shrink-0 rounded-sm overflow-hidden bg-paper-2">
                    {item.image && (
                      <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-[11px] text-ink3 mb-1 font-sans flex items-center gap-2">
                      <span className="font-bold">{item.time}</span>
                    </div>
                    <h4 className="text-[15px] font-bold leading-tight font-serif group-hover:text-spot transition-colors line-clamp-2">
                      <Link href={`/p/${item.slug}`}>
                        {t(item.title)}
                      </Link>
                    </h4>
                    <div className="text-[11px] text-spot2 mt-1.5 uppercase tracking-wide font-medium">
                      {item.category}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* 3-Column Lower Grid (Trending / Opinion / Video) */}
      <section className="px-5 md:px-16 md:max-w-7xl md:mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          
          {/* Col 1: Lo más leído */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-6">
              <h3 className="text-2xl font-serif font-bold">{t({ es: "Lo más leído", en: "Most read" })}</h3>
            </div>
            <ol className="flex flex-col gap-0">
              {trending.map((item, idx) => (
                <li key={idx} className="flex gap-4 py-4 border-b border-hairline group cursor-pointer items-start">
                  <div className="text-3xl font-serif font-bold text-ink/20 group-hover:text-spot transition-colors leading-none pt-0.5">
                    {idx + 1}
                  </div>
                  <h4 className="text-[16px] leading-snug font-serif group-hover:text-spot transition-colors text-pretty">
                    <Link href={`/p/${item.slug}`}>
                      {t(item.title)}
                    </Link>
                  </h4>
                </li>
              ))}
            </ol>
          </div>

          {/* Col 2: Opinión */}
          <div>
            <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-6">
              <h3 className="text-2xl font-serif font-bold">{t({ es: "Opinión", en: "Opinion" })}</h3>
              <Link href="/opinion" className="text-xs font-bold text-spot2 hover:text-ink uppercase tracking-wider flex items-center gap-1">
                {t({ es: "Ver todas", en: "See all" })} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            
            {data.opinion && (
              <div className="mb-8 group cursor-pointer flex flex-col gap-4">
                <div className="w-full aspect-[16/10] shrink-0 rounded-sm overflow-hidden bg-paper-2 shadow-sm">
                  {data.opinion.photo && (
                    <img src={data.opinion.photo} alt={data.opinion.author} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-[10px] bg-paper-2 px-2 py-0.5 rounded-sm inline-block w-fit text-ink3 uppercase tracking-widest font-bold mb-2">
                    {t({ es: "COLUMNA", en: "COLUMN" })}
                  </div>
                  <h4 className="text-[22px] font-serif font-bold leading-tight mb-2 group-hover:text-spot transition-colors text-pretty">
                    <Link href="/articulo">
                      {t(data.opinion.title)}
                    </Link>
                  </h4>
                  <p className="text-[15px] text-ink2 leading-snug line-clamp-3 mb-2 font-sans text-pretty">
                    {t(data.opinion.dek!)}
                  </p>
                  <div className="text-[12px] text-ink font-sans font-medium">
                    {data.opinion.author} <span className="text-ink3 font-normal">· {t(data.opinion.meta)}</span>
                  </div>
                </div>
              </div>
            )}

            {data.investigation && (
              <div className="bg-paper-2 p-6 rounded-sm group cursor-pointer border border-hairline hover:border-spot2 transition-colors">
                <div className="text-[10px] text-spot2 uppercase tracking-widest font-bold mb-2">
                  {t({ es: "INVESTIGACIÓN", en: "INVESTIGATION" })}
                </div>
                <h4 className="text-lg font-serif font-bold leading-tight mb-2 group-hover:text-spot transition-colors">
                  <Link href="/articulo">
                    {t(data.investigation.title)}
                  </Link>
                </h4>
                <p className="text-[14px] text-ink2 leading-snug mb-4">
                  {t(data.investigation.dek)}
                </p>
                <div className="w-full h-32 rounded-sm overflow-hidden mb-4 bg-paper">
                   <img src={data.investigation.photo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <Link href="/articulo" className="text-xs font-bold text-spot2 hover:text-ink uppercase flex justify-end items-center gap-1">
                  {t({ es: "Leer reportaje", en: "Read feature" })} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </div>

          {/* Col 3: Actualidad (Video) */}
          <div>
             <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-6">
              <h3 className="text-2xl font-serif font-bold">
                {t({ es: `Actualidad ${data.title.es.toLowerCase()}`, en: `${data.title.en} updates` })}
              </h3>
            </div>

            {data.video && (
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden mb-3 bg-paper-2 dark:bg-black">
                  <img src={data.video.photo} className="absolute inset-0 w-full h-full object-cover dark:opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt="" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">VIDEO</span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                    <h4 className="text-white font-serif font-bold text-xl leading-snug text-pretty drop-shadow-md">
                      {t(data.video.title)}
                    </h4>
                  </div>
                </div>
                <Link href="/articulo" className="text-xs font-bold text-spot2 hover:text-ink uppercase flex items-center gap-1 mt-3">
                  {t({ es: "Ver video", en: "Watch video" })} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </section>

      <div className="border-t border-hairline px-5 py-12 text-sm text-ink2 md:px-16 text-center">
        San Miguel Daily · {t(data.title)} · {t(data.editor)}
      </div>
    </main>
  );
}
