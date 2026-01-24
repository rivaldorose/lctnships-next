"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export function HeroSection() {
  const router = useRouter()
  const [activity, setActivity] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (activity) params.set("q", activity)
    if (location) params.set("city", location)
    router.push(`/studios?${params.toString()}`)
  }

  return (
    <section className="px-6 py-4">
      <div
        className="relative min-h-[640px] rounded-[32px] overflow-hidden flex flex-col items-center justify-center p-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2940&auto=format&fit=crop')`,
        }}
      >
        <div className="relative z-10 w-full max-w-4xl text-center">
          <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-sm">
            Your next masterpiece <br /> starts here
          </h1>

          <div className="bg-white p-2 rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto border border-white/20">
            {/* Activity */}
            <div className="flex-1 flex items-center px-6 border-r border-gray-100">
              <span className="material-symbols-outlined text-gray-400 mr-3">search</span>
              <div className="text-left flex flex-col">
                <span className="text-[10px] font-bold uppercase text-gray-400">Activity</span>
                <Input
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full border-none p-0 h-auto focus-visible:ring-0 text-sm font-semibold placeholder:text-gray-300"
                  placeholder="What are you creating?"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex-1 flex items-center px-6 border-r border-gray-100">
              <span className="material-symbols-outlined text-gray-400 mr-3">location_on</span>
              <div className="text-left flex flex-col">
                <span className="text-[10px] font-bold uppercase text-gray-400">Location</span>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border-none p-0 h-auto focus-visible:ring-0 text-sm font-semibold placeholder:text-gray-300"
                  placeholder="Amsterdam"
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex-1 flex items-center px-6">
              <span className="material-symbols-outlined text-gray-400 mr-3">calendar_today</span>
              <div className="text-left flex flex-col">
                <span className="text-[10px] font-bold uppercase text-gray-400">Date</span>
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border-none p-0 h-auto focus-visible:ring-0 text-sm font-semibold placeholder:text-gray-300"
                  placeholder="Add dates"
                />
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={handleSearch}
              className="bg-primary text-white size-14 rounded-full flex items-center justify-center hover:scale-105 transition-transform shrink-0"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
