#!/bin/bash
# ============================================================================
# Medusa v2 Backend Bootstrap for pes.supply
# Run inside Codespace OR on the Azure VM (separate container/VM if available)
# ============================================================================
set -e

MEDUSA_DIR="$HOME/medusa-pes-supply"

echo "=== Launching Medusa backend for pes.supply ==="

# ── Prerequisites
if ! command -v npx &> /dev/null; then
  echo "Error: Node/npx not found. Install Node 22 first."
  exit 1
fi

# ── 1. Scaffold new Medusa v2 project (skip if already exists)
if [ ! -d "$MEDUSA_DIR" ]; then
  echo "[1/4] Scaffolding Medusa v2 backend..."
  npx create-medusa-app@latest pes-supply-backend \
    --no-browser \
    --db-url "${MEDUSA_DB_URL:-postgresql://medusa:medusa@localhost:5432/medusa_pes}" \
    --directory $MEDUSA_DIR
else
  echo "[1/4] Medusa directory already exists at $MEDUSA_DIR, skipping scaffold."
fi

cd $MEDUSA_DIR

# ── 2. Copy environment template
if [ ! -f .env ]; then
  cp .env.template .env 2>/dev/null || touch .env
  echo "[2/4] .env created – fill in JWT_SECRET, COOKIE_SECRET, DATABASE_URL"
fi

# ── 3. Run migrations
echo "[3/4] Running Medusa migrations..."
npm run migration:run 2>/dev/null || npx medusa db:migrate || echo "ℹ️  Migrations skipped (DB may not be reachable yet)"

# ── 4. Get publishable key
echo "[4/4] Fetching publishable API key..."
npx medusa key:publishable:list 2>/dev/null || echo "ℹ️  Start Medusa first then run: npx medusa key:publishable:list"

echo ""
echo "✅ Medusa setup complete."
echo "   Start backend : cd $MEDUSA_DIR && npm run dev"
echo "   Admin UI      : http://localhost:9000/app"
echo "   API           : http://localhost:9000"
echo ""
echo "   After getting your publishable key, add to .env.local:"
echo "   NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000"
echo "   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_..."
echo "   COMMERCE_PROVIDER=medusa"
