import { Package, Warehouse, Users, Clock, ShieldCheck, Award } from "lucide-react"

const stats = [
  { icon: Package, value: "40,000+", label: "Products In Stock" },
  { icon: Warehouse, value: "12+", label: "Distribution Hubs" },
  { icon: Users, value: "8,500+", label: "Contractors Served" },
  { icon: Clock, value: "1–3 Days", label: "Delivery Nationwide" },
]

const badges = [
  { icon: ShieldCheck, label: "BABA Compliant" },
  { icon: Award, label: "NABCEP Certified" },
  { icon: ShieldCheck, label: "UL Listed" },
]

export function StatsBar() {
  return (
    <section className="border-y border-border bg-card" aria-label="Company stats">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-5 md:flex-row md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <span className="text-sm font-bold text-foreground">{s.value}</span>
                <span className="ml-1.5 text-xs text-muted-foreground">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          {badges.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-[10px] font-semibold text-muted-foreground"
            >
              <b.icon className="h-3 w-3 text-primary" />
              {b.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
