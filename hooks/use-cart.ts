"use client"

import useSWR from "swr"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  qty: number
}

const CART_KEY = "pes-cart"

// SWR keeps this in-memory across components. The fetcher seeds from the
// in-memory cache (SWR handles that), so cart state is shared globally
// without needing localStorage.
function getCart(): CartItem[] {
  // In a real app this would call an API. For now SWR's mutate keeps
  // the in-memory state in sync across all consumers.
  return []
}

export function useCart() {
  const { data: items = [], mutate } = useSWR<CartItem[]>(CART_KEY, getCart, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  })

  const count = items.reduce((sum, item) => sum + item.qty, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  function addItem(product: Omit<CartItem, "qty">) {
    const existing = items.find((i) => i.id === product.id)
    let next: CartItem[]
    if (existing) {
      next = items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
    } else {
      next = [...items, { ...product, qty: 1 }]
    }
    mutate(next, { revalidate: false })
    return next
  }

  function removeItem(id: number) {
    const next = items.filter((i) => i.id !== id)
    mutate(next, { revalidate: false })
  }

  function updateQty(id: number, qty: number) {
    if (qty <= 0) return removeItem(id)
    const next = items.map((i) => (i.id === id ? { ...i, qty } : i))
    mutate(next, { revalidate: false })
  }

  function clearCart() {
    mutate([], { revalidate: false })
  }

  return { items, count, total, addItem, removeItem, updateQty, clearCart, mutate }
}
