import Image from "next/image"
import Link from "next/link"

const verticals = [
  { title: "Contractors & Trades", desc: "Net-30, named reps, same-day ship", image: "/images/vertical-contractor.jpg", href: "/pro" },
  { title: "Property Managers", desc: "No minimums, easy reorder, bulk lamps", image: "/images/vertical-property.jpg", href: "/pro" },
  { title: "Government & Municipal", desc: "BABA compliant, procurement docs", image: "/images/vertical-government.jpg", href: "/pro" },
  { title: "Solar Installers", desc: "Pallet pricing, Tier 1 modules, racking", image: "/images/vertical-solar.jpg", href: "/departments/solar" },
]

export function WhoWeServe() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6" aria-labelledby="who-we-serve-heading">
      <h2 id="who-we-serve-heading" className="mb-1 text-lg font-bold text-foreground">Who We Serve</h2>
      <p className="mb-4 text-xs text-muted-foreground">PES is built for professionals. Pick your lane.</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {verticals.map((v) => (
          <Link key={v.title} href={v.href} className="group relative flex flex-col justify-end overflow-hidden rounded-lg border border-border aspect-[4/3]">
            <Image src={v.image} alt={v.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative p-3">
              <h3 className="text-sm font-bold text-white group-hover:text-primary-foreground">{v.title}</h3>
              <p className="mt-0.5 text-[11px] leading-snug text-white/70">{v.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
