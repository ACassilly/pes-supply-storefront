import { NextResponse } from 'next/server'

/**
 * GET /api/health
 * Returns JSON health status for Medusa backend, Odoo, and the storefront itself.
 * Used by GitHub Actions health checks, Cloudflare health monitors, and uptime tools.
 */
export async function GET() {
  const start = Date.now()
  const checks: Record<string, { status: string; latencyMs?: number; error?: string }> = {}

  // Medusa backend
  const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
  if (medusaUrl) {
    try {
      const t = Date.now()
      const res = await fetch(`${medusaUrl}/health`, { next: { revalidate: 0 } })
      checks.medusa = { status: res.ok ? 'ok' : 'degraded', latencyMs: Date.now() - t }
    } catch (e: unknown) {
      checks.medusa = { status: 'error', error: e instanceof Error ? e.message : String(e) }
    }
  } else {
    checks.medusa = { status: 'not_configured' }
  }

  // Odoo ERP
  const odooUrl = process.env.ODOO_URL
  if (odooUrl) {
    try {
      const t = Date.now()
      const res = await fetch(`${odooUrl}/web/health`, { next: { revalidate: 0 } })
      checks.odoo = { status: res.ok ? 'ok' : 'degraded', latencyMs: Date.now() - t }
    } catch (e: unknown) {
      checks.odoo = { status: 'error', error: e instanceof Error ? e.message : String(e) }
    }
  } else {
    checks.odoo = { status: 'not_configured' }
  }

  const allOk = Object.values(checks).every(
    (c) => c.status === 'ok' || c.status === 'not_configured',
  )

  return NextResponse.json(
    {
      status: allOk ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptimeMs: Date.now() - start,
      version: process.env.NEXT_PUBLIC_APP_VERSION ?? 'dev',
      checks,
    },
    { status: allOk ? 200 : 207 },
  )
}
