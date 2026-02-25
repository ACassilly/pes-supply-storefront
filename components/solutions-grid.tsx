import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const departments = [
  { name: "Electrical", slug: "electrical", count: "12,400+", image: "/images/cat-electrical.jpg" },
  { name: "Lighting", slug: "lighting", count: "5,200+", image: "/images/cat-lighting.jpg" },
  { name: "Solar & Renewables", slug: "solar", count: "4,200+", image: "/images/product-solar-panel.jpg" },
  { name: "Tools & Test", slug: "tools", count: "6,800+", image: "/images/product-tools.jpg" },
  { name: "HVAC", slug: "hvac", count: "3,600+", image: "/images/cat-hvac.jpg" },
  { name: "Plumbing", slug: "plumbing", count: "2,900+", image: "/images/cat-plumbing.jpg" },
  { name: "Generators", slug: "generators", count: "1,400+", image: "/images/cat-generators.jpg" },
  { name: "EV Charging", slug: "ev-charging", count: "800+", image: "/images/cat-ev.jpg" },
  { name: "Safety & PPE", slug: "safety", count: "2,200+", image: "/images/cat-safety.jpg" },
  { name: "Data & Comm", slug: "datacomm", count: "1,800+", image: "/images/cat-hardware.jpg" },
]

export function SolutionsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12" aria-labelledby="dept-heading">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 id="dept-heading" className="text-2xl font-bold text-foreground">Shop by Department</h2>
          <p className="mt-1 text-sm text-muted-foreground">Everything between the meter and the roof. One supplier, one order.</p>
        </div>
        <Link href="/departments" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {departments.map((dept) => (
          <Link key={dept.name} href={`/departments/${dept.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md active:scale-[0.98]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image src={dept.image} alt={dept.name} fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center p-2.5 text-center">
              <h3 className="text-xs font-semibold leading-tight text-card-foreground group-hover:text-primary">{dept.name}</h3>
              <span className="mt-0.5 text-[10px] text-muted-foreground">{dept.count} products</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-4 flex justify-center sm:hidden">
        <Button variant="outline" size="sm" className="gap-1 text-primary" asChild>
          <Link href="/departments">View All Departments <ArrowRight className="h-3 w-3" /></Link>
        </Button>
      </div>
    </section>
  )
}
