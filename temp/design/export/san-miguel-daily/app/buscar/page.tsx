"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { MenuOverlay } from "@/components/MenuOverlay";
import { Paywall } from "@/components/Paywall";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { Button, SectionHeading, Tag } from "@/components/ui";
import { useUi, useT } from "@/components/UiProvider";

const filters = [
  { es: "Todo", en: "All" },
  { es: "Notas", en: "News" },
  { es: "Opinión", en: "Opinion" },
  { es: "Video", en: "Video" },
  { es: "Galerías", en: "Galleries" },
];

const results = [
  {
    meta: { es: "San Miguel · 28 jul 2026", en: "San Miguel · Jul 28, 2026" },
    title: { es: "El agua de San Miguel: cinco gráficas sobre la presa Allende", en: "San Miguel's water: five charts on the Allende reservoir" },
    snippet: { es: "El almacenamiento de la presa Allende cerró julio en 38% de su capacidad, ocho puntos por debajo del promedio de la última década.", en: "Storage at the Allende reservoir ended July at 38% of capacity, eight points below the ten-year average." },
    italic: false,
  },
  {
    meta: { es: "Opinión · 14 jul 2026", en: "Opinion · Jul 14, 2026" },
    title: { es: "Lo que los extranjeros no entendemos del agua", en: "What we foreigners fail to understand about water" },
    snippet: { es: "Julia Wren · Vivir junto a la presa Allende no es lo mismo que tener agua en la llave.", en: "Julia Wren · Living next to the Allende reservoir is not the same as having water in the tap." },
    italic: true,
  },
  {
    meta: { es: "Video · 2 jun 2026", en: "Video · Jun 2, 2026" },
    title: { es: "Recorrido en lancha por la presa Allende seca", en: "A boat tour of the drained Allende reservoir" },
    snippet: { es: "5:41 · Producción de Emilio Zúñiga", en: "5:41 · Produced by Emilio Zúñiga" },
    italic: false,
  },
  {
    meta: { es: "Economía · 19 may 2026", en: "Economy · May 19, 2026" },
    title: { es: "Qué significa la nueva tarifa de agua para restaurantes", en: "What the new water tariff means for restaurants" },
    snippet: { es: "El SAPASMA ajustó el cobro por metro cúbico para uso comercial por primera vez en seis años.", en: "The city water utility adjusted its commercial rate per cubic meter for the first time in six years." },
    italic: false,
  },
];

const facets = [
  { title: { es: "Sección", en: "Section" }, items: ["San Miguel 62", "Economía 31", "Opinión 24", "Política 18", "Video 7"] },
  { title: { es: "Fecha", en: "Date" }, items: ["Últimos 7 días", "Últimos 30 días", "2026", "2022 – 2025"] },
];

export default function SearchPage() {
  const { setPaywall } = useUi();
  const t = useT();
  return (
    <>
      <SiteHeader variant="slim" />
      <main>
        <div className="px-5 pt-10 md:max-w-[1120px] md:px-16 md:pt-18">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-label text-ink2">{t({ es: "Buscar", en: "Search" })}</span>
            <input
              type="search"
              defaultValue="presa Allende"
              className="h-12 w-full border border-rule bg-transparent px-4 text-2xl tracking-tight text-ink focus:border-spot focus:outline-none md:h-16 md:text-[32px]"
            />
          </label>
          <div className="mt-5 flex flex-wrap items-center gap-3 md:gap-7">
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((fl, i) => (
                <Tag key={i} tone={i === 0 ? "accent" : "outline"}>{t(fl)}</Tag>
              ))}
            </div>
            <div className="ml-auto text-sm text-ink2">
              <strong className="font-semibold text-ink">142</strong> {t({ es: "resultados", en: "results" })}
            </div>
            <div className="hidden text-sm text-ink2 md:block">
              {t({ es: "Ordenar por:", en: "Sort by:" })} <span className="text-spot">{t({ es: "más recientes", en: "newest" })}</span>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-12 px-5 pb-16 pt-8 md:grid-cols-[1fr_300px] md:gap-20 md:px-16 md:pt-14">
          <div className="flex flex-col gap-8 md:gap-10">
            {results.map((r, i) => (
              <article key={i}>
                <div className="mb-2 text-[11px] uppercase tracking-label text-ink3 md:text-xs">{t(r.meta)}</div>
                <h3 className={"text-[22px] leading-tight md:text-[30px] " + (r.italic ? "font-normal italic" : "font-semibold tracking-tight")}>
                  <Link href="/articulo" className="text-ink hover:text-spot">
                    {t(r.title)}
                  </Link>
                </h3>
                <p className="mt-2 max-w-[44em] text-[15px] leading-relaxed text-ink2 md:mt-3 md:text-[17px]">{t(r.snippet)}</p>
              </article>
            ))}
            <Button variant="secondary" className="h-11 self-start">
              {t({ es: "Ver 138 resultados más", en: "See 138 more results" })}
            </Button>
          </div>

          <aside className="flex flex-col gap-9">
            {facets.map((fa, i) => (
              <div key={i}>
                <SectionHeading>{t(fa.title)}</SectionHeading>
                <div className="flex flex-col gap-2.5 text-[15px]">
                  {fa.items.map((it) => (
                    <Link key={it} href="/buscar" className="text-spot hover:text-spot2">
                      {it}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-t border-hairline pt-6">
              <SectionHeading>{t({ es: "Alerta de búsqueda", en: "Search alert" })}</SectionHeading>
              <p className="mb-3.5 text-sm leading-relaxed text-ink2">
                {t({ es: "Recibe un correo cuando publiquemos algo sobre “presa Allende”.", en: "Get an email whenever we publish on “Allende reservoir”." })}
              </p>
              <Button block onClick={() => setPaywall(true)} className="h-11">
                {t({ es: "Crear alerta", en: "Create alert" })}
              </Button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <MobileTabBar />
      <MenuOverlay />
      <Paywall />
    </>
  );
}
