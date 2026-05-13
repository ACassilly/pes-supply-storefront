#!/bin/bash
# Azure App Service startup script for Node.js 22 / Next.js
# Tells Azure how to start the Next.js app after deployment

export PORT=${PORT:-8080}
export NODE_ENV=production

# Install pnpm if not present
if ! command -v pnpm &> /dev/null; then
  npm install -g pnpm@9
fi

# Install deps if node_modules missing
if [ ! -d node_modules ]; then
  pnpm install --frozen-lockfile --prod
fi

echo "Starting Next.js on port $PORT"
exec node_modules/.bin/next start -p $PORT
