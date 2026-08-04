"use client";

import Link from "next/link";
import { useUi, useT } from "./UiProvider";
import { Logo } from "./Logo";
import { nav } from "@/components/brands/daily/lib/content";

export function MenuOverlay() {
  const { menu, setMenu } = useUi();
  const t = useT();
  if (!menu) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-paper animate-in">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-12 md:py-14">
        <div className="flex items-baseline justify-between">
          <Logo className="h-7 w-auto text-ink" />
          <button type="button" onClick={() => setMenu(false)} className="min-h-11 text-sm uppercase tracking-label text-ink hover:text-spot2">
            {t({ es: "Cerrar", en: "Close" })}
          </button>
        </div>

        <label className="mt-10 block">
          <span className="mb-2 block text-xs uppercase tracking-label text-ink2">
            {t({ es: "Buscar en el archivo desde 2022", en: "Search the archive back to 2022" })}
          </span>
          <input
            type="search"
            placeholder="Presa Allende, nearshoring, cabildo…"
            className="h-13 w-full border border-rule bg-transparent px-4 py-3 text-xl text-ink placeholder:text-ink3 focus:border-spot focus:outline-none"
          />
        </label>

        <div className="mt-12 grid gap-x-16 gap-y-3 md:grid-cols-2">
          {nav.map((n) => (
            <Link
              key={n.slug}
              href={"/seccion/" + n.slug}
              onClick={() => setMenu(false)}
              className="text-3xl leading-snug text-ink hover:text-spot md:text-[44px]"
            >
              {t(n.label)}
            </Link>
          ))}
          <Link href="/boletin" onClick={() => setMenu(false)} className="text-3xl leading-snug text-ink hover:text-spot md:text-[44px]">
            {t({ es: "Boletines", en: "Newsletters" })}
          </Link>
          <Link href="/dashboard" onClick={() => setMenu(false)} className="text-3xl leading-snug text-ink hover:text-spot md:text-[44px]">
            {t({ es: "Redacción", en: "Newsroom" })}
          </Link>
        </div>
      </div>
    </div>
  );
}
