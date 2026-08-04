"use client";

import { useT } from "./UiProvider";
import { Button, Kicker } from "./ui";

export function NewsletterSignup() {
  const t = useT();
  return (
    <section className="mx-5 mt-20 grid gap-8 border-y border-rule py-12 md:mx-16 md:grid-cols-2 md:items-center md:gap-20">
      <div>
        <Kicker tone="spot">{t({ es: "Boletín diario", en: "Daily briefing" })}</Kicker>
        <h3 className="text-3xl font-semibold leading-tight tracking-tight md:text-[38px]">
          {t({ es: "La ciudad, en seis minutos, cada mañana a las 6:30", en: "The city, in six minutes, every morning at 6:30" })}
        </h3>
        <p className="mt-4 max-w-dek text-base leading-relaxed text-ink2 md:text-lg">
          {t({
            es: "Lo indispensable de San Miguel, política, economía y agenda cultural. Gratis.",
            en: "The essentials from San Miguel: politics, economy and the culture agenda. Free.",
          })}
        </p>
      </div>
      <form className="flex flex-col gap-3 md:flex-row md:items-end" onSubmit={(e) => e.preventDefault()}>
        <label className="flex-1">
          <span className="mb-2 block text-xs uppercase tracking-label text-ink2">
            {t({ es: "Correo electrónico", en: "Email address" })}
          </span>
          <input
            type="email"
            placeholder="tu@correo.com"
            className="h-11 w-full border border-rule bg-transparent px-3 text-base text-ink placeholder:text-ink3 focus:border-spot focus:outline-none"
          />
        </label>
        <Button className="h-11">{t({ es: "Suscribirme", en: "Sign me up" })}</Button>
      </form>
    </section>
  );
}
