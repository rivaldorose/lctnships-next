"use client"

import { useState } from "react"
import Link from "next/link"

type NotificationType = "all" | "bookings" | "messages" | "projects"

interface Notification {
  id: string
  type: "booking" | "message" | "review" | "project"
  title: string
  description: string
  time: string
  isRead: boolean
  actionLabel?: string
  actionHref?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "New booking request for Studio A",
    description: "Alex requested a full-day booking for next Friday in the Loft Space.",
    time: "2m ago",
    isRead: false,
    actionLabel: "Review",
    actionHref: "/bookings/1",
  },
  {
    id: "2",
    type: "message",
    title: "Alex sent you a message",
    description: '"Is there a backdrop stand available in the studio?"',
    time: "15m ago",
    isRead: false,
    actionLabel: "Reply",
    actionHref: "/messages",
  },
  {
    id: "3",
    type: "review",
    title: "You received a 5-star rating",
    description: '"The lighting in this space is phenomenal for high-key fashion."',
    time: "2h ago",
    isRead: true,
  },
  {
    id: "4",
    type: "project",
    title: "Project 'Spring Collection' updated",
    description: "3 new files were uploaded to the project asset folder.",
    time: "Yesterday",
    isRead: true,
  },
]

const typeIcons: Record<Notification["type"], { icon: string; bgClass: string; textClass: string }> = {
  booking: {
    icon: "calendar_today",
    bgClass: "bg-primary/10",
    textClass: "text-primary",
  },
  message: {
    icon: "chat_bubble",
    bgClass: "bg-indigo-100 dark:bg-indigo-900/30",
    textClass: "text-indigo-600 dark:text-indigo-400",
  },
  review: {
    icon: "star",
    bgClass: "bg-amber-100 dark:bg-amber-900/30",
    textClass: "text-amber-600 dark:text-amber-400",
  },
  project: {
    icon: "account_tree",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
    textClass: "text-emerald-600 dark:text-emerald-400",
  },
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<NotificationType>("all")
  const [notifications, setNotifications] = useState(mockNotifications)

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true
    if (filter === "bookings") return n.type === "booking"
    if (filter === "messages") return n.type === "message"
    if (filter === "projects") return n.type === "project" || n.type === "review"
    return true
  })

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  if (notifications.length === 0) {
    return <NotificationsEmptyState />
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-black leading-tight tracking-tight">Notifications</h1>
          <p className="text-gray-500 mt-2 font-medium">
            Manage your studio alerts and activity hub.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="group flex items-center gap-2 px-6 h-12 bg-white rounded-full border border-gray-200 hover:border-primary transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-lg text-gray-400 group-hover:text-primary transition-colors">
              done_all
            </span>
            <span className="text-sm font-bold">Mark all as read</span>
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
        {(["all", "bookings", "messages", "projects"] as NotificationType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`flex h-10 shrink-0 items-center justify-center rounded-full px-6 transition-all ${
              filter === type
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "bg-white border border-gray-100 text-gray-900 hover:bg-gray-50"
            }`}
          >
            <span className={`text-sm ${filter === type ? "font-bold" : "font-semibold"}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-4">
        {filteredNotifications.map((notification) => {
          const iconConfig = typeIcons[notification.type]
          return (
            <div
              key={notification.id}
              className={`relative group flex items-center justify-between gap-6 p-6 rounded-2xl transition-all border ${
                notification.isRead
                  ? "bg-gray-50 border-gray-100 opacity-80 hover:opacity-100"
                  : "bg-white border-transparent hover:shadow-xl hover:shadow-gray-200/50 hover:border-primary/20"
              }`}
            >
              {/* Unread Indicator Dot */}
              {!notification.isRead && (
                <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_0_4px_white] z-10" />
              )}

              <div className="flex items-center gap-5 flex-1">
                <div
                  className={`flex items-center justify-center rounded-2xl shrink-0 size-14 ${iconConfig.bgClass} ${iconConfig.textClass}`}
                >
                  <span className="material-symbols-outlined text-2xl">{iconConfig.icon}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold leading-tight">{notification.title}</h3>
                  <p className="text-gray-500 text-base mt-1 line-clamp-1">
                    {notification.type === "message" ? (
                      <span className="italic">{notification.description}</span>
                    ) : (
                      notification.description
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  {notification.time}
                </span>
                {notification.actionLabel && notification.actionHref && (
                  <Link
                    href={notification.actionHref}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      notification.isRead
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                  >
                    {notification.actionLabel}
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-12 flex items-center justify-center py-8">
        <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
          <span className="material-symbols-outlined text-lg">info</span>
          <span>Showing notifications from the last 30 days</span>
        </div>
      </div>
    </div>
  )
}

function NotificationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12">
      <div className="flex flex-col items-center gap-12 w-full max-w-2xl">
        {/* Visual */}
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-2xl shadow-primary/5 group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10" />
          <div
            className="bg-center bg-no-repeat bg-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800')`,
            }}
          />
          <div className="absolute -top-10 -right-10 size-40 bg-primary/20 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-10 -left-10 size-40 bg-primary/10 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">You're all caught up</h1>
          <p className="text-gray-500 text-base font-medium max-w-[420px] leading-relaxed">
            Your notification center is clear. Check back later for updates on your bookings,
            creative projects, and studio sessions.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <Link
            href="/studios"
            className="group flex items-center justify-center gap-2 min-w-[220px] bg-primary text-white py-4 px-8 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <span>Explore Marketplace</span>
            <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
