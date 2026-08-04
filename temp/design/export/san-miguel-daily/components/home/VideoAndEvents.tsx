"use client";

import Link from "next/link";
import { useT } from "../UiProvider";
import { SectionHeading } from "../ui";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { videos, events } from "@/lib/content";

export function VideoAndEvents() {
  const t = useT();
  return (
    <section className="grid gap-12 px-5 pt-14 md:grid-cols-[2fr_1fr] md:gap-20 md:px-16 md:pt-24">
      <div>
        <SectionHeading>Video</SectionHeading>
        <div className="grid gap-7 md:grid-cols-3">
          {videos.map((v, i) => (
            <article key={i}>
              <div className="relative">
                <ImagePlaceholder label="Video" treatment="halftone" className="h-[180px] w-full" />
                <span className="pointer-events-none absolute bottom-2.5 right-2.5 bg-ink/75 px-2 py-0.5 text-[11px] text-paper">
                  {v.length}
                </span>
              </div>
              <h5 className="mt-3.5 text-lg font-semibold leading-tight">
                <Link href="/articulo" className="text-ink hover:text-spot">
                  {t(v.title)}
                </Link>
              </h5>
            </article>
          ))}
        </div>
      </div>
      <div>
        <SectionHeading>{t({ es: "Agenda", en: "Events" })}</SectionHeading>
        <div className="flex flex-col gap-6">
          {events.map((e, i) => (
            <div key={i} className="flex gap-4">
              <div className="min-w-[52px] text-center">
                <div className="text-2xl leading-none">{e.day}</div>
                <div className="text-[11px] uppercase tracking-label text-ink3">{t(e.month)}</div>
              </div>
              <div>
                <div className="text-[17px] leading-snug">{t(e.title)}</div>
                <div className="mt-1 text-[13px] text-ink3">{e.place}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
