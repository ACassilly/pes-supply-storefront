"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, Heart, Eye, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const products = [
  {
    id: 1,
    name: "Jinko Solar 580W N-Type Bifacial Module",
    category: "solar",
    price: 133.40,
    originalPrice: 174.00,
    pricePerWatt: "$0.23",
    rating: 4.8,
    reviews: 342,
    image: "/images/product-solar-panel.jpg",
    badge: "Best Seller",
    inStock: true,
    freeShipping: true,
    specs: ["580W", "Bifacial", "N-Type", "25yr Warranty"],
  },
  {
    id: 2,
    name: "Sol-Ark 15K Hybrid Inverter",
    category: "inverters",
    price: 3995.00,
    originalPrice: 4595.00,
    pricePerWatt: null,
    rating: 4.9,
    reviews: 187,
    image: "/images/product-inverter.jpg",
    badge: "Top Rated",
    inStock: true,
    freeShipping: true,
    specs: ["15kW", "Hybrid", "200A MPPT", "10yr Warranty"],
  },
  {
    id: 3,
    name: "EG4 PowerPro WallMount Battery 280Ah",
    category: "batteries",
    price: 1699.00,
    originalPrice: 2199.00,
    pricePerWatt: null,
    rating: 4.7,
    reviews: 256,
    image: "/images/product-battery.jpg",
    badge: "Hot Deal",
    inStock: true,
    freeShipping: false,
    specs: ["14.3kWh", "LiFePO4", "Wall-Mount", "10yr Warranty"],
  },
  {
    id: 4,
    name: "Generac 22kW Standby Generator",
    category: "generators",
    price: 5299.00,
    originalPrice: 5799.00,
    pricePerWatt: null,
    rating: 4.6,
    reviews: 128,
    image: "/images/product-generator.jpg",
    badge: "In Stock",
    inStock: true,
    freeShipping: true,
    specs: ["22kW", "Natural Gas/LP", "Auto Transfer", "5yr Warranty"],
  },
  {
    id: 5,
    name: "LONGi Hi-MO X6 595W Solar Panel",
    category: "solar",
    price: 142.80,
    originalPrice: 190.40,
    pricePerWatt: "$0.24",
    rating: 4.9,
    reviews: 203,
    image: "/images/product-solar-panel.jpg",
    badge: "New",
    inStock: true,
    freeShipping: true,
    specs: ["595W", "HPBC", "N-Type", "30yr Warranty"],
  },
  {
    id: 6,
    name: "Enphase IQ8M Microinverter",
    category: "inverters",
    price: 169.00,
    originalPrice: 199.00,
    pricePerWatt: null,
    rating: 4.8,
    reviews: 412,
    image: "/images/product-inverter.jpg",
    badge: "Popular",
    inStock: true,
    freeShipping: true,
    specs: ["330VA", "Micro", "Grid-Form", "25yr Warranty"],
  },
  {
    id: 7,
    name: "Tesla Wall Connector Gen 3 EV Charger",
    category: "ev",
    price: 475.00,
    originalPrice: 530.00,
    pricePerWatt: null,
    rating: 4.7,
    reviews: 891,
    image: "/images/product-ev-charger.jpg",
    badge: "Fast Ship",
    inStock: true,
    freeShipping: true,
    specs: ["48A", "Level 2", "WiFi", "Indoor/Outdoor"],
  },
  {
    id: 8,
    name: "Milwaukee M18 FUEL Impact Driver Kit",
    category: "tools",
    price: 249.00,
    originalPrice: 329.00,
    pricePerWatt: null,
    rating: 4.9,
    reviews: 1204,
    image: "/images/product-tools.jpg",
    badge: "Pro Choice",
    inStock: true,
    freeShipping: true,
    specs: ["M18", "2000 in-lbs", "Brushless", "Kit"],
  },
]

const tabs = [
  { value: "all", label: "All Products" },
  { value: "solar", label: "Solar Panels" },
  { value: "inverters", label: "Inverters" },
  { value: "batteries", label: "Batteries" },
  { value: "generators", label: "Generators" },
  { value: "ev", label: "EV Charging" },
  { value: "tools", label: "Tools" },
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered =
    activeTab === "all" ? products : products.filter((p) => p.category === activeTab)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12" aria-label="Featured products">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Handpicked deals on top-rated equipment
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="h-auto flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="text-xs sm:text-sm">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({
  product,
}: {
  product: (typeof products)[0]
}) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-primary/30">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground text-[10px]">
          {product.badge}
        </Badge>
        {discount > 0 && (
          <Badge className="absolute right-2 top-2 bg-sale text-sale-foreground text-[10px]">
            {discount}% OFF
          </Badge>
        )}
        {/* Hover actions */}
        <div className="absolute bottom-2 right-2 flex translate-y-2 gap-1.5 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-card-foreground shadow-md hover:bg-primary hover:text-primary-foreground" aria-label="Quick view">
            <Eye className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-card-foreground shadow-md hover:bg-sale hover:text-sale-foreground" aria-label="Add to wishlist">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        {/* Specs */}
        <div className="mb-2 flex flex-wrap gap-1">
          {product.specs.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {spec}
            </span>
          ))}
        </div>

        <h3 className="mb-1 text-sm font-semibold text-card-foreground leading-snug line-clamp-2 group-hover:text-primary">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-accent text-accent"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          {product.pricePerWatt && (
            <span className="text-xs font-medium text-primary">{product.pricePerWatt}/W</span>
          )}
          {product.freeShipping && (
            <span className="mt-1 flex items-center gap-1 text-[10px] font-medium text-success">
              <Truck className="h-3 w-3" /> Free Shipping
            </span>
          )}
        </div>

        {/* Add to cart */}
        <Button
          size="sm"
          className="mt-3 w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
