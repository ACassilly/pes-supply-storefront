"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const announcements = [
  { text: "Free shipping on orders over $999", link: "/shipping", cta: "Learn More" },
  { text: "New: BABA-Compliant Products Now Available", link: "/baba", cta: "Shop BABA" },
  { text: "Pro Accounts: Get Net-30 Terms Today", link: "/pro", cta: "Apply Now" },
  { text: "Spring Sale: Up to 25% off Select Lighting", link: "/deals", cta: "Shop Deals" },
]

export function AnnouncementBanner() {
  const [current, setCurrent] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % announcements.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + announcements.length) % announcements.length)
  }, [])

  useEffect(() => {
    if (paused || dismissed) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [paused, dismissed, next])

  if (dismissed) return null

  const ann = announcements[current]

  return (
    <div 
      className="relative bg-primary text-primary-foreground"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 py-2">
        <button 
          onClick={prev}
          className="hidden rounded p-0.5 hover:bg-primary-foreground/10 sm:block"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <div className="flex items-center gap-2 text-center text-xs font-medium sm:text-sm">
          <span>{ann.text}</span>
          <Link href={ann.link} className="font-bold underline underline-offset-2 hover:no-underline">
            {ann.cta}
          </Link>
        </div>

        <button 
          onClick={next}
          className="hidden rounded p-0.5 hover:bg-primary-foreground/10 sm:block"
          aria-label="Next announcement"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-0.5 left-1/2 hidden -translate-x-1/2 gap-1 sm:flex">
          {announcements.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 w-1 rounded-full transition-colors ${i === current ? "bg-primary-foreground" : "bg-primary-foreground/30"}`}
              aria-label={`Go to announcement ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-primary-foreground/10"
        aria-label="Dismiss announcements"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
