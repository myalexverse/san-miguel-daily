"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { MenuOverlay } from "@/components/MenuOverlay";
import { Paywall } from "@/components/Paywall";
import { Footer } from "@/components/Footer";
import { MobileTabBar } from "@/components/MobileTabBar";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Button, Kicker, SectionHeading } from "@/components/ui";
import { useUi, useT } from "@/components/UiProvider";
import { article } from "@/lib/content";

export default function ArticlePage() {
  const { unlocked, setPaywall, unlock } = useUi();
  const t = useT();

  return (
    <>
      <SiteHeader variant="slim" />
      {/* reading progress */}
      <div className="h-0.5 w-[38%] bg-spot" />

      <main>
        <header className="px-5 pt-10 md:max-w-[1040px] md:px-16 md:pt-18">
          <Kicker tone="spot">{t(article.kicker)}</Kicker>
          <h1 className="text-[33px] font-semibold leading-[1.04] tracking-tight text-pretty md:text-[68px] md:leading-none">
            {t(article.title)}
          </h1>
          <p className="mt-4 max-w-dek text-[17px] leading-relaxed text-ink2 text-pretty md:mt-7 md:text-[23px]">
            {t(article.dek)}
          </p>
          <div className="my-6 flex items-center gap-4 border-y border-hairline py-4 md:my-10 md:py-5">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-rule text-[13px] text-ink2 md:h-12 md:w-12 md:text-[17px]">
              {article.initials}
            </span>
            <div className="text-xs leading-relaxed md:text-sm">
              <div>
                {t({ es: "Por", en: "By" })} <strong className="font-semibold">{article.author}</strong>
              </div>
              <div className="text-ink3">{t(article.date)}</div>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="secondary" className="px-3 py-2 text-xs">{t({ es: "Compartir", en: "Share" })}</Button>
              <Button variant="ghost" className="hidden px-3 py-2 text-xs md:inline-flex">{t({ es: "Guardar", en: "Save" })}</Button>
              <Button variant="ghost" className="hidden px-3 py-2 text-xs md:inline-flex">{t({ es: "Escuchar", en: "Listen" })}</Button>
            </div>
          </div>
        </header>

        <figure className="md:px-16">
          <ImagePlaceholder label="Hero" className="h-[260px] w-full md:h-[600px]" />
          <figcaption className="px-5 pt-3 text-xs leading-relaxed text-ink3 md:max-w-[44em] md:px-0">
            {t(article.caption)}
          </figcaption>
        </figure>

        <div className="grid items-start gap-12 px-5 pt-10 md:grid-cols-[1fr_660px_1fr] md:px-16 md:pt-18">
          <aside className="hidden md:sticky md:top-24 md:block">
            <div className="text-[11px] uppercase tracking-label text-ink3">{t({ es: "Compartir", en: "Share" })}</div>
            <div className="my-3.5 h-14 w-px bg-rule" />
          </aside>

          <div className="text-[18px] leading-[1.7] md:text-xl md:leading-[1.72]">
            {article.free.map((p, i) => (
              <p key={i} className="mb-6 md:mb-7">
                {t(p)}
              </p>
            ))}

            <blockquote className="my-9 border-l-2 border-spot2 pl-5 text-2xl font-normal italic leading-snug md:my-11 md:pl-7 md:text-[32px]">
              {t(article.quote.text)}
              <footer className="mt-4 text-sm not-italic text-ink3">{t(article.quote.source)}</footer>
            </blockquote>

            {unlocked ? (
              article.paid.map((p, i) => (
                <p key={i} className="mb-6 md:mb-7">
                  {t(p)}
                </p>
              ))
            ) : (
              <>
                <div className="relative">
                  <p className="opacity-30">{t(article.paid[0])}</p>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-paper" />
                </div>
                <div className="mt-2 border-t border-ink pt-8">
                  <Kicker tone="spot2">{t({ es: "Continúa para suscriptores", en: "Continues for subscribers" })}</Kicker>
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight md:text-[34px]">
                    {t({
                      es: "Lee este reportaje completo y todo San Miguel Daily por 89 pesos al mes",
                      en: "Read this feature in full, and all of San Miguel Daily, for 89 pesos a month",
                    })}
                  </h3>
                  <p className="mb-6 mt-4 max-w-[32em] text-base leading-relaxed text-ink2 md:text-[17px]">
                    {t({
                      es: "Sin anuncios, con el boletín diario y acceso al archivo desde 2022. Cancela cuando quieras.",
                      en: "No ads, the daily briefing included, and archive access back to 2022. Cancel anytime.",
                    })}
                  </p>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <Button onClick={() => setPaywall(true)} className="h-11">
                      {t({ es: "Ver los planes", en: "See the plans" })}
                    </Button>
                    <Button variant="ghost" onClick={unlock} className="h-11">
                      {t({ es: "Ya soy suscriptor", en: "I'm already a subscriber" })}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          <aside className="md:sticky md:top-24">
            <SectionHeading>{t({ es: "Relacionadas", en: "Related" })}</SectionHeading>
            <div className="flex flex-col gap-5">
              {article.related.map((r, i) => (
                <Link key={i} href="/articulo" className="text-base leading-snug text-ink hover:text-spot md:text-[17px]">
                  {t(r)}
                </Link>
              ))}
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
