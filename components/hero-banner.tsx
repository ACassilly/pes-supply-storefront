"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react"

const slides = [
  {
    tag: "Solar & Electrical Supply",
    title: "JOB-READY ELECTRICAL & SOLAR SUPPLY",
    subtitle: "Right-sized power, delivered.",
    description: "Panels, racking, switchgear, wire, and more — in stock and ready to ship. From service parts to solar kits, get the exact materials you need without overbuying.",
    cta: "BROWSE INVENTORY",
    secondaryCta: "START A PROJECT CART",
    image: "/images/hero-solar.jpg",
    bullets: [
      "Tier-1 solar and trusted electrical brands in one warehouse",
      "Singles, cases, and bulk options for every project size",
      "Fast LTL and parcel shipping direct to shop or jobsite",
    ],
  },
  {
    tag: "Multi-Category Supply",
    title: "EVERYTHING ELECTRICAL, FROM SERVICE CALLS TO SOLAR",
    subtitle: "Mix-and-match from a single cart.",
    description: "Solar panels, racking, gear, and wiring — shipped jobsite ready. Order the exact count, in-stock racking, and BOS without overbuying.",
    cta: "SHOP SOLAR & ELECTRICAL",
    secondaryCta: "GET A CUSTOM QUOTE",
    image: "/images/hero-commercial.jpg",
    bullets: [
      "Tier-1 modules and bankable brands in U.S. warehouses",
      "Singles, partial pallets, and full pallets available for most lines",
      "Fast LTL and freight shipping direct to shop or jobsite",
    ],
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
    <section className="relative overflow-hidden bg-foreground" aria-label="Featured promotions">
      <div className="relative min-h-[480px] md:min-h-[520px]">
        {/* Background image */}
        <Image
          src={slide.image}
          alt=""
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />

        {/* Content */}
        <div className="relative mx-auto flex max-w-7xl items-center px-4 py-16 md:py-20">
          <div className="max-w-2xl">
            <Badge className="mb-4 border-primary/30 bg-primary/20 text-primary-foreground font-semibold">
              {slide.tag}
            </Badge>
            <h1 className="mb-3 text-pretty text-3xl font-bold tracking-tight text-background md:text-5xl">
              {slide.title}
            </h1>
            <p className="mb-3 text-lg font-medium text-background/80">{slide.subtitle}</p>
            <p className="mb-5 max-w-lg text-sm text-background/60 leading-relaxed">{slide.description}</p>

            {/* Support bullets */}
            <ul className="mb-6 flex flex-col gap-2">
              {slide.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-2 text-sm text-background/70">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                {slide.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                {slide.secondaryCta}
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
