import { defineConfig, loadEnv } from '@medusajs/utils'

const { env } = loadEnv('production', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: env.DATABASE_URL,
    redisUrl: env.REDIS_URL,
    http: {
      storeCors: env.STORE_CORS ?? 'https://pes.supply',
      adminCors: env.ADMIN_CORS ?? 'https://admin.pes.supply',
      authCors: env.AUTH_CORS ?? 'https://pes.supply',
      jwtSecret: env.JWT_SECRET,
      cookieSecret: env.COOKIE_SECRET,
    },
  },
  modules: [
    {
      resolve: '@medusajs/medusa/cache-redis',
      options: { redisUrl: env.REDIS_URL },
    },
    {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: { redisUrl: env.REDIS_URL },
    },
    {
      resolve: '@medusajs/medusa/payment-stripe',
      options: {
        apiKey: env.STRIPE_SECRET_KEY,
        webhookSecret: env.STRIPE_WEBHOOK_SECRET,
        capture: true,
      },
    },
    {
      resolve: '@medusajs/medusa/file-s3',
      options: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
        region: env.S3_REGION ?? 'us-east-1',
        bucketName: env.S3_BUCKET,
        endpoint: env.S3_ENDPOINT,
      },
    },
  ],
  admin: {
    backendUrl: env.MEDUSA_BACKEND_URL ?? 'https://api.pes.supply',
    disable: process.env.NODE_ENV === 'production',
  },
})
