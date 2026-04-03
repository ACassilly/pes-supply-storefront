/**
 * Medusa Webhook Handler
 * 
 * Receives webhooks from Medusa and processes them through the commerce layer.
 * 
 * Required env vars:
 * - MEDUSA_WEBHOOK_SECRET: For webhook verification
 */

import { NextRequest, NextResponse } from 'next/server'
import { verifyMedusaWebhook, processWebhook } from '@/lib/commerce/webhooks'
import type { WebhookEventType } from '@/lib/commerce/types'

const WEBHOOK_SECRET = process.env.MEDUSA_WEBHOOK_SECRET || ''

// Map Medusa event types to our event types
const eventMap: Record<string, WebhookEventType> = {
  'product.created': 'product.created',
  'product.updated': 'product.updated',
  'product.deleted': 'product.deleted',
  'order.placed': 'order.created',
  'order.updated': 'order.updated',
  'order.completed': 'order.fulfilled',
  'order.canceled': 'order.cancelled',
  'inventory-item.updated': 'inventory.updated',
  'customer.created': 'customer.created',
  'customer.updated': 'customer.updated',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-medusa-signature') || ''

    // Verify webhook signature
    if (WEBHOOK_SECRET) {
      const isValid = await verifyMedusaWebhook(body, signature, WEBHOOK_SECRET)
      if (!isValid) {
        console.error('Invalid Medusa webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    // Parse the webhook data
    const payload = JSON.parse(body)
    const eventType = eventMap[payload.event]

    if (!eventType) {
      console.log(`Unknown Medusa webhook event: ${payload.event}`)
      return NextResponse.json({ received: true, processed: false })
    }

    // Process the webhook
    await processWebhook({
      id: payload.id || `medusa_${Date.now()}`,
      type: eventType,
      createdAt: payload.timestamp || new Date().toISOString(),
      data: payload.data,
      source: 'medusa',
    })

    return NextResponse.json({ received: true, processed: true })
  } catch (error) {
    console.error('Medusa webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
