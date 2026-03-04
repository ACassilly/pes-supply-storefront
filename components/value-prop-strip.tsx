import Image from "next/image"

const props = [
  { image: "/images/icon-warranty.jpg", label: "Full OEM Warranties", sub: "169 brands. Factory-direct. No gray market." },
  { image: "/images/icon-shipping.jpg", label: "Free Freight $999+", sub: "Same-day processing. 10 ship points." },
  { image: "/images/icon-baba.jpg", label: "BABA Ready", sub: "Compliance docs included. No extra charge." },
  { image: "/images/icon-leads.jpg", label: "Power Link", sub: "We send qualified leads to your business." },
]

export function ValuePropStrip() {
  return (
    <div className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
        {props.map((p) => (
          <div key={p.label} className="flex items-center justify-center gap-2.5 px-3 py-3">
            <Image src={p.image} alt="" width={20} height={20} className="h-5 w-5 shrink-0 object-contain" />
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
