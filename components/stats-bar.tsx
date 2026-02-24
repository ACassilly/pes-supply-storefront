import { Headphones, Package, ThumbsUp, Warehouse, ArrowRight } from "lucide-react"

const stats = [
  {
    icon: Headphones,
    title: "Dedicated Support\nTeam in Portland",
    cta: "Talk to a real person",
  },
  {
    icon: Package,
    title: "40,000+ Products\nIn Stock & Ready",
    cta: "Explore the catalog",
  },
  {
    icon: ThumbsUp,
    title: "95% Customer\nApproval Rating",
    cta: "See what people say",
  },
  {
    icon: Warehouse,
    title: "U.S. Warehouses\nNationwide Shipping",
    cta: "Shipping & delivery",
  },
]

export function StatsBar() {
  return (
    <section className="border-y border-border bg-card" aria-label="Why shop with us">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <a
              key={stat.cta}
              href="#"
              className="group flex flex-col items-center gap-2.5 rounded-lg p-3 text-center transition-colors hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="whitespace-pre-line text-sm font-semibold text-foreground leading-tight">
                {stat.title}
              </p>
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                {stat.cta}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
