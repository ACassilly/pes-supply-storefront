"use client"

import { Phone, HelpCircle } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-topbar text-topbar-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
        <span className="font-medium text-topbar-foreground/60">
          <span className="font-semibold text-topbar-foreground">PES Supply</span>
          {" "}| A PES Global Company
        </span>
        <div className="flex items-center gap-4">
          <a href="#" className="hidden items-center gap-1.5 text-topbar-foreground/60 transition-colors hover:text-topbar-foreground sm:flex">
            <HelpCircle className="h-3 w-3" />
            Help
          </a>
          <a href="tel:8888760007" className="flex items-center gap-1.5 text-topbar-foreground/60 transition-colors hover:text-topbar-foreground">
            <Phone className="h-3 w-3" />
            (888) 876-0007
          </a>
          <a href="#" className="font-semibold text-primary hover:underline">
            Register / Sign In
          </a>
        </div>
      </div>
    </div>
  )
}
