"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Product, CartItem, Addon, UserInfo } from "../types";
import { formatPrice, calcAddonsTotal, calcTotalItems } from "../utils/format";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { CategoryFilter, CategorySelection } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";
import { CartTrigger } from "./CartTrigger";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(() =>
  import("./CartDrawer").then((m) => ({ default: m.CartDrawer }))
);
const ProductDetailModal = dynamic(() =>
  import("./ProductDetailModal").then((m) => ({
    default: m.ProductDetailModal,
  }))
);
import { InstagramCTA } from "./InstagramCTA";
import { Footer } from "./Footer";
import { WHATSAPP_PHONE } from "../constants/config";

interface Props {
  products: Product[];
}

export function HellcoreStore({ products }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategorySelection>("Todos");
  const instagramRef = useRef<HTMLDivElement>(null);
  const cartTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!instagramRef.current || !cartTriggerRef.current) return;
      const rect = instagramRef.current.getBoundingClientRect();
      const gap = 16;
      const overlap = window.innerHeight - rect.top;
      cartTriggerRef.current.style.bottom = `${
        overlap > 0 ? overlap + gap : gap
      }px`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    const size = (product as CartItem).selectedSize;
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedSize === size
      );
      if (existing)
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      return [
        ...prev,
        { ...product, quantity: 1, addons: (product as CartItem).addons ?? [] },
      ];
    });
  };

  const removeFromCart = (id: number, size?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === id && item.selectedSize === size
      );
      if (!existing) return prev;
      if (existing.quantity === 1)
        return prev.filter((item) => item !== existing);
      return prev.map((item) =>
        item === existing ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const setCartItem = (
    product: Product,
    quantity: number,
    addons: Addon[],
    size?: string
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedSize === size
      );
      if (existing)
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity, addons, selectedSize: size }
            : item
        );
      return [...prev, { ...product, quantity, addons, selectedSize: size }];
    });
  };

  const total = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          acc + (item.price + calcAddonsTotal(item.addons)) * item.quantity,
        0
      ),
    [cart]
  );

  const totalItems = calcTotalItems(cart);

  const handleSendOrder = (formData: UserInfo) => {
    const phone = WHATSAPP_PHONE;
    const itemsList = cart
      .map((item) => {
        const sizeText = item.selectedSize ? ` [${item.selectedSize}]` : "";
        const addonsText =
          item.addons.length > 0
            ? ` (${item.addons.map((a) => a.name).join(", ")})`
            : "";
        return `• ${item.quantity}x ${
          item.name
        }${sizeText}${addonsText} — R$ ${formatPrice(
          (item.price + calcAddonsTotal(item.addons)) * item.quantity
        )}`;
      })
      .join("\n");

    const changeLine =
      formData.payment === "Dinheiro" && formData.change?.trim()
        ? `💵 *Troco:* ${formData.change}\n\n`
        : "";

    const message = encodeURIComponent(
      `Olá HellCore! Quero fazer um pedido:\n\n` +
        `👤 *Cliente:* ${formData.name}\n` +
        `📍 *Endereço:* ${formData.street}, nº ${formData.number}${
          formData.complement ? `, ${formData.complement}` : ""
        }\n` +
        `🏘️ *Bairro:* ${formData.neighborhood} — ${formData.city}/${formData.state}\n` +
        `📮 *CEP:* ${formData.cep}\n` +
        `📞 *Telefone:* ${formData.phone}\n` +
        `📧 *E-mail:* ${formData.email}\n` +
        `💳 *Pagamento:* ${formData.payment}\n\n` +
        changeLine +
        `🛒 *Itens:*\n${itemsList}\n\n` +
        `💰 *Total: R$ ${formatPrice(total)}*`
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <div className="min-h-screen bg-hellcore-bg text-hellcore-text">
      <Header cartCount={totalItems} onCartOpen={() => setIsCartOpen(true)} />

      <Hero />

      <div className="pb-8">
        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
          counts={categoryCounts}
        />

        <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 pb-28">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-6 gap-y-8 md:gap-y-12">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart
                    .filter((i) => i.id === product.id)
                    .reduce((sum, i) => sum + i.quantity, 0)}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                  onViewDetail={setSelectedProduct}
                  priority={index < 4}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-hellcore-text/50">
              <p className="text-sm font-semibold">
                Nenhum produto nessa categoria.
              </p>
            </div>
          )}
        </main>

        <CartTrigger
          ref={cartTriggerRef}
          cart={cart}
          total={total}
          onOpen={() => setIsCartOpen(true)}
          isVisible={!isCartOpen && !selectedProduct && cart.length > 0}
        />
      </div>

      <div ref={instagramRef}>
        <InstagramCTA />
      </div>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        total={total}
        onClose={() => setIsCartOpen(false)}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onSend={handleSendOrder}
      />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          quantity={
            cart.find((i) => i.id === selectedProduct.id)?.quantity ?? 0
          }
          currentAddons={
            cart.find((i) => i.id === selectedProduct.id)?.addons ?? []
          }
          currentSize={
            cart.find((i) => i.id === selectedProduct.id)?.selectedSize
          }
          onClose={() => setSelectedProduct(null)}
          onSetItem={setCartItem}
        />
      )}
    </div>
  );
}
