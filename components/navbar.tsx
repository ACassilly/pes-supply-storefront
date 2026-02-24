"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Zap,
  Sun,
  Wrench,
  Lightbulb,
  HardHat,
  Droplets,
  Thermometer,
  Package,
  ShieldCheck,
  PlugZap,
  Hammer,
  Layers,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const categories = [
  {
    name: "Lighting & Electrical",
    icon: Lightbulb,
    subcategories: [
      "Circuit Breakers & Panels",
      "Wire & Cable",
      "Conduit & Fittings",
      "Switches & Outlets",
      "LED Lighting",
      "Emergency Lighting",
    ],
  },
  {
    name: "Solar & Renewables",
    icon: Sun,
    subcategories: [
      "Solar Panels",
      "Inverters",
      "Racking & Mounting",
      "Batteries & ESS",
      "Solar Kits",
      "Monitoring",
    ],
  },
  {
    name: "Tools",
    icon: Wrench,
    subcategories: [
      "Power Tools",
      "Hand Tools",
      "Tool Storage",
      "Fasteners",
      "Power Tool Accessories",
      "Welding",
    ],
  },
  {
    name: "HVAC",
    icon: Thermometer,
    subcategories: [
      "Mini Splits",
      "Heaters",
      "Fans & Ventilation",
      "Air Quality",
      "HVAC Parts",
      "Thermostats",
    ],
  },
  {
    name: "Plumbing",
    icon: Droplets,
    subcategories: [
      "Pipe & Fittings",
      "Valves",
      "Water Heaters",
      "Pumps",
      "Plumbing Tools",
      "Drain Openers",
    ],
  },
  {
    name: "Hardware",
    icon: Hammer,
    subcategories: [
      "Fasteners",
      "Door Hardware",
      "Cabinet Hardware",
      "Safety & Security",
      "Keys & Locks",
      "Metal Sheets & Rods",
    ],
  },
  {
    name: "Building Materials",
    icon: Layers,
    subcategories: [
      "Lumber & Trim",
      "Roofing & Gutters",
      "Insulation",
      "Concrete & Masonry",
      "Decking",
      "Fencing",
    ],
  },
  {
    name: "Safety & Workwear",
    icon: ShieldCheck,
    subcategories: [
      "Hard Hats",
      "Safety Glasses",
      "Gloves",
      "Hi-Vis Clothing",
      "Fall Protection",
      "First Aid",
    ],
  },
  {
    name: "Generators",
    icon: PlugZap,
    subcategories: [
      "Standby",
      "Portable",
      "Dual Fuel",
      "Commercial",
      "Parts & Accessories",
    ],
  },
  {
    name: "EV Charging",
    icon: Zap,
    subcategories: [
      "Level 2 Chargers",
      "DC Fast Chargers",
      "Commercial Stations",
      "Accessories",
    ],
  },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-navbar text-navbar-foreground shadow-sm">
      {/* Main nav row */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5">
        {/* Real PES Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/pes-logo.png"
            alt="Portlandia Electric Supply"
            width={44}
            height={44}
            className="h-11 w-11 rounded-lg object-cover"
            priority
          />
          <div className="hidden sm:block">
            <span className="text-[15px] font-bold leading-tight tracking-tight text-foreground">
              Portlandia Electric
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-widest text-primary">
              Supply
            </span>
          </div>
        </a>

        {/* Search */}
        <div className="relative flex flex-1 items-center">
          <div
            className={`flex w-full items-center overflow-hidden rounded-lg border transition-colors ${
              searchFocused
                ? "border-primary ring-2 ring-primary/20"
                : "border-border"
            }`}
          >
            <select
              className="hidden h-10 border-r border-border bg-muted px-3 text-xs font-medium text-foreground md:block"
              aria-label="Search category"
            >
              <option>All Departments</option>
              {categories.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
            <Input
              type="search"
              placeholder="Search 40,000+ products, brands, part numbers..."
              className="h-10 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <Button
              size="sm"
              className="m-1 h-8 rounded-md bg-primary px-3 text-primary-foreground hover:bg-primary/90"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="hidden gap-1.5 text-foreground lg:flex"
          >
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
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Category bar (desktop) */}
      <nav
        className="hidden border-t border-border bg-muted/50 lg:block"
        aria-label="Main categories"
      >
        <div className="mx-auto flex max-w-7xl items-center px-4">
          {categories.slice(0, 8).map((cat) => (
            <div
              key={cat.name}
              className="group relative"
              onMouseEnter={() => setActiveCategory(cat.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <button className="flex items-center gap-1.5 px-2.5 py-2.5 text-[13px] font-medium text-foreground/80 transition-colors hover:text-primary">
                <cat.icon className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">{cat.name}</span>
                <ChevronDown className="hidden h-3 w-3 xl:block" />
              </button>
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
                    <a
                      href="#"
                      className="block rounded-md px-3 py-2 text-sm font-medium text-primary"
                    >
                      View All {cat.name}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm font-semibold text-sale"
            >
              <HardHat className="h-4 w-4" />
              Deals
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Bulk Pricing
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
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sale"
              >
                <HardHat className="h-4 w-4" />
                Deals
              </a>
              <a
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-card-foreground hover:bg-muted"
              >
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
