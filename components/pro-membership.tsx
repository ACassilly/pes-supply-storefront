import Image from "next/image"
import { ArrowRight, Users, Zap, FileText, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Zap,
    title: "Contractor Pricing",
    desc: "Volume discounts and competitive trade pricing on every order",
  },
  {
    icon: FileText,
    title: "Net-30 Terms",
    desc: "Approved accounts get 30-day payment terms, no questions",
  },
  {
    icon: Headphones,
    title: "Named Account Rep",
    desc: "A real person in Portland who knows your projects and picks up the phone",
  },
  {
    icon: Users,
    title: "Priority Processing",
    desc: "Orders placed by 2pm PT ship same day, with tracking in your inbox",
  },
]

export function ProMembership() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Pro account">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col lg:flex-row">
          {/* Left */}
          <div className="flex-1 p-6 lg:p-10">
            <span className="mb-2 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              PES Pro Network
            </span>
            <h2 className="mb-2 text-2xl font-bold text-card-foreground">
              Open a Pro Account
            </h2>
            <p className="mb-6 max-w-lg text-sm text-muted-foreground leading-relaxed">
              PES Supply is the distribution arm of PES Global. Pro account
              holders get trade pricing, Net-30 terms, a named rep, and access
              to 40,000+ products from 50+ manufacturers -- all backed by a
              global supply chain and a local team in Portland.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <b.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-card-foreground">
                      {b.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Team */}
            <div className="mt-6 flex items-center gap-4 rounded-lg bg-muted/50 p-4">
              <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src="/images/team-warehouse.jpg"
                  alt="PES Supply warehouse team"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-card-foreground">
                  Real people. Real warehouse. Portland, OR.
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Our team picks, packs, and supports every order. Call (888) 876-0007.
                </p>
              </div>
            </div>
          </div>

          {/* Right - form */}
          <div className="border-t border-border bg-muted/50 p-6 lg:w-96 lg:border-l lg:border-t-0 lg:p-10">
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              Apply or Request a Quote
            </h3>
            <p className="mb-4 text-xs text-muted-foreground">
              Takes 2 minutes. Our team responds within one business day.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Company Name"
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <select
                className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="What do you need?"
              >
                <option value="">What are you looking for?</option>
                <option value="pro">Pro Account (trade pricing + terms)</option>
                <option value="quote">Project Quote</option>
                <option value="bulk">Bulk / Pallet Pricing</option>
                <option value="other">Something Else</option>
              </select>
              <Button
                type="button"
                className="mt-1 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Submit
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-[10px] text-muted-foreground">
                Response within 1 business day from our Portland team
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
