/**
 * Unified Commerce Types
 * Provider-agnostic types for products, cart, orders, and customers
 */

// ============================================================================
// Product Types
// ============================================================================

export interface CommerceProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml?: string
  vendor: string
  productType: string
  tags: string[]
  images: CommerceImage[]
  variants: CommerceVariant[]
  options: CommerceOption[]
  priceRange: {
    minPrice: CommerceMoney
    maxPrice: CommerceMoney
  }
  compareAtPriceRange?: {
    minPrice: CommerceMoney
    maxPrice: CommerceMoney
  }
  availableForSale: boolean
  totalInventory?: number
  createdAt: string
  updatedAt: string
  metafields?: Record<string, string | number | boolean>
  seo?: {
    title?: string
    description?: string
  }
}

export interface CommerceVariant {
  id: string
  title: string
  sku?: string
  barcode?: string
  price: CommerceMoney
  compareAtPrice?: CommerceMoney
  availableForSale: boolean
  quantityAvailable?: number
  selectedOptions: { name: string; value: string }[]
  image?: CommerceImage
  weight?: number
  weightUnit?: string
}

export interface CommerceOption {
  id: string
  name: string
  values: string[]
}

export interface CommerceImage {
  id?: string
  url: string
  altText?: string
  width?: number
  height?: number
}

export interface CommerceMoney {
  amount: string
  currencyCode: string
}

export interface CommerceCollection {
  id: string
  handle: string
  title: string
  description?: string
  descriptionHtml?: string
  image?: CommerceImage
  products?: CommerceProduct[]
  seo?: {
    title?: string
    description?: string
  }
}

// ============================================================================
// Cart Types
// ============================================================================

export interface CommerceCart {
  id: string
  checkoutUrl: string
  lines: CommerceCartLine[]
  cost: {
    subtotalAmount: CommerceMoney
    totalAmount: CommerceMoney
    totalTaxAmount?: CommerceMoney
    totalShippingAmount?: CommerceMoney
  }
  totalQuantity: number
  buyerIdentity?: {
    email?: string
    phone?: string
    customerId?: string
  }
  discountCodes?: { code: string; applicable: boolean }[]
  note?: string
  attributes?: { key: string; value: string }[]
  createdAt?: string
  updatedAt?: string
}

export interface CommerceCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: { name: string; value: string }[]
    product: {
      id: string
      handle: string
      title: string
      featuredImage?: CommerceImage
    }
  }
  cost: {
    totalAmount: CommerceMoney
    amountPerQuantity: CommerceMoney
    compareAtAmountPerQuantity?: CommerceMoney
  }
  attributes?: { key: string; value: string }[]
}

export interface CartLineInput {
  merchandiseId: string
  quantity: number
  attributes?: { key: string; value: string }[]
}

export interface CartLineUpdateInput {
  id: string
  quantity: number
  attributes?: { key: string; value: string }[]
}

// ============================================================================
// Order Types
// ============================================================================

export interface CommerceOrder {
  id: string
  orderNumber: string
  email: string
  phone?: string
  financialStatus: 'pending' | 'authorized' | 'paid' | 'partially_paid' | 'refunded' | 'voided'
  fulfillmentStatus: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled' | 'restocked'
  processedAt: string
  subtotalPrice: CommerceMoney
  totalShippingPrice: CommerceMoney
  totalTax: CommerceMoney
  totalPrice: CommerceMoney
  currencyCode: string
  lineItems: CommerceOrderLineItem[]
  shippingAddress?: CommerceAddress
  billingAddress?: CommerceAddress
  customer?: CommerceCustomer
  note?: string
  tags?: string[]
  fulfillments?: CommerceFulfillment[]
}

export interface CommerceOrderLineItem {
  id: string
  title: string
  variantTitle?: string
  sku?: string
  quantity: number
  price: CommerceMoney
  totalDiscount?: CommerceMoney
  image?: CommerceImage
  variantId?: string
  productId?: string
}

export interface CommerceFulfillment {
  id: string
  status: 'pending' | 'open' | 'success' | 'cancelled' | 'error' | 'failure'
  trackingCompany?: string
  trackingNumber?: string
  trackingUrl?: string
  createdAt: string
  updatedAt: string
  lineItems: { lineItemId: string; quantity: number }[]
}

// ============================================================================
// Customer Types
// ============================================================================

export interface CommerceCustomer {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  acceptsMarketing: boolean
  defaultAddress?: CommerceAddress
  addresses: CommerceAddress[]
  orders?: CommerceOrder[]
  tags?: string[]
  note?: string
  createdAt: string
  updatedAt: string
  metafields?: Record<string, string | number | boolean>
}

export interface CommerceAddress {
  id?: string
  firstName?: string
  lastName?: string
  company?: string
  address1: string
  address2?: string
  city: string
  province?: string
  provinceCode?: string
  country: string
  countryCode: string
  zip: string
  phone?: string
  default?: boolean
}

// ============================================================================
// Search & Filter Types
// ============================================================================

export interface ProductSearchParams {
  query?: string
  collection?: string
  vendor?: string
  productType?: string
  tags?: string[]
  minPrice?: number
  maxPrice?: number
  available?: boolean
  sortKey?: 'title' | 'price' | 'best_selling' | 'created' | 'relevance'
  reverse?: boolean
  first?: number
  after?: string
}

export interface ProductSearchResult {
  products: CommerceProduct[]
  pageInfo: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor?: string
    endCursor?: string
  }
  totalCount?: number
}

// ============================================================================
// Inventory Types (for Odoo sync)
// ============================================================================

export interface InventoryLevel {
  variantId: string
  sku?: string
  locationId: string
  available: number
  incoming?: number
  reserved?: number
  updatedAt: string
}

export interface InventoryAdjustment {
  variantId: string
  locationId: string
  availableDelta: number
  reason?: string
}

// ============================================================================
// Webhook Event Types
// ============================================================================

export type WebhookEventType =
  | 'product.created'
  | 'product.updated'
  | 'product.deleted'
  | 'order.created'
  | 'order.updated'
  | 'order.fulfilled'
  | 'order.cancelled'
  | 'inventory.updated'
  | 'customer.created'
  | 'customer.updated'

export interface WebhookEvent<T = unknown> {
  id: string
  type: WebhookEventType
  createdAt: string
  data: T
  source: 'shopify' | 'medusa' | 'odoo'
}
