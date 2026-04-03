/**
 * Unified Commerce Layer
 * 
 * This module provides a provider-agnostic interface for e-commerce operations.
 * It supports multiple backends: Shopify, Medusa, and Odoo 19.
 * 
 * Usage:
 *   import { commerce } from '@/lib/commerce'
 *   const product = await commerce.getProduct('my-product')
 */

import type { CommerceProvider, CommerceConfig } from './provider'

// Re-export types
export * from './types'
export * from './provider'

// ============================================================================
// Provider Registry
// ============================================================================

const providers: Map<string, CommerceProvider> = new Map()

let defaultProvider: CommerceProvider | null = null
let config: CommerceConfig | null = null

/**
 * Initialize the commerce layer with configuration
 */
export function initializeCommerce(commerceConfig: CommerceConfig): void {
  config = commerceConfig
}

/**
 * Register a commerce provider
 */
export function registerProvider(provider: CommerceProvider): void {
  providers.set(provider.name, provider)
  if (!defaultProvider) {
    defaultProvider = provider
  }
}

/**
 * Set the default provider
 */
export function setDefaultProvider(name: 'shopify' | 'medusa' | 'odoo'): void {
  const provider = providers.get(name)
  if (!provider) {
    throw new Error(`Provider "${name}" is not registered`)
  }
  defaultProvider = provider
}

/**
 * Get a specific provider by name
 */
export function getProvider(name: 'shopify' | 'medusa' | 'odoo'): CommerceProvider | undefined {
  return providers.get(name)
}

/**
 * Get the current configuration
 */
export function getConfig(): CommerceConfig | null {
  return config
}

// ============================================================================
// Commerce API Facade
// ============================================================================

/**
 * Main commerce API object
 * Uses the default provider for all operations
 */
export const commerce = {
  // --------------------------------------------------------------------------
  // Products
  // --------------------------------------------------------------------------

  async getProduct(handle: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.getProduct(handle)
  },

  async getProductById(id: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.getProductById(id)
  },

  async getProducts(params?: Parameters<CommerceProvider['getProducts']>[0]) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.getProducts(params)
  },

  async searchProducts(query: string, limit?: number) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.searchProducts(query, limit)
  },

  async getProductRecommendations(productId: string, limit?: number) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.getProductRecommendations) {
      return []
    }
    return defaultProvider.getProductRecommendations(productId, limit)
  },

  // --------------------------------------------------------------------------
  // Collections
  // --------------------------------------------------------------------------

  async getCollection(handle: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.getCollection(handle)
  },

  async getCollections(limit?: number) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.getCollections(limit)
  },

  async getCollectionProducts(handle: string, params?: Parameters<CommerceProvider['getCollectionProducts']>[1]) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.getCollectionProducts(handle, params)
  },

  // --------------------------------------------------------------------------
  // Cart
  // --------------------------------------------------------------------------

  async createCart() {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.createCart()
  },

  async getCart(cartId: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.getCart(cartId)
  },

  async addCartLines(cartId: string, lines: Parameters<CommerceProvider['addCartLines']>[1]) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.addCartLines(cartId, lines)
  },

  async updateCartLines(cartId: string, lines: Parameters<CommerceProvider['updateCartLines']>[1]) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.updateCartLines(cartId, lines)
  },

  async removeCartLines(cartId: string, lineIds: string[]) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    return defaultProvider.removeCartLines(cartId, lineIds)
  },

  async applyDiscount(cartId: string, discountCode: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.applyDiscount) {
      throw new Error('Discount codes not supported by current provider')
    }
    return defaultProvider.applyDiscount(cartId, discountCode)
  },

  async removeDiscount(cartId: string, discountCode: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.removeDiscount) {
      throw new Error('Discount codes not supported by current provider')
    }
    return defaultProvider.removeDiscount(cartId, discountCode)
  },

  // --------------------------------------------------------------------------
  // Customers
  // --------------------------------------------------------------------------

  async createCustomer(input: Parameters<NonNullable<CommerceProvider['createCustomer']>>[0]) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.createCustomer) {
      throw new Error('Customer registration not supported by current provider')
    }
    return defaultProvider.createCustomer(input)
  },

  async authenticateCustomer(email: string, password: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.authenticateCustomer) {
      throw new Error('Customer authentication not supported by current provider')
    }
    return defaultProvider.authenticateCustomer(email, password)
  },

  async getCustomer(accessToken: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.getCustomer) {
      throw new Error('Customer retrieval not supported by current provider')
    }
    return defaultProvider.getCustomer(accessToken)
  },

  // --------------------------------------------------------------------------
  // Orders
  // --------------------------------------------------------------------------

  async getCustomerOrders(customerId: string, limit?: number) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.getCustomerOrders) {
      throw new Error('Order retrieval not supported by current provider')
    }
    return defaultProvider.getCustomerOrders(customerId, limit)
  },

  async getOrder(orderId: string) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.getOrder) {
      throw new Error('Order retrieval not supported by current provider')
    }
    return defaultProvider.getOrder(orderId)
  },

  // --------------------------------------------------------------------------
  // Inventory (for Odoo sync)
  // --------------------------------------------------------------------------

  async getInventoryLevels(variantIds: string[]) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.getInventoryLevels) {
      return []
    }
    return defaultProvider.getInventoryLevels(variantIds)
  },

  async syncInventory(levels: Parameters<NonNullable<CommerceProvider['syncInventory']>>[0]) {
    if (!defaultProvider) throw new Error('No commerce provider configured')
    if (!defaultProvider.syncInventory) {
      throw new Error('Inventory sync not supported by current provider')
    }
    return defaultProvider.syncInventory(levels)
  },

  // --------------------------------------------------------------------------
  // Provider Info
  // --------------------------------------------------------------------------

  get providerName() {
    return defaultProvider?.name ?? null
  },

  isConfigured() {
    return defaultProvider?.isConfigured() ?? false
  },
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format price for display
 */
export function formatPrice(amount: string | number, currencyCode: string = 'USD'): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(numericAmount)
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(price: string | number, compareAtPrice: string | number): number {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price
  const compareNum = typeof compareAtPrice === 'string' ? parseFloat(compareAtPrice) : compareAtPrice
  if (compareNum <= priceNum) return 0
  return Math.round(((compareNum - priceNum) / compareNum) * 100)
}
