/**
 * Commerce Provider Interface
 * Abstract interface that all commerce adapters must implement
 */

import type {
  CommerceProduct,
  CommerceCollection,
  CommerceCart,
  CommerceOrder,
  CommerceCustomer,
  CommerceAddress,
  CartLineInput,
  CartLineUpdateInput,
  ProductSearchParams,
  ProductSearchResult,
  InventoryLevel,
  InventoryAdjustment,
} from './types'

// ============================================================================
// Provider Interface
// ============================================================================

export interface CommerceProvider {
  /**
   * Provider identifier
   */
  readonly name: 'shopify' | 'medusa' | 'odoo'

  /**
   * Check if provider is properly configured
   */
  isConfigured(): boolean

  // --------------------------------------------------------------------------
  // Products
  // --------------------------------------------------------------------------

  /**
   * Get a single product by handle/slug
   */
  getProduct(handle: string): Promise<CommerceProduct | null>

  /**
   * Get a single product by ID
   */
  getProductById(id: string): Promise<CommerceProduct | null>

  /**
   * Get multiple products with optional filtering
   */
  getProducts(params?: ProductSearchParams): Promise<ProductSearchResult>

  /**
   * Search products by query string
   */
  searchProducts(query: string, limit?: number): Promise<CommerceProduct[]>

  /**
   * Get product recommendations for a given product
   */
  getProductRecommendations?(productId: string, limit?: number): Promise<CommerceProduct[]>

  // --------------------------------------------------------------------------
  // Collections
  // --------------------------------------------------------------------------

  /**
   * Get a collection by handle/slug
   */
  getCollection(handle: string): Promise<CommerceCollection | null>

  /**
   * Get all collections
   */
  getCollections(limit?: number): Promise<CommerceCollection[]>

  /**
   * Get products in a collection
   */
  getCollectionProducts(handle: string, params?: ProductSearchParams): Promise<ProductSearchResult>

  // --------------------------------------------------------------------------
  // Cart
  // --------------------------------------------------------------------------

  /**
   * Create a new cart
   */
  createCart(): Promise<CommerceCart>

  /**
   * Get an existing cart by ID
   */
  getCart(cartId: string): Promise<CommerceCart | null>

  /**
   * Add items to cart
   */
  addCartLines(cartId: string, lines: CartLineInput[]): Promise<CommerceCart>

  /**
   * Update cart line quantities
   */
  updateCartLines(cartId: string, lines: CartLineUpdateInput[]): Promise<CommerceCart>

  /**
   * Remove items from cart
   */
  removeCartLines(cartId: string, lineIds: string[]): Promise<CommerceCart>

  /**
   * Apply a discount code to cart
   */
  applyDiscount?(cartId: string, discountCode: string): Promise<CommerceCart>

  /**
   * Remove a discount code from cart
   */
  removeDiscount?(cartId: string, discountCode: string): Promise<CommerceCart>

  /**
   * Update cart buyer identity (email, etc.)
   */
  updateCartBuyerIdentity?(cartId: string, buyerIdentity: { email?: string; phone?: string }): Promise<CommerceCart>

  // --------------------------------------------------------------------------
  // Orders (optional - not all providers support storefront order access)
  // --------------------------------------------------------------------------

  /**
   * Get customer orders (requires authentication)
   */
  getCustomerOrders?(customerId: string, limit?: number): Promise<CommerceOrder[]>

  /**
   * Get a single order by ID
   */
  getOrder?(orderId: string): Promise<CommerceOrder | null>

  // --------------------------------------------------------------------------
  // Customers (optional)
  // --------------------------------------------------------------------------

  /**
   * Create a customer account
   */
  createCustomer?(input: {
    email: string
    password: string
    firstName?: string
    lastName?: string
    phone?: string
    acceptsMarketing?: boolean
  }): Promise<CommerceCustomer>

  /**
   * Authenticate customer and get access token
   */
  authenticateCustomer?(email: string, password: string): Promise<{ customer: CommerceCustomer; accessToken: string }>

  /**
   * Get customer by access token
   */
  getCustomer?(accessToken: string): Promise<CommerceCustomer | null>

  /**
   * Update customer profile
   */
  updateCustomer?(accessToken: string, input: Partial<CommerceCustomer>): Promise<CommerceCustomer>

  /**
   * Add customer address
   */
  addCustomerAddress?(accessToken: string, address: CommerceAddress): Promise<CommerceAddress>

  /**
   * Update customer address
   */
  updateCustomerAddress?(accessToken: string, addressId: string, address: Partial<CommerceAddress>): Promise<CommerceAddress>

  /**
   * Delete customer address
   */
  deleteCustomerAddress?(accessToken: string, addressId: string): Promise<boolean>

  // --------------------------------------------------------------------------
  // Inventory (primarily for Odoo integration)
  // --------------------------------------------------------------------------

  /**
   * Get inventory levels for variants
   */
  getInventoryLevels?(variantIds: string[]): Promise<InventoryLevel[]>

  /**
   * Adjust inventory (for Odoo sync)
   */
  adjustInventory?(adjustments: InventoryAdjustment[]): Promise<boolean>

  /**
   * Sync inventory from external source
   */
  syncInventory?(levels: InventoryLevel[]): Promise<boolean>
}

// ============================================================================
// Provider Configuration
// ============================================================================

export interface ShopifyConfig {
  storeDomain: string
  storefrontAccessToken: string
  apiVersion?: string
}

export interface MedusaConfig {
  baseUrl: string
  publishableKey?: string
  region?: string
}

export interface OdooConfig {
  url: string
  database: string
  username: string
  apiKey: string
}

export interface CommerceConfig {
  provider: 'shopify' | 'medusa' | 'odoo'
  shopify?: ShopifyConfig
  medusa?: MedusaConfig
  odoo?: OdooConfig
  features?: {
    useOdooInventory?: boolean
    useOdooOrders?: boolean
    syncToOdoo?: boolean
  }
}

// ============================================================================
// Provider Factory Type
// ============================================================================

export type CommerceProviderFactory = (config: CommerceConfig) => CommerceProvider
