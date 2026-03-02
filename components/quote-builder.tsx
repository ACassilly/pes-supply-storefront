"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Zap, Sun, Wind, Wrench, Flame, Droplets, ArrowRight, CheckCircle,
} from "lucide-react"

const categories = [
  { id: "electrical", label: "Electrical", icon: Zap },
  { id: "solar", label: "Solar", icon: Sun },
  { id: "generators", label: "Backup Power", icon: Wind },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "hvac", label: "HVAC", icon: Flame },
  { id: "plumbing", label: "Plumbing", icon: Droplets },
]

const benefits = [
  "Volume pricing on pallet and container quantities",
  "Custom BOM review by our engineering team",
  "BABA compliance documentation included",
  "Net-30 terms for qualified accounts",
]

export function QuoteBuilder() {
  const [selected, setSelected] = useState<string[]>([])

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const queryParam = selected.length > 0 ? `?departments=${selected.join(",")}` : ""

  return (
    <section className="bg-primary py-10 md:py-14" aria-labelledby="quote-heading">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left -- copy and benefits */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
              Project Quotes
            </p>
            <h2 id="quote-heading" className="mb-3 text-xl font-bold text-primary-foreground md:text-2xl text-balance">
              Get Your Custom Quote
            </h2>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-primary-foreground/70">
              Select the departments you need, and our team will build a custom quote with volume pricing, lead times, and compliance documentation.
            </p>

            <ul className="flex flex-col gap-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-primary-foreground/80">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-foreground/50" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right -- category selector and CTA */}
          <div className="rounded-xl bg-primary-foreground/10 p-6 backdrop-blur-sm">
            <p className="mb-4 text-sm font-semibold text-primary-foreground">
              What are you quoting?
            </p>
            <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-3">
              {categories.map((cat) => {
                const isActive = selected.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggle(cat.id)}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 text-center transition-all ${
                      isActive
                        ? "border-primary-foreground bg-primary-foreground/20 text-primary-foreground"
                        : "border-primary-foreground/20 bg-transparent text-primary-foreground/60 hover:border-primary-foreground/40 hover:text-primary-foreground/80"
                    }`}
                  >
                    <cat.icon className="h-5 w-5" />
                    <span className="text-[10px] font-semibold">{cat.label}</span>
                  </button>
                )
              })}
            </div>

            <Button
              size="lg"
              className="w-full gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
            >
              <Link href={`/quote${queryParam}`}>
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <p className="mt-3 text-center text-[11px] text-primary-foreground/50">
              Or call <a href="tel:8888760007" className="font-semibold text-primary-foreground/70 hover:underline">(888) 876-0007</a> to speak with a rep now.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
