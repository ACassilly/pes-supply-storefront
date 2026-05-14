import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // ── Klaviyo integration (if configured) ──────────────────────────────────
  const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY
  const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID

  if (KLAVIYO_API_KEY && KLAVIYO_LIST_ID) {
    const res = await fetch(
      `https://a.klaviyo.com/api/v2/list/${KLAVIYO_LIST_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        },
        body: JSON.stringify({ profiles: [{ email }] }),
      }
    )
    if (!res.ok) {
      const text = await res.text()
      console.error('Klaviyo subscribe error:', text)
      return NextResponse.json({ error: 'Newsletter signup failed' }, { status: 500 })
    }
    return NextResponse.json({ ok: true })
  }

  // ── Fallback: log + 200 (wire up later) ─────────────────────────────────
  console.log('[newsletter] new subscriber:', email)
  return NextResponse.json({ ok: true })
}
