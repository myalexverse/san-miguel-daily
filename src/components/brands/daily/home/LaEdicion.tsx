"use client";

import Link from "next/link";
import { useT } from "../UiProvider";

export function LaEdicion({ posts }: { posts: any[] }) {
  const t = useT();

  // We need exactly 5 posts for this strip
  const stripPosts = posts.slice(0, 5);

  return (
    <section className="px-5 md:px-16 md:max-w-7xl md:mx-auto pt-10 pb-16">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-wide text-ink mb-2">
            {t({ es: "La Edición de Hoy", en: "Today's Edition" })}
          </h2>
          <p className="text-sm md:text-base text-ink2 font-sans">
            {t({ es: "Cinco historias para entender lo más importante del día.", en: "Five stories to understand the most important events of the day." })}
          </p>
        </div>
        <Link href="/latest" className="text-xs font-bold text-spot2 hover:text-ink flex items-center gap-1 transition-colors shrink-0 mb-1">
          {t({ es: "Ver todas las noticias", en: "View all news" })} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-b border-hairline divide-y md:divide-y-0 md:divide-x divide-hairline">
        {stripPosts.map((post, idx) => (
          <article key={idx} className="group cursor-pointer flex flex-col pt-6 pb-8 md:px-6 first:md:pl-0 last:md:pr-0">
            <div className="text-[50px] leading-none font-serif text-spot2/30 -tracking-wider mb-4 transition-colors group-hover:text-spot2/50">
              0{idx + 1}
            </div>
            <div className="text-[10px] uppercase font-bold text-ink3 tracking-widest mb-3">
              {post.category || "General"}
            </div>
            <h3 className="text-[17px] font-serif font-bold leading-snug text-ink group-hover:text-spot transition-colors mb-4 text-pretty">
              <Link href={`/p/${post.slug}`}>
                {t(post.title)}
              </Link>
            </h3>
            <div className="mt-auto text-[11px] font-bold text-ink2 font-sans pt-2">
              {post.time || `10:${45 - idx * 10}`}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
