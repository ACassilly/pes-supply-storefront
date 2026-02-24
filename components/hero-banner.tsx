"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
} from "lucide-react"

/* ── Hero product cards (PES.supply style) ── */
const heroProducts = [
  {
    tag: "MOST POPULAR",
    tag2: "COMPLETE TURNKEY",
    title: "Complete 10kW Solar System",
    price: "$11,999",
    priceNote: "Delivered",
    wasPrice: "$12,999",
    save: "Save $1,000",
    description:
      "Complete turnkey system with Tier 1 panels up to 800W, hybrid inverter, racking, and nationwide freight included",
    bullets: [
      "JA Solar 580W Panels",
      "Sol-Ark 12K Hybrid Inverter",
      "IronRidge Racking System",
      "25-Year Warranties",
    ],
    cta: "View Complete System",
    image: "/images/hero-solar.jpg",
  },
  {
    tag: "TIER 1 CERTIFIED",
    title: "Tier 1 Solar Panels",
    price: "from $0.23",
    priceNote: "/W",
    wasPrice: "$0.31/W",
    save: "Save 26% OFF",
    description:
      "Tier 1 Solar Modules up to 800W — All modules Tier 1 per BloombergNEF, updated quarterly",
    bullets: [
      "JA Solar TopCon",
      "Longi Hi-MO 6",
      "Jinko Tiger Neo",
      "Up to 800W Output",
    ],
    cta: "Shop Solar Panels",
    image: "/images/product-solar-panel.jpg",
  },
  {
    tag: "COMMERCIAL GRADE",
    title: "Standby Generators",
    price: "from $1,995",
    wasPrice: "$2,495",
    save: "Save $500 OFF",
    description:
      "Automatic standby generators for residential and commercial applications, expert installation available",
    bullets: [
      "Generac Guardian",
      "Kohler Standby",
      "Automatic Transfer Switch",
      "Natural Gas & LP",
    ],
    cta: "Shop Generators",
    image: "/images/product-generator.jpg",
  },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % heroProducts.length),
      8000
    )
  }

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function go(dir: number) {
    setCurrent(
      (p) => (p + dir + heroProducts.length) % heroProducts.length
    )
    resetTimer()
  }

  const card = heroProducts[current]

  return (
    <section aria-label="Hero" className="bg-foreground">
      <div className="relative mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
        {/* Left: background image */}
        <div className="relative hidden min-h-[480px] overflow-hidden lg:block">
          <Image
            src={card.image}
            alt=""
            fill
            className="object-cover opacity-40"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
          <div className="relative flex h-full flex-col justify-end p-10">
            <h1 className="max-w-md text-pretty text-4xl font-bold leading-tight text-background">
              Power Your Home &amp; Business
            </h1>
            <p className="mt-2 max-w-sm text-sm text-background/60 leading-relaxed">
              Top brands, unbeatable prices, fast delivery, and real support
              for pros and homeowners alike.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => go(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {heroProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrent(i)
                      resetTimer()
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current
                        ? "w-8 bg-primary"
                        : "w-3 bg-background/30"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: product card */}
        <div className="flex items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-md rounded-xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge className="bg-primary text-primary-foreground text-[10px] font-bold uppercase">
                {card.tag}
              </Badge>
              {card.tag2 && (
                <Badge variant="outline" className="border-primary/50 text-primary text-[10px] font-bold uppercase">
                  {card.tag2}
                </Badge>
              )}
            </div>

            <h2 className="mb-2 text-2xl font-bold text-background lg:text-3xl">
              {card.title}
            </h2>

            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-primary lg:text-4xl">
                {card.price}
              </span>
              {card.priceNote && (
                <span className="text-sm text-background/60">
                  {card.priceNote}
                </span>
              )}
            </div>
            <div className="mb-4 flex items-center gap-3 text-sm">
              <span className="text-background/40 line-through">
                Was {card.wasPrice}
              </span>
              <span className="font-semibold text-sale">{card.save}</span>
            </div>

            <p className="mb-4 text-sm text-background/60 leading-relaxed">
              {card.description}
            </p>

            <ul className="mb-6 flex flex-col gap-2">
              {card.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm text-background/80"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {card.cta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile: nav dots below card */}
        <div className="flex items-center justify-center gap-3 pb-6 lg:hidden">
          <button
            onClick={() => go(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {heroProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i)
                  resetTimer()
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-8 bg-primary" : "w-3 bg-background/30"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
