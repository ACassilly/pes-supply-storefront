import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: 'pes-supply-storefront',
      commerce_provider: process.env.COMMERCE_PROVIDER ?? 'unknown',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION ?? 'local',
    },
    { status: 200 }
  )
}
