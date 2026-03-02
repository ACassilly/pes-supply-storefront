import { Truck, ShieldCheck, Building2, Zap } from "lucide-react"

const props = [
  { icon: ShieldCheck, label: "Full OEM Warranties", sub: "169 brands. Factory-direct. No gray market." },
  { icon: Truck, label: "Free Freight $999+", sub: "Same-day processing. 10 ship points." },
  { icon: Building2, label: "BABA Ready", sub: "Compliance docs included. No extra charge." },
  { icon: Zap, label: "Power Link", sub: "We send qualified leads to your business." },
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
