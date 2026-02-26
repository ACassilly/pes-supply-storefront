"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { ProductCard } from "@/components/product-card"

const arrivals = [
  { slug: "sol-ark-15k-hybrid-inverter", name: "Sol-Ark 15K Hybrid Inverter", sku: "SA-15K", price: 3995.0, originalPrice: 4595.0, rating: 4.9, reviews: 187, image: "/images/product-inverter.jpg", badge: "Ready to Ship" as const, freeShipping: true },
  { slug: "mrcool-diy-24k-mini-split", name: "MRCOOL DIY 24K BTU Mini Split", sku: "MRC-DIY-24-HP", price: 1549.0, originalPrice: 1899.0, rating: 4.6, reviews: 893, image: "/images/cat-hvac.jpg", badge: "In Stock" as const, freeShipping: true },
  { slug: "tesla-wall-connector-gen3", name: "Tesla Wall Connector Gen 3", sku: "TSL-1457768", price: 475.0, originalPrice: 530.0, rating: 4.7, reviews: 891, image: "/images/product-ev-charger.jpg", badge: "In Stock" as const, freeShipping: true },
  { slug: "generac-22kw-standby-generator", name: "Generac 22kW Standby Generator", sku: "GEN-7043", price: 5299.0, originalPrice: 5799.0, rating: 4.6, reviews: 128, image: "/images/product-generator.jpg", badge: "In Stock" as const, freeShipping: true },
  { slug: "eaton-br-100a-panel", name: "Eaton BR 100A Main Breaker Panel", sku: "EAT-BR2020B100V", price: 89.95, originalPrice: 119.0, rating: 4.5, reviews: 892, image: "/images/product-panel.jpg", badge: "Ships Today" as const, freeShipping: false },
  { slug: "jinko-580w-bifacial-module", name: "Jinko 580W Bifacial Module", sku: "JKM580N-72HL4", price: 133.4, originalPrice: 174.0, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", badge: "Ready to Ship" as const, freeShipping: true },
]

export function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  function checkScroll() {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 5)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5)
  }

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" })
  }

  return (
    <section className="py-6 md:py-8">
        <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <h2 className="text-lg font-bold text-foreground">New Arrivals</h2>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/departments" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
            <div className="ml-2 hidden items-center gap-1 sm:flex">
              <button onClick={() => scroll("left")} disabled={!canLeft} className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30" aria-label="Scroll left">
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => scroll("right")} disabled={!canRight} className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-30" aria-label="Scroll right">
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="scrollbar-none flex gap-3 overflow-x-auto scroll-smooth"
        >
          {arrivals.map((p) => (
            <ProductCard key={p.slug} product={p} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  )
}
