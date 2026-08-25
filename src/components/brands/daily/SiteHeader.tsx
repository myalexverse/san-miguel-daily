"use client";

import Link from "next/link";
import { useUi, useT } from "./UiProvider";
import { Logo } from "./Logo";
import { Button, LangThemeControls } from "./ui";
import { nav } from "@/components/brands/daily/lib/content";

/** Utility rail + masthead + section nav. Compact on mobile, full broadsheet head from md up. */
export function SiteHeader({ variant = "full" }: { variant?: "full" | "slim" }) {
  const { setMenu, setPaywall } = useUi();
  const t = useT();

  if (variant === "slim") {
    return (
      <header className="sticky top-0 z-30 border-b border-hairline bg-paper">
        <div className="flex items-center justify-between gap-4 px-5 py-3 md:px-16 max-w-7xl mx-auto">
          <Link href="/" className="text-ink">
            <Logo className="h-5 w-auto md:h-6" />
          </Link>
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-nav md:flex">
            {nav.map((n) => (
              <Link key={n.slug} href={"/seccion/" + n.slug} className="text-ink hover:text-spot">
                {t(n.label)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <LangThemeControls />
            <Button onClick={() => setPaywall(true)} className="px-3 py-1.5 text-xs">
              {t({ es: "Suscríbete", en: "Subscribe" })}
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header>
      {/* utility rail — desktop only */}
      <div className="hidden border-b border-hairline md:block">
        <div className="flex items-center justify-between px-5 md:px-16 py-3 text-xs text-ink2 max-w-7xl mx-auto">
          <div suppressHydrationWarning className="capitalize">
            {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · San Miguel de Allende, Gto. · 24°C
          </div>
          <div className="flex items-center gap-6">
            <LangThemeControls />
            <Link href="/buscar" className="text-ink2 hover:text-spot">
              {t({ es: "Buscar", en: "Search" })}
            </Link>
            <Button onClick={() => setPaywall(true)} className="px-3 py-1.5 text-xs">
              {t({ es: "Suscríbete", en: "Subscribe" })}
            </Button>
          </div>
        </div>
      </div>

      {/* mobile bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-hairline bg-paper px-4 py-2 md:hidden">
        <button
          type="button"
          aria-label={t({ es: "Abrir menú", en: "Open menu" })}
          onClick={() => setMenu(true)}
          className="flex h-11 w-11 flex-col justify-center gap-1.5 px-2"
        >
          <span className="block h-px bg-ink" />
          <span className="block h-px bg-ink" />
        </button>
        <Link href="/" className="text-ink">
          <Logo className="h-5 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => setPaywall(true)}
          className="h-11 min-w-11 text-xs text-spot"
        >
          {t({ es: "Suscribirse", en: "Subscribe" })}
        </button>
      </div>

      {/* masthead — desktop */}
      <div className="hidden px-5 md:px-16 pt-11 md:block max-w-7xl mx-auto">
        <div className="h-[3px] bg-ink" />
        <div className="flex items-end justify-between py-5">
          <Link href="/" className="text-ink">
            <Logo className="h-16 w-auto lg:h-[76px]" />
          </Link>
          <p className="max-w-[220px] text-right text-xs leading-relaxed text-ink2">
            {(() => {
              const launch = new Date("2023-08-04");
              const today = new Date();
              const year = today.getFullYear() - launch.getFullYear() + 1;
              const daysSinceLaunch = Math.floor((today.getTime() - launch.getTime()) / 86400000) + 1;
              const edNum = daysSinceLaunch.toLocaleString("es-MX");
              return t({
                es: `Periodismo local, estándar internacional. Año ${year}, núm. ${edNum}`,
                en: `Local journalism, international standard. Year ${year}, no. ${edNum}`,
              });
            })()}
          </p>
        </div>
        <div className="h-px bg-ink" />
        <nav className="flex gap-8 pt-3 text-sm uppercase tracking-nav">
          {nav.map((n) => (
            <Link key={n.slug} href={"/seccion/" + n.slug} className="text-ink hover:text-spot">
              {t(n.label)}
            </Link>
          ))}
          <button type="button" onClick={() => setMenu(true)} className="ml-auto uppercase tracking-nav text-ink hover:text-spot">
            {t({ es: "Todas las secciones", en: "All sections" })}
          </button>
        </nav>
      </div>

      {/* section chips — mobile */}
      <nav className="flex gap-5 overflow-x-auto whitespace-nowrap border-b border-hairline px-5 py-3 text-xs uppercase tracking-nav md:hidden">
        <Link href="/" className="border-b-2 border-spot pb-1 text-spot">
          {t({ es: "Portada", en: "Front" })}
        </Link>
        {nav.map((n) => (
          <Link key={n.slug} href={"/seccion/" + n.slug} className="border-b-2 border-transparent pb-1 text-ink">
            {t(n.label)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
