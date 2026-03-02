"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Phone, MessageCircle, Mail, Globe, Heart, RotateCcw, Home, Users, Package, Zap, Lightbulb, Sun, Wrench as Plumbing } from "lucide-react"
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

export function Navbar() {
  const { count: cartCount, total: cartTotal } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [lang, setLang] = useState<"en" | "es">("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchDept, setSearchDept] = useState("All Departments")

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
        {/* Contact Us dropdown */}
        <div className="relative hidden md:block" onMouseEnter={() => setContactOpen(true)} onMouseLeave={() => setContactOpen(false)}>
          <button className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-foreground transition-colors hover:bg-muted" aria-expanded={contactOpen} aria-haspopup="true">
            <Phone className="h-4 w-4 text-primary" />
            <span className="hidden text-sm font-bold lg:inline">Contact Us</span>
            <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${contactOpen ? "rotate-180" : ""}`} />
          </button>
          {contactOpen && (
            <div className="absolute right-0 top-full z-50 w-64 rounded-lg border border-border bg-card py-3 shadow-xl">
              <div className="border-b border-border px-4 pb-3">
                <p className="text-xs font-semibold text-foreground">Monday - Friday</p>
                <p className="text-xs text-muted-foreground">8:00 AM - 5:00 PM EST</p>
              </div>
              <div className="flex flex-col gap-1 px-2 py-2">
                <button className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-muted">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Live Chat</p>
                    <p className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" /> Online Now</p>
                  </div>
                </button>
                <a href="tel:8888760007" className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Call</p>
                    <p className="text-[10px] text-muted-foreground">(888) 876-0007</p>
                  </div>
                </a>
                <a href="mailto:sales@pes.supply" className="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">Email</p>
                    <p className="text-[10px] text-muted-foreground">sales@pes.supply</p>
                  </div>
                </a>
              </div>
              <div className="border-t border-border px-4 pt-3">
                <p className="mb-1.5 text-xs font-semibold text-foreground">Need Help?</p>
                <div className="flex flex-col gap-1">
                  <Link href="/shipping" className="text-xs text-muted-foreground hover:text-primary hover:underline">Track Your Order</Link>
                  <Link href="/shipping" className="text-xs text-muted-foreground hover:text-primary hover:underline">Shipping & Returns</Link>
                  <Link href="/quote" className="text-xs text-muted-foreground hover:text-primary hover:underline">Request a Quote</Link>
                  <Link href="/contact" className="text-xs text-muted-foreground hover:text-primary hover:underline">Contact Customer Service</Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Language / Currency selector */}
        <div className="relative hidden md:block" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
          <button className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-foreground transition-colors hover:bg-muted" aria-expanded={langOpen} aria-haspopup="true">
            <Globe className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold uppercase">{lang}</span>
            <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${langOpen ? "rotate-180" : ""}`} />
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full z-50 w-56 rounded-lg border border-border bg-card py-3 shadow-xl">
              <p className="px-4 pb-2 text-xs font-semibold text-foreground">Select your preferred language</p>
              <button onClick={() => { setLang("en"); setLangOpen(false) }} className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted ${lang === "en" ? "text-primary font-semibold" : "text-card-foreground"}`}>
                <span className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${lang === "en" ? "border-primary" : "border-muted-foreground/40"}`}>
                  {lang === "en" && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
                English | $ USD
              </button>
              <button onClick={() => { setLang("es"); setLangOpen(false) }} className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-muted ${lang === "es" ? "text-primary font-semibold" : "text-card-foreground"}`}>
                <span className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${lang === "es" ? "border-primary" : "border-muted-foreground/40"}`}>
                  {lang === "es" && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
                {"Espa\u00f1ol | $ USD"}
              </button>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <Link href="/account" className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-foreground transition-colors hover:bg-muted md:flex" aria-label="Sign in or account">
            <User className="h-5 w-5" />
            <span className="hidden text-sm font-bold lg:inline">Sign In</span>
          </Link>
          <Link href="/orders" className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-foreground transition-colors hover:bg-muted md:flex" aria-label="Orders">
            <RotateCcw className="h-4.5 w-4.5" />
            <span className="hidden text-sm font-bold lg:inline">Orders</span>
          </Link>
          <Link href="/lists" className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-foreground transition-colors hover:bg-muted md:flex" aria-label="Saved lists">
            <Heart className="h-4.5 w-4.5" />
            <span className="hidden text-sm font-bold lg:inline">Lists</span>
          </Link>
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
          {[
            { label: "Home", href: "/", icon: Home },
            { label: "About Us", href: "/about", icon: Users },
            { label: "All Products", href: "/departments", icon: Package },
            { label: "Electrical", href: "/departments/electrical", icon: Zap },
            { label: "Lighting", href: "/departments/lighting", icon: Lightbulb },
            { label: "Solar", href: "/departments/solar", icon: Sun },
            { label: "Plumbing", href: "/departments/plumbing", icon: Plumbing },
            { label: "Contact Us", href: "/contact", icon: Phone },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-background/80 transition-colors hover:text-primary"
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
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
