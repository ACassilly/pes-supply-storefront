const brands = [
  { name: "Jinko Solar", tier: "Tier 1" },
  { name: "LONGi", tier: "Tier 1" },
  { name: "Canadian Solar", tier: "Tier 1" },
  { name: "Q Cells", tier: "Tier 1" },
  { name: "Trina Solar", tier: "Tier 1" },
  { name: "Enphase", tier: "Partner" },
  { name: "Sol-Ark", tier: "Partner" },
  { name: "SolarEdge", tier: "Partner" },
  { name: "EG4", tier: "Partner" },
  { name: "IronRidge", tier: "Partner" },
  { name: "Unirac", tier: "Partner" },
  { name: "SnapNrack", tier: "Partner" },
  { name: "Generac", tier: "Partner" },
  { name: "Eaton", tier: "Partner" },
  { name: "Schneider Electric", tier: "Partner" },
  { name: "Square D", tier: "Partner" },
  { name: "Siemens", tier: "Partner" },
  { name: "Leviton", tier: "Partner" },
  { name: "Southwire", tier: "Partner" },
  { name: "ChargePoint", tier: "Partner" },
]

export function BrandPartners() {
  return (
    <section className="border-y border-border bg-card" aria-label="Brand partners">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold text-foreground">
            Bankable Brands, One Warehouse
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Tier-1 solar and trusted electrical manufacturers in stock and ready
            to ship
          </p>
        </div>

        {/* Scrolling brand row */}
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="flex animate-[scroll_50s_linear_infinite] gap-5">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex h-16 w-36 shrink-0 flex-col items-center justify-center rounded-lg border border-border bg-background px-4"
              >
                <span className="text-center text-[13px] font-extrabold uppercase tracking-wide text-foreground/70 leading-tight">
                  {brand.name}
                </span>
                <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-primary">
                  {brand.tier}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Count callout */}
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Authorized distributor for{" "}
          <span className="font-semibold text-foreground">20+ manufacturers</span>{" "}
          across solar, electrical, EV, and power storage
        </p>
      </div>
    </section>
  )
}
