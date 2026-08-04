"use client";

import Link from "next/link";
import { useT } from "../UiProvider";
import { SectionHeading } from "../ui";
import { opinion } from "@/lib/content";

export function OpinionRow() {
  const t = useT();
  return (
    <section className="px-5 pt-12 md:px-16 md:pt-24">
      <SectionHeading action={<Link href="#" className="text-xs text-spot">{t({ es: "Todos los columnistas", en: "All columnists" })}</Link>}>
        {t({ es: "Opinión", en: "Opinion" })}
      </SectionHeading>
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {opinion.map((o) => (
          <article key={o.author}>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-rule text-base text-ink2">
                {o.initials}
              </span>
              <span className="text-[13px]">{o.author}</span>
            </div>
            <h3 className="text-2xl font-normal italic leading-snug">
              <Link href="/articulo" className="text-ink hover:text-spot">
                {t(o.title)}
              </Link>
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
