import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  src?: string | null
  name?: string | null
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function UserAvatar({ src, name, className, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  const initial = name?.charAt(0).toUpperCase() || "U"

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src || undefined} alt={name || "User"} />
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  )
}
