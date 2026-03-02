"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Eye, Truck, ShieldCheck, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { triggerCartToast } from "@/components/cart-toast"

const products = [
  { id: 1, slug: "square-d-200a-main-breaker-panel", name: "Square D 200A Main Breaker Panel", category: "electrical", price: 189.95, originalPrice: 234.0, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", badge: "In Stock", freeShipping: false, specs: ["200A", "30-Space", "Indoor"] },
  { id: 2, slug: "milwaukee-m18-fuel-hammer-drill-kit", name: 'Milwaukee M18 FUEL 1/2" Hammer Drill Kit', category: "tools", price: 199.0, originalPrice: 279.0, rating: 4.9, reviews: 1204, image: "/images/product-tools.jpg", badge: "Ships Today", freeShipping: true, specs: ["18V", "Brushless", "2-Speed"] },
  { id: 3, slug: "mrcool-diy-24k-mini-split", name: "MRCOOL DIY 24K BTU Ductless Mini Split", category: "hvac", price: 1549.0, originalPrice: 1899.0, rating: 4.6, reviews: 893, image: "/images/product-minisplit.jpg", badge: "In Stock", freeShipping: true, specs: ["24K BTU", "20 SEER", "WiFi"] },
  { id: 4, slug: "jinko-580w-bifacial-module", name: "Jinko 580W N-Type Bifacial Module", category: "solar", price: 133.4, originalPrice: 174.0, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", badge: "Ready to Ship", freeShipping: true, specs: ["580W", "Bifacial", "Tier 1"] },
  { id: 5, slug: "generac-22kw-standby-generator", name: "Generac 22kW Standby Generator", category: "generators", price: 5299.0, originalPrice: 5799.0, rating: 4.6, reviews: 128, image: "/images/product-generator.jpg", badge: "In Stock", freeShipping: true, specs: ["22kW", "NG/LP", "Auto Transfer"] },
  { id: 6, slug: "sharkbite-push-connect-valve-kit", name: 'SharkBite 1/2" Push-to-Connect Valve Kit', category: "plumbing", price: 24.97, originalPrice: 34.99, rating: 4.8, reviews: 2310, image: "/images/cat-plumbing.jpg", badge: "Ships Today", freeShipping: false, specs: ['1/2"', "Push-Fit", "Lead-Free"] },
  { id: 7, slug: "tesla-wall-connector-gen3", name: "Tesla Wall Connector Gen 3 EV Charger", category: "ev", price: 475.0, originalPrice: 530.0, rating: 4.7, reviews: 891, image: "/images/product-ev-charger.jpg", badge: "In Stock", freeShipping: true, specs: ["48A", "Level 2", "WiFi"] },
  { id: 8, slug: "sol-ark-15k-hybrid-inverter", name: "Sol-Ark 15K Hybrid Inverter", category: "solar", price: 3995.0, originalPrice: 4595.0, rating: 4.9, reviews: 187, image: "/images/product-inverter.jpg", badge: "Ready to Ship", freeShipping: true, specs: ["15kW", "Hybrid", "200A MPPT"] },
]

const tabs = [
  { value: "all", label: "All" },
  { value: "electrical", label: "Electrical" },
  { value: "tools", label: "Tools" },
  { value: "hvac", label: "HVAC" },
  { value: "solar", label: "Solar" },
  { value: "plumbing", label: "Plumbing" },
  { value: "generators", label: "Generators" },
  { value: "ev", label: "EV" },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i))
        return (
          <span key={i} className="relative inline-block h-3 w-3">
            <Star className="absolute inset-0 h-3 w-3 fill-muted text-muted" />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-3 w-3 fill-accent text-accent" />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all")
  const filtered = activeTab === "all" ? products : products.filter((p) => p.category === activeTab)

  return (
    <section className="mx-auto max-w-7xl px-4 py-12" aria-labelledby="featured-heading">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="featured-heading" className="text-2xl font-bold text-foreground">Featured Products</h2>
          <p className="mt-1 text-sm text-muted-foreground">In stock and ready to ship. Order by 2 PM ET, processed same day.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Every product backed by full manufacturer warranty
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="h-auto flex-wrap">
          {tabs.map((tab) => (<TabsTrigger key={tab.value} value={tab.value} className="text-xs sm:text-sm">{tab.label}</TabsTrigger>))}
        </TabsList>
      </Tabs>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">No featured products in this category yet.</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => setActiveTab("all")}>View All Products</Button>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Link href="/departments" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View All Featured Products <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const { addItem } = useCart()
  const [adding, setAdding] = useState(false)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = useCallback(() => {
    setAdding(true)
    setTimeout(() => {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
      triggerCartToast({ name: product.name, price: product.price, image: product.image })
      setAdding(false)
    }, 400)
  }, [addItem, product])

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <Badge className="absolute left-2 top-2 bg-primary text-[10px] text-primary-foreground">{product.badge}</Badge>
        {discount > 0 && (<Badge className="absolute right-2 top-2 bg-sale text-[10px] text-sale-foreground">{discount}% OFF</Badge>)}
        <div className="absolute bottom-2 right-2 flex translate-y-2 gap-1.5 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-card-foreground shadow-md hover:bg-primary hover:text-primary-foreground" aria-label={`Quick view ${product.name}`}><Eye className="h-4 w-4" /></button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-card-foreground shadow-md hover:bg-sale hover:text-sale-foreground" aria-label={`Save ${product.name}`}><Heart className="h-4 w-4" /></button>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3">
        <div className="mb-2 flex flex-wrap gap-1">
          {product.specs.map((spec) => (<span key={spec} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{spec}</span>))}
        </div>
        <Link href={`/products/${product.slug}`} className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary">{product.name}</Link>
        <div className="mb-2 flex items-center gap-1.5">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </div>
          {product.freeShipping && (<span className="mt-1 flex items-center gap-1 text-[10px] font-medium text-primary"><Truck className="h-3 w-3" /> Free Shipping</span>)}
        </div>
        <Button size="sm" className="mt-3 w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleAddToCart} disabled={adding}>
          {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingCart className="h-3.5 w-3.5" />}
          {adding ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}
