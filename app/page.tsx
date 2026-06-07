export const dynamic = "force-dynamic";

import { HellcoreStore } from "./components/HellcoreStore";
import { getProducts } from "./lib/sheets";

export default async function Page() {
  const products = await getProducts();
  return <HellcoreStore products={products} />;
}
