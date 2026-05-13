#!/bin/bash
# ============================================================================
# PES Supply Codespace Bootstrap
# Runs automatically on Codespace creation (postCreateCommand)
# What it does:
#   1. Installs pnpm + project deps
#   2. Creates .env.local from .env.example
#   3. Waits for Postgres to be ready
#   4. Scaffolds Medusa v2 backend (skips if already exists)
#   5. Runs Medusa DB migrations
#   6. Extracts + writes publishable key to .env.local
# ============================================================================
set -e

PESSTOREFRONT_DIR="$(pwd)"
MEDUSA_DIR="$HOME/medusa-pes-supply"
DB_URL="${MEDUSA_DB_URL:-postgresql://postgres:medusa@localhost:5432/medusa_pes}"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  PES Supply – Codespace Auto-Bootstrap           ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── 1. pnpm
if ! command -v pnpm &> /dev/null; then
  echo "[1/6] Installing pnpm..."
  npm install -g pnpm@latest
else
  echo "[1/6] pnpm $(pnpm --version) already installed."
fi

# ── 2. Storefront deps
echo "[2/6] Installing storefront dependencies..."
pnpm install

# ── 3. .env.local
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "[3/6] .env.local created from .env.example"
else
  echo "[3/6] .env.local already exists – skipping copy"
fi

# ── 4. Wait for Postgres (max 30s)
echo "[4/6] Waiting for PostgreSQL..."
for i in $(seq 1 30); do
  if pg_isready -h localhost -U postgres -q 2>/dev/null; then
    echo "      PostgreSQL ready after ${i}s"
    break
  fi
  sleep 1
done

# Create medusa DB + user if needed
psql -h localhost -U postgres -c "CREATE USER medusa WITH PASSWORD 'medusa';" 2>/dev/null || true
psql -h localhost -U postgres -c "CREATE DATABASE medusa_pes OWNER medusa;" 2>/dev/null || true
psql -h localhost -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE medusa_pes TO medusa;" 2>/dev/null || true

# ── 5. Scaffold Medusa v2 backend
if [ ! -d "$MEDUSA_DIR" ]; then
  echo "[5/6] Scaffolding Medusa v2 backend..."
  cd $HOME
  npx create-medusa-app@latest pes-supply-backend \
    --no-browser \
    --db-url "$DB_URL" \
    --directory medusa-pes-supply \
    --skip-db 2>&1 | tail -20
  cd $PESSTOREFRONT_DIR
else
  echo "[5/6] Medusa already scaffolded at $MEDUSA_DIR – skipping."
fi

# ── 6. Migrations + publishable key
cd "$MEDUSA_DIR"

# Write Medusa .env if missing
if [ ! -f .env ]; then
  cat > .env <<MEDUSAENV
DATABASE_URL=${DB_URL}
JWT_SECRET=supersecret-pes-supply-jwt-$(openssl rand -hex 16)
COOKIE_SECRET=supersecret-pes-supply-cookie-$(openssl rand -hex 16)
MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSAENV
  echo "[6a] Medusa .env written"
fi

echo "[6b] Running Medusa DB migrations..."
npm run migration:run 2>/dev/null || npx medusa db:migrate 2>/dev/null || echo "  ⚠️  Migrations need DB – run manually: cd ~/medusa-pes-supply && npx medusa db:migrate"

# Seed admin + extract publishable key
echo "[6c] Seeding Medusa admin (first-run)..."
npx medusa user -e admin@pes.supply -p PESAdmin2026! 2>/dev/null || true

# Start Medusa briefly to extract publishable key
echo "[6d] Starting Medusa briefly to extract publishable key..."
npm run dev &
MEDUSA_PID=$!
sleep 20

PUB_KEY=$(curl -s http://localhost:9000/store/publishable-api-keys 2>/dev/null | grep -o '"token":"[^"]*"' | head -1 | cut -d'"' -f4 || echo "")
if [ -n "$PUB_KEY" ]; then
  echo "  ✅ Publishable key: $PUB_KEY"
  cd $PESSTOREFRONT_DIR
  # Update .env.local with real values
  sed -i "s|NEXT_PUBLIC_MEDUSA_BACKEND_URL=.*|NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000|" .env.local
  sed -i "s|NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=.*|NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$PUB_KEY|" .env.local
  sed -i "s|COMMERCE_PROVIDER=.*|COMMERCE_PROVIDER=medusa|" .env.local
  echo "  ✅ .env.local updated with Medusa backend URL + publishable key"
else
  echo "  ℹ️  Could not auto-extract key. After starting Medusa manually:"
  echo "     cd ~/medusa-pes-supply && npm run dev"
  echo "     Then: npx medusa key:publishable:list"
  echo "     Add to .env.local: NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_..."
fi

# Stop the temp Medusa process
kill $MEDUSA_PID 2>/dev/null || true

cd $PESSTOREFRONT_DIR

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  ✅  Bootstrap complete!                          ║"
echo "║                                                  ║"
echo "║  Storefront:   pnpm dev          → :3000         ║"
echo "║  Medusa API:   cd ~/medusa-pes-supply             ║"
echo "║                npm run dev       → :9000         ║"
echo "║  Medusa Admin: http://localhost:9000/app         ║"
echo "║  Admin creds:  admin@pes.supply / PESAdmin2026!  ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
