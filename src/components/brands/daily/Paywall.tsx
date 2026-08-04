"use client";

import { useUi, useT } from "./UiProvider";
import { Button } from "./ui";

const plans = [
  { id: "monthly", name: { es: "Digital mensual", en: "Digital monthly" }, note: { es: "Cancela cuando quieras", en: "Cancel anytime" }, price: "$89" },
  { id: "annual", name: { es: "Digital anual", en: "Digital annual" }, note: { es: "Dos meses gratis", en: "Two months free" }, price: "$890" },
  { id: "print", name: { es: "Digital + impreso", en: "Digital + print" }, note: { es: "Edición de fin de semana a domicilio", en: "Weekend edition delivered" }, price: "$1,490" },
];

export function Paywall() {
  const { paywall, setPaywall, unlock } = useUi();
  const t = useT();
  if (!paywall) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 md:items-center md:p-6">
      <div className="w-full max-w-xl bg-paper p-6 shadow-2xl md:p-11">
        <div className="mb-4 text-[11px] uppercase tracking-kicker text-spot">
          {t({ es: "Suscripción", en: "Subscription" })}
        </div>
        <h3 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {t({ es: "Periodismo local que se sostiene con lectores", en: "Local journalism paid for by readers" })}
        </h3>
        <p className="mb-7 mt-3 text-base leading-relaxed text-ink2">
          {t({ es: "Sin anuncios. Boletín diario incluido. Archivo completo desde 2022.", en: "No ads. Daily briefing included. Full archive back to 2022." })}
        </p>
        <div>
          {plans.map((p, i) => (
            <label key={p.id} className="flex cursor-pointer items-center gap-4 border-t border-hairline py-4 last:border-b">
              <input type="radio" name="plan" defaultChecked={i === 1} className="accent-spot" />
              <span className="flex-1">
                <strong className="font-semibold">{t(p.name)}</strong>
                <span className="block text-xs text-ink3">{t(p.note)}</span>
              </span>
              <span className="text-2xl">{p.price}</span>
            </label>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center">
          <Button onClick={unlock} className="h-11">{t({ es: "Continuar", en: "Continue" })}</Button>
          <Button variant="ghost" onClick={() => setPaywall(false)} className="h-11">
            {t({ es: "Ahora no", en: "Not now" })}
          </Button>
        </div>
      </div>
    </div>
  );
}
