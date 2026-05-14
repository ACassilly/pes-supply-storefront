import Medusa from '@medusajs/js-sdk'

const BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? 'http://localhost:9000'
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ''

export const medusa = new Medusa({
  baseUrl: BACKEND,
  publishableKey: PUB_KEY,
  debug: process.env.NODE_ENV === 'development',
})

export interface MedusaImage { url: string; id: string }
export interface MedusaVariantPrice { amount: number; currency_code: string }
export interface MedusaVariantCalculatedPrice { calculated_amount: number; currency_code: string }
export interface MedusaVariant {
  id: string
  sku?: string
  title: string
  prices?: MedusaVariantPrice[]
  calculated_price?: MedusaVariantCalculatedPrice
  inventory_quantity?: number
}
export interface MedusaCategory { id: string; handle: string; name: string; description?: string; parent_category?: MedusaCategory | null }
export interface MedusaCollection { id: string; handle: string; title: string }
export interface MedusaProduct {
  id: string
  handle: string
  title: string
  description?: string
  thumbnail?: string
  images?: MedusaImage[]
  variants?: MedusaVariant[]
  categories?: MedusaCategory[]
  collection?: MedusaCollection
  metadata?: Record<string, unknown>
  tags?: { value: string }[]
}

const defaultFields = 'id,handle,title,description,thumbnail,images,variants,categories,collection,metadata,tags'

export async function getProducts({ limit = 50, categoryHandle, collectionHandle }: { limit?: number; categoryHandle?: string; collectionHandle?: string } = {}): Promise<MedusaProduct[]> {
  try {
    const params: Record<string, unknown> = { limit, fields: defaultFields }
    if (categoryHandle) params['category_handle[]'] = [categoryHandle]
    if (collectionHandle) params.collection_handle = collectionHandle
    const res = await medusa.store.product.list(params as Parameters<typeof medusa.store.product.list>[0])
    return (res.products ?? []) as unknown as MedusaProduct[]
  } catch { return [] }
}

export async function getProduct(handle: string): Promise<MedusaProduct | null> {
  try {
    const res = await medusa.store.product.list({ handle, fields: defaultFields } as Parameters<typeof medusa.store.product.list>[0])
    return ((res.products ?? [])[0] as unknown as MedusaProduct) ?? null
  } catch { return null }
}

export async function getCategories(): Promise<MedusaCategory[]> {
  try {
    const res = await medusa.store.category.list({ limit: 100 })
    return (res.product_categories ?? []) as unknown as MedusaCategory[]
  } catch { return [] }
}

export async function getCategory(handle: string): Promise<MedusaCategory | null> {
  try {
    const res = await medusa.store.category.list({ handle, limit: 1 } as Parameters<typeof medusa.store.category.list>[0])
    return ((res.product_categories ?? [])[0] as unknown as MedusaCategory) ?? null
  } catch { return null }
}

export async function searchProducts(query: string, limit = 20): Promise<MedusaProduct[]> {
  try {
    const res = await medusa.store.product.list({ q: query, limit, fields: defaultFields } as Parameters<typeof medusa.store.product.list>[0])
    return (res.products ?? []) as unknown as MedusaProduct[]
  } catch { return [] }
}

export function formatPrice(amount: number, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode.toUpperCase() }).format(amount / 100)
}
