"use client";
import { forwardRef } from "react";
import { ShoppingBag } from "lucide-react";
import { CartTriggerProps } from "../types";
import { formatPrice, calcTotalItems } from "../utils/format";

export const CartTrigger = forwardRef<HTMLDivElement, CartTriggerProps>(
  function CartTrigger({ cart, total, onOpen, isVisible }, ref) {
    if (!isVisible) return null;

    const totalItems = calcTotalItems(cart);

    return (
      <div
        ref={ref}
        className="fixed left-0 right-0 z-40 px-4 pointer-events-none animate-in fade-in slide-in-from-bottom-4"
        style={{ bottom: 16 }}
      >
        <button
          onClick={onOpen}
          className="max-w-2xl mx-auto bg-hellcore-text text-hellcore-bg rounded-none p-4 shadow-2xl flex items-center justify-between w-full active:scale-[0.98] transition-transform border-t-2 border-hellcore-red pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-hellcore-red text-hellcore-bg text-[9px] min-w-[16px] h-4 rounded-full flex items-center justify-center font-black px-0.5">
                {totalItems}
              </span>
            </div>
            <div className="text-left leading-tight">
              <p className="text-[10px] text-hellcore-bg/50 font-semibold uppercase tracking-wider">
                Ver carrinho
              </p>
              <p className="font-black text-base">R$ {formatPrice(total)}</p>
            </div>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-hellcore-bg/60">
            Revisar →
          </span>
        </button>
      </div>
    );
  }
);
