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
  async redirects() {
    return [
      // Shopify /pages/* -> our routes
      { source: "/pages/about-us", destination: "/about", permanent: true },
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/powerlink", destination: "/powerlink", permanent: true },
      { source: "/pages/power-link", destination: "/powerlink", permanent: true },
      { source: "/pages/baba-compliance", destination: "/baba", permanent: true },
      { source: "/pages/pro-account", destination: "/pro", permanent: true },
      { source: "/pages/request-a-quote", destination: "/quote", permanent: true },
      { source: "/pages/bulk-discounts", destination: "/bulk", permanent: true },
      // Shopify /policies/* -> our routes
      { source: "/policies/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/policies/terms-of-service", destination: "/terms", permanent: true },
      { source: "/policies/shipping-policy", destination: "/shipping", permanent: true },
      { source: "/policies/refund-policy", destination: "/returns", permanent: true },
      // Shopify /collections -> /departments
      { source: "/collections", destination: "/departments", permanent: true },
      { source: "/collections/all", destination: "/departments", permanent: true },
      { source: "/collections/:slug", destination: "/departments/:slug", permanent: true },
      // Shopify /blogs/* -> /blog
      { source: "/blogs/news", destination: "/blog", permanent: true },
      { source: "/blogs/news/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/blogs/generators", destination: "/blog", permanent: true },
      { source: "/blogs/generators/:slug", destination: "/blog/:slug", permanent: true },
      // Shopify /cart -> home (we use a flyout)
      { source: "/cart", destination: "/", permanent: false },
    ]
  },
}

export default nextConfig
