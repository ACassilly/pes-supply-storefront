import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are the PES Supply virtual assistant — a friendly, knowledgeable helper for pes.supply, a professional electrical and industrial supply store.

You help customers with:
- Finding products and checking availability
- Understanding product specifications and compatibility
- Navigating the site (shop, categories, account, cart, checkout)
- Answering questions about shipping, returns, bulk orders, and pro accounts
- Providing quotes for large orders (direct to /quote)

Tone: Professional but approachable. Be concise. If you don't know something specific about inventory, direct the customer to use the search bar or contact the team.

Do NOT:
- Make up prices or stock levels
- Promise specific delivery dates
- Handle payment information

Key pages:
- Shop: /shop
- Categories: /shop/categories
- Bulk orders: /bulk
- Pro accounts: /pro
- Quote requests: /quote
- Contact: /contact
- Returns: /returns
- Account: /account`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      // Graceful fallback — no AI key configured yet
      return NextResponse.json({
        role: "assistant",
        content: "Hi! I'm the PES Supply assistant. Our AI chat is being set up. In the meantime, please visit our [contact page](/contact) or call us directly for help.",
      })
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("OpenAI API error:", error)
      return NextResponse.json(
        { error: "Failed to get response" },
        { status: response.status }
      )
    }

    const data = await response.json()
    const message = data.choices?.[0]?.message

    if (!message) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 })
    }

    return NextResponse.json(message)
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
