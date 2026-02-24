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

function getCart(): CartItem[] {
  return []
}

export function useCart() {
  const { data: items = [], mutate } = useSWR<CartItem[]>(CART_KEY, getCart, {
    fallbackData: [],
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
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
    mutate(next, false)
    return next
  }

  function removeItem(id: number) {
    const next = items.filter((i) => i.id !== id)
    mutate(next, false)
  }

  return { items, count, total, addItem, removeItem, mutate }
}
