"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, X, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

const departments = [
  {
    name: "Electrical",
    subs: ["Circuit Breakers & Panels", "Wire & Cable", "Conduit & Fittings", "Switches & Outlets", "Boxes & Enclosures", "Disconnects & Transformers"],
  },
  {
    name: "Lighting",
    subs: ["LED Fixtures", "Emergency & Exit Lighting", "High Bay & Industrial", "Controls & Sensors", "Bulbs & Lamps", "Outdoor & Area Lighting"],
  },
  {
    name: "Solar & Renewables",
    subs: ["Solar Panels", "Inverters & Optimizers", "Racking & Mounting", "Batteries & ESS", "Solar Kits", "Monitoring & Rapid Shutdown"],
  },
  {
    name: "Tools & Test",
    subs: ["Power Tools", "Hand Tools", "Meters & Testers", "Fish Tape & Pulling", "Crimping & Termination", "Tool Storage"],
  },
  {
    name: "HVAC",
    subs: ["Mini Splits", "Thermostats", "Fans & Ventilation", "Heaters", "HVAC Parts & Accessories"],
  },
  {
    name: "Plumbing",
    subs: ["Pipe & Fittings", "Valves", "Water Heaters", "Pumps", "Plumbing Tools"],
  },
  {
    name: "Safety & PPE",
    subs: ["Hard Hats & Head Protection", "Safety Glasses & Goggles", "Gloves", "Hi-Vis & FR Clothing", "Fall Protection", "First Aid"],
  },
  {
    name: "Data & Comm",
    subs: ["Structured Cabling", "Racks & Enclosures", "Patch Panels", "Fiber Optic", "Network Switches", "Cable Management"],
  },
  {
    name: "EV Charging",
    subs: ["Level 2 Residential", "Level 2 Commercial", "DC Fast Chargers", "Cables & Connectors", "Mounting & Pedestals"],
  },
  {
    name: "Generators",
    subs: ["Standby & Whole-Home", "Portable", "Commercial & Industrial", "Transfer Switches", "Parts & Maintenance"],
  },
]

function MobileDeptAccordion({ dept }: { dept: { name: string; subs: string[] } }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-1 py-3 text-sm font-medium text-card-foreground"
      >
        {dept.name}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-3 pl-3">
          {dept.subs.map((sub) => (
            <a key={sub} href="#" className="block py-1.5 text-xs text-muted-foreground hover:text-primary">{sub}</a>
          ))}
          <a href="#" className="mt-1 block text-xs font-semibold text-primary">Shop All {dept.name}</a>
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const { count: cartCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [allMenuOpen, setAllMenuOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleEnter(name: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(name)
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 150)
  }

  useEffect(() => {
    return () => { if (closeTimer.current) clearTimeout(closeTimer.current) }
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-navbar shadow-sm">
      {/* Row 1: Logo + Search + Account + Cart */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2 md:gap-5">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-11 items-center rounded-lg bg-foreground px-2 md:h-12 md:px-2.5">
            <Image
              src="/images/pes-logo.png"
              alt="PES Supply"
              width={120}
              height={120}
              className="h-8 w-auto brightness-0 invert md:h-9"
              priority
            />
          </div>
          <div className="hidden min-[480px]:block">
            <span className="block text-[10px] font-medium leading-tight text-muted-foreground">A PES Global Company</span>
          </div>
        </a>

        {/* Search */}
        <div className="relative flex min-w-0 flex-1">
          <div className="flex w-full items-center overflow-hidden rounded-lg border-2 border-primary bg-card focus-within:ring-2 focus-within:ring-primary/20">
            <select
              className="hidden h-11 shrink-0 cursor-pointer border-r border-border bg-muted/60 px-3 text-xs font-medium text-foreground outline-none md:block"
              aria-label="Search department"
            >
              <option>All Departments</option>
              {departments.map((d) => (
                <option key={d.name}>{d.name}</option>
              ))}
            </select>
            <input
              type="search"
              placeholder="Search 40,000+ products..."
              className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              className="flex h-11 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Account + Cart */}
        <div className="flex shrink-0 items-center gap-1">
          <a
            href="#"
            className="hidden flex-col items-start rounded-lg px-2.5 py-1.5 text-foreground transition-colors hover:bg-muted lg:flex"
          >
            <span className="text-[10px] text-muted-foreground">Hello, sign in</span>
            <span className="text-sm font-bold leading-tight">Account</span>
          </a>
          <a
            href="#"
            className="hidden flex-col items-start rounded-lg px-2.5 py-1.5 text-foreground transition-colors hover:bg-muted lg:flex"
          >
            <span className="text-[10px] text-muted-foreground">Returns</span>
            <span className="text-sm font-bold leading-tight">& Orders</span>
          </a>
          <a href="#" className="relative flex items-end gap-1 rounded-lg px-2.5 py-1.5 text-foreground transition-colors hover:bg-muted">
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-[10px] font-bold text-accent-foreground">
                {cartCount}
              </Badge>
            </div>
            <span className="hidden text-sm font-bold sm:inline">Cart</span>
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Row 2: Category bar -- Amazon-style dark text links */}
      <nav className="hidden border-t border-border bg-foreground lg:block" aria-label="Departments">
        <div className="mx-auto flex max-w-[1400px] items-center px-4">
          {/* All menu trigger */}
          <div
            className="relative"
            onMouseEnter={() => setAllMenuOpen(true)}
            onMouseLeave={() => setAllMenuOpen(false)}
          >
            <button className="flex items-center gap-1.5 py-2 pr-4 text-sm font-bold text-background transition-colors hover:text-primary">
              <Menu className="h-4 w-4" />
              All
            </button>
            {allMenuOpen && (
              <div className="absolute left-0 top-full z-50 w-64 rounded-b-lg border border-border bg-card py-2 shadow-xl">
                {departments.map((dept) => (
                  <a
                    key={dept.name}
                    href="#"
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-card-foreground transition-colors hover:bg-muted"
                  >
                    {dept.name}
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Department links */}
          <div className="flex items-center overflow-x-auto">
            {departments.slice(0, 8).map((dept) => (
              <div
                key={dept.name}
                className="relative"
                onMouseEnter={() => handleEnter(dept.name)}
                onMouseLeave={handleLeave}
              >
                <a
                  href="#"
                  className="block whitespace-nowrap px-3 py-2 text-[13px] font-medium text-background/80 transition-colors hover:text-primary"
                >
                  {dept.name}
                </a>
                {/* Mega flyout */}
                {megaOpen === dept.name && (
                  <div
                    className="absolute left-0 top-full z-50 w-[480px] rounded-b-lg border border-border bg-card p-5 shadow-xl"
                    onMouseEnter={() => handleEnter(dept.name)}
                    onMouseLeave={handleLeave}
                  >
                    <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{dept.name}</div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {dept.subs.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="rounded-md px-2 py-1.5 text-sm text-card-foreground transition-colors hover:bg-muted hover:text-primary"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-border pt-3">
                      <a href="#" className="text-sm font-semibold text-primary hover:underline">
                        Shop All {dept.name} &rarr;
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">
            <a href="#" className="whitespace-nowrap py-2 text-[13px] font-bold text-accent">
              Deals & Clearance
            </a>
            <a href="#" className="whitespace-nowrap py-2 text-[13px] font-medium text-background/80 transition-colors hover:text-primary">
              Pro Account
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-card lg:hidden">
          <div className="p-4">
            {/* Mobile search */}
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="search" placeholder="Search 40,000+ products..." className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>

            {/* Account quick links */}
            <div className="mb-4 flex gap-2">
              <a href="#" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground">
                <User className="h-4 w-4" /> Account
              </a>
              <a href="#" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground">
                <ShoppingCart className="h-4 w-4" /> Cart ({cartCount})
              </a>
            </div>

            {/* Deals link */}
            <a href="#" className="mb-4 flex items-center justify-center rounded-lg bg-sale/10 py-2.5 text-sm font-bold text-sale">
              Deals & Clearance
            </a>

            {/* Expandable departments */}
            <div className="flex flex-col">
              {departments.map((dept) => (
                <MobileDeptAccordion key={dept.name} dept={dept} />
              ))}
            </div>

            {/* Bottom CTAs */}
            <div className="mt-4 flex flex-col gap-2">
              <a href="#" className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground">Sign In / Register</a>
              <a href="#" className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-card-foreground">Open a Pro Account</a>
              <a href="tel:8888760007" className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-muted-foreground">(888) 876-0007</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
