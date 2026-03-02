import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function ShippingZoneTeaser() {
  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-1 text-center text-xl font-bold text-foreground md:text-2xl">
          Nationwide Delivery, Coordinated by PES
        </h2>
        <p className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-primary">
          Portlandia Logistics
        </p>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          We manage the carrier relationship -- you deal with us, not the shipping company.
        </p>

        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {/* Delivery Zone Map */}
          <div className="relative bg-muted/20">
            <Image
              src="/images/pes-delivery-zones-map.jpg"
              alt="PES Supply estimated ground delivery windows map showing Zone 1 (1-3 days) through Zone 4 (5-7 days), 10 stocking partner locations, Louisville KY network operations, and port cities at LA/Long Beach, Houston, and Newark NJ"
              width={1500}
              height={844}
              className="w-full"
              priority
            />
          </div>

          {/* Delivery Methods */}
          <div className="border-t border-border bg-muted/20">
            <Image
              src="/images/pes-delivery-methods.jpg"
              alt="PES Supply delivery methods: Standard Delivery for small items via UPS/FedEx/USPS in 3-7 days, Scheduled Delivery for palletized orders with liftgate available at $75-$125 in 5-10 days, and Project Delivery for full trucks with dedicated PES rep coordination and custom quotes"
              width={1500}
              height={544}
              className="w-full"
            />
          </div>

          {/* CTA bar */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-border bg-card px-6 py-4 md:flex-row">
            <div>
              <p className="text-sm font-bold text-foreground">
                Free freight on qualified orders $999+
              </p>
              <p className="text-xs text-muted-foreground">
                Every shipment fully insured. Pro Account holders get reduced thresholds.
              </p>
            </div>
            <Link
              href="/shipping"
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Full Shipping Details <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
