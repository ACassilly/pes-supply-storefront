#!/usr/bin/env bash
# ============================================================
# Vercel Project Linkage for pes-supply-storefront
# Prerequisites:
#   - npm i -g vercel  (or pnpm add -g vercel)
#   - vercel login
# Usage: bash scripts/setup-vercel-link.sh
# Run this once in the repo root (locally or in Codespace)
# ============================================================
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

echo "=== Vercel Project Setup for pes.supply ==="
echo ""
echo "Step 1: Linking project to Vercel..."
vercel link --yes

echo ""
echo "Step 2: Pulling env vars from Vercel (preview environment)..."
vercel env pull .env.local --environment=preview --yes
echo "  .env.local written"

echo ""
echo "Step 3: Reading project IDs from .vercel/project.json..."
ORG_ID=$(cat .vercel/project.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('orgId','NOT_FOUND'))")
PROJECT_ID=$(cat .vercel/project.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('projectId','NOT_FOUND'))")

echo "  Org ID:     $ORG_ID"
echo "  Project ID: $PROJECT_ID"

echo ""
echo "Step 4: Updating .vercel/project.json with real IDs..."
python3 -c "
import json
with open('.vercel/project.json', 'r') as f:
    d = json.load(f)
print(json.dumps(d, indent=2))
"

echo ""
echo "Step 5: Setting Vercel env vars for production..."
echo "  Run these commands to push each env var to Vercel production:"
echo "  vercel env add NEXT_PUBLIC_MEDUSA_BACKEND_URL production"
echo "  vercel env add NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY production"
echo "  vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production"
echo "  vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID production"
echo "  vercel env add NEXT_PUBLIC_SITE_URL production"
echo "  vercel env add REVALIDATE_SECRET production"
echo "  vercel env add GOOGLE_SITE_VERIFICATION production"
echo ""
echo "  Or bulk-import from .env.local:"
echo "  vercel env import .env.local"

echo ""
echo "Step 6: Adding custom domain..."
echo "  vercel domains add pes.supply"
echo "  Then in Cloudflare, set pes.supply CNAME -> cname.vercel-dns.com (proxied)"

echo ""
echo "Step 7: Triggering first deploy..."
echo "  vercel deploy --prod"

echo ""
echo "=== All done! Org=$ORG_ID Project=$PROJECT_ID ==="
echo "Add VERCEL_ORG_ID=$ORG_ID and VERCEL_PROJECT_ID=$PROJECT_ID to GitHub Secrets."
