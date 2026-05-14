/**
 * SEO helpers — generate Metadata objects for every page type.
 * Works with Next.js 14+ Metadata API.
 */

import type { Metadata } from 'next'
import type { MedusaProduct, MedusaCategory } from './medusa'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pes.supply'
const SITE_NAME = 'PES Supply'
const DEFAULT_DESCRIPTION =
  'Professional electrical supply — breakers, panels, wire, conduit and more. Fast shipping, trade pricing, bulk discounts.'

export function buildMetadata(
  overrides: Partial<Metadata> & { path?: string }
): Metadata {
  const { path = '/', ...rest } = overrides
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Professional Electrical Supply`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      siteName: SITE_NAME,
      type: 'website',
      url: `${SITE_URL}${path}`,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@pessupply',
    },
    ...rest,
  }
}

export function productMetadata(product: MedusaProduct): Metadata {
  const price = product.variants[0]?.calculated_price?.calculated_amount
  const currency = product.variants[0]?.calculated_price?.currency_code ?? 'USD'
  return buildMetadata({
    path: `/shop/products/${product.handle}`,
    title: product.title,
    description: product.description ?? DEFAULT_DESCRIPTION,
    openGraph: {
      title: product.title,
      description: product.description ?? DEFAULT_DESCRIPTION,
      type: 'website',
      images: product.thumbnail ? [{ url: product.thumbnail }] : undefined,
    },
    other: price
      ? {
          'product:price:amount': String(price / 100),
          'product:price:currency': currency.toUpperCase(),
        }
      : undefined,
  })
}

export function categoryMetadata(category: MedusaCategory): Metadata {
  return buildMetadata({
    path: `/shop/categories/${category.handle}`,
    title: category.name,
    description:
      category.description ??
      `Browse ${category.name} at PES Supply — professional pricing, fast shipping.`,
  })
}

/**
 * JSON-LD helpers
 */

export function productJsonLd(product: MedusaProduct) {
  const variant = product.variants[0]
  const price = variant?.calculated_price?.calculated_amount
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    sku: variant?.sku,
    offers: price
      ? {
          '@type': 'Offer',
          priceCurrency: (variant?.calculated_price?.currency_code ?? 'USD').toUpperCase(),
          price: (price / 100).toFixed(2),
          availability:
            (variant?.inventory_quantity ?? 0) > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          url: `${SITE_URL}/shop/products/${product.handle}`,
          seller: { '@type': 'Organization', name: SITE_NAME },
        }
      : undefined,
  }
}

export function breadcrumbJsonLd(
  crumbs: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: process.env.NEXT_PUBLIC_PHONE ?? '',
      contactType: 'customer service',
    },
    sameAs: [],
  }
}
