import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    name: "Lighting & Electrical",
    count: "580+ items",
    image: "/images/cat-electrical.jpg",
  },
  {
    name: "Solar & Renewables",
    count: "340+ items",
    image: "/images/product-solar-panel.jpg",
  },
  {
    name: "Tools & Equipment",
    count: "420+ items",
    image: "/images/product-tools.jpg",
  },
  {
    name: "HVAC & Cooling",
    count: "290+ items",
    image: "/images/cat-hvac.jpg",
  },
  {
    name: "Plumbing",
    count: "370+ items",
    image: "/images/cat-plumbing.jpg",
  },
  {
    name: "Hardware & Fasteners",
    count: "510+ items",
    image: "/images/cat-hardware.jpg",
  },
  {
    name: "Safety & Workwear",
    count: "180+ items",
    image: "/images/cat-safety.jpg",
  },
  {
    name: "Building Materials",
    count: "260+ items",
    image: "/images/cat-building.jpg",
  },
  {
    name: "Generators & Power",
    count: "140+ items",
    image: "/images/product-generator.jpg",
  },
  {
    name: "EV Charging",
    count: "90+ items",
    image: "/images/product-ev-charger.jpg",
  },
  {
    name: "Batteries & Storage",
    count: "120+ items",
    image: "/images/product-battery.jpg",
  },
  {
    name: "Racking & Mounting",
    count: "200+ items",
    image: "/images/cat-racking.jpg",
  },
]

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Shop by category">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Shop by Department
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything for the job, all in one place
          </p>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
        >
          View All Departments <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md hover:border-primary/30"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col items-center p-2.5 text-center">
              <h3 className="text-xs font-semibold text-card-foreground leading-tight group-hover:text-primary">
                {cat.name}
              </h3>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                {cat.count}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
