"use client";

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
  return (
    <div className="sticky top-11 z-40 bg-hellcore-bg/95 backdrop-blur-md border-b border-hellcore-border">
      <div className="max-w-5xl mx-auto">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                    className={`text-[9px] font-bold ${
                      isActive ? "text-hellcore-bg/50" : "text-hellcore-text/25"
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
