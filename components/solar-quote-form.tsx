"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Truck, FileText } from "lucide-react"

export function SolarQuoteForm() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10" aria-label="Get a custom solar quote">
      <div className="overflow-hidden rounded-xl border border-primary/20 bg-primary/5">
        <div className="flex flex-col lg:flex-row">
          {/* Left: messaging */}
          <div className="flex-1 p-6 lg:p-10">
            <span className="mb-2 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Custom Solar Quote
            </span>
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Get Your Custom Solar Quote
            </h2>
            <p className="mb-6 max-w-lg text-sm text-muted-foreground leading-relaxed">
              Submit your electric bill and property details for a comprehensive
              solar system quote. Includes equipment, installation, and financing
              options.
            </p>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Detailed quote with equipment specs and pricing in less than 24 hours
              </span>
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Includes freight and installation options
              </span>
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                NABCEP-certified design review
              </span>
            </div>
          </div>

          {/* Right: form */}
          <div className="border-t border-primary/20 bg-card p-6 lg:w-[420px] lg:border-l lg:border-t-0 lg:p-10">
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Property Address"
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="text"
                placeholder="Average Monthly Electric Bill"
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="text"
                placeholder="Contact Name"
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="button"
                size="lg"
                className="mt-1 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get My Custom Solar Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
