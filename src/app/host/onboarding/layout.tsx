"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const steps = [
  { id: "basics", icon: "info", title: "Basics", href: "/host/onboarding" },
  { id: "media", icon: "image", title: "Media", href: "/host/onboarding/media" },
  { id: "equipment", icon: "inventory_2", title: "Equipment", href: "/host/onboarding/equipment" },
  { id: "pricing", icon: "payments", title: "Pricing", href: "/host/onboarding/pricing" },
  { id: "calendar", icon: "calendar_today", title: "Calendar", href: "/host/onboarding/calendar" },
]

function getProgress(pathname: string) {
  if (pathname === "/host/onboarding") return 20
  if (pathname.includes("media")) return 40
  if (pathname.includes("equipment")) return 60
  if (pathname.includes("pricing")) return 80
  if (pathname.includes("calendar")) return 100
  return 20
}

function getCurrentStep(pathname: string) {
  if (pathname === "/host/onboarding") return "basics"
  if (pathname.includes("media")) return "media"
  if (pathname.includes("equipment")) return "equipment"
  if (pathname.includes("pricing")) return "pricing"
  if (pathname.includes("calendar")) return "calendar"
  return "basics"
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const progress = getProgress(pathname)
  const currentStep = getCurrentStep(pathname)

  return (
    <div className="flex min-h-screen bg-[#f6f6f8]">
      {/* Sidebar Navigation */}
      <aside className="w-80 border-r border-gray-200 bg-white flex flex-col p-8 fixed h-full">
        <Link href="/" className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
            <span className="material-symbols-outlined">rocket_launch</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold leading-tight tracking-tight">lcntships</h1>
            <p className="text-xs text-gray-500 font-medium">Host Dashboard</p>
          </div>
        </Link>

        <nav className="flex flex-col gap-2 flex-1">
          {steps.map((step) => {
            const isActive = currentStep === step.id
            const stepIndex = steps.findIndex((s) => s.id === step.id)
            const currentIndex = steps.findIndex((s) => s.id === currentStep)
            const isCompleted = stepIndex < currentIndex

            return (
              <Link
                key={step.id}
                href={step.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-full transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : isCompleted
                    ? "text-green-600 hover:bg-gray-100"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? "active-icon" : ""}`}>
                  {isCompleted ? "check_circle" : step.icon}
                </span>
                <p className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{step.title}</p>
                {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-primary"></div>}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Setup Progress</p>
            <p className="text-xs font-bold text-primary">{progress}%</p>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-80 flex-1 flex flex-col min-h-screen">{children}</main>
    </div>
  )
}
