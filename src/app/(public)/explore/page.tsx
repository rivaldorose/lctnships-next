import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Explore Cities | lctnships",
  description: "Find the perfect creative space in your city. Explore premium creative studios, production spaces, and workspaces.",
}

const cities = [
  {
    name: "Amsterdam",
    studioCount: 42,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800",
    slug: "amsterdam",
  },
  {
    name: "Berlin",
    studioCount: 56,
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800",
    slug: "berlin",
  },
  {
    name: "Paris",
    studioCount: 39,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    slug: "paris",
  },
  {
    name: "Rotterdam",
    studioCount: 28,
    image: "https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?w=800",
    slug: "rotterdam",
  },
  {
    name: "Utrecht",
    studioCount: 15,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    slug: "utrecht",
  },
  {
    name: "London",
    studioCount: 64,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    slug: "london",
  },
]

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      <main className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-[#0e181b] tracking-tight text-5xl font-extrabold leading-[1.1] text-center mb-4">
            Find the perfect space in your city
          </h1>
          <p className="text-[#4e8597] text-lg font-medium text-center max-w-2xl mx-auto">
            Explore premium creative studios, production spaces, and workspaces curated for the modern creator.
          </p>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/explore/${city.slug}`}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full border border-white/30">
                  {city.studioCount} Studios
                </span>
              </div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-3xl font-extrabold tracking-tight">{city.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Suggest Section */}
        <section className="max-w-3xl mx-auto py-16 px-8 bg-white rounded-xl shadow-sm border border-[#e7f0f3] text-center">
          <h2 className="text-3xl font-extrabold text-[#0e181b] mb-3">Suggest a city</h2>
          <p className="text-[#4e8597] mb-8 font-medium">
            Don&apos;t see your city yet? Let us know where we should expand next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full max-w-md">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <input
                className="w-full pl-12 pr-6 py-4 rounded-full border-2 border-[#e7f0f3] bg-[#f6f7f8] focus:border-primary focus:ring-0 transition-all text-sm font-semibold"
                placeholder="Enter your city name..."
                type="text"
              />
            </div>
            <button className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-extrabold rounded-full hover:shadow-xl hover:brightness-105 active:scale-95 transition-all">
              Submit Request
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
