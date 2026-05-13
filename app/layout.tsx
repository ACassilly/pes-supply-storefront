import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CartProvider } from '@/lib/commerce/cart-context'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'PES Supply',
    template: '%s | PES Supply',
  },
  description: 'Professional equipment supply — powered by Medusa',
  metadataBase: new URL('https://pes.supply'),
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    siteName: 'PES Supply',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
