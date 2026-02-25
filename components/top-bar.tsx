"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Truck, Phone, Zap, ShieldCheck } from "lucide-react"
import Link from "next/link"

const announcements = [
  { icon: Truck, text: "Portlandia Logistics: In-House Fulfillment", highlight: "FREE shipping on orders $999+", href: "/shipping" },
  { icon: ShieldCheck, text: "Not a Marketplace", highlight: "Authorized distributor, full OEM warranties", href: "/brands" },
  { icon: Zap, text: "Power Link: We Send You Customers", highlight: "Join the installer network", href: "/powerlink" },
  { icon: ShieldCheck, text: "BABA Compliant", highlight: "Documentation ships with your order", href: "/baba" },
  { icon: Truck, text: "Portlandia Logistics ships from Louisville, KY", highlight: "1-2 day ground to 60% of the US", href: "/shipping" },
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
        {/* Left links - visible at md+ */}
        <div className="hidden shrink-0 items-center gap-2 md:flex lg:gap-3">
          <Link href="/about" className="text-topbar-foreground/70 transition-colors hover:text-topbar-foreground">About Us</Link>
          <Link href="/shipping" className="text-topbar-foreground/70 transition-colors hover:text-topbar-foreground">Shipping</Link>
          <Link href="/contact" className="text-topbar-foreground/70 transition-colors hover:text-topbar-foreground">Support</Link>
          <span className="hidden text-topbar-foreground/20 lg:inline">|</span>
          <Link href="/deals" className="hidden font-semibold text-accent transition-colors hover:text-accent/80 lg:inline">Deals</Link>
          <Link href="/quote" className="hidden text-topbar-foreground/70 transition-colors hover:text-topbar-foreground lg:inline">Request a Quote</Link>
          <a href="tel:8888760007" className="hidden items-center gap-1 text-topbar-foreground/70 transition-colors hover:text-topbar-foreground lg:flex">
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

        {/* Right links - visible at md+ */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <span className="text-topbar-foreground/20">|</span>
          <Link href="/account" className="font-semibold text-primary transition-colors hover:underline">Sign In / Register</Link>
        </div>
      </div>
    </div>
  )
}
