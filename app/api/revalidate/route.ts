import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * POST /api/revalidate
 * On-demand ISR revalidation endpoint.
 * Called by Medusa webhooks (product.updated, inventory.updated) and Odoo sync.
 *
 * Headers: x-revalidate-secret: <REVALIDATE_SECRET env var>
 * Body: { type: 'product'|'category'|'all', handle?: string }
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { type?: string; handle?: string } = {}
  try { body = await req.json() } catch { /* empty body is fine */ }

  const { type = 'all', handle } = body

  if (type === 'product' && handle) {
    revalidatePath(`/products/${handle}`)
    revalidateTag('products')
  } else if (type === 'category' && handle) {
    revalidatePath(`/categories/${handle}`)
    revalidateTag('categories')
  } else {
    revalidatePath('/', 'layout')
    revalidateTag('products')
    revalidateTag('categories')
    revalidateTag('cart')
  }

  return NextResponse.json({
    revalidated: true,
    type,
    handle: handle ?? 'all',
    timestamp: new Date().toISOString(),
  })
}
