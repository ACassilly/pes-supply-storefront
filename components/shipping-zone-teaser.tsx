import Link from "next/link"
import { Truck, ArrowRight, MapPin, Clock } from "lucide-react"

export function ShippingZoneTeaser() {
  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid items-center md:grid-cols-2">
            {/* Left: Map visualization */}
            <div className="relative flex items-center justify-center bg-muted/50 px-6 py-8 md:px-10 md:py-12">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">Louisville, KY</p>
                  <p className="mt-1 text-sm text-muted-foreground">Central US fulfillment center</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center rounded-lg bg-card px-4 py-3 shadow-sm">
                    <span className="text-lg font-black text-primary">1 day</span>
                    <span className="text-[10px] text-muted-foreground">KY, IN, OH, TN</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-card px-4 py-3 shadow-sm">
                    <span className="text-lg font-black text-primary">2 days</span>
                    <span className="text-[10px] text-muted-foreground">Most of East Coast</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-card px-4 py-3 shadow-sm">
                    <span className="text-lg font-black text-primary">3-5 days</span>
                    <span className="text-[10px] text-muted-foreground">West Coast & FL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy + CTA */}
            <div className="flex flex-col gap-4 px-6 py-8 md:px-10">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">In-House Logistics. Not a 3PL.</h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                PES runs its own warehouse, picks every order, and manages carrier relationships directly.
                No third-party fulfillment, no blind drop-ships. When we say "ships today" we mean our team packed it in Louisville this morning.
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-2 text-sm text-card-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span>Order by 2 PM ET for same-day dispatch</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-card-foreground">
                  <Truck className="h-3.5 w-3.5 text-primary" />
                  <span>Free freight on orders $999+</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-card-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>1-2 day ground to 60% of the US</span>
                </li>
              </ul>
              <Link href="/shipping" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                View full shipping zone map <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
