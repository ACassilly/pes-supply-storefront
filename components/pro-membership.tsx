import Image from "next/image"
import { DollarSign, Zap, FileText, Headphones, ArrowRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: DollarSign,
    title: "Contractor Pricing",
    description: "Exclusive rates and volume discounts on every order",
  },
  {
    icon: Zap,
    title: "Priority Stock Access",
    description: "First access to new inventory and pre-order releases",
  },
  {
    icon: FileText,
    title: "Expedited Processing",
    description: "Same-day order processing and priority shipping",
  },
  {
    icon: Headphones,
    title: "Dedicated Rep",
    description: "Named account rep who knows your projects and preferences",
  },
]

export function ProMembership() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Pro membership">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col lg:flex-row">
          {/* Left content */}
          <div className="flex-1 p-6 lg:p-10">
            <span className="mb-2 inline-block rounded-md bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
              Pro Network
            </span>
            <h2 className="mb-2 text-2xl font-bold text-card-foreground">
              PES Pro Account
            </h2>
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
              Premium benefits and exclusive access for established solar
              contractors and electrical professionals. Extended-hour coverage
              through our global sales team.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-card-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Team photo strip */}
            <div className="mt-6 flex items-center gap-4 rounded-lg bg-muted/50 p-4">
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src="/images/team-warehouse.jpg"
                  alt="PES.supply warehouse team"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-card-foreground">
                  Our team ships from 3 U.S. warehouses
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">
                  Real people picking, packing, and supporting every order.
                  Talk to us at (888) 876-0007.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Apply for Pro Account
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span>
                  <span className="font-semibold text-foreground">2,100+</span>{" "}
                  active Pro members
                </span>
              </div>
            </div>
          </div>

          {/* Right - Quote form */}
          <div className="border-t border-border bg-muted/50 p-6 lg:w-96 lg:border-l lg:border-t-0 lg:p-10">
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              Build a Project Cart
            </h3>
            <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
              Tell us about your project and we&apos;ll put together a
              right-sized BOM with pricing.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Project Address / Jobsite"
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <select
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-card-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Project type"
              >
                <option value="">Project Type</option>
                <option value="residential-solar">Residential Solar</option>
                <option value="commercial-solar">Commercial Solar</option>
                <option value="electrical-service">Electrical Service</option>
                <option value="ev-charging">EV Charging Install</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Contact Name"
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="button"
                className="mt-1 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get My Project Quote
              </Button>
              <p className="text-center text-[10px] text-muted-foreground leading-relaxed">
                Detailed BOM with equipment specs and pricing within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
