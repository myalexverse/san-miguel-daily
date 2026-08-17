"use client";

import { useState } from "react";
import { useT } from "./UiProvider";

interface ShareBarProps {
  title: string;
  slug?: string;
  className?: string;
}

export function ShareBar({ title, className = "" }: ShareBarProps) {
  const t = useT();
  const [copied, setCopied] = useState(false);

  const getUrl = () => typeof window !== "undefined" ? window.location.href : "";

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: getUrl(),
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareWhatsapp = () => {
    const text = encodeURIComponent(`${title}\n\n${getUrl()}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareX = () => {
    const text = encodeURIComponent(title);
    const url = encodeURIComponent(getUrl());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <div className={`flex flex-wrap items-center gap-2.5 py-4 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-ink3 mr-2">
        {t({ es: "Compartir noticia:", en: "Share article:" })}
      </span>

      {/* WhatsApp */}
      <button
        onClick={shareWhatsapp}
        aria-label="Compartir en WhatsApp"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all text-xs font-medium"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span>WhatsApp</span>
      </button>

      {/* Facebook */}
      <button
        onClick={shareFacebook}
        aria-label="Compartir en Facebook"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all text-xs font-medium"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
        </svg>
        <span>Facebook</span>
      </button>

      {/* X / Twitter */}
      <button
        onClick={shareX}
        aria-label="Compartir en X"
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-ink/10 text-ink hover:bg-ink hover:text-paper transition-all text-xs font-medium"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <span>X</span>
      </button>

      {/* Mobile Native Share (If supported) */}
      {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
        <button
          onClick={handleNativeShare}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-spot/10 text-spot hover:bg-spot hover:text-white transition-all text-xs font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>{t({ es: "Más...", en: "More..." })}</span>
        </button>
      )}

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-hairline hover:border-ink transition-all text-xs font-medium text-ink2 hover:text-ink"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span>{copied ? t({ es: "¡Copiado!", en: "Copied!" }) : t({ es: "Copiar enlace", en: "Copy link" })}</span>
      </button>
    </div>
  );
}
