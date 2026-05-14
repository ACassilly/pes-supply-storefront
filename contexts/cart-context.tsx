'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'

const BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? 'http://localhost:9000'
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ''

interface LineItem {
  id: string
  title: string
  thumbnail: string | null
  quantity: number
  unit_price: number
  total: number
  variant_id: string
  product_handle: string
}

interface Cart {
  id: string
  items: LineItem[]
  subtotal: number
  total: number
  currency_code: string
  item_count: number
}

interface CartContextValue {
  cart: Cart | null
  loading: boolean
  open: boolean
  setOpen: (v: boolean) => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
  updateQuantity: (lineItemId: string, quantity: number) => Promise<void>
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function headers() {
  return {
    'Content-Type': 'application/json',
    'x-publishable-api-key': PUB_KEY,
  }
}

async function getOrCreateCart(): Promise<string> {
  const stored = localStorage.getItem('medusa_cart_id')
  if (stored) return stored
  const res = await fetch(`${BACKEND}/store/carts`, { method: 'POST', headers: headers() })
  if (!res.ok) throw new Error('Failed to create cart')
  const { cart } = await res.json()
  localStorage.setItem('medusa_cart_id', cart.id)
  return cart.id
}

async function fetchCart(cartId: string): Promise<Cart | null> {
  const res = await fetch(`${BACKEND}/store/carts/${cartId}`, { headers: headers() })
  if (!res.ok) return null
  const { cart } = await res.json()
  const items: LineItem[] = (cart.items ?? []).map((i: {
    id: string
    title: string
    thumbnail: string | null
    quantity: number
    unit_price: number
    total: number
    variant_id: string
    variant?: { product?: { handle: string } }
  }) => ({
    id: i.id,
    title: i.title,
    thumbnail: i.thumbnail,
    quantity: i.quantity,
    unit_price: i.unit_price,
    total: i.total,
    variant_id: i.variant_id,
    product_handle: i.variant?.product?.handle ?? '',
  }))
  return {
    id: cart.id,
    items,
    subtotal: cart.subtotal ?? 0,
    total: cart.total ?? 0,
    currency_code: cart.currency_code ?? 'usd',
    item_count: items.reduce((s, i) => s + i.quantity, 0),
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const cartId = localStorage.getItem('medusa_cart_id')
      if (!cartId) return
      const c = await fetchCart(cartId)
      setCart(c)
    } catch {}
  }, [])

  useEffect(() => { refresh() }, [refresh])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setLoading(true)
    try {
      const cartId = await getOrCreateCart()
      await fetch(`${BACKEND}/store/carts/${cartId}/line-items`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ variant_id: variantId, quantity }),
      })
      const c = await fetchCart(cartId)
      setCart(c)
      setOpen(true)
    } catch (err) {
      console.error('addItem error', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const removeItem = useCallback(async (lineItemId: string) => {
    setLoading(true)
    try {
      const cartId = await getOrCreateCart()
      await fetch(`${BACKEND}/store/carts/${cartId}/line-items/${lineItemId}`, {
        method: 'DELETE',
        headers: headers(),
      })
      const c = await fetchCart(cartId)
      setCart(c)
    } catch {}
    finally { setLoading(false) }
  }, [])

  const updateQuantity = useCallback(async (lineItemId: string, quantity: number) => {
    setLoading(true)
    try {
      const cartId = await getOrCreateCart()
      await fetch(`${BACKEND}/store/carts/${cartId}/line-items/${lineItemId}`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ quantity }),
      })
      const c = await fetchCart(cartId)
      setCart(c)
    } catch {}
    finally { setLoading(false) }
  }, [])

  const clearCart = useCallback(() => {
    localStorage.removeItem('medusa_cart_id')
    setCart(null)
  }, [])

  return (
    <CartContext.Provider value={{ cart, loading, open, setOpen, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
