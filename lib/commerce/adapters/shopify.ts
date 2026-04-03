/**
 * Shopify Commerce Adapter
 * Implements CommerceProvider interface for Shopify Storefront API
 */

import type {
  CommerceProvider,
  ShopifyConfig,
} from '../provider'
import type {
  CommerceProduct,
  CommerceCollection,
  CommerceCart,
  CommerceCartLine,
  CommerceVariant,
  CommerceImage,
  CommerceMoney,
  CartLineInput,
  CartLineUpdateInput,
  ProductSearchParams,
  ProductSearchResult,
} from '../types'

// ============================================================================
// Configuration
// ============================================================================

let config: ShopifyConfig | null = null

function getConfig(): ShopifyConfig {
  if (!config) {
    // Try to get from environment
    const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

    if (storeDomain) {
      config = {
        storeDomain: parseShopifyDomain(storeDomain),
        storefrontAccessToken: accessToken || '',
        apiVersion: '2024-10',
      }
    } else {
      throw new Error('Shopify store domain not configured')
    }
  }
  return config
}

function parseShopifyDomain(domain: string): string {
  let parsed = domain.trim()
  parsed = parsed.replace(/^(https?:\/\/)?/, '')
  parsed = parsed.replace(/\/$/, '')
  if (!parsed.includes('.myshopify.com')) {
    parsed = `${parsed}.myshopify.com`
  }
  return parsed
}

function getApiUrl(): string {
  const cfg = getConfig()
  return `https://${cfg.storeDomain}/api/${cfg.apiVersion || '2024-10'}/graphql.json`
}

// ============================================================================
// GraphQL Fetch
// ============================================================================

async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, unknown>
}): Promise<T> {
  const cfg = getConfig()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (cfg.storefrontAccessToken) {
    headers['X-Shopify-Storefront-Access-Token'] = cfg.storefrontAccessToken
  }

  const response = await fetch(getApiUrl(), {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Shopify API error: ${response.status} - ${errorBody}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}

// ============================================================================
// Type Transformers
// ============================================================================

interface ShopifyMoney {
  amount: string
  currencyCode: string
}

interface ShopifyImage {
  url: string
  altText?: string | null
  width?: number
  height?: number
}

interface ShopifyVariant {
  id: string
  title: string
  sku?: string
  barcode?: string
  price: ShopifyMoney
  compareAtPrice?: ShopifyMoney | null
  availableForSale: boolean
  quantityAvailable?: number
  selectedOptions: { name: string; value: string }[]
  image?: ShopifyImage | null
}

interface ShopifyProductNode {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml?: string
  vendor: string
  productType: string
  tags: string[]
  availableForSale: boolean
  totalInventory?: number
  createdAt: string
  updatedAt: string
  images: { edges: Array<{ node: ShopifyImage }> }
  variants: { edges: Array<{ node: ShopifyVariant }> }
  options: Array<{ id: string; name: string; values: string[] }>
  priceRange: {
    minVariantPrice: ShopifyMoney
    maxVariantPrice: ShopifyMoney
  }
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney
    maxVariantPrice: ShopifyMoney
  }
  seo?: {
    title?: string | null
    description?: string | null
  }
}

function transformMoney(money: ShopifyMoney): CommerceMoney {
  return {
    amount: money.amount,
    currencyCode: money.currencyCode,
  }
}

function transformImage(image: ShopifyImage): CommerceImage {
  return {
    url: image.url,
    altText: image.altText || undefined,
    width: image.width,
    height: image.height,
  }
}

function transformVariant(variant: ShopifyVariant): CommerceVariant {
  return {
    id: variant.id,
    title: variant.title,
    sku: variant.sku,
    barcode: variant.barcode,
    price: transformMoney(variant.price),
    compareAtPrice: variant.compareAtPrice ? transformMoney(variant.compareAtPrice) : undefined,
    availableForSale: variant.availableForSale,
    quantityAvailable: variant.quantityAvailable,
    selectedOptions: variant.selectedOptions,
    image: variant.image ? transformImage(variant.image) : undefined,
  }
}

function transformProduct(product: ShopifyProductNode): CommerceProduct {
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    vendor: product.vendor,
    productType: product.productType,
    tags: product.tags || [],
    images: product.images.edges.map((e) => transformImage(e.node)),
    variants: product.variants.edges.map((e) => transformVariant(e.node)),
    options: product.options.map((o) => ({
      id: o.id,
      name: o.name,
      values: o.values,
    })),
    priceRange: {
      minPrice: transformMoney(product.priceRange.minVariantPrice),
      maxPrice: transformMoney(product.priceRange.maxVariantPrice),
    },
    compareAtPriceRange: product.compareAtPriceRange ? {
      minPrice: transformMoney(product.compareAtPriceRange.minVariantPrice),
      maxPrice: transformMoney(product.compareAtPriceRange.maxVariantPrice),
    } : undefined,
    availableForSale: product.availableForSale,
    totalInventory: product.totalInventory,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    seo: product.seo ? {
      title: product.seo.title || undefined,
      description: product.seo.description || undefined,
    } : undefined,
  }
}

interface ShopifyCartLine {
  id: string
  quantity: number
  cost: {
    totalAmount: ShopifyMoney
    amountPerQuantity: ShopifyMoney
    compareAtAmountPerQuantity?: ShopifyMoney | null
  }
  merchandise: {
    id: string
    title: string
    selectedOptions: { name: string; value: string }[]
    product: {
      id: string
      handle: string
      title: string
      featuredImage?: ShopifyImage | null
    }
  }
  attributes?: { key: string; value: string }[]
}

interface ShopifyCartNode {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    subtotalAmount: ShopifyMoney
    totalAmount: ShopifyMoney
    totalTaxAmount?: ShopifyMoney | null
  }
  lines: { edges: Array<{ node: ShopifyCartLine }> }
  buyerIdentity?: {
    email?: string | null
    phone?: string | null
    customer?: { id: string } | null
  }
  discountCodes?: Array<{ code: string; applicable: boolean }>
  note?: string | null
  attributes?: { key: string; value: string }[]
}

function transformCartLine(line: ShopifyCartLine): CommerceCartLine {
  return {
    id: line.id,
    quantity: line.quantity,
    merchandise: {
      id: line.merchandise.id,
      title: line.merchandise.title,
      selectedOptions: line.merchandise.selectedOptions,
      product: {
        id: line.merchandise.product.id,
        handle: line.merchandise.product.handle,
        title: line.merchandise.product.title,
        featuredImage: line.merchandise.product.featuredImage 
          ? transformImage(line.merchandise.product.featuredImage) 
          : undefined,
      },
    },
    cost: {
      totalAmount: transformMoney(line.cost.totalAmount),
      amountPerQuantity: transformMoney(line.cost.amountPerQuantity),
      compareAtAmountPerQuantity: line.cost.compareAtAmountPerQuantity 
        ? transformMoney(line.cost.compareAtAmountPerQuantity) 
        : undefined,
    },
    attributes: line.attributes,
  }
}

function transformCart(cart: ShopifyCartNode): CommerceCart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    lines: cart.lines.edges.map((e) => transformCartLine(e.node)),
    cost: {
      subtotalAmount: transformMoney(cart.cost.subtotalAmount),
      totalAmount: transformMoney(cart.cost.totalAmount),
      totalTaxAmount: cart.cost.totalTaxAmount 
        ? transformMoney(cart.cost.totalTaxAmount) 
        : undefined,
    },
    totalQuantity: cart.totalQuantity,
    buyerIdentity: cart.buyerIdentity ? {
      email: cart.buyerIdentity.email || undefined,
      phone: cart.buyerIdentity.phone || undefined,
      customerId: cart.buyerIdentity.customer?.id,
    } : undefined,
    discountCodes: cart.discountCodes,
    note: cart.note || undefined,
    attributes: cart.attributes,
  }
}

// ============================================================================
// GraphQL Fragments
// ============================================================================

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    totalInventory
    createdAt
    updatedAt
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          sku
          barcode
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          availableForSale
          quantityAvailable
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
          }
        }
      }
    }
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    seo {
      title
      description
    }
  }
`

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
    }
    discountCodes {
      code
      applicable
    }
    note
    attributes {
      key
      value
    }
  }
`

// ============================================================================
// Shopify Provider Implementation
// ============================================================================

export function createShopifyProvider(providerConfig?: ShopifyConfig): CommerceProvider {
  if (providerConfig) {
    config = providerConfig
  }

  return {
    name: 'shopify',

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
      const query = `
        ${PRODUCT_FRAGMENT}
        query getProduct($handle: String!) {
          product(handle: $handle) {
            ...ProductFields
          }
        }
      `
      const data = await shopifyFetch<{ product: ShopifyProductNode | null }>({
        query,
        variables: { handle },
      })
      return data.product ? transformProduct(data.product) : null
    },

    async getProductById(id: string): Promise<CommerceProduct | null> {
      const query = `
        ${PRODUCT_FRAGMENT}
        query getProductById($id: ID!) {
          product(id: $id) {
            ...ProductFields
          }
        }
      `
      const data = await shopifyFetch<{ product: ShopifyProductNode | null }>({
        query,
        variables: { id },
      })
      return data.product ? transformProduct(data.product) : null
    },

    async getProducts(params?: ProductSearchParams): Promise<ProductSearchResult> {
      const first = params?.first || 20
      const sortKey = mapSortKey(params?.sortKey)
      const reverse = params?.reverse || false

      // Build query filter
      let queryFilter = ''
      if (params?.query) queryFilter += params.query
      if (params?.vendor) queryFilter += ` vendor:${params.vendor}`
      if (params?.productType) queryFilter += ` product_type:${params.productType}`
      if (params?.available !== undefined) queryFilter += params.available ? ' available_for_sale:true' : ''
      if (params?.tags?.length) queryFilter += ` tag:${params.tags.join(' OR tag:')}`

      const query = `
        ${PRODUCT_FRAGMENT}
        query getProducts($first: Int!, $sortKey: ProductSortKeys!, $reverse: Boolean!, $query: String, $after: String) {
          products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query, after: $after) {
            edges {
              node {
                ...ProductFields
              }
              cursor
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
      `

      const data = await shopifyFetch<{
        products: {
          edges: Array<{ node: ShopifyProductNode; cursor: string }>
          pageInfo: {
            hasNextPage: boolean
            hasPreviousPage: boolean
            startCursor?: string
            endCursor?: string
          }
        }
      }>({
        query,
        variables: {
          first,
          sortKey,
          reverse,
          query: queryFilter.trim() || undefined,
          after: params?.after,
        },
      })

      return {
        products: data.products.edges.map((e) => transformProduct(e.node)),
        pageInfo: data.products.pageInfo,
      }
    },

    async searchProducts(searchQuery: string, limit = 10): Promise<CommerceProduct[]> {
      const result = await this.getProducts({ query: searchQuery, first: limit })
      return result.products
    },

    async getProductRecommendations(productId: string, limit = 4): Promise<CommerceProduct[]> {
      const query = `
        ${PRODUCT_FRAGMENT}
        query getRecommendations($productId: ID!) {
          productRecommendations(productId: $productId) {
            ...ProductFields
          }
        }
      `
      const data = await shopifyFetch<{ productRecommendations: ShopifyProductNode[] | null }>({
        query,
        variables: { productId },
      })
      const products = data.productRecommendations || []
      return products.slice(0, limit).map(transformProduct)
    },

    // ------------------------------------------------------------------------
    // Collections
    // ------------------------------------------------------------------------

    async getCollection(handle: string): Promise<CommerceCollection | null> {
      const query = `
        query getCollection($handle: String!) {
          collection(handle: $handle) {
            id
            handle
            title
            description
            descriptionHtml
            image {
              url
              altText
              width
              height
            }
            seo {
              title
              description
            }
          }
        }
      `
      const data = await shopifyFetch<{ collection: any | null }>({
        query,
        variables: { handle },
      })
      if (!data.collection) return null
      return {
        id: data.collection.id,
        handle: data.collection.handle,
        title: data.collection.title,
        description: data.collection.description,
        descriptionHtml: data.collection.descriptionHtml,
        image: data.collection.image ? transformImage(data.collection.image) : undefined,
        seo: data.collection.seo,
      }
    },

    async getCollections(limit = 100): Promise<CommerceCollection[]> {
      const query = `
        query getCollections($first: Int!) {
          collections(first: $first) {
            edges {
              node {
                id
                handle
                title
                description
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      `
      const data = await shopifyFetch<{ collections: { edges: Array<{ node: any }> } }>({
        query,
        variables: { first: limit },
      })
      return data.collections.edges.map((e) => ({
        id: e.node.id,
        handle: e.node.handle,
        title: e.node.title,
        description: e.node.description,
        image: e.node.image ? transformImage(e.node.image) : undefined,
      }))
    },

    async getCollectionProducts(handle: string, params?: ProductSearchParams): Promise<ProductSearchResult> {
      const first = params?.first || 20
      const sortKey = mapCollectionSortKey(params?.sortKey)
      const reverse = params?.reverse || false

      const query = `
        ${PRODUCT_FRAGMENT}
        query getCollectionProducts($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys!, $reverse: Boolean!, $after: String) {
          collection(handle: $handle) {
            products(first: $first, sortKey: $sortKey, reverse: $reverse, after: $after) {
              edges {
                node {
                  ...ProductFields
                }
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
        }
      `

      const data = await shopifyFetch<{
        collection: {
          products: {
            edges: Array<{ node: ShopifyProductNode }>
            pageInfo: {
              hasNextPage: boolean
              hasPreviousPage: boolean
              startCursor?: string
              endCursor?: string
            }
          }
        } | null
      }>({
        query,
        variables: { handle, first, sortKey, reverse, after: params?.after },
      })

      if (!data.collection) {
        return { products: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
      }

      return {
        products: data.collection.products.edges.map((e) => transformProduct(e.node)),
        pageInfo: data.collection.products.pageInfo,
      }
    },

    // ------------------------------------------------------------------------
    // Cart
    // ------------------------------------------------------------------------

    async createCart(): Promise<CommerceCart> {
      const query = `
        ${CART_FRAGMENT}
        mutation createCart {
          cartCreate {
            cart {
              ...CartFields
            }
            userErrors {
              field
              message
            }
          }
        }
      `
      const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCartNode } }>({ query })
      return transformCart(data.cartCreate.cart)
    },

    async getCart(cartId: string): Promise<CommerceCart | null> {
      const query = `
        ${CART_FRAGMENT}
        query getCart($cartId: ID!) {
          cart(id: $cartId) {
            ...CartFields
          }
        }
      `
      const data = await shopifyFetch<{ cart: ShopifyCartNode | null }>({
        query,
        variables: { cartId },
      })
      return data.cart ? transformCart(data.cart) : null
    },

    async addCartLines(cartId: string, lines: CartLineInput[]): Promise<CommerceCart> {
      const query = `
        ${CART_FRAGMENT}
        mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              ...CartFields
            }
            userErrors {
              field
              message
            }
          }
        }
      `
      const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCartNode } }>({
        query,
        variables: { cartId, lines },
      })
      return transformCart(data.cartLinesAdd.cart)
    },

    async updateCartLines(cartId: string, lines: CartLineUpdateInput[]): Promise<CommerceCart> {
      const query = `
        ${CART_FRAGMENT}
        mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
          cartLinesUpdate(cartId: $cartId, lines: $lines) {
            cart {
              ...CartFields
            }
            userErrors {
              field
              message
            }
          }
        }
      `
      const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCartNode } }>({
        query,
        variables: { cartId, lines },
      })
      return transformCart(data.cartLinesUpdate.cart)
    },

    async removeCartLines(cartId: string, lineIds: string[]): Promise<CommerceCart> {
      const query = `
        ${CART_FRAGMENT}
        mutation removeCartLines($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
            cart {
              ...CartFields
            }
            userErrors {
              field
              message
            }
          }
        }
      `
      const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCartNode } }>({
        query,
        variables: { cartId, lineIds },
      })
      return transformCart(data.cartLinesRemove.cart)
    },

    async applyDiscount(cartId: string, discountCode: string): Promise<CommerceCart> {
      const query = `
        ${CART_FRAGMENT}
        mutation applyDiscount($cartId: ID!, $discountCodes: [String!]!) {
          cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
            cart {
              ...CartFields
            }
            userErrors {
              field
              message
            }
          }
        }
      `
      const data = await shopifyFetch<{ cartDiscountCodesUpdate: { cart: ShopifyCartNode } }>({
        query,
        variables: { cartId, discountCodes: [discountCode] },
      })
      return transformCart(data.cartDiscountCodesUpdate.cart)
    },

    async removeDiscount(cartId: string): Promise<CommerceCart> {
      const query = `
        ${CART_FRAGMENT}
        mutation removeDiscount($cartId: ID!) {
          cartDiscountCodesUpdate(cartId: $cartId, discountCodes: []) {
            cart {
              ...CartFields
            }
            userErrors {
              field
              message
            }
          }
        }
      `
      const data = await shopifyFetch<{ cartDiscountCodesUpdate: { cart: ShopifyCartNode } }>({
        query,
        variables: { cartId },
      })
      return transformCart(data.cartDiscountCodesUpdate.cart)
    },
  }
}

// ============================================================================
// Helpers
// ============================================================================

function mapSortKey(sortKey?: string): string {
  switch (sortKey) {
    case 'title': return 'TITLE'
    case 'price': return 'PRICE'
    case 'best_selling': return 'BEST_SELLING'
    case 'created': return 'CREATED_AT'
    case 'relevance': return 'RELEVANCE'
    default: return 'BEST_SELLING'
  }
}

function mapCollectionSortKey(sortKey?: string): string {
  switch (sortKey) {
    case 'title': return 'TITLE'
    case 'price': return 'PRICE'
    case 'best_selling': return 'BEST_SELLING'
    case 'created': return 'CREATED'
    case 'relevance': return 'RELEVANCE'
    default: return 'BEST_SELLING'
  }
}

// Default export for convenience
export default createShopifyProvider
