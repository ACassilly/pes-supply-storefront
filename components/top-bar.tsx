"use client"

import { MapPin, Phone, Truck, ShieldCheck } from "lucide-react"

const announcements = [
  "Free Shipping on Orders $999+",
  "40,000+ Products from Brands You Trust",
  "Same-Day Shipping on In-Stock Orders Placed by 2pm PT",
  "Contractor Pricing & Net-30 Terms Available",
  "Lighting, Electrical, Solar, HVAC, Plumbing, Tools & More",
]

export function TopBar() {
  return (
    <div className="bg-topbar text-topbar-foreground">
      {/* Scrolling ticker */}
      <div className="overflow-hidden border-b border-topbar-foreground/10">
        <div className="flex animate-[scroll_30s_linear_infinite] gap-12 whitespace-nowrap py-1.5 text-xs font-medium">
          {[...announcements, ...announcements, ...announcements].map((text, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              {text}
            </span>
          ))}
        </div>
      </div>
      {/* Info bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs">
        <div className="hidden items-center gap-6 md:flex">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3" />
            (888) 876-0007
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            Portland, OR &middot; U.S. Warehouses
          </span>
        </div>
        <div className="flex w-full items-center justify-center gap-6 md:w-auto md:justify-end">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3 w-3" />
            Fast Shipping Nationwide
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3" />
            Authorized Distributor
          </span>
        </div>
      </div>
    </div>
  )
}
