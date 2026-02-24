"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const slides = [
  {
    eyebrow: "PES Supply | A PES Global Company",
    headline: "We power the people who build the world.",
    subline:
      "40,000+ products across electrical, solar, lighting, tools, HVAC, and plumbing. In stock and shipping nationwide.",
    cta: "Open a Pro Account",
    ctaSecondary: "Browse Products",
    image: "/images/hero-commercial.jpg",
  },
  {
    eyebrow: "For Contractors & Trades",
    headline: "Same-day shipping. Real people. Net-30 terms.",
    subline:
      "From breakers and wire to solar panels and generators -- everything you need from one authorized distributor, backed by a team in Portland.",
    cta: "Apply for Trade Pricing",
    ctaSecondary: "Shop Electrical",
    image: "/images/hero-workshop.jpg",
  },
  {
    eyebrow: "Enterprise & Government",
    headline: "BABA compliant. UL listed. Built for procurement.",
    subline:
      "Serving facility managers, school districts, municipalities, and Fortune 500 operations with the compliance documentation and volume pricing they need.",
    cta: "Contact Sales",
    ctaSecondary: "View Certifications",
    image: "/images/hero-solar.jpg",
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
    <section aria-label="Hero" className="relative overflow-hidden bg-foreground">
      <Image
        src={slide.image}
        alt=""
        fill
        className="object-cover opacity-25 transition-opacity duration-700"
        priority
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60" />

      <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-6 py-20 md:py-28 lg:py-32">
        <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          {slide.eyebrow}
        </span>
        <h1 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-background md:text-5xl lg:text-6xl">
          {slide.headline}
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base text-background/60 leading-relaxed md:text-lg">
          {slide.subline}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            {slide.cta}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2 border-background/20 text-background hover:bg-background/10">
            {slide.ctaSecondary}
          </Button>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center gap-3">
          <button onClick={() => go(-1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/60 hover:bg-background/10" aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); resetTimer() }}
                className={`h-1.5 rounded-full transition-all ${i === current ? "w-10 bg-primary" : "w-3 bg-background/30"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} className="flex h-9 w-9 items-center justify-center rounded-full border border-background/20 text-background/60 hover:bg-background/10" aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-background/10 bg-foreground/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-4 md:justify-between">
          {[
            { value: "40,000+", label: "Products" },
            { value: "50+", label: "Manufacturers" },
            { value: "8,500+", label: "Contractors" },
            { value: "Same Day", label: "Shipping" },
          ].map((s) => (
            <div key={s.label} className="flex items-baseline gap-2 text-background">
              <span className="text-lg font-bold md:text-xl">{s.value}</span>
              <span className="text-xs text-background/50">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
