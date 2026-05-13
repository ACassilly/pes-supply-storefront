import { MetadataRoute } from 'next'

const BASE = 'https://pes.supply'

const STATIC_PAGES: Array<{
  url: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}> = [
  { url: '/', priority: 1.0, changeFrequency: 'daily' },
  { url: '/products', priority: 0.9, changeFrequency: 'daily' },
  { url: '/brands', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/departments', priority: 0.8, changeFrequency: 'weekly' },
  { url: '/deals', priority: 0.8, changeFrequency: 'daily' },
  { url: '/bulk', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/pro', priority: 0.7, changeFrequency: 'weekly' },
  { url: '/search', priority: 0.6, changeFrequency: 'daily' },
  { url: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  { url: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/contact', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/shipping', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/returns', priority: 0.5, changeFrequency: 'monthly' },
  { url: '/quote', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/powerlink', priority: 0.6, changeFrequency: 'monthly' },
  { url: '/careers', priority: 0.4, changeFrequency: 'monthly' },
  { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { url: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { url: '/accessibility', priority: 0.3, changeFrequency: 'yearly' },
]

async function fetchMedusaProducts(): Promise<Array<{ handle: string; updated_at: string }>> {
  const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  if (!medusaUrl || !pubKey) return []
  try {
    const res = await fetch(
      `${medusaUrl}/store/products?limit=500&fields=handle,updated_at`,
      { headers: { 'x-publishable-api-key': pubKey }, next: { revalidate: 3600 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.products ?? []
  } catch { return [] }
}

async function fetchMedusaCategories(): Promise<Array<{ handle: string; updated_at: string }>> {
  const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
  if (!medusaUrl || !pubKey) return []
  try {
    const res = await fetch(
      `${medusaUrl}/store/product-categories?limit=200&fields=handle,updated_at`,
      { headers: { 'x-publishable-api-key': pubKey }, next: { revalidate: 3600 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.product_categories ?? []
  } catch { return [] }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([
    fetchMedusaProducts(),
    fetchMedusaCategories(),
  ])

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${BASE}${p.url}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE}/products/${p.handle}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/categories/${c.handle}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  return [...staticEntries, ...categoryEntries, ...productEntries]
}
