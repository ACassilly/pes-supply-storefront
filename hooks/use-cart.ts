"use client"

import useSWR from "swr"

export interface CartItem {
  id: string           // Shopify cart line ID
  variantId: string    // Shopify variant GID
  name: string
  price: number
  image: string
  qty: number
  productHandle?: string
}

// We store the Shopify cart ID in a module-level variable
// and also in sessionStorage for tab persistence
const CART_ID_KEY = "pes-shopify-cart-id"

function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null
  try { return sessionStorage.getItem(CART_ID_KEY) } catch { return null }
}

function storeCartId(id: string) {
  if (typeof window === "undefined") return
  try { sessionStorage.setItem(CART_ID_KEY, id) } catch { /* ignore */ }
}

interface ShopifyCartData {
  items: CartItem[]
  checkoutUrl: string | null
  cartId: string | null
}

async function fetchCart(): Promise<ShopifyCartData> {
  const cartId = getStoredCartId()
  if (!cartId) return { items: [], checkoutUrl: null, cartId: null }

  try {
    const res = await fetch(`/api/cart?cartId=${encodeURIComponent(cartId)}`)
    const { cart } = await res.json()
    if (!cart) return { items: [], checkoutUrl: null, cartId: null }
    return parseShopifyCart(cart)
  } catch {
    return { items: [], checkoutUrl: null, cartId: null }
  }
}

function parseShopifyCart(cart: any): ShopifyCartData {
  const lines = cart.lines?.edges || []
  const items: CartItem[] = lines.map((edge: any) => {
    const node = edge.node
    const merch = node.merchandise
    return {
      id: node.id,
      variantId: merch.id,
      name: merch.product?.title || merch.title || "Product",
      price: parseFloat(merch.price?.amount || "0"),
      image: merch.product?.images?.edges?.[0]?.node?.url || "/images/product-panel.jpg",
      qty: node.quantity,
      productHandle: merch.product?.handle,
    }
  })
  return {
    items,
    checkoutUrl: cart.checkoutUrl || null,
    cartId: cart.id,
  }
}

const SWR_KEY = "shopify-cart"

export function useCart() {
  const { data, mutate } = useSWR<ShopifyCartData>(SWR_KEY, fetchCart, {
    fallbackData: { items: [], checkoutUrl: null, cartId: null },
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  })

  const { items = [], checkoutUrl = null, cartId = null } = data || {}
  const count = items.reduce((sum, item) => sum + item.qty, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  async function ensureCart(): Promise<string> {
    const existing = getStoredCartId()
    if (existing) return existing
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create" }),
    })
    const { cart } = await res.json()
    storeCartId(cart.id)
    return cart.id
  }

  async function addItem(product: { variantId: string; name: string; price: number; image: string }) {
    const cid = await ensureCart()
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "add",
        cartId: cid,
        lines: [{ merchandiseId: product.variantId, quantity: 1 }],
      }),
    })
    const { cart } = await res.json()
    if (cart) {
      const parsed = parseShopifyCart(cart)
      mutate(parsed, { revalidate: false })
    }
  }

  async function removeItem(lineId: string) {
    const cid = getStoredCartId()
    if (!cid) return
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", cartId: cid, lineIds: [lineId] }),
    })
    const { cart } = await res.json()
    if (cart) mutate(parseShopifyCart(cart), { revalidate: false })
  }

  async function updateQty(lineId: string, qty: number) {
    if (qty <= 0) return removeItem(lineId)
    const cid = getStoredCartId()
    if (!cid) return
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "update", cartId: cid, lines: [{ id: lineId, quantity: qty }] }),
    })
    const { cart } = await res.json()
    if (cart) mutate(parseShopifyCart(cart), { revalidate: false })
  }

  function clearCart() {
    if (typeof window !== "undefined") {
      try { sessionStorage.removeItem(CART_ID_KEY) } catch { /* ignore */ }
    }
    mutate({ items: [], checkoutUrl: null, cartId: null }, { revalidate: false })
  }

  return { items, count, total, checkoutUrl, addItem, removeItem, updateQty, clearCart, mutate }
}
