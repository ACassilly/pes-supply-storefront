import Image from "next/image"
import { ShieldCheck, CreditCard, Lock } from "lucide-react"

const brands = [
  { name: "Eaton", logo: "https://logo.clearbit.com/eaton.com" },
  { name: "Siemens", logo: "https://logo.clearbit.com/siemens.com" },
  { name: "Schneider Electric", logo: "https://logo.clearbit.com/se.com" },
  { name: "Leviton", logo: "https://logo.clearbit.com/leviton.com" },
  { name: "Hubbell", logo: "https://logo.clearbit.com/hubbell.com" },
  { name: "Southwire", logo: "https://logo.clearbit.com/southwire.com" },
  { name: "Lutron", logo: "https://logo.clearbit.com/lutron.com" },
  { name: "Milwaukee Tool", logo: "https://logo.clearbit.com/milwaukeetool.com" },
  { name: "DeWalt", logo: "https://logo.clearbit.com/dewalt.com" },
  { name: "Klein Tools", logo: "https://logo.clearbit.com/kleintools.com" },
  { name: "Fluke", logo: "https://logo.clearbit.com/fluke.com" },
  { name: "Bosch", logo: "https://logo.clearbit.com/bosch.com" },
  { name: "Honeywell", logo: "https://logo.clearbit.com/honeywell.com" },
  { name: "3M", logo: "https://logo.clearbit.com/3m.com" },
  { name: "Generac", logo: "https://logo.clearbit.com/generac.com" },
  { name: "Rheem", logo: "https://logo.clearbit.com/rheem.com" },
  { name: "Enphase", logo: "https://logo.clearbit.com/enphase.com" },
  { name: "SolarEdge", logo: "https://logo.clearbit.com/solaredge.com" },
  { name: "Q Cells", logo: "https://logo.clearbit.com/q-cells.com" },
  { name: "ChargePoint", logo: "https://logo.clearbit.com/chargepoint.com" },
  { name: "IronRidge", logo: "https://logo.clearbit.com/ironridge.com" },
  { name: "RAB Lighting", logo: "https://logo.clearbit.com/rablighting.com" },
  { name: "Lithonia", logo: "https://logo.clearbit.com/acuitybrands.com" },
  { name: "Watts", logo: "https://logo.clearbit.com/watts.com" },
]

const paymentMethods = ["Visa", "MC", "Amex", "ACH", "Wire", "Net-30"]

export function BrandPartners() {
  return (
    <section className="border-y border-border bg-card" aria-label="Brands and trust">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold text-foreground">
            Authorized Distributor for 50+ Manufacturers
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Full OEM warranties. Factory-direct pricing. Always in stock.
          </p>
        </div>

        {/* Scrolling logos */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            className="flex gap-6"
            style={{
              animation: "scroll 45s linear infinite",
              width: "max-content",
            }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex h-14 w-28 shrink-0 items-center justify-center rounded-lg border border-border bg-background p-2 grayscale transition-all duration-300 hover:border-primary/30 hover:grayscale-0"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={80}
                  height={32}
                  className="h-7 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trust + Payment strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Authorized Distributor
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            UL Listed Products
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            BABA Compliant
          </span>
          <span className="hidden h-4 w-px bg-border lg:block" />
          <span className="flex items-center gap-1.5">
            <Lock className="h-3 w-3" />
            256-bit SSL
          </span>
          <span className="flex items-center gap-2">
            <CreditCard className="h-3 w-3" />
            {paymentMethods.join(" / ")}
          </span>
        </div>
      </div>
    </section>
  )
}
