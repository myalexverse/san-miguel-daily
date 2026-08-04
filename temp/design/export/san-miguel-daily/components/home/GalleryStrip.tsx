"use client";

import { useT } from "../UiProvider";
import { Kicker } from "../ui";
import { ImagePlaceholder } from "../ImagePlaceholder";

export function GalleryStrip() {
  const t = useT();
  return (
    <section className="pt-16 md:pt-24">
      <div className="flex flex-col gap-2 px-5 pb-6 md:flex-row md:items-baseline md:justify-between md:px-16">
        <div>
          <Kicker tone="spot2">{t({ es: "Galería", en: "Gallery" })}</Kicker>
          <h3 className="text-[26px] font-semibold leading-tight tracking-tight md:text-[40px]">
            {t({ es: "San Miguel a las cinco de la mañana", en: "San Miguel at five in the morning" })}
          </h3>
        </div>
        <div className="text-[13px] text-ink2">
          {t({ es: "24 fotografías de Emilio Zúñiga", en: "24 photographs by Emilio Zúñiga" })}
        </div>
      </div>
      <ImagePlaceholder label="Full bleed" className="h-[300px] w-full md:h-[560px]" />
    </section>
  );
}
