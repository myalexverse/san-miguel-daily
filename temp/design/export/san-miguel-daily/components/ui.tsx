"use client";

import { useUi, useT } from "./UiProvider";

export function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  block = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  block?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-spot";
  const variants = {
    primary: "bg-spot text-paper hover:opacity-90 active:opacity-80",
    secondary: "border border-rule text-ink hover:border-spot hover:text-spot",
    ghost: "text-ink2 hover:text-spot",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={base + " " + variants[variant] + (block ? " w-full" : "") + " " + className}
    >
      {children}
    </button>
  );
}

export function Tag({
  children,
  tone = "accent",
}: {
  children: React.ReactNode;
  tone?: "accent" | "accent2" | "neutral" | "outline";
}) {
  const tones = {
    accent: "text-spot border-spot/40 bg-spot/10",
    accent2: "text-spot2 border-spot2/40 bg-spot2/10",
    neutral: "text-ink2 border-rule bg-paper2",
    outline: "text-ink2 border-rule",
  };
  return (
    <span
      className={
        "inline-block whitespace-nowrap border px-2 py-0.5 text-[11px] uppercase tracking-label " +
        tones[tone]
      }
    >
      {children}
    </span>
  );
}

export function Kicker({ children, tone = "ink3" }: { children: React.ReactNode; tone?: "ink3" | "spot" | "spot2" }) {
  const tones = { ink3: "text-ink3", spot: "text-spot", spot2: "text-spot2" };
  return <div className={"mb-3 text-[11px] uppercase tracking-kicker " + tones[tone]}>{children}</div>;
}

export function SectionHeading({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-baseline justify-between">
      <h4 className="text-sm font-semibold uppercase tracking-label">{children}</h4>
      {action}
    </div>
  );
}

export function LangThemeControls() {
  const { lang, setLang, dark, setDark } = useUi();
  const t = useT();
  return (
    <div className="flex items-center gap-4 text-xs">
      <button
        type="button"
        onClick={() => setLang(lang === "es" ? "en" : "es")}
        className="uppercase tracking-label text-ink2 hover:text-spot"
      >
        {lang === "es" ? "EN" : "ES"}
      </button>
      <button
        type="button"
        onClick={() => setDark(!dark)}
        className="uppercase tracking-label text-ink2 hover:text-spot"
      >
        {t({ es: dark ? "Modo claro" : "Modo oscuro", en: dark ? "Light mode" : "Dark mode" })}
      </button>
    </div>
  );
}
