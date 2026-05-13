#!/usr/bin/env bash
# ============================================================
# Staging Smoke Test — staging.pes.supply
# Run locally: bash scripts/staging-smoke-test.sh
# Also runs automatically in CI after every staging deploy
# ============================================================
set -euo pipefail

BASE="${STAGING_URL:-https://staging.pes.supply}"
PASS=0
FAIL=0
WARN=0

check() {
  local label="$1"
  local url="$2"
  local expected_status="${3:-200}"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
  if [ "$status" = "$expected_status" ]; then
    echo "  ✅ $label ($status)"
    PASS=$((PASS+1))
  else
    echo "  ❌ $label — expected $expected_status got $status ($url)"
    FAIL=$((FAIL+1))
  fi
}

check_soft() {
  local label="$1"
  local url="$2"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
  if [[ "$status" =~ ^2 ]]; then
    echo "  ✅ $label ($status)"
    PASS=$((PASS+1))
  else
    echo "  ⏳ $label — $status (backend may not be up yet)"
    WARN=$((WARN+1))
  fi
}

echo "================================================"
echo "  PES Supply Staging Smoke Tests"
echo "  Target: $BASE"
echo "  $(date)"
echo "================================================"
echo ""

echo "--- Core pages ---"
check "Homepage" "$BASE"
check "Cart page" "$BASE/cart"
check "Checkout page" "$BASE/checkout" "200"

echo ""
echo "--- SEO / feeds ---"
check "Sitemap" "$BASE/sitemap.xml"
check_soft "Robots" "$BASE/robots.txt"

echo ""
echo "--- API endpoints ---"
check_soft "Health check" "$BASE/api/health"
check_soft "Google Merchant Feed" "$BASE/api/google-merchant-feed"
check_soft "Revalidate (GET guard)" "$BASE/api/revalidate"

echo ""
echo "--- Shopify redirect coverage ---"
check "Old /collections/* redirect" "$BASE/collections/test" "301"
check "Old /products/* redirect" "$BASE/products/test" "301"

echo ""
echo "================================================"
echo "  Results: $PASS passed / $WARN warned / $FAIL failed"
echo "================================================"

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi
