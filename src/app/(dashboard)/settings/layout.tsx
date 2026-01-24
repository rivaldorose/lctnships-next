import Link from "next/link"

const settingsNav = [
  { href: "/profile", label: "Profile", icon: "person" },
  { href: "/settings", label: "Account", icon: "settings" },
  { href: "/settings/payouts", label: "Payouts", icon: "payments" },
  { href: "/settings/privacy", label: "Privacy & Security", icon: "shield_lock" },
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row gap-8">
      {/* Side Navigation */}
      <aside className="w-full md:w-64 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold px-4">Settings</h1>
          <p className="text-gray-500 text-sm px-4">Manage your account</p>
        </div>
        <nav className="flex flex-col gap-2">
          {settingsNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-full text-gray-500 hover:bg-white transition-all"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  )
}
