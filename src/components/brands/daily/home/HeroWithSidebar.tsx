"use client";

import Link from "next/link";
import { useT } from "../UiProvider";

// We'll pass the heroPost and latest array as props.
export function HeroWithSidebar({ heroPost, latestPosts }: { heroPost: any, latestPosts: any[] }) {
  const t = useT();

  return (
    <section className="px-5 md:px-16 md:max-w-7xl md:mx-auto pt-8 pb-12 border-b border-hairline">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left: Hero Text (4 cols) */}
        <div className="md:col-span-4 flex flex-col">
          <div className="text-[10px] font-bold uppercase tracking-widest text-spot2 mb-4">
            {heroPost?.category || "San Miguel"}
          </div>
          <h2 className="text-3xl lg:text-[36px] font-serif font-bold leading-[1.1] text-ink mb-4 text-balance">
            <Link href={`/p/${heroPost?.slug}`} className="hover:text-spot transition-colors">
              {t(heroPost?.title)}
            </Link>
          </h2>
          <p className="text-[15px] lg:text-base text-ink2 leading-relaxed mb-6 font-sans text-pretty line-clamp-4 md:line-clamp-none">
            {t(heroPost?.excerpt)}
          </p>
          <div className="text-xs text-ink font-sans tracking-wide">
            {heroPost?.author || "Mariana Escobedo"} <span className="text-ink3 mx-1">·</span> 14 min de lectura
          </div>
        </div>

        {/* Middle: Hero Image (5 cols) */}
        <div className="md:col-span-5 flex flex-col order-first md:order-none mb-6 md:mb-0">
          <Link href={`/p/${heroPost?.slug}`} className="block group cursor-pointer w-full h-[300px] md:h-[450px] rounded-[4px] overflow-hidden bg-paper-2">
            {heroPost?.image_url && (
              <img 
                src={heroPost.image_url} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105" 
              />
            )}
          </Link>
        </div>

        {/* Right: Sidebar (3 cols) */}
        <aside className="md:col-span-3 md:row-span-2 flex flex-col md:pl-8 md:border-l border-hairline">
          
          {/* Weather Widget */}
          <div className="mb-10">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-spot2 mb-4">
              {t({ es: "AHORA EN SAN MIGUEL", en: "NOW IN SAN MIGUEL" })}
            </h3>
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-10 h-10 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              <div className="text-4xl font-serif text-ink tracking-tight">24°C</div>
              <div className="text-sm font-bold text-ink2 leading-tight ml-1">Soleado</div>
            </div>
            <div className="text-[11px] text-ink3 mb-3 font-sans leading-relaxed">
              Máx. 27° · Mín. 12°<br/>
              Viento a 12 km/h · Humedad 35%
            </div>
            <Link href="/clima" className="text-xs font-bold text-spot2 hover:text-ink flex items-center gap-1 transition-colors">
              {t({ es: "Ver pronóstico completo", en: "Full forecast" })} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink border-b-2 border-ink pb-2 mb-5">
              {t({ es: "ÚLTIMA HORA", en: "BREAKING" })}
            </h3>
            <ul className="flex flex-col gap-5">
              {latestPosts.map((post, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <div className="text-[11px] font-bold text-spot2 bg-spot2/10 px-2 py-0.5 rounded-[4px] shrink-0 font-sans mt-0.5">
                    {post.time || `10:${32 - i*10}`}
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/p/${post.slug}`} className="text-[14px] font-serif font-bold text-ink group-hover:text-spot transition-colors leading-snug mb-1 text-pretty">
                      {t(post.title)}
                    </Link>
                    <div className="text-[10px] uppercase font-bold text-ink3 tracking-widest">
                      {post.category || "San Miguel"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/latest" className="text-xs font-bold text-spot2 hover:text-ink flex items-center gap-1 mt-6 transition-colors">
              {t({ es: "Ver más noticias", en: "More news" })} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

        </aside>

        {/* Ad Banner (Row 2, spanning the first 9 columns) */}
        <div className="md:col-span-9 hidden md:flex items-end mt-4">
          <div className="w-full h-[100px] bg-paper-2 border border-hairline flex flex-col items-center justify-center rounded-[4px] group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-paper to-paper-2 opacity-50"></div>
            <span className="text-[9px] text-ink3 uppercase tracking-widest font-bold absolute top-2 right-3">
              Publicidad
            </span>
            <div className="z-10 flex flex-col items-center">
              <span className="text-sm font-serif font-bold text-ink tracking-wide">
                San Miguel Real Estate
              </span>
              <span className="text-xs font-sans text-ink2 mt-1">
                Descubre propiedades exclusivas en el centro histórico
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
