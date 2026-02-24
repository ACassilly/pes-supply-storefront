import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Solar Panels",
    description: "Tier-1 modules, singles to full pallets",
    image: "/images/product-solar-panel.jpg",
    badge: "From $0.23/W",
  },
  {
    name: "Inverters",
    description: "Hybrid, grid-tie & micro inverters",
    image: "/images/product-inverter.jpg",
    badge: "Top Brands",
  },
  {
    name: "Batteries & ESS",
    description: "LiFePO4, AGM & wall-mount units",
    image: "/images/product-battery.jpg",
    badge: "In Stock",
  },
  {
    name: "Generators",
    description: "Standby & portable power",
    image: "/images/product-generator.jpg",
    badge: "From $1,995",
  },
  {
    name: "Wire & Cable",
    description: "THWN, PV wire, USE-2 & more",
    image: "/images/product-tools.jpg",
    badge: "By the Foot",
  },
  {
    name: "EV Charging",
    description: "Level 2 & DC fast chargers",
    image: "/images/product-ev-charger.jpg",
    badge: "Hot",
  },
  {
    name: "Racking & BOS",
    description: "Roof, ground mount & balance of system",
    image: "/images/cat-racking.jpg",
    badge: "Best Sellers",
  },
  {
    name: "Switchgear & Electrical",
    description: "Breakers, panels, conduit, disconnects",
    image: "/images/cat-electrical.jpg",
    badge: "200+ SKUs",
  },
]

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Shop by category">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Bankable brands, in-stock and ready to ship
          </p>
        </div>
        <a href="#" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex">
          View All Categories <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md hover:border-primary/30"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                {cat.badge}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-3">
              <h3 className="text-sm font-semibold text-card-foreground group-hover:text-primary">
                {cat.name}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{cat.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
