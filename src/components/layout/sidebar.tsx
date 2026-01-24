"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  FolderOpen,
  Heart,
  MessageSquare,
  Bell,
  User,
  Settings,
  Home,
  Building2,
  DollarSign,
  Star,
} from "lucide-react"

interface SidebarProps {
  variant?: "user" | "host"
}

const userNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/bookings", label: "Boekingen", icon: Calendar },
  { href: "/projects", label: "Projecten", icon: FolderOpen },
  { href: "/favorites", label: "Favorieten", icon: Heart },
  { href: "/messages", label: "Berichten", icon: MessageSquare },
  { href: "/notifications", label: "Notificaties", icon: Bell },
  { href: "/profile", label: "Profiel", icon: User },
  { href: "/settings", label: "Instellingen", icon: Settings },
]

const hostNavItems = [
  { href: "/host/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/host/studios", label: "Mijn Studios", icon: Building2 },
  { href: "/host/bookings", label: "Boekingen", icon: Calendar },
  { href: "/host/reviews", label: "Reviews", icon: Star },
  { href: "/host/payouts", label: "Inkomsten", icon: DollarSign },
]

export function Sidebar({ variant = "user" }: SidebarProps) {
  const pathname = usePathname()
  const navItems = variant === "host" ? hostNavItems : userNavItems

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-background">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">LCNTSHIPS</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {variant === "host" && (
          <div className="mb-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <Home className="h-4 w-4" />
              Terug naar User
            </Link>
          </div>
        )}

        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {variant === "user" && (
        <div className="p-4 border-t">
          <Link
            href="/host/dashboard"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <Building2 className="h-4 w-4" />
            Switch naar Host
          </Link>
        </div>
      )}
    </aside>
  )
}
