"use client"

import { useState, useCallback } from "react"
import { ClipboardList, Plus, Trash2, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { triggerCartToast } from "@/components/cart-toast"

interface LineItem {
  id: number
  partNumber: string
  qty: number
}

export function QuickOrderPad() {
  const { addItem } = useCart()
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<LineItem[]>([
    { id: 1, partNumber: "", qty: 1 },
    { id: 2, partNumber: "", qty: 1 },
    { id: 3, partNumber: "", qty: 1 },
    { id: 4, partNumber: "", qty: 1 },
    { id: 5, partNumber: "", qty: 1 },
  ])
  const [bulkText, setBulkText] = useState("")
  const [mode, setMode] = useState<"lines" | "paste">("lines")
  const [submitting, setSubmitting] = useState(false)

  const addLine = useCallback(() => {
    setLines(prev => [...prev, { id: Date.now(), partNumber: "", qty: 1 }])
  }, [])

  const removeLine = useCallback((id: number) => {
    setLines(prev => prev.filter(l => l.id !== id))
  }, [])

  const updateLine = useCallback((id: number, field: "partNumber" | "qty", value: string | number) => {
    setLines(prev => prev.map(l => l.id === id ? { ...l, [field]: value } : l))
  }, [])

  const handleSubmit = useCallback(() => {
    const validLines = mode === "lines"
      ? lines.filter(l => l.partNumber.trim())
      : bulkText.trim().split("\n").filter(Boolean).map(line => {
          const parts = line.split(/[\t,;]+/)
          return { partNumber: parts[0]?.trim() || "", qty: parseInt(parts[1]?.trim()) || 1 }
        }).filter(l => l.partNumber)

    if (validLines.length === 0) return

    setSubmitting(true)
    setTimeout(() => {
      validLines.forEach(l => {
        const qty = "qty" in l ? l.qty : 1
        for (let i = 0; i < qty; i++) {
          addItem({
            id: Math.random(),
            name: `${"partNumber" in l ? l.partNumber : ""}`,
            price: 0,
            image: "/images/pes-logo.png",
          })
        }
      })
      triggerCartToast({
        name: `${validLines.length} items added via Quick Order`,
        price: 0,
        image: "/images/pes-logo.png",
      })
      setSubmitting(false)
      setOpen(false)
      setLines([
        { id: 1, partNumber: "", qty: 1 },
        { id: 2, partNumber: "", qty: 1 },
        { id: 3, partNumber: "", qty: 1 },
        { id: 4, partNumber: "", qty: 1 },
        { id: 5, partNumber: "", qty: 1 },
      ])
      setBulkText("")
    }, 600)
  }, [mode, lines, bulkText, addItem])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 whitespace-nowrap py-2 text-[13px] font-medium text-background/80 transition-colors hover:text-primary"
      >
        <ClipboardList className="h-3.5 w-3.5" /> Quick Order
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[9998] bg-foreground/50" onClick={() => setOpen(false)} aria-hidden />
          <div className="fixed inset-x-4 top-[10%] z-[9999] mx-auto max-w-lg rounded-xl border border-border bg-card shadow-2xl md:inset-x-auto md:w-[520px]" role="dialog" aria-label="Quick Order Pad">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h2 className="flex items-center gap-2 text-base font-bold text-card-foreground">
                <ClipboardList className="h-5 w-5" /> Quick Order
              </h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="flex border-b border-border">
              <button
                onClick={() => setMode("lines")}
                className={`flex-1 py-2 text-xs font-semibold transition-colors ${mode === "lines" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Enter Part Numbers
              </button>
              <button
                onClick={() => setMode("paste")}
                className={`flex-1 py-2 text-xs font-semibold transition-colors ${mode === "paste" ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                Paste from PO / Takeoff
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-5">
              {mode === "lines" ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <span className="flex-1">Part # / SKU / Mfg #</span>
                    <span className="w-16 text-center">Qty</span>
                    <span className="w-7" />
                  </div>
                  {lines.map((line) => (
                    <div key={line.id} className="flex items-center gap-2">
                      <input
                        value={line.partNumber}
                        onChange={(e) => updateLine(line.id, "partNumber", e.target.value)}
                        placeholder="e.g. SQD-HOM3060M200PC"
                        className="h-9 flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-primary"
                      />
                      <input
                        type="number"
                        min={1}
                        value={line.qty}
                        onChange={(e) => updateLine(line.id, "qty", parseInt(e.target.value) || 1)}
                        className="h-9 w-16 rounded-md border border-border bg-background px-2 text-center text-sm outline-none focus:border-primary"
                      />
                      <button onClick={() => removeLine(line.id)} className="flex h-7 w-7 shrink-0 items-center justify-center text-muted-foreground hover:text-sale" aria-label="Remove line">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <button onClick={addLine} className="flex items-center gap-1 self-start rounded-md px-2 py-1.5 text-xs font-medium text-primary hover:bg-primary/10">
                    <Plus className="h-3 w-3" /> Add row
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-muted-foreground">
                    Paste your parts list below. One item per line. Format: Part Number, Quantity (tab or comma separated).
                  </p>
                  <textarea
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    rows={10}
                    placeholder={"SQD-HOM3060M200PC\t5\nMIL-2904-22\t2\nGEN-7043\t1\nJKM580N-72HL4-BDV\t24"}
                    className="w-full resize-none rounded-md border border-border bg-background p-3 font-mono text-xs leading-relaxed outline-none focus:border-primary"
                  />
                  <p className="text-[10px] text-muted-foreground">Accepts tab-separated, comma-separated, or one part per line.</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-border p-5">
              <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSubmit} disabled={submitting} className="flex-1 gap-1.5">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                {submitting ? "Adding..." : "Add All to Cart"}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
