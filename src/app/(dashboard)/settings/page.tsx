import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata = {
  title: "Account Settings",
}

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const settingsCards = [
    {
      href: "/profile/edit",
      icon: "person",
      title: "Profile",
      description: "Update your personal information and profile photo",
    },
    {
      href: "/settings/privacy",
      icon: "shield_lock",
      title: "Privacy & Notifications",
      description: "Control visibility and notification preferences",
    },
    {
      href: "/settings/security",
      icon: "verified_user",
      title: "Security",
      description: "Manage passwords, 2FA, and logged-in devices",
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Page Heading */}
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black tracking-tight">Account Settings</h2>
        <p className="text-gray-500 text-lg">
          Manage your account preferences and security settings.
        </p>
      </div>

      {/* Settings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
          >
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary">{card.icon}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{card.title}</h3>
            <p className="text-sm text-gray-500">{card.description}</p>
          </Link>
        ))}
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-primary">email</span>
          <h3 className="text-lg font-bold">Account Email</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">{user.email}</p>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
            Verified
          </span>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 rounded-2xl p-6 bg-red-50/50">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-red-500">warning</span>
          <h3 className="text-lg font-bold text-red-700">Danger Zone</h3>
        </div>
        <p className="text-sm text-red-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-6 py-2 border-2 border-red-300 text-red-600 rounded-full font-bold text-sm hover:bg-red-100 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  )
}
