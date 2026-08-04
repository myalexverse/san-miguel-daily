"use client";

import { SiteHeader } from "@/components/brands/daily/SiteHeader";
import { MenuOverlay } from "@/components/brands/daily/MenuOverlay";
import { Paywall } from "@/components/brands/daily/Paywall";
import { Footer } from "@/components/brands/daily/Footer";
import { MobileTabBar } from "@/components/brands/daily/MobileTabBar";
import { ImagePlaceholder } from "@/components/brands/daily/ImagePlaceholder";
import { Button, Kicker, SectionHeading, Tag } from "@/components/brands/daily/ui";
import { useT } from "@/components/brands/daily/UiProvider";

const lists = [
  {
    name: { es: "El Diario", en: "The Daily" },
    note: { es: "Todos los días a las 6:30. Seis minutos de lectura.", en: "Every day at 6:30. A six-minute read." },
    tag: { es: "Gratis", en: "Free" },
    tone: "accent" as const,
    checked: true,
  },
  {
    name: { es: "Economía del Bajío", en: "Bajío Economy" },
    note: { es: "Jueves. Nearshoring, inmobiliaria y empleo, por Roberto Lira.", en: "Thursdays. Nearshoring, real estate and jobs, by Roberto Lira." },
    tag: { es: "Suscriptores", en: "Subscribers" },
    tone: "neutral" as const,
    checked: false,
  },
  {
    name: { es: "Agenda", en: "The Agenda" },
    note: { es: "Viernes. Qué hacer el fin de semana en la ciudad.", en: "Fridays. What to do in the city this weekend." },
    tag: { es: "Gratis", en: "Free" },
    tone: "accent" as const,
    checked: true,
  },
];

const bullets = [
  { label: { es: "Tren ligero.", en: "Light rail." }, text: { es: "Siete estaciones, 18 mil millones de pesos, primer viaje en 2030.", en: "Seven stations, 18 billion pesos, first trip in 2030." } },
  { label: { es: "Rentas.", en: "Rentals." }, text: { es: "Nueve votos contra cuatro; entra en vigor en enero.", en: "Nine votes to four; in force in January." } },
  { label: { es: "Agenda.", en: "Agenda." }, text: { es: "Música de cámara en el Ángela Peralta, del 8 al 17.", en: "Chamber music at the Ángela Peralta, the 8th to the 17th." } },
];

export default function NewsletterPage() {
  const t = useT();
  return (
    <>
      <SiteHeader variant="slim" />
      <main className="grid items-start gap-12 px-5 pt-10 md:grid-cols-[1fr_520px] md:gap-18 md:px-16 md:pt-20">
        <div>
          <Kicker tone="spot">{t({ es: "Boletín diario · gratis", en: "Daily briefing · free" })}</Kicker>
          <h1 className="text-[38px] font-semibold leading-none tracking-tighter text-pretty md:text-[76px]">
            {t({ es: "La ciudad, en seis minutos, cada mañana a las 6:30", en: "The city, in six minutes, every morning at 6:30" })}
          </h1>
          <p className="mt-5 max-w-dek text-[17px] leading-relaxed text-ink2 md:mt-7 md:text-[21px]">
            {t({
              es: "Escrito a mano por la redacción en Zacateros 44. Lo indispensable de San Miguel antes de tu primer café: cabildo, obra pública, economía y agenda cultural.",
              en: "Written by hand in the newsroom at Zacateros 44. The essentials from San Miguel before your first coffee: city hall, public works, the economy and the culture agenda.",
            })}
          </p>

          <form className="mt-8 flex max-w-[560px] flex-col gap-3 md:mt-11 md:flex-row md:items-end" onSubmit={(e) => e.preventDefault()}>
            <label className="flex-1">
              <span className="mb-2 block text-xs uppercase tracking-label text-ink2">{t({ es: "Correo electrónico", en: "Email address" })}</span>
              <input
                type="email"
                placeholder="tu@correo.com"
                className="h-11 w-full border border-rule bg-transparent px-3 text-base text-ink placeholder:text-ink3 focus:border-spot focus:outline-none md:h-12"
              />
            </label>
            <Button className="h-11 px-6 md:h-12">{t({ es: "Suscribirme", en: "Sign me up" })}</Button>
          </form>
          <p className="mt-3 text-[13px] text-ink3">
            {t({ es: "14,280 lectores. Un correo al día, cancela en un clic.", en: "14,280 readers. One email a day, unsubscribe in one click." })}
          </p>

          <div className="mt-12 md:mt-18">
            <SectionHeading>{t({ es: "Elige tus boletines", en: "Choose your newsletters" })}</SectionHeading>
            <div>
              {lists.map((l, i) => (
                <label key={i} className="flex cursor-pointer items-start gap-4 border-t border-hairline py-5 last:border-b">
                  <input type="checkbox" defaultChecked={l.checked} className="mt-1.5 accent-spot" />
                  <span className="flex-1">
                    <strong className="text-[17px] font-semibold md:text-[19px]">{t(l.name)}</strong>
                    <span className="mt-1.5 block text-sm text-ink2 md:text-[15px]">{t(l.note)}</span>
                  </span>
                  <Tag tone={l.tone}>{t(l.tag)}</Tag>
                </label>
              ))}
            </div>
          </div>

          <blockquote className="mt-14 border-y border-rule py-10 text-[26px] font-normal italic leading-snug md:mt-20 md:text-[34px]">
            {t({ es: "“Es lo único que leo completo antes de las siete de la mañana.”", en: "“It's the only thing I read all the way through before seven in the morning.”" })}
            <footer className="mt-5 text-sm not-italic text-ink3">
              {t({ es: "Claudia Rentería, urbanista", en: "Claudia Rentería, urban planner" })}
            </footer>
          </blockquote>
        </div>

        {/* email preview */}
        <aside>
          <div className="mb-3.5 text-[11px] uppercase tracking-label text-ink3">
            {t({ es: "Así llega a tu bandeja", en: "How it lands in your inbox" })}
          </div>
          <div className="bg-paper p-6 shadow-xl md:p-9">
            <div className="flex items-baseline justify-between border-b-2 border-ink pb-3">
              <span className="text-lg md:text-[22px]">
                San Miguel <em className="font-normal">Daily</em>
              </span>
              <span className="text-[10px] uppercase tracking-label text-ink3 md:text-[11px]">
                {t({ es: "Lun 3 ago · 6:30", en: "Mon Aug 3 · 6:30" })}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold leading-tight md:text-[26px]">
              {t({ es: "Se firmó el tren ligero. Ahora falta el agua.", en: "The light rail is signed. Now for the water." })}
            </h3>
            <p className="mt-3.5 text-sm leading-relaxed text-ink2 md:text-[15px]">
              {t({
                es: "Buenos días. Tres cosas antes de salir de casa: la concesión del tren, el reglamento de rentas que aprobó el cabildo, y el festival que abre el sábado.",
                en: "Good morning. Three things before you leave the house: the rail concession, the rental rules the council approved, and the festival opening Saturday.",
              })}
            </p>
            <ol className="mt-6 flex flex-col gap-4">
              {bullets.map((b, i) => (
                <li key={i} className="flex gap-3.5 text-sm leading-relaxed md:text-[15px]">
                  <span className="min-w-[18px] text-spot">{i + 1}</span>
                  <span>
                    <strong className="font-semibold">{t(b.label)}</strong> {t(b.text)}
                  </span>
                </li>
              ))}
            </ol>
            <ImagePlaceholder label="Foto" treatment="halftone" className="mt-6 h-[170px] w-full" />
            <p className="mt-5 text-xs leading-relaxed text-ink3">
              {t({ es: "Redacción San Miguel Daily · Zacateros 44 · Cancela tu suscripción", en: "San Miguel Daily newsroom · Zacateros 44 · Unsubscribe" })}
            </p>
          </div>
        </aside>
      </main>
      <Footer />
      <MobileTabBar />
      <MenuOverlay />
      <Paywall />
    </>
  );
}
