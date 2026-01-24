"use client"

import Link from "next/link"

const categories = [
  {
    title: "Photo",
    icon: "photo_camera",
    href: "/studios?type=photo",
  },
  {
    title: "Video",
    icon: "videocam",
    href: "/studios?type=video",
  },
  {
    title: "Podcast",
    icon: "mic",
    href: "/studios?type=podcast",
  },
  {
    title: "Music",
    icon: "music_note",
    href: "/studios?type=music",
  },
  {
    title: "Dance",
    icon: "settings_accessibility",
    href: "/studios?type=dance",
  },
  {
    title: "Creative Spaces",
    icon: "palette",
    href: "/studios?type=creative",
  },
]

export function CategoriesSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 mt-12">
      <div className="flex items-center justify-center gap-16 overflow-x-auto hide-scrollbar py-6 border-b border-gray-100">
        {categories.map((category) => (
          <Link key={category.title} href={category.href}>
            <button className="flex flex-col items-center gap-3 group min-w-max">
              <span className="material-symbols-outlined text-3xl group-hover:text-black text-gray-400 transition-colors">
                {category.icon}
              </span>
              <span className="text-sm font-bold text-gray-500 group-hover:text-black transition-colors">
                {category.title}
              </span>
            </button>
          </Link>
        ))}
      </div>
    </section>
  )
}
