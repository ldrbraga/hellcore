import { BannerCarousel } from "./BannerCarousel";
import type { Banner } from "../types";

const TICKER =
  " SKATE • ARTE • CONTRACULTURA • UNDERGROUND • HELLCORE INDUSTRIES •";

export function Hero({ banners }: { banners: Banner[] }) {
  return (
    <section>
      <BannerCarousel banners={banners} />

      <div className="bg-hellcore-text border-t border-hellcore-red/25 py-1.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap w-max" aria-hidden="true">
          <span className="text-[9px] font-bold uppercase tracking-[0.38em] text-hellcore-bg/40">
            {TICKER.repeat(8)}
          </span>
        </div>
      </div>

      <div className="bg-hellcore-bg border-b-2 border-hellcore-text">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 md:py-8">
          <div className="flex items-center gap-4 mb-2 md:mb-4">
            <span
              className="text-[9px] font-black uppercase tracking-[0.5em] text-hellcore-text/30"
              aria-hidden="true"
            >
              Manifesto
            </span>
            <div className="h-px flex-1 bg-hellcore-text/10" />
          </div>

          <p className="text-hellcore-text text-sm md:text-xl leading-relaxed md:leading-[1.7]">
            A HellCore Industries é uma marca pessoal que utiliza a linguagem
            visual do{" "}
            <span className="font-display text-xl md:text-[30px] text-hellcore-red leading-none">
              SKATE
            </span>
            , do{" "}
            <span className="font-display text-xl md:text-[30px] text-hellcore-red leading-none">
              UNDERGROUND
            </span>{" "}
            e da{" "}
            <span className="font-display text-xl md:text-[30px] text-hellcore-red leading-none">
              CULTURA DE RUA
            </span>{" "}
            <span className="text-hellcore-text/35">(Contracultura)</span> para
            produzir{" "}
            <strong className="font-bold">obras de arte e ilustrações</strong>{" "}
            em diferentes formatos.
          </p>
        </div>
      </div>
    </section>
  );
}
