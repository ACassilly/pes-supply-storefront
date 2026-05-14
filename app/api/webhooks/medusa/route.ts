import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

const MEDUSA_WEBHOOK_SECRET = process.env.MEDUSA_WEBHOOK_SECRET ?? ''

export async function POST(req: NextRequest) {
  // Optional HMAC verification (set MEDUSA_WEBHOOK_SECRET in env)
  if (MEDUSA_WEBHOOK_SECRET) {
    const sig = req.headers.get('x-medusa-signature') ?? ''
    if (sig !== MEDUSA_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let body: { event?: string; data?: { handle?: string; id?: string } }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { event, data } = body
  console.log('[medusa webhook]', event, data?.id)

  switch (event) {
    case 'product.created':
    case 'product.updated':
    case 'product.deleted': {
      if (data?.handle) {
        revalidatePath(`/shop/products/${data.handle}`)
      }
      revalidatePath('/shop')
      revalidateTag('products')
      break
    }
    case 'product_category.created':
    case 'product_category.updated':
    case 'product_category.deleted': {
      revalidatePath('/shop/categories')
      revalidateTag('categories')
      break
    }
    case 'order.placed': {
      // Forward to Odoo via sync script (fire-and-forget)
      if (process.env.ODOO_URL && data?.id) {
        fetch(`${process.env.ODOO_URL}/api/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': process.env.ODOO_API_KEY ?? '',
          },
          body: JSON.stringify({ medusa_order_id: data.id }),
        }).catch((err) => console.error('[medusa webhook] odoo forward error', err))
      }
      break
    }
    default:
      break
  }

  return NextResponse.json({ ok: true })
}
