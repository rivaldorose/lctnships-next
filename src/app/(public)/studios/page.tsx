import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { MarketplaceSearch } from "@/components/marketplace/marketplace-search"
import { CategoryFilter } from "@/components/marketplace/category-filter"
import { TrendingStudios } from "@/components/marketplace/trending-studios"
import { StudioCard } from "@/components/marketplace/studio-card"

export const metadata = {
  title: "Ontdek Studios | lcntships",
  description: "Vind en boek de perfecte creatieve studio voor jouw project",
}

interface StudiosPageProps {
  searchParams: Promise<{
    q?: string
    type?: string
    city?: string
    date?: string
  }>
}

// Mockup studios for display when database is empty
const mockupStudios = [
  {
    id: "mock-1",
    title: "The Concrete Sanctuary",
    location: "Berlin, Germany",
    price_per_hour: 180,
    studio_type: "industrial",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
  },
  {
    id: "mock-2",
    title: "Industrial Daylight Loft",
    location: "Brooklyn, USA",
    price_per_hour: 155,
    studio_type: "loft",
    images: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800"],
  },
  {
    id: "mock-3",
    title: "Nordic Glass House",
    location: "Stockholm, Sweden",
    price_per_hour: 115,
    studio_type: "daylight",
    images: ["https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800"],
  },
  {
    id: "mock-4",
    title: "Zen Apartment",
    location: "Tokyo, Japan",
    price_per_hour: 320,
    studio_type: "minimalist",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
  },
  {
    id: "mock-5",
    title: "Minimalist Loft",
    location: "Amsterdam, Netherlands",
    price_per_hour: 210,
    studio_type: "loft",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"],
  },
  {
    id: "mock-6",
    title: "Vintage Film Studio",
    location: "Los Angeles, USA",
    price_per_hour: 275,
    studio_type: "film",
    images: ["https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800"],
  },
  {
    id: "mock-7",
    title: "Azure Bay House",
    location: "Santorini, Greece",
    price_per_hour: 450,
    studio_type: "daylight",
    images: ["https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800"],
  },
  {
    id: "mock-8",
    title: "Skyline Penthouse",
    location: "Chicago, USA",
    price_per_hour: 285,
    studio_type: "photo",
    images: ["https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"],
  },
]

async function StudiosContent({ searchParams }: StudiosPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("studios")
    .select("*")
    .or("is_published.eq.true,status.eq.active")
    .order("created_at", { ascending: false })

  if (params.q) {
    query = query.or(`title.ilike.%${params.q}%,location.ilike.%${params.q}%,description.ilike.%${params.q}%`)
  }

  if (params.type) {
    query = query.eq("studio_type", params.type)
  }

  if (params.city) {
    query = query.ilike("location", `%${params.city}%`)
  }

  const { data: studios, error } = await query

  // Use mockup data if no studios found or error
  let displayStudios = studios && studios.length > 0 ? studios : mockupStudios

  // Filter mockup data if type filter is applied
  if ((!studios || studios.length === 0) && params.type) {
    displayStudios = mockupStudios.filter(s => s.studio_type === params.type)
  }

  if (displayStudios.length === 0) {
    return (
      <div className="text-center py-20">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Geen studios gevonden</h3>
        <p className="text-gray-500">Probeer je zoekopdracht aan te passen of verwijder filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {displayStudios.map((studio) => (
        <StudioCard key={studio.id} studio={studio} />
      ))}
    </div>
  )
}

function StudiosSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[4/5] rounded-3xl bg-gray-200 mb-4" />
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  )
}

export default async function StudiosPage(props: StudiosPageProps) {
  const params = await props.searchParams

  return (
    <div className="bg-[#fcfcfc]">
      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-6 py-8 mb-4">
        <Suspense>
          <MarketplaceSearch />
        </Suspense>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-16">
        <Suspense>
          <CategoryFilter />
        </Suspense>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-20">
        <Suspense>
          <TrendingStudios />
        </Suspense>
      </section>

      {(params.city || params.type) && (
        <section className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {params.city && (
              <Link
                href={`/studios?${new URLSearchParams({ type: params.type || "" }).toString()}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
              >
                {params.city}
                <span className="material-symbols-outlined text-base">close</span>
              </Link>
            )}
            {params.type && (
              <Link
                href={`/studios?${new URLSearchParams({ city: params.city || "" }).toString()}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
              >
                {params.type}
                <span className="material-symbols-outlined text-base">close</span>
              </Link>
            )}
            <Link
              href="/studios"
              className="px-5 py-2.5 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
            >
              Clear all
            </Link>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 block mb-2">
              Browse
            </span>
            <h2 className="text-3xl font-bold tracking-tight">All Studios</h2>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <Suspense fallback={<StudiosSkeleton />}>
          <StudiosContent searchParams={props.searchParams} />
        </Suspense>
      </main>

      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
        <button className="w-14 h-14 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform text-gray-600">
          <span className="material-symbols-outlined">chat_bubble</span>
        </button>
        <button className="w-14 h-14 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center hover:scale-110 transition-transform text-gray-600">
          <span className="material-symbols-outlined">share</span>
        </button>
      </div>
    </div>
  )
}
