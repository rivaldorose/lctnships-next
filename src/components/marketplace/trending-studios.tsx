import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"

const mockupTrending = [
  {
    id: "trending-1",
    title: "The Concrete Sanctuary",
    location: "Berlin, Germany",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
  },
  {
    id: "trending-2",
    title: "Industrial Daylight Loft",
    location: "Brooklyn, USA",
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"],
  },
  {
    id: "trending-3",
    title: "Nordic Glass House",
    location: "Stockholm, Sweden",
    images: ["https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800"],
  },
]

export async function TrendingStudios() {
  const supabase = await createClient()

  const { data: studios } = await supabase
    .from("studios")
    .select("*")
    .or("is_published.eq.true,status.eq.active")
    .order("created_at", { ascending: false })
    .limit(3)

  // Use mockup data if no studios found
  const displayStudios = studios && studios.length > 0 ? studios : mockupTrending

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 block mb-2">
            Curated selection
          </span>
          <h2 className="text-3xl font-bold tracking-tight">Trending Studios</h2>
        </div>
        <Link
          href="/studios"
          className="text-sm font-semibold border-b-2 border-primary/10 hover:border-primary transition-colors pb-1"
        >
          View all trending
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayStudios.map((studio) => (
          <Link
            key={studio.id}
            href={`/studios/${studio.id}`}
            className="group relative aspect-[16/10] overflow-hidden rounded-[2.5rem] cursor-pointer shadow-2xl shadow-gray-200/20"
          >
            {studio.images?.[0] ? (
              <Image
                src={studio.images[0]}
                alt={studio.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-white/50">image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-2xl font-bold text-white mb-1">{studio.title}</h3>
              <p className="text-white/80 text-sm font-medium">{studio.location}</p>
            </div>
            <div className="absolute top-6 right-6">
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
                Premier
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
