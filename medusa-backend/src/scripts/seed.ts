/**
 * Seed script — creates a default region, shipping option, and publishable API key.
 * Run: medusa exec ./src/scripts/seed.ts
 */
import { ExecArgs } from '@medusajs/types'

export default async function seed({ container }: ExecArgs) {
  const regionService = container.resolve('regionModuleService')
  const salesChannelService = container.resolve('salesChannelModuleService')
  const apiKeyService = container.resolve('apiKeyModuleService')

  console.log('🌱 Seeding PES Supply Medusa store…')

  // 1. Region
  const regions = await regionService.listRegions({})
  let regionId = regions[0]?.id
  if (!regionId) {
    const region = await regionService.createRegions({
      name: 'United States',
      currency_code: 'usd',
      countries: ['us', 'ca'],
    })
    regionId = region.id
    console.log('  ✔ Created region:', region.name)
  }

  // 2. Sales channel
  const channels = await salesChannelService.listSalesChannels({})
  let channelId = channels[0]?.id
  if (!channelId) {
    const channel = await salesChannelService.createSalesChannels({
      name: 'PES Supply Web Store',
      is_default: true,
    })
    channelId = channel.id
    console.log('  ✔ Created sales channel:', channel.name)
  }

  // 3. Publishable API key
  const keys = await apiKeyService.listApiKeys({ type: 'publishable' })
  if (keys.length === 0) {
    const key = await apiKeyService.createApiKeys({
      title: 'PES Supply Storefront',
      type: 'publishable',
    })
    console.log('  ✔ Created publishable API key:', key.token)
    console.log('  ⚠️  Add this to .env: NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=' + key.token)
  } else {
    console.log('  ℹ️  Publishable API key already exists:', keys[0].token)
  }

  console.log('✅ Seed complete.')
}
