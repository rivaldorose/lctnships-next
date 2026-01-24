const SERVICE_FEE_PERCENTAGE = 0.15 // 15% platform fee

export interface BookingCalculation {
  totalHours: number
  subtotal: number
  serviceFee: number
  totalAmount: number
  hostPayout: number
}

export function calculateBooking(
  pricePerHour: number,
  startDateTime: Date,
  endDateTime: Date
): BookingCalculation {
  const diffMs = endDateTime.getTime() - startDateTime.getTime()
  const totalHours = Math.ceil(diffMs / (1000 * 60 * 60))

  const subtotal = pricePerHour * totalHours
  const serviceFee = subtotal * SERVICE_FEE_PERCENTAGE
  const totalAmount = subtotal + serviceFee
  const hostPayout = subtotal - (subtotal * SERVICE_FEE_PERCENTAGE)

  return {
    totalHours,
    subtotal: Math.round(subtotal * 100) / 100,
    serviceFee: Math.round(serviceFee * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    hostPayout: Math.round(hostPayout * 100) / 100,
  }
}
