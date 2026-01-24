import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000"
          alt="Creative studio space"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-4xl font-extrabold mb-4">Find your perfect creative space</h2>
          <p className="text-lg text-white/80">Join thousands of creators booking premium studios worldwide.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}
