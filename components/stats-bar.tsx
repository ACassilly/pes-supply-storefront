import { Package, MapPin, Users, Truck, ShieldCheck, Award } from "lucide-react"

const stats = [
  { icon: Package, value: "3,800+", label: "SKUs In Stock" },
  { icon: MapPin, value: "12+", label: "Distribution Hubs" },
  { icon: Users, value: "8,500+", label: "Contractors Nationwide" },
  { icon: Truck, value: "1-3 Days", label: "Delivery Nationwide" },
]

const certifications = [
  { icon: ShieldCheck, label: "BABA Compliant" },
  { icon: Award, label: "NABCEP Certified" },
  { icon: Truck, label: "Nationwide Delivery" },
  { icon: ShieldCheck, label: "UL Listed" },
]

export function StatsBar() {
  return (
    <section className="border-b border-border bg-card" aria-label="Company statistics">
      {/* Stats */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="border-t border-border bg-muted/40">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 overflow-x-auto px-4 py-3 md:gap-10">
          {certifications.map((cert) => (
            <span
              key={cert.label}
              className="flex shrink-0 items-center gap-2 text-xs font-medium text-muted-foreground"
            >
              <cert.icon className="h-4 w-4 text-primary" />
              {cert.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
