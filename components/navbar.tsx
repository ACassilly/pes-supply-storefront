"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, ChevronDown, ChevronRight, Phone, Heart, RotateCcw, Home, Users, Package, Zap, Lightbulb, Sun, Wrench as Plumbing } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"
import { CartFlyout } from "@/components/cart-flyout"

const departments = [
  { name: "Electrical", slug: "electrical", subs: [{ name: "Circuit Breakers & Panels", slug: "circuit-breakers-panels" }, { name: "Wire & Cable", slug: "wire-cable" }, { name: "Conduit & Fittings", slug: "conduit-fittings" }, { name: "Switches & Outlets", slug: "switches-outlets" }, { name: "Boxes & Enclosures", slug: "boxes-enclosures" }, { name: "Disconnects & Transformers", slug: "disconnects-transformers" }] },
  { name: "Lighting", slug: "lighting", subs: [{ name: "LED Fixtures", slug: "led-fixtures" }, { name: "Emergency & Exit Lighting", slug: "emergency-exit" }, { name: "High Bay & Industrial", slug: "high-bay" }, { name: "Controls & Sensors", slug: "controls-sensors" }, { name: "Bulbs & Lamps", slug: "bulbs-lamps" }, { name: "Outdoor & Area Lighting", slug: "outdoor-area" }] },
  { name: "Solar & Renewables", slug: "solar", subs: [{ name: "Solar Panels", slug: "solar-panels" }, { name: "Inverters & Optimizers", slug: "inverters-optimizers" }, { name: "Racking & Mounting", slug: "racking-mounting" }, { name: "Batteries & ESS", slug: "batteries-ess" }, { name: "Solar Kits", slug: "solar-kits" }, { name: "Monitoring & Rapid Shutdown", slug: "monitoring-shutdown" }] },
  { name: "Tools & Test", slug: "tools", subs: [{ name: "Power Tools", slug: "power-tools" }, { name: "Hand Tools", slug: "hand-tools" }, { name: "Meters & Testers", slug: "meters-testers" }, { name: "Fish Tape & Pulling", slug: "fish-tape-pulling" }, { name: "Crimping & Termination", slug: "crimping-termination" }, { name: "Tool Storage", slug: "tool-storage" }] },
  { name: "HVAC", slug: "hvac", subs: [{ name: "Mini Splits", slug: "mini-splits" }, { name: "Thermostats", slug: "thermostats" }, { name: "Fans & Ventilation", slug: "fans-ventilation" }, { name: "Heaters", slug: "heaters" }, { name: "HVAC Parts & Accessories", slug: "hvac-parts" }] },
  { name: "Plumbing", slug: "plumbing", subs: [{ name: "Pipe & Fittings", slug: "pipe-fittings" }, { name: "Valves", slug: "valves" }, { name: "Water Heaters", slug: "water-heaters" }, { name: "Pumps", slug: "pumps" }, { name: "Plumbing Tools", slug: "plumbing-tools" }] },
  { name: "Safety & PPE", slug: "safety", subs: [{ name: "Hard Hats & Head Protection", slug: "hard-hats" }, { name: "Safety Glasses & Goggles", slug: "safety-glasses" }, { name: "Gloves", slug: "gloves" }, { name: "Hi-Vis & FR Clothing", slug: "hi-vis-fr" }, { name: "Fall Protection", slug: "fall-protection" }, { name: "First Aid", slug: "first-aid" }] },
  { name: "Data & Comm", slug: "datacomm", subs: [{ name: "Structured Cabling", slug: "structured-cabling" }, { name: "Racks & Enclosures", slug: "racks-enclosures" }, { name: "Patch Panels", slug: "patch-panels" }, { name: "Fiber Optic", slug: "fiber-optic" }, { name: "Network Switches", slug: "network-switches" }, { name: "Cable Management", slug: "cable-management" }] },
  { name: "EV Charging", slug: "ev-charging", subs: [{ name: "Level 2 Residential", slug: "l2-residential" }, { name: "Level 2 Commercial", slug: "l2-commercial" }, { name: "DC Fast Chargers", slug: "dc-fast" }, { name: "Cables & Connectors", slug: "ev-cables" }, { name: "Mounting & Pedestals", slug: "ev-mounting" }] },
  { name: "Generators", slug: "generators", subs: [{ name: "Standby & Whole-Home", slug: "standby-generators" }, { name: "Portable", slug: "portable-generators" }, { name: "Commercial & Industrial", slug: "commercial-generators" }, { name: "Transfer Switches", slug: "transfer-switches" }, { name: "Parts & Maintenance", slug: "generator-parts" }] },
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
            <Link key={sub.slug} href={`/departments/${dept.slug}/${sub.slug}`} className="block py-1.5 text-xs text-muted-foreground hover:text-primary">{sub.name}</Link>
          ))}
          <Link href={`/departments/${dept.slug}`} className="mt-1 block text-xs font-semibold text-primary">{"Shop All " + dept.name}</Link>
        </div>
      </div>
    </div>
  )
}

/* Nav items with optional hover dropdown subcategories (2x2 grid with thumbnails) */
const navItems: { label: string; href: string; icon: React.ComponentType<{ className?: string }>; dropdown?: { name: string; href: string; image: string }[] }[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About Us", href: "/about", icon: Users },
  { label: "All Products", href: "/departments", icon: Package },
  {
    label: "Electrical", href: "/departments/electrical", icon: Zap,
    dropdown: [
      { name: "Circuit Breakers & Panels", href: "/departments/electrical/circuit-breakers-panels", image: "/images/nav-circuit-breakers.jpg" },
      { name: "Wire & Cable", href: "/departments/electrical/wire-cable", image: "/images/nav-wire-cable.jpg" },
      { name: "Conduit & Fittings", href: "/departments/electrical/conduit-fittings", image: "/images/nav-conduit.jpg" },
      { name: "Switches & Outlets", href: "/departments/electrical/switches-outlets", image: "/images/nav-switches.jpg" },
    ],
  },
  {
    label: "Lighting", href: "/departments/lighting", icon: Lightbulb,
    dropdown: [
      { name: "LED Fixtures", href: "/departments/lighting/led-fixtures", image: "/images/nav-led-fixtures.jpg" },
      { name: "High Bay & Industrial", href: "/departments/lighting/high-bay", image: "/images/nav-high-bay.jpg" },
      { name: "Outdoor & Area Lighting", href: "/departments/lighting/outdoor-area", image: "/images/nav-outdoor-light.jpg" },
      { name: "Bulbs & Lamps", href: "/departments/lighting/bulbs-lamps", image: "/images/nav-bulbs.jpg" },
    ],
  },
  {
    label: "Solar", href: "/departments/solar", icon: Sun,
    dropdown: [
      { name: "Solar Panels", href: "/departments/solar/solar-panels", image: "/images/nav-solar-panels.jpg" },
      { name: "Inverters & Optimizers", href: "/departments/solar/inverters-optimizers", image: "/images/nav-inverter.jpg" },
      { name: "Solar Kits", href: "/departments/solar/solar-kits", image: "/images/nav-solar-kit.jpg" },
      { name: "Batteries & ESS", href: "/departments/solar/batteries-ess", image: "/images/nav-battery.jpg" },
    ],
  },
  {
    label: "Plumbing", href: "/departments/plumbing", icon: Plumbing,
    dropdown: [
      { name: "Pipe & Fittings", href: "/departments/plumbing/pipe-fittings", image: "/images/nav-pipe-fittings.jpg" },
      { name: "Valves", href: "/departments/plumbing/valves", image: "/images/nav-valves.jpg" },
      { name: "Water Heaters", href: "/departments/plumbing/water-heaters", image: "/images/nav-water-heater.jpg" },
      { name: "Pumps", href: "/departments/plumbing/pumps", image: "/images/nav-pump.jpg" },
    ],
  },
  { label: "Contact Us", href: "/contact", icon: Phone },
]

export function Navbar() {
  const { count: cartCount, total: cartTotal } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [acctOpen, setAcctOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchDept, setSearchDept] = useState("All Departments")
  const [openDrop, setOpenDrop] = useState<string | null>(null)
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enterDrop = useCallback((label: string) => {
    if (dropTimer.current) clearTimeout(dropTimer.current)
    setOpenDrop(label)
  }, [])
  const leaveDrop = useCallback(() => {
    dropTimer.current = setTimeout(() => setOpenDrop(null), 120)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}${searchDept !== "All Departments" ? `&dept=${encodeURIComponent(searchDept)}` : ""}`
    }
  }



  return (
    <header className="sticky top-0 z-50 border-b border-border bg-navbar shadow-sm">
      {/* Row 1: Logo + Search + Account + Cart */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2 md:gap-5">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/images/pes-logo.png"
            alt="Portlandia Electric Supply"
            width={160}
            height={160}
            className="h-10 w-auto md:h-11"
            priority
          />
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative flex min-w-0 flex-1" role="search">
          <div className="flex w-full items-center overflow-hidden rounded-lg border-2 border-primary bg-card focus-within:ring-2 focus-within:ring-primary/20">
            <select value={searchDept} onChange={(e) => setSearchDept(e.target.value)} className="hidden h-11 shrink-0 cursor-pointer border-r border-border bg-muted/60 px-2 text-xs font-medium text-foreground outline-none min-[480px]:block md:px-3" aria-label="Search department">
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
        <div className="flex shrink-0 items-center gap-0.5">
          {/* My Account -- combines Sign In, Orders, Lists */}
          <div className="relative hidden md:block" onMouseEnter={() => setAcctOpen(true)} onMouseLeave={() => setAcctOpen(false)}>
            <button className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-foreground transition-colors hover:bg-muted" aria-expanded={acctOpen} aria-haspopup="true">
              <User className="h-5 w-5" />
              <span className="hidden text-sm font-bold lg:inline">My Account</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
            {acctOpen && (
              <div className="absolute right-0 top-full z-50 w-48 rounded-lg border border-border bg-card py-2 shadow-xl">
                <Link href="/account" className="flex items-center gap-2.5 px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-muted">
                  <User className="h-4 w-4 text-primary" /> Sign In
                </Link>
                <Link href="/orders" className="flex items-center gap-2.5 px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-muted">
                  <RotateCcw className="h-4 w-4 text-primary" /> Orders
                </Link>
                <Link href="/lists" className="flex items-center gap-2.5 px-4 py-2 text-sm text-card-foreground transition-colors hover:bg-muted">
                  <Heart className="h-4 w-4 text-primary" /> Saved Lists
                </Link>
              </div>
            )}
          </div>
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-foreground transition-colors hover:bg-muted" aria-label={`Cart with ${cartCount} items`}>
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent p-0 text-[9px] font-bold text-accent-foreground">
                  {cartCount}
                </Badge>
              )}
            </div>
            <span className="hidden text-sm font-bold sm:inline">{cartTotal > 0 ? `$${cartTotal.toFixed(2)}` : "Cart"}</span>
          </button>
          <Button variant="ghost" size="icon" className="text-foreground md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Row 2: Main navigation bar */}
      <nav className="hidden border-t border-border bg-foreground md:block" aria-label="Main navigation">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center px-4">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown ? enterDrop(item.label) : undefined}
              onMouseLeave={item.dropdown ? leaveDrop : undefined}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-background/80 transition-colors hover:text-primary"
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
                {item.dropdown && <ChevronDown className="ml-0.5 h-3 w-3 opacity-50" />}
              </Link>

              {/* Dropdown */}
              {item.dropdown && openDrop === item.label && (
                <div
                  className="absolute left-1/2 top-full z-50 w-[480px] -translate-x-1/2 rounded-b-xl border border-border bg-card p-4 shadow-xl"
                  onMouseEnter={() => enterDrop(item.label)}
                  onMouseLeave={leaveDrop}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-muted"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/30">
                          <Image src={sub.image} alt={sub.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <span className="text-sm font-medium text-card-foreground">{sub.name}</span>
                        <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-border pt-3">
                    <Link href={item.href} className="text-sm font-semibold text-primary hover:underline">
                      {`Shop All ${item.label} \u2192`}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-card md:hidden" role="dialog" aria-label="Navigation menu">
          <div className="p-4">
            <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products, brands, or part numbers..." className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </form>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <Link href="/account" className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground"><User className="h-4 w-4" /> Sign In</Link>
              <button onClick={() => { setMobileOpen(false); setCartOpen(true) }} className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground"><ShoppingCart className="h-4 w-4" /> {cartTotal > 0 ? `$${cartTotal.toFixed(2)}` : "Cart"}{cartCount > 0 ? ` (${cartCount})` : ""}</button>
              <Link href="/orders" className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground"><RotateCcw className="h-4 w-4" /> Orders</Link>
              <Link href="/lists" className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-card-foreground"><Heart className="h-4 w-4" /> Lists</Link>
            </div>
            <div className="mb-4 flex gap-2">
              <Link href="/deals" className="flex flex-1 items-center justify-center rounded-lg bg-sale/10 py-2.5 text-sm font-bold text-sale">Deals & Clearance</Link>
              <Link href="/bulk" className="flex flex-1 items-center justify-center rounded-lg border border-primary/20 bg-primary/5 py-2.5 text-sm font-medium text-primary">Bulk Pricing</Link>
            </div>
            <div className="flex flex-col">
              {departments.map((dept) => (<MobileDeptAccordion key={dept.slug} dept={dept} />))}
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/account" className="rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-primary-foreground">Sign In / Register</Link>
              <Link href="/pro" className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-card-foreground">Open a Pro Account</Link>
              <Link href="/powerlink" className="rounded-lg border border-accent/30 bg-accent/5 px-4 py-2.5 text-center text-sm font-medium text-accent">Power Link Installer Network</Link>
              <Link href="/shipping" className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-muted-foreground">Shipping Info</Link>
              <a href="tel:8888760007" className="rounded-lg border border-border px-4 py-2.5 text-center text-sm font-medium text-muted-foreground">(888) 876-0007</a>
            </div>
          </div>
        </div>
      )}

      <CartFlyout open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  )
}
