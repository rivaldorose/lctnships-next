"use client"

import { useRouter, useSearchParams } from "next/navigation"

const categories = [
  { id: "daylight", icon: "wb_sunny", label: "Daylight" },
  { id: "loft", icon: "apartment", label: "Loft" },
  { id: "film", icon: "movie", label: "Film Set" },
  { id: "cyclorama", icon: "panorama_wide_angle", label: "Cyclorama" },
  { id: "industrial", icon: "factory", label: "Industrial" },
  { id: "podcast", icon: "mic", label: "Booth" },
  { id: "minimalist", icon: "architecture", label: "Minimalist" },
  { id: "historic", icon: "castle", label: "Historic" },
  { id: "photo", icon: "photo_camera", label: "Photo" },
  { id: "video", icon: "videocam", label: "Video" },
  { id: "music", icon: "music_note", label: "Music" },
  { id: "dance", icon: "fitness_center", label: "Dance" },
]

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentType = searchParams.get("type")

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (currentType === categoryId) {
      params.delete("type")
    } else {
      params.set("type", categoryId)
    }
    router.push(`/studios?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2 hide-scrollbar">
      {categories.map((category) => {
        const isActive = currentType === category.id
        return (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center gap-2 min-w-[90px] px-4 py-3 rounded-[2rem] transition-all group ${
              isActive
                ? "bg-white shadow-sm border border-gray-100 ring-2 ring-primary"
                : "hover:bg-white"
            }`}
          >
            <span
              className={`material-symbols-outlined text-[24px] ${
                isActive ? "text-primary" : "text-gray-400 group-hover:text-primary"
              }`}
            >
              {category.icon}
            </span>
            <span
              className={`text-xs font-medium ${
                isActive ? "text-primary font-semibold" : "text-gray-500 group-hover:text-primary"
              }`}
            >
              {category.label}
            </span>
          </button>
        )
      })}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
