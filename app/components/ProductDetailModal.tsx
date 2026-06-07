"use client";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { X, Minus, Plus, ShoppingBag, Check, Play } from "lucide-react";
import Image from "next/image";
import { Product, Addon } from "../types";
import { CATEGORY_ADDONS } from "../constants/addons";
import { formatPrice, calcAddonsTotal } from "../utils/format";

interface Props {
  product: Product;
  quantity: number;
  currentAddons: Addon[];
  currentSize?: string;
  onClose: () => void;
  onSetItem: (product: Product, quantity: number, addons: Addon[], size?: string) => void;
}

function isVideo(url: string): boolean {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url) || url.includes("/video/upload/");
}

function toThumbUrl(url: string): string {
  if (url.includes("res.cloudinary.com")) {
    if (isVideo(url)) {
      return url
        .replace("/video/upload/", "/video/upload/w_160,h_160,c_fill,q_70,so_0/")
        .replace(/\.(mp4|webm|mov)(\?|$)/i, ".jpg");
    }
    return url.replace("/upload/", "/upload/w_160,h_160,c_fill,q_70/");
  }
  if (url.includes("images.unsplash.com")) {
    return url.split("?")[0] + "?w=160&q=60";
  }
  return url;
}

export function ProductDetailModal({
  product,
  quantity,
  currentAddons,
  currentSize,
  onClose,
  onSetItem,
}: Props) {
  const hasMultipleImages = product.images.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: hasMultipleImages });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localQuantity, setLocalQuantity] = useState(Math.max(quantity, 1));
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>(currentAddons);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(currentSize);
  const [sizeError, setSizeError] = useState(false);
  const sizeRef = useRef<HTMLDivElement>(null);

  const availableAddons = CATEGORY_ADDONS[product.category] ?? [];

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const toggleAddon = (addon: Addon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const lineTotal =
    localQuantity * (product.price + calcAddonsTotal(selectedAddons));

  const handleConfirm = () => {
    if (product.sizes?.length && !selectedSize) {
      setSizeError(true);
      sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onSetItem(product, localQuantity, selectedAddons, selectedSize);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-hellcore-text/75 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-hellcore-surface w-full md:max-w-4xl md:h-auto md:max-h-[88vh] animate-in slide-in-from-bottom-full duration-300 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row border-t-2 border-hellcore-text md:border-2"
        style={{ height: "92dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle + close — sticky no topo no mobile */}
        <div className="md:hidden sticky top-0 z-10 flex items-center justify-between px-4 pt-3 pb-2 bg-hellcore-surface shrink-0">
          <div className="w-5 shrink-0" />
          <div className="w-10 h-1 rounded-full bg-hellcore-text/20" />
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1 -mr-1 active:scale-90 transition-transform"
          >
            <X size={18} className="text-hellcore-text/50" />
          </button>
        </div>

        {/* Seção de imagens */}
        <div className="shrink-0 w-full md:w-[55%] md:h-full md:flex md:flex-col md:overflow-hidden">
          {/* Aspect-square no mobile, flex-1 no desktop */}
          <div className="w-full aspect-square relative md:aspect-auto md:flex-1">
            <div className="overflow-hidden absolute inset-0" ref={emblaRef}>
              <div className="flex h-full">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_100%] shrink-0 relative h-full bg-hellcore-border"
                  >
                    {isVideo(img) ? (
                      <video
                        src={img}
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        playsInline
                        loop
                      />
                    ) : (
                      <Image
                        src={img}
                        alt={`${product.name} — foto ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 55vw"
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar"
              className="hidden md:flex absolute top-4 right-4 bg-hellcore-bg/90 p-2.5 active:scale-90 transition-transform items-center justify-center"
            >
              <X size={16} className="text-hellcore-text" />
            </button>
          </div>

          {hasMultipleImages && (
            <div className="shrink-0 flex gap-2 px-3 py-2.5 bg-hellcore-surface border-t border-hellcore-border overflow-x-auto [&::-webkit-scrollbar]:hidden">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  className={`relative shrink-0 w-14 h-14 overflow-hidden transition-all duration-200 ${
                    i === selectedIndex
                      ? "ring-2 ring-hellcore-text opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <Image
                    src={toThumbUrl(img)}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  {isVideo(img) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play size={16} className="text-white fill-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Seção de conteúdo */}
        <div className="flex-1 md:flex md:flex-col md:overflow-hidden md:border-l md:border-hellcore-text/10">
          {/* Conteúdo — flui normalmente no mobile, scroll interno no desktop */}
          <div className="px-5 md:px-8 pt-5 pb-4 md:pb-6 space-y-5 md:flex-1 md:overflow-y-auto">
            <div className="space-y-2">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-hellcore-red/70">
                {product.category}
              </span>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-hellcore-text leading-tight">
                {product.name}
              </h2>
              <p className="text-hellcore-red font-black text-2xl md:text-3xl">
                R$ {formatPrice(product.price)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-hellcore-text/30" aria-hidden="true">
                  Sobre o produto
                </span>
                <div className="flex-1 h-px bg-hellcore-border" />
              </div>
              <p className="text-sm md:text-base text-hellcore-text/60 leading-relaxed pt-1">
                {product.detailDescription ?? product.description}
              </p>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div ref={sizeRef} className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-hellcore-text/30 shrink-0">
                      Tamanho
                    </span>
                    <div className="flex-1 h-px bg-hellcore-border" />
                  </div>
                  {sizeError && (
                    <span className="text-[10px] text-hellcore-red font-black uppercase tracking-wide shrink-0 animate-in fade-in">
                      Selecione um tamanho
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`px-4 py-2 text-sm font-bold border-2 transition-all active:scale-95 ${
                        selectedSize === size
                          ? "border-hellcore-text bg-hellcore-text text-hellcore-bg"
                          : sizeError
                          ? "border-hellcore-red/50 text-hellcore-text/60"
                          : "border-hellcore-border text-hellcore-text/60 hover:border-hellcore-text/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {availableAddons.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-hellcore-text/30" aria-hidden="true">
                    Adicionais
                  </h3>
                  <div className="flex-1 h-px bg-hellcore-border" />
                </div>
                <div className="space-y-2">
                  {availableAddons.map((addon) => {
                    const selected = selectedAddons.some(
                      (a) => a.id === addon.id
                    );
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`w-full flex items-center justify-between p-4 border-2 transition-all active:scale-[0.99] ${
                          selected
                            ? "border-hellcore-text bg-hellcore-text/5"
                            : "border-hellcore-border bg-hellcore-surface"
                        }`}
                      >
                        <span className="font-bold text-sm text-hellcore-text">
                          {addon.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="text-hellcore-red font-bold text-sm">
                            +R$ {formatPrice(addon.price)}
                          </span>
                          <div
                            className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${
                              selected
                                ? "border-hellcore-text bg-hellcore-text"
                                : "border-hellcore-border"
                            }`}
                          >
                            {selected && (
                              <Check size={10} className="text-hellcore-bg" />
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 md:static px-5 md:px-8 py-4 md:py-5 border-t-2 border-hellcore-text/10 flex items-center gap-3 bg-hellcore-surface md:shrink-0">
            <div className="flex items-center bg-hellcore-bg border border-hellcore-text/15 px-0.5 h-14 shrink-0">
              <button
                onClick={() => setLocalQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="w-11 h-12 flex items-center justify-center text-hellcore-text/50 active:bg-hellcore-border transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-9 text-center font-black text-base text-hellcore-text">
                {localQuantity}
              </span>
              <button
                onClick={() => setLocalQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="w-11 h-12 flex items-center justify-center text-hellcore-text/50 active:bg-hellcore-border transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-hellcore-text text-hellcore-bg h-14 font-black flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all text-sm uppercase tracking-widest"
            >
              <ShoppingBag size={17} />
              Adicionar · R$ {formatPrice(lineTotal)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
