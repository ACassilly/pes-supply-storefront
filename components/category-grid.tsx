import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { name: "Solar Panels", image: "/images/product-solar-panel.jpg" },
  { name: "Inverters", image: "/images/product-inverter.jpg" },
  { name: "Batteries / ESS", image: "/images/product-battery.jpg" },
  { name: "Generators", image: "/images/product-generator.jpg" },
  { name: "Lighting & Electrical", image: "/images/cat-electrical.jpg" },
  { name: "Tools & Equipment", image: "/images/product-tools.jpg" },
  { name: "EV Charging", image: "/images/product-ev-charger.jpg" },
  { name: "Racking & Mounting", image: "/images/cat-racking.jpg" },
]

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Shop by category">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tier 1 solar modules and quality equipment from trusted manufacturers
          </p>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
        >
          All Departments <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-3">
              <h3 className="text-sm font-bold text-card-foreground group-hover:text-primary">
                {cat.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100"
              >
                Shop <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
