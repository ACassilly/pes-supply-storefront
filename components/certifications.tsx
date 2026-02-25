import { ShieldCheck, Award, CheckCircle, Globe } from "lucide-react"

const certs = [
  { name: "UL Listed", desc: "Products tested and certified for safety by Underwriters Laboratories.", icon: ShieldCheck },
  { name: "BABA Compliant", desc: "Meets Build America, Buy America requirements for federal and municipal procurement.", icon: Award },
  { name: "NABCEP Certified", desc: "Solar products and installation standards certified by NABCEP.", icon: CheckCircle },
  { name: "Energy Star", desc: "EPA-certified products that meet strict energy efficiency guidelines.", icon: Globe },
]

export function Certifications() {
  return (
    <section className="border-y border-border bg-muted/30 py-6 md:py-8">
      <div className="mx-auto max-w-[1400px] px-4">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Compliance & Certifications</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {certs.map((cert) => (
            <div key={cert.name} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card px-4 py-5 text-center transition-colors hover:border-primary/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <cert.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-bold text-card-foreground">{cert.name}</p>
              <p className="text-[11px] leading-relaxed text-muted-foreground">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
