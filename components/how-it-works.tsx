import Link from "next/link"
import { ArrowRight, Search, Layers, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    title: "Find a Part",
    description: "Search by SKU, keyword, or brand across 10 departments and 100k+ products.",
    link: { label: "Browse Products", href: "/departments" },
    icon: Search,
  },
  {
    number: "02",
    title: "Build a Kit or Pallet / Container Deal",
    description: "Bundle into a kit, request pallet pricing, or go container-load for max savings.",
    link: { label: "Request a Quote", href: "/quote" },
    icon: Layers,
  },
  {
    number: "03",
    title: "Book Your Order",
    description: "Check out online, call your rep, or submit a PO. We ship same day.",
    link: { label: "Shipping Details", href: "/shipping" },
    icon: ShoppingCart,
  },
]

export function HowItWorks() {
  return (
    <section className="py-4 md:py-5" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-3 flex flex-col items-center gap-0.5 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">How It Works</p>
          <h2 id="how-it-works-heading" className="text-base font-bold text-foreground md:text-lg text-balance">
            Three steps. No nonsense.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex items-start gap-3 rounded-lg border border-border bg-card p-3">
              {/* Number + Icon */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <step.icon className="h-4 w-4 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] font-black text-primary">{step.number}</span>
                  <h3 className="text-xs font-bold text-card-foreground">{step.title}</h3>
                </div>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{step.description}</p>
                <Link href={step.link.href} className="mt-1 inline-block text-[11px] font-semibold text-primary hover:underline">
                  {step.link.label}
                </Link>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="absolute -right-2.5 top-1/2 hidden h-px w-5 bg-border sm:block" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <Button asChild size="sm" className="gap-1.5">
            <a href="#pro-account">
              I{"'"}m a Pro <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-1.5 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <Link href="#find-a-pro">
              Need a Pro for Your Job? <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
