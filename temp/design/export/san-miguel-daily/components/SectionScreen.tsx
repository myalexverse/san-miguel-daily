"use client";

import Link from "next/link";
import { useT } from "./UiProvider";
import { Button, Kicker, SectionHeading } from "./ui";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { nav } from "@/lib/content";
import type { SectionData } from "@/lib/sections";

export function SectionScreen({ data }: { data: SectionData }) {
  const t = useT();
  return (
    <main>
      {/* category rail */}
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

      <header className="px-5 pt-10 md:max-w-[1120px] md:px-16 md:pt-20">
        <Kicker>{t({ es: "Sección", en: "Section" })}</Kicker>
        <h1 className="text-5xl font-semibold leading-[0.95] tracking-tighter md:text-[88px]">{t(data.title)}</h1>
        <p className="mt-4 max-w-[32em] text-base leading-relaxed text-ink2 md:mt-6 md:text-[21px]">{t(data.dek)}</p>
      </header>

      <section className="grid items-start gap-6 px-5 pt-8 md:grid-cols-[1fr_560px] md:gap-14 md:px-16 md:pt-16">
        <div>
          <Kicker tone="spot">{t(data.lead.kicker)}</Kicker>
          <h2 className="text-3xl font-semibold leading-[1.06] tracking-tight text-pretty md:text-[52px] md:leading-[1.03]">
            <Link href="/articulo" className="text-ink hover:text-spot">
              {t(data.lead.title)}
            </Link>
          </h2>
          <ImagePlaceholder label="Lead" className="mt-5 aspect-[3/2] md:hidden" />
          <p className="mt-4 max-w-measure text-base leading-relaxed text-ink2 md:mt-6 md:text-[19px]">{t(data.lead.dek)}</p>
          <div className="mt-4 text-xs text-ink3 md:mt-6 md:text-[13px]">
            {data.lead.byline} · {t(data.lead.meta)}
          </div>
        </div>
        <ImagePlaceholder label="Lead 560×380" className="hidden h-[380px] w-full md:block" />
      </section>

      <section className="flex flex-col gap-6 px-5 pt-8 md:grid md:grid-cols-3 md:gap-10 md:px-16 md:pt-20">
        {data.cards.map((c, i) => (
          <article key={i} className="flex gap-4 md:block">
            <div className="flex-1 md:order-2">
              <div className="mb-1.5 text-[10px] uppercase tracking-kicker text-ink3 md:mb-2 md:mt-4 md:text-[11px]">
                {t(c.kicker)}
              </div>
              <h3 className="text-lg font-semibold leading-tight md:text-2xl">
                <Link href="/articulo" className="text-ink hover:text-spot">
                  {t(c.title)}
                </Link>
              </h3>
              <div className="mt-2 hidden text-xs text-ink3 md:block">{c.meta}</div>
            </div>
            <ImagePlaceholder
              label=""
              treatment="halftone"
              className="h-[72px] w-24 flex-none md:order-1 md:h-[200px] md:w-full"
            />
          </article>
        ))}
      </section>

      <div className="grid gap-12 px-5 pt-12 md:grid-cols-2 md:gap-20 md:px-16 md:pt-20">
        {data.indicators && (
          <div>
            <SectionHeading>{t({ es: "Indicadores", en: "Indicators" })}</SectionHeading>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-rule text-xs uppercase tracking-label text-ink3">
                  <th className="py-2 font-normal">{t({ es: "Indicador", en: "Indicator" })}</th>
                  <th className="py-2 font-normal">{t({ es: "Hoy", en: "Today" })}</th>
                  <th className="py-2 font-normal">{t({ es: "Var. mes", en: "Monthly" })}</th>
                </tr>
              </thead>
              <tbody>
                {data.indicators.map((r, i) => (
                  <tr key={i} className="border-b border-hairline">
                    <td className="py-2.5">{t(r.label)}</td>
                    <td className="py-2.5">{r.value}</td>
                    <td className={"py-2.5 " + (r.up ? "text-spot" : "text-spot2")}>{r.delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div>
          <SectionHeading>
            {t({ es: "Más de", en: "More from" })} {t(data.title)}
          </SectionHeading>
          <div className="flex flex-col gap-5">
            {data.more.map((m, i) => (
              <Link key={i} href="/articulo" className="text-base leading-snug text-ink hover:text-spot md:text-[18px]">
                {t(m)}
              </Link>
            ))}
          </div>
          <Button variant="secondary" className="mt-8 h-11">
            {t({ es: "Cargar más notas", en: "Load more stories" })}
          </Button>
        </div>
      </div>

      <div className="mt-20 border-t border-hairline px-5 py-12 text-sm text-ink2 md:px-16">
        San Miguel Daily · {t(data.title)} · {t(data.editor)}
      </div>
    </main>
  );
}
