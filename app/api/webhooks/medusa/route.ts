import { NextRequest, NextResponse } from 'next/server'
import type { MedusaOrderPayload } from '@/scripts/odoo-medusa-sync'

/**
 * POST /api/webhooks/medusa
 * Configure in Medusa subscriber:
 *   events: ['product.updated', 'order.placed', 'inventory_item.updated']
 *   url: https://pes.supply/api/webhooks/medusa
 *   headers: { 'x-medusa-webhook-secret': process.env.MEDUSA_WEBHOOK_SECRET }
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-medusa-webhook-secret')
  if (secret !== process.env.MEDUSA_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { event?: string; data?: Record<string, unknown> } = {}
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { event, data } = body
  console.log(`[webhook/medusa] event: ${event}`)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const revalidateSecret = process.env.REVALIDATE_SECRET ?? ''

  switch (event) {
    case 'product.updated': {
      const handle = (data as { handle?: string })?.handle
      await fetch(`${baseUrl}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-revalidate-secret': revalidateSecret },
        body: JSON.stringify({ type: 'product', handle }),
      }).catch((e) => console.error('[webhook] revalidate failed:', e))
      break
    }
    case 'inventory_item.updated': {
      await fetch(`${baseUrl}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-revalidate-secret': revalidateSecret },
        body: JSON.stringify({ type: 'all' }),
      }).catch((e) => console.error('[webhook] revalidate failed:', e))
      break
    }
    case 'order.placed': {
      if (process.env.SYNC_TO_ODOO === 'true') {
        try {
          const { pushOrderToOdoo } = await import('@/scripts/odoo-medusa-sync')
          await pushOrderToOdoo(data as MedusaOrderPayload)
        } catch (e) {
          console.error('[webhook] Odoo order push failed:', e)
        }
      }
      break
    }
    default:
      console.log(`[webhook/medusa] Unhandled event: ${event}`)
  }

  return NextResponse.json({ received: true, event, timestamp: new Date().toISOString() })
}
