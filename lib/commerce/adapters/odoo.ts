/**
 * Odoo 19 Commerce Adapter
 * Implements CommerceProvider interface for Odoo 19 JSON-RPC API
 * 
 * Odoo uses JSON-RPC 2.0 for external API access
 * Primary use cases: Inventory sync, Order management, Customer sync
 * 
 * Note: Odoo is typically used alongside Shopify/Medusa for inventory/ERP,
 * not as the primary storefront. This adapter focuses on those sync capabilities.
 */

import type { CommerceProvider, OdooConfig } from '../provider'
import type {
  CommerceProduct,
  CommerceCollection,
  CommerceCart,
  CommerceOrder,
  CommerceOrderLineItem,
  CommerceCustomer,
  CommerceAddress,
  CartLineInput,
  CartLineUpdateInput,
  ProductSearchParams,
  ProductSearchResult,
  InventoryLevel,
  InventoryAdjustment,
  CommerceMoney,
} from '../types'

// ============================================================================
// Configuration
// ============================================================================

let config: OdooConfig | null = null
let sessionId: string | null = null

function getConfig(): OdooConfig {
  if (!config) {
    const url = process.env.ODOO_URL
    const database = process.env.ODOO_DATABASE
    const username = process.env.ODOO_USERNAME
    const apiKey = process.env.ODOO_API_KEY

    if (url && database && username && apiKey) {
      config = {
        url: url.replace(/\/$/, ''),
        database,
        username,
        apiKey,
      }
    } else {
      throw new Error('Odoo configuration incomplete. Required: ODOO_URL, ODOO_DATABASE, ODOO_USERNAME, ODOO_API_KEY')
    }
  }
  return config
}

// ============================================================================
// JSON-RPC Client
// ============================================================================

interface JsonRpcRequest {
  jsonrpc: '2.0'
  method: string
  params: Record<string, unknown>
  id: number
}

interface JsonRpcResponse<T> {
  jsonrpc: '2.0'
  id: number
  result?: T
  error?: {
    code: number
    message: string
    data?: { message: string; debug?: string }
  }
}

let requestId = 0

async function odooRpc<T>(
  endpoint: string,
  method: string,
  params: Record<string, unknown>
): Promise<T> {
  const cfg = getConfig()
  const url = `${cfg.url}${endpoint}`

  const request: JsonRpcRequest = {
    jsonrpc: '2.0',
    method,
    params,
    id: ++requestId,
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(sessionId ? { Cookie: `session_id=${sessionId}` } : {}),
    },
    body: JSON.stringify(request),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Odoo HTTP error: ${response.status}`)
  }

  // Extract session cookie if present
  const setCookie = response.headers.get('set-cookie')
  if (setCookie) {
    const match = setCookie.match(/session_id=([^;]+)/)
    if (match) sessionId = match[1]
  }

  const json: JsonRpcResponse<T> = await response.json()

  if (json.error) {
    throw new Error(`Odoo RPC error: ${json.error.message} - ${json.error.data?.message || ''}`)
  }

  return json.result as T
}

// Authenticate and get session
async function authenticate(): Promise<number> {
  const cfg = getConfig()
  
  const result = await odooRpc<{ uid: number; session_id: string }>(
    '/web/session/authenticate',
    'call',
    {
      db: cfg.database,
      login: cfg.username,
      password: cfg.apiKey,
    }
  )

  if (!result.uid) {
    throw new Error('Odoo authentication failed')
  }

  return result.uid
}

// Execute Odoo model method
async function executeKw<T>(
  model: string,
  method: string,
  args: unknown[] = [],
  kwargs: Record<string, unknown> = {}
): Promise<T> {
  const cfg = getConfig()
  
  // Ensure authenticated
  if (!sessionId) {
    await authenticate()
  }

  return odooRpc<T>('/web/dataset/call_kw', 'call', {
    model,
    method,
    args,
    kwargs,
  })
}

// Search and read records
async function searchRead<T>(
  model: string,
  domain: unknown[][] = [],
  fields: string[] = [],
  options: { limit?: number; offset?: number; order?: string } = {}
): Promise<T[]> {
  return executeKw<T[]>(model, 'search_read', [domain], {
    fields,
    limit: options.limit,
    offset: options.offset,
    order: options.order,
  })
}

// ============================================================================
// Type Transformers
// ============================================================================

interface OdooProduct {
  id: number
  name: string
  default_code?: string // SKU
  barcode?: string
  description?: string
  description_sale?: string
  list_price: number
  standard_price?: number
  categ_id?: [number, string]
  image_1920?: string // Base64 encoded
  qty_available: number
  virtual_available: number
  active: boolean
  sale_ok: boolean
  type: string
  uom_id?: [number, string]
  weight?: number
  create_date: string
  write_date: string
  product_variant_ids?: number[]
}

interface OdooProductVariant {
  id: number
  name: string
  default_code?: string
  barcode?: string
  lst_price: number
  standard_price?: number
  qty_available: number
  virtual_available: number
  product_tmpl_id: [number, string]
  attribute_value_ids?: number[]
  image_1920?: string
}

interface OdooSaleOrder {
  id: number
  name: string // Order number
  partner_id: [number, string]
  date_order: string
  state: string
  amount_untaxed: number
  amount_tax: number
  amount_total: number
  currency_id: [number, string]
  order_line: number[]
  partner_shipping_id?: [number, string]
  partner_invoice_id?: [number, string]
  note?: string
}

interface OdooSaleOrderLine {
  id: number
  name: string
  product_id: [number, string]
  product_uom_qty: number
  price_unit: number
  price_subtotal: number
  price_total: number
  discount?: number
}

interface OdooPartner {
  id: number
  name: string
  email?: string
  phone?: string
  mobile?: string
  street?: string
  street2?: string
  city?: string
  state_id?: [number, string]
  zip?: string
  country_id?: [number, string]
  is_company: boolean
  customer_rank: number
  create_date: string
  write_date: string
}

interface OdooStockQuant {
  id: number
  product_id: [number, string]
  location_id: [number, string]
  quantity: number
  reserved_quantity: number
}

function transformMoney(amount: number, currencyCode: string = 'USD'): CommerceMoney {
  return {
    amount: amount.toFixed(2),
    currencyCode,
  }
}

function transformOdooProduct(product: OdooProduct): CommerceProduct {
  const imageUrl = product.image_1920
    ? `data:image/png;base64,${product.image_1920}`
    : '/placeholder-product.jpg'

  return {
    id: product.id.toString(),
    handle: product.default_code || product.id.toString(),
    title: product.name,
    description: product.description_sale || product.description || '',
    vendor: '',
    productType: product.categ_id?.[1] || '',
    tags: [],
    images: [{ url: imageUrl, altText: product.name }],
    variants: [{
      id: product.id.toString(),
      title: 'Default',
      sku: product.default_code,
      barcode: product.barcode,
      price: transformMoney(product.list_price),
      compareAtPrice: product.standard_price && product.standard_price > product.list_price
        ? transformMoney(product.standard_price)
        : undefined,
      availableForSale: product.sale_ok && product.qty_available > 0,
      quantityAvailable: Math.floor(product.qty_available),
      selectedOptions: [],
      weight: product.weight,
      weightUnit: product.uom_id?.[1],
    }],
    options: [],
    priceRange: {
      minPrice: transformMoney(product.list_price),
      maxPrice: transformMoney(product.list_price),
    },
    availableForSale: product.sale_ok && product.active,
    totalInventory: Math.floor(product.qty_available),
    createdAt: product.create_date,
    updatedAt: product.write_date,
  }
}

function transformOdooOrder(order: OdooSaleOrder, lines: OdooSaleOrderLine[]): CommerceOrder {
  const currencyCode = order.currency_id?.[1] || 'USD'
  
  const statusMap: Record<string, CommerceOrder['financialStatus']> = {
    'draft': 'pending',
    'sent': 'pending',
    'sale': 'paid',
    'done': 'paid',
    'cancel': 'voided',
  }

  const fulfillmentMap: Record<string, CommerceOrder['fulfillmentStatus']> = {
    'draft': 'unfulfilled',
    'sent': 'unfulfilled',
    'sale': 'unfulfilled',
    'done': 'fulfilled',
    'cancel': 'unfulfilled',
  }

  return {
    id: order.id.toString(),
    orderNumber: order.name,
    email: '', // Would need to fetch from partner
    financialStatus: statusMap[order.state] || 'pending',
    fulfillmentStatus: fulfillmentMap[order.state] || 'unfulfilled',
    processedAt: order.date_order,
    subtotalPrice: transformMoney(order.amount_untaxed, currencyCode),
    totalShippingPrice: transformMoney(0, currencyCode), // Odoo handles shipping separately
    totalTax: transformMoney(order.amount_tax, currencyCode),
    totalPrice: transformMoney(order.amount_total, currencyCode),
    currencyCode,
    lineItems: lines.map((line) => transformOdooOrderLine(line, currencyCode)),
    note: order.note,
  }
}

function transformOdooOrderLine(line: OdooSaleOrderLine, currencyCode: string): CommerceOrderLineItem {
  return {
    id: line.id.toString(),
    title: line.name,
    sku: line.product_id[0].toString(),
    quantity: line.product_uom_qty,
    price: transformMoney(line.price_unit, currencyCode),
    totalDiscount: line.discount ? transformMoney(line.discount, currencyCode) : undefined,
    productId: line.product_id[0].toString(),
  }
}

function transformOdooPartner(partner: OdooPartner): CommerceCustomer {
  const nameParts = partner.name.split(' ')
  return {
    id: partner.id.toString(),
    email: partner.email || '',
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' '),
    phone: partner.phone || partner.mobile,
    acceptsMarketing: false,
    defaultAddress: partner.street ? {
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(' '),
      address1: partner.street,
      address2: partner.street2,
      city: partner.city || '',
      province: partner.state_id?.[1],
      country: partner.country_id?.[1] || '',
      countryCode: '', // Would need mapping
      zip: partner.zip || '',
      phone: partner.phone,
    } : undefined,
    addresses: [],
    createdAt: partner.create_date,
    updatedAt: partner.write_date,
  }
}

// ============================================================================
// Odoo Provider Implementation
// ============================================================================

export function createOdooProvider(providerConfig?: OdooConfig): CommerceProvider {
  if (providerConfig) {
    config = providerConfig
  }

  return {
    name: 'odoo',

    isConfigured(): boolean {
      try {
        getConfig()
        return true
      } catch {
        return false
      }
    },

    // ------------------------------------------------------------------------
    // Products (Read from Odoo product.product / product.template)
    // ------------------------------------------------------------------------

    async getProduct(handle: string): Promise<CommerceProduct | null> {
      try {
        const products = await searchRead<OdooProduct>(
          'product.template',
          [['default_code', '=', handle]],
          ['id', 'name', 'default_code', 'barcode', 'description', 'description_sale', 
           'list_price', 'standard_price', 'categ_id', 'qty_available', 'virtual_available',
           'active', 'sale_ok', 'type', 'uom_id', 'weight', 'create_date', 'write_date'],
          { limit: 1 }
        )
        if (!products.length) return null
        return transformOdooProduct(products[0])
      } catch {
        return null
      }
    },

    async getProductById(id: string): Promise<CommerceProduct | null> {
      try {
        const products = await searchRead<OdooProduct>(
          'product.template',
          [['id', '=', parseInt(id)]],
          ['id', 'name', 'default_code', 'barcode', 'description', 'description_sale',
           'list_price', 'standard_price', 'categ_id', 'qty_available', 'virtual_available',
           'active', 'sale_ok', 'type', 'uom_id', 'weight', 'create_date', 'write_date'],
          { limit: 1 }
        )
        if (!products.length) return null
        return transformOdooProduct(products[0])
      } catch {
        return null
      }
    },

    async getProducts(params?: ProductSearchParams): Promise<ProductSearchResult> {
      const domain: unknown[][] = [['active', '=', true], ['sale_ok', '=', true]]
      
      if (params?.query) {
        domain.push(['|'], ['name', 'ilike', params.query], ['default_code', 'ilike', params.query])
      }
      if (params?.available) {
        domain.push(['qty_available', '>', 0])
      }

      let order = 'name asc'
      if (params?.sortKey === 'price') order = params.reverse ? 'list_price desc' : 'list_price asc'
      if (params?.sortKey === 'created') order = params.reverse ? 'create_date desc' : 'create_date asc'
      if (params?.sortKey === 'title') order = params.reverse ? 'name desc' : 'name asc'

      const products = await searchRead<OdooProduct>(
        'product.template',
        domain,
        ['id', 'name', 'default_code', 'barcode', 'description', 'description_sale',
         'list_price', 'standard_price', 'categ_id', 'qty_available', 'virtual_available',
         'active', 'sale_ok', 'type', 'uom_id', 'weight', 'create_date', 'write_date'],
        { 
          limit: params?.first || 20, 
          offset: params?.after ? parseInt(params.after) : 0,
          order,
        }
      )

      return {
        products: products.map(transformOdooProduct),
        pageInfo: {
          hasNextPage: products.length === (params?.first || 20),
          hasPreviousPage: (params?.after ? parseInt(params.after) : 0) > 0,
          endCursor: ((params?.after ? parseInt(params.after) : 0) + products.length).toString(),
        },
      }
    },

    async searchProducts(query: string, limit = 10): Promise<CommerceProduct[]> {
      const result = await this.getProducts({ query, first: limit })
      return result.products
    },

    // ------------------------------------------------------------------------
    // Collections (Odoo product.category)
    // ------------------------------------------------------------------------

    async getCollection(handle: string): Promise<CommerceCollection | null> {
      try {
        const categories = await searchRead<{ id: number; name: string; display_name: string }>(
          'product.category',
          [['name', '=', handle]],
          ['id', 'name', 'display_name'],
          { limit: 1 }
        )
        if (!categories.length) return null
        return {
          id: categories[0].id.toString(),
          handle: categories[0].name.toLowerCase().replace(/\s+/g, '-'),
          title: categories[0].display_name,
        }
      } catch {
        return null
      }
    },

    async getCollections(limit = 100): Promise<CommerceCollection[]> {
      const categories = await searchRead<{ id: number; name: string; display_name: string }>(
        'product.category',
        [],
        ['id', 'name', 'display_name'],
        { limit }
      )
      return categories.map((cat) => ({
        id: cat.id.toString(),
        handle: cat.name.toLowerCase().replace(/\s+/g, '-'),
        title: cat.display_name,
      }))
    },

    async getCollectionProducts(handle: string, params?: ProductSearchParams): Promise<ProductSearchResult> {
      const collection = await this.getCollection(handle)
      if (!collection) {
        return { products: [], pageInfo: { hasNextPage: false, hasPreviousPage: false } }
      }

      const domain: unknown[][] = [
        ['active', '=', true],
        ['sale_ok', '=', true],
        ['categ_id', '=', parseInt(collection.id)],
      ]

      const products = await searchRead<OdooProduct>(
        'product.template',
        domain,
        ['id', 'name', 'default_code', 'barcode', 'description', 'description_sale',
         'list_price', 'standard_price', 'categ_id', 'qty_available', 'virtual_available',
         'active', 'sale_ok', 'type', 'uom_id', 'weight', 'create_date', 'write_date'],
        { limit: params?.first || 20 }
      )

      return {
        products: products.map(transformOdooProduct),
        pageInfo: { hasNextPage: false, hasPreviousPage: false },
      }
    },

    // ------------------------------------------------------------------------
    // Cart - Odoo uses sale.order in draft state
    // Note: For B2B, cart is typically handled by Shopify/Medusa storefront
    // This is primarily for order sync
    // ------------------------------------------------------------------------

    async createCart(): Promise<CommerceCart> {
      // Create draft sale order
      const orderId = await executeKw<number>('sale.order', 'create', [{
        partner_id: 1, // Default partner, would be set properly in real use
        state: 'draft',
      }])

      return {
        id: orderId.toString(),
        checkoutUrl: '',
        lines: [],
        cost: {
          subtotalAmount: transformMoney(0),
          totalAmount: transformMoney(0),
        },
        totalQuantity: 0,
      }
    },

    async getCart(cartId: string): Promise<CommerceCart | null> {
      try {
        const orders = await searchRead<OdooSaleOrder>(
          'sale.order',
          [['id', '=', parseInt(cartId)], ['state', '=', 'draft']],
          ['id', 'name', 'partner_id', 'date_order', 'state', 'amount_untaxed', 
           'amount_tax', 'amount_total', 'currency_id', 'order_line'],
          { limit: 1 }
        )
        if (!orders.length) return null

        const lines = orders[0].order_line.length > 0
          ? await searchRead<OdooSaleOrderLine>(
              'sale.order.line',
              [['id', 'in', orders[0].order_line]],
              ['id', 'name', 'product_id', 'product_uom_qty', 'price_unit', 'price_subtotal', 'price_total']
            )
          : []

        return {
          id: orders[0].id.toString(),
          checkoutUrl: '',
          lines: lines.map((line) => ({
            id: line.id.toString(),
            quantity: line.product_uom_qty,
            merchandise: {
              id: line.product_id[0].toString(),
              title: line.name,
              selectedOptions: [],
              product: {
                id: line.product_id[0].toString(),
                handle: line.product_id[0].toString(),
                title: line.product_id[1],
              },
            },
            cost: {
              totalAmount: transformMoney(line.price_total),
              amountPerQuantity: transformMoney(line.price_unit),
            },
          })),
          cost: {
            subtotalAmount: transformMoney(orders[0].amount_untaxed),
            totalAmount: transformMoney(orders[0].amount_total),
            totalTaxAmount: transformMoney(orders[0].amount_tax),
          },
          totalQuantity: lines.reduce((sum, l) => sum + l.product_uom_qty, 0),
        }
      } catch {
        return null
      }
    },

    async addCartLines(cartId: string, lines: CartLineInput[]): Promise<CommerceCart> {
      for (const line of lines) {
        await executeKw('sale.order.line', 'create', [{
          order_id: parseInt(cartId),
          product_id: parseInt(line.merchandiseId),
          product_uom_qty: line.quantity,
        }])
      }
      return (await this.getCart(cartId))!
    },

    async updateCartLines(cartId: string, lines: CartLineUpdateInput[]): Promise<CommerceCart> {
      for (const line of lines) {
        await executeKw('sale.order.line', 'write', [
          [parseInt(line.id)],
          { product_uom_qty: line.quantity },
        ])
      }
      return (await this.getCart(cartId))!
    },

    async removeCartLines(cartId: string, lineIds: string[]): Promise<CommerceCart> {
      await executeKw('sale.order.line', 'unlink', [lineIds.map((id) => parseInt(id))])
      return (await this.getCart(cartId))!
    },

    // ------------------------------------------------------------------------
    // Orders - Read from Odoo sale.order
    // ------------------------------------------------------------------------

    async getCustomerOrders(customerId: string, limit = 10): Promise<CommerceOrder[]> {
      const orders = await searchRead<OdooSaleOrder>(
        'sale.order',
        [['partner_id', '=', parseInt(customerId)], ['state', '!=', 'draft']],
        ['id', 'name', 'partner_id', 'date_order', 'state', 'amount_untaxed',
         'amount_tax', 'amount_total', 'currency_id', 'order_line', 'note'],
        { limit, order: 'date_order desc' }
      )

      const results: CommerceOrder[] = []
      for (const order of orders) {
        const lines = order.order_line.length > 0
          ? await searchRead<OdooSaleOrderLine>(
              'sale.order.line',
              [['id', 'in', order.order_line]],
              ['id', 'name', 'product_id', 'product_uom_qty', 'price_unit', 'price_subtotal', 'price_total', 'discount']
            )
          : []
        results.push(transformOdooOrder(order, lines))
      }

      return results
    },

    async getOrder(orderId: string): Promise<CommerceOrder | null> {
      try {
        const orders = await searchRead<OdooSaleOrder>(
          'sale.order',
          [['id', '=', parseInt(orderId)]],
          ['id', 'name', 'partner_id', 'date_order', 'state', 'amount_untaxed',
           'amount_tax', 'amount_total', 'currency_id', 'order_line', 'note'],
          { limit: 1 }
        )
        if (!orders.length) return null

        const lines = orders[0].order_line.length > 0
          ? await searchRead<OdooSaleOrderLine>(
              'sale.order.line',
              [['id', 'in', orders[0].order_line]],
              ['id', 'name', 'product_id', 'product_uom_qty', 'price_unit', 'price_subtotal', 'price_total', 'discount']
            )
          : []

        return transformOdooOrder(orders[0], lines)
      } catch {
        return null
      }
    },

    // ------------------------------------------------------------------------
    // Inventory - Primary Odoo strength
    // ------------------------------------------------------------------------

    async getInventoryLevels(variantIds: string[]): Promise<InventoryLevel[]> {
      const quants = await searchRead<OdooStockQuant>(
        'stock.quant',
        [['product_id', 'in', variantIds.map((id) => parseInt(id))]],
        ['id', 'product_id', 'location_id', 'quantity', 'reserved_quantity']
      )

      return quants.map((quant) => ({
        variantId: quant.product_id[0].toString(),
        locationId: quant.location_id[0].toString(),
        available: quant.quantity - quant.reserved_quantity,
        reserved: quant.reserved_quantity,
        updatedAt: new Date().toISOString(),
      }))
    },

    async adjustInventory(adjustments: InventoryAdjustment[]): Promise<boolean> {
      try {
        for (const adj of adjustments) {
          // Create inventory adjustment in Odoo
          await executeKw('stock.quant', 'write', [
            [parseInt(adj.variantId)],
            { quantity: adj.availableDelta }, // Simplified - real impl would use stock.move
          ])
        }
        return true
      } catch {
        return false
      }
    },

    async syncInventory(levels: InventoryLevel[]): Promise<boolean> {
      try {
        for (const level of levels) {
          // Update or create stock.quant records
          const existing = await searchRead<OdooStockQuant>(
            'stock.quant',
            [
              ['product_id', '=', parseInt(level.variantId)],
              ['location_id', '=', parseInt(level.locationId)],
            ],
            ['id'],
            { limit: 1 }
          )

          if (existing.length) {
            await executeKw('stock.quant', 'write', [
              [existing[0].id],
              { quantity: level.available + (level.reserved || 0) },
            ])
          }
        }
        return true
      } catch {
        return false
      }
    },

    // ------------------------------------------------------------------------
    // Customers - Odoo res.partner
    // ------------------------------------------------------------------------

    async createCustomer(input: {
      email: string
      password?: string
      firstName?: string
      lastName?: string
      phone?: string
    }): Promise<CommerceCustomer> {
      const name = [input.firstName, input.lastName].filter(Boolean).join(' ') || input.email
      
      const partnerId = await executeKw<number>('res.partner', 'create', [{
        name,
        email: input.email,
        phone: input.phone,
        customer_rank: 1,
      }])

      const partners = await searchRead<OdooPartner>(
        'res.partner',
        [['id', '=', partnerId]],
        ['id', 'name', 'email', 'phone', 'mobile', 'street', 'street2', 'city',
         'state_id', 'zip', 'country_id', 'is_company', 'customer_rank', 'create_date', 'write_date'],
        { limit: 1 }
      )

      return transformOdooPartner(partners[0])
    },

    async getCustomer(accessToken: string): Promise<CommerceCustomer | null> {
      try {
        // accessToken is partner ID for Odoo
        const partners = await searchRead<OdooPartner>(
          'res.partner',
          [['id', '=', parseInt(accessToken)]],
          ['id', 'name', 'email', 'phone', 'mobile', 'street', 'street2', 'city',
           'state_id', 'zip', 'country_id', 'is_company', 'customer_rank', 'create_date', 'write_date'],
          { limit: 1 }
        )
        if (!partners.length) return null
        return transformOdooPartner(partners[0])
      } catch {
        return null
      }
    },
  }
}

export default createOdooProvider
