"use client";

import Link from "next/link";
import { useT } from "./UiProvider";
import { Logo } from "./Logo";
import { nav } from "@/components/brands/daily/lib/content";

export function Footer() {
  const t = useT();
  const cols = [
    {
      title: { es: "El periódico", en: "The paper" },
      links: [
        { es: "Quiénes somos", en: "About us", href: "/info/quienes-somos" },
        { es: "Código editorial", en: "Editorial code", href: "/info/codigo-editorial" },
        { es: "Contacto", en: "Contact", href: "/info/contacto" },
        { es: "Publicidad", en: "Advertising", href: "/info/publicidad" },
      ],
    },
    {
      title: { es: "Suscripción", en: "Subscription" },
      links: [
        { es: "Planes", en: "Plans" },
        { es: "Edición impresa", en: "Print edition" },
        { es: "Regalar", en: "Gift" },
      ],
    },
  ];
  return (
    <footer className="mt-16 grid gap-10 px-5 pb-16 pt-14 text-sm text-ink2 md:grid-cols-4 md:px-16">
      <div>
        <Logo className="h-6 w-auto text-ink" />
        <p className="mt-4 leading-relaxed">
          {t({
            es: "Fundado en 2022. Redacción en Zacateros 44, San Miguel de Allende, Guanajuato.",
            en: "Founded 2022. Newsroom at Zacateros 44, San Miguel de Allende, Guanajuato.",
          })}
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <strong className="font-semibold text-ink">{t({ es: "Secciones", en: "Sections" })}</strong>
        {nav.map((n) => (
          <Link key={n.slug} href={"/seccion/" + n.slug} className="text-ink2 hover:text-spot">
            {t(n.label)}
          </Link>
        ))}
      </div>
      {cols.map((c, i) => (
        <div key={i} className="flex flex-col gap-2.5">
          <strong className="font-semibold text-ink">{t(c.title)}</strong>
          {c.links.map((l, j) => (
            <Link key={j} href={(l as any).href || "#"} className="text-ink2 hover:text-spot">
              {t(l as any)}
            </Link>
          ))}
        </div>
      ))}
    </footer>
  );
}
