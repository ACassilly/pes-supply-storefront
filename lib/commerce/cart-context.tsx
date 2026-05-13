'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { CommerceCart, CartLineInput, CartLineUpdateInput } from './types'

const CART_ID_KEY = 'pes_cart_id'
const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ''
const MEDUSA_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ''

async function medusaStore<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${MEDUSA_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-publishable-api-key': MEDUSA_KEY,
      ...(options.headers ?? {}),
    },
  })
  if (!res.ok) throw new Error(`Medusa ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

interface CartContextValue {
  cart: CommerceCart | null
  loading: boolean
  addItem: (lines: CartLineInput[]) => Promise<void>
  updateItem: (lines: CartLineUpdateInput[]) => Promise<void>
  removeItem: (lineIds: string[]) => Promise<void>
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CommerceCart | null>(null)
  const [loading, setLoading] = useState(false)

  // Restore or create cart on mount
  useEffect(() => {
    async function initCart() {
      setLoading(true)
      try {
        const savedId = typeof window !== 'undefined'
          ? localStorage.getItem(CART_ID_KEY)
          : null

        if (savedId) {
          try {
            const data = await medusaStore<{ cart: CommerceCart }>(`/store/carts/${savedId}`)
            setCart(data.cart)
            return
          } catch {
            // Cart expired or not found — create new
            localStorage.removeItem(CART_ID_KEY)
          }
        }

        const regionData = await medusaStore<{ regions: Array<{ id: string }> }>('/store/regions')
        const regionId = regionData.regions?.[0]?.id
        if (!regionId) throw new Error('No Medusa region configured')

        const data = await medusaStore<{ cart: CommerceCart }>('/store/carts', {
          method: 'POST',
          body: JSON.stringify({ region_id: regionId }),
        })
        setCart(data.cart)
        localStorage.setItem(CART_ID_KEY, data.cart.id)
      } catch (e) {
        console.error('[cart] Init failed:', e)
      } finally {
        setLoading(false)
      }
    }
    initCart()
  }, [])

  const addItem = useCallback(async (lines: CartLineInput[]) => {
    if (!cart) return
    setLoading(true)
    try {
      let updatedCart = cart
      for (const line of lines) {
        const data = await medusaStore<{ cart: CommerceCart }>(`/store/carts/${cart.id}/line-items`, {
          method: 'POST',
          body: JSON.stringify({ variant_id: line.merchandiseId, quantity: line.quantity }),
        })
        updatedCart = data.cart
      }
      setCart(updatedCart)
    } finally {
      setLoading(false)
    }
  }, [cart])

  const updateItem = useCallback(async (lines: CartLineUpdateInput[]) => {
    if (!cart) return
    setLoading(true)
    try {
      let updatedCart = cart
      for (const line of lines) {
        const data = await medusaStore<{ cart: CommerceCart }>(
          `/store/carts/${cart.id}/line-items/${line.id}`,
          { method: 'POST', body: JSON.stringify({ quantity: line.quantity }) }
        )
        updatedCart = data.cart
      }
      setCart(updatedCart)
    } finally {
      setLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineIds: string[]) => {
    if (!cart) return
    setLoading(true)
    try {
      let updatedCart = cart
      for (const id of lineIds) {
        const data = await medusaStore<{ cart: CommerceCart }>(
          `/store/carts/${cart.id}/line-items/${id}`,
          { method: 'DELETE' }
        )
        updatedCart = data.cart
      }
      setCart(updatedCart)
    } finally {
      setLoading(false)
    }
  }, [cart])

  const clearCart = useCallback(() => {
    setCart(null)
    localStorage.removeItem(CART_ID_KEY)
  }, [])

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
