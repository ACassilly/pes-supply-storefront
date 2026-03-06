"use client"

import { useState, useCallback } from "react"
import { ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { triggerCartToast } from "@/components/cart-toast"
import type { Product } from "@/lib/data"

interface AddToCartButtonProps {
  product: Pick<Product, "id" | "name" | "price" | "image"> & { variantId?: string }
  size?: "sm" | "default" | "lg"
  className?: string
  quantity?: number
}

export function AddToCartButton({ product, size = "sm", className = "", quantity = 1 }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [adding, setAdding] = useState(false)

  const handleAdd = useCallback(async () => {
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
  }, [addItem, product, quantity])

  return (
    <Button size={size} className={`mt-3 w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 ${className}`} onClick={handleAdd} disabled={adding}>
      {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingCart className="h-3.5 w-3.5" />}
      {adding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
