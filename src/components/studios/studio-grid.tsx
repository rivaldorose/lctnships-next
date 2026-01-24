import { Tables } from "@/types/database.types"
import { StudioCard } from "./studio-card"

type Studio = Tables<"studios"> & {
  studio_images?: Tables<"studio_images">[]
}

interface StudioGridProps {
  studios: Studio[]
  favorites?: string[]
  onToggleFavorite?: (studioId: string) => void
}

export function StudioGrid({ studios, favorites = [], onToggleFavorite }: StudioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {studios.map((studio) => (
        <StudioCard
          key={studio.id}
          studio={studio}
          isFavorite={favorites.includes(studio.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
