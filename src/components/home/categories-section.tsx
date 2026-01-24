import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Video, Mic, Music, Music2, Palette } from "lucide-react"

const categories = [
  {
    title: "Fotostudio's",
    description: "Professionele ruimtes voor fotoshoots",
    icon: Camera,
    href: "/studios?type=photo",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Videostudio's",
    description: "Volledig uitgeruste videoruimtes",
    icon: Video,
    href: "/studios?type=video",
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Podcaststudio's",
    description: "Professionele audio-opname ruimtes",
    icon: Mic,
    href: "/studios?type=podcast",
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Muziekstudio's",
    description: "Opnamestudio's voor muziekproductie",
    icon: Music,
    href: "/studios?type=music",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Dansstudio's",
    description: "Ruimtes voor dans en beweging",
    icon: Music2,
    href: "/studios?type=dance",
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Creatieve Ruimtes",
    description: "Veelzijdige creatieve werkruimtes",
    icon: Palette,
    href: "/studios?type=creative",
    color: "bg-yellow-100 text-yellow-600",
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Ontdek per categorie</h2>
          <p className="mt-2 text-muted-foreground">
            Vind de perfecte ruimte voor jouw project
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.title} href={category.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex p-3 rounded-full ${category.color} mb-4`}
                  >
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 hidden md:block">
                    {category.description}
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
