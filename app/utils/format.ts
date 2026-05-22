export function formatPrice(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

export function calcAddonsTotal(addons: { price: number }[]): number {
  return addons.reduce((sum, a) => sum + a.price, 0);
}

export function calcTotalItems(cart: { quantity: number }[]): number {
  return cart.reduce((acc, i) => acc + i.quantity, 0);
}
