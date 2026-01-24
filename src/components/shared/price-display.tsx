import { formatCurrency, formatPrice } from "@/lib/utils/format-currency"
import { cn } from "@/lib/utils"

interface PriceDisplayProps {
  amount: number
  perHour?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
}

export function PriceDisplay({ amount, perHour = false, className, size = "md" }: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl font-semibold",
  }

  return (
    <span className={cn(sizeClasses[size], className)}>
      {perHour ? formatPrice(amount) : formatCurrency(amount)}
    </span>
  )
}
