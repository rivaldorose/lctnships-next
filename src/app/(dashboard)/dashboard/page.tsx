"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const activityTypes = [
  {
    icon: "photo_camera",
    title: "Photography",
    description: "Fashion, portrait, product, and commercial shoots.",
  },
  {
    icon: "videocam",
    title: "Film & Video",
    description: "Music videos, interviews, and cinematic productions.",
  },
  {
    icon: "mic",
    title: "Podcast & Audio",
    description: "Professional sound recording and voice-over booths.",
  },
  {
    icon: "music_note",
    title: "Music Production",
    description: "Mix, master, and record with top-tier gear.",
  },
  {
    icon: "settings_accessibility",
    title: "Dance & Movement",
    description: "Sprung floors and mirror walls for rehearsals.",
  },
  {
    icon: "palette",
    title: "Art & Gallery",
    description: "Pop-up exhibitions and fine art ateliers.",
  },
]

const categories = [
  { icon: "photo_camera", label: "Photo" },
  { icon: "videocam", label: "Video" },
  { icon: "mic", label: "Podcast" },
  { icon: "music_note", label: "Music" },
  { icon: "settings_accessibility", label: "Dance" },
  { icon: "palette", label: "Creative Spaces" },
]

const featuredStudios = [
  {
    id: "1",
    title: "The Glass House",
    location: "Shoreditch, London",
    rating: 4.9,
    price: 45,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  },
  {
    id: "2",
    title: "Industrial Loft 04",
    location: "Kreuzberg, Berlin",
    rating: 4.8,
    price: 65,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
  },
  {
    id: "3",
    title: "Minimalist Gallery",
    location: "Marais, Paris",
    rating: 5.0,
    price: 80,
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800",
  },
  {
    id: "4",
    title: "Daylight Studio A",
    location: "Brooklyn, NYC",
    rating: 4.9,
    price: 55,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
  },
]

const portfolioImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
]

export default function DashboardPage() {
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState("")

  const handleActivitySelect = (activity: string) => {
    setSelectedActivity(activity)
    setShowActivityModal(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Activity Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-32 px-6">
          <div
            className="absolute inset-0 bg-black/5 backdrop-blur-sm"
            onClick={() => setShowActivityModal(false)}
          />
          <div className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] p-10 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">What are you creating?</h2>
              <button
                onClick={() => setShowActivityModal(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {activityTypes.map((activity) => (
                <button
                  key={activity.title}
                  onClick={() => handleActivitySelect(activity.title)}
                  className="flex flex-col items-start p-6 rounded-3xl border border-gray-50 hover:bg-gray-50 hover:border-gray-100 transition-all group text-left"
                >
                  <div className="size-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl text-primary">
                      {activity.icon}
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 mb-1">{activity.title}</span>
                  <span className="text-xs text-gray-500 leading-relaxed">
                    {activity.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-6 py-4">
        <div
          className="relative min-h-[640px] rounded-[32px] overflow-hidden flex flex-col items-center justify-center p-8 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920')`,
          }}
        >
          <div className="relative z-10 w-full max-w-4xl text-center">
            <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-sm">
              Your next masterpiece <br /> starts here
            </h1>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto border border-white/20">
              <button
                onClick={() => setShowActivityModal(true)}
                className="flex-1 flex items-center px-6 border-r border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors rounded-l-full h-14"
              >
                <span className="material-symbols-outlined text-gray-400 mr-3">search</span>
                <div className="text-left flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Activity</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {selectedActivity || "What are you creating?"}
                  </span>
                </div>
              </button>

              <div className="flex-1 flex items-center px-6 border-r border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors h-14">
                <span className="material-symbols-outlined text-gray-400 mr-3">location_on</span>
                <div className="text-left flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Location</span>
                  <span className="text-sm font-semibold text-gray-300">Near Amsterdam</span>
                </div>
              </div>

              <div className="flex-1 flex items-center px-6 cursor-pointer hover:bg-gray-50 transition-colors h-14">
                <span className="material-symbols-outlined text-gray-400 mr-3">calendar_today</span>
                <div className="text-left flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-gray-400">Date</span>
                  <span className="text-sm font-semibold text-gray-300">Add dates</span>
                </div>
              </div>

              <Link
                href="/studios"
                className="bg-primary text-white size-14 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-[1440px] mx-auto px-8 mt-12">
        <div className="flex items-center gap-10 overflow-x-auto hide-scrollbar py-4 border-b border-gray-50">
          {categories.map((category) => (
            <Link
              key={category.label}
              href={`/studios?type=${category.label.toLowerCase()}`}
              className="flex flex-col items-center gap-2 group min-w-max"
            >
              <span className="material-symbols-outlined text-2xl group-hover:text-black text-gray-400 transition-colors">
                {category.icon}
              </span>
              <span className="text-xs font-bold text-gray-500 group-hover:text-black">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Studios */}
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
            Explore all studios
            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredStudios.map((studio) => (
            <Link key={studio.id} href={`/studios/${studio.id}`} className="group cursor-pointer">
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-4 bg-gray-100">
                <Image
                  src={studio.image}
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
                  <span className="material-symbols-outlined text-[16px] text-yellow-400">
                    star
                  </span>
                  <span className="text-sm font-bold">{studio.rating}</span>
                </div>
              </div>
              <p className="mt-2 font-bold text-sm">From €{studio.price}/h</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Built for Creators */}
      <section className="max-w-[1440px] mx-auto px-8 mt-32 py-20 bg-gray-50 rounded-[32px]">
        <h2 className="text-center text-3xl font-extrabold tracking-tight mb-16">
          Built for Creators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-10">
          <div className="text-center flex flex-col items-center">
            <div className="size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">verified</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Verified Studios</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Every space is personally vetted by our team to ensure it meets professional
              standards.
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">bolt</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Seamless scheduling and secure payments so you can focus on your creative vision.
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="size-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl text-primary">camera</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Professional Gear</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Access high-end lighting, backdrops, and technical equipment in every location.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="max-w-[1440px] mx-auto px-8 mt-32">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight">Made with lcntships</h2>
          <p className="text-gray-500 mt-2">Work created by our community in our partner studios</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="grid gap-4">
            <div className="relative w-full h-64 rounded-[32px] overflow-hidden">
              <Image
                src={portfolioImages[0]}
                alt="Portfolio 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-96 rounded-[32px] overflow-hidden">
              <Image
                src={portfolioImages[1]}
                alt="Portfolio 2"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative w-full h-80 rounded-[32px] overflow-hidden">
              <Image
                src={portfolioImages[2]}
                alt="Portfolio 3"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-80 rounded-[32px] overflow-hidden">
              <Image
                src={portfolioImages[3]}
                alt="Portfolio 4"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative w-full h-96 rounded-[32px] overflow-hidden">
              <Image
                src={portfolioImages[4]}
                alt="Portfolio 5"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-64 rounded-[32px] overflow-hidden">
              <Image
                src={portfolioImages[5]}
                alt="Portfolio 6"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="relative w-full h-64 rounded-[32px] overflow-hidden">
              <Image
                src={portfolioImages[6]}
                alt="Portfolio 7"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-96 rounded-[32px] overflow-hidden">
              <Image
                src={portfolioImages[7]}
                alt="Portfolio 8"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Become a Host CTA */}
      <section className="max-w-[1440px] mx-auto px-8 mt-32 mb-20">
        <div className="relative h-[480px] rounded-[32px] overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
            alt="Host background"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-8 max-w-2xl">
              Share your space with the creative world
            </h2>
            <Link
              href="/host/onboarding"
              className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              List your studio
            </Link>
          </div>
        </div>
      </section>

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
