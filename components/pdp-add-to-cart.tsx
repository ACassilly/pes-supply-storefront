"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { triggerCartToast } from "@/components/cart-toast"
import { QuantitySelector } from "@/components/quantity-selector"
import type { Product } from "@/lib/data"

interface PdpAddToCartProps {
  product: Pick<Product, "id" | "name" | "price" | "image"> & { variantId?: string }
}

export function PdpAddToCart({ product }: PdpAddToCartProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  const handleAdd = async () => {
    if (!product.variantId) {
      // No Shopify variant ID -- show toast anyway for static products
      triggerCartToast({ name: product.name, price: product.price, image: product.image, quantity })
      return
    }
    setAdding(true)
    try {
      await addItem({ variantId: product.variantId, name: product.name, price: product.price, image: product.image, quantity })
      triggerCartToast({ name: product.name, price: product.price, image: product.image, quantity })
    } catch (e) {
      console.error("[v0] AddToCart Failed:", e)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">Quantity:</span>
        <QuantitySelector value={quantity} onChange={setQuantity} min={1} max={999} />
      </div>

      {/* Bulk quote link */}
      <p className="text-xs text-muted-foreground">
        Need 50+ units?{" "}
        <Link href="/quote" className="font-semibold text-primary hover:underline">
          Request a bulk quote
        </Link>
      </p>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        className="w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={handleAdd}
        disabled={adding}
      >
        {adding ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ShoppingCart className="h-4 w-4" />
        )}
        {adding ? "Adding..." : `Add ${quantity > 1 ? `(${quantity})` : ""} to Cart`}
      </Button>
    </div>
  )
}
