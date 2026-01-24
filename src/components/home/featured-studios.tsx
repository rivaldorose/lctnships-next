import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"

const fallbackStudios = [
  {
    id: "1",
    title: "The Glass House",
    location: "Shoreditch, London",
    price_per_hour: 45,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800"],
  },
  {
    id: "2",
    title: "Industrial Loft 04",
    location: "Kreuzberg, Berlin",
    price_per_hour: 65,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800"],
  },
  {
    id: "3",
    title: "Minimalist Gallery",
    location: "Marais, Paris",
    price_per_hour: 80,
    rating: 5.0,
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800"],
  },
  {
    id: "4",
    title: "Daylight Studio A",
    location: "Brooklyn, NYC",
    price_per_hour: 55,
    rating: 4.9,
    images: ["https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=800"],
  },
]

export async function FeaturedStudios() {
  const supabase = await createClient()

  const { data: dbStudios } = await supabase
    .from("studios")
    .select("*")
    .eq("status", "active")
    .order("rating", { ascending: false })
    .limit(4)

  const studios = dbStudios && dbStudios.length > 0 ? dbStudios.map(s => ({
    id: s.id,
    title: s.title,
    location: s.location,
    price_per_hour: s.price_per_hour,
    rating: s.rating || 0,
    images: s.images || [],
  })) : fallbackStudios

  return (
    <section className="max-w-[1440px] mx-auto px-8 mt-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Featured Studios</h2>
          <p className="text-gray-500 mt-2">Curated premium spaces for your next project</p>
        </div>
        <Link
          href="/studios"
          className="text-sm font-bold flex items-center gap-2 group underline-offset-4 hover:underline"
        >
          Explore all studios{" "}
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {studios.map((studio) => (
          <Link key={studio.id} href={`/studios/${studio.id}`} className="group cursor-pointer">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-4 bg-gray-100">
              <Image
                src={studio.images?.[0] || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800"}
                alt={studio.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <button className="absolute top-5 right-5 size-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                <span className="material-symbols-outlined text-xl">favorite</span>
              </button>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{studio.title}</h3>
                <p className="text-gray-500 text-sm">{studio.location}</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-yellow-400 filled">star</span>
                <span className="text-sm font-bold">{studio.rating?.toFixed(1) || "0.0"}</span>
              </div>
            </div>
            <p className="mt-2 font-bold text-sm">From €{studio.price_per_hour}/h</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
