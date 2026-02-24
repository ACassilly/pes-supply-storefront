"use client"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Zap,
  Sun,
  Battery,
  Wrench,
  Lightbulb,
  Building2,
  HardHat,
  PlugZap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const categories = [
  {
    name: "Solar Panels",
    icon: Sun,
    subcategories: ["Monocrystalline", "Bifacial", "Commercial", "Residential", "Flexible", "All-Black"],
  },
  {
    name: "Inverters",
    icon: Zap,
    subcategories: ["Hybrid", "Grid-Tie", "Off-Grid", "Micro Inverters", "String Inverters"],
  },
  {
    name: "Batteries & ESS",
    icon: Battery,
    subcategories: ["Lithium", "AGM", "Gel Deep Cycle", "Wall-Mount", "Rack-Mount"],
  },
  {
    name: "Generators",
    icon: PlugZap,
    subcategories: ["Standby", "Portable", "Dual Fuel", "Commercial", "Parts & Accessories"],
  },
  {
    name: "Electrical",
    icon: Lightbulb,
    subcategories: ["Breakers & Panels", "Wire & Cable", "Conduit", "Connectors", "Switches"],
  },
  {
    name: "Tools & Hardware",
    icon: Wrench,
    subcategories: ["Power Tools", "Hand Tools", "Safety Gear", "Fasteners", "Racking & Mounting"],
  },
  {
    name: "Lighting",
    icon: Lightbulb,
    subcategories: ["LED Fixtures", "Outdoor", "Commercial", "Emergency", "Smart Lighting"],
  },
  {
    name: "EV Charging",
    icon: PlugZap,
    subcategories: ["Level 2 Chargers", "Level 3 DC Fast", "Commercial Stations", "Accessories"],
  },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-navbar text-navbar-foreground shadow-sm">
      {/* Main nav row */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold tracking-tight text-foreground">
              PES<span className="text-primary">.supply</span>
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Electrical & Solar
            </span>
          </div>
        </a>

        {/* Search */}
        <div className="relative flex flex-1 items-center">
          <div
            className={`flex w-full items-center overflow-hidden rounded-lg border transition-colors ${
              searchFocused ? "border-primary ring-2 ring-primary/20" : "border-border"
            }`}
          >
            <select className="hidden h-10 border-r border-border bg-muted px-3 text-xs font-medium text-foreground md:block" aria-label="Search category">
              <option>All Categories</option>
              {categories.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
            <Input
              type="search"
              placeholder="Search panels, inverters, wire, switchgear..."
              className="h-10 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Button size="sm" className="m-1 h-8 rounded-md bg-primary px-3 text-primary-foreground hover:bg-primary/90">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="hidden gap-1.5 text-foreground lg:flex">
            <User className="h-4 w-4" />
            <span className="text-sm">Account</span>
          </Button>
          <Button variant="ghost" size="sm" className="relative text-foreground">
            <ShoppingCart className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary p-0 text-[10px] text-primary-foreground">
              3
            </Badge>
            <span className="sr-only">Shopping cart, 3 items</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Category bar (desktop) */}
      <nav className="hidden border-t border-border bg-muted/50 lg:block" aria-label="Main categories">
        <div className="mx-auto flex max-w-7xl items-center px-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group relative"
              onMouseEnter={() => setActiveCategory(cat.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                <cat.icon className="h-4 w-4" />
                <span className="hidden xl:inline">{cat.name}</span>
                <ChevronDown className="hidden h-3 w-3 xl:block" />
              </button>
              {/* Dropdown */}
              {activeCategory === cat.name && (
                <div className="absolute left-0 top-full z-50 w-56 rounded-b-lg border border-t-0 border-border bg-card p-3 shadow-lg">
                  {cat.subcategories.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block rounded-md px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      {sub}
                    </a>
                  ))}
                  <div className="mt-2 border-t border-border pt-2">
                    <a href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-primary">
                      View All {cat.name}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-4">
            <a href="#" className="flex items-center gap-1.5 text-sm font-semibold text-sale">
              <HardHat className="h-4 w-4" />
              Pro Pricing
            </a>
            <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary">
              <Building2 className="h-4 w-4" />
              Commercial
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="px-4 py-3">
            <div className="flex flex-col gap-1">
              {categories.map((cat) => (
                <a
                  key={cat.name}
                  href="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-card-foreground hover:bg-muted"
                >
                  <cat.icon className="h-4 w-4 text-primary" />
                  {cat.name}
                </a>
              ))}
              <div className="my-2 border-t border-border" />
              <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sale">
                <HardHat className="h-4 w-4" />
                Pro Pricing
              </a>
              <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-card-foreground hover:bg-muted">
                <User className="h-4 w-4 text-primary" />
                Account
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
