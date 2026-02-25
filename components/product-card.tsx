"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Truck, Minus, Plus, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"
import { useCart } from "@/hooks/use-cart"
import { triggerCartToast } from "@/components/cart-toast"

export interface ProductCardData {
  slug: string
  name: string
  sku?: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  badge: string
  freeShipping: boolean
  specs?: string[]
}

export function ProductCard({ product, variant = "vertical" }: { product: ProductCardData; variant?: "vertical" | "horizontal" }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [adding, setAdding] = useState(false)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAdd = useCallback(() => {
    setAdding(true)
    setTimeout(() => {
      for (let i = 0; i < qty; i++) {
        addItem({ id: Math.random(), name: product.name, price: product.price, image: product.image })
      }
      triggerCartToast({ name: `${product.name}${qty > 1 ? ` (x${qty})` : ""}`, price: product.price * qty, image: product.image })
      setAdding(false)
      setQty(1)
    }, 350)
  }, [addItem, product, qty])

  if (variant === "horizontal") {
    return (
      <div className="group flex w-52 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md sm:w-56">
        <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-muted">
          <Image src={product.image} alt={product.name} fill sizes="230px" className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          <Badge className="absolute left-1.5 top-1.5 bg-primary text-[9px] text-primary-foreground">{product.badge}</Badge>
          {discount > 0 && <Badge className="absolute right-1.5 top-1.5 bg-sale text-[9px] text-sale-foreground">{discount}% OFF</Badge>}
        </Link>
        <div className="flex flex-1 flex-col p-2.5">
          <Link href={`/products/${product.slug}`} className="mb-1 line-clamp-2 text-xs font-semibold leading-snug text-card-foreground group-hover:text-primary">{product.name}</Link>
          {product.sku && <span className="mb-1 text-[9px] text-muted-foreground">Mfg# {product.sku}</span>}
          <div className="mb-1.5 flex items-center gap-1">
            <StarRating rating={product.rating} size="xs" />
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

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        <Badge className="absolute left-2 top-2 bg-primary text-[10px] text-primary-foreground">{product.badge}</Badge>
        {discount > 0 && <Badge className="absolute right-2 top-2 bg-sale text-[10px] text-sale-foreground">{discount}% OFF</Badge>}
      </Link>
      <div className="flex flex-1 flex-col p-3">
        {product.specs && product.specs.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {product.specs.map((spec) => (<span key={spec} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{spec}</span>))}
          </div>
        )}
        <Link href={`/products/${product.slug}`} className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary">{product.name}</Link>
        {product.sku && <span className="mb-1 text-[10px] text-muted-foreground">Mfg# {product.sku}</span>}
        <div className="mb-2 flex items-center gap-1.5">
          <StarRating rating={product.rating} size="sm" />
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            {discount > 0 && <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>}
          </div>
          {product.freeShipping && (
            <span className="mt-1 flex items-center gap-1 text-[10px] font-medium text-primary"><Truck className="h-3 w-3" /> Free Shipping</span>
          )}
        </div>
        {/* Quantity stepper + Add to Cart */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center rounded-md border border-border">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-8 w-7 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Decrease quantity"><Minus className="h-3 w-3" /></button>
            <span className="flex h-8 w-8 items-center justify-center text-xs font-bold text-foreground">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="flex h-8 w-7 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Increase quantity"><Plus className="h-3 w-3" /></button>
          </div>
          <Button size="sm" className="flex-1 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleAdd} disabled={adding}>
            {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingCart className="h-3.5 w-3.5" />}
            {adding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  )
}
