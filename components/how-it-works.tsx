import { UserPlus, Search, Truck, MapPin } from "lucide-react"
import Link from "next/link"

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Open a Pro Account",
    description: "Takes 5 minutes. Gets you trade pricing, Net-30 terms, and a named rep who actually picks up the phone.",
    link: { label: "Apply Now", href: "/pro" },
  },
  {
    number: "02",
    icon: Search,
    title: "Search, Quote, or Reorder",
    description: "Browse the catalog. Paste SKUs into Quick Order Pad. Upload a project BOM for a custom quote. Whatever is fastest for you.",
    link: { label: "Request a Quote", href: "/quote" },
  },
  {
    number: "03",
    icon: Truck,
    title: "We Ship It",
    description: "Order by 2 PM ET, it processes same day. Ships from whichever of our 10 locations is closest to your jobsite.",
    link: { label: "Shipping Details", href: "/shipping" },
  },
  {
    number: "04",
    icon: MapPin,
    title: "Track It to the Door",
    description: "Real-time tracking on every shipment -- parcel or freight. Liftgate, scheduled delivery, and will-call available.",
    link: { label: "Delivery Options", href: "/shipping" },
  },
]

export function HowItWorks() {
  return (
    <section className="py-10 md:py-14" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-primary">How It Works</p>
        <h2 id="how-it-works-heading" className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl text-balance">
          Account to delivery. Four steps. No nonsense.
        </h2>
        <p className="mx-auto mb-10 max-w-md text-center text-sm text-muted-foreground text-pretty">
          No minimums. No upsell games. No chasing your freight. Just materials at trade pricing, shipped from the nearest location.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col rounded-xl border border-border bg-card p-6">
              {/* Step number */}
              <span className="mb-4 text-3xl font-black text-primary/15">{step.number}</span>

              {/* Icon */}
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" />
              </div>

              <h3 className="mb-1.5 text-sm font-bold text-card-foreground">{step.title}</h3>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>

              <Link href={step.link.href} className="text-xs font-semibold text-primary hover:underline">
                {step.link.label}
              </Link>

              {/* Connector line on larger screens */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border lg:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
