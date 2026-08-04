"use client";

import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { Button, SectionHeading, Tag } from "@/components/ui";
import { LangThemeControls } from "@/components/ui";
import { useT } from "@/components/UiProvider";

const railItems = [
  { es: "Resumen", en: "Overview" },
  { es: "Notas", en: "Stories" },
  { es: "Portada", en: "Front page" },
  { es: "Boletines", en: "Newsletters" },
  { es: "Suscriptores", en: "Subscribers" },
  { es: "Fotografía", en: "Photography" },
  { es: "Ajustes", en: "Settings" },
];

const kpis = [
  { label: { es: "Lectores hoy", en: "Readers today" }, value: "48,204", delta: "+12.4%", up: true, spark: "0,26 15,22 30,24 45,16 60,18 75,11 90,13 105,6 120,4" },
  { label: { es: "Suscriptores", en: "Subscribers" }, value: "3,142", delta: "+38", up: true, spark: "0,28 15,27 30,24 45,22 60,20 75,17 90,14 105,10 120,7" },
  { label: { es: "Conversión del muro", en: "Paywall conversion" }, value: "2.8%", delta: "−0.3 pts", up: false, spark: "0,10 15,8 30,12 45,11 60,15 75,14 90,18 105,17 120,20" },
  { label: { es: "Apertura del boletín", en: "Newsletter open rate" }, value: "61%", delta: "+2 pts", up: true, spark: "0,20 15,18 30,19 45,15 60,16 75,12 90,13 105,11 120,9" },
];

const hours = [24, 16, 10, 12, 28, 60, 92, 104, 96, 84, 76, 68, 80, 72, 64, 70, 76, 86, 90, 78, 62, 48, 34, 20];

const stories = [
  { title: { es: "El tren ligero a Querétaro…", en: "The light rail to Querétaro…" }, author: "M. Escobedo", status: { es: "Publicada", en: "Live" }, tone: "accent" as const, readers: "18,402" },
  { title: { es: "Cabildo aprueba el reglamento…", en: "Council approves the rules…" }, author: "P. Solís", status: { es: "Publicada", en: "Live" }, tone: "accent" as const, readers: "9,118" },
  { title: { es: "Cinco fondos abren oficina…", en: "Five funds open offices…" }, author: "R. Lira", status: { es: "En edición", en: "Editing" }, tone: "outline" as const, readers: "—" },
  { title: { es: "Guía: doce restaurantes nuevos", en: "Guide: twelve new restaurants" }, author: "J. Wren", status: { es: "Programada 18:00", en: "Scheduled 18:00" }, tone: "neutral" as const, readers: "—" },
  { title: { es: "Recorrido: la Parroquia", en: "Walkthrough: the Parroquia" }, author: "E. Zúñiga", status: { es: "Revisión legal", en: "Legal review" }, tone: "accent2" as const, readers: "—" },
];

const queue = [
  { es: "Tren ligero — hero", en: "Light rail — hero" },
  { es: "Reglamento de rentas — última hora", en: "Rental rules — breaking" },
  { es: "Ocupación hotelera — columna 2", en: "Hotel occupancy — column 2" },
  { es: "Galería del amanecer — a sangre", en: "Dawn gallery — full bleed" },
];

export default function DashboardPage() {
  const t = useT();
  return (
    <div className="md:grid md:min-h-screen md:grid-cols-[248px_1fr]">
      {/* rail */}
      <aside className="hidden flex-col gap-9 border-r border-hairline p-6 md:flex">
        <Link href="/" className="flex items-center gap-3 text-ink">
          <LogoMark className="h-9 w-9" />
          <span className="text-[11px] uppercase tracking-label text-ink3">{t({ es: "Redacción", en: "Newsroom" })}</span>
        </Link>
        <nav className="flex flex-col gap-1 text-[15px]">
          {railItems.map((r, i) => (
            <Link
              key={i}
              href="/dashboard"
              className={
                "rounded px-2.5 py-2 " + (i === 0 ? "bg-spot/10 text-ink" : "text-ink2 hover:text-spot")
              }
            >
              {t(r)}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-3 text-[13px]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink2">ME</span>
          <span>
            Mariana Escobedo
            <span className="block text-xs text-ink3">{t({ es: "Editora en jefe", en: "Editor in chief" })}</span>
          </span>
        </div>
      </aside>

      <div>
        <header className="flex items-center gap-4 border-b border-hairline px-5 py-3 md:px-10 md:py-4">
          <Link href="/" className="text-[13px] text-ink3 hover:text-spot">
            {t({ es: "Redacción", en: "Newsroom" })}
          </Link>
          <span className="text-[13px] text-ink">/ {t({ es: "Resumen", en: "Overview" })}</span>
          <div className="ml-auto flex items-center gap-3">
            <LangThemeControls />
            <input
              type="search"
              placeholder={t({ es: "Buscar notas, autores…", en: "Search stories, authors…" })}
              className="hidden h-9 w-[240px] border border-rule bg-transparent px-3 text-sm text-ink placeholder:text-ink3 focus:border-spot focus:outline-none lg:block"
            />
            <Button className="px-3 py-2 text-[13px]">{t({ es: "Nueva nota", en: "New story" })}</Button>
          </div>
        </header>

        <main className="px-5 pb-16 pt-8 md:px-10 md:pt-10">
          <h1 className="text-3xl font-semibold tracking-tight md:text-[40px]">
            {t({ es: "Lunes 3 de agosto", en: "Monday, August 3" })}
          </h1>

          <div className="mt-8 grid grid-cols-2 gap-7 md:mt-11 md:grid-cols-4 md:gap-10">
            {kpis.map((k, i) => (
              <div key={i}>
                <div className="text-[11px] uppercase tracking-label text-ink3 md:text-xs">{t(k.label)}</div>
                <div className="mt-1.5 text-[32px] leading-tight md:text-[44px]">{k.value}</div>
                <div className={"text-xs md:text-[13px] " + (k.up ? "text-spot" : "text-spot2")}>{k.delta}</div>
                <svg viewBox="0 0 120 32" preserveAspectRatio="none" className="mt-3 hidden h-8 w-full md:block">
                  <polyline points={k.spark} fill="none" stroke={k.up ? "var(--spot)" : "var(--spot-2)"} strokeWidth="1.5" />
                </svg>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-[1fr_320px] md:gap-14">
            <div>
              <SectionHeading action={<span className="text-xs text-ink3">00:00 – 23:00</span>}>
                {t({ es: "Lectores por hora", en: "Readers by hour" })}
              </SectionHeading>
              <svg viewBox="0 0 480 120" preserveAspectRatio="none" className="h-[120px] w-full md:h-[150px]">
                {hours.map((h, i) => (
                  <rect key={i} x={i * 20} y={120 - h} width="14" height={h} fill="var(--spot)" />
                ))}
              </svg>

              <div className="mt-12">
                <SectionHeading action={<Link href="/dashboard" className="text-[13px] text-spot">{t({ es: "Ver todas", en: "See all" })}</Link>}>
                  {t({ es: "Notas de hoy", en: "Today's stories" })}
                </SectionHeading>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-rule text-xs uppercase tracking-label text-ink3">
                      <th className="py-2 font-normal">{t({ es: "Título", en: "Title" })}</th>
                      <th className="hidden py-2 font-normal md:table-cell">{t({ es: "Autor", en: "Author" })}</th>
                      <th className="py-2 font-normal">{t({ es: "Estado", en: "Status" })}</th>
                      <th className="py-2 font-normal">{t({ es: "Lectores", en: "Readers" })}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stories.map((s, i) => (
                      <tr key={i} className="border-b border-hairline">
                        <td className="py-3 pr-3">{t(s.title)}</td>
                        <td className="hidden py-3 pr-3 md:table-cell">{s.author}</td>
                        <td className="py-3 pr-3">
                          <Tag tone={s.tone}>{t(s.status)}</Tag>
                        </td>
                        <td className="py-3">{s.readers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside className="flex flex-col gap-10">
              <div>
                <SectionHeading>{t({ es: "Cola de portada", en: "Front page queue" })}</SectionHeading>
                <div className="flex flex-col gap-4 text-[15px] leading-snug">
                  {queue.map((q, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-spot">{i + 1}</span>
                      <span>{t(q)}</span>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" block className="mt-5 h-11 text-[13px]">
                  {t({ es: "Reordenar portada", en: "Reorder front page" })}
                </Button>
              </div>
              <div className="border-t border-hairline pt-7">
                <SectionHeading>{t({ es: "Boletín de mañana", en: "Tomorrow's briefing" })}</SectionHeading>
                <p className="text-[15px] leading-relaxed text-ink2">
                  {t({ es: "Cierre a las 22:00. Faltan tres bloques por redactar.", en: "Copy closes at 22:00. Three blocks left to write." })}
                </p>
                <div className="mt-3.5 h-1 bg-rule">
                  <div className="h-1 w-[62%] bg-spot" />
                </div>
                <div className="mt-2 text-xs text-ink3">62% {t({ es: "listo", en: "ready" })}</div>
                <Button block className="mt-5 h-11 text-[13px]">
                  {t({ es: "Abrir el editor", en: "Open the editor" })}
                </Button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
