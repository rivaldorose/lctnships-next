import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedStudios } from "@/components/home/featured-studios"
import { WhyLcntships } from "@/components/home/why-lcntships"
import { BecomeHostSection } from "@/components/home/become-host-section"
import { CitiesSection } from "@/components/home/cities-section"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function FeaturedStudiosSkeleton() {
  return (
    <section className="py-16">
      <div className="container">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/3] rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <Suspense fallback={<FeaturedStudiosSkeleton />}>
        <FeaturedStudios />
      </Suspense>
      <WhyLcntships />
      <BecomeHostSection />
      <CitiesSection />
    </>
  )
}
