import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TopBar } from '@/components/top-bar'
import { Navbar } from '@/components/navbar'
import { SiteFooter } from '@/components/site-footer'
import { CartToastProvider } from '@/components/cart-toast'
import { BackToTop } from '@/components/back-to-top'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const viewport: Viewport = {
  themeColor: '#1a7a3d',
  userScalable: true,
}

export const metadata: Metadata = {
  title: {
    default: 'PES Supply | 169 Brands, 500+ Vendors, 40,000+ Products | A PES Global Company',
    template: '%s | PES Supply',
  },
  description: 'PES Supply (Portlandia Electric Supply) -- the distribution arm of PES Global. 169 brands, 500+ vendors, 40,000+ products across energy, electrical, solar, tools, HVAC, plumbing, and more. Shipping nationwide from Louisville, KY.',
  metadataBase: new URL('https://pes.supply'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PES Supply',
    title: 'PES Supply | 169 Brands, 500+ Vendors, 40,000+ Products',
    description: 'The distribution arm of PES Global. Electrical, solar, lighting, tools, HVAC, plumbing, and more. Same-day shipping. Net-30 terms.',
    images: [{ url: '/images/pes-logo.png', width: 600, height: 600, alt: 'PES Supply' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PES Supply | A PES Global Company',
    description: '169 brands, 500+ vendors, 40,000+ products. Same-day shipping from Louisville, KY.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "PES Supply",
                  legalName: "Portlandia Electric Supply, Inc.",
                  alternateName: "Portlandia Electric Supply",
                  url: "https://pes.supply",
                  logo: "https://pes.supply/images/pes-logo.png",
                  telephone: "+1-888-876-0007",
                  email: "connect@portlandiaelectric.supply",
                  address: { "@type": "PostalAddress", streetAddress: "1507 Portland Ave", addressLocality: "Louisville", addressRegion: "KY", postalCode: "40203", addressCountry: "US" },
                  parentOrganization: { "@type": "Organization", name: "PES Global" },
                  description: "169 brands, 500+ vendors, 40,000+ products across energy, electrical, solar, tools, HVAC, plumbing, and more.",
                },
                {
                  "@type": "WebSite",
                  name: "PES Supply",
                  url: "https://pes.supply",
                  potentialAction: { "@type": "SearchAction", target: "https://pes.supply/search?q={search_term_string}", "query-input": "required name=search_term_string" },
                }
              ],
            }),
          }}
        />
      </head>
      <body className={`${_inter.variable} ${_geistMono.variable} font-sans antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          Skip to main content
        </a>
        <TopBar />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <SiteFooter />
        <CartToastProvider />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  )
}
