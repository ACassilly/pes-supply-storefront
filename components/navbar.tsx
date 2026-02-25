"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Search, ShoppingCart, User, Menu, X, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

const departments = [
  { name: "Electrical", subs: ["Circuit Breakers & Panels", "Wire & Cable", "Conduit & Fittings", "Switches & Outlets", "Boxes & Enclosures", "Disconnects & Transformers"] },
  { name: "Lighting", subs: ["LED Fixtures", "Emergency & Exit Lighting", "High Bay & Industrial", "Controls & Sensors", "Bulbs & Lamps", "Outdoor & Area Lighting"] },
  { name: "Solar & Renewables", subs: ["Solar Panels", "Inverters & Optimizers", "Racking & Mounting", "Batteries & ESS", "Solar Kits", "Monitoring & Rapid Shutdown"] },
  { name: "Tools & Test", subs: ["Power Tools", "Hand Tools", "Meters & Testers", "Fish Tape & Pulling", "Crimping & Termination", "Tool Storage"] },
  { name: "HVAC", subs: ["Mini Splits", "Thermostats", "Fans & Ventilation", "Heaters", "HVAC Parts & Accessories"] },
  { name: "Plumbing", subs: ["Pipe & Fittings", "Valves", "Water Heaters", "Pumps", "Plumbing Tools"] },
  { name: "Safety & PPE", subs: ["Hard Hats & Head Protection", "Safety Glasses & Goggles", "Gloves", "Hi-Vis & FR Clothing", "Fall Protection", "First Aid"] },
  { name: "Data & Comm", subs: ["Structured Cabling", "Racks & Enclosures", "Patch Panels", "Fiber Optic", "Network Switches", "Cable Management"] },
  { name: "EV Charging", subs: ["Level 2 Residential", "Level 2 Commercial", "DC Fast Chargers", "Cables & Connectors", "Mounting & Pedestals"] },
  { name: "Generators", subs: ["Standby & Whole-Home", "Portable", "Commercial & Industrial", "Transfer Switches", "Parts & Maintenance"] },
]

function MobileDeptAccordion({ dept }: { dept: (typeof departments)[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-1 py-3 text-sm font-medium text-card-foreground">
        {dept.name}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] pb-3 pl-3" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          {dept.subs.map((sub) => (
            <a key={sub} href="#" className="block py-1.5 text-xs text-muted-foreground hover:text-primary">{sub}</a>
          ))}
          <a href="#" className="mt-1 block text-xs font-semibold text-primary">{"Shop All " + dept.name}</a>
        </div>
      </div>
    </div>
  )
}

export function Navbar() {
  const { count: cartCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState<string | null>(null)
  const [allMenuOpen, setAllMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchDept, setSearchDept] = useState("All Departments")
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = useCallback((name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(name)
  }, [])

  const handleLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(null), 150)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent, name: string) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setMegaOpen(megaOpen === name ? null : name) }
    if (e.key === "Escape") setMegaOpen(null)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `https://pes.supply/search?q=${encodeURIComponent(searchQuery.trim())}${searchDept !== "All Departments" ? `&dept=${encodeURIComponent(searchDept)}` : ""}`
    }
  }

  useEffect(() => {
    return () => { if (closeTimer.current) clearTimeout(closeTimer.current) }
  }, [])

  // Close mega menu on Escape globally
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") { setMegaOpen(null); setAllMenuOpen(false) } }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-navbar shadow-sm">
      {/* Row 1: Logo + Search + Account + Cart */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2 md:gap-5">
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-11 items-center rounded-lg bg-foreground px-2 md:h-12 md:px-2.5">
            <Image src="/images/pes-logo.png" alt="PES Supply" width={120} height={120} className="h-8 w-auto brightness-0 invert md:h-9" priority />
          </div>
          <span className="hidden text-[10px] font-medium leading-tight text-muted-foreground min-[480px]:block">A PES Global Company</span>
        </a>

        {/* Search form */}
        <form onSubmit={handleSearch} className="relative flex min-w-0 flex-1" role="search">
          <div className="flex w-full items-center overflow-hidden rounded-lg border-2 border-primary bg-card focus-within:ring-2 focus-within:ring-primary/20">
            <select value={searchDept} onChange={(e) => setSearchDept(e.target.value)} className="hidden h-11 shrink-0 cursor-pointer border-r border-border bg-muted/60 px-3 text-xs font-medium text-foreground outline-none md:block" aria-label="Search department">
              <option>All Departments</option>
              {departments.map((d) => (<option key={d.name}>{d.name}</option>))}
            </select>
            <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products, brands, or part numbers..." className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground" />
            <button type="submit" className="flex h-11 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-colors hover:bg-primary/90" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Account + Cart */}
        <div className="flex shrink-0 items-center gap-1">
          <a href="#" className="hidden flex-col items-start rounded-lg px-2.5 py-1.5 text-foreground transition-colors hover:bg-muted lg:flex">
            <span className="text-[10px] text-muted-foreground">Hello, sign in</span>
            <span className="text-sm font-bold leading-tight">Account</span>
          </a>
          <a href="/returns" className="hidden flex-col items-start rounded-lg px-2.5 py-1.5 text-foreground transition-colors hover:bg-muted lg:flex">
            <span className="text-[10px] text-muted-foreground">Returns</span>
            <span className="text-sm font-bold leading-tight">{"& Orders"}</span>
          </a>
          <a href="#" className="relative flex items-end gap-1 rounded-lg px-2.5 py-1.5 text-foreground transition-colors hover:bg-muted" aria-label={`Cart with ${cartCount} items`}>
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent p-0 text-[10px] font-bold text-accent-foreground">
                  {cartCount}
                </Badge>
              )}
            </div>
            <span className="hidden text-sm font-bold sm:inline">Cart</span>
          </a>
          <Button variant="ghost" size="icon" className="text-foreground lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Row 2: Category bar */}
      <nav className="hidden border-t border-border bg-foreground lg:block" aria-label="Department navigation">
        <div className="mx-auto flex max-w-[1400px] items-center px-4">
          {/* All menu */}
          <div className="relative" onMouseEnter={() => setAllMenuOpen(true)} onMouseLeave={() => setAllMenuOpen(false)}>
            <button className="flex items-center gap-1.5 py-2 pr-4 text-sm font-bold text-background transition-colors hover:text-primary" aria-expanded={allMenuOpen} aria-haspopup="true" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setAllMenuOpen(!allMenuOpen) } if (e.key === "Escape") setAllMenuOpen(false) }}>
              <Menu className="h-4 w-4" /> All
            </button>
            {allMenuOpen && (
              <div className="absolute left-0 top-full z-50 w-64 rounded-b-lg border border-border bg-card py-2 shadow-xl" role="menu">
                {departments.map((dept) => (
                  <a key={dept.name} href="#" role="menuitem" className="flex items-center justify-between px-4 py-2.5 text-sm text-card-foreground transition-colors hover:bg-muted">
                    {dept.name} <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Department links -- show all 10, use text-clip on overflow */}
          <div className="flex min-w-0 flex-1 items-center overflow-hidden">
            {departments.map((dept) => (
              <div key={dept.name} className="relative" onMouseEnter={() => handleEnter(dept.name)} onMouseLeave={handleLeave}>
                <a href="#" className="block whitespace-nowrap px-2 py-2 text-[13px] font-medium text-background/80 transition-colors hover:text-primary" onKeyDown={(e) => handleKeyDown(e, dept.name)} onFocus={() => handleEnter(dept.name)} onBlur={handleLeave}>
                  {dept.name}
                </a>
                {megaOpen === dept.name && (
                  <div className="absolute left-1/2 top-full z-50 w-[480px] -translate-x-1/2 rounded-b-lg border border-border bg-card p-5 shadow-xl" onMouseEnter={() => handleEnter(dept.name)} onMouseLeave={handleLeave} role="menu">
                    <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{dept.name}</div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                      {dept.subs.map((sub) => (
                        <a key={sub} href="#" role="menuitem" className="rounded-md px-2 py-1.5 text-sm text-card-foreground transition-colors hover:bg-muted hover:text-primary">{sub}</a>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-border pt-3">
                      <a href="#" className="text-sm font-semibold text-primary hover:underline">{"Shop All " + dept.name + " \u2192"}</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-3 pl-2">
            <a href="#" className="whitespace-nowrap py-2 text-[13px] font-bold text-accent">Deals & Clearance</a>
            <a href="#" className="whitespace-nowrap py-2 text-[13px] font-medium text-background/80 transition-colors hover:text-primary">Pro Account</a>
          </div>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-card lg:hidden" role="dialog" aria-label="Navigation menu">
          <div className="p-4">
            <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products, brands, or part numbers..." className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </form>
            <div className="mb-4 flex gap-2">
              <a href="#" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground"><User className="h-4 w-4" /> Account</a>
              <a href="#" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground"><ShoppingCart className="h-4 w-4" /> Cart{cartCount > 0 ? ` (${cartCount})` : ""}</a>
            </div>
            <a href="#" className="mb-4 flex items-center justify-center rounded-lg bg-sale/10 py-2.5 text-sm font-bold text-sale">Deals & Clearance</a>
            <div className="flex flex-col">
              {departments.map((dept) => (<MobileDeptAccordion key={dept.name} dept={dept} />))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <a href="#" className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground">Sign In / Register</a>
              <a href="#" className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-card-foreground">Open a Pro Account</a>
              <a href="/shipping" className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-muted-foreground">Shipping Info</a>
              <a href="tel:8888760007" className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-muted-foreground">(888) 876-0007</a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
