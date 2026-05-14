import { NextRequest, NextResponse } from "next/server"

/**
 * PES Supply Chat API
 *
 * Provider priority (set env vars to activate):
 *   1. Riven SGLang Ultra  — RIVEN_SGLANG_URL + RIVEN_SGLANG_API_KEY
 *   2. GitHub Models       — GITHUB_TOKEN (billed through GitHub)
 *   3. Static fallback     — always safe, never breaks build
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

Key pages:
- Shop: /shop
- Categories: /shop/categories
- Bulk orders: /bulk
- Pro accounts: /pro
- Quote requests: /quote
- Contact: /contact
- Returns: /returns
- Account: /account
- Deals: /deals
- Brands: /brands`

const STATIC_FALLBACK =
  "Hi! I'm the PES Supply assistant. Our AI chat is warming up — please try again in a moment, or visit our [contact page](/contact) for immediate help."

async function callSGLang(messages: Array<{ role: string; content: string }>): Promise<string> {
  const baseUrl = process.env.RIVEN_SGLANG_URL
  const apiKey = process.env.RIVEN_SGLANG_API_KEY
  const model = process.env.RIVEN_SGLANG_MODEL ?? "default"

  if (!baseUrl || !apiKey) throw new Error("SGLang not configured")

  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-20)],
      max_tokens: 600,
      temperature: 0.7,
      stream: false,
    }),
  })

  if (!res.ok) throw new Error(`SGLang ${res.status}: ${await res.text()}`)
  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error("SGLang empty response")
  return content
}

async function callGitHubModels(messages: Array<{ role: string; content: string }>): Promise<string> {
  const token = process.env.GITHUB_TOKEN
  const model = process.env.GITHUB_MODELS_MODEL ?? "gpt-4o-mini"

  if (!token) throw new Error("GITHUB_TOKEN not configured")

  const res = await fetch("https://models.inference.ai.azure.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-20)],
      max_tokens: 600,
      temperature: 0.7,
    }),
  })

  if (!res.ok) throw new Error(`GitHub Models ${res.status}: ${await res.text()}`)
  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error("GitHub Models empty response")
  return content
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    let content: string = STATIC_FALLBACK
    let provider = "fallback"

    // 1 — Riven SGLang Ultra (primary)
    if (process.env.RIVEN_SGLANG_URL && process.env.RIVEN_SGLANG_API_KEY) {
      try {
        content = await callSGLang(messages)
        provider = "sglang"
      } catch (err) {
        console.warn("[chat] SGLang failed, trying GitHub Models:", err)
      }
    }

    // 2 — GitHub Models billing fallback
    if (provider === "fallback" && process.env.GITHUB_TOKEN) {
      try {
        content = await callGitHubModels(messages)
        provider = "github-models"
      } catch (err) {
        console.warn("[chat] GitHub Models failed, using static fallback:", err)
      }
    }

    // 3 — Static fallback (always safe)
    if (provider === "fallback") {
      console.warn("[chat] No AI provider available — serving static fallback")
    }

    return NextResponse.json(
      { role: "assistant", content },
      {
        headers: {
          "X-AI-Provider": provider,
        },
      }
    )
  } catch (error) {
    console.error("[chat] Unexpected error:", error)
    return NextResponse.json(
      { role: "assistant", content: STATIC_FALLBACK },
      { status: 200 }
    )
  }
}
