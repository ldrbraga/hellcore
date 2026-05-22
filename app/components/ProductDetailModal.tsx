"use client";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { X, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import Image from "next/image";
import { Product, Addon } from "../types";
import { CATEGORY_ADDONS } from "../constants/addons";
import { formatPrice, calcAddonsTotal } from "../utils/format";

interface Props {
  product: Product;
  quantity: number;
  currentAddons: Addon[];
  onClose: () => void;
  onSetItem: (product: Product, quantity: number, addons: Addon[]) => void;
}

function toThumbUrl(url: string): string {
  if (url.includes("res.cloudinary.com")) {
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
  onClose,
  onSetItem,
}: Props) {
  const hasMultipleImages = product.images.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: hasMultipleImages });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localQuantity, setLocalQuantity] = useState(Math.max(quantity, 1));
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>(currentAddons);

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
    onSetItem(product, localQuantity, selectedAddons);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-hellcore-text/75 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-hellcore-surface w-full md:max-w-4xl md:h-auto md:max-h-[88vh] animate-in slide-in-from-bottom-full duration-300 overflow-hidden flex flex-col md:flex-row border-t-2 border-hellcore-text md:border-2"
        style={{ height: "92dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:hidden flex justify-center pt-3 pb-1 shrink-0 bg-hellcore-surface">
          <div className="w-10 h-1 rounded-full bg-hellcore-text/20" />
        </div>

        <div className="shrink-0 md:w-[55%] h-[52vh] md:h-auto flex flex-col overflow-hidden">
          <div className="relative flex-1 overflow-hidden">
            <div className="overflow-hidden h-full" ref={emblaRef}>
              <div className="flex h-full">
                {product.images.map((img, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_100%] shrink-0 relative h-full bg-hellcore-border"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} — foto ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
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
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col overflow-hidden md:border-l md:border-hellcore-text/10">
          <div className="md:hidden flex items-center justify-between px-5 pt-4 pb-2 shrink-0">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-hellcore-red/70">
              {product.category}
            </span>
            <button
              onClick={onClose}
              className="p-2 -mr-2 active:scale-90 transition-transform"
            >
              <X size={18} className="text-hellcore-text/50" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 md:px-8 pb-4 md:pb-6 space-y-5">
            <div className="space-y-2">
              <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.4em] text-hellcore-red/70">
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
                <span className="text-[9px] font-black uppercase tracking-widest text-hellcore-text/30">
                  Sobre o produto
                </span>
                <div className="flex-1 h-px bg-hellcore-border" />
              </div>
              <p className="text-sm md:text-base text-hellcore-text/60 leading-relaxed pt-1">
                {product.detailDescription ?? product.description}
              </p>
            </div>

            {availableAddons.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-[9px] font-black uppercase tracking-widest text-hellcore-text/30">
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

          <div className="px-5 md:px-8 py-4 md:py-5 border-t-2 border-hellcore-text/10 flex items-center gap-3 shrink-0 bg-hellcore-surface">
            <div className="flex items-center bg-hellcore-bg border border-hellcore-text/15 px-0.5 h-14 shrink-0">
              <button
                onClick={() => setLocalQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-12 flex items-center justify-center text-hellcore-text/50 active:bg-hellcore-border transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-9 text-center font-black text-base text-hellcore-text">
                {localQuantity}
              </span>
              <button
                onClick={() => setLocalQuantity((q) => q + 1)}
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
