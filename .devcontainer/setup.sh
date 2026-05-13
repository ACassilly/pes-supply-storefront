#!/bin/bash
# pes-supply-storefront Codespace bootstrap
# Mirrors the canonical Azure infra pattern used for portlandialogistics.com
set -e

echo "=== PES Supply – Codespace Setup ==="

# ── 1. Install pnpm (if not already present)
if ! command -v pnpm &> /dev/null; then
  npm install -g pnpm@latest
fi

# ── 2. Install project dependencies
pnpm install

# ── 3. Generate .env.local from example if not already present
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "📋 .env.local created from .env.example – fill in your secrets before running pnpm dev"
fi

# ── 4. Medusa backend (optional – only if MEDUSA_BACKEND_URL not already set)
if [ -z "$NEXT_PUBLIC_MEDUSA_BACKEND_URL" ]; then
  echo "ℹ️  NEXT_PUBLIC_MEDUSA_BACKEND_URL not set."
  echo "    To spin up a local Medusa backend:"
  echo "    → npx create-medusa-app@latest --no-browser --db-url \"postgres://medusa:medusa@localhost:5432/medusa\""
  echo "    Then add to .env.local:"
  echo "    NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000"
  echo "    NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<your-publishable-key>"
  echo "    COMMERCE_PROVIDER=medusa"
fi

echo ""
echo "✅ Setup complete. Start the storefront with: pnpm dev"
