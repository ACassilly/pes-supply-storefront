"use client"

import { Phone } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-topbar text-topbar-foreground">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-1.5 text-xs">
        <a href="#" className="truncate font-medium text-topbar-foreground/70 transition-colors hover:text-topbar-foreground">
          Free shipping on orders $999+ &mdash; Pro accounts get same-day dispatch
        </a>
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <a href="#" className="hidden text-topbar-foreground/70 transition-colors hover:text-topbar-foreground sm:inline">Help Center</a>
          <a href="tel:8888760007" className="hidden items-center gap-1 text-topbar-foreground/70 transition-colors hover:text-topbar-foreground sm:flex">
            <Phone className="h-3 w-3" />
            (888) 876-0007
          </a>
          <span className="hidden text-topbar-foreground/20 sm:inline">|</span>
          <a href="#" className="font-semibold text-primary transition-colors hover:underline">
            Sign In / Register
          </a>
        </div>
      </div>
    </div>
  )
}
