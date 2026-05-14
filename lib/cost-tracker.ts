/**
 * Token + compute cost tracker for PES Supply
 *
 * Tracks every AI inference request:
 *   - Prompt tokens (input)
 *   - Completion tokens (output)
 *   - Latency (ms) — used to estimate compute cost for SGLang
 *   - Total cost in USD
 *
 * Writes to:
 *   1. console.log — always (visible in Vercel runtime logs)
 *   2. Vercel KV    — if KV_REST_API_URL + KV_REST_API_TOKEN are set
 */

export interface TokenUsage {
  promptTokens: number
  completionTokens: number
}

export interface CostBreakdown {
  provider: string
  promptTokens: number
  completionTokens: number
  totalTokens: number
  inputCostUSD: number
  outputCostUSD: number
  computeCostUSD: number
  totalCostUSD: number
  latencyMs: number
}

// Pricing table — USD per 1M tokens
const PRICING: Record<string, { inputPer1M: number; outputPer1M: number }> = {
  sglang: { inputPer1M: 0, outputPer1M: 0 },          // self-hosted, cost is compute
  'github-models': { inputPer1M: 0.15, outputPer1M: 0.60 },
  openai: { inputPer1M: 0.15, outputPer1M: 0.60 },
  fallback: { inputPer1M: 0, outputPer1M: 0 },
}

export function calculateCost(
  provider: string,
  usage: TokenUsage,
  latencyMs: number
): CostBreakdown {
  const pricing = PRICING[provider] ?? { inputPer1M: 0, outputPer1M: 0 }
  const gpuCostPerHour = parseFloat(process.env.RIVEN_GPU_COST_PER_HOUR ?? '0')

  const inputCostUSD = (usage.promptTokens / 1_000_000) * pricing.inputPer1M
  const outputCostUSD = (usage.completionTokens / 1_000_000) * pricing.outputPer1M
  // For SGLang: cost = time on GPU * hourly rate
  const computeCostUSD = provider === 'sglang' && gpuCostPerHour > 0
    ? (latencyMs / 3_600_000) * gpuCostPerHour
    : 0

  const totalCostUSD = inputCostUSD + outputCostUSD + computeCostUSD

  return {
    provider,
    promptTokens: usage.promptTokens,
    completionTokens: usage.completionTokens,
    totalTokens: usage.promptTokens + usage.completionTokens,
    inputCostUSD,
    outputCostUSD,
    computeCostUSD,
    totalCostUSD,
    latencyMs,
  }
}

export async function trackCost(
  cost: CostBreakdown,
  meta: { requestId: string; endpoint: string; tenantId?: string }
): Promise<void> {
  // 1 — Always log to console (shows in Vercel Logs)
  console.log(
    `[token-cost] provider=${cost.provider} ` +
    `in=${cost.promptTokens} out=${cost.completionTokens} total=${cost.totalTokens} ` +
    `api=$${cost.inputCostUSD.toFixed(7)}+$${cost.outputCostUSD.toFixed(7)} ` +
    `compute=$${cost.computeCostUSD.toFixed(7)} ` +
    `TOTAL=$${cost.totalCostUSD.toFixed(7)} ` +
    `latency=${cost.latencyMs}ms req=${meta.requestId}`
  )

  // 2 — Write to Vercel KV if configured
  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN
  if (!kvUrl || !kvToken) return

  const now = new Date()
  const dateKey = now.toISOString().slice(0, 10)
  const monthKey = now.toISOString().slice(0, 7)
  const tenantId = meta.tenantId ?? 'pes-supply'
  const TTL = 60 * 60 * 24 * 30  // 30 days

  const kvSet = async (key: string, incr: number, isFloat = true) => {
    const endpoint = isFloat ? 'incrbyfloat' : 'incrby'
    await fetch(`${kvUrl}/${endpoint}/${encodeURIComponent(key)}/${incr}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${kvToken}` },
    }).catch((e) => console.warn('[token-cost] KV write failed:', e))
  }

  const kvStoreRecord = async () => {
    await fetch(`${kvUrl}/set/${encodeURIComponent(`cost:request:${meta.requestId}`)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${kvToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: JSON.stringify({ ...cost, ...meta, timestamp: now.toISOString() }), ex: TTL }),
    }).catch((e) => console.warn('[token-cost] KV record write failed:', e))
  }

  // Fire all KV writes in parallel — non-blocking
  Promise.all([
    kvStoreRecord(),
    kvSet(`cost:daily:${dateKey}:totalUSD`, cost.totalCostUSD),
    kvSet(`cost:daily:${dateKey}:computeUSD`, cost.computeCostUSD),
    kvSet(`cost:daily:${dateKey}:requests`, 1, false),
    kvSet(`cost:daily:${dateKey}:tokens`, cost.totalTokens, false),
    kvSet(`cost:monthly:${monthKey}:totalUSD`, cost.totalCostUSD),
    kvSet(`cost:monthly:${monthKey}:requests`, 1, false),
    kvSet(`cost:tenant:${tenantId}:daily:${dateKey}:totalUSD`, cost.totalCostUSD),
    kvSet(`cost:tenant:${tenantId}:daily:${dateKey}:requests`, 1, false),
    kvSet(`cost:provider:${cost.provider}:daily:${dateKey}:totalUSD`, cost.totalCostUSD),
    kvSet(`cost:provider:${cost.provider}:daily:${dateKey}:requests`, 1, false),
  ]).catch(() => {}) // Swallow — never block user response
}
