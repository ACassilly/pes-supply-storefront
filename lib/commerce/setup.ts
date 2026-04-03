/**
 * Commerce Provider Setup
 * 
 * Initializes the commerce layer based on environment configuration.
 * Call this once at application startup.
 */

import { registerProvider, setDefaultProvider, initializeCommerce } from './index'
import type { CommerceConfig } from './provider'
import { createShopifyProvider } from './adapters/shopify'
import { createMedusaProvider } from './adapters/medusa'
import { createOdooProvider } from './adapters/odoo'

// ============================================================================
// Environment Detection
// ============================================================================

function detectProvider(): 'shopify' | 'medusa' | 'odoo' {
  // Check for explicit provider setting
  const explicitProvider = process.env.COMMERCE_PROVIDER as 'shopify' | 'medusa' | 'odoo' | undefined
  if (explicitProvider) return explicitProvider

  // Auto-detect based on available environment variables
  if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) return 'medusa'
  if (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) return 'shopify'
  if (process.env.ODOO_URL) return 'odoo'

  // Default to Shopify for backward compatibility
  return 'shopify'
}

function buildConfig(): CommerceConfig {
  const provider = detectProvider()

  const config: CommerceConfig = {
    provider,
    features: {
      useOdooInventory: process.env.USE_ODOO_INVENTORY === 'true',
      useOdooOrders: process.env.USE_ODOO_ORDERS === 'true',
      syncToOdoo: process.env.SYNC_TO_ODOO === 'true',
    },
  }

  // Shopify config
  if (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
    config.shopify = {
      storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
      storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
      apiVersion: process.env.SHOPIFY_API_VERSION || '2024-10',
    }
  }

  // Medusa config
  if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
    config.medusa = {
      baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
      publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
      region: process.env.NEXT_PUBLIC_MEDUSA_REGION || 'us',
    }
  }

  // Odoo config
  if (process.env.ODOO_URL && process.env.ODOO_DATABASE && process.env.ODOO_USERNAME && process.env.ODOO_API_KEY) {
    config.odoo = {
      url: process.env.ODOO_URL,
      database: process.env.ODOO_DATABASE,
      username: process.env.ODOO_USERNAME,
      apiKey: process.env.ODOO_API_KEY,
    }
  }

  return config
}

// ============================================================================
// Setup Function
// ============================================================================

let isInitialized = false

/**
 * Initialize the commerce layer
 * 
 * This function:
 * 1. Detects the primary commerce provider from environment
 * 2. Registers all configured providers
 * 3. Sets the default provider
 * 
 * Call this once, typically in your app's initialization.
 */
export function setupCommerce(): void {
  if (isInitialized) return
  isInitialized = true

  const config = buildConfig()
  initializeCommerce(config)

  // Register Shopify if configured
  if (config.shopify) {
    try {
      const shopify = createShopifyProvider(config.shopify)
      registerProvider(shopify)
      console.log('[Commerce] Shopify provider registered')
    } catch (error) {
      console.warn('[Commerce] Failed to register Shopify provider:', error)
    }
  }

  // Register Medusa if configured
  if (config.medusa) {
    try {
      const medusa = createMedusaProvider(config.medusa)
      registerProvider(medusa)
      console.log('[Commerce] Medusa provider registered')
    } catch (error) {
      console.warn('[Commerce] Failed to register Medusa provider:', error)
    }
  }

  // Register Odoo if configured
  if (config.odoo) {
    try {
      const odoo = createOdooProvider(config.odoo)
      registerProvider(odoo)
      console.log('[Commerce] Odoo provider registered')
    } catch (error) {
      console.warn('[Commerce] Failed to register Odoo provider:', error)
    }
  }

  // Set default provider
  try {
    setDefaultProvider(config.provider)
    console.log(`[Commerce] Default provider set to: ${config.provider}`)
  } catch (error) {
    console.error('[Commerce] Failed to set default provider:', error)
  }
}

/**
 * Get the current commerce configuration
 */
export function getCommerceConfig(): CommerceConfig {
  return buildConfig()
}

/**
 * Check if a specific provider is available
 */
export function isProviderAvailable(provider: 'shopify' | 'medusa' | 'odoo'): boolean {
  const config = buildConfig()
  switch (provider) {
    case 'shopify': return !!config.shopify
    case 'medusa': return !!config.medusa
    case 'odoo': return !!config.odoo
    default: return false
  }
}
