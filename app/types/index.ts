export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  detailDescription?: string;
  price: number;
  category: "Camisetas" | "Shapes" | "Bonés" | "Arte Digital";
  images: string[];
  sizes?: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  addons: Addon[];
  selectedSize?: string;
}

export type PaymentMethod = "Pix" | "Dinheiro" | "Cartão (Entregador)";

export interface UserInfo {
  name: string;
  phone: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  payment: PaymentMethod;
  change: string;
}

export interface CartTriggerProps {
  cart: CartItem[];
  total: number;
  onOpen: () => void;
  isVisible: boolean;
}
