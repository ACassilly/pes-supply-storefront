const brands = [
  "Jinko Solar",
  "LONGi",
  "Canadian Solar",
  "Q Cells",
  "Trina Solar",
  "Enphase",
  "Sol-Ark",
  "SolarEdge",
  "EG4",
  "IronRidge",
  "Unirac",
  "SnapNrack",
  "Generac",
  "Eaton",
  "Schneider Electric",
  "Square D",
  "Siemens",
  "Leviton",
  "Southwire",
  "ChargePoint",
]

export function BrandPartners() {
  return (
    <section className="border-y border-border bg-card" aria-label="Brand partners">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold text-foreground">Bankable Brands, One Warehouse</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Tier-1 solar and trusted electrical manufacturers in stock and ready to ship
          </p>
        </div>
        <div className="overflow-hidden">
          <div className="flex animate-[scroll_40s_linear_infinite] gap-8">
            {[...brands, ...brands].map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="flex h-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 px-6"
              >
                <span className="whitespace-nowrap text-sm font-semibold text-muted-foreground">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
