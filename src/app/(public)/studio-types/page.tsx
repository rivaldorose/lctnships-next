import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Studio Types | lctnships",
  description: "Discover professional environments tailored to your unique craft, from high-ceiling video stages to acoustically treated podcast suites.",
}

const studioTypes = [
  {
    name: "Photo Studios",
    slug: "photo",
    description: "Natural light sanctuaries and professional lighting setups designed for high-end fashion, product, and portrait photography.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9euDh_7xwMYsYRffDo28FChSTv-yO3mfd80PS86fWsfExQOMd65HCwPmRC7eZ_IHFfVYLw6l82f5cpgEltt1ONYV1QAx-p2Yw4D7j3BuXoZrYVNz8cerGEFWWXiJJYo1-5GcHiURNqGZkB4b8hET1ry5Bw1MxWGJVgopM9j-VwlekfkjwqhGUc8JCWDYfASCqETIQwCNlIqxzYgoXhMtESZY7XuQOeJ1ztHdkkN7NV_MqXqxvA26p8anMOsinqSaNvPMDg8VLcS8",
    features: ["Cycloramas & Backdrops", "Profoto/Broncolor Rental", "North-facing Windows"],
  },
  {
    name: "Video Studios",
    slug: "video",
    description: "Massive industrial spaces with high ceilings, soundproofing, and enough power to run any production rig.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwBz7yqWnaZJ80UK8IRj8ch4QjkyiorNuKpxplTPsOs2qxuK2Z9ep93IornlyepLPxowpiA4FNzjPDXQBJgRIoN_NzgmTWaZaf2UCwI1BeQDeoDLs18ovErDsWbLgQavCT74vxH7MkKfkB1EGYFNXTRAzzsbnNfEBUmTDWR5gYc06Kxe2q5B8_dLn67pbs6YuQokJ-dE0Joauy-WQr5NK380QtcgGguT3niegQa6jfYvUkZHcSc6bK6ix_JqbBGbiULhAXvHs_Al0",
    features: ["Soundproofing & Quiet HVAC", "12ft+ Ceilings", "3-phase Power Supply"],
  },
  {
    name: "Podcast Studios",
    slug: "podcast",
    description: "Acoustically treated environments optimized for voice recording, featuring multi-camera setups for video podcasts.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZ4j8c84D4xRcCNpT-MEkIDHL2BGHhiLuuJqKWKHHsS43B7WpZ8iEjk_Iaf7tAXtB6Zna25Bq7U8ROg_v5aeEeQtqvme0AZh6UPeK00NvbewByq-TLlot6aHLum0vB8Fd-m8r5E6HRU5gYFmg-nKwkOjKR3Na0ZpGpNeFaShB9QqS1FcniZm-FbDerHyvrVVWoqkxk8xKegjugcVAY7hAVKNpNnsj0ujZzDjsWkwD7JTg8g5kbc7cDpKyqTli0xaWhiqDapy6syFk",
    features: ["XLR Setups & Mixers", "Acoustic Treatment", "Multi-mic Configs"],
  },
  {
    name: "Music Studios",
    slug: "music",
    description: "High-fidelity sound labs featuring vocal booths, isolation rooms, and top-tier outboard gear for perfect tracks.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwWp3JhQqlJTK_2xbJNmelqdI8lpRpnh3J_36l5XSXEpRw_lWwg-Fv1IHCp3aIjhAydCH69r0ufz2xbV5CenR1kMt3fCwZHHi5maxgwhvFkwVIHRr9o8N_SwVLr1XYLwseoVlhqGNPpADunvyi1QtkV4Ouwj22AikXXWMPxQI4XgxUarS0YG8JdxB7iCDOlneCn3ZQe3rnGudBwNcAY3GgzRgZqUBDZc0ngHN1T3HxltB86EaZ4PGwYs21Y8RfpH5NHx46sJr6ksg",
    features: ["Vocal Isolation Booths", "Premium Outboard Gear", "Monitoring & Instruments"],
  },
  {
    name: "Dance Studios",
    slug: "dance",
    description: "Open, energetic spaces with sprung floors and full-length mirrors, perfect for rehearsals, choreography, or workshops.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFZCYWteScqJIUqEGe7EGrZFoWfNfrqgRZKSAgLRJC992W9dfgM-P_p4mEfKgrF420vgvQ7QcutvfkaLVJIeZyy-ifgcM3aUjO6HrPP3IEM9uNTXIH-eT_rNtAZLgaFw720Mdabq7X53XTqRHQs8pq7w2CVrsjVwJi6J1KO3fHVQy8c93Qkd-N4SsLtkdKJC65pOw2EEXVfLreXmSRQeXRLwxBGbtecuDuzXeylobzBYJCg2KF3dSSr222MAGPcr2GkIRaR_0kwc4",
    features: ["Professional Sprung Floors", "Wall-to-Wall Mirrors", "Hi-Fi Sound Systems"],
  },
]

export default function StudioTypesPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto">
            The perfect space for every creative vision.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover professional environments tailored to your unique craft, from high-ceiling video stages to acoustically treated podcast suites.
          </p>
        </div>

        {/* Category Headline */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Studio Categories</h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studioTypes.map((studio) => (
            <div
              key={studio.slug}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[16/9] w-full relative">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{studio.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  {studio.description}
                </p>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 mb-8 grow">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                    What to look for:
                  </p>
                  <ul className="space-y-2">
                    {studio.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/studios?type=${studio.slug}`}
                  className="w-full bg-primary text-white font-bold py-4 rounded-full transition-opacity hover:opacity-90 text-center"
                >
                  Find {studio.name}
                </Link>
              </div>
            </div>
          ))}

          {/* CTA Card */}
          <div className="bg-primary text-white flex flex-col justify-center items-center p-12 text-center rounded-[32px] shadow-lg transform hover:scale-[1.02] transition-transform">
            <svg className="w-16 h-16 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-3xl font-black mb-4 leading-tight">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="text-white/80 mb-8 max-w-xs mx-auto">
              Our concierge team can help you find bespoke spaces for specialized needs.
            </p>
            <Link
              href="/help"
              className="bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
