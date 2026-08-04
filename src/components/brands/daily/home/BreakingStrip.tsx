"use client";

import Link from "next/link";
import { useT } from "../UiProvider";
import { Tag } from "../ui";
import { breaking } from "@/components/brands/daily/lib/content";

export function BreakingStrip() {
  const t = useT();
  return (
    <div className="flex items-baseline gap-3 bg-paper2 px-5 py-3 md:mt-6 md:gap-5 md:bg-transparent md:px-16 md:py-0">
      <Tag tone="accent2">{t({ es: "Última hora", en: "Breaking" })}</Tag>
      <Link href="/articulo" className="text-[15px] leading-snug text-ink hover:text-spot2 md:text-lg">
        {t(breaking)}
      </Link>
      <span className="hidden whitespace-nowrap text-xs text-ink3 md:inline">11:42</span>
    </div>
  );
}
