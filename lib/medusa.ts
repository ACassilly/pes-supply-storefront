/**
 * Medusa v2 storefront client
 * All data-fetching functions for the PES Supply frontend.
 */

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? 'http://localhost:9000'
const MEDUSA_PK = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ''

async function medusaFetch<T>(
  path: string,
  options: RequestInit = {},
  tags?: string[]
): Promise<T> {
  const res = await fetch(`${MEDUSA_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-publishable-api-key': MEDUSA_PK,
      ...(options.headers ?? {}),
    },
    next: tags ? { tags } : undefined,
  })
  if (!res.ok) {
    throw new Error(`Medusa ${path} → ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

// ─── Products ────────────────────────────────────────────────────────────────

export interface MedusaProduct {
  id: string
  handle: string
  title: string
  description: string | null
  thumbnail: string | null
  images: { url: string }[]
  variants: MedusaVariant[]
  categories: { handle: string; name: string }[]
  tags: { value: string }[]
  metadata: Record<string, unknown> | null
}

export interface MedusaVariant {
  id: string
  title: string
  sku: string | null
  calculated_price: { calculated_amount: number; currency_code: string } | null
  inventory_quantity: number
}

export async function getProducts(params?: {
  limit?: number
  offset?: number
  category_handle?: string
  q?: string
}): Promise<{ products: MedusaProduct[]; count: number }> {
  const sp = new URLSearchParams()
  if (params?.limit) sp.set('limit', String(params.limit))
  if (params?.offset) sp.set('offset', String(params.offset))
  if (params?.category_handle) sp.set('category_handle[]', params.category_handle)
  if (params?.q) sp.set('q', params.q)
  sp.set('fields', 'id,handle,title,description,thumbnail,images,variants,categories,tags,metadata')
  return medusaFetch(`/store/products?${sp}`, {}, ['products'])
}

export async function getProductByHandle(
  handle: string
): Promise<{ product: MedusaProduct }> {
  return medusaFetch(
    `/store/products?handle=${encodeURIComponent(handle)}&fields=*variants.calculated_price`,
    {},
    [`product-${handle}`]
  ).then((data: { products: MedusaProduct[] }) => ({ product: data.products[0] }))
}

// ─── Categories ──────────────────────────────────────────────────────────────

export interface MedusaCategory {
  id: string
  handle: string
  name: string
  description: string | null
  parent_category: MedusaCategory | null
}

export async function getCategories(): Promise<{ product_categories: MedusaCategory[] }> {
  return medusaFetch('/store/product-categories?limit=100', {}, ['categories'])
}

export async function getCategoryByHandle(
  handle: string
): Promise<{ product_categories: MedusaCategory[] }> {
  return medusaFetch(
    `/store/product-categories?handle=${encodeURIComponent(handle)}`,
    {},
    [`category-${handle}`]
  )
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface MedusaCart {
  id: string
  items: MedusaLineItem[]
  total: number
  subtotal: number
  tax_total: number
  shipping_total: number
  region: { currency_code: string }
}

export interface MedusaLineItem {
  id: string
  title: string
  variant_id: string
  quantity: number
  unit_price: number
  thumbnail: string | null
}

export async function createCart(): Promise<{ cart: MedusaCart }> {
  return medusaFetch('/store/carts', { method: 'POST', body: JSON.stringify({ region_id: process.env.NEXT_PUBLIC_MEDUSA_REGION_ID }) })
}

export async function getCart(cartId: string): Promise<{ cart: MedusaCart }> {
  return medusaFetch(`/store/carts/${cartId}`)
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<{ cart: MedusaCart }> {
  return medusaFetch(`/store/carts/${cartId}/line-items`, {
    method: 'POST',
    body: JSON.stringify({ variant_id: variantId, quantity }),
  })
}

export async function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number
): Promise<{ cart: MedusaCart }> {
  return medusaFetch(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
  })
}

export async function removeCartItem(
  cartId: string,
  lineItemId: string
): Promise<{ cart: MedusaCart }> {
  return medusaFetch(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: 'DELETE',
  })
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export interface MedusaOrder {
  id: string
  display_id: number
  status: string
  created_at: string
  total: number
  currency_code: string
  items: MedusaLineItem[]
  shipping_address: {
    first_name: string
    last_name: string
    address_1: string
    city: string
    province: string
    postal_code: string
    country_code: string
  } | null
}

export async function getCustomerOrders(
  token: string
): Promise<{ orders: MedusaOrder[]; count: number }> {
  return medusaFetch('/store/orders', { headers: { Authorization: `Bearer ${token}` } })
}

export async function getOrder(
  id: string,
  token: string
): Promise<{ order: MedusaOrder }> {
  return medusaFetch(`/store/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function loginCustomer(
  email: string,
  password: string
): Promise<{ token: string; customer: { id: string; email: string; first_name: string; last_name: string } }> {
  return medusaFetch('/store/customers/token', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function registerCustomer(data: {
  email: string
  password: string
  first_name: string
  last_name: string
}): Promise<{ customer: { id: string; email: string } }> {
  return medusaFetch('/store/customers', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
