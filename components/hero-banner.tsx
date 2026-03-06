"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, Truck, ShieldCheck, Phone } from "lucide-react"

const slides = [
  {
    eyebrow: "Wholesale Electrical, Solar & Building Materials",
    headline: "One PO. One invoice. Every trade covered.",
    subline: "Electrical, solar, HVAC, plumbing, tools, safety, EV, and generators from 169 authorized brands. Trade pricing with full OEM warranties. Orders ship same day from 10 stocking locations.",
    cta: "Browse Departments", ctaHref: "/departments", ctaSecondary: "Open a Pro Account", ctaSecondaryHref: "/pro",
    image: "/images/hero-commercial.jpg",
  },
  {
    eyebrow: "Power Link Installer Network",
    headline: "Buy materials from us. We send you customers back.",
    subline: "Power Link is our contractor directory. Homeowners search by ZIP and trade -- we route them to you. No referral fees. No contracts. Just leads from the company that already ships your materials.",
    cta: "Join Power Link", ctaHref: "/powerlink", ctaSecondary: "See How It Works", ctaSecondaryHref: "/powerlink",
    image: "/images/hero-workshop.jpg",
  },
  {
    eyebrow: "BABA Compliant | Government & Municipal",
    headline: "Compliance paperwork done before you ask.",
    subline: "Build America, Buy America documentation ships with qualifying orders. BABA-eligible products flagged in the catalog. W-9, COI, and credit apps available on demand.",
    cta: "BABA Catalog", ctaHref: "/baba", ctaSecondary: "Request a Quote", ctaSecondaryHref: "/quote",
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
    }, 6000) // 6 second autoplay interval
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
          <Image key={s.image} src={s.image} alt="" fill className={`object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`} priority={i <= 1} loading={i <= 1 ? "eager" : "lazy"} sizes="100vw" />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/50" />

        <div className="relative mx-auto flex max-w-7xl items-center gap-6 px-4 py-5 md:py-6">
          {/* Left copy */}
          <div className="flex flex-1 flex-col">
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-primary">{slide.eyebrow}</span>
            <h1 className="max-w-md text-balance text-lg font-bold leading-tight text-background md:text-xl lg:text-2xl">{slide.headline}</h1>
            <p className="mt-1.5 max-w-sm text-pretty text-xs leading-relaxed text-background/60">{slide.subline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button size="sm" asChild className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href={slide.ctaHref}>{slide.cta} <ArrowRight className="h-3 w-3" /></Link>
              </Button>
              <Button size="sm" variant="outline" asChild className="gap-1.5 border-background/40 bg-transparent text-background hover:border-background hover:bg-background/10">
                <Link href={slide.ctaSecondaryHref}>{slide.ctaSecondary}</Link>
              </Button>
            </div>
            {/* Dots + arrows */}
            <div className="mt-3 flex items-center gap-1.5">
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
          <div className="hidden w-56 shrink-0 flex-col gap-2 md:flex">
            {[
              { stat: "40,000+", label: "SKUs across 10 departments" },
              { stat: "169", label: "Authorized brands, full warranty" },
              { stat: "Same Day", label: "Ships before 2 PM ET" },
            ].map((item) => (
              <div key={item.stat} className="rounded-lg border border-background/10 bg-background/5 px-3 py-2 backdrop-blur-sm">
                <p className="text-sm font-black text-primary">{item.stat}</p>
                <p className="text-[10px] text-background/50">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slim trust strip */}
      <div className="border-b border-border bg-muted/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-0.5 px-4 py-1.5 text-[10px] md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
            <span className="flex items-center gap-1"><Truck className="h-3 w-3 text-primary" /> Free freight $999+</span>
            <span className="hidden text-border sm:inline">|</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-primary" /> Full OEM warranties</span>
            <span className="hidden text-border sm:inline">|</span>
            <span>Net-30 terms for qualified accounts</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
            <span>Orders by 2 PM ET ship same day</span>
            <span className="hidden text-border sm:inline">|</span>
            <a href="tel:8888760007" className="flex items-center gap-1 font-semibold transition-colors hover:text-primary"><Phone className="h-3 w-3 text-primary" /> (888) 876-0007</a>
          </div>
        </div>
      </div>
    </section>
  )
}
