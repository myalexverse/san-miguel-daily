"use client";

import Link from "next/link";
import { useT } from "../UiProvider";

export function ReportajeEspecial({ post }: { post: any }) {
  const t = useT();

  if (!post) return null;

  return (
    <section className="w-full bg-paper-2">
      <div className="px-5 md:px-16 md:max-w-7xl md:mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Content (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <div className="text-[10px] bg-paper px-2 py-0.5 rounded-sm inline-block w-fit text-ink3 uppercase tracking-widest font-bold mb-4 border border-hairline">
              {t({ es: "REPORTAJE ESPECIAL", en: "SPECIAL REPORT" })}
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-[1.1] text-ink mb-6 text-pretty">
              <Link href={`/p/${post.slug}`} className="hover:text-spot transition-colors">
                {t(post.title)}
              </Link>
            </h2>
            
            <p className="text-base md:text-lg text-ink2 leading-relaxed mb-8 font-sans text-pretty">
              {t(post.excerpt)}
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="text-xs text-ink font-sans tracking-wide">
                {post.author || "Alejandro Tovar"} <span className="text-ink3 mx-1">·</span> 8 min de lectura
              </div>
              <Link href={`/p/${post.slug}`} className="text-xs font-bold text-spot2 hover:text-ink flex items-center gap-1 transition-colors w-fit">
                {t({ es: "Leer reportaje", en: "Read feature" })} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Image (8 cols) */}
          <div className="md:col-span-8 flex flex-col">
            <Link href={`/p/${post.slug}`} className="block group cursor-pointer w-full rounded-[4px] overflow-hidden" style={{ aspectRatio: '21/9' }}>
              {post.image_url ? (
                <img 
                  src={post.image_url} 
                  alt={typeof post.title === 'string' ? post.title : ''} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              ) : (
                <div className="w-full h-full bg-paper" />
              )}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
