import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = ['/account', '/account/orders']
const ADMIN_ROUTES = ['/admin']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ── Auth guard for /account routes ────────────────────────────────────────────
  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    const token = req.cookies.get('medusa_token')?.value
    if (!token) {
      const url = req.nextUrl.clone()
      url.pathname = '/account'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  // ── Block direct access to Medusa admin in production ─────────────────────────
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    const ip = req.headers.get('x-forwarded-for') ?? ''
    const ALLOWED_ADMIN_IPS = (process.env.ALLOWED_ADMIN_IPS ?? '').split(',')
    const isProd = process.env.NODE_ENV === 'production'
    if (isProd && ALLOWED_ADMIN_IPS.length > 0 && !ALLOWED_ADMIN_IPS.some((a) => ip.startsWith(a.trim()))) {
      return new NextResponse('Forbidden', { status: 403 })
    }
  }

  // ── Geo-redirect: residential visitors → suggest residential partner ───────────────
  // (only fires on homepage, non-bot, no cookie already set)
  if (pathname === '/') {
    const segment = req.cookies.get('customer_segment')?.value
    if (!segment) {
      // Let the page handle segment detection via ResidentialRedirect component
      const res = NextResponse.next()
      return res
    }
  }

  // ── Security headers on all responses ────────────────────────────────────────────
  const res = NextResponse.next()
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self)'
  )
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)).*)',
  ],
}
