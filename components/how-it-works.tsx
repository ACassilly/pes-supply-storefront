import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Search, Layers, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    image: "/images/step-search.jpg",
    title: "Find a Part",
    description: "Search by SKU, keyword, or brand. Browse 10 departments and 100k+ products. Need help? Your rep can pull it up for you.",
    link: { label: "Browse Products", href: "/departments" },
    icon: Search,
  },
  {
    number: "02",
    image: "/images/step-ship.jpg",
    title: "Build a Kit or Pallet / Container Deal",
    description: "Bundle products into a project kit, request pallet pricing, or go full container-load for max savings. We quote it same day.",
    link: { label: "Request a Quote", href: "/quote" },
    icon: Layers,
  },
  {
    number: "03",
    image: "/images/step-deliver.jpg",
    title: "Book Your Order",
    description: "Check out online, call your rep, or submit a PO. We process same day and ship from the nearest of our 10 locations.",
    link: { label: "Shipping Details", href: "/shipping" },
    icon: ShoppingCart,
  },
]

export function HowItWorks() {
  return (
    <section className="py-6 md:py-8" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-1 text-center text-xs font-semibold uppercase tracking-widest text-primary">How It Works</p>
        <h2 id="how-it-works-heading" className="mb-1 text-center text-lg font-bold text-foreground md:text-xl text-balance">
          Three steps. No nonsense.
        </h2>
        <p className="mx-auto mb-6 max-w-lg text-center text-xs text-muted-foreground text-pretty">
          Find exactly what you need, bundle it your way, and get it shipped from the closest warehouse. Trade pricing on every order.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col rounded-xl border border-border bg-card p-4">
              {/* Photo */}
              <div className="relative mb-3 aspect-[16/10] w-full overflow-hidden rounded-lg">
                <Image src={step.image} alt={step.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" loading="lazy" />
                <div className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground">{step.number}</div>
              </div>

              <h3 className="mb-1.5 text-sm font-bold text-card-foreground">{step.title}</h3>
              <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>

              <Link href={step.link.href} className="text-xs font-semibold text-primary hover:underline">
                {step.link.label}
              </Link>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button asChild size="lg" className="gap-2">
            <a href="#pro-account">
              I{"'"}m a Pro <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <Link href="#find-a-pro">
              Need a Pro for Your Job? <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
