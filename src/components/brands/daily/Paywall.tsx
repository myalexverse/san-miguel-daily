"use client";

import { useState } from "react";
import { useUi, useT } from "./UiProvider";
import { Button } from "./ui";
import { subscribeAction } from "@/app/actions/subscribe";

export function Paywall() {
  const { paywall, setPaywall } = useUi();
  const t = useT();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  if (!paywall) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const res = await subscribeAction(formData);

    setLoading(false);
    setMessage(res.message);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setPaywall(false);
        setSuccess(false);
        setMessage("");
      }, 3000);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 md:items-center md:p-6">
      <div className="w-full max-w-xl bg-paper p-6 shadow-2xl md:p-11">
        <div className="mb-4 text-[11px] uppercase tracking-kicker text-spot">
          {t({ es: "Boletín Diario", en: "Daily Newsletter" })}
        </div>
        <h3 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {success 
            ? t({ es: "¡Gracias por suscribirte!", en: "Thanks for subscribing!" })
            : t({ es: "Recibe las noticias más importantes en tu correo", en: "Get the most important news in your inbox" })
          }
        </h3>
        <p className="mb-7 mt-3 text-base leading-relaxed text-ink2">
          {success
            ? t({ es: "Te hemos añadido a nuestra lista exclusiva.", en: "We have added you to our exclusive list." })
            : t({ es: "Únete a cientos de lectores en San Miguel de Allende. Sin spam, solo buen periodismo local.", en: "Join hundreds of readers in San Miguel de Allende. No spam, just good local journalism." })
          }
        </p>

        {!success && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="domain" value="daily.localhost" />
            <input 
              type="email" 
              name="email" 
              required 
              placeholder={t({ es: "tu@correo.com", en: "you@email.com" })}
              className="h-12 w-full border border-hairline bg-transparent px-4 text-ink placeholder:text-ink3 focus:border-ink focus:outline-none"
            />
            {message && <div className="text-sm text-spot">{message}</div>}
            
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
              <Button type="submit" disabled={loading} className="h-11">
                {loading 
                  ? t({ es: "Enviando...", en: "Sending..." }) 
                  : t({ es: "Suscribirme Gratis", en: "Subscribe for Free" })
                }
              </Button>
              <Button type="button" variant="ghost" onClick={() => setPaywall(false)} className="h-11">
                {t({ es: "Ahora no", en: "Not now" })}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
