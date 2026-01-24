export function formatCurrency(amount: number, currency: string = 'EUR') {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatPrice(pricePerHour: number) {
  return `${formatCurrency(pricePerHour)}/uur`
}
