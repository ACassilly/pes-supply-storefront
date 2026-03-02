import Link from "next/link"
import { Home, ArrowRight } from "lucide-react"

export function ResidentialRedirect() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/[0.03] px-6 py-5 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Home className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Shopping for your home?</p>
            <p className="text-xs text-muted-foreground">
              PES Supply is built for contractors and businesses. Homeowners are welcome to browse, but for residential projects we recommend connecting with a licensed installer through Power Link.
            </p>
          </div>
        </div>
        <Link
          href="/powerlink"
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Find an Installer <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}
