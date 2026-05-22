"use client";

import { useRef, useState, useEffect } from "react";
import { Product } from "../types";

export type CategorySelection = "Todos" | Product["category"];

const CATEGORIES: CategorySelection[] = [
  "Todos",
  "Camisetas",
  "Shapes",
  "Bonés",
  "Arte Digital",
];

interface Props {
  selected: CategorySelection;
  onChange: (cat: CategorySelection) => void;
  counts: Partial<Record<string, number>>;
}

export function CategoryFilter({ selected, onChange, counts }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const check = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div className="sticky top-11 z-40 bg-hellcore-bg/95 backdrop-blur-md border-b border-hellcore-border">
      <div className="max-w-5xl mx-auto relative">
        <div
          className={`md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-hellcore-bg to-transparent pointer-events-none z-10 transition-opacity duration-200 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`md:hidden absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-hellcore-bg to-transparent pointer-events-none z-10 transition-opacity duration-200 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={scrollRef}
          className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex gap-2 px-4 md:px-8 py-3 min-w-max">
            {CATEGORIES.map((cat) => {
              const count = counts[cat];
              const isActive = selected === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onChange(cat)}
                  className={`font-display flex items-center gap-1.5 px-4 py-1.5 text-sm uppercase tracking-widest transition-all whitespace-nowrap border ${
                    isActive
                      ? "bg-hellcore-text text-hellcore-bg border-hellcore-text"
                      : "bg-transparent text-hellcore-text/45 border-hellcore-text/20 hover:text-hellcore-text hover:border-hellcore-text/50"
                  }`}
                >
                  {cat}
                  {count !== undefined && (
                    <span
                      className={`text-[10px] font-bold ${
                        isActive
                          ? "text-hellcore-bg/65"
                          : "text-hellcore-text/40"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
