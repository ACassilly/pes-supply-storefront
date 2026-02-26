/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "logo.clearbit.com" },
      { hostname: "cdn.brandfetch.io" },
      { hostname: "cdn.shopify.com" },
    ],
  },
}

export default nextConfig
