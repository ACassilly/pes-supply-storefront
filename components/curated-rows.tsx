"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Truck, ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { triggerCartToast } from "@/components/cart-toast"

interface Product {
  slug: string
  name: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  badge: string
  freeShipping: boolean
}

interface CuratedRow {
  title: string
  subtitle: string
  href: string
  products: Product[]
}

const rows: CuratedRow[] = [
  {
    title: "Ships Free Today",
    subtitle: "Order by 2 PM ET for same-day dispatch. Free freight on orders $999+.",
    href: "/departments",
    products: [
      { slug: "jinko-580w-bifacial-module", name: "Jinko 580W N-Type Bifacial Module", price: 133.40, originalPrice: 174.00, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", badge: "Ships Free", freeShipping: true },
      { slug: "sol-ark-15k-hybrid-inverter", name: "Sol-Ark 15K Hybrid Inverter", price: 3995.00, originalPrice: 4595.00, rating: 4.9, reviews: 187, image: "/images/product-inverter.jpg", badge: "Ships Free", freeShipping: true },
      { slug: "generac-22kw-standby-generator", name: "Generac 22kW Standby Generator", price: 5299.00, originalPrice: 5799.00, rating: 4.6, reviews: 128, image: "/images/product-generator.jpg", badge: "Ships Free", freeShipping: true },
      { slug: "tesla-wall-connector-gen3", name: "Tesla Wall Connector Gen 3", price: 475.00, originalPrice: 530.00, rating: 4.7, reviews: 891, image: "/images/product-ev-charger.jpg", badge: "Ships Free", freeShipping: true },
      { slug: "mrcool-diy-24k-mini-split", name: "MRCOOL DIY 24K BTU Mini Split", price: 1549.00, originalPrice: 1899.00, rating: 4.6, reviews: 893, image: "/images/cat-hvac.jpg", badge: "Ships Free", freeShipping: true },
    ],
  },
  {
    title: "Contractor Favorites",
    subtitle: "The products our trade accounts reorder most.",
    href: "/departments/electrical",
    products: [
      { slug: "square-d-200a-main-breaker-panel", name: "Square D 200A Main Breaker Panel", price: 189.95, originalPrice: 234.00, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", badge: "In Stock", freeShipping: false },
      { slug: "milwaukee-m18-fuel-hammer-drill-kit", name: 'Milwaukee M18 FUEL 1/2" Hammer Drill Kit', price: 199.00, originalPrice: 279.00, rating: 4.9, reviews: 1204, image: "/images/product-tools.jpg", badge: "Ships Today", freeShipping: true },
      { slug: "sharkbite-push-connect-valve-kit", name: 'SharkBite 1/2" Push-to-Connect Valve Kit', price: 24.97, originalPrice: 34.99, rating: 4.8, reviews: 2310, image: "/images/cat-plumbing.jpg", badge: "Ships Today", freeShipping: false },
      { slug: "square-d-200a-main-breaker-panel", name: "Eaton BR 20A Single Pole Breaker (10-Pack)", price: 47.90, originalPrice: 59.90, rating: 4.9, reviews: 3102, image: "/images/cat-electrical.jpg", badge: "In Stock", freeShipping: false },
      { slug: "milwaukee-m18-fuel-hammer-drill-kit", name: "Klein Tools CL800 Digital Clamp Meter", price: 109.97, originalPrice: 139.99, rating: 4.7, reviews: 874, image: "/images/product-tools.jpg", badge: "In Stock", freeShipping: false },
    ],
  },
  {
    title: "Volume Pricing Available",
    subtitle: "Pallet and bulk quantities with trade discounts. Request a quote for best pricing.",
    href: "/departments/solar",
    products: [
      { slug: "jinko-580w-bifacial-module", name: "Jinko 580W Bifacial (Pallet of 36)", price: 4802.40, originalPrice: 6264.00, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", badge: "Pallet", freeShipping: true },
      { slug: "generac-22kw-standby-generator", name: "Generac 22kW Generator", price: 5299.00, originalPrice: 5799.00, rating: 4.6, reviews: 128, image: "/images/product-generator.jpg", badge: "Quote for Best", freeShipping: true },
      { slug: "sol-ark-15k-hybrid-inverter", name: "Sol-Ark 15K Hybrid (Qty 5+)", price: 3795.00, originalPrice: 4595.00, rating: 4.9, reviews: 187, image: "/images/product-inverter.jpg", badge: "Volume", freeShipping: true },
      { slug: "square-d-200a-main-breaker-panel", name: "Square D 200A Panel (Case of 6)", price: 1079.70, originalPrice: 1404.00, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", badge: "Pallet", freeShipping: true },
      { slug: "tesla-wall-connector-gen3", name: "Tesla Wall Connector (Qty 10+)", price: 427.50, originalPrice: 530.00, rating: 4.7, reviews: 891, image: "/images/product-ev-charger.jpg", badge: "Volume", freeShipping: true },
    ],
  },
]

function RowStarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i))
        return (
          <span key={i} className="relative inline-block h-2.5 w-2.5">
            <Star className="absolute inset-0 h-2.5 w-2.5 fill-muted text-muted" />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="h-2.5 w-2.5 fill-accent text-accent" />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}

function ScrollableRow({ row }: { row: CuratedRow }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  function checkScroll() {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener("scroll", checkScroll, { passive: true })
    return () => { if (el) el.removeEventListener("scroll", checkScroll) }
  }, [])

  function scroll(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" })
  }

  return (
    <div className="py-8">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">{row.title}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{row.subtitle}</p>
        </div>
        <Link href={row.href} className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
          Shop All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="relative">
        {canLeft && (
          <button onClick={() => scroll(-1)} className="absolute -left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md hover:bg-muted" aria-label="Scroll left">
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div ref={scrollRef} className="scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {row.products.map((product, idx) => (
            <RowProductCard key={`${product.slug}-${idx}`} product={product} />
          ))}
        </div>

        {canRight && (
          <button onClick={() => scroll(1)} className="absolute -right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md hover:bg-muted" aria-label="Scroll right">
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-3 flex justify-center sm:hidden">
        <Link href={row.href} className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Shop All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

function RowProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [adding, setAdding] = useState(false)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAdd = useCallback(() => {
    setAdding(true)
    setTimeout(() => {
      addItem({ id: Math.random(), name: product.name, price: product.price, image: product.image })
      triggerCartToast({ name: product.name, price: product.price, image: product.image })
      setAdding(false)
    }, 350)
  }, [addItem, product])

  return (
    <div className="group flex w-52 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md sm:w-56">
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image src={product.image} alt={product.name} fill sizes="230px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
        <Badge className="absolute left-1.5 top-1.5 bg-primary text-[9px] text-primary-foreground">{product.badge}</Badge>
        {discount > 0 && <Badge className="absolute right-1.5 top-1.5 bg-sale text-[9px] text-sale-foreground">{discount}% OFF</Badge>}
      </Link>
      <div className="flex flex-1 flex-col p-2.5">
        <Link href={`/products/${product.slug}`} className="mb-1 line-clamp-2 text-xs font-semibold leading-snug text-card-foreground group-hover:text-primary">{product.name}</Link>
        <div className="mb-1.5 flex items-center gap-1">
          <RowStarRating rating={product.rating} />
          <span className="text-[10px] text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-foreground">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          {discount > 0 && <span className="text-[10px] text-muted-foreground line-through">${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>}
        </div>
        {product.freeShipping && (
          <span className="mt-1 flex items-center gap-0.5 text-[10px] font-medium text-primary"><Truck className="h-2.5 w-2.5" /> Free Shipping</span>
        )}
        <Button size="sm" className="mt-2 w-full gap-1 bg-primary py-1 text-[11px] text-primary-foreground hover:bg-primary/90" onClick={handleAdd} disabled={adding}>
          {adding ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShoppingCart className="h-3 w-3" />}
          {adding ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}

export function CuratedRows() {
  return (
    <section className="mx-auto max-w-7xl px-4" aria-label="Curated product collections">
      <div className="divide-y divide-border">
        {rows.map((row) => (
          <ScrollableRow key={row.title} row={row} />
        ))}
      </div>
    </section>
  )
}
