import { ShoppingBag } from "lucide-react";

interface Props {
  cartCount: number;
  onCartOpen: () => void;
}

export function Header({ cartCount, onCartOpen }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-hellcore-text border-b border-white/5">
      <div className="max-w-5xl mx-auto h-11 px-4 md:px-8 flex items-center justify-between">
        <span className="font-display text-sm tracking-[0.25em] text-hellcore-bg/40 select-none">
          HellCore Industries
        </span>

        <button
          onClick={onCartOpen}
          className="flex items-center gap-2 text-hellcore-bg/50 hover:text-hellcore-bg transition-colors py-2 pl-3"
          aria-label="Abrir carrinho"
        >
          <div className="relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-hellcore-red text-hellcore-bg text-[7px] min-w-[13px] h-[13px] flex items-center justify-center font-black px-0.5 leading-none">
                {cartCount}
              </span>
            )}
          </div>
        </button>
      </div>
    </header>
  );
}
