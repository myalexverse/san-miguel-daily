"use client";

import Link from "next/link";
import { useT } from "../UiProvider";
import { NewsletterSignup } from "./NewsletterSignup";

export function BottomRow({ turismoPost, opinionPosts }: { turismoPost: any, opinionPosts: any[] }) {
  const t = useT();

  return (
    <section className="px-5 md:px-16 md:max-w-7xl md:mx-auto pt-12 pb-16 border-t border-hairline">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        
        {/* Col 1: Turismo */}
        <div className="flex flex-col group cursor-pointer">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-spot2 mb-4">
            {t({ es: "TURISMO", en: "TOURISM" })}
          </h3>
          <h4 className="text-[22px] font-serif font-bold leading-snug text-ink mb-2 group-hover:text-spot transition-colors text-pretty">
            <Link href={`/p/${turismoPost?.slug}`}>
              {t(turismoPost?.title)}
            </Link>
          </h4>
          <p className="text-[14px] text-ink2 leading-relaxed mb-4 font-sans line-clamp-2">
            {t(turismoPost?.excerpt)}
          </p>
          <Link href={`/p/${turismoPost?.slug}`} className="text-[11px] font-bold text-spot2 hover:text-ink flex items-center gap-1 uppercase tracking-wide transition-colors mb-6">
            {t({ es: "Leer más", en: "Read more" })} <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link href={`/p/${turismoPost?.slug}`} className="w-full aspect-video rounded-[4px] overflow-hidden bg-paper-2 block">
            <img 
              src={turismoPost?.image_url} 
              alt="" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          </Link>
        </div>

        {/* Col 2: Opinión */}
        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-spot2 mb-4">
            {t({ es: "OPINIÓN", en: "OPINION" })}
          </h3>
          <div className="flex flex-col gap-6">
            {opinionPosts.slice(0, 3).map((post, idx) => (
              <article key={idx} className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-paper-2">
                  {post.author_avatar ? (
                    <img src={post.author_avatar} alt={post.author} className="w-full h-full object-cover" />
                  ) : (
                    // Fallback to random faces from mockup
                    <img src={`/images/authors/author_${idx + 1}.jpg`} alt="" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-[15px] font-serif font-bold leading-tight text-ink group-hover:text-spot transition-colors mb-1">
                    <Link href={`/p/${post.slug}`}>
                      {t(post.title)}
                    </Link>
                  </h4>
                  <div className="text-[11px] text-ink2 font-sans font-medium">
                    {post.author || "Jorge Castañeda"}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Col 3: Newsletter */}
        <div className="flex flex-col">
          <div className="bg-paper-2 p-6 md:p-8 rounded-[4px] border border-hairline h-full">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-4 leading-snug">
              {t({ es: "RECIBE SAN MIGUEL DAILY EN TU CORREO", en: "GET SAN MIGUEL DAILY IN YOUR INBOX" })}
            </h3>
            <p className="text-[13px] text-ink2 leading-relaxed mb-6 font-sans">
              {t({ es: "Las historias más importantes, análisis y recomendaciones, todos los días por la mañana.", en: "The most important stories, analysis, and recommendations, every morning." })}
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t({ es: "Tu correo electrónico", en: "Your email address" }) as string} 
                className="w-full bg-paper border border-ink3 px-3 py-2 text-sm text-ink placeholder:text-ink3 focus:outline-none focus:border-ink transition-colors rounded-[2px]"
              />
              <button className="bg-[#0B648C] hover:bg-[#084D6C] text-white text-sm font-bold px-4 py-2 transition-colors rounded-[2px] shrink-0">
                {t({ es: "Suscribirme", en: "Subscribe" })}
              </button>
            </form>
            <div className="text-[10px] text-ink3 mt-4 text-center">
              {t({ es: "Nunca compartimos tu información.", en: "We never share your information." })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
