"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "../types";

const AUTOPLAY_DELAY = 5000;

export function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const pause = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  const play = useCallback(() => {
    if (banners.length <= 1) return;
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => emblaApi?.scrollNext(), AUTOPLAY_DELAY);
  }, [emblaApi, banners.length]);

  useEffect(() => {
    if (!emblaApi || banners.length <= 1) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", pause);
    emblaApi.on("pointerUp", play);
    play();
    return () => {
      pause();
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", pause);
      emblaApi.off("pointerUp", play);
    };
  }, [emblaApi, banners.length, play, pause]);

  if (!banners.length) return null;

  return (
    <div
      className="relative bg-black overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={play}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y items-start">
          {banners.map((b, i) => {
            const img = (
              <Image
                src={b.imageUrl}
                alt={b.alt ?? ""}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto block"
                quality={90}
                priority={i === 0}
              />
            );
            return (
              <div key={i} className="flex-none w-full">
                {b.link ? (
                  <a href={b.link} target="_blank" rel="noopener noreferrer" className="block">
                    {img}
                  </a>
                ) : img}
              </div>
            );
          })}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => { emblaApi?.scrollTo(i); play(); }}
                aria-label={`Banner ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => { emblaApi?.scrollPrev(); play(); }}
            aria-label="Banner anterior"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/65 text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => { emblaApi?.scrollNext(); play(); }}
            aria-label="Próximo banner"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/65 text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
