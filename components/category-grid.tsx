import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  { name: "Lighting & Electrical", image: "/images/cat-electrical.jpg" },
  { name: "Solar & Renewables", image: "/images/product-solar-panel.jpg" },
  { name: "Tools & Equipment", image: "/images/product-tools.jpg" },
  { name: "HVAC & Cooling", image: "/images/cat-hvac.jpg" },
  { name: "Plumbing", image: "/images/cat-plumbing.jpg" },
  { name: "Hardware & Fasteners", image: "/images/cat-hardware.jpg" },
  { name: "Safety & PPE", image: "/images/cat-safety.jpg" },
  { name: "Building Materials", image: "/images/cat-building.jpg" },
  { name: "Generators & Power", image: "/images/product-generator.jpg" },
  { name: "EV Charging", image: "/images/product-ev-charger.jpg" },
  { name: "Batteries & Storage", image: "/images/product-battery.jpg" },
  { name: "Racking & Mounting", image: "/images/cat-racking.jpg" },
]

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Shop by department">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Shop by Department</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            40,000+ products across 12 departments
          </p>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
        >
          All Departments <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="px-2 py-2 text-center">
              <h3 className="text-[11px] font-semibold text-card-foreground leading-tight group-hover:text-primary sm:text-xs">
                {cat.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
