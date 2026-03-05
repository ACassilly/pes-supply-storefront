import { NextRequest, NextResponse } from "next/server"
import {
  createCart,
  getCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
} from "@/lib/shopify"

// GET /api/cart?cartId=...
export async function GET(req: NextRequest) {
  const cartId = req.nextUrl.searchParams.get("cartId")
  if (!cartId) {
    return NextResponse.json({ cart: null })
  }
  try {
    const cart = await getCart(cartId)
    return NextResponse.json({ cart })
  } catch (e) {
    console.error("[api/cart] GET error:", e)
    return NextResponse.json({ cart: null })
  }
}

// POST /api/cart - create cart or add/update/remove lines
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action, cartId, lines, lineIds } = body
    console.log("[v0] /api/cart POST:", { action, cartId, lines, lineIds })

    if (action === "create") {
      console.log("[v0] Creating cart...")
      const cart = await createCart()
      console.log("[v0] Cart created:", cart?.id)
      return NextResponse.json({ cart })
    }

    if (action === "add" && cartId && lines) {
      console.log("[v0] Adding lines to cart:", cartId, lines)
      const cart = await addCartLines(cartId, lines)
      console.log("[v0] Lines added, cart lines:", cart?.lines?.edges?.length)
      return NextResponse.json({ cart })
    }

    if (action === "update" && cartId && lines) {
      const cart = await updateCartLines(cartId, lines)
      return NextResponse.json({ cart })
    }

    if (action === "remove" && cartId && lineIds) {
      const cart = await removeCartLines(cartId, lineIds)
      return NextResponse.json({ cart })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (e: any) {
    console.error("[api/cart] POST error:", e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
