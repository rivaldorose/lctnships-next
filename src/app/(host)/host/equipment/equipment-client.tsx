"use client"

import { useState } from "react"
import Link from "next/link"

interface Studio {
  id: string
  title: string
}

interface EquipmentClientProps {
  studios: Studio[]
}

type ConditionType = "new" | "used" | "good"

export function EquipmentClient({ studios }: EquipmentClientProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [dailyPrice, setDailyPrice] = useState("")
  const [condition, setCondition] = useState<ConditionType>("new")
  const [description, setDescription] = useState("")
  const [selectedStudio, setSelectedStudio] = useState("")
  const [images, setImages] = useState<string[]>([])

  const categories = [
    { id: "cameras", label: "Cameras" },
    { id: "lighting", label: "Lighting" },
    { id: "lenses", label: "Lenses" },
    { id: "grip", label: "Grip & Electric" },
    { id: "audio", label: "Audio Gear" },
    { id: "monitors", label: "Monitors" },
    { id: "accessories", label: "Accessories" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit equipment to database
    console.log({ name, category, dailyPrice, condition, description, selectedStudio, images })
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-gray-500">
        <Link href="/host/dashboard" className="hover:text-primary transition-colors">
          Host Dashboard
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link href="/host/equipment" className="hover:text-primary transition-colors">
          My Inventory
        </Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-gray-900">Add New Gear</span>
      </nav>

      {/* Page Heading */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Add to Inventory</h1>
        <p className="text-gray-500 text-lg">
          List your professional equipment for the creative community.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Upload Area */}
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">Gear Visuals</h3>
            <p className="text-sm text-gray-500">
              Upload up to 5 high-resolution images of your equipment.
            </p>
          </div>

          {/* Upload Zone */}
          <div className="relative group">
            <div
              className="w-full aspect-square flex flex-col items-center justify-center bg-white hover:bg-primary/5 transition-all cursor-pointer group-hover:scale-[1.01] border-2 border-dashed border-primary"
              style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
            >
              <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">cloud_upload</span>
              </div>
              <p className="text-lg font-bold mb-1">Drag & drop your photos</p>
              <p className="text-sm text-gray-400">or click to browse local files</p>
            </div>
          </div>

          {/* Preview Grid */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-primary/50 hover:text-primary/50 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">add</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400 px-2">
                  Equipment Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-full border-gray-200 bg-gray-50 px-6 py-4 focus:ring-primary focus:border-primary placeholder:text-gray-300 transition-all"
                  placeholder="e.g. ARRI Alexa Mini LF"
                />
              </div>

              {/* Category Dropdown */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400 px-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-full border-gray-200 bg-gray-50 px-6 py-4 focus:ring-primary focus:border-primary transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Studio Assignment */}
              {studios.length > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-400 px-2">
                    Assign to Studio
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStudio}
                      onChange={(e) => setSelectedStudio(e.target.value)}
                      className="w-full appearance-none rounded-full border-gray-200 bg-gray-50 px-6 py-4 focus:ring-primary focus:border-primary transition-all"
                    >
                      <option value="">Select a studio (optional)</option>
                      {studios.map((studio) => (
                        <option key={studio.id} value={studio.id}>
                          {studio.title}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      expand_more
                    </span>
                  </div>
                </div>
              )}

              {/* Price & Condition Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-400 px-2">
                    Daily Price (€)
                  </label>
                  <input
                    type="number"
                    value={dailyPrice}
                    onChange={(e) => setDailyPrice(e.target.value)}
                    className="w-full rounded-full border-gray-200 bg-gray-50 px-6 py-4 focus:ring-primary focus:border-primary placeholder:text-gray-300 transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-400 px-2">
                    Condition
                  </label>
                  <div className="flex bg-gray-50 p-1 rounded-full border border-gray-200">
                    {(["new", "used", "good"] as ConditionType[]).map((cond) => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setCondition(cond)}
                        className={`flex-1 text-xs font-bold py-3 rounded-full transition-all ${
                          condition === cond
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        {cond === "new" ? "New" : cond === "used" ? "Used" : "Good"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description Box */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold uppercase tracking-wider text-gray-400 px-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border-gray-200 bg-gray-50 px-6 py-4 focus:ring-primary focus:border-primary placeholder:text-gray-300 transition-all resize-none"
                  placeholder="Mention accessories, special specs, or handling requirements..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex flex-col items-center gap-4">
              <button
                type="submit"
                className="w-full md:w-auto min-w-[280px] bg-gray-900 text-white font-bold text-lg py-5 px-10 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
              >
                <span>Add to Inventory</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <Link
                href="/host/equipment"
                className="text-gray-400 hover:text-gray-600 transition-colors text-sm font-bold"
              >
                Cancel and Discard
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
