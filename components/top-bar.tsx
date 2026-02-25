"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Truck, Phone, Zap, ShieldCheck } from "lucide-react"
import Link from "next/link"

const announcements = [
  { icon: Truck, text: "Guaranteed Fast & Reliable Shipping", highlight: "FREE on qualified orders $999+", href: "/shipping" },
  { icon: Zap, text: "Pro Accounts get Same-Day Dispatch", highlight: "Apply Now", href: "/pro" },
  { icon: ShieldCheck, text: "Authorized Distributor", highlight: "169 brands, full OEM warranties", href: "/brands" },
  { icon: Truck, text: "Ships from Louisville, KY", highlight: "1-2 day ground to 60% of the US", href: "/shipping" },
]

export function TopBar() {
  const [current, setCurrent] = useState(0)
  const [hidden, setHidden] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % announcements.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + announcements.length) % announcements.length), [])

  useEffect(() => {
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [next])

  useEffect(() => {
    let last = 0
    function onScroll() {
      const y = window.scrollY
      setHidden(y > 100 && y > last)
      last = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const a = announcements[current]
  const Icon = a.icon

  return (
    <div className={`bg-topbar text-topbar-foreground transition-all duration-300 ${hidden ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"}`}>
      <div className="mx-auto flex max-w-[1400px] items-center px-4 py-1.5 text-xs">
        {/* Left links - desktop */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link href="/shipping" className="text-topbar-foreground/70 transition-colors hover:text-topbar-foreground">Shipping</Link>
          <Link href="/shipping" className="text-topbar-foreground/70 transition-colors hover:text-topbar-foreground">Returns</Link>
          <a href="tel:8888760007" className="flex items-center gap-1 text-topbar-foreground/70 transition-colors hover:text-topbar-foreground">
            <Phone className="h-3 w-3" /> (888) 876-0007
          </a>
        </div>

        {/* Center rotating announcement */}
        <div className="flex flex-1 items-center justify-center gap-2">
          <button onClick={prev} className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-topbar-foreground/50 transition-colors hover:text-topbar-foreground" aria-label="Previous announcement">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <Link href={a.href} className="flex items-center gap-2 truncate transition-colors hover:text-primary">
            <Icon className="h-3.5 w-3.5 shrink-0 text-topbar-foreground/70" />
            <span className="truncate">
              <span className="font-bold">{a.text}</span>
              {" \u2014 "}
              <span className="text-topbar-foreground/70">{a.highlight}</span>
            </span>
          </Link>
          <button onClick={next} className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-topbar-foreground/50 transition-colors hover:text-topbar-foreground" aria-label="Next announcement">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Right links - desktop */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <span className="text-topbar-foreground/20">|</span>
          <Link href="/account" className="font-semibold text-primary transition-colors hover:underline">Sign In / Register</Link>
        </div>
      </div>
    </div>
  )
}
