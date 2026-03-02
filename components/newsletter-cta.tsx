"use client"

import { useState } from "react"
import { Send, CheckCircle } from "lucide-react"

export function NewsletterCta() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden bg-foreground py-16">
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Stay connected</p>
          <h2 className="mb-3 text-xl font-bold text-background md:text-2xl text-balance">
            Industry updates, product drops, and contractor-only pricing
          </h2>
          <p className="mb-8 text-sm text-background/50">
            NEC code changes, new product lines, volume pricing alerts, and BABA updates. Sent when it matters, not on a schedule. No spam.
          </p>

          {submitted ? (
            <div className="mx-auto flex max-w-sm items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-6 py-4">
              <CheckCircle className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium text-background">You are on the list. Watch your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 min-w-0 flex-1 rounded-lg border border-background/20 bg-background/10 px-4 text-sm text-background placeholder:text-background/30 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="flex h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          )}

          <p className="mt-4 text-[10px] text-background/30">
            No spam. Unsubscribe anytime. We do not sell your information.
          </p>
        </div>
      </div>
    </section>
  )
}
