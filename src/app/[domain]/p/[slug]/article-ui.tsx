"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/brands/daily/SiteHeader";
import { MenuOverlay } from "@/components/brands/daily/MenuOverlay";
import { Paywall } from "@/components/brands/daily/Paywall";
import { Footer } from "@/components/brands/daily/Footer";
import { MobileTabBar } from "@/components/brands/daily/MobileTabBar";
import { ImagePlaceholder } from "@/components/brands/daily/ImagePlaceholder";
import { Button, Kicker, SectionHeading } from "@/components/brands/daily/ui";
import { useUi, useT } from "@/components/brands/daily/UiProvider";
import { article } from "@/components/brands/daily/lib/content";
import { ShareBar } from "@/components/brands/daily/ShareBar";

export default function ArticleUI({ post, relatedPosts = [] }: { post: any; relatedPosts?: any[] }) {
  const { unlocked, setPaywall, unlock } = useUi();
  const t = useT();

  const isEssay = post.category === 'opinion';
  const isNews = !isEssay;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": post.title,
            "image": [
              post.image_url ? (post.image_url.startsWith('http') ? post.image_url : `https://sanmigueldaily.com${post.image_url}`) : 'https://sanmigueldaily.com/images/news_patrimony_law.jpg'
            ],
            "datePublished": post.created_at,
            "dateModified": post.created_at,
            "author": [{
              "@type": "Person",
              "name": post.author_name || "Redacción San Miguel Daily"
            }],
            "publisher": {
              "@type": "Organization",
              "name": "San Miguel DAILY",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sanmigueldaily.com/icon.png"
              }
            },
            "description": post.excerpt
          })
        }}
      />
      <SiteHeader variant="slim" />
      {/* reading progress */}
      <div className="h-0.5 w-[38%] bg-spot" />

      <main>
        {isNews ? (
          <header className="px-5 pt-10 md:max-w-7xl mx-auto md:px-16 md:pt-18">
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="lg:w-1/2 w-full">
                <Kicker tone="spot">{post.category?.toUpperCase() || t(article.kicker)}</Kicker>
                <h1 className="text-[33px] font-semibold leading-[1.04] tracking-tight text-pretty md:text-[48px] lg:text-[56px] md:leading-none mt-2">
                  {post.title}
                </h1>
                <p className="mt-4 text-xl leading-relaxed text-ink2 md:text-[25px] md:leading-[1.3] text-pretty">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink2">
                  <span className="font-semibold text-ink">{post.author_name || "Redacción San Miguel Daily"}</span>
                  <span>·</span>
                  <span>{new Date(post.created_at || Date.now()).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="lg:w-1/2 w-full">
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-[320px] md:h-[420px] object-cover rounded-lg shadow-sm border border-hairline"
                  />
                )}
              </div>
            </div>
          </header>
        ) : (
          <header className="px-5 pt-10 md:max-w-[760px] md:px-0 md:pt-18 mx-auto">
            <Kicker tone="spot2">{t({ es: "Ensayo", en: "Essay" })}</Kicker>
            <h1 className="mt-2 text-[33px] font-normal italic leading-[1.04] text-pretty md:text-[52px] md:leading-none">
              {post.title}
            </h1>
            <p className="mt-4 text-xl leading-relaxed text-ink2 md:text-[23px]">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-ink2 border-b border-hairline pb-6">
              <div>
                <div className="font-semibold text-ink">{post.author_name || "Mariana Escobedo"}</div>
                <div>{t({ es: "Periodista y analista local", en: "Journalist & local analyst" })}</div>
              </div>
            </div>
          </header>
        )}

        <div className="grid items-start gap-12 px-5 pt-10 md:grid-cols-[1fr_660px_1fr] md:px-16 md:pt-18">
          <aside className="hidden md:sticky md:top-24 md:flex md:flex-col md:items-start">
            <div className="text-[11px] uppercase tracking-label text-ink3 mb-4">{t({ es: "Compartir", en: "Share" })}</div>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: post.title, url: window.location.href }).catch(console.error);
                }
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink hover:border-spot hover:text-spot transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            </button>
            <div className="my-5 h-14 w-px bg-rule ml-5" />
          </aside>

          <div className="text-[18px] leading-[1.7] md:text-xl md:leading-[1.72]">
            <div>
              <div 
                className="prose prose-lg dark:prose-invert max-w-none text-ink text-[18px] leading-[1.7] md:text-xl md:leading-[1.72]" 
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
              <ShareBar title={post.title} className="mt-8 border-t border-hairline pt-6" />
            </div>

            {/* Etiqueta de Autor y Compartir (Solo para Ensayos) */}
            {isEssay && (
              <div className="mt-16 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-hairline pt-8">
                <div className="flex items-center gap-4">
                  {post.author_avatar ? (
                    <img src={post.author_avatar} alt={post.author_name} className="h-12 w-12 rounded-full object-cover border border-rule" />
                  ) : (
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-rule text-[17px] text-ink2">
                      {post.author_name ? post.author_name.charAt(0) : 'E'}
                    </span>
                  )}
                  <div className="text-sm leading-relaxed">
                    <div>
                      {t({ es: "Por", en: "By" })} <strong className="font-semibold">{post.author_name || "Equipo Editorial"}</strong>
                    </div>
                    <div className="text-ink3" suppressHydrationWarning>{new Date(post.created_at).toLocaleDateString('es-MX')}</div>
                  </div>
                </div>
                <div className="flex w-full md:w-auto">
                  <Button variant="secondary" className="w-full md:w-auto px-6 py-2" onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        url: window.location.href,
                      }).catch(console.error);
                    }
                  }}>{t({ es: "Compartir", en: "Share" })}</Button>
                </div>
              </div>
            )}
          </div>

          <aside className="md:sticky md:top-24">
            <SectionHeading>{t({ es: "Relacionadas", en: "Related" })}</SectionHeading>
            <div className="flex flex-col gap-5">
              {relatedPosts && relatedPosts.length > 0 ? (
                relatedPosts.slice(0, 3).map((r: any, i: number) => (
                  <Link key={r.id || i} href={`/p/${r.slug}`} className="text-base leading-snug text-ink hover:text-spot md:text-[17px]">
                    {r.title}
                  </Link>
                ))
              ) : (
                article.related.map((r, i) => (
                  <Link key={i} href="/seccion/san-miguel" className="text-base leading-snug text-ink hover:text-spot md:text-[17px]">
                    {t(r)}
                  </Link>
                ))
              )}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <MobileTabBar />
      <MenuOverlay />
      <Paywall />
    </>
  );
}
