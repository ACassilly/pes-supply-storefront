import { ShieldCheck, Truck, FileText, Users, Phone, Zap } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const pillars = [
  {
    icon: ShieldCheck,
    title: "Authorized Distributor",
    body: "Every product ships with the full manufacturer warranty. 169 brands, direct from the factory.",
  },
  {
    icon: Truck,
    title: "Portlandia Logistics",
    body: "Orders placed by 2 PM ET are processed same day. Portlandia Logistics routes every shipment from the nearest manufacturer or stocking location.",
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

export function WhyPesStrip() {
  return (
    <section className="py-10 md:py-14" aria-label="Why choose PES Supply">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-1 text-center text-xl font-bold text-foreground md:text-2xl text-balance">What You Get with PES Supply</h2>
        <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground text-pretty">
          A real distributor built for contractors, property managers, and procurement teams.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <p.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <h3 className="mb-1 text-sm font-bold text-card-foreground">{p.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/pro" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Open a Pro Account <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
