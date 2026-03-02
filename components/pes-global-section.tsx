import { Globe, Route, ShieldCheck, Truck, ArrowRight } from "lucide-react"
import Link from "next/link"

const pillars = [
  {
    icon: Globe,
    title: "We Source It",
    desc: "PES Global buys direct from manufacturers in the US, Asia, and Europe. That sourcing leverage is why our pricing beats local supply houses on volume.",
  },
  {
    icon: Route,
    title: "We Ship It",
    desc: "Portlandia Logistics routes from the closest of 10 stocking locations. Parcel, LTL, FTL, intermodal, hot-shot -- we pick the fastest, cheapest path and manage the carrier.",
  },
  {
    icon: ShieldCheck,
    title: "We Stand Behind It",
    desc: "PES is the distributor of record. Full OEM warranty on every product. If something is wrong, you call us -- not a manufacturer hotline in another country.",
  },
  {
    icon: Truck,
    title: "One PO. One Invoice.",
    desc: "Electrical, solar, HVAC, plumbing, tools, safety, EV, generators -- all on one purchase order. One rep handles it. One invoice to process.",
  },
]

export function PesGlobalSection() {
  return (
    <section className="py-8 md:py-12" aria-label="About PES Global">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">A PES Global Company</p>
          <h2 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
            National pricing. Local service. Global sourcing.
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            PES Supply is the distribution arm of PES Global. We source from 300+ manufacturers across three continents, then ship through Portlandia Logistics using 14,000+ vetted carriers. You get the volume pricing of a national distributor and a rep who knows your name.
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
