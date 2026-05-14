import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.medusajs.com' },
      { protocol: 'https', hostname: 'pes-supply-media.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'pes-supply-media.s3.us-east-1.amazonaws.com' },
      { protocol: 'https', hostname: 'cdn.pes.supply' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'logo.clearbit.com' },
      { protocol: 'https', hostname: 'cdn.brandfetch.io' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      { source: '/api/(.*)', headers: [{ key: 'Cache-Control', value: 'no-store' }] },
    ]
  },
  async redirects() {
    return [
      { source: '/pages/about-us', destination: '/about', permanent: true },
      { source: '/pages/contact', destination: '/contact', permanent: true },
      { source: '/pages/powerlink', destination: '/powerlink', permanent: true },
      { source: '/pages/power-link', destination: '/powerlink', permanent: true },
      { source: '/pages/baba-compliance', destination: '/baba', permanent: true },
      { source: '/pages/pro-account', destination: '/pro', permanent: true },
      { source: '/pages/request-a-quote', destination: '/quote', permanent: true },
      { source: '/pages/bulk-discounts', destination: '/bulk', permanent: true },
      { source: '/policies/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/policies/terms-of-service', destination: '/terms', permanent: true },
      { source: '/policies/shipping-policy', destination: '/shipping', permanent: true },
      { source: '/policies/refund-policy', destination: '/returns', permanent: true },
      { source: '/collections', destination: '/departments', permanent: true },
      { source: '/collections/all', destination: '/departments', permanent: true },
      { source: '/collections/:slug', destination: '/departments/:slug', permanent: true },
      { source: '/blogs/news', destination: '/blog', permanent: true },
      { source: '/blogs/news/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/blogs/generators', destination: '/blog', permanent: true },
      { source: '/blogs/generators/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/products/:handle', destination: '/shop/products/:handle', permanent: true },
      { source: '/categories/:handle', destination: '/shop/categories/:handle', permanent: true },
      { source: '/cart', destination: '/shop/cart', permanent: false },
    ]
  },
  experimental: {
    optimizePackageImports: ['@stripe/react-stripe-js'],
  },
}

export default nextConfig
