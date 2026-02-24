"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, Truck, ShieldCheck, Phone, Star } from "lucide-react"

const slides = [
  {
    eyebrow: "PES Supply | A PES Global Company",
    headline: "40,000+ Products. In Stock. Ships Today.",
    subline: "Electrical, solar, lighting, tools, HVAC, plumbing, and more from 50+ authorized manufacturers.",
    cta: "Shop All Products",
    ctaSecondary: "Open a Pro Account",
    image: "/images/hero-commercial.jpg",
  },
  {
    eyebrow: "For Contractors & Trades",
    headline: "Net-30 Terms. Same-Day Shipping. Real People.",
    subline: "From breakers and wire to solar panels and generators -- one distributor, one PO, one call to Portland.",
    cta: "Apply for Trade Pricing",
    ctaSecondary: "Shop Electrical",
    image: "/images/hero-workshop.jpg",
  },
  {
    eyebrow: "Enterprise & Government",
    headline: "BABA Compliant. UL Listed. Procurement Ready.",
    subline: "Serving municipalities, school districts, and Fortune 500 operations with compliance and volume pricing.",
    cta: "Contact Sales",
    ctaSecondary: "View Certifications",
    image: "/images/hero-solar.jpg",
  },
]

const heroProducts = [
  {
    name: "Square D 200A Main Breaker Panel",
    price: 189.95,
    was: 234.00,
    rating: 4.7,
    reviews: 567,
    image: "/images/cat-electrical.jpg",
    tag: "Best Seller",
  },
  {
    name: "Jinko 580W Bifacial Module",
    price: 133.40,
    was: 174.00,
    rating: 4.8,
    reviews: 342,
    image: "/images/product-solar-panel.jpg",
    tag: "Ships Free",
  },
  {
    name: "Milwaukee M18 FUEL Hammer Drill",
    price: 199.00,
    was: 279.00,
    rating: 4.9,
    reviews: 1204,
    image: "/images/product-tools.jpg",
    tag: "Top Rated",
  },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function resetTimer() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 7000)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function go(dir: number) {
    setCurrent((p) => (p + dir + slides.length) % slides.length)
    resetTimer()
  }

  const slide = slides[current]

  return (
    <section aria-label="Hero">
      {/* Main hero */}
      <div className="relative overflow-hidden bg-foreground">
        <Image src={slide.image} alt="" fill className="object-cover opacity-20 transition-opacity duration-700" priority loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/50" />

        <div className="relative mx-auto flex max-w-7xl gap-6 px-4 py-14 md:py-16 lg:py-20">
          {/* Left: Brand message */}
          <div className="flex flex-1 flex-col justify-center">
            <span className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary">{slide.eyebrow}</span>
            <h1 className="max-w-lg text-balance text-2xl font-bold leading-tight text-background md:text-4xl lg:text-5xl">{slide.headline}</h1>
            <p className="mt-3 max-w-md text-pretty text-sm text-background/60 leading-relaxed md:text-base">{slide.subline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                {slide.cta} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-background/20 text-background hover:bg-background/10">
                {slide.ctaSecondary}
              </Button>
            </div>
            {/* Nav dots */}
            <div className="mt-6 flex items-center gap-2">
              <button onClick={() => go(-1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-background/20 text-background/60 hover:bg-background/10" aria-label="Previous">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {slides.map((_, i) => (
                <button key={i} onClick={() => { setCurrent(i); resetTimer() }} className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-primary" : "w-3 bg-background/30"}`} aria-label={`Slide ${i + 1}`} />
              ))}
              <button onClick={() => go(1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-background/20 text-background/60 hover:bg-background/10" aria-label="Next">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right: Shopable product cards -- PES.supply style */}
          <div className="hidden w-80 flex-col gap-3 lg:flex">
            {heroProducts.map((p) => {
              const pct = Math.round(((p.was - p.price) / p.was) * 100)
              return (
                <a key={p.name} href="#" className="group flex gap-3 rounded-lg border border-background/10 bg-background/5 p-3 backdrop-blur-sm transition-colors hover:bg-background/10">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="80px" />
                    <span className="absolute left-0.5 top-0.5 rounded bg-primary px-1 py-0.5 text-[8px] font-bold text-primary-foreground">{p.tag}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <h3 className="line-clamp-2 text-xs font-semibold text-background leading-snug">{p.name}</h3>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-2.5 w-2.5 ${i < Math.floor(p.rating) ? "fill-accent text-accent" : "fill-background/10 text-background/10"}`} />
                      ))}
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
              { val: "50+", lbl: "Brands" },
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
            <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5 text-primary" /> (888) 876-0007</span>
          </div>
        </div>
      </div>
    </section>
  )
}
