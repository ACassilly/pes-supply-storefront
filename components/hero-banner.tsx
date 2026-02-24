"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"

const slides = [
  {
    tag: "Most Popular",
    title: "Complete 10kW Solar System",
    subtitle: "Everything you need to go solar",
    price: "$9,999",
    originalPrice: "$12,999",
    savings: "Save $3,000",
    description: "Tier 1 panels up to 800W, hybrid inverter, racking, and nationwide freight included.",
    cta: "View Complete System",
    image: "/images/hero-solar.jpg",
  },
  {
    tag: "Tier 1 Certified",
    title: "Solar Panels from $0.23/W",
    subtitle: "BloombergNEF verified modules",
    price: "From $0.23/W",
    originalPrice: "$0.31/W",
    savings: "26% OFF",
    description: "Modules up to 800W from trusted Tier 1 manufacturers. Volume pricing available.",
    cta: "Shop Solar Panels",
    image: "/images/hero-commercial.jpg",
  },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden bg-foreground" aria-label="Featured promotions">
      <div className="relative min-h-[420px] md:min-h-[480px]">
        {/* Background image */}
        <Image
          src={slide.image}
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />

        {/* Content */}
        <div className="relative mx-auto flex max-w-7xl items-center px-4 py-16 md:py-20">
          <div className="max-w-xl">
            <Badge className="mb-4 border-primary/30 bg-primary/20 text-primary-foreground font-semibold">
              {slide.tag}
            </Badge>
            <h1 className="mb-2 text-pretty text-3xl font-bold tracking-tight text-background md:text-5xl">
              {slide.title}
            </h1>
            <p className="mb-4 text-lg text-background/70">{slide.subtitle}</p>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary md:text-4xl">{slide.price}</span>
              <span className="text-lg text-background/50 line-through">{slide.originalPrice}</span>
              <Badge className="bg-sale text-sale-foreground">{slide.savings}</Badge>
            </div>
            <p className="mb-6 text-sm text-background/60 leading-relaxed">{slide.description}</p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                {slide.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                Get a Custom Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-background/40"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
