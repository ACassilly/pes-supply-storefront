/**
 * Odoo Webhook Handler
 * 
 * Receives webhooks from Odoo 19 automation rules and processes them.
 * 
 * Odoo Setup:
 * 1. Go to Settings > Technical > Automation > Automated Actions
 * 2. Create actions for models: product.template, sale.order, stock.quant, res.partner
 * 3. Set webhook URL to: https://your-domain.com/api/webhooks/odoo
 * 4. Configure API key for authentication
 * 
 * Required env vars:
 * - ODOO_WEBHOOK_SECRET: For webhook authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { parseOdooWebhook, processWebhook } from '@/lib/commerce/webhooks'

const WEBHOOK_SECRET = process.env.ODOO_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    // Verify API key
    const authHeader = request.headers.get('authorization') || ''
    const apiKey = authHeader.replace('Bearer ', '')

    if (WEBHOOK_SECRET && apiKey !== WEBHOOK_SECRET) {
      console.error('Invalid Odoo webhook authentication')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse the webhook payload
    const payload = await request.json()

    // Odoo webhooks typically contain:
    // { model: "product.template", method: "write", ids: [1, 2, 3], data: {...} }
    const event = parseOdooWebhook(payload)

    if (!event) {
      console.log(`Unhandled Odoo webhook: ${payload.model}.${payload.method}`)
      return NextResponse.json({ received: true, processed: false })
    }

    // Process the webhook
    await processWebhook(event)

    return NextResponse.json({ received: true, processed: true })
  } catch (error) {
    console.error('Odoo webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Health check endpoint for Odoo to verify connectivity
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'odoo-webhook',
    timestamp: new Date().toISOString(),
  })
}
