"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { CheckCircle2, X } from "lucide-react"

interface ToastData {
  name: string
  price: number
  image: string
}

let showToastGlobal: ((data: ToastData) => void) | null = null

export function triggerCartToast(data: ToastData) {
  showToastGlobal?.(data)
}

export function CartToastProvider() {
  const [toast, setToast] = useState<ToastData | null>(null)
  const [visible, setVisible] = useState(false)

  const show = useCallback((data: ToastData) => {
    setToast(data)
    setVisible(true)
  }, [])

  useEffect(() => {
    showToastGlobal = show
    return () => { showToastGlobal = null }
  }, [show])

  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [visible, toast])

  if (!visible || !toast) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-80 items-center gap-3 rounded-lg border border-border bg-card p-3 shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-200">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image src={toast.image} alt="" fill className="object-cover" sizes="48px" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
          <CheckCircle2 className="h-3.5 w-3.5" /> Added to Cart
        </div>
        <p className="mt-0.5 truncate text-sm font-medium text-card-foreground">{toast.name}</p>
        <p className="text-xs text-muted-foreground">${toast.price.toFixed(2)}</p>
      </div>
      <button onClick={() => setVisible(false)} className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="Close">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
