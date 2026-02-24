"use client"

import { useRef, useEffect, useState } from "react"
import { ShieldCheck, CreditCard } from "lucide-react"

const brands = [
  "Eaton", "Siemens", "Schneider Electric", "Leviton", "Hubbell", "Southwire",
  "Lutron", "Milwaukee Tool", "DeWalt", "Klein Tools", "Fluke", "Bosch",
  "Honeywell", "3M", "Generac", "Rheem", "Enphase", "SolarEdge",
  "Q Cells", "ChargePoint", "IronRidge", "RAB Lighting", "Lithonia", "Watts",
]

const paymentMethods = [
  { name: "Visa", bg: "bg-[#1A1F71]", text: "text-white" },
  { name: "MC", bg: "bg-[#EB001B]", text: "text-white" },
  { name: "Amex", bg: "bg-[#2E77BC]", text: "text-white" },
  { name: "ACH", bg: "bg-muted", text: "text-foreground" },
  { name: "Wire", bg: "bg-muted", text: "text-foreground" },
  { name: "Net-30", bg: "bg-primary/10", text: "text-primary font-bold" },
]

export function BrandPartners() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const shouldAnimate = isVisible && !paused

  return (
    <section className="border-y border-border bg-card" aria-labelledby="brands-heading">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 text-center">
          <h2 id="brands-heading" className="text-lg font-bold text-foreground">{`Authorized Distributor \u2014 169 Brands, 500+ Vendors`}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Full OEM warranties. Factory-direct pricing. Always in stock.</p>
        </div>

        <div
          ref={scrollRef}
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-4"
            style={{
              animation: "scroll 40s linear infinite",
              animationPlayState: shouldAnimate ? "running" : "paused",
              width: "max-content",
              willChange: "transform",
            }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex h-12 w-28 shrink-0 items-center justify-center rounded-lg border border-border bg-background px-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Authorized Distributor
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> UL Listed Products
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> BABA Compliant
          </span>
          <span className="hidden h-4 w-px bg-border lg:block" />
          <div className="flex items-center gap-2">
            <CreditCard className="h-3.5 w-3.5" />
            <div className="flex items-center gap-1.5">
              {paymentMethods.map((m) => (
                <span
                  key={m.name}
                  className={`inline-flex items-center justify-center rounded px-2 py-0.5 text-[9px] font-semibold ${m.bg} ${m.text}`}
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
