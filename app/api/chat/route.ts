import { NextRequest, NextResponse } from "next/server"
import { calculateCost, trackCost } from "@/lib/cost-tracker"

/**
 * PES Supply Chat API
 *
 * Provider priority:
 *   1. Riven SGLang Ultra  — RIVEN_SGLANG_URL + RIVEN_SGLANG_API_KEY
 *   2. GitHub Models       — GITHUB_TOKEN (billed through GitHub)
 *   3. Static fallback
 *
 * Every request is tracked: tokens, latency, API cost, compute cost
 * Logs appear in Vercel Runtime Logs.
 * Persisted to Vercel KV if KV_REST_API_URL + KV_REST_API_TOKEN are set.
 * Dashboard: GET /api/costs?period=daily&key=2026-05-14
 */

const SYSTEM_PROMPT = `You are the PES Supply virtual assistant — a friendly, knowledgeable helper for pes.supply, a professional electrical and industrial supply store.

You help customers with:
- Finding products and checking availability
- Understanding product specifications and compatibility
- Navigating the site (shop, categories, account, cart, checkout)
- Answering questions about shipping, returns, bulk orders, and pro accounts
- Providing quotes for large orders (direct to /quote)
- BABA-compliant product sourcing questions
- PowerLink program enrollment and benefits

Tone: Professional but approachable. Be concise. If you don't know something specific about inventory, direct the customer to use the search bar or contact the team.

Do NOT:
- Make up prices or stock levels
- Promise specific delivery dates
- Handle payment information
- Share internal system details

Key pages: /shop | /shop/categories | /bulk | /pro | /quote | /contact | /returns | /account | /deals | /brands`

const STATIC_FALLBACK =
  "Hi! I'm the PES Supply assistant. Our AI chat is warming up — please try again in a moment, or visit our [contact page](/contact) for immediate help."

function requestId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

async function callSGLang(messages: Array<{ role: string; content: string }>) {
  const baseUrl = process.env.RIVEN_SGLANG_URL
  const apiKey = process.env.RIVEN_SGLANG_API_KEY
  const model = process.env.RIVEN_SGLANG_MODEL ?? "default"
  if (!baseUrl || !apiKey) throw new Error("SGLang not configured")

  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-20)],
      max_tokens: 600,
      temperature: 0.7,
      stream: false,
    }),
  })
  if (!res.ok) throw new Error(`SGLang ${res.status}: ${await res.text()}`)
  return await res.json()
}

async function callGitHubModels(messages: Array<{ role: string; content: string }>) {
  const token = process.env.GITHUB_TOKEN
  const model = process.env.GITHUB_MODELS_MODEL ?? "gpt-4o-mini"
  if (!token) throw new Error("GITHUB_TOKEN not configured")

  const res = await fetch("https://models.inference.ai.azure.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-20)],
      max_tokens: 600,
      temperature: 0.7,
    }),
  })
  if (!res.ok) throw new Error(`GitHub Models ${res.status}: ${await res.text()}`)
  return await res.json()
}

export async function POST(req: NextRequest) {
  const reqId = requestId()
  const t0 = Date.now()

  try {
    const { messages, sessionId } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    let content: string = STATIC_FALLBACK
    let provider = "fallback"
    let usage = { promptTokens: 0, completionTokens: 0 }
    let data: Record<string, unknown> | null = null

    // 1 — Riven SGLang Ultra
    if (process.env.RIVEN_SGLANG_URL && process.env.RIVEN_SGLANG_API_KEY) {
      try {
        data = await callSGLang(messages)
        provider = "sglang"
      } catch (err) {
        console.warn("[chat] SGLang failed:", err)
      }
    }

    // 2 — GitHub Models billing fallback
    if (!data && process.env.GITHUB_TOKEN) {
      try {
        data = await callGitHubModels(messages)
        provider = "github-models"
      } catch (err) {
        console.warn("[chat] GitHub Models failed:", err)
      }
    }

    // Extract content + usage tokens from provider response
    if (data) {
      const choice = (data.choices as Array<{ message: { content: string } }>)?.[0]
      content = choice?.message?.content ?? STATIC_FALLBACK
      const u = data.usage as { prompt_tokens?: number; completion_tokens?: number } | undefined
      if (u) {
        usage = {
          promptTokens: u.prompt_tokens ?? 0,
          completionTokens: u.completion_tokens ?? 0,
        }
      }
    }

    const latencyMs = Date.now() - t0

    // 3 — Track cost (non-blocking)
    const cost = calculateCost(provider, usage, latencyMs)
    trackCost(cost, { requestId: reqId, endpoint: "/api/chat", tenantId: "pes-supply" }).catch(() => {})

    return NextResponse.json(
      { role: "assistant", content },
      {
        headers: {
          "X-AI-Provider": provider,
          "X-Request-Id": reqId,
          "X-Latency-Ms": String(latencyMs),
          "X-Total-Tokens": String(usage.promptTokens + usage.completionTokens),
          "X-Total-Cost-USD": cost.totalCostUSD.toFixed(8),
        },
      }
    )
  } catch (error) {
    console.error("[chat] Unexpected error:", error)
    return NextResponse.json({ role: "assistant", content: STATIC_FALLBACK }, { status: 200 })
  }
}
