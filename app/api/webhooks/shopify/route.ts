/**
 * Shopify Webhook Handler
 * 
 * Receives webhooks from Shopify and processes them through the commerce layer.
 * 
 * Required env vars:
 * - SHOPIFY_WEBHOOK_SECRET: For webhook verification
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyShopifyWebhook, processWebhook } from '@/lib/commerce/webhooks'
import type { WebhookEventType } from '@/lib/commerce/types'

const WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET || ''

// Map Shopify webhook topics to our event types
const topicMap: Record<string, WebhookEventType> = {
  'products/create': 'product.created',
  'products/update': 'product.updated',
  'products/delete': 'product.deleted',
  'orders/create': 'order.created',
  'orders/updated': 'order.updated',
  'orders/fulfilled': 'order.fulfilled',
  'orders/cancelled': 'order.cancelled',
  'inventory_levels/update': 'inventory.updated',
  'customers/create': 'customer.created',
  'customers/update': 'customer.updated',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-shopify-hmac-sha256') || ''
    const topic = request.headers.get('x-shopify-topic') || ''

    // Verify webhook signature
    if (WEBHOOK_SECRET) {
      const isValid = await verifyShopifyWebhook(body, signature, WEBHOOK_SECRET)
      if (!isValid) {
        console.error('Invalid Shopify webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    // Parse the webhook data
    const data = JSON.parse(body)
    const eventType = topicMap[topic]

    if (!eventType) {
      console.log(`Unknown Shopify webhook topic: ${topic}`)
      return NextResponse.json({ received: true, processed: false })
    }

    // Process the webhook
    await processWebhook({
      id: request.headers.get('x-shopify-webhook-id') || `shopify_${Date.now()}`,
      type: eventType,
      createdAt: new Date().toISOString(),
      data,
      source: 'shopify',
    })

    return NextResponse.json({ received: true, processed: true })
  } catch (error) {
    console.error('Shopify webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
