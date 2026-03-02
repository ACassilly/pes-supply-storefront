import { ShieldCheck, Truck, FileText, Users, Phone, Zap, Package, Award } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: "169", label: "Authorized Brands" },
  { value: "10", label: "Stocking Locations" },
  { value: "48", label: "States Covered" },
  { value: "$999", label: "Free Freight Threshold" },
  { value: "2 PM", label: "Same-Day Cutoff (ET)" },
]

const pillars = [
  {
    icon: ShieldCheck,
    title: "Authorized Distributor",
    body: "Every product ships with the full manufacturer warranty. Direct from the factory, never gray market.",
  },
  {
    icon: Truck,
    title: "Portlandia Logistics",
    body: "Orders placed by 2 PM ET are processed same day. Shipped from the nearest manufacturer or stocking location.",
  },
  {
    icon: FileText,
    title: "BABA Compliance Built In",
    body: "Build America, Buy America documentation included with qualifying orders. Ready for federal and municipal procurement.",
  },
  {
    icon: Users,
    title: "Power Link Network",
    body: "The only distributor that sends you customers. Join our installer directory and get qualified leads by ZIP code.",
  },
  {
    icon: Phone,
    title: "Named Account Reps",
    body: "Call and reach a real person who knows your account. Net-30 terms, volume pricing, and dedicated support.",
  },
  {
    icon: Zap,
    title: "One Order, Every Trade",
    body: "Electrical, solar, HVAC, plumbing, tools, safety, and generators. One PO, one invoice across all trades.",
  },
]

const certBadges = [
  { label: "UL Listed", icon: ShieldCheck },
  { label: "BABA Compliant", icon: Award },
  { label: "Energy Star", icon: Package },
]

export function WhyPesStrip() {
  return (
    <section aria-label="Why choose PES Supply">
      {/* Stats bar */}
      <div className="border-y border-border bg-muted/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 py-6 md:justify-between">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <span className="text-xl font-black text-primary md:text-2xl">{s.value}</span>
              <span className="text-[11px] font-medium text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content with photo background */}
      <div className="relative overflow-hidden bg-foreground py-12 md:py-16">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: "url(/images/hero-commercial.jpg)" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/90 via-foreground/95 to-foreground" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-4">
          <h2 className="mb-1 text-center text-xl font-bold text-background md:text-2xl text-balance">
            Everything You Need, Backed by Experts
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-center text-sm text-background/50 text-pretty">
            A real distributor built for contractors, property managers, and procurement teams.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-xl border border-background/10 bg-background/5 p-5 backdrop-blur-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                  <p.icon className="h-4.5 w-4.5 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-background">{p.title}</h3>
                <p className="text-xs leading-relaxed text-background/50">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Certification badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {certBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 rounded-full border border-background/10 bg-background/5 px-4 py-2">
                <badge.icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-background/70">{badge.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Link href="/pro" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Open a Pro Account <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
