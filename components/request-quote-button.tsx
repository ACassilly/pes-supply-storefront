"use client"

import { useState } from "react"
import { FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RequestQuoteButton({ productName, sku }: { productName: string; sku: string }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Button variant="outline" size="lg" className="mt-0 gap-1.5 sm:flex-1" onClick={() => setOpen(true)}>
        <FileText className="h-4 w-4" /> Request Quote
      </Button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-foreground/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-card-foreground">Request a Quote</h3>
              <button onClick={() => { setOpen(false); setSubmitted(false) }} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><FileText className="h-6 w-6" /></div>
                <h4 className="text-lg font-bold text-card-foreground">Quote request received</h4>
                <p className="mt-2 text-sm text-muted-foreground">Our team will email your quote within 2 business hours.</p>
                <Button className="mt-4" onClick={() => { setOpen(false); setSubmitted(false) }}>Close</Button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="flex flex-col gap-4">
                <div className="rounded-md border border-border bg-muted/50 px-3 py-2">
                  <p className="text-xs text-muted-foreground">Product</p>
                  <p className="text-sm font-semibold text-card-foreground">{productName}</p>
                  <p className="text-xs text-muted-foreground">SKU: {sku}</p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-card-foreground">Company Name</label>
                  <input required className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-card-foreground">Name</label>
                    <input required className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-medium text-card-foreground">Email</label>
                    <input required type="email" className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-card-foreground">Quantity</label>
                  <input required type="number" min="1" defaultValue="1" className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-card-foreground">Notes (optional)</label>
                  <textarea rows={2} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Volume pricing, delivery timeline, special requirements..." />
                </div>
                <Button type="submit" className="w-full">Submit Quote Request</Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
