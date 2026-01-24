import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const cities = [
  { name: "Amsterdam", studios: 45, slug: "amsterdam" },
  { name: "Rotterdam", studios: 32, slug: "rotterdam" },
  { name: "Utrecht", studios: 28, slug: "utrecht" },
  { name: "Den Haag", studios: 24, slug: "den-haag" },
  { name: "Eindhoven", studios: 18, slug: "eindhoven" },
  { name: "Groningen", studios: 12, slug: "groningen" },
]

export function CitiesSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Ontdek studio&apos;s bij jou in de buurt</h2>
          <p className="mt-2 text-muted-foreground">
            Vind creatieve ruimtes in de grootste steden van Nederland
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city) => (
            <Link key={city.slug} href={`/studios?city=${city.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg">{city.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {city.studios} studio&apos;s
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
