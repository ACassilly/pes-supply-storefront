import Image from "next/image"
import { ShieldCheck, Award, CheckCircle, Leaf } from "lucide-react"

const certs = [
  {
    name: "UL Listed",
    desc: "Products tested and certified for safety by Underwriters Laboratories.",
    icon: ShieldCheck,
    badgeText: "UL",
  },
  {
    name: "BABA Compliant",
    desc: "Meets Build America, Buy America requirements for federal and municipal procurement.",
    icon: Award,
    badgeText: "BABA",
  },
  {
    name: "NABCEP Certified",
    desc: "Solar products and installation standards certified by the North American Board of Certified Energy Practitioners.",
    icon: CheckCircle,
    badgeText: "NABCEP",
  },
  {
    name: "Energy Star",
    desc: "EPA-certified products that meet strict energy efficiency guidelines.",
    icon: Leaf,
    badgeText: "ES",
  },
]

export function Certifications() {
  return (
    <section className="border-y border-border bg-muted/30 py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Compliance & Certifications</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {certs.map((cert) => (
            <div key={cert.name} className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card px-4 py-5 text-center transition-colors hover:border-primary/30">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border-2 border-primary/20 bg-primary/5">
                <span className="text-sm font-black tracking-tight text-primary">{cert.badgeText}</span>
              </div>
              <div>
                <p className="text-sm font-bold text-card-foreground">{cert.name}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
