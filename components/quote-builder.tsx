"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"

const categories = [
  { id: "electrical", label: "Electrical", image: "/images/quote-electrical.jpg" },
  { id: "solar", label: "Solar", image: "/images/quote-solar.jpg" },
  { id: "generators", label: "Backup Power", image: "/images/quote-generator.jpg" },
  { id: "tools", label: "Tools", image: "/images/quote-tools.jpg" },
  { id: "hvac", label: "HVAC", image: "/images/quote-hvac.jpg" },
  { id: "plumbing", label: "Plumbing", image: "/images/quote-plumbing.jpg" },
]

const benefits = [
  "Pallet and container pricing -- not retail markup",
  "Our team reviews your BOM and flags substitutions",
  "BABA documentation included at no extra charge",
  "Net-30 terms. No deposit required on qualified accounts.",
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
              Tell us what you need. We price it.
            </h2>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-primary-foreground/70">
              Pick your departments, send a parts list or project scope, and we come back with volume pricing, lead times, and delivery coordination.
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
                    className={`flex flex-col items-center gap-1.5 overflow-hidden rounded-lg border text-center transition-all ${
                      isActive
                        ? "border-primary-foreground ring-2 ring-primary-foreground/50"
                        : "border-primary-foreground/20 hover:border-primary-foreground/40"
                    }`}
                  >
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image src={cat.image} alt={cat.label} fill sizes="80px" className={`object-cover transition-opacity ${isActive ? "opacity-100" : "opacity-60"}`} loading="lazy" />
                    </div>
                    <span className={`pb-2 text-[10px] font-semibold ${isActive ? "text-primary-foreground" : "text-primary-foreground/60"}`}>{cat.label}</span>
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
