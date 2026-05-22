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
}

export interface CartItem extends Product {
  quantity: number;
  addons: Addon[];
}

export type PaymentMethod = "Pix" | "Dinheiro" | "Cartão (Entregador)";

export interface UserInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  payment: PaymentMethod;
  change: string;
}

export interface CartTriggerProps {
  cart: CartItem[];
  total: number;
  onOpen: () => void;
  isVisible: boolean;
}
