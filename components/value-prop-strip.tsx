import { Truck, CreditCard, ShieldCheck, Headphones } from "lucide-react"

const props = [
  { icon: Truck, label: "Same-Day Shipping", sub: "Order by 2 PM ET" },
  { icon: CreditCard, label: "Net-30 Terms", sub: "For approved accounts" },
  { icon: ShieldCheck, label: "Authorized Distributor", sub: "Full OEM warranty" },
  { icon: Headphones, label: "Real People", sub: "(888) 876-0007" },
]

export function ValuePropStrip() {
  return (
    <div className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
        {props.map((p) => (
          <div key={p.label} className="flex items-center justify-center gap-2.5 px-3 py-3">
            <p.icon className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <span className="block text-xs font-semibold text-foreground">{p.label}</span>
              <span className="block text-[10px] text-muted-foreground">{p.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
