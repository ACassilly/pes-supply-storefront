import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Truck, CreditCard, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"

const highlights = [
  { icon: CreditCard, text: "Net-30 terms" },
  { icon: Truck, text: "Same-day shipping" },
  { icon: Headphones, text: "Named account rep" },
  { icon: ShieldCheck, text: "BABA compliant" },
]

export function ProCtaBanner() {
  return (
    <section className="border-y border-border bg-foreground" aria-label="Open a Pro Account">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:gap-10">
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg md:h-24 md:w-40">
          <Image src="/images/team-warehouse.jpg" alt="PES Supply warehouse team" fill className="object-cover" sizes="160px" loading="lazy" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg font-bold text-background md:text-xl">One store. One team. Everything handled.</h2>
          <p className="mt-1 text-sm text-background/60">Vendors list products on PES. We handle fulfillment, support, and warranties. You see one store. You get one invoice.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 md:justify-start">
            {highlights.map((h) => (
              <span key={h.text} className="flex items-center gap-1.5 text-xs text-background/70">
                <h.icon className="h-3.5 w-3.5 text-primary" /> {h.text}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button asChild className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/pro">Open a Pro Account <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-background/20 text-background hover:bg-background/10">
            <Link href="/quote">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
