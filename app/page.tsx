// TODO: trocar mockProducts por getProducts() após configurar as variáveis de ambiente.
import { mockProducts } from "./lib/mockProducts";
import { HellcoreStore } from "./components/HellcoreStore";

export default function Page() {
  return <HellcoreStore products={mockProducts} />;
}
