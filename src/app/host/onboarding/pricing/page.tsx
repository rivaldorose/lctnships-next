"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function OnboardingPricingPage() {
  const router = useRouter()
  const [hourlyRate, setHourlyRate] = useState(45)
  const [cleaningFee, setCleaningFee] = useState(0)
  const [weekendMarkup, setWeekendMarkup] = useState(15)

  const handleContinue = () => {
    const draft = JSON.parse(localStorage.getItem("studio_draft") || "{}")
    localStorage.setItem(
      "studio_draft",
      JSON.stringify({
        ...draft,
        price_per_hour: hourlyRate,
        cleaning_fee: cleaningFee,
        weekend_markup: weekendMarkup,
      })
    )
    router.push("/host/onboarding/calendar")
  }

  // Calculate estimated earnings
  const estimatedMonthly = hourlyRate * 3 * 10 // 10 bookings of 3 hours each

  return (
    <>
      {/* Header Section */}
      <header className="max-w-5xl w-full mx-auto px-12 pt-16 pb-8">
        <div className="flex flex-col gap-2">
          <p className="text-primary font-bold text-sm tracking-widest uppercase">Step 4: Pricing</p>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Set your pricing</h2>
          <p className="text-gray-500 text-lg">
            Choose a competitive hourly rate to attract more bookings.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="max-w-5xl w-full mx-auto px-12 pb-32 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Pricing Card */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-100 rounded-xl p-10 shadow-sm">
              <div className="flex flex-col gap-12">
                {/* Slider Section */}
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Base Hourly Rate</h3>
                      <p className="text-sm text-gray-500">
                        This is your standard rate for weekday bookings.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-6 py-4 rounded-full border border-gray-200">
                      <span className="text-2xl font-bold text-primary">€</span>
                      <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                        className="bg-transparent text-2xl font-bold w-16 focus:outline-none border-none p-0 text-center"
                      />
                      <span className="text-lg text-gray-400 font-medium">/hr</span>
                    </div>
                  </div>
                  <div className="relative pt-4">
                    <input
                      type="range"
                      min="15"
                      max="500"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full h-2 bg-primary/20 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between mt-4 text-sm font-medium text-gray-400 px-1">
                      <span>€15</span>
                      <span>€500+</span>
                    </div>
                  </div>
                </div>

                {/* Extra Fees */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold">Extra Fees & Markups</h3>
                  <div className="flex flex-col gap-4">
                    {/* Cleaning Fee */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-full border border-gray-100">
                      <div className="flex items-center gap-4 pl-4">
                        <span className="material-symbols-outlined text-primary">cleaning_services</span>
                        <span className="font-medium">Cleaning Fee</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white border border-gray-200 px-4 py-2 rounded-full">
                        <span className="text-sm text-gray-400">€</span>
                        <input
                          type="number"
                          value={cleaningFee}
                          onChange={(e) => setCleaningFee(Number(e.target.value))}
                          className="w-12 bg-transparent border-none p-0 text-center text-sm font-bold focus:ring-0"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Weekend Markup */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-full border border-gray-100">
                      <div className="flex items-center gap-4 pl-4">
                        <span className="material-symbols-outlined text-primary">calendar_today</span>
                        <span className="font-medium">Weekend Markup</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white border border-gray-200 px-4 py-2 rounded-full">
                        <input
                          type="number"
                          value={weekendMarkup}
                          onChange={(e) => setWeekendMarkup(Number(e.target.value))}
                          className="w-12 bg-transparent border-none p-0 text-center text-sm font-bold focus:ring-0"
                          placeholder="15"
                        />
                        <span className="text-sm text-gray-400">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Tips */}
          <aside className="flex flex-col gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 text-primary p-2 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined">insights</span>
                </div>
                <h2 className="text-lg font-bold">Pricing Tips</h2>
              </div>
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Local Market Data
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Average in your area</span>
                      <span className="font-bold">€42/hr</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Top 10% earners</span>
                      <span className="font-bold text-primary">€65+/hr</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">recommend</span>
                    Recommended Price
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">
                    Studios similar to yours usually start at{" "}
                    <span className="font-bold text-primary">€45/hr</span>.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Earnings Estimator
                  </p>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">€{estimatedMonthly.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">
                      Estimated monthly income based on 10 bookings of 3 hours each.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Protection Card */}
            <div className="bg-primary text-white rounded-xl p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold mb-2">Host Guarantee</h3>
                <p className="text-sm opacity-90 leading-relaxed mb-4">
                  Your studio is protected against accidental damage up to €1M.
                </p>
                <Link href="/host/protection" className="text-sm font-bold underline hover:opacity-80">
                  Learn more
                </Link>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <span className="material-symbols-outlined text-[160px]">verified_user</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Sticky Footer Action */}
      <footer className="fixed bottom-0 right-0 left-80 bg-white/80 backdrop-blur-md border-t border-gray-200 p-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6">
          <Link
            href="/host/onboarding/equipment"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </Link>
          <button
            onClick={handleContinue}
            className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-primary/25 transition-all flex items-center gap-3"
          >
            Continue to Calendar
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </button>
        </div>
      </footer>
    </>
  )
}
