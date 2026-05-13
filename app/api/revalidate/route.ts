import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/revalidate
 * On-demand ISR revalidation triggered by Medusa product/category webhooks.
 *
 * Body: { secret, path?, tag? }
 * GET:  ?secret=...&path=...&tag=...
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { secret, path, tag } = body ?? {}

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }
    if (!path && !tag) {
      return NextResponse.json({ error: 'Provide path or tag' }, { status: 400 })
    }

    const revalidated: string[] = []
    if (path) { revalidatePath(path); revalidated.push(`path:${path}`) }
    if (tag)  { revalidateTag(tag);   revalidated.push(`tag:${tag}`) }

    return NextResponse.json({ revalidated: true, items: revalidated, timestamp: new Date().toISOString() })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Revalidation failed' },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const path   = searchParams.get('path')
  const tag    = searchParams.get('tag')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const revalidated: string[] = []
  if (path) { revalidatePath(path); revalidated.push(`path:${path}`) }
  if (tag)  { revalidateTag(tag);   revalidated.push(`tag:${tag}`) }

  if (!revalidated.length) {
    return NextResponse.json({ error: 'Provide path or tag' }, { status: 400 })
  }

  return NextResponse.json({ revalidated: true, items: revalidated, timestamp: new Date().toISOString() })
}
