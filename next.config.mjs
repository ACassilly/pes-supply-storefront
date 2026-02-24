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
    ],
  },
}

export default nextConfig
