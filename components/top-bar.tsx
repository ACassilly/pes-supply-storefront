"use client"

import { useState, useEffect } from "react"
import { Phone } from "lucide-react"

export function TopBar() {
  const [hidden, setHidden] = useState(false)

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

  return (
    <div className={`bg-topbar text-topbar-foreground transition-all duration-300 ${hidden ? "h-0 overflow-hidden opacity-0" : "h-auto opacity-100"}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-1.5 text-xs">
        <a href="/shipping" className="truncate font-medium text-topbar-foreground/70 transition-colors hover:text-topbar-foreground">
          {"Free shipping on orders $999+ \u2014 Pro accounts get same-day dispatch"}
        </a>
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <a href="/shipping" className="hidden text-topbar-foreground/70 transition-colors hover:text-topbar-foreground sm:inline">Shipping</a>
          <a href="/returns" className="hidden text-topbar-foreground/70 transition-colors hover:text-topbar-foreground sm:inline">Returns</a>
          <a href="tel:8888760007" className="hidden items-center gap-1 text-topbar-foreground/70 transition-colors hover:text-topbar-foreground sm:flex">
            <Phone className="h-3 w-3" /> (888) 876-0007
          </a>
          <span className="hidden text-topbar-foreground/20 sm:inline">|</span>
          <a href="#" className="font-semibold text-primary transition-colors hover:underline">Sign In / Register</a>
        </div>
      </div>
    </div>
  )
}
