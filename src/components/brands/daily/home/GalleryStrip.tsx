"use client";

import { useState } from "react";
import { useT } from "../UiProvider";

export function GalleryStrip() {
  const t = useT();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/gallery/gto_1.jpg",
    "/images/gallery/gto_2.jpg",
    "/images/gallery/gto_3.jpg",
    "/images/gallery/gto_4.jpg",
  ];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section className="bg-paper border-b border-hairline relative">
      <div className="px-5 md:px-16 md:max-w-7xl md:mx-auto py-12 md:py-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex flex-col">
            <div className="text-[10px] bg-paper-2 px-2 py-0.5 rounded-sm inline-block w-fit text-ink3 uppercase tracking-widest font-bold mb-3 border border-hairline">
              {t({ es: "CULTURA", en: "CULTURE" })}
            </div>
            <h2 className="text-3xl font-serif font-bold text-ink">
              {t({ es: "Ensayo fotográfico", en: "Photo Essay" })}
            </h2>
            <p className="text-base text-ink2 mt-2 max-w-2xl font-sans">
              {t({ 
                es: "San Miguel a las cinco de la mañana. 24 fotografías de Emilio Zúñiga capturan la ciudad antes de despertar.", 
                en: "San Miguel at five in the morning. 24 photographs by Emilio Zúñiga capture the city before waking up." 
              })}
            </p>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="flex flex-col gap-3 md:gap-4">
          {/* Hero Image */}
          <div 
            onClick={() => openLightbox(0)}
            className="relative w-full rounded-[4px] overflow-hidden group cursor-pointer bg-paper-2"
            style={{ aspectRatio: '21/9' }}
          >
            <img 
              src={images[0]} 
              alt="Exposición principal" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-6 text-white text-3xl font-serif">01</div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 md:pb-0">
            {images.slice(1, 4).map((src, idx) => (
              <div 
                key={idx}
                onClick={() => openLightbox(idx + 1)}
                className="relative shrink-0 w-[240px] md:w-full rounded-[4px] overflow-hidden group cursor-pointer snap-center bg-paper-2"
                style={{ aspectRatio: '16/9' }}
              >
                <img 
                  src={src} 
                  alt={`Miniatura ${idx + 2}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-4 text-white text-2xl font-serif">0{idx + 2}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors z-[110]"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <button 
            className="absolute left-4 md:left-10 text-white/70 hover:text-white p-4 transition-colors z-[110]"
            onClick={prevImage}
            aria-label="Previous"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div 
            className="relative max-w-7xl h-full flex flex-col items-center justify-center p-4 md:p-10 cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              nextImage(e as any); // Allow clicking image container to go next
            }}
          >
            <img 
              src={images[currentIndex]} 
              alt={`Imagen ${currentIndex + 1}`} 
              className="max-h-[80vh] max-w-full object-contain shadow-2xl rounded-sm"
            />
            <div className="text-white/60 font-serif text-xl mt-6 tracking-widest cursor-default" onClick={(e) => e.stopPropagation()}>
              0{currentIndex + 1} / 0{images.length}
            </div>
          </div>

          <button 
            className="absolute right-4 md:right-10 text-white/70 hover:text-white p-4 transition-colors z-[110]"
            onClick={nextImage}
            aria-label="Next"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </section>
  );
}
