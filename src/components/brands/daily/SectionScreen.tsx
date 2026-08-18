"use client";

import Link from "next/link";
import { useT } from "./UiProvider";
import { Button, Kicker, SectionHeading } from "./ui";
import { nav, latest, trending } from "@/components/brands/daily/lib/content";
import type { SectionData } from "@/components/brands/daily/lib/sections";

export function SectionScreen({ data, posts }: { data: SectionData, posts?: any[] }) {
  const t = useT();
  
  // Dynamic Data Mapping
  const newsPosts = posts ? posts.filter(p => p.category !== 'opinion') : [];
  const opinionPosts = posts ? posts.filter(p => p.category === 'opinion') : [];
  
  // The user requested to keep the curated Hero (lead) and Special Report (investigation) intact for now, EXCEPT for politica where we pin the new survey.
  let heroPost = null;
  if (data.slug === 'politica') {
    heroPost = newsPosts.find((p: any) => p.slug === 'exclusiva-juan-pasqualli-lidera-encuestas-panistas-2027') || null;
  }
  
  const mainOpinion = null;
  const invPost = null;
  const videoPost = null;

  // We only use the dynamic posts to populate the news lists. Allow up to 30 items for the scrollable list.
  // Filter out the heroPost so it doesn't duplicate in the latest list
  const filteredNews = newsPosts.filter(p => p.slug !== heroPost?.slug);
  const latestPosts = filteredNews.length > 0 ? filteredNews.slice(0, 30) : latest.slice(0, 30);
  const trendingList = filteredNews.length > 4 ? filteredNews.slice(4, 9) : trending.slice(0,5);
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
          <article className="lg:col-span-2 relative w-full aspect-video min-h-[450px] lg:min-h-[600px] rounded-[4px] overflow-hidden group cursor-pointer shadow-sm flex flex-col">
            {heroPost?.image_url || data.lead.image ? (
              <img src={heroPost?.image_url || data.lead.image} alt={heroPost?.title || t(data.lead.title)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-paper-2" />
            )}
            
            {/* Gradient Overlay (Shorter gradient to let the image breathe) */}
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 40%, transparent 70%)' }}
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 pointer-events-none z-10 flex flex-col">
              <div className="inline-block w-fit bg-spot2/90 text-white text-xs font-bold tracking-widest uppercase px-3 py-1 mb-4 rounded-sm">
                {heroPost ? heroPost.category.toUpperCase() : t(data.lead.kicker)}
              </div>
              <h2 className="text-3xl lg:text-[40px] font-serif font-bold leading-[1.1] mb-3 text-pretty">
                <Link href={heroPost ? `/p/${heroPost.slug}` : "/p/exclusiva-juan-pasqualli-lidera-encuestas-panistas-2027"} className="hover:text-spot transition-colors pointer-events-auto" style={{ color: '#ffffff' }}>
                  {heroPost ? heroPost.title : t(data.lead.title)}
                </Link>
              </h2>
              <p className="text-base lg:text-lg max-w-3xl mb-4 leading-snug line-clamp-3" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {heroPost ? heroPost.excerpt : t(data.lead.dek)}
              </p>
              <div className="text-xs font-sans tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {heroPost ? heroPost.author_name : data.lead.byline} <span suppressHydrationWarning>{heroPost ? new Date(heroPost.created_at).toLocaleDateString('es-MX') : t(data.lead.meta)}</span>
              </div>
            </div>
          </article>

          {/* Right: Últimas noticias */}
          <aside className="lg:col-span-1 flex flex-col h-full lg:pl-4">
            <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-6 shrink-0">
              <h3 className="text-2xl font-serif font-bold">{t({ es: "Últimas noticias", en: "Latest news" })}</h3>
            </div>
            
            <div className="flex flex-col gap-6 overflow-y-auto pr-2 pb-4 max-h-[400px] lg:max-h-[590px] scrollbar-thin scrollbar-thumb-ink3 scrollbar-track-transparent">
              {latestPosts.map((item: any, idx) => (
                <article key={idx} className="flex gap-4 group cursor-pointer">
                  <div className="w-24 h-[72px] shrink-0 rounded-sm overflow-hidden bg-paper-2">
                    {(item.image_url || item.image) && (
                      <img src={item.image_url || item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-[11px] text-ink3 mb-1 font-sans flex items-center gap-2">
                      <span className="font-bold" suppressHydrationWarning>{item.created_at ? new Date(item.created_at).toLocaleDateString('es-MX') : item.time}</span>
                    </div>
                    <h4 className="text-[15px] font-bold leading-tight font-serif group-hover:text-spot transition-colors line-clamp-2">
                      <Link href={item.slug ? `/p/${item.slug}` : "/p/exclusiva-juan-pasqualli-lidera-encuestas-panistas-2027"}>
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
              {trendingList.map((item: any, idx) => (
                <li key={idx} className="flex gap-4 py-4 border-b border-hairline group cursor-pointer items-start">
                  <div className="text-3xl font-serif font-bold text-ink/20 group-hover:text-spot transition-colors leading-none pt-0.5">
                    {idx + 1}
                  </div>
                  <h4 className="text-[16px] leading-snug font-serif group-hover:text-spot transition-colors text-pretty">
                    <Link href={item.slug ? `/p/${item.slug}` : "/p/exclusiva-juan-pasqualli-lidera-encuestas-panistas-2027"}>
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
            
            {(mainOpinion || data.opinion) && (
              <div className="mb-8 group cursor-pointer flex flex-col gap-4">
                <div className="w-full aspect-[16/10] shrink-0 rounded-sm overflow-hidden bg-paper-2 shadow-sm">
                  {(mainOpinion?.author_avatar || data.opinion?.photo) && (
                    <img src={mainOpinion?.author_avatar || data.opinion?.photo} alt={mainOpinion?.author_name || data.opinion?.author} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-[10px] bg-paper-2 px-2 py-0.5 rounded-sm inline-block w-fit text-ink3 uppercase tracking-widest font-bold mb-2">
                    {t({ es: "COLUMNA", en: "COLUMN" })}
                  </div>
                  <h4 className="text-[22px] font-serif font-bold leading-tight mb-2 group-hover:text-spot transition-colors text-pretty">
                    <Link href={mainOpinion ? `/p/${mainOpinion.slug}` : "/p/exclusiva-juan-pasqualli-lidera-encuestas-panistas-2027"}>
                      {mainOpinion ? mainOpinion.title : t(data.opinion!.title)}
                    </Link>
                  </h4>
                  <p className="text-[15px] text-ink2 leading-snug line-clamp-3 mb-2 font-sans text-pretty">
                    {mainOpinion ? mainOpinion.excerpt : t(data.opinion!.dek!)}
                  </p>
                  <div className="text-[12px] text-ink font-sans font-medium">
                    {mainOpinion ? mainOpinion.author_name : data.opinion?.author} <span className="text-ink3 font-normal" suppressHydrationWarning>· {mainOpinion ? new Date(mainOpinion.created_at).toLocaleDateString('es-MX') : t(data.opinion!.meta)}</span>
                  </div>
                </div>
              </div>
            )}

            {(invPost || data.investigation) && (
              <div className="bg-paper-2 p-6 rounded-sm group cursor-pointer border border-hairline hover:border-spot2 transition-colors">
                <div className="text-[10px] text-spot2 uppercase tracking-widest font-bold mb-2">
                  {t({ es: "INVESTIGACIÓN", en: "INVESTIGATION" })}
                </div>
                <h4 className="text-lg font-serif font-bold leading-tight mb-2 group-hover:text-spot transition-colors">
                  <Link href={invPost ? `/p/${invPost.slug}` : "/p/exclusiva-juan-pasqualli-lidera-encuestas-panistas-2027"}>
                    {invPost ? invPost.title : t(data.investigation!.title)}
                  </Link>
                </h4>
                <p className="text-[14px] text-ink2 leading-snug mb-4">
                  {invPost ? invPost.excerpt : t(data.investigation!.dek)}
                </p>
                <div className="w-full h-32 rounded-sm overflow-hidden mb-4 bg-paper">
                   <img src={invPost?.image_url || data.investigation?.photo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                </div>
                <Link href={invPost ? `/p/${invPost.slug}` : "/p/exclusiva-juan-pasqualli-lidera-encuestas-panistas-2027"} className="text-xs font-bold text-spot2 hover:text-ink uppercase flex justify-end items-center gap-1">
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

            {(videoPost || data.video) && (
              <div className="group cursor-pointer">
                <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden mb-3 bg-paper-2 dark:bg-black">
                  <img src={videoPost?.image_url || data.video?.photo} className="absolute inset-0 w-full h-full object-cover dark:opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" alt="" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">VIDEO</span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
                    <h4 className="text-white font-serif font-bold text-xl leading-snug text-pretty drop-shadow-md">
                      {videoPost ? videoPost.title : t(data.video!.title)}
                    </h4>
                  </div>
                </div>
                <Link href={videoPost ? `/p/${videoPost.slug}` : "/p/exclusiva-juan-pasqualli-lidera-encuestas-panistas-2027"} className="text-xs font-bold text-spot2 hover:text-ink uppercase flex items-center gap-1 mt-3">
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
