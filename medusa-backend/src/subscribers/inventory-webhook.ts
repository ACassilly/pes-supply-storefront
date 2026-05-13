import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'

const STOREFRONT_URL = process.env.STOREFRONT_URL ?? 'https://pes.supply'
const WEBHOOK_SECRET = process.env.MEDUSA_WEBHOOK_SECRET ?? ''

export default async function inventoryUpdatedSubscriber({
  event: { data },
}: SubscriberArgs<Record<string, unknown>>) {
  try {
    await fetch(`${STOREFRONT_URL}/api/webhooks/medusa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-medusa-webhook-secret': WEBHOOK_SECRET,
      },
      body: JSON.stringify({ event: 'inventory_item.updated', data }),
    })
  } catch (e) {
    console.error('[subscriber] inventory webhook failed:', e)
  }
}

export const config: SubscriberConfig = {
  event: ['inventory_item.updated', 'inventory_level.updated'],
}
