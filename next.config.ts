import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.medusajs.com' },
      { protocol: 'https', hostname: 'pes-supply-media.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'pes-supply-media.s3.us-east-1.amazonaws.com' },
      { protocol: 'https', hostname: 'cdn.pes.supply' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
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
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/products/:handle', destination: '/shop/products/:handle', permanent: true },
      { source: '/categories/:handle', destination: '/shop/categories/:handle', permanent: true },
      { source: '/cart', destination: '/shop/cart', permanent: true },
    ]
  },
  experimental: {
    optimizePackageImports: ['@stripe/react-stripe-js'],
  },
}

export default nextConfig
