import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ResidentialRedirect() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="relative flex flex-col items-center justify-between gap-4 overflow-hidden rounded-xl border border-primary/20 px-6 py-6 sm:flex-row sm:gap-6">
        {/* Background photo */}
        <Image
          src="/images/residential-home.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" aria-hidden="true" />
        <div className="relative flex flex-1 items-center gap-4">
          <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg sm:block">
            <Image src="/images/residential-home.jpg" alt="Modern home with solar panels and EV charger" fill className="object-cover" sizes="96px" loading="lazy" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Shopping for your home?</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              PES is built for contractors and businesses. For residential projects, connect with a licensed installer through Power Link -- free, no middleman.
            </p>
          </div>
        </div>
        <Link
          href="/powerlink"
          className="relative flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Find an Installer <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
