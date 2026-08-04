"use client";

import Link from "next/link";
import { useT } from "../UiProvider";
import { secondary } from "@/components/brands/daily/lib/content";

export function NewsGrid({ posts }: { posts?: any[] }) {
  const t = useT();
  return (
    <section className="grid gap-7 px-5 pt-8 md:grid-cols-3 md:gap-12 md:px-16 md:pt-16">
      {posts && posts.length > 0 ? (
        posts.map((post, i) => (
          <article key={post.id || i}>
            <div className="mb-2 text-[10px] uppercase tracking-kicker text-ink3 md:mb-3 md:text-[11px]">{post.category || 'Local'}</div>
            {post.image_url && (
              <img src={post.image_url} alt={post.title} className="mb-4 aspect-video w-full object-cover rounded" />
            )}
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-pretty md:text-[27px]">
              <Link href={`/p/${post.slug}`} className="text-ink hover:text-spot">
                {t(post.title)}
              </Link>
            </h3>
            <p className="mt-3 hidden text-base leading-relaxed text-ink2 md:block">{t(post.excerpt)}</p>
          </article>
        ))
      ) : (
        secondary.map((s, i) => (
          <article key={i}>
            <div className="mb-2 text-[10px] uppercase tracking-kicker text-ink3 md:mb-3 md:text-[11px]">{t(s.kicker)}</div>
            <h3 className="text-xl font-semibold leading-tight tracking-tight text-pretty md:text-[27px]">
              <Link href="/articulo" className="text-ink hover:text-spot">
                {t(s.title)}
              </Link>
            </h3>
            <p className="mt-3 hidden text-base leading-relaxed text-ink2 md:block">{t(s.dek!)}</p>
          </article>
        ))
      )}
    </section>
  );
}
