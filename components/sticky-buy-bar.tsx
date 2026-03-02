"use client"

import { useEffect, useState } from "react"
import { ShoppingCart, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { triggerCartToast } from "@/components/cart-toast"

interface Props {
  product: { id: number; name: string; price: number; image: string; sku: string }
}

export function StickyBuyBar({ product }: Props) {
  const [visible, setVisible] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 px-4 py-3 shadow-2xl backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="truncate text-sm font-semibold text-foreground">{product.name}</p>
          <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
        </div>
        <p className="text-lg font-black text-foreground">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
              triggerCartToast({ name: product.name, price: product.price, image: product.image })
            }}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <a href="#quote-section"><FileText className="h-3.5 w-3.5" /> Quote</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
