export function DealTicker() {
  const deals = [
    "Complete 10kW Solar System $11,999 Delivered",
    "Solar Panels Up to 800W — Tier 1 Brands",
    "Standby Generators from $1,995 — In Stock",
    "Free Shipping on Orders Over $999",
    "Pro Accounts: Net-30 Terms Available",
  ]

  return (
    <div
      className="overflow-hidden border-y border-primary/20 bg-primary/5"
      aria-label="Current promotions"
    >
      <div
        className="flex whitespace-nowrap py-2"
        style={{
          animation: "scroll 40s linear infinite",
          width: "max-content",
        }}
      >
        {[...deals, ...deals, ...deals].map((deal, i) => (
          <span key={i} className="mx-6 text-sm font-medium text-foreground">
            <span className="mr-2 text-primary">&#9889;</span>
            {deal}
            <span className="ml-6 text-primary/30">{"\u2022"}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
