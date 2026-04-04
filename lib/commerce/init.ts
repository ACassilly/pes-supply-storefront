/**
 * Commerce Layer Initialization
 * Import this file once in the app root to bootstrap all providers.
 * This is a server-side module - call setupCommerce() at app startup.
 */
import { setupCommerce } from './setup'
import { commerce, getProvider } from './index'
import type { CommerceProduct } from './types'

// Initialize on first import (module-level side effect)
setupCommerce()

// Re-export the commerce facade for convenience
export { commerce, getProvider }
export type { CommerceProduct }

/**
 * Get products from ALL configured providers (multi-source)
 * Merges results from Shopify + Odoo, deduplicating by SKU
 */
export async function getMultiProviderProducts(
  params?: { query?: string; limit?: number }
): Promise<CommerceProduct[]> {
  const results: CommerceProduct[] = []
  const seenSKUs = new Set<string>()

  // Query default provider first (Shopify)
  try {
    if (params?.query) {
      const shopifyResults = await commerce.searchProducts(params.query, params.limit || 20)
      for (const p of shopifyResults) {
        const sku = p.variants?.[0]?.sku || p.id
        if (!seenSKUs.has(sku)) {
          seenSKUs.add(sku)
          results.push({ ...p, vendor: p.vendor || 'shopify' })
        }
      }
    } else {
      const shopifyResult = await commerce.getProducts({ first: params?.limit || 20 })
      for (const p of shopifyResult.products) {
        const sku = p.variants?.[0]?.sku || p.id
        if (!seenSKUs.has(sku)) {
          seenSKUs.add(sku)
          results.push({ ...p, vendor: p.vendor || 'shopify' })
        }
      }
    }
  } catch (err) {
    console.error('[Commerce] Shopify query failed:', err)
  }

  // Query Odoo if registered
  const odoo = getProvider('odoo')
  if (odoo?.isConfigured()) {
    try {
      if (params?.query) {
        const odooResults = await odoo.searchProducts(params.query, params.limit || 20)
        for (const p of odooResults) {
          const sku = p.variants?.[0]?.sku || p.id
          if (!seenSKUs.has(sku)) {
            seenSKUs.add(sku)
            results.push({ ...p, vendor: 'odoo' })
          }
        }
      } else {
        const odooResult = await odoo.getProducts({ first: params?.limit || 20 })
        for (const p of odooResult.products) {
          const sku = p.variants?.[0]?.sku || p.id
          if (!seenSKUs.has(sku)) {
            seenSKUs.add(sku)
            results.push({ ...p, vendor: 'odoo' })
          }
        }
      }
    } catch (err) {
      console.error('[Commerce] Odoo query failed:', err)
    }
  }

  // Query Medusa if registered
  const medusa = getProvider('medusa')
  if (medusa?.isConfigured()) {
    try {
      if (params?.query) {
        const medusaResults = await medusa.searchProducts(params.query, params.limit || 20)
        for (const p of medusaResults) {
          const sku = p.variants?.[0]?.sku || p.id
          if (!seenSKUs.has(sku)) {
            seenSKUs.add(sku)
            results.push({ ...p, vendor: 'medusa' })
          }
        }
      } else {
        const medusaResult = await medusa.getProducts({ first: params?.limit || 20 })
        for (const p of medusaResult.products) {
          const sku = p.variants?.[0]?.sku || p.id
          if (!seenSKUs.has(sku)) {
            seenSKUs.add(sku)
            results.push({ ...p, vendor: 'medusa' })
          }
        }
      }
    } catch (err) {
      console.error('[Commerce] Medusa query failed:', err)
    }
  }

  return results
}

/**
 * Get Odoo inventory levels for product variant IDs
 * Used as an overlay on Shopify products for real-time B2B stock
 */
export async function getOdooInventory(variantIds: string[]) {
  const odoo = getProvider('odoo')
  if (!odoo?.isConfigured() || !odoo.getInventoryLevels) return []
  try {
    return await odoo.getInventoryLevels(variantIds)
  } catch (err) {
    console.error('[Commerce] Odoo inventory query failed:', err)
    return []
  }
}

/**
 * Sync an order to Odoo after checkout
 */
export async function syncOrderToOdoo(order: {
  customerId: string
  lines: { merchandiseId: string; quantity: number }[]
}) {
  const odoo = getProvider('odoo')
  if (!odoo?.isConfigured()) return null
  try {
    const cart = await odoo.createCart()
    await odoo.addCartLines(cart.id, order.lines)
    return cart
  } catch (err) {
    console.error('[Commerce] Odoo order sync failed:', err)
    return null
  }
}
