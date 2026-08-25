"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useT } from "../UiProvider";

// Weather condition codes → Spanish/English labels & SVG icon choice
const weatherLabels: Record<number, { es: string; en: string; icon: "sun" | "cloud" | "rain" | "storm" | "snow" | "fog" }> = {
  0: { es: "Soleado", en: "Clear", icon: "sun" },
  1: { es: "Mayormente despejado", en: "Mostly clear", icon: "sun" },
  2: { es: "Parcialmente nublado", en: "Partly cloudy", icon: "cloud" },
  3: { es: "Nublado", en: "Overcast", icon: "cloud" },
  45: { es: "Neblina", en: "Fog", icon: "fog" },
  48: { es: "Neblina helada", en: "Freezing fog", icon: "fog" },
  51: { es: "Llovizna ligera", en: "Light drizzle", icon: "rain" },
  53: { es: "Llovizna", en: "Drizzle", icon: "rain" },
  55: { es: "Llovizna intensa", en: "Heavy drizzle", icon: "rain" },
  61: { es: "Lluvia ligera", en: "Light rain", icon: "rain" },
  63: { es: "Lluvia", en: "Rain", icon: "rain" },
  65: { es: "Lluvia intensa", en: "Heavy rain", icon: "rain" },
  71: { es: "Nieve ligera", en: "Light snow", icon: "snow" },
  73: { es: "Nieve", en: "Snow", icon: "snow" },
  75: { es: "Nieve intensa", en: "Heavy snow", icon: "snow" },
  80: { es: "Chubascos", en: "Showers", icon: "rain" },
  81: { es: "Chubascos moderados", en: "Moderate showers", icon: "rain" },
  82: { es: "Chubascos intensos", en: "Heavy showers", icon: "rain" },
  95: { es: "Tormenta", en: "Thunderstorm", icon: "storm" },
  96: { es: "Tormenta con granizo", en: "Thunderstorm with hail", icon: "storm" },
  99: { es: "Tormenta con granizo fuerte", en: "Severe thunderstorm", icon: "storm" },
};

interface WeatherData {
  temp: number;
  max: number;
  min: number;
  wind: number;
  humidity: number;
  code: number;
}

// We'll pass the heroPost and latest array as props.
export function HeroWithSidebar({ heroPost, latestPosts }: { heroPost: any, latestPosts: any[] }) {
  const t = useT();

  // --- Live weather from Open-Meteo (no API key needed) ---
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=20.9144&longitude=-100.7452&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=America/Mexico_City&forecast_days=1"
    )
      .then((r) => r.json())
      .then((data) => {
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          wind: Math.round(data.current.wind_speed_10m),
          humidity: data.current.relative_humidity_2m,
          code: data.current.weather_code,
          max: Math.round(data.daily.temperature_2m_max[0]),
          min: Math.round(data.daily.temperature_2m_min[0]),
        });
      })
      .catch(() => {});
  }, []);

  const weatherInfo = weather
    ? weatherLabels[weather.code] || weatherLabels[0]
    : weatherLabels[0];

  // Format post time from created_at
  const formatTime = (createdAt: string) => {
    try {
      const d = new Date(createdAt);
      return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Mexico_City" });
    } catch { return ""; }
  };

  return (
    <section className="px-5 md:px-16 md:max-w-7xl md:mx-auto pt-8 pb-12 border-b border-hairline">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left: Hero Text (4 cols) */}
        <div className="md:col-span-4 flex flex-col">
          <div className="text-[10px] font-bold uppercase tracking-widest text-spot2 mb-4">
            {heroPost?.category || "San Miguel"}
          </div>
          <h2 className="text-3xl lg:text-[36px] font-serif font-bold leading-[1.1] text-ink mb-4 text-balance">
            <Link href={`/p/${heroPost?.slug}`} className="hover:text-spot transition-colors">
              {t(heroPost?.title)}
            </Link>
          </h2>
          <p className="text-[15px] lg:text-base text-ink2 leading-relaxed mb-6 font-sans text-pretty line-clamp-4 md:line-clamp-none">
            {t(heroPost?.excerpt)}
          </p>
          <div className="text-xs text-ink font-sans tracking-wide">
            {heroPost?.author || "Mariana Escobedo"} <span className="text-ink3 mx-1">·</span> 14 min de lectura
          </div>
        </div>

        {/* Middle: Hero Image (5 cols) */}
        <div className="md:col-span-5 flex flex-col order-first md:order-none mb-6 md:mb-0">
          <Link href={`/p/${heroPost?.slug}`} className="block group cursor-pointer w-full h-[300px] md:h-[450px] rounded-[4px] overflow-hidden bg-paper-2">
            {heroPost?.image_url && (
              <img 
                src={heroPost.image_url} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105" 
              />
            )}
          </Link>
        </div>

        {/* Right: Sidebar (3 cols) */}
        <aside className="md:col-span-3 md:row-span-2 flex flex-col md:pl-8 md:border-l border-hairline">
          
          {/* Weather Widget */}
          <div className="mb-10">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-spot2 mb-4">
              {t({ es: "AHORA EN SAN MIGUEL", en: "NOW IN SAN MIGUEL" })}
            </h3>
            <div className="flex items-center gap-3 mb-2">
              {/* Dynamic weather icon */}
              {weatherInfo.icon === "sun" && (
                <svg className="w-10 h-10 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
              {weatherInfo.icon === "cloud" && (
                <svg className="w-10 h-10 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              )}
              {weatherInfo.icon === "rain" && (
                <svg className="w-10 h-10 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zm5 4v3m4-3v3m4-3v3" /></svg>
              )}
              {weatherInfo.icon === "storm" && (
                <svg className="w-10 h-10 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zm10-1l-2 4h3l-2 4" /></svg>
              )}
              {(weatherInfo.icon === "snow" || weatherInfo.icon === "fog") && (
                <svg className="w-10 h-10 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
              )}
              <div className="text-4xl font-serif text-ink tracking-tight">{weather ? `${weather.temp}°C` : "—"}</div>
              <div className="text-sm font-bold text-ink2 leading-tight ml-1">{t(weatherInfo)}</div>
            </div>
            <div className="text-[11px] text-ink3 mb-3 font-sans leading-relaxed">
              {weather ? (<>Máx. {weather.max}° · Mín. {weather.min}°<br/>Viento a {weather.wind} km/h · Humedad {weather.humidity}%</>) : "Cargando..."}
            </div>
            <Link href="/clima" className="text-xs font-bold text-spot2 hover:text-ink flex items-center gap-1 transition-colors">
              {t({ es: "Ver pronóstico completo", en: "Full forecast" })} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink border-b-2 border-ink pb-2 mb-5">
              {t({ es: "ÚLTIMA HORA", en: "BREAKING" })}
            </h3>
            <ul className="flex flex-col gap-5">
              {latestPosts.map((post, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <div className="text-[11px] font-bold text-spot2 bg-spot2/10 px-2 py-0.5 rounded-[4px] shrink-0 font-sans mt-0.5">
                    {post.time || formatTime(post.created_at) || `${12 - i}:00`}
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/p/${post.slug}`} className="text-[14px] font-serif font-bold text-ink group-hover:text-spot transition-colors leading-snug mb-1 text-pretty">
                      {t(post.title)}
                    </Link>
                    <div className="text-[10px] uppercase font-bold text-ink3 tracking-widest">
                      {post.category || "San Miguel"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/latest" className="text-xs font-bold text-spot2 hover:text-ink flex items-center gap-1 mt-6 transition-colors">
              {t({ es: "Ver más noticias", en: "More news" })} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

        </aside>

        {/* Ad Banner (Row 2, spanning the first 9 columns) */}
        <div className="md:col-span-9 hidden md:flex items-end mt-4">
          <div className="w-full h-[100px] bg-paper-2 border border-hairline flex flex-col items-center justify-center rounded-[4px] group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-paper to-paper-2 opacity-50"></div>
            <span className="text-[9px] text-ink3 uppercase tracking-widest font-bold absolute top-2 right-3">
              Publicidad
            </span>
            <div className="z-10 flex flex-col items-center">
              <span className="text-sm font-serif font-bold text-ink tracking-wide">
                San Miguel Real Estate
              </span>
              <span className="text-xs font-sans text-ink2 mt-1">
                Descubre propiedades exclusivas en el centro histórico
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
