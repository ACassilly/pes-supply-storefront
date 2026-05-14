import { NextRequest, NextResponse } from "next/server"

/**
 * GET /api/costs?period=daily&key=2026-05-14
 * GET /api/costs?period=monthly&key=2026-05
 *
 * Returns cost summary from Vercel KV.
 * Protected by COST_DASHBOARD_SECRET header.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.COST_DASHBOARD_SECRET
  if (secret && req.headers.get('x-dashboard-secret') !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const period = (searchParams.get('period') ?? 'daily') as 'daily' | 'monthly'
  const key = searchParams.get('key') ?? new Date().toISOString().slice(0, period === 'daily' ? 10 : 7)

  try {
    const kv = await getKV()
    if (!kv) {
      return NextResponse.json({ error: 'KV not configured', tip: 'Set KV_REST_API_URL and KV_REST_API_TOKEN' }, { status: 503 })
    }

    const providers = ['sglang', 'github-models', 'openai', 'fallback']
    const prefix = `cost:${period}:${key}`

    const keys = [
      `${prefix}:totalUSD`,
      `${prefix}:computeUSD`,
      `${prefix}:requests`,
      ...providers.flatMap((p) => [
        `cost:provider:${p}:${period}:${key}:totalUSD`,
        `cost:provider:${p}:${period}:${key}:requests`,
      ]),
    ]

    const values = await kv.mget(...keys)
    const [totalUSD, computeUSD, requests, ...providerData] = values

    const total = parseFloat(totalUSD ?? '0')
    const compute = parseFloat(computeUSD ?? '0')
    const reqs = parseInt(requests ?? '0', 10)

    const byProvider: Record<string, { costUSD: number; requests: number }> = {}
    providers.forEach((p, i) => {
      byProvider[p] = {
        costUSD: parseFloat(providerData[i * 2] ?? '0'),
        requests: parseInt(providerData[i * 2 + 1] ?? '0', 10),
      }
    })

    return NextResponse.json({
      period: key,
      totalCostUSD: total,
      computeCostUSD: compute,
      apiCostUSD: parseFloat((total - compute).toFixed(8)),
      requests: reqs,
      avgCostPerRequest: reqs > 0 ? parseFloat((total / reqs).toFixed(8)) : 0,
      byProvider,
      meta: {
        gpuCostPerHour: parseFloat(process.env.RIVEN_GPU_COST_PER_HOUR ?? '0'),
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('[costs] Error reading KV:', err)
    return NextResponse.json({ error: 'Failed to read cost data' }, { status: 500 })
  }
}

async function getKV() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null

  return {
    mget: async (...keys: string[]) => {
      const res = await fetch(`${url}/mget/${keys.join('/')}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`KV mget failed: ${res.status}`)
      const data = await res.json()
      return data.result as Array<string | null>
    },
  }
}
