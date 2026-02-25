"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Minus, Plus, Trash2, ShoppingCart, FileText, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

export function CartFlyout({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, count, total, updateQty, removeItem, clearCart } = useCart()
  const [rfqMode, setRfqMode] = useState(false)
  const [rfqSubmitted, setRfqSubmitted] = useState(false)
  const freeFreight = total >= 999

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[9998] bg-foreground/50" onClick={onClose} aria-hidden />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-[9999] flex w-full max-w-md flex-col bg-card shadow-2xl" role="dialog" aria-label="Shopping cart">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-card-foreground">
            <ShoppingCart className="h-5 w-5" /> Cart {count > 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">{count}</span>}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close cart"><X className="h-5 w-5" /></button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20">
              <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">Your cart is empty</p>
              <Button variant="outline" size="sm" onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 px-4 py-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="truncate text-sm font-semibold text-card-foreground">{item.name}</p>
                    <p className="text-sm font-bold text-foreground">${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                    <div className="mt-auto flex items-center gap-2">
                      <div className="flex items-center rounded-md border border-border">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Decrease quantity"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-xs font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Increase quantity"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-sale" aria-label="Remove item"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-bold text-foreground">${(item.price * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4">
            {/* Free freight indicator */}
            {!freeFreight && (
              <div className="mb-3 rounded-md bg-muted/50 px-3 py-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> Free freight at $999</span>
                  <span className="font-semibold text-primary">${(999 - total).toLocaleString("en-US", { minimumFractionDigits: 2 })} away</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, (total / 999) * 100)}%` }} />
                </div>
              </div>
            )}
            {freeFreight && (
              <div className="mb-3 flex items-center gap-2 rounded-md bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                <Truck className="h-3.5 w-3.5" /> Free freight applied
              </div>
            )}

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal ({count} items)</span>
              <span className="text-xl font-black text-foreground">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>

            {rfqMode ? (
              rfqSubmitted ? (
                <div className="py-4 text-center">
                  <p className="text-sm font-bold text-card-foreground">Quote request sent</p>
                  <p className="mt-1 text-xs text-muted-foreground">We will email your quote within 2 business hours.</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => { setRfqMode(false); setRfqSubmitted(false) }}>Back to cart</Button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setRfqSubmitted(true) }} className="flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground">We will email a formal quote for {count} items totaling ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}.</p>
                  <input required placeholder="Company name" className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                  <div className="flex gap-2">
                    <input required placeholder="Name" className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                    <input required type="email" placeholder="Email" className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                  </div>
                  <input placeholder="Phone (optional)" className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                  <Button type="submit" className="w-full gap-1.5"><FileText className="h-4 w-4" /> Submit Quote Request</Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setRfqMode(false)}>Cancel</Button>
                </form>
              )
            ) : (
              <div className="flex flex-col gap-2">
                <Button className="w-full" size="lg">Proceed to Checkout</Button>
                <Button variant="outline" className="w-full gap-1.5" size="lg" onClick={() => setRfqMode(true)}>
                  <FileText className="h-4 w-4" /> Request a Quote Instead
                </Button>
                <div className="mt-1 flex items-center justify-between">
                  <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-sale">Clear cart</button>
                  <button onClick={onClose} className="text-xs text-primary hover:underline">Continue shopping</button>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  )
}
