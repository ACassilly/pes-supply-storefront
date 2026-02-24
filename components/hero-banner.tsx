"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, Phone } from "lucide-react"

const slides = [
  {
    tag: "40,000+ Products In Stock",
    title: "The supply house that ships like a warehouse.",
    subtitle:
      "Electrical, solar, tools, HVAC, plumbing, hardware, and more -- from the brands you already spec. In stock, priced right, shipped today.",
    image: "/images/hero-workshop.jpg",
    cta: "Shop All Departments",
  },
  {
    tag: "Built for the Trades",
    title: "Pro accounts. Real pricing. A real team.",
    subtitle:
      "Contractor pricing, Net-30 terms, named account reps, and same-day shipping on in-stock orders placed by 2pm PT. This is how a supply house should work.",
    image: "/images/hero-commercial.jpg",
    cta: "Open a Pro Account",
  },
  {
    tag: "A PES Global Company",
    title: "Local roots. Global supply chain.",
    subtitle:
      "PES Supply is the distribution arm of PES Global. We leverage worldwide sourcing to deliver brand-name products at prices that make your bids win.",
    image: "/images/hero-solar.jpg",
    cta: "Learn About PES Global",
  },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section aria-label="Hero">
      <div className="relative overflow-hidden bg-foreground">
        <div className="relative min-h-[420px] md:min-h-[480px]">
          <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60" />

          <div className="relative mx-auto flex max-w-7xl flex-col justify-center px-4 py-12 md:py-16">
            {/* Tag */}
            <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3 w-3" />
              {slide.tag}
            </span>

            <h1 className="mb-3 max-w-2xl text-pretty text-3xl font-bold leading-tight text-background md:text-4xl lg:text-5xl">
              {slide.title}
            </h1>

            <p className="mb-8 max-w-xl text-base text-background/60 leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {slide.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-background/20 bg-transparent text-background hover:bg-background/10"
              >
                <Phone className="h-4 w-4" />
                (888) 876-0007
              </Button>
            </div>

            {/* Inline trust strip */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-background/50">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-primary" />
                Same-day shipping by 2pm PT
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Authorized distributor, full warranties
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-primary" />
                Portland-based team, Mon-Fri 7-5 PT
              </span>
            </div>

            {/* Dots & arrows */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() =>
                  setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current ? "w-8 bg-primary" : "w-3 bg-background/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-background/10 text-background hover:bg-background/20"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
