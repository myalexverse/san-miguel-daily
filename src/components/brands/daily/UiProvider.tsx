"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "es" | "en";
type Ui = {
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  setDark: (d: boolean) => void;
  paywall: boolean;
  setPaywall: (p: boolean) => void;
  unlocked: boolean;
  unlock: () => void;
  menu: boolean;
  setMenu: (m: boolean) => void;
};

const Ctx = createContext<Ui | null>(null);

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      return (window.localStorage.getItem("smd:lang") as Lang) || "es";
    }
    return "es";
  });
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("smd:dark") === "1";
    }
    return false;
  });
  const [paywall, setPaywall] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("smd:lang", lang);
    window.localStorage.setItem("smd:dark", dark ? "1" : "0");
  }, [lang, dark]);

  return (
    <Ctx.Provider
      value={{ lang, setLang, dark, setDark, paywall, setPaywall, unlocked, unlock: () => { setUnlocked(true); setPaywall(false); }, menu, setMenu }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useUi() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUi must be used inside <UiProvider>");
  return ctx;
}

/** Resolves a bilingual string against the active language. */
export function useT() {
  const { lang } = useUi();
  return (s: string | { es: string; en: string }) => {
    if (!s) return "";
    if (typeof s === "string") return s;
    return s[lang] || "";
  };
}
