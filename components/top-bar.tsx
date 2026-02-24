"use client"

import { Phone, Truck, ShieldCheck } from "lucide-react"

export function TopBar() {
  return (
    <div className="bg-topbar text-topbar-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
        <div className="hidden items-center gap-5 md:flex">
          <span className="flex items-center gap-1.5 font-medium text-topbar-foreground/60">
            A <span className="font-semibold text-topbar-foreground">PES Global</span> Company
          </span>
          <span className="h-3 w-px bg-topbar-foreground/20" />
          <a href="tel:8888760007" className="flex items-center gap-1.5 hover:text-primary">
            <Phone className="h-3 w-3" />
            (888) 876-0007
          </a>
        </div>
        <div className="flex w-full items-center justify-center gap-4 md:w-auto md:justify-end">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3 w-3 text-primary" />
            Free Ship $999+
          </span>
          <span className="hidden h-3 w-px bg-topbar-foreground/20 sm:block" />
          <span className="hidden items-center gap-1.5 sm:flex">
            <ShieldCheck className="h-3 w-3 text-primary" />
            Authorized Distributor
          </span>
          <span className="hidden h-3 w-px bg-topbar-foreground/20 lg:block" />
          <a href="#" className="hidden font-semibold text-primary hover:underline lg:block">
            Pro Account &amp; Net-30
          </a>
        </div>
      </div>
    </div>
  )
}
