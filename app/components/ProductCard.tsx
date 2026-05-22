import Image from "next/image";
import { Product } from "../types";
import { Plus, Minus } from "lucide-react";
import { CATEGORY_ADDONS } from "../constants/addons";
import { formatPrice } from "../utils/format";

interface Props {
  product: Product;
  quantity: number;
  onAdd: (p: Product) => void;
  onRemove: (id: number) => void;
  onViewDetail: (p: Product) => void;
  priority?: boolean;
}

export function ProductCard({
  product,
  quantity,
  onAdd,
  onRemove,
  onViewDetail,
  priority = false,
}: Props) {
  const needsModal =
    !!CATEGORY_ADDONS[product.category]?.length || !!product.sizes?.length;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (needsModal) onViewDetail(product);
    else onAdd(product);
  };

  return (
    <div className="group cursor-pointer" onClick={() => onViewDetail(product)}>
      <div className="aspect-[3/4] relative overflow-hidden bg-hellcore-surface mb-2.5">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 512px) 220px, 46vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />

        <div
          className="absolute bottom-2 right-2"
          onClick={(e) => e.stopPropagation()}
        >
          {quantity > 0 ? (
            <div className="flex items-center bg-hellcore-bg/90 backdrop-blur-sm border border-hellcore-text/20 px-0.5 h-7">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(product.id);
                }}
                className="w-6 h-6 flex items-center justify-center text-hellcore-text/70"
              >
                <Minus size={10} />
              </button>
              <span className="w-5 text-center text-xs font-black text-hellcore-text">
                {quantity}
              </span>
              <button
                onClick={handleAdd}
                className="w-6 h-6 flex items-center justify-center text-hellcore-text/70"
              >
                <Plus size={10} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-hellcore-text text-hellcore-bg w-8 h-8 flex items-center justify-center active:scale-90 transition-transform"
            >
              <Plus size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-0.5 px-0.5">
        <h3 className="font-display text-sm uppercase tracking-wide text-hellcore-text line-clamp-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-hellcore-red font-semibold text-sm">
          R$ {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
