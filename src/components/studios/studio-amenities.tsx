import { Tables } from "@/types/database.types"
import { AMENITIES } from "@/lib/constants/amenities"
import {
  Wifi,
  Car,
  Wind,
  UtensilsCrossed,
  Bath,
  DoorOpen,
  Speaker,
  Lightbulb,
  Image,
  Box,
  Square,
  Sparkles,
  Shirt,
  Coffee,
  Accessibility,
  Check,
} from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wifi,
  Car,
  Wind,
  UtensilsCrossed,
  Bath,
  DoorOpen,
  Speaker,
  Lightbulb,
  Image,
  Box,
  Square,
  Sparkles,
  Shirt,
  Coffee,
  Accessibility,
}

interface StudioAmenitiesProps {
  amenities: Tables<"studio_amenities">[]
}

export function StudioAmenities({ amenities }: StudioAmenitiesProps) {
  if (amenities.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Faciliteiten</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => {
          const amenityConfig = AMENITIES.find((a) => a.value === amenity.amenity)
          const Icon = amenityConfig?.icon ? iconMap[amenityConfig.icon] : Check

          return (
            <div key={amenity.id} className="flex items-center gap-3">
              {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
              <span>{amenityConfig?.label || amenity.amenity}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
