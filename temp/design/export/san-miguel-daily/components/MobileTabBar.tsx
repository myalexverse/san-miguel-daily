"use client";

import Link from "next/link";
import { useUi, useT } from "./UiProvider";

/** Bottom tab bar, mobile only. Every target is at least 44px tall. */
export function MobileTabBar() {
  const { setMenu } = useUi();
  const t = useT();
  const item = "flex h-11 min-w-11 items-center justify-center text-[11px] uppercase tracking-nav";
  return (
    <nav className="sticky bottom-0 z-30 flex items-center justify-around border-t border-hairline bg-paper px-2 py-2 md:hidden">
      <Link href="/" className={item + " text-spot"}>{t({ es: "Portada", en: "Front" })}</Link>
      <button type="button" onClick={() => setMenu(true)} className={item + " text-ink3"}>
        {t({ es: "Secciones", en: "Sections" })}
      </button>
      <Link href="/buscar" className={item + " text-ink3"}>{t({ es: "Buscar", en: "Search" })}</Link>
      <Link href="/boletin" className={item + " text-ink3"}>{t({ es: "Boletín", en: "Briefing" })}</Link>
    </nav>
  );
}
