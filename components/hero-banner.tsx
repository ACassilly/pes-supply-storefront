"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, Truck, ShieldCheck, Phone } from "lucide-react"

const slides = [
  {
    eyebrow: "PES Supply | Authorized Distributor",
    headline: "Everything for the job. One order. Ships today.",
    subline: "40,000+ products from 169 brands. Full OEM warranties on every item. Orders processed same day, shipped from the nearest stocking location.",
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
    subline: "Build America, Buy America documentation ships with your order. Portlandia Logistics coordinates fulfillment across our nationwide stocking network.",
    cta: "BABA Products", ctaHref: "/baba", ctaSecondary: "Request a Quote", ctaSecondaryHref: "/quote",
    image: "/images/hero-solar.jpg",
  },
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

          {/* Right: key stats -- hidden on mobile */}
          <div className="hidden w-64 shrink-0 flex-col gap-3 md:flex">
            {[
              { stat: "40,000+", label: "Products across 10 departments" },
              { stat: "169", label: "Authorized brands, full OEM warranties" },
              { stat: "Same Day", label: "Processing on orders before 2 PM ET" },
            ].map((item) => (
              <div key={item.stat} className="rounded-lg border border-background/10 bg-background/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-lg font-black text-primary">{item.stat}</p>
                <p className="text-[11px] text-background/50">{item.label}</p>
              </div>
            ))}
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
