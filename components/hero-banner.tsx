"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, Tag, Copy, Check } from "lucide-react"

const slides = [
  {
    title: "Ready, Set, Build.",
    subtitle: "Set your goals, start your projects.",
    highlight: "Save up to 40% OFF",
    image: "/images/hero-workshop.jpg",
    cta: "Shop Now",
    ctaLink: "#",
  },
  {
    title: "Spring Project Season",
    subtitle: "Electrical, solar, plumbing, and more.",
    highlight: "Free Shipping on $199+",
    image: "/images/hero-solar.jpg",
    cta: "Browse Deals",
    ctaLink: "#",
  },
  {
    title: "Contractor Ready Inventory",
    subtitle: "From service calls to full installs.",
    highlight: "Pro Pricing Available",
    image: "/images/hero-commercial.jpg",
    cta: "Get Pro Pricing",
    ctaLink: "#",
  },
]

const promoCards = [
  {
    amount: "$15",
    label: "OFF orders $200+",
    title: "Spring Build Sale",
    code: "SPRING2026",
    color: "bg-primary",
  },
  {
    amount: "40%",
    label: "Save up to",
    title: "Clearance Deals",
    code: null,
    color: "bg-sale",
  },
  {
    amount: "5%",
    label: "First Order",
    title: "New Customers",
    code: "WELCOME5",
    color: "bg-accent",
  },
]

function PromoCard({ card }: { card: (typeof promoCards)[0] }) {
  const [copied, setCopied] = useState(false)

  return (
    <div className="flex flex-col items-center rounded-lg border border-border bg-card p-4 text-center shadow-sm">
      <div
        className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${card.color} text-lg font-bold text-card`}
      >
        {card.amount}
      </div>
      <span className="text-[11px] text-muted-foreground">{card.label}</span>
      <h3 className="mt-0.5 text-sm font-semibold text-card-foreground">
        {card.title}
      </h3>
      {card.code ? (
        <button
          onClick={() => {
            navigator.clipboard.writeText(card.code!)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          }}
          className="mt-2 flex items-center gap-1.5 rounded-md border border-dashed border-primary/40 bg-primary/5 px-3 py-1 text-xs font-bold tracking-wider text-primary transition-colors hover:bg-primary/10"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {card.code}
        </button>
      ) : (
        <a
          href="#"
          className="mt-2 text-xs font-medium text-primary hover:underline"
        >
          Shop Clearance
        </a>
      )}
    </div>
  )
}

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
    <section aria-label="Featured promotions">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Main banner */}
          <div className="relative flex-1 overflow-hidden rounded-xl">
            <div className="relative min-h-[320px] md:min-h-[380px]">
              <Image
                src={slide.image}
                alt=""
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
              <div className="relative flex h-full min-h-[320px] flex-col justify-center px-6 py-8 md:min-h-[380px] md:px-10">
                <div className="mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">
                    {slide.highlight}
                  </span>
                </div>
                <h1 className="mb-2 text-pretty text-3xl font-bold text-background md:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="mb-6 max-w-md text-base text-background/70">
                  {slide.subtitle}
                </p>
                <div>
                  <Button
                    size="lg"
                    className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {slide.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Dots & arrows */}
                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCurrent(
                        (prev) => (prev - 1 + slides.length) % slides.length
                      )
                    }
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
                          i === current
                            ? "w-8 bg-primary"
                            : "w-2 bg-background/40"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() =>
                      setCurrent((prev) => (prev + 1) % slides.length)
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background/20 text-background hover:bg-background/30"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Promo cards sidebar */}
          <div className="flex gap-3 lg:w-64 lg:flex-col lg:gap-4">
            {promoCards.map((card) => (
              <PromoCard key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
