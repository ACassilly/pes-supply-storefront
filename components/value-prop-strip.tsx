import { Truck, ShieldCheck, Building2, Zap } from "lucide-react"

const props = [
  { icon: ShieldCheck, label: "169 Authorized Brands", sub: "Full OEM warranties on every order" },
  { icon: Truck, label: "Portlandia Logistics", sub: "In-house fulfillment from Louisville, KY" },
  { icon: Building2, label: "BABA Compliant", sub: "Documentation ships with your order" },
  { icon: Zap, label: "Power Link Network", sub: "We send qualified leads to our contractors" },
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
