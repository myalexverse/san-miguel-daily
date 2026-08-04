"use client";

import Link from "next/link";
import { useT } from "../UiProvider";
import { Kicker } from "../ui";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { heroStory } from "@/components/brands/daily/lib/content";

export function HeroSection({ post }: { post?: any }) {
  const t = useT();
  return (
    <section className="grid items-start gap-6 px-5 pt-6 md:grid-cols-[1fr_620px] md:gap-14 md:px-16 md:pt-12">
      <div>
        <Kicker tone="spot">{post ? "ÚLTIMA HORA" : t(heroStory.kicker)}</Kicker>
        <h2 className="text-[34px] font-semibold leading-[1.04] tracking-tight text-pretty md:text-[62px] md:leading-[1.02]">
          <Link href={post ? `/p/${post.slug}` : "/articulo"} className="text-ink hover:text-spot">
            {post ? t(post.title) : t(heroStory.title)}
          </Link>
        </h2>
        {post && post.image_url ? (
          <img src={post.image_url} alt="Hero" className="mt-5 aspect-[3/2] md:hidden object-cover w-full rounded" />
        ) : (
          <ImagePlaceholder label="Hero" className="mt-5 aspect-[3/2] md:hidden" />
        )}
        <p className="mt-4 max-w-measure text-base leading-relaxed text-ink2 text-pretty md:mt-6 md:text-xl">
          {post ? t(post.excerpt) : t(heroStory.dek!)}
        </p>
        <div className="mt-4 text-xs text-ink3 md:mt-6 md:text-[13px]">
          {t({ es: "Por", en: "By" })} <span className="text-ink">{post ? "Equipo Editorial" : heroStory.byline}</span> · <span suppressHydrationWarning>{post ? new Date(post.created_at).toLocaleDateString('es-MX') : t(heroStory.meta!)}</span>
        </div>
      </div>
      <figure className="hidden md:block">
        {post && post.image_url ? (
          <img src={post.image_url} alt="Hero" className="h-[420px] w-full object-cover rounded" />
        ) : (
          <ImagePlaceholder label="Hero 620×420" className="h-[420px] w-full" />
        )}
        <figcaption className="mt-3 max-w-[44em] text-xs leading-relaxed text-ink3">
          {t({
            es: "El trazo propuesto corre paralelo a la carretera federal 111. Fotografía de archivo.",
            en: "The proposed route runs parallel to federal highway 111. File photograph.",
          })}
        </figcaption>
      </figure>
    </section>
  );
}
