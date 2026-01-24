import Image from "next/image"

const portfolioImages = [
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800",
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=800",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800",
  "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=800",
]

export function PortfolioSection() {
  return (
    <section className="max-w-[1440px] mx-auto px-8 mt-32">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight">Made with lcntships</h2>
        <p className="text-gray-500 mt-2">Work created by our community in our partner studios</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
          <div className="relative w-full h-64 rounded-[32px] overflow-hidden">
            <Image
              src={portfolioImages[0]}
              alt="Portfolio 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-96 rounded-[32px] overflow-hidden">
            <Image
              src={portfolioImages[1]}
              alt="Portfolio 2"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="relative w-full h-80 rounded-[32px] overflow-hidden">
            <Image
              src={portfolioImages[2]}
              alt="Portfolio 3"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-80 rounded-[32px] overflow-hidden">
            <Image
              src={portfolioImages[3]}
              alt="Portfolio 4"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="relative w-full h-96 rounded-[32px] overflow-hidden">
            <Image
              src={portfolioImages[4]}
              alt="Portfolio 5"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-64 rounded-[32px] overflow-hidden">
            <Image
              src={portfolioImages[5]}
              alt="Portfolio 6"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="relative w-full h-64 rounded-[32px] overflow-hidden">
            <Image
              src={portfolioImages[6]}
              alt="Portfolio 7"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full h-96 rounded-[32px] overflow-hidden">
            <Image
              src={portfolioImages[7]}
              alt="Portfolio 8"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
