"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { ChevronLeft, ChevronRight, ArrowRight, Truck, ShieldCheck, Phone } from "lucide-react"

const slides = [
  {
    eyebrow: "PES Supply | Authorized Distributor",
    headline: "Everything for the job. One order. Ships today.",
    subline: "40,000+ products from 169 brands. Full OEM warranties on every item. Same-day fulfillment from our Louisville, KY warehouse.",
    cta: "Shop All Products", ctaHref: "/departments", ctaSecondary: "Open a Pro Account", ctaSecondaryHref: "/pro",
    image: "/images/hero-commercial.jpg",
  },
  {
    eyebrow: "Power Link Installer Network",
    headline: "Your supplier that sends you customers.",
    subline: "Power Link connects homeowners and property managers to PES contractors by ZIP code and trade. Get qualified leads just for being a customer.",
    cta: "Join Power Link", ctaHref: "/powerlink", ctaSecondary: "Learn More", ctaSecondaryHref: "/powerlink",
    image: "/images/hero-workshop.jpg",
  },
  {
    eyebrow: "BABA Compliant | PES Global Sourcing",
    headline: "Procurement ready. Compliance built in.",
    subline: "Build America, Buy America documentation ships with your order. Portlandia Logistics fulfills every order in-house from our own warehouse.",
    cta: "BABA Products", ctaHref: "/baba", ctaSecondary: "Request a Quote", ctaSecondaryHref: "/quote",
    image: "/images/hero-solar.jpg",
  },
]

const heroProducts = [
  { name: "Square D 200A Main Breaker Panel", slug: "square-d-200a-main-breaker-panel", price: 189.95, was: 234.00, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", tag: "In Stock" },
  { name: "Jinko 580W Bifacial Module", slug: "jinko-580w-bifacial-module", price: 133.40, was: 174.00, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", tag: "Ships Free" },
  { name: "Milwaukee M18 FUEL Hammer Drill", slug: "milwaukee-m18-fuel-hammer-drill-kit", price: 199.00, was: 279.00, rating: 4.9, reviews: 1204, image: "/images/product-tools.jpg", tag: "Ships Today" },
]



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
      {/* Main hero -- compact like MaxWarehouse */}
      <div
        className="relative overflow-hidden bg-foreground"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((s, i) => (
          <Image key={s.image} src={s.image} alt="" fill className={`object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`} priority={i === 0} loading={i === 0 ? "eager" : "lazy"} sizes="100vw" />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/50" />

        <div className="relative mx-auto flex max-w-7xl items-center gap-6 px-4 py-6 md:py-8 lg:py-10">
          {/* Left copy -- tighter */}
          <div className="flex flex-1 flex-col">
            <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary">{slide.eyebrow}</span>
            <h1 className="max-w-md text-balance text-xl font-bold leading-tight text-background md:text-2xl lg:text-3xl">{slide.headline}</h1>
            <p className="mt-2 max-w-sm text-pretty text-xs leading-relaxed text-background/60 md:text-sm">{slide.subline}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button size="sm" asChild className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href={slide.ctaHref}>{slide.cta} <ArrowRight className="h-3 w-3" /></Link>
              </Button>
              <Button size="sm" variant="outline" asChild className="gap-1.5 border-background/40 bg-transparent text-background hover:border-background hover:bg-background/10">
                <Link href={slide.ctaSecondaryHref}>{slide.ctaSecondary}</Link>
              </Button>
            </div>
            {/* Dots + arrows */}
            <div className="mt-4 flex items-center gap-1.5">
              <button onClick={() => go(-1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-background/20 text-background/50 hover:bg-background/10" aria-label="Previous slide">
                <ChevronLeft className="h-3 w-3" />
              </button>
              {slides.map((_, i) => (
                <button key={i} onClick={() => { setCurrent(i); resetTimer() }} className={`h-1 rounded-full transition-all ${i === current ? "w-6 bg-primary" : "w-2 bg-background/25"}`} aria-label={`Go to slide ${i + 1}`} aria-current={i === current ? "true" : undefined} />
              ))}
              <button onClick={() => go(1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-background/20 text-background/50 hover:bg-background/10" aria-label="Next slide">
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Right: compact product cards -- hidden on mobile */}
          <div className="hidden w-72 shrink-0 flex-col gap-2 md:flex">
            {heroProducts.map((p) => {
              const pct = Math.round(((p.was - p.price) / p.was) * 100)
              return (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group flex gap-2.5 rounded-md border border-background/10 bg-background/5 p-2 backdrop-blur-sm transition-colors hover:bg-background/10">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-muted">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="56px" />
                    <span className="absolute left-0 top-0 rounded-br bg-primary px-1 py-px text-[7px] font-bold uppercase text-primary-foreground">{p.tag}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-px">
                    <h3 className="line-clamp-1 text-[11px] font-semibold leading-tight text-background">{p.name}</h3>
                    <div className="flex items-center gap-1">
                      <StarRating rating={p.rating} size="xs" />
                      <span className="text-[9px] text-background/40">({p.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs font-bold text-background">${p.price.toFixed(2)}</span>
                      <span className="text-[9px] text-background/40 line-through">${p.was.toFixed(2)}</span>
                      <span className="text-[9px] font-bold text-sale">{pct}% OFF</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Slim trust strip -- matches MaxWarehouse 4-pillar pattern */}
      <div className="border-b border-border bg-muted/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2 text-[11px] md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-foreground">Thousands</span>
              <span className="text-muted-foreground">of contractors trust PES</span>
            </span>
            <span className="hidden text-border sm:inline">|</span>
            <span className="text-muted-foreground">40,000+ products across 10 departments</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
            <span className="flex items-center gap-1"><Truck className="h-3 w-3 text-primary" /> Same-Day Shipping</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-primary" /> Authorized Distributor</span>
            <a href="tel:8888760007" className="flex items-center gap-1 transition-colors hover:text-primary"><Phone className="h-3 w-3 text-primary" /> (888) 876-0007</a>
          </div>
        </div>
      </div>
    </section>
  )
}
