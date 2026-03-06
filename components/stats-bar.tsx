import { Package, Building2, Truck, CreditCard } from "lucide-react"
import { brands } from "@/lib/data"

const stats = [
  { icon: Package, label: "40,000+ SKUs", desc: "Products in stock" },
  { icon: Building2, label: `${brands.length} Authorized Brands`, desc: "Full OEM warranties" },
  { icon: Truck, label: "Same-Day Shipping", desc: "Order by 2 PM ET" },
  { icon: CreditCard, label: "Net-30 for Pros", desc: "Qualified businesses" },
]

export function StatsBar() {
  return (
    <section className="bg-[#1a1a2e]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-white/10 md:py-5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-center gap-3 md:px-4">
            <stat.icon className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold text-white">{stat.label}</p>
              <p className="text-[11px] text-white/60">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
