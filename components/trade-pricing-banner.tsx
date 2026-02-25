import Link from "next/link"
import { Lock, ArrowRight } from "lucide-react"

export function TradePricingBanner() {
  return (
    <section className="border-y border-primary/20 bg-primary/5">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">
              Trade pricing available.{" "}
              <span className="font-normal text-muted-foreground">Sign in or create a Pro Account to unlock contractor pricing on every product.</span>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/account"
            className="hidden items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary sm:flex"
          >
            Sign In
          </Link>
          <Link
            href="/pro"
            className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Open Pro Account <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
