import { Globe, Warehouse, ShieldCheck, Truck, ArrowRight } from "lucide-react"
import Link from "next/link"

const pillars = [
  {
    icon: Globe,
    title: "Global Sourcing",
    desc: "PES Global procures from manufacturers across North America, Asia, and Europe -- giving PES Supply pricing leverage independent distributors can't match.",
  },
  {
    icon: Warehouse,
    title: "Portlandia Logistics",
    desc: "Our in-house logistics arm picks, packs, and ships every order from Louisville, KY. No 3PL middlemen. When something goes wrong, our team fixes it -- not a call center.",
  },
  {
    icon: ShieldCheck,
    title: "Authorized Distributor",
    desc: "Every product carries full OEM warranty. No grey market, no counterfeit risk, no marketplace lottery. PES is the distributor of record on every invoice.",
  },
  {
    icon: Truck,
    title: "Single-Source Fulfillment",
    desc: "One PO, one shipment, one invoice. PES consolidates across 169 brands so you don't manage a dozen vendors for one job.",
  },
]

export function PesGlobalSection() {
  return (
    <section className="py-8 md:py-12" aria-label="About PES Global">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">A PES Global Company</p>
          <h2 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
            Local distributor. Global supply chain.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            PES Supply is backed by PES Global{"'"}s international procurement network, powered by Portlandia Logistics{"'"} in-house fulfillment, and built on 169 authorized brand partnerships. You get the pricing of a national distributor with the service of a local counter.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <p.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-card-foreground">{p.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Learn more about PES Global <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
