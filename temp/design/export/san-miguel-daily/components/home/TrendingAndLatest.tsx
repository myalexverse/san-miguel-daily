"use client";

import Link from "next/link";
import { useT } from "../UiProvider";
import { SectionHeading } from "../ui";
import { trending, latest } from "@/lib/content";

export function TrendingAndLatest() {
  const t = useT();
  return (
    <section className="grid gap-12 px-5 pt-12 md:grid-cols-2 md:gap-20 md:px-16 md:pt-24">
      <div>
        <SectionHeading action={<span className="text-xs text-ink3">{t({ es: "Últimas 24 horas", en: "Last 24 hours" })}</span>}>
          {t({ es: "Lo más leído", en: "Most read" })}
        </SectionHeading>
        <ol className="flex flex-col gap-5">
          {trending.map((s, i) => (
            <li key={i} className="flex items-baseline gap-4 md:gap-5">
              <span className="min-w-[26px] text-2xl leading-none text-spot md:min-w-[44px] md:text-[34px]">{i + 1}</span>
              <Link href="/articulo" className="text-base leading-snug text-ink hover:text-spot md:text-lg">
                {t(s)}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <SectionHeading action={<Link href="/buscar" className="text-xs text-spot">{t({ es: "Ver todo", en: "See all" })}</Link>}>
          {t({ es: "Últimas noticias", en: "Latest" })}
        </SectionHeading>
        <div className="flex flex-col gap-5">
          {latest.map((l, i) => (
            <div key={i} className="flex gap-5">
              <span className="min-w-[52px] pt-0.5 text-[13px] text-spot">{l.time}</span>
              <Link href="/articulo" className="text-base leading-snug text-ink hover:text-spot md:text-[17px]">
                {t(l.title)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
