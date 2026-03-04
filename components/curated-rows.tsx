"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Icon } from "@/components/icon"
import { ProductCard, type ProductCardData } from "@/components/product-card"

interface CuratedRow {
  title: string
  subtitle: string
  href: string
  products: ProductCardData[]
}

const rows: CuratedRow[] = [
  {
    title: "New Arrivals -- Ships Free",
    subtitle: "Just landed. Order by 2 PM ET, ships same day. Free freight on $999+.",
    href: "/departments",
    products: [
      { slug: "sol-ark-15k-hybrid-inverter", name: "Sol-Ark 15K Hybrid Inverter", sku: "SOL-ARK-15K", price: 3995.00, originalPrice: 4595.00, rating: 4.9, reviews: 187, image: "/images/product-inverter.jpg", badge: "New", freeShipping: true },
      { slug: "mrcool-diy-24k-mini-split", name: "MRCOOL DIY 24K BTU Mini Split", sku: "DIY-24-HP-C-230", price: 1549.00, originalPrice: 1899.00, rating: 4.6, reviews: 893, image: "/images/product-minisplit.jpg", badge: "New", freeShipping: true },
      { slug: "jinko-580w-bifacial-module", name: "Jinko 580W N-Type Bifacial Module", sku: "JKM580N-72HL4-V", price: 133.40, originalPrice: 174.00, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", badge: "New", freeShipping: true },
      { slug: "tesla-wall-connector-gen3", name: "Tesla Wall Connector Gen 3", sku: "1457768-01-F", price: 475.00, originalPrice: 530.00, rating: 4.7, reviews: 891, image: "/images/product-ev-charger.jpg", badge: "New", freeShipping: true },
      { slug: "eaton-br-100a-panel", name: "Eaton BR 100A Main Breaker Panel", sku: "EAT-BR2020B100V", price: 89.95, originalPrice: 119.00, rating: 4.5, reviews: 892, image: "/images/product-panel.jpg", badge: "New", freeShipping: false },
      { slug: "generac-22kw-standby-generator", name: "Generac 22kW Standby Generator", sku: "7043", price: 5299.00, originalPrice: 5799.00, rating: 4.6, reviews: 128, image: "/images/product-generator.jpg", badge: "New", freeShipping: true },
    ],
  },
  {
    title: "Contractor Favorites",
    subtitle: "The products our trade accounts reorder most.",
    href: "/departments/electrical",
    products: [
      { slug: "square-d-200a-main-breaker-panel", name: "Square D 200A Main Breaker Panel", sku: "HOM3060M200PC", price: 189.95, originalPrice: 234.00, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", badge: "In Stock", freeShipping: false },
      { slug: "milwaukee-m18-fuel-hammer-drill-kit", name: 'Milwaukee M18 FUEL 1/2" Hammer Drill Kit', sku: "2904-22", price: 199.00, originalPrice: 279.00, rating: 4.9, reviews: 1204, image: "/images/product-tools.jpg", badge: "Ships Today", freeShipping: true },
      { slug: "sharkbite-push-connect-valve-kit", name: 'SharkBite 1/2" Push-to-Connect Valve Kit', sku: "22222-0000LFA", price: 24.97, originalPrice: 34.99, rating: 4.8, reviews: 2310, image: "/images/cat-plumbing.jpg", badge: "Ships Today", freeShipping: false },
      { slug: "eaton-br-20a-breaker-10pk", name: "Eaton BR 20A Single Pole Breaker (10-Pack)", sku: "BR120-10PK", price: 47.90, originalPrice: 59.90, rating: 4.9, reviews: 3102, image: "/images/product-breaker-pack.jpg", badge: "In Stock", freeShipping: false },
      { slug: "klein-cl800-clamp-meter", name: "Klein Tools CL800 Digital Clamp Meter", sku: "CL800", price: 109.97, originalPrice: 139.99, rating: 4.7, reviews: 874, image: "/images/product-clamp-meter.jpg", badge: "In Stock", freeShipping: false },
    ],
  },
  {
    title: "Volume Pricing Available",
    subtitle: "Pallet and bulk quantities with trade discounts. Request a quote for best pricing.",
    href: "/departments/solar",
    products: [
      { slug: "jinko-580w-bifacial-module", name: "Jinko 580W Bifacial (Pallet of 36)", sku: "JKM580N-72HL4-V-P36", price: 4802.40, originalPrice: 6264.00, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", badge: "Pallet", freeShipping: true },
      { slug: "generac-22kw-standby-generator", name: "Generac 22kW Generator", sku: "7043", price: 5299.00, originalPrice: 5799.00, rating: 4.6, reviews: 128, image: "/images/product-generator.jpg", badge: "Quote for Best", freeShipping: true },
      { slug: "sol-ark-15k-hybrid-inverter", name: "Sol-Ark 15K Hybrid (Qty 5+)", sku: "SOL-ARK-15K-5", price: 3795.00, originalPrice: 4595.00, rating: 4.9, reviews: 187, image: "/images/product-inverter.jpg", badge: "Volume", freeShipping: true },
      { slug: "square-d-200a-main-breaker-panel", name: "Square D 200A Panel (Case of 6)", sku: "HOM3060M200PC-C6", price: 1079.70, originalPrice: 1404.00, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", badge: "Pallet", freeShipping: true },
      { slug: "tesla-wall-connector-gen3", name: "Tesla Wall Connector (Qty 10+)", sku: "1457768-01-F-10", price: 427.50, originalPrice: 530.00, rating: 4.7, reviews: 891, image: "/images/product-ev-charger.jpg", badge: "Volume", freeShipping: true },
    ],
  },
]

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
          Shop All <Icon name="arrow-right" className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="relative">
        {canLeft && (
          <button onClick={() => scroll(-1)} className="absolute -left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md hover:bg-muted" aria-label="Scroll left">
            <Icon name="chevron-left" className="h-4 w-4" />
          </button>
        )}
        <div ref={scrollRef} className="scrollbar-none flex gap-3 overflow-x-auto scroll-smooth">
          {row.products.map((product, idx) => (
            <ProductCard key={`${product.slug}-${idx}`} product={product} variant="horizontal" />
          ))}
        </div>
        {canRight && (
          <button onClick={() => scroll(1)} className="absolute -right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md hover:bg-muted" aria-label="Scroll right">
            <Icon name="chevron-right" className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="mt-3 flex justify-center sm:hidden">
        <Link href={row.href} className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Shop All <Icon name="arrow-right" className="h-3.5 w-3.5" />
        </Link>
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
