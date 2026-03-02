import { Package, Truck, Clock, ShieldCheck, Users, Building2 } from "lucide-react"

const stats = [
  { value: "100,000+", label: "Products in Catalog", icon: Package },
  { value: "169", label: "Authorized Brands", icon: ShieldCheck },
  { value: "10", label: "Shipping Locations", icon: Building2 },
  { value: "Same Day", label: "Order Processing by 2PM ET", icon: Clock },
  { value: "10", label: "Departments, One Invoice", icon: Truck },
  { value: "Free", label: "Power Link Contractor Leads", icon: Users },
]

export function Testimonials() {
  return (
    <section className="bg-muted/30 py-10 md:py-14" aria-labelledby="trust-heading">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-primary">
          PES by the Numbers
        </p>
        <h2
          id="trust-heading"
          className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl text-balance"
        >
          Built for the trade. Backed by the facts.
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground text-pretty">
          Every number below is verifiable. No inflated claims, no "up to" asterisks. This is what PES delivers today.
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-xl border border-border bg-card px-4 py-6 text-center"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-2xl font-black text-foreground">{s.value}</span>
              <span className="mt-1 text-xs leading-tight text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
