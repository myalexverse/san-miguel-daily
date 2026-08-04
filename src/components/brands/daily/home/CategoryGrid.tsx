"use client";

import Link from "next/link";
import { useT } from "../UiProvider";

export function CategoryGrid({ posts }: { posts: any[] }) {
  const t = useT();
  
  // Map standard categories based on index if not provided
  const categories = [
    { id: "san-miguel", label: { es: "SAN MIGUEL", en: "SAN MIGUEL" } },
    { id: "politica", label: { es: "POLÍTICA", en: "POLITICS" } },
    { id: "economia", label: { es: "ECONOMÍA", en: "ECONOMY" } },
    { id: "cultura", label: { es: "CULTURA", en: "CULTURE" } }
  ];

  return (
    <section className="px-5 md:px-16 md:max-w-7xl md:mx-auto pt-16 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        
        {posts.slice(0, 4).map((post, idx) => {
          const category = categories[idx];
          const isGallery = category.id === "cultura"; // According to mockup, Cultura holds the gallery

          return (
            <article key={idx} className="flex flex-col group cursor-pointer">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-spot2 mb-4">
                {t(category.label)}
              </h3>
              
              <Link href={isGallery ? "/seccion/cultura" : `/p/${post?.slug}`} className="block mb-4 overflow-hidden rounded-[4px]">
                {isGallery ? (
                  // Gallery Preview Styling (gray background, padded image)
                  <div className="w-full aspect-[4/3] bg-paper-2 flex items-center justify-center p-4">
                    <img 
                      src={post?.image_url || "/images/gallery/gto_1.jpg"} 
                      alt="" 
                      className="w-full h-full object-cover shadow-sm transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                ) : (
                  // Standard Image Styling
                  <div className="w-full aspect-[4/3] bg-paper-2">
                    <img 
                      src={post?.image_url} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                )}
              </Link>
              
              <h4 className="text-[19px] font-serif font-bold leading-snug text-ink mb-2 group-hover:text-spot transition-colors text-pretty">
                <Link href={isGallery ? "/seccion/cultura" : `/p/${post?.slug}`}>
                  {isGallery 
                    ? t({ es: "Ensayo fotográfico: San Miguel a las cinco de la mañana", en: "Photo Essay: San Miguel at five in the morning" })
                    : t(post?.title)}
                </Link>
              </h4>
              
              <p className="text-[14px] text-ink2 leading-relaxed mb-4 font-sans line-clamp-3">
                {isGallery 
                  ? t({ es: "24 fotografías de Emilio Zúñiga capturan la ciudad antes de despertar.", en: "24 photographs by Emilio Zúñiga capture the city before waking up." })
                  : t(post?.excerpt)}
              </p>
              
              <Link href={isGallery ? "/seccion/cultura" : `/p/${post?.slug}`} className="mt-auto text-[11px] font-bold text-spot2 hover:text-ink flex items-center gap-1 uppercase tracking-wide transition-colors">
                {isGallery 
                  ? t({ es: "Ver galería", en: "View gallery" }) 
                  : t({ es: "Leer más", en: "Read more" })} 
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          );
        })}

      </div>
    </section>
  );
}
