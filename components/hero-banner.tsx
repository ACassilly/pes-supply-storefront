"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, Truck, ShieldCheck, Phone, Star } from "lucide-react"

const slides = [
  {
    eyebrow: "PES Supply | A PES Global Company",
    headline: "40,000+ Products. In Stock. Ships Today.",
    subline: "Electrical, solar, lighting, tools, HVAC, plumbing, and more from 169 brands and 500+ vendors.",
    cta: "Shop All Products", ctaSecondary: "Open a Pro Account",
    image: "/images/hero-commercial.jpg",
  },
  {
    eyebrow: "For Contractors & Trades",
    headline: "Net-30 Terms. Same-Day Shipping. Real People.",
    subline: "From breakers and wire to solar panels and generators -- one distributor, one PO, one call to our Louisville team.",
    cta: "Apply for Trade Pricing", ctaSecondary: "Shop Electrical",
    image: "/images/hero-workshop.jpg",
  },
  {
    eyebrow: "Enterprise & Government",
    headline: "BABA Compliant. UL Listed. Procurement Ready.",
    subline: "Serving municipalities, school districts, and Fortune 500 operations with compliance and volume pricing.",
    cta: "Contact Sales", ctaSecondary: "View Certifications",
    image: "/images/hero-solar.jpg",
  },
]

const heroProducts = [
  { name: "Square D 200A Main Breaker Panel", price: 189.95, was: 234.00, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", tag: "Best Seller" },
  { name: "Jinko 580W Bifacial Module", price: 133.40, was: 174.00, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", tag: "Ships Free" },
  { name: "Milwaukee M18 FUEL Hammer Drill", price: 199.00, was: 279.00, rating: 4.9, reviews: 1204, image: "/images/product-tools.jpg", tag: "Top Rated" },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i))
        return (
          <span key={i} className="relative inline-block h-2.5 w-2.5">
            <Star className="absolute inset-0 h-2.5 w-2.5 fill-background/10 text-background/10" />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-2.5 w-2.5 fill-accent text-accent" />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef(0)

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!paused) setCurrent((p) => (p + 1) % slides.length)
    }, 7000)
  }, [paused])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  function go(dir: number) {
    setCurrent((p) => (p + dir + slides.length) % slides.length)
    resetTimer()
  }

  function onTouchStart(e: React.TouchEvent) { touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1)
  }

  const slide = slides[current]

  return (
    <section aria-label="Hero promotions">
      <div
        className="relative overflow-hidden bg-foreground"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Crossfade background images */}
        {slides.map((s, i) => (
          <Image key={s.image} src={s.image} alt="" fill className={`object-cover transition-opacity duration-700 ${i === current ? "opacity-20" : "opacity-0"}`} priority loading="eager" sizes="100vw" />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/40" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:py-14 lg:flex-row lg:py-20">
          {/* Left: Brand message */}
          <div className="flex flex-1 flex-col justify-center">
            <span className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">{slide.eyebrow}</span>
            <h1 className="max-w-lg text-balance text-2xl font-bold leading-tight text-background md:text-4xl lg:text-5xl">{slide.headline}</h1>
            <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-background/60 md:text-base">{slide.subline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                {slide.cta} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-background/20 text-background hover:bg-background/10">
                {slide.ctaSecondary}
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <button onClick={() => go(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-background/20 text-background/60 hover:bg-background/10" aria-label="Previous slide">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {slides.map((_, i) => (
                <button key={i} onClick={() => { setCurrent(i); resetTimer() }} className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-primary" : "w-3 bg-background/30"}`} aria-label={`Go to slide ${i + 1}`} aria-current={i === current ? "true" : undefined} />
              ))}
              <button onClick={() => go(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-background/20 text-background/60 hover:bg-background/10" aria-label="Next slide">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right: Shopable product cards -- visible on md+ now (not just lg) */}
          <div className="flex w-full flex-col gap-3 md:w-80 md:shrink-0">
            {heroProducts.map((p) => {
              const pct = Math.round(((p.was - p.price) / p.was) * 100)
              return (
                <a key={p.name} href="#" className="group flex gap-3 rounded-lg border border-background/10 bg-background/5 p-3 backdrop-blur-sm transition-colors hover:bg-background/10">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted md:h-20 md:w-20">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="80px" />
                    <span className="absolute left-0.5 top-0.5 rounded bg-primary px-1 py-0.5 text-[8px] font-bold text-primary-foreground">{p.tag}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <h3 className="line-clamp-2 text-xs font-semibold leading-snug text-background">{p.name}</h3>
                    <div className="flex items-center gap-1">
                      <StarRating rating={p.rating} />
                      <span className="text-[10px] text-background/40">({p.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-background">${p.price.toFixed(2)}</span>
                      <span className="text-[10px] text-background/40 line-through">${p.was.toFixed(2)}</span>
                      <span className="text-[10px] font-bold text-sale">{pct}% OFF</span>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats + trust strip */}
      <div className="border-b border-border bg-muted/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 text-xs md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[
              { val: "40,000+", lbl: "Products" },
              { val: "169", lbl: "Brands" },
              { val: "500+", lbl: "Vendors" },
              { val: "8,500+", lbl: "Contractors" },
            ].map((s) => (
              <span key={s.lbl} className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-foreground">{s.val}</span>
                <span className="text-muted-foreground">{s.lbl}</span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
            <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5 text-primary" /> Same-Day Shipping</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Authorized Distributor</span>
            <a href="tel:8888760007" className="flex items-center gap-1 transition-colors hover:text-primary"><Phone className="h-3.5 w-3.5 text-primary" /> (888) 876-0007</a>
          </div>
        </div>
      </div>
    </section>
  )
}
