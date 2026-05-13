import { NextResponse } from 'next/server'

/**
 * GET /api/google-merchant-feed
 * Generates a Google Merchant Center RSS 2.0 product feed from the Medusa catalog.
 * Register this URL in Google Merchant Center as a scheduled fetch feed:
 *   https://pes.supply/api/google-merchant-feed
 * Cloudflare Page Rule: bypass cache for /api/*
 */
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pes.supply'
  const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  const pubKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

  if (!medusaUrl || !pubKey) {
    return NextResponse.json({ error: 'Medusa not configured' }, { status: 503 })
  }

  let products: ProductEntry[] = []
  try {
    const res = await fetch(
      `${medusaUrl}/store/products?limit=250&fields=id,title,description,handle,thumbnail,variants,categories`,
      {
        headers: { 'x-publishable-api-key': pubKey, 'Content-Type': 'application/json' },
        next: { revalidate: 3600 },
      },
    )
    if (!res.ok) throw new Error(`Medusa responded ${res.status}`)
    const data = await res.json()
    products = (data.products ?? []) as ProductEntry[]
  } catch (e) {
    console.error('[google-merchant-feed] Failed to fetch products:', e)
    return NextResponse.json({ error: 'Failed to fetch products from Medusa' }, { status: 502 })
  }

  const items = products
    .map((p) => {
      const variant = p.variants?.[0]
      const price = variant?.prices?.find((pr: PriceEntry) => pr.currency_code === 'usd')
      if (!price) return null
      const priceFormatted = (price.amount / 100).toFixed(2)
      const availability = (variant?.inventory_quantity ?? 0) > 0 ? 'in stock' : 'out of stock'
      const imageUrl = p.thumbnail ?? `${siteUrl}/images/pes-logo.png`
      return [
        `<item>`,
        `  <g:id>${escapeXml(p.id)}</g:id>`,
        `  <g:title>${escapeXml(p.title)}</g:title>`,
        `  <g:description>${escapeXml(p.description ?? p.title)}</g:description>`,
        `  <g:link>${siteUrl}/products/${escapeXml(p.handle)}</g:link>`,
        `  <g:image_link>${escapeXml(imageUrl)}</g:image_link>`,
        `  <g:condition>new</g:condition>`,
        `  <g:availability>${availability}</g:availability>`,
        `  <g:price>${priceFormatted} USD</g:price>`,
        `  <g:brand>PES Supply</g:brand>`,
        `  <g:google_product_category>Electrical Equipment</g:google_product_category>`,
        `</item>`,
      ].join('\n')
    })
    .filter(Boolean)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>PES Supply Product Feed</title>
    <link>${siteUrl}</link>
    <description>PES Supply — 169 brands, 500+ vendors, 40,000+ products</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

interface PriceEntry { currency_code: string; amount: number }
interface ProductEntry {
  id: string
  title: string
  description?: string
  handle: string
  thumbnail?: string
  variants?: Array<{ inventory_quantity?: number; prices?: PriceEntry[] }>
  categories?: Array<{ name: string }>
}
