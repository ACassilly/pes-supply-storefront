import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || 'https://pes.supply,http://localhost:3000',
      adminCors: process.env.ADMIN_CORS || 'https://api.pes.supply,http://localhost:9000',
      authCors: process.env.AUTH_CORS || 'https://pes.supply,http://localhost:3000',
      jwtSecret: process.env.JWT_SECRET || 'supersecret-change-in-production',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret-change-in-production',
    },
  },
  admin: {
    // Serve Medusa admin at /app on api.pes.supply
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'https://api.pes.supply',
    path: '/app',
    disable: process.env.DISABLE_MEDUSA_ADMIN === 'true',
  },
  modules: [
    // ── Stripe Payment Provider
    {
      resolve: '@medusajs/payment-stripe',
      options: {
        apiKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        capture: false, // Authorize only; capture on fulfillment
        automatic_payment_methods: true,
      },
    },
    // ── File storage (local for dev, S3/R2 for prod)
    {
      resolve: process.env.MEDUSA_FILE_PROVIDER === 's3'
        ? '@medusajs/file-s3'
        : '@medusajs/file-local',
      options: process.env.MEDUSA_FILE_PROVIDER === 's3'
        ? {
            file_url: process.env.S3_FILE_URL,
            access_key_id: process.env.S3_ACCESS_KEY_ID,
            secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
            region: process.env.S3_REGION || 'us-east-1',
            bucket: process.env.S3_BUCKET,
            endpoint: process.env.S3_ENDPOINT, // For R2/Cloudflare
          }
        : { upload_dir: 'uploads', backend_url: process.env.MEDUSA_BACKEND_URL },
    },
    // ── SendGrid email (optional — remove if using another provider)
    ...(process.env.SENDGRID_API_KEY ? [{
      resolve: '@medusajs/notification-sendgrid',
      options: {
        channels: ['email'],
        api_key: process.env.SENDGRID_API_KEY,
        from: process.env.SENDGRID_FROM || 'orders@pes.supply',
      },
    }] : []),
  ],
})
