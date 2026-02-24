import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="bg-primary" aria-label="Newsletter signup">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center md:flex-row md:text-left">
        <div className="flex-1">
          <h2 className="mb-1 text-xl font-bold text-primary-foreground">
            Stay Connected with Industry Updates
          </h2>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Weekly updates on new products, market trends, flash sales, and industry insights.
          </p>
        </div>
        <form className="flex w-full max-w-md gap-2">
          <Input
            type="email"
            placeholder="Enter your email address"
            className="h-11 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
          />
          <Button
            type="button"
            size="lg"
            className="shrink-0 gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Send className="h-4 w-4" />
            Subscribe
          </Button>
        </form>
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-primary-foreground/60 md:hidden">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> No spam
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Industry content only
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Unsubscribe anytime
          </span>
        </div>
      </div>
    </section>
  )
}
