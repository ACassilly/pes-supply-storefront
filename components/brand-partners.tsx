import Image from "next/image"

const brands = [
  // Electrical
  { name: "Eaton", logo: "https://logo.clearbit.com/eaton.com" },
  { name: "Siemens", logo: "https://logo.clearbit.com/siemens.com" },
  { name: "Schneider Electric", logo: "https://logo.clearbit.com/se.com" },
  { name: "Leviton", logo: "https://logo.clearbit.com/leviton.com" },
  { name: "Hubbell", logo: "https://logo.clearbit.com/hubbell.com" },
  { name: "Southwire", logo: "https://logo.clearbit.com/southwire.com" },
  { name: "Lutron", logo: "https://logo.clearbit.com/lutron.com" },
  // Tools
  { name: "Milwaukee Tool", logo: "https://logo.clearbit.com/milwaukeetool.com" },
  { name: "DeWalt", logo: "https://logo.clearbit.com/dewalt.com" },
  { name: "Klein Tools", logo: "https://logo.clearbit.com/kleintools.com" },
  { name: "Fluke", logo: "https://logo.clearbit.com/fluke.com" },
  { name: "Bosch", logo: "https://logo.clearbit.com/bosch.com" },
  // HVAC & General
  { name: "Honeywell", logo: "https://logo.clearbit.com/honeywell.com" },
  { name: "3M", logo: "https://logo.clearbit.com/3m.com" },
  { name: "Generac", logo: "https://logo.clearbit.com/generac.com" },
  { name: "Rheem", logo: "https://logo.clearbit.com/rheem.com" },
  { name: "Watts", logo: "https://logo.clearbit.com/watts.com" },
  // Solar & EV
  { name: "Enphase", logo: "https://logo.clearbit.com/enphase.com" },
  { name: "SolarEdge", logo: "https://logo.clearbit.com/solaredge.com" },
  { name: "Q Cells", logo: "https://logo.clearbit.com/q-cells.com" },
  { name: "ChargePoint", logo: "https://logo.clearbit.com/chargepoint.com" },
  { name: "IronRidge", logo: "https://logo.clearbit.com/ironridge.com" },
  // Lighting
  { name: "RAB Lighting", logo: "https://logo.clearbit.com/rablighting.com" },
  { name: "Lithonia", logo: "https://logo.clearbit.com/acuitybrands.com" },
]

export function BrandPartners() {
  return (
    <section className="border-y border-border bg-card" aria-label="Brand partners">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 text-center">
          <h2 className="text-lg font-bold text-foreground">
            Authorized Dealer for the Brands You Trust
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Full OEM warranties, factory-direct pricing, always in stock
          </p>
        </div>

        {/* Scrolling logo row */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            className="flex gap-8"
            style={{ animation: "scroll 45s linear infinite", width: "max-content" }}
          >
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-border bg-background p-3 grayscale transition-all duration-300 hover:grayscale-0 hover:border-primary/30 hover:shadow-sm"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={100}
                  height={40}
                  className="h-8 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Authorized distributor for{" "}
          <span className="font-semibold text-foreground">50+ manufacturers</span>{" "}
          across electrical, tools, solar, HVAC, lighting, and plumbing
        </p>
      </div>
    </section>
  )
}
