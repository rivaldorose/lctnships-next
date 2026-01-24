"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface Profile {
  id: string
  full_name: string
  email: string
  avatar_url?: string
  bio?: string
  location?: string
  professional_title?: string
  phone?: string
  user_type: string
  is_verified?: boolean
  response_rate?: number
  response_time?: string
}

interface EditProfileClientProps {
  profile: Profile
}

type SettingsTab = "profile" | "account" | "payouts" | "security"

export function EditProfileClient({ profile }: EditProfileClientProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile.full_name,
    professional_title: profile.professional_title || "",
    location: profile.location || "",
    bio: profile.bio || "",
    phone: profile.phone || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          professional_title: formData.professional_title,
          location: formData.location,
          bio: formData.bio,
          phone: formData.phone,
        })
        .eq("id", profile.id)

      if (error) throw error
      router.push("/profile")
      router.refresh()
    } catch (error) {
      console.error("Error saving profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const tabs = [
    { id: "profile" as const, label: "Public Profile", icon: "person" },
    { id: "account" as const, label: "Account Settings", icon: "settings" },
    { id: "payouts" as const, label: "Payouts", icon: "payments" },
    { id: "security" as const, label: "Security", icon: "security" },
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Sidebar - Navigation */}
        <aside className="w-full lg:w-64 space-y-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-4">Settings</h3>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-full font-medium transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-white shadow-sm text-gray-900 font-bold"
                    : "text-gray-500 hover:bg-white/50"
                }`}
              >
                <span className="material-symbols-outlined">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-10">
          {activeTab === "profile" && (
            <section className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
              <h1 className="text-3xl font-bold mb-8">Edit Public Profile</h1>

              {/* Avatar Upload */}
              <div className="flex flex-col items-center justify-center mb-12">
                <div className="relative group cursor-pointer">
                  <div className="size-40 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-50 transition-all hover:bg-gray-100">
                    <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">photo_camera</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Change Photo</span>
                  </div>
                  {profile.avatar_url && (
                    <div
                      className="absolute inset-0 size-40 rounded-full bg-cover bg-center border-4 border-white pointer-events-none opacity-40"
                      style={{ backgroundImage: `url("${profile.avatar_url}")` }}
                    />
                  )}
                </div>
                <p className="mt-4 text-xs text-gray-500 font-medium">Recommended: Square JPG or PNG, 800x800px</p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-4">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-transparent focus:border-primary focus:ring-0 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-4">Professional Title</label>
                  <input
                    type="text"
                    name="professional_title"
                    value={formData.professional_title}
                    onChange={handleChange}
                    placeholder="e.g. Cinematographer & Photographer"
                    className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-transparent focus:border-primary focus:ring-0 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold ml-4">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Amsterdam, Netherlands"
                    className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-transparent focus:border-primary focus:ring-0 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold ml-4">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about yourself and your work..."
                    className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-transparent focus:border-primary focus:ring-0 transition-all resize-none"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold ml-4">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+31 6 12345678"
                    className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-transparent focus:border-primary focus:ring-0 transition-all"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-12 flex justify-end gap-4">
                <Link
                  href="/profile"
                  className="px-8 py-4 rounded-full border border-gray-200 font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </Link>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-12 py-4 rounded-full bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </section>
          )}

          {activeTab === "account" && (
            <section className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
              <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold">Email Address</p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                  <button className="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold hover:bg-white transition-all">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold">Language</p>
                    <p className="text-sm text-gray-500">English (US)</p>
                  </div>
                  <button className="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold hover:bg-white transition-all">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold">Currency</p>
                    <p className="text-sm text-gray-500">EUR (€)</p>
                  </div>
                  <button className="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold hover:bg-white transition-all">
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-6 bg-red-50 rounded-2xl">
                  <div>
                    <p className="font-bold text-red-600">Delete Account</p>
                    <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                  </div>
                  <button className="px-6 py-2 bg-red-100 text-red-600 rounded-full text-sm font-bold hover:bg-red-200 transition-all">
                    Delete
                  </button>
                </div>
              </div>
            </section>
          )}

          {activeTab === "payouts" && (
            <section className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
              <h1 className="text-3xl font-bold mb-8">Payout Settings</h1>
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">account_balance</span>
                <h3 className="text-xl font-bold mb-2">No payout method</h3>
                <p className="text-gray-500 mb-6">Add a payout method to receive payments from your studio bookings</p>
                <button className="px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all">
                  Add Payout Method
                </button>
              </div>
            </section>
          )}

          {activeTab === "security" && (
            <section className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm">
              <h1 className="text-3xl font-bold mb-8">Security</h1>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold">Password</p>
                    <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                  </div>
                  <button className="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold hover:bg-white transition-all">
                    Update
                  </button>
                </div>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary/90 transition-all">
                    Enable
                  </button>
                </div>
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-bold">Active Sessions</p>
                    <p className="text-sm text-gray-500">Manage your logged in devices</p>
                  </div>
                  <button className="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold hover:bg-white transition-all">
                    Manage
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar - Live Preview */}
        <aside className="w-full lg:w-[320px] space-y-6">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">Live Preview</h3>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg overflow-hidden">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div
                  className="size-24 rounded-full bg-cover bg-center border-4 border-gray-100 bg-gray-200"
                  style={profile.avatar_url ? { backgroundImage: `url("${profile.avatar_url}")` } : {}}
                >
                  {!profile.avatar_url && (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl text-gray-400">person</span>
                    </div>
                  )}
                </div>
                {profile.is_verified && (
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full border-2 border-white">
                    <span className="material-symbols-outlined text-[10px] block">verified</span>
                  </div>
                )}
              </div>
              <h4 className="text-xl font-bold">{formData.full_name || "Your Name"}</h4>
              {profile.user_type === "host" && (
                <p className="text-xs font-medium text-primary uppercase tracking-widest mt-1">Superhost</p>
              )}
              <p className="text-sm text-gray-500 mt-3 line-clamp-2 italic">
                "{formData.bio?.slice(0, 80) || "Your bio will appear here..."}..."
              </p>
              <div className="w-full mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Response Time</span>
                  <span className="font-bold">{profile.response_time || "< 1hr"}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Rating</span>
                  <div className="flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-primary text-[14px]">star</span>
                    5.0
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 rounded-full bg-gray-100 text-xs font-bold pointer-events-none">
                View Public Profile
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary font-bold leading-relaxed">
              Your profile is visible to all members of the StudioShare community. Keep it up to date to build trust with potential renters.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
