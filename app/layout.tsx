import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CartProvider } from '@/lib/commerce/cart-context'
import { ChatWidgetLoader } from '@/components/chat-widget-loader'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pes.supply'
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ''
const IS_PROD = SITE_URL === 'https://pes.supply'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PES Supply | Professional Equipment & Electrical Supply',
    template: '%s | PES Supply',
  },
  description:
    'PES Supply — B2B electrical, industrial & safety equipment. BABA-compliant, bulk pricing, PowerLink program. Order online or request a quote.',
  keywords: [
    'electrical supply',
    'industrial supply',
    'B2B equipment',
    'BABA compliant',
    'bulk electrical',
    'safety equipment',
    'PES Supply',
  ],
  authors: [{ name: 'PES Supply', url: SITE_URL }],
  creator: 'PES Supply',
  publisher: 'PES Supply',
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'PES Supply',
    title: 'PES Supply | Professional Equipment & Electrical Supply',
    description:
      'B2B electrical, industrial & safety equipment. BABA-compliant, bulk pricing, PowerLink program.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'PES Supply — Professional Equipment Supply',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pessupply',
    title: 'PES Supply | Professional Equipment & Electrical Supply',
    description:
      'B2B electrical, industrial & safety equipment. BABA-compliant, bulk pricing, PowerLink program.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: IS_PROD,
    follow: IS_PROD,
    googleBot: {
      index: IS_PROD,
      follow: IS_PROD,
    },
  },
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PES Supply',
  url: 'https://pes.supply',
  logo: 'https://pes.supply/logo.png',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
      url: 'https://pes.supply/contact',
    },
  ],
  sameAs: [],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/* GA4 direct (only when no GTM, avoids double-counting) */}
        {GA_ID && !GTM_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </head>
      <body>
        {/* GTM noscript */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <CartProvider>
          {children}
        </CartProvider>

        {/* Chat widget — floats bottom-right on every page */}
        <ChatWidgetLoader />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
