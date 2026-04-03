/**
 * Medusa Commerce Adapter
 * Implements CommerceProvider interface for Medusa 2.x Store API
 * 
 * Medusa uses REST API with optional JS SDK
 * Docs: https://docs.medusajs.com/api/store
 */

import type { CommerceProvider, MedusaConfig } from '../provider'
import type {
  CommerceProduct,
  CommerceCollection,
  CommerceCart,
  CommerceCartLine,
  CommerceVariant,
  CommerceImage,
  CommerceMoney,
  CommerceCustomer,
  CommerceAddress,
  CartLineInput,
  CartLineUpdateInput,
  ProductSearchParams,
  ProductSearchResult,
} from '../types'

// ============================================================================
// Configuration
// ============================================================================

let config: MedusaConfig | null = null

function getConfig(): MedusaConfig {
  if (!config) {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

    if (baseUrl) {
      config = {
        baseUrl: baseUrl.replace(/\/$/, ''),
        publishableKey,
        region: process.env.NEXT_PUBLIC_MEDUSA_REGION || 'us',
      }
    } else {
      throw new Error('Medusa backend URL not configured')
    }
  }
  return config
}

// ============================================================================
// HTTP Client
// ============================================================================

async function medusaFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cfg = getConfig()
  const url = `${cfg.baseUrl}${endpoint}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (cfg.publishableKey) {
    headers['x-publishable-api-key'] = cfg.publishableKey
  }

  const response = await fetch(url, {
    ...options,
    headers,
    cache: options.method === 'GET' ? 'no-store' : undefined,
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Medusa API error: ${response.status} - ${errorBody}`)
  }

  return response.json()
}

// ============================================================================
// Type Transformers
// ============================================================================

interface MedusaProduct {
  id: string
  handle: string
  title: string
  subtitle?: string
  description?: string
  thumbnail?: string
  status: string
  is_giftcard: boolean
  discountable: boolean
  images?: MedusaImage[]
  variants?: MedusaVariant[]
  options?: MedusaOption[]
  collection?: { id: string; handle: string; title: string }
  categories?: Array<{ id: string; name: string; handle: string }>
  tags?: Array<{ id: string; value: string }>
  type?: { id: string; value: string }
  created_at: string
  updated_at: string
  metadata?: Record<string, unknown>
}

interface MedusaVariant {
  id: string
  title: string
  sku?: string
  barcode?: string
  ean?: string
  upc?: string
  inventory_quantity: number
  allow_backorder: boolean
  manage_inventory: boolean
  prices?: MedusaPrice[]
  options?: Array<{ id: string; value: string; option_id: string }>
  calculated_price?: {
    calculated_amount: number
    original_amount: number
    currency_code: string
  }
  created_at: string
  updated_at: string
}

interface MedusaPrice {
  id: string
  currency_code: string
  amount: number
  min_quantity?: number
  max_quantity?: number
}

interface MedusaImage {
  id: string
  url: string
  alt_text?: string
  created_at: string
}

interface MedusaOption {
  id: string
  title: string
  values?: Array<{ id: string; value: string }>
}

interface MedusaCollection {
  id: string
  handle: string
  title: string
}

interface MedusaCart {
  id: string
  email?: string
  region_id: string
  currency_code: string
  items?: MedusaLineItem[]
  subtotal?: number
  tax_total?: number
  shipping_total?: number
  discount_total?: number
  total?: number
  payment_sessions?: Array<{ provider_id: string }>
  shipping_address?: MedusaAddress
  billing_address?: MedusaAddress
  discounts?: Array<{ code: string }>
  created_at: string
  updated_at: string
}

interface MedusaLineItem {
  id: string
  cart_id: string
  variant_id: string
  quantity: number
  unit_price: number
  subtotal?: number
  tax_total?: number
  total?: number
  variant?: MedusaVariant & { product?: MedusaProduct }
  title: string
  description?: string
  thumbnail?: string
}

interface MedusaAddress {
  id?: string
  first_name?: string
  last_name?: string
  company?: string
  address_1?: string
  address_2?: string
  city?: string
  province?: string
  postal_code?: string
  country_code?: string
  phone?: string
}

interface MedusaCustomer {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  has_account: boolean
  shipping_addresses?: MedusaAddress[]
  created_at: string
  updated_at: string
  metadata?: Record<string, unknown>
}

function transformMoney(amount: number, currencyCode: string): CommerceMoney {
  // Medusa stores amounts in cents
  return {
    amount: (amount / 100).toFixed(2),
    currencyCode: currencyCode.toUpperCase(),
  }
}

function transformImage(image: MedusaImage): CommerceImage {
  return {
    id: image.id,
    url: image.url,
    altText: image.alt_text,
  }
}

function transformVariant(variant: MedusaVariant, currencyCode: string = 'USD'): CommerceVariant {
  const price = variant.calculated_price
    ? transformMoney(variant.calculated_price.calculated_amount, variant.calculated_price.currency_code)
    : variant.prices?.[0]
      ? transformMoney(variant.prices[0].amount, variant.prices[0].currency_code)
      : { amount: '0', currencyCode }

  const compareAtPrice = variant.calculated_price && 
    variant.calculated_price.original_amount > variant.calculated_price.calculated_amount
      ? transformMoney(variant.calculated_price.original_amount, variant.calculated_price.currency_code)
      : undefined

  return {
    id: variant.id,
    title: variant.title,
    sku: variant.sku,
    barcode: variant.barcode || variant.ean || variant.upc,
    price,
    compareAtPrice,
    availableForSale: variant.inventory_quantity > 0 || variant.allow_backorder,
    quantityAvailable: variant.inventory_quantity,
    selectedOptions: variant.options?.map((o) => ({
      name: o.option_id,
      value: o.value,
    })) || [],
  }
}

function transformProduct(product: MedusaProduct, currencyCode: string = 'USD'): CommerceProduct {
  const variants = product.variants?.map((v) => transformVariant(v, currencyCode)) || []
  const prices = variants.map((v) => parseFloat(v.price.amount))
  const minPrice = Math.min(...prices) || 0
  const maxPrice = Math.max(...prices) || 0

  const images: CommerceImage[] = []
  if (product.thumbnail) {
    images.push({ url: product.thumbnail, altText: product.title })
  }
  if (product.images) {
    images.push(...product.images.map(transformImage))
  }

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description || product.subtitle || '',
    vendor: '', // Medusa doesn't have vendor by default
    productType: product.type?.value || '',
    tags: product.tags?.map((t) => t.value) || [],
    images,
    variants,
    options: product.options?.map((o) => ({
      id: o.id,
      name: o.title,
      values: o.values?.map((v) => v.value) || [],
    })) || [],
    priceRange: {
      minPrice: { amount: minPrice.toFixed(2), currencyCode },
      maxPrice: { amount: maxPrice.toFixed(2), currencyCode },
    },
    availableForSale: product.status === 'published' && variants.some((v) => v.availableForSale),
    createdAt: product.created_at,
    updatedAt: product.updated_at,
    metafields: product.metadata as Record<string, string | number | boolean> | undefined,
  }
}

function transformCollection(collection: MedusaCollection): CommerceCollection {
  return {
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
  }
}

function transformCartLine(item: MedusaLineItem, currencyCode: string): CommerceCartLine {
  return {
    id: item.id,
    quantity: item.quantity,
    merchandise: {
      id: item.variant_id,
      title: item.title,
      selectedOptions: item.variant?.options?.map((o) => ({
        name: o.option_id,
        value: o.value,
      })) || [],
      product: {
        id: item.variant?.product?.id || '',
        handle: item.variant?.product?.handle || '',
        title: item.variant?.product?.title || item.title,
        featuredImage: item.thumbnail ? { url: item.thumbnail } : undefined,
      },
    },
    cost: {
      totalAmount: transformMoney(item.total || item.subtotal || 0, currencyCode),
      amountPerQuantity: transformMoney(item.unit_price, currencyCode),
    },
  }
}

function transformCart(cart: MedusaCart): CommerceCart {
  const currencyCode = cart.currency_code.toUpperCase()
  return {
    id: cart.id,
    checkoutUrl: `/checkout?cart_id=${cart.id}`, // Medusa requires custom checkout
    lines: cart.items?.map((item) => transformCartLine(item, currencyCode)) || [],
    cost: {
      subtotalAmount: transformMoney(cart.subtotal || 0, currencyCode),
      totalAmount: transformMoney(cart.total || 0, currencyCode),
      totalTaxAmount: transformMoney(cart.tax_total || 0, currencyCode),
      totalShippingAmount: transformMoney(cart.shipping_total || 0, currencyCode),
    },
    totalQuantity: cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    buyerIdentity: cart.email ? { email: cart.email } : undefined,
    discountCodes: cart.discounts?.map((d) => ({ code: d.code, applicable: true })),
  }
}

function transformCustomer(customer: MedusaCustomer): CommerceCustomer {
  return {
    id: customer.id,
    email: customer.email,
    firstName: customer.first_name,
    lastName: customer.last_name,
    phone: customer.phone,
    acceptsMarketing: false, // Medusa handles this differently
    defaultAddress: customer.shipping_addresses?.[0] 
      ? transformAddress(customer.shipping_addresses[0])
      : undefined,
    addresses: customer.shipping_addresses?.map(transformAddress) || [],
    createdAt: customer.created_at,
    updatedAt: customer.updated_at,
    metafields: customer.metadata as Record<string, string | number | boolean> | undefined,
  }
}

function transformAddress(address: MedusaAddress): CommerceAddress {
  return {
    id: address.id,
    firstName: address.first_name,
    lastName: address.last_name,
    company: address.company,
    address1: address.address_1 || '',
    address2: address.address_2,
    city: address.city || '',
    province: address.province,
    country: address.country_code?.toUpperCase() || '',
    countryCode: address.country_code?.toUpperCase() || '',
    zip: address.postal_code || '',
    phone: address.phone,
  }
}

// ============================================================================
// Medusa Provider Implementation
// ============================================================================

export function createMedusaProvider(providerConfig?: MedusaConfig): CommerceProvider {
  if (providerConfig) {
    config = providerConfig
  }

  const regionId = config?.region || 'us'

  return {
    name: 'medusa',

    isConfigured(): boolean {
      try {
        getConfig()
        return true
      } catch {
        return false
      }
    },

    // ------------------------------------------------------------------------
    // Products
    // ------------------------------------------------------------------------

    async getProduct(handle: string): Promise<CommerceProduct | null> {
      try {
        const data = await medusaFetch<{ products: MedusaProduct[] }>(
          `/store/products?handle=${handle}&region_id=${regionId}&fields=*variants.calculated_price`
        )
        if (!data.products?.[0]) return null
        return transformProduct(data.products[0])
      } catch {
        return null
      }
    },

    async getProductById(id: string): Promise<CommerceProduct | null> {
      try {
        const data = await medusaFetch<{ product: MedusaProduct }>(
          `/store/products/${id}?region_id=${regionId}&fields=*variants.calculated_price`
        )
        return transformProduct(data.product)
      } catch {
        return null
      }
    },

    async getProducts(params?: ProductSearchParams): Promise<ProductSearchResult> {
      const queryParams = new URLSearchParams()
      queryParams.set('region_id', regionId)
      queryParams.set('fields', '*variants.calculated_price')
      
      if (params?.first) queryParams.set('limit', params.first.toString())
      if (params?.after) queryParams.set('offset', params.after)
      if (params?.query) queryParams.set('q', params.query)
      if (params?.collection) queryParams.set('collection_id', params.collection)
      if (params?.tags?.length) queryParams.set('tags', params.tags.join(','))

      // Sort mapping
      if (params?.sortKey) {
        switch (params.sortKey) {
          case 'title': queryParams.set('order', params.reverse ? '-title' : 'title'); break
          case 'created': queryParams.set('order', params.reverse ? '-created_at' : 'created_at'); break
          case 'price': queryParams.set('order', params.reverse ? '-variants.prices.amount' : 'variants.prices.amount'); break
        }
      }

      const data = await medusaFetch<{ products: MedusaProduct[]; count: number; offset: number; limit: number }>(
        `/store/products?${queryParams}`
      )

      return {
        products: data.products.map((p) => transformProduct(p)),
        pageInfo: {
          hasNextPage: data.offset + data.limit < data.count,
          hasPreviousPage: data.offset > 0,
          endCursor: (data.offset + data.limit).toString(),
        },
        totalCount: data.count,
      }
    },

    async searchProducts(query: string, limit = 10): Promise<CommerceProduct[]> {
      const result = await this.getProducts({ query, first: limit })
      return result.products
    },

    // ------------------------------------------------------------------------
    // Collections
    // ------------------------------------------------------------------------

    async getCollection(handle: string): Promise<CommerceCollection | null> {
      try {
        const data = await medusaFetch<{ collections: MedusaCollection[] }>(
          `/store/collections?handle=${handle}`
        )
        if (!data.collections?.[0]) return null
        return transformCollection(data.collections[0])
      } catch {
        return null
      }
    },

    async getCollections(limit = 100): Promise<CommerceCollection[]> {
      const data = await medusaFetch<{ collections: MedusaCollection[] }>(
        `/store/collections?limit=${limit}`
      )
      return data.collections.map(transformCollection)
    },

    async getCollectionProducts(handle: string, params?: ProductSearchParams): Promise<ProductSearchResult> {
      // First get collection ID
      const collection = await this.getCollection(handle)
      if (!collection) {
        return { products: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
      }
      return this.getProducts({ ...params, collection: collection.id })
    },

    // ------------------------------------------------------------------------
    // Cart
    // ------------------------------------------------------------------------

    async createCart(): Promise<CommerceCart> {
      const data = await medusaFetch<{ cart: MedusaCart }>('/store/carts', {
        method: 'POST',
        body: JSON.stringify({ region_id: regionId }),
      })
      return transformCart(data.cart)
    },

    async getCart(cartId: string): Promise<CommerceCart | null> {
      try {
        const data = await medusaFetch<{ cart: MedusaCart }>(`/store/carts/${cartId}`)
        return transformCart(data.cart)
      } catch {
        return null
      }
    },

    async addCartLines(cartId: string, lines: CartLineInput[]): Promise<CommerceCart> {
      // Medusa adds one item at a time
      let cart: MedusaCart | null = null
      for (const line of lines) {
        const data = await medusaFetch<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items`, {
          method: 'POST',
          body: JSON.stringify({
            variant_id: line.merchandiseId,
            quantity: line.quantity,
          }),
        })
        cart = data.cart
      }
      if (!cart) throw new Error('Failed to add items to cart')
      return transformCart(cart)
    },

    async updateCartLines(cartId: string, lines: CartLineUpdateInput[]): Promise<CommerceCart> {
      let cart: MedusaCart | null = null
      for (const line of lines) {
        const data = await medusaFetch<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items/${line.id}`, {
          method: 'POST',
          body: JSON.stringify({ quantity: line.quantity }),
        })
        cart = data.cart
      }
      if (!cart) throw new Error('Failed to update cart')
      return transformCart(cart)
    },

    async removeCartLines(cartId: string, lineIds: string[]): Promise<CommerceCart> {
      let cart: MedusaCart | null = null
      for (const lineId of lineIds) {
        const data = await medusaFetch<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items/${lineId}`, {
          method: 'DELETE',
        })
        cart = data.cart
      }
      if (!cart) throw new Error('Failed to remove items from cart')
      return transformCart(cart)
    },

    async applyDiscount(cartId: string, discountCode: string): Promise<CommerceCart> {
      const data = await medusaFetch<{ cart: MedusaCart }>(`/store/carts/${cartId}/discounts`, {
        method: 'POST',
        body: JSON.stringify({ code: discountCode }),
      })
      return transformCart(data.cart)
    },

    async removeDiscount(cartId: string, discountCode: string): Promise<CommerceCart> {
      const data = await medusaFetch<{ cart: MedusaCart }>(`/store/carts/${cartId}/discounts/${discountCode}`, {
        method: 'DELETE',
      })
      return transformCart(data.cart)
    },

    // ------------------------------------------------------------------------
    // Customers
    // ------------------------------------------------------------------------

    async createCustomer(input: {
      email: string
      password: string
      firstName?: string
      lastName?: string
      phone?: string
    }): Promise<CommerceCustomer> {
      const data = await medusaFetch<{ customer: MedusaCustomer }>('/store/customers', {
        method: 'POST',
        body: JSON.stringify({
          email: input.email,
          password: input.password,
          first_name: input.firstName,
          last_name: input.lastName,
          phone: input.phone,
        }),
      })
      return transformCustomer(data.customer)
    },

    async authenticateCustomer(email: string, password: string): Promise<{ customer: CommerceCustomer; accessToken: string }> {
      const data = await medusaFetch<{ customer: MedusaCustomer }>('/store/auth/token', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      // Medusa uses session-based auth, token is in cookie
      return {
        customer: transformCustomer(data.customer),
        accessToken: data.customer.id, // Use customer ID as token reference
      }
    },

    async getCustomer(accessToken: string): Promise<CommerceCustomer | null> {
      try {
        const data = await medusaFetch<{ customer: MedusaCustomer }>('/store/customers/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        return transformCustomer(data.customer)
      } catch {
        return null
      }
    },
  }
}

export default createMedusaProvider
