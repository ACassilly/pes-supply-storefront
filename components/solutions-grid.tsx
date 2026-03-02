import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Wrench, Building2, Landmark, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const departments = [
  { name: "Electrical", slug: "electrical", count: "12,400+", image: "/images/cat-electrical.jpg", subs: ["Circuit Breakers", "Wire & Cable", "Conduit", "Switches & Outlets"] },
  { name: "Lighting", slug: "lighting", count: "5,200+", image: "/images/cat-lighting.jpg", subs: ["LED Fixtures", "High Bay", "Emergency & Exit", "Controls"] },
  { name: "Solar & Renewables", slug: "solar", count: "4,200+", image: "/images/cat-racking.jpg", subs: ["Solar Panels", "Inverters", "Racking", "Batteries"] },
  { name: "Tools & Test", slug: "tools", count: "6,800+", image: "/images/product-clamp-meter.jpg", subs: ["Power Tools", "Hand Tools", "Meters", "Fish Tape"] },
  { name: "HVAC", slug: "hvac", count: "3,600+", image: "/images/cat-hvac.jpg", subs: ["Mini Splits", "Thermostats", "Fans", "Heaters"] },
  { name: "Plumbing", slug: "plumbing", count: "2,900+", image: "/images/cat-plumbing.jpg", subs: ["Pipe & Fittings", "Valves", "Water Heaters", "Pumps"] },
  { name: "Generators", slug: "generators", count: "1,400+", image: "/images/cat-generators.jpg", subs: ["Standby", "Portable", "Transfer Switches", "Parts"] },
  { name: "EV Charging", slug: "ev-charging", count: "800+", image: "/images/cat-ev.jpg", subs: ["Level 2 Residential", "Level 2 Commercial", "DC Fast", "Cables"] },
  { name: "Safety & PPE", slug: "safety", count: "2,200+", image: "/images/cat-safety.jpg", subs: ["Hard Hats", "Gloves", "Hi-Vis", "Fall Protection"] },
  { name: "Data & Comm", slug: "datacomm", count: "1,800+", image: "/images/cat-hardware.jpg", subs: ["Structured Cabling", "Racks", "Fiber Optic", "Patch Panels"] },
]

const verticals = [
  { title: "Contractors & Trades", desc: "Net-30, named reps, same-day ship", icon: Wrench, href: "/pro", color: "bg-primary/10 text-primary" },
  { title: "Property Managers", desc: "No minimums, easy reorder, bulk lamps", icon: Building2, href: "/pro", color: "bg-accent/10 text-accent-foreground" },
  { title: "Government & Municipal", desc: "BABA compliant, procurement docs", icon: Landmark, href: "/pro", color: "bg-secondary text-secondary-foreground" },
  { title: "Solar Installers", desc: "Pallet pricing, Tier 1 modules, racking", icon: Sun, href: "/departments/solar", color: "bg-primary/10 text-primary" },
]

export function SolutionsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-labelledby="dept-heading">
      {/* Who We Serve */}
      <div className="mb-8">
        <h2 className="mb-1 text-lg font-bold text-foreground">Who We Serve</h2>
        <p className="mb-4 text-xs text-muted-foreground">PES is built for professionals. Pick your lane.</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {verticals.map((v) => (
            <Link key={v.title} href={v.href} className="group flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-md">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${v.color}`}>
                <v.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-card-foreground group-hover:text-primary">{v.title}</h3>
                <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{v.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Departments with subcategories */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 id="dept-heading" className="text-lg font-bold text-foreground">Shop by Department</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Everything between the meter and the roof. One supplier, one order.</p>
        </div>
        <Link href="/departments" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {departments.map((dept) => (
          <div key={dept.name} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
            <Link href={`/departments/${dept.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image src={dept.image} alt={dept.name} fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw" className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            </Link>
            <div className="flex flex-1 flex-col p-2.5">
              <Link href={`/departments/${dept.slug}`} className="text-xs font-semibold text-card-foreground group-hover:text-primary">{dept.name}</Link>
              <span className="text-[10px] text-muted-foreground">{dept.count} products</span>
              {/* Exposed subcategories -- Zoro pattern */}
              <div className="mt-1.5 flex flex-col gap-0.5">
                {dept.subs.map((sub) => (
                  <Link key={sub} href={`/departments/${dept.slug}`} className="text-[10px] text-muted-foreground transition-colors hover:text-primary">{sub}</Link>
                ))}
                <Link href={`/departments/${dept.slug}`} className="mt-0.5 text-[10px] font-semibold text-primary">Shop all &rarr;</Link>
              </div>
            </div>
          </div>
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
