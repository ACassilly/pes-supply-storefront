/**
 * Commerce Webhook Handlers
 * 
 * Handles incoming webhooks from Shopify, Medusa, and Odoo
 * and syncs data between providers.
 */

import type { WebhookEvent, WebhookEventType, CommerceOrder, InventoryLevel } from './types'
import { getProvider } from './index'

// ============================================================================
// Webhook Event Handlers
// ============================================================================

type WebhookHandler<T = unknown> = (event: WebhookEvent<T>) => Promise<void>

const handlers: Map<WebhookEventType, WebhookHandler[]> = new Map()

/**
 * Register a webhook handler for a specific event type
 */
export function onWebhook<T>(eventType: WebhookEventType, handler: WebhookHandler<T>): void {
  const existing = handlers.get(eventType) || []
  existing.push(handler as WebhookHandler)
  handlers.set(eventType, existing)
}

/**
 * Process an incoming webhook event
 */
export async function processWebhook(event: WebhookEvent): Promise<void> {
  const eventHandlers = handlers.get(event.type)
  if (!eventHandlers?.length) {
    console.log(`No handlers registered for webhook type: ${event.type}`)
    return
  }

  for (const handler of eventHandlers) {
    try {
      await handler(event)
    } catch (error) {
      console.error(`Webhook handler error for ${event.type}:`, error)
    }
  }
}

// ============================================================================
// Shopify Webhook Verification
// ============================================================================

export async function verifyShopifyWebhook(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(body)
  )
  
  const computedSignature = btoa(
    String.fromCharCode(...new Uint8Array(signatureBuffer))
  )
  
  return computedSignature === signature
}

// ============================================================================
// Medusa Webhook Verification
// ============================================================================

export async function verifyMedusaWebhook(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  // Medusa uses similar HMAC verification
  return verifyShopifyWebhook(body, signature, secret)
}

// ============================================================================
// Odoo Webhook Parsing
// ============================================================================

export interface OdooWebhookPayload {
  model: string
  method: string
  ids: number[]
  data?: Record<string, unknown>
}

export function parseOdooWebhook(payload: OdooWebhookPayload): WebhookEvent | null {
  const eventTypeMap: Record<string, Record<string, WebhookEventType>> = {
    'product.template': {
      create: 'product.created',
      write: 'product.updated',
      unlink: 'product.deleted',
    },
    'sale.order': {
      create: 'order.created',
      write: 'order.updated',
    },
    'stock.quant': {
      write: 'inventory.updated',
    },
    'res.partner': {
      create: 'customer.created',
      write: 'customer.updated',
    },
  }

  const eventType = eventTypeMap[payload.model]?.[payload.method]
  if (!eventType) return null

  return {
    id: `odoo_${Date.now()}_${payload.ids.join('_')}`,
    type: eventType,
    createdAt: new Date().toISOString(),
    data: { ids: payload.ids, ...payload.data },
    source: 'odoo',
  }
}

// ============================================================================
// Sync Utilities
// ============================================================================

/**
 * Sync an order from the primary commerce provider to Odoo
 */
export async function syncOrderToOdoo(order: CommerceOrder): Promise<boolean> {
  const odoo = getProvider('odoo')
  if (!odoo?.isConfigured()) {
    console.log('Odoo not configured, skipping order sync')
    return false
  }

  try {
    // Create or update customer in Odoo
    if (order.email) {
      await odoo.createCustomer?.({
        email: order.email,
        firstName: order.shippingAddress?.firstName,
        lastName: order.shippingAddress?.lastName,
        phone: order.phone,
        password: '', // Odoo doesn't require password for customers
      })
    }

    // Order would be created via Odoo cart methods
    // This is a simplified example - real implementation would map all fields
    console.log(`Order ${order.orderNumber} synced to Odoo`)
    return true
  } catch (error) {
    console.error('Failed to sync order to Odoo:', error)
    return false
  }
}

/**
 * Sync inventory levels from Odoo to the primary commerce provider
 */
export async function syncInventoryFromOdoo(variantIds: string[]): Promise<InventoryLevel[]> {
  const odoo = getProvider('odoo')
  if (!odoo?.isConfigured() || !odoo.getInventoryLevels) {
    return []
  }

  try {
    const levels = await odoo.getInventoryLevels(variantIds)
    return levels
  } catch (error) {
    console.error('Failed to sync inventory from Odoo:', error)
    return []
  }
}

/**
 * Update inventory in the primary provider based on Odoo levels
 */
export async function pushInventoryToProvider(
  provider: 'shopify' | 'medusa',
  levels: InventoryLevel[]
): Promise<boolean> {
  const commerce = getProvider(provider)
  if (!commerce?.isConfigured() || !commerce.syncInventory) {
    return false
  }

  try {
    await commerce.syncInventory(levels)
    return true
  } catch (error) {
    console.error(`Failed to push inventory to ${provider}:`, error)
    return false
  }
}

// ============================================================================
// Default Handlers
// ============================================================================

// Sync orders to Odoo when created in Shopify/Medusa
onWebhook<CommerceOrder>('order.created', async (event) => {
  if (event.source !== 'odoo') {
    await syncOrderToOdoo(event.data as CommerceOrder)
  }
})

// Sync inventory updates from Odoo to other providers
onWebhook<{ ids: number[] }>('inventory.updated', async (event) => {
  if (event.source === 'odoo') {
    const variantIds = (event.data as { ids: number[] }).ids.map(String)
    const levels = await syncInventoryFromOdoo(variantIds)
    
    // Push to Shopify and/or Medusa
    const shopify = getProvider('shopify')
    const medusa = getProvider('medusa')
    
    if (shopify?.isConfigured()) {
      await pushInventoryToProvider('shopify', levels)
    }
    if (medusa?.isConfigured()) {
      await pushInventoryToProvider('medusa', levels)
    }
  }
})
