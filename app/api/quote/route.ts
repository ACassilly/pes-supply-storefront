import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, company, phone, items, message } = body

  if (!name || !email || !items) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // ── Push to Odoo as a sale.order quotation ────────────────────────────────
  const ODOO_URL = process.env.ODOO_URL
  const ODOO_DB = process.env.ODOO_DB
  const ODOO_API_KEY = process.env.ODOO_API_KEY
  const ODOO_UID = parseInt(process.env.ODOO_UID ?? '1')

  if (ODOO_URL && ODOO_DB && ODOO_API_KEY) {
    try {
      await fetch(`${ODOO_URL}/web/dataset/call_kw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'call',
          params: {
            model: 'sale.order',
            method: 'create',
            args: [{
              partner_id: 1, // will be resolved by Odoo partner lookup in prod
              note: `Quote request from ${name} (${company ?? ''}) | ${email} | ${phone ?? ''} | ${message ?? ''}`,
              order_line: items.map((item: { sku: string; qty: number }) => [
                0, 0, { product_id: 1, product_uom_qty: item.qty, name: item.sku },
              ]),
            }],
            kwargs: {},
          },
        }),
      })
    } catch (err) {
      console.error('[quote] Odoo push failed:', err)
    }
  }

  // ── Send confirmation email via Resend ────────────────────────────────────
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (RESEND_API_KEY) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'quotes@pes.supply',
        to: [email, 'sales@pes.supply'],
        subject: `Quote Request from ${name}`,
        html: `<p>Hi ${name},</p><p>We received your quote request and will respond within 1 business day.</p><p><strong>Items:</strong> ${JSON.stringify(items)}</p><p>${message ?? ''}</p>`,
      }),
    })
  }

  return NextResponse.json({ ok: true })
}
