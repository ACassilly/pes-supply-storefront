import Image from "next/image"
import { ArrowRight } from "lucide-react"

const solutions = [
  {
    title: "Electrical & Lighting",
    description: "Circuit breakers, panels, wire, conduit, LED fixtures, and emergency lighting from Eaton, Siemens, Schneider Electric, and more.",
    image: "/images/cat-electrical.jpg",
  },
  {
    title: "Solar & Renewables",
    description: "Tier 1 panels up to 800W, hybrid inverters, battery storage, racking, and monitoring from JA Solar, Sol-Ark, Enphase, and IronRidge.",
    image: "/images/product-solar-panel.jpg",
  },
  {
    title: "Construction & Trades",
    description: "Power tools, hand tools, fasteners, safety, and PPE from Milwaukee, DeWalt, Klein, and 3M. Everything for the jobsite.",
    image: "/images/product-tools.jpg",
  },
  {
    title: "HVAC & Plumbing",
    description: "Mini splits, water heaters, pumps, pipe, valves, and ventilation from Rheem, Honeywell, and Watts.",
    image: "/images/cat-hvac.jpg",
  },
  {
    title: "EV Charging",
    description: "Level 2 and DC fast charging stations for residential, commercial, and fleet applications from ChargePoint, Tesla, and Eaton.",
    image: "/images/product-ev-charger.jpg",
  },
  {
    title: "Government & Facilities",
    description: "BABA-compliant products, GSA pricing, procurement documentation, and dedicated account management for public sector operations.",
    image: "/images/hero-commercial.jpg",
  },
]

export function SolutionsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16" aria-label="Solutions by industry">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          Solutions for Every Project
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
          From single-family solar installs to Fortune 500 facility rollouts, PES Supply delivers the products, pricing, and support your operation needs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((sol) => (
          <a
            key={sol.title}
            href="#"
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
          >
            <div className="relative h-44 overflow-hidden bg-muted">
              <Image
                src={sol.image}
                alt={sol.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <h3 className="absolute bottom-3 left-4 text-lg font-bold text-background">
                {sol.title}
              </h3>
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
                {sol.description}
              </p>
              <span className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:gap-2.5">
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
