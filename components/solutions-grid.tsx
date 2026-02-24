import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const departments = [
  { name: "Lighting & Electrical", count: "12,400+", image: "/images/cat-electrical.jpg" },
  { name: "Solar & Renewables", count: "4,200+", image: "/images/product-solar-panel.jpg" },
  { name: "Tools & Equipment", count: "6,800+", image: "/images/product-tools.jpg" },
  { name: "HVAC & Ventilation", count: "3,600+", image: "/images/cat-hvac.jpg" },
  { name: "Plumbing", count: "2,900+", image: "/images/cat-plumbing.jpg" },
  { name: "Generators & Power", count: "1,400+", image: "/images/product-generator.jpg" },
  { name: "EV Charging", count: "800+", image: "/images/product-ev-charger.jpg" },
  { name: "Hardware & Fasteners", count: "3,100+", image: "/images/cat-hardware.jpg" },
  { name: "Safety & PPE", count: "2,200+", image: "/images/cat-safety.jpg" },
  { name: "Building Materials", count: "2,500+", image: "/images/cat-building.jpg" },
  { name: "Racking & Mounting", count: "1,100+", image: "/images/cat-racking.jpg" },
  { name: "Batteries & Storage", count: "900+", image: "/images/product-battery.jpg" },
]

export function SolutionsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Shop by department">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Shop by Department</h2>
          <p className="mt-1 text-sm text-muted-foreground">40,000+ products across 12 departments -- all in stock</p>
        </div>
        <a href="#" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
          View All Departments <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {departments.map((dept) => (
          <a
            key={dept.name}
            href="#"
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={dept.image}
                alt={dept.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center p-2.5 text-center">
              <h3 className="text-xs font-semibold text-card-foreground leading-tight group-hover:text-primary">{dept.name}</h3>
              <span className="mt-0.5 text-[10px] text-muted-foreground">{dept.count} products</span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-4 flex justify-center sm:hidden">
        <Button variant="outline" size="sm" className="gap-1 text-primary">
          View All Departments <ArrowRight className="h-3 w-3" />
        </Button>
      </div>
    </section>
  )
}
