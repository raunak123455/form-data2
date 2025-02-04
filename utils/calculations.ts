export function calculateTotal(quantity: number, price: number): number {
  return quantity * price
}

export function calculateProfit(total: number, cost: number): number {
  return ((total - cost) / cost) * 100
}

