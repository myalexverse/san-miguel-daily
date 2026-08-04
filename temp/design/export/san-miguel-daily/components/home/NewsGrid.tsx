"use client";

import Link from "next/link";
import { useT } from "../UiProvider";
import { secondary } from "@/lib/content";

export function NewsGrid() {
  const t = useT();
  return (
    <section className="grid gap-7 px-5 pt-8 md:grid-cols-3 md:gap-12 md:px-16 md:pt-16">
      {secondary.map((s, i) => (
        <article key={i}>
          <div className="mb-2 text-[10px] uppercase tracking-kicker text-ink3 md:mb-3 md:text-[11px]">{t(s.kicker)}</div>
          <h3 className="text-xl font-semibold leading-tight tracking-tight text-pretty md:text-[27px]">
            <Link href="/articulo" className="text-ink hover:text-spot">
              {t(s.title)}
            </Link>
          </h3>
          <p className="mt-3 hidden text-base leading-relaxed text-ink2 md:block">{t(s.dek!)}</p>
        </article>
      ))}
    </section>
  );
}
