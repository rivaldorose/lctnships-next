"use client"

import { useState } from "react"
import Link from "next/link"

interface NotificationChannel {
  email: boolean
  sms: boolean
  push: boolean
}

interface NotificationSettings {
  newBookings: NotificationChannel
  messages: NotificationChannel
  platformUpdates: NotificationChannel
  reviews: NotificationChannel
}

interface PrivacySettings {
  profileVisibility: string
  showPortfolioToUnregistered: boolean
}

interface PrivacySettingsClientProps {
  notificationSettings: NotificationSettings
  privacySettings: PrivacySettings
}

export function PrivacySettingsClient({
  notificationSettings: initialNotificationSettings,
  privacySettings: initialPrivacySettings,
}: PrivacySettingsClientProps) {
  const [notifications, setNotifications] = useState(initialNotificationSettings)
  const [privacy, setPrivacy] = useState(initialPrivacySettings)

  const notificationTypes = [
    {
      key: "newBookings" as const,
      title: "New Bookings",
      description: "When a client books your creative space",
    },
    {
      key: "messages" as const,
      title: "Messages",
      description: "Direct inquiries from potential clients",
    },
    {
      key: "platformUpdates" as const,
      title: "Platform Updates",
      description: "New features and studio growth tips",
    },
    {
      key: "reviews" as const,
      title: "Reviews",
      description: "When someone leaves a review on your studio",
    },
  ]

  const updateNotification = (
    type: keyof NotificationSettings,
    channel: keyof NotificationChannel,
    value: boolean
  ) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [channel]: value,
      },
    }))
  }

  const handleSave = () => {
    // TODO: Save settings to database
    console.log({ notifications, privacy })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/settings" className="text-gray-500 font-medium">
          Settings
        </Link>
        <span className="text-gray-500 font-medium">/</span>
        <span className="font-bold">Privacy & Notifications</span>
      </div>

      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black tracking-tight">Privacy and Notifications</h2>
        <p className="text-gray-500 text-lg">
          Control how you are seen and notified on the platform.
        </p>
      </div>

      {/* Notifications Section */}
      <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-primary">notifications_active</span>
          <h3 className="text-2xl font-bold">Notification Preferences</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Event Type
                </th>
                <th className="pb-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                  Email
                </th>
                <th className="pb-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                  SMS
                </th>
                <th className="pb-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-center">
                  Push
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {notificationTypes.map((type) => (
                <tr key={type.key}>
                  <td className="py-6">
                    <p className="font-bold">{type.title}</p>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </td>
                  {(["email", "sms", "push"] as const).map((channel) => (
                    <td key={channel} className="py-6 text-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[type.key][channel]}
                          onChange={(e) =>
                            updateNotification(type.key, channel, e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-primary">visibility</span>
          <h3 className="text-2xl font-bold">Privacy Settings</h3>
        </div>

        <div className="flex flex-col gap-8">
          {/* Profile Visibility Dropdown */}
          <div className="max-w-md">
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              Profile Visibility
            </label>
            <div className="relative">
              <select
                value={privacy.profileVisibility}
                onChange={(e) =>
                  setPrivacy((prev) => ({ ...prev, profileVisibility: e.target.value }))
                }
                className="w-full h-14 bg-gray-50 border-none rounded-2xl px-5 appearance-none focus:ring-2 focus:ring-primary font-medium"
              >
                <option value="public">Public (Visible to everyone)</option>
                <option value="marketplace">Marketplace Only (Visible to logged-in users)</option>
                <option value="private">Private (Only visible to you)</option>
              </select>
              <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                expand_more
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Decide who can view your studio profile and contact details.
            </p>
          </div>

          {/* Portfolio Checkbox */}
          <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl">
            <div className="flex items-center h-5 mt-1">
              <input
                id="portfolio-visibility"
                type="checkbox"
                checked={privacy.showPortfolioToUnregistered}
                onChange={(e) =>
                  setPrivacy((prev) => ({
                    ...prev,
                    showPortfolioToUnregistered: e.target.checked,
                  }))
                }
                className="w-6 h-6 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
            <label htmlFor="portfolio-visibility" className="flex flex-col cursor-pointer">
              <span className="font-bold">Show my portfolio to unregistered users</span>
              <span className="text-sm text-gray-500">
                Allow search engines and visitors to see your creative work before signing in.
              </span>
            </label>
          </div>

          {/* Data usage notice */}
          <div className="p-5 border border-dashed border-gray-200 rounded-2xl">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-gray-500 text-xl">info</span>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                Data Privacy Notice
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-500 leading-normal">
              LCTNSHIPS adheres to GDPR and international data protection standards. We never sell
              your personal data to third parties. Your privacy is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Save Action Button */}
      <div className="flex justify-end pt-4 mb-10">
        <button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-3"
        >
          <span className="material-symbols-outlined">check_circle</span>
          Update Settings
        </button>
      </div>
    </div>
  )
}
