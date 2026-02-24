"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, Heart, Eye, Truck, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const products = [
  {
    id: 1,
    name: "Jinko Solar 580W N-Type Bifacial Module",
    category: "solar",
    price: 133.4,
    originalPrice: 174.0,
    rating: 4.8,
    reviews: 342,
    image: "/images/product-solar-panel.jpg",
    badge: "Best Seller",
    inStock: true,
    freeShipping: true,
    specs: ["580W", "Bifacial", "N-Type"],
  },
  {
    id: 2,
    name: "Milwaukee M18 FUEL 1/2\" Hammer Drill Kit",
    category: "tools",
    price: 199.0,
    originalPrice: 279.0,
    rating: 4.9,
    reviews: 1204,
    image: "/images/product-tools.jpg",
    badge: "Top Rated",
    inStock: true,
    freeShipping: true,
    specs: ["18V", "Brushless", "2-Speed"],
  },
  {
    id: 3,
    name: "Square D 200A Main Breaker Panel",
    category: "electrical",
    price: 189.95,
    originalPrice: 234.0,
    rating: 4.7,
    reviews: 567,
    image: "/images/cat-electrical.jpg",
    badge: "Popular",
    inStock: true,
    freeShipping: false,
    specs: ["200A", "30-Space", "Indoor"],
  },
  {
    id: 4,
    name: "MRCOOL DIY 24K BTU Ductless Mini Split",
    category: "hvac",
    price: 1549.0,
    originalPrice: 1899.0,
    rating: 4.6,
    reviews: 893,
    image: "/images/cat-hvac.jpg",
    badge: "Hot Deal",
    inStock: true,
    freeShipping: true,
    specs: ["24K BTU", "20 SEER", "WiFi"],
  },
  {
    id: 5,
    name: "Sol-Ark 15K Hybrid Inverter",
    category: "solar",
    price: 3995.0,
    originalPrice: 4595.0,
    rating: 4.9,
    reviews: 187,
    image: "/images/product-inverter.jpg",
    badge: "Top Rated",
    inStock: true,
    freeShipping: true,
    specs: ["15kW", "Hybrid", "200A MPPT"],
  },
  {
    id: 6,
    name: "Generac 22kW Standby Generator",
    category: "generators",
    price: 5299.0,
    originalPrice: 5799.0,
    rating: 4.6,
    reviews: 128,
    image: "/images/product-generator.jpg",
    badge: "In Stock",
    inStock: true,
    freeShipping: true,
    specs: ["22kW", "NG/LP", "Auto Transfer"],
  },
  {
    id: 7,
    name: "Tesla Wall Connector Gen 3 EV Charger",
    category: "ev",
    price: 475.0,
    originalPrice: 530.0,
    rating: 4.7,
    reviews: 891,
    image: "/images/product-ev-charger.jpg",
    badge: "Fast Ship",
    inStock: true,
    freeShipping: true,
    specs: ["48A", "Level 2", "WiFi"],
  },
  {
    id: 8,
    name: "SharkBite 1/2\" Push-to-Connect Valve Kit",
    category: "plumbing",
    price: 24.97,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 2310,
    image: "/images/cat-plumbing.jpg",
    badge: "Value Pack",
    inStock: true,
    freeShipping: false,
    specs: ["1/2\"", "Push-Fit", "Lead-Free"],
  },
]

const tabs = [
  { value: "all", label: "All" },
  { value: "electrical", label: "Electrical" },
  { value: "solar", label: "Solar" },
  { value: "tools", label: "Tools" },
  { value: "hvac", label: "HVAC" },
  { value: "plumbing", label: "Plumbing" },
  { value: "generators", label: "Generators" },
  { value: "ev", label: "EV Charging" },
]

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all")

  const filtered =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab)

  return (
    <section
      className="mx-auto max-w-7xl px-4 py-10"
      aria-label="Featured products"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Featured Products
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Handpicked deals across every department
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="h-auto flex-wrap">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="text-xs sm:text-sm"
            >
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

function ProductCard({ product }: { product: (typeof products)[0] }) {
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
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-card-foreground shadow-md hover:bg-primary hover:text-primary-foreground"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-card-foreground shadow-md hover:bg-sale hover:text-sale-foreground"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        {/* Specs */}
        <div className="mb-2 flex flex-wrap gap-1">
          {product.specs.map((spec) => (
            <span
              key={spec}
              className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {spec}
            </span>
          ))}
        </div>

        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-card-foreground leading-snug group-hover:text-primary">
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
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
          <span className="ml-auto flex items-center gap-0.5 text-[9px] font-semibold text-primary">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              $
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              $
              {product.originalPrice.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
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
