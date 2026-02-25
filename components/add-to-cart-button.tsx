"use client"

import { useState, useCallback } from "react"
import { ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { triggerCartToast } from "@/components/cart-toast"
import type { Product } from "@/lib/data"

export function AddToCartButton({ product, size = "sm", className = "" }: { product: Pick<Product, "id" | "name" | "price" | "image">; size?: "sm" | "default" | "lg"; className?: string }) {
  const { addItem } = useCart()
  const [adding, setAdding] = useState(false)

  const handleAdd = useCallback(() => {
    setAdding(true)
    setTimeout(() => {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
      triggerCartToast({ name: product.name, price: product.price, image: product.image })
      setAdding(false)
    }, 400)
  }, [addItem, product])

  return (
    <Button size={size} className={`mt-3 w-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 ${className}`} onClick={handleAdd} disabled={adding}>
      {adding ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingCart className="h-3.5 w-3.5" />}
      {adding ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
