import { Truck, ShieldCheck, Headphones, CreditCard, Award, Globe } from "lucide-react"

const pillars = [
  {
    icon: ShieldCheck,
    title: "Authorized Distributor",
    description: "Full OEM warranties from 50+ manufacturers. Not gray market, not third-party. Factory-direct, always.",
  },
  {
    icon: Truck,
    title: "Same-Day Shipping",
    description: "Orders placed by 2 PM PT ship the same business day from U.S. warehouses. Free freight on orders over $999.",
  },
  {
    icon: CreditCard,
    title: "Net-30 & Trade Pricing",
    description: "Approved accounts get 30-day payment terms and volume-tiered pricing. ACH, wire, and all major cards accepted.",
  },
  {
    icon: Headphones,
    title: "Named Account Rep",
    description: "A real person in Portland who knows your account, your projects, and picks up the phone when you call.",
  },
  {
    icon: Award,
    title: "Compliance Ready",
    description: "BABA compliant, UL listed, NABCEP certified. Full documentation for government and institutional procurement.",
  },
  {
    icon: Globe,
    title: "Backed by PES Global",
    description: "PES Supply is the distribution arm of PES Global. Local service, global supply chain, enterprise-grade operations.",
  },
]

export function WhyPes() {
  return (
    <section className="border-y border-border bg-muted/30" aria-label="Why PES Supply">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            Why Contractors and Enterprises Choose PES
          </h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            We are not a marketplace or a marketplace reseller. PES Supply is an authorized stocking distributor with a warehouse, a team, and a phone number.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <pillar.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-card-foreground">{pillar.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
