#!/usr/bin/env tsx
/**
 * Odoo <-> Medusa Bidirectional Sync Worker
 * ==========================================
 * Run on Azure VM via pm2 (see pm2-ecosystem.config.js)
 * Or manually: npx tsx scripts/odoo-medusa-sync.ts
 *
 * ENV vars required:
 *   ODOO_URL, ODOO_DATABASE, ODOO_USERNAME, ODOO_API_KEY
 *   NEXT_PUBLIC_MEDUSA_BACKEND_URL, MEDUSA_ADMIN_API_KEY
 *   SYNC_TO_ODOO=true
 *   USE_ODOO_INVENTORY=true
 */

const ODOO_URL = process.env.ODOO_URL ?? ''
const ODOO_DB = process.env.ODOO_DATABASE ?? ''
const ODOO_USER = process.env.ODOO_USERNAME ?? ''
const ODOO_KEY = process.env.ODOO_API_KEY ?? ''
const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ''
const MEDUSA_ADMIN_KEY = process.env.MEDUSA_ADMIN_API_KEY ?? ''
const SYNC_INTERVAL_MS = parseInt(process.env.SYNC_INTERVAL_MS ?? '900000')

async function odooCall(service: string, method: string, params: unknown[]): Promise<unknown> {
  const body = JSON.stringify({
    jsonrpc: '2.0', method: 'call', id: 1,
    params: { service, method, args: params },
  })
  const res = await fetch(`${ODOO_URL}/jsonrpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
  const json = await res.json() as { result?: unknown; error?: { message: string } }
  if (json.error) throw new Error(`Odoo JSONRPC error: ${json.error.message}`)
  return json.result
}

let _odooUid: number | null = null
async function odooUid(): Promise<number> {
  if (_odooUid) return _odooUid
  _odooUid = await odooCall('common', 'authenticate', [ODOO_DB, ODOO_USER, ODOO_KEY, {}]) as number
  if (!_odooUid) throw new Error('Odoo authentication failed')
  return _odooUid
}

async function odooSearch<T>(model: string, domain: unknown[][], fields: string[], limit = 200): Promise<T[]> {
  const uid = await odooUid()
  return odooCall('object', 'execute_kw', [
    ODOO_DB, uid, ODOO_KEY, model, 'search_read', [domain], { fields, limit },
  ]) as T[]
}

async function odooCreate(model: string, vals: Record<string, unknown>): Promise<number> {
  const uid = await odooUid()
  return odooCall('object', 'execute_kw', [
    ODOO_DB, uid, ODOO_KEY, model, 'create', [vals],
  ]) as number
}

async function medusaAdmin<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${MEDUSA_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-medusa-access-token': MEDUSA_ADMIN_KEY,
      ...(options.headers ?? {}),
    },
  })
  if (!res.ok) throw new Error(`Medusa admin error ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

async function syncOdooProductsToMedusa(): Promise<void> {
  console.log('[sync] Pulling products from Odoo...')
  interface OdooProduct {
    id: number; name: string; description_sale: string | false
    default_code: string | false; list_price: number; qty_available: number
    categ_id: [number, string]; active: boolean
  }
  const odooProducts = await odooSearch<OdooProduct>(
    'product.template',
    [['sale_ok', '=', true], ['active', '=', true]],
    ['id', 'name', 'description_sale', 'default_code', 'list_price', 'qty_available', 'categ_id', 'active'],
    500,
  )
  console.log(`[sync] Found ${odooProducts.length} Odoo products`)
  const medusaData = await medusaAdmin<{ products: Array<{ id: string; external_id?: string }> }>(
    '/admin/products?limit=500&fields=id,external_id'
  )
  const existingByExternalId = new Map(
    medusaData.products.filter((p) => p.external_id).map((p) => [p.external_id!, p.id])
  )
  let created = 0, updated = 0, skipped = 0
  for (const op of odooProducts) {
    const externalId = `odoo_${op.id}`
    const handle = (op.default_code || op.name)
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80)
    const payload = {
      title: op.name, handle, description: op.description_sale || '',
      status: 'published', external_id: externalId,
      variants: [{
        title: 'Default', sku: op.default_code || undefined,
        manage_inventory: true,
        inventory_quantity: Math.max(0, Math.floor(op.qty_available)),
        prices: [{ currency_code: 'usd', amount: Math.round(op.list_price * 100) }],
      }],
    }
    if (existingByExternalId.has(externalId)) {
      try {
        await medusaAdmin(`/admin/products/${existingByExternalId.get(externalId)!}`, {
          method: 'POST',
          body: JSON.stringify({ title: payload.title, description: payload.description }),
        })
        updated++
      } catch (e) { console.error(`[sync] Update failed for odoo_${op.id}:`, e); skipped++ }
    } else {
      try {
        await medusaAdmin('/admin/products', { method: 'POST', body: JSON.stringify(payload) })
        created++
      } catch (e) { console.error(`[sync] Create failed for odoo_${op.id}:`, e); skipped++ }
    }
  }
  console.log(`[sync] Products: created=${created} updated=${updated} skipped=${skipped}`)
}

async function syncInventory(): Promise<void> {
  if (process.env.USE_ODOO_INVENTORY !== 'true') return
  console.log('[sync] Syncing inventory...')
  interface OdooQty { id: number; default_code: string | false; qty_available: number }
  const odooQtys = await odooSearch<OdooQty>(
    'product.template',
    [['sale_ok', '=', true], ['active', '=', true]],
    ['id', 'default_code', 'qty_available'], 500,
  )
  const medusaVariants = await medusaAdmin<{ variants: Array<{ id: string; sku: string; inventory_quantity: number }> }>(
    '/admin/variants?limit=1000&fields=id,sku,inventory_quantity'
  )
  const variantsBySku = new Map(medusaVariants.variants.filter((v) => v.sku).map((v) => [v.sku, v]))
  let synced = 0
  for (const oq of odooQtys) {
    if (!oq.default_code) continue
    const variant = variantsBySku.get(oq.default_code)
    if (!variant) continue
    const newQty = Math.max(0, Math.floor(oq.qty_available))
    if (variant.inventory_quantity === newQty) continue
    try {
      await medusaAdmin(`/admin/variants/${variant.id}`, {
        method: 'POST', body: JSON.stringify({ inventory_quantity: newQty }),
      })
      synced++
    } catch (e) { console.error(`[sync] Inventory update failed for ${variant.id}:`, e) }
  }
  console.log(`[sync] Inventory: synced=${synced} variants`)
}

export interface MedusaOrderPayload {
  id: string
  email: string
  items?: Array<{
    id: string; title: string; quantity: number; unit_price: number
    variant?: { sku?: string }
  }>
  shipping_address?: {
    first_name?: string; last_name?: string; address_1?: string
    address_2?: string; city?: string; postal_code?: string; phone?: string
  }
}

export async function pushOrderToOdoo(medusaOrder: MedusaOrderPayload): Promise<number> {
  if (process.env.SYNC_TO_ODOO !== 'true') return 0
  interface OdooPartner { id: number }
  const partners = await odooSearch<OdooPartner>(
    'res.partner', [['email', '=', medusaOrder.email]], ['id'], 1,
  )
  let partnerId: number
  if (partners.length > 0) {
    partnerId = partners[0].id
  } else {
    partnerId = await odooCreate('res.partner', {
      name: `${medusaOrder.shipping_address?.first_name ?? ''} ${medusaOrder.shipping_address?.last_name ?? ''}`.trim() || medusaOrder.email,
      email: medusaOrder.email,
      phone: medusaOrder.shipping_address?.phone ?? '',
      street: medusaOrder.shipping_address?.address_1 ?? '',
      street2: medusaOrder.shipping_address?.address_2 ?? '',
      city: medusaOrder.shipping_address?.city ?? '',
      zip: medusaOrder.shipping_address?.postal_code ?? '',
      customer_rank: 1,
    })
  }
  const saleOrderId = await odooCreate('sale.order', {
    partner_id: partnerId,
    client_order_ref: medusaOrder.id,
    note: `Medusa order ${medusaOrder.id}`,
    state: 'sale',
  })
  for (const item of medusaOrder.items ?? []) {
    const products = await odooSearch<{ id: number }>(
      'product.product', [['default_code', '=', item.variant?.sku ?? '']], ['id'], 1,
    )
    await odooCreate('sale.order.line', {
      order_id: saleOrderId,
      product_id: products[0]?.id ?? 1,
      product_uom_qty: item.quantity,
      price_unit: item.unit_price / 100,
      name: item.title,
    })
  }
  console.log(`[sync] Pushed Medusa order ${medusaOrder.id} -> Odoo sale.order #${saleOrderId}`)
  return saleOrderId
}

async function runSync(): Promise<void> {
  console.log(`[sync] Starting at ${new Date().toISOString()}`)
  try {
    if (!ODOO_URL || !MEDUSA_URL) {
      console.warn('[sync] ODOO_URL or MEDUSA_URL not set — skipping')
    } else {
      await syncOdooProductsToMedusa()
      await syncInventory()
    }
    console.log(`[sync] Complete at ${new Date().toISOString()}`)
  } catch (e) {
    console.error('[sync] Failed:', e)
  }
}

if (require.main === module) {
  runSync().then(() => {
    if (SYNC_INTERVAL_MS > 0) {
      console.log(`[sync] Next run in ${SYNC_INTERVAL_MS / 1000}s`)
      setInterval(runSync, SYNC_INTERVAL_MS)
    } else {
      process.exit(0)
    }
  }).catch((e) => { console.error('[sync] Fatal:', e); process.exit(1) })
}
