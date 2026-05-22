import { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Tee Sigil Vol.1",
    description: "100% algodão 30.1, corte oversized, serigrafia manual.",
    detailDescription:
      "Camiseta em algodão penteado fio 30.1. Corte oversized com caimento relaxado. Estampa em serigrafia manual com tinta plastisol. Cada peça tem pequenas variações que a tornam única.",
    price: 94.9,
    category: "Camisetas",
    sizes: ["P", "M", "G", "GG"],
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    ],
  },
  {
    id: 2,
    name: "Tee Blackletter",
    description: "Estampa exclusiva lettering, algodão premium 250g.",
    detailDescription:
      "Estampa em blackletter desenhada à mão pelo artista. Algodão pesado 250g com gramatura reforçada. Lavagem fria, não torcer.",
    price: 84.9,
    category: "Camisetas",
    sizes: ["P", "M", "G", "GG"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    ],
  },
  {
    id: 3,
    name: "Tee Acid Ritual",
    description: "Tingimento acid wash manual, peça única numerada.",
    detailDescription:
      "Processo de tingimento acid wash feito inteiramente à mão. Cada peça é numerada e acompanha certificado de autenticidade. Algodão 100%, processo sem cloro.",
    price: 129.9,
    category: "Camisetas",
    sizes: ["P", "M", "G", "GG"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    ],
  },
  {
    id: 4,
    name: "Shape HC-01 — 8.0",
    description: "Shape maple canadense 7 lâminas, arte exclusiva no deck.",
    detailDescription:
      "Shape em maple canadense 7 lâminas prensado a frio. Arte original pintada e silk-screened. Concavidade média. Dimensões: 8.0 x 31.75. Vendido sem truck e sem rodas.",
    price: 219.9,
    category: "Shapes",
    sizes: ["8.0", "8.5"],
    images: [
      "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=600&q=80",
    ],
  },
  {
    id: 5,
    name: "Shape Skull Series — 7.75",
    description: "Edição limitada, arte do artista residente, numerado.",
    detailDescription:
      "Edição limitada de 30 unidades. Arte do artista residente HellCore. Maple canadense 7 lâminas, concavidade baixa para iniciantes. 7.75 x 31.5. Numerado e assinado.",
    price: 249.9,
    category: "Shapes",
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
    ],
  },
  {
    id: 6,
    name: "Snapback HC Core",
    description: "Aba reta, bordado 3D, ajuste snapback, tamanho único.",
    detailDescription:
      "Boné estruturado 6 painéis com aba reta. Bordado 3D exclusivo HellCore Industries na parte frontal. Ajuste snapback plástico traseiro. Tamanho único, serve a maioria dos tamanhos de cabeça.",
    price: 109.9,
    category: "Bonés",
    sizes: ["P/M", "G/GG"],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
    ],
  },
  {
    id: 7,
    name: "Bucket Hat Underground",
    description: "Aba curta, 100% algodão, estampa all-over.",
    detailDescription:
      "Bucket hat em 100% algodão com estampa all-over. Costura reforçada. Aba de 6cm. Lavável à máquina. Tamanhos: P/M e G/GG.",
    price: 89.9,
    category: "Bonés",
    sizes: ["P/M", "G/GG"],
    images: ["https://picsum.photos/seed/hellcore-bucket/600/800"],
  },
  {
    id: 8,
    name: "Print Contrakultura A3",
    description: "Impressão giclée em papel algodão 300g, edição de 50.",
    detailDescription:
      "Impressão giclée de alta qualidade em papel algodão 300g. Edição limitada de 50 unidades, cada uma numerada e assinada pelo artista. Acompanha certificado de autenticidade. Dimensões: A3 (297 × 420mm). Enviado em tubo protetor.",
    price: 149.9,
    category: "Arte Digital",
    images: ["https://picsum.photos/seed/hellcore-print/600/800"],
  },
  {
    id: 9,
    name: "Sticker Pack Vol.1",
    description: "12 adesivos vinil, resistente à água, corte individual.",
    detailDescription:
      "Pack com 12 adesivos em vinil de alta qualidade, resistente à água e ao sol. Corte individual em torno da arte. Tamanhos variados entre 5cm e 10cm. Arte original HellCore Industries.",
    price: 34.9,
    category: "Arte Digital",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ],
  },
];
