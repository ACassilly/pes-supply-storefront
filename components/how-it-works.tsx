import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    image: "/images/step-find-part.jpg",
    title: "Find a Part",
    description: "Search 40,000+ SKUs by part number, keyword, or brand. Electrical, solar, HVAC, plumbing, generators -- all in one catalog.",
    link: { label: "Browse 10 Departments", href: "/departments" },
  },
  {
    number: "02",
    image: "/images/step-build-kit.jpg",
    title: "Build a Kit",
    description: "Bundle what you need into a ready-to-ship kit. We build project kits and full pallet or container deals for:",
    link: { label: "Request a Kit Quote", href: "/quote" },
    kits: ["Solar", "Battery & ESS", "Generator", "HVAC", "EV Charger"],
  },
  {
    number: "03",
    image: "/images/step-book-order.jpg",
    title: "Book Your Order",
    description: "Check out online, call your rep, or email a PO. Orders placed by 2 PM ET ship same day from the nearest of our 10 locations.",
    link: { label: "Shipping & Delivery", href: "/shipping" },
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
            <div key={step.number} className="relative flex flex-col overflow-hidden rounded-lg border border-border bg-card">
              {/* Photo */}
              <div className="relative aspect-[16/9] w-full">
                <Image src={step.image} alt={step.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" loading="lazy" />
                <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">{step.number}</div>
              </div>

              <div className="flex flex-1 flex-col p-3">
                <h3 className="text-xs font-bold text-card-foreground">{step.title}</h3>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{step.description}</p>

                {/* Kit types for step 2 */}
                {step.kits && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {step.kits.map((kit) => (
                      <span key={kit} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{kit}</span>
                    ))}
                  </div>
                )}

                <Link href={step.link.href} className="mt-2 inline-block text-[11px] font-semibold text-primary hover:underline">
                  {step.link.label} {"\u2192"}
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
