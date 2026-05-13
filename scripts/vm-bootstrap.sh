#!/usr/bin/env bash
# ============================================================
# Azure VM Bootstrap — pes.supply (run once on fresh VM)
# Ubuntu 22.04 LTS
# Usage: bash scripts/vm-bootstrap.sh
# ============================================================
set -euo pipefail

echo "─── [1/10] System update"
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y curl git build-essential nginx certbot python3-certbot-nginx ufw

echo "─── [2/10] Node.js 22"
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "─── [3/10] pnpm + pm2"
npm i -g pnpm pm2
pm2 startup ubuntu -u pesadmin --hp /home/pesadmin

echo "─── [4/10] Redis"
sudo apt-get install -y redis-server
sudo systemctl enable redis-server && sudo systemctl start redis-server

echo "─── [5/10] PostgreSQL"
sudo apt-get install -y postgresql postgresql-contrib
sudo systemctl enable postgresql && sudo systemctl start postgresql
# Production DB
sudo -u postgres psql -c "CREATE USER medusa_user WITH PASSWORD 'CHANGE_ME_PROD';" 2>/dev/null || true
sudo -u postgres psql -c "CREATE DATABASE medusa_pes_supply OWNER medusa_user;" 2>/dev/null || true
# Staging DB
sudo -u postgres psql -c "CREATE USER medusa_staging WITH PASSWORD 'CHANGE_ME_STAGING';" 2>/dev/null || true
sudo -u postgres psql -c "CREATE DATABASE medusa_pes_staging OWNER medusa_staging;" 2>/dev/null || true

echo "─── [6/10] App directories"
sudo mkdir -p /var/www/pes-supply /var/www/pes-supply-staging /var/log/pm2
sudo chown -R pesadmin:pesadmin /var/www/pes-supply /var/www/pes-supply-staging /var/log/pm2

echo "─── [7/10] Clone repo"
git clone https://github.com/ACassilly/pes-supply-storefront /var/www/pes-supply || true
cp -r /var/www/pes-supply /var/www/pes-supply-staging

echo "─── [8/10] Nginx"
sudo cp /var/www/pes-supply/scripts/nginx-pes-supply.conf /etc/nginx/sites-available/pes-supply
sudo ln -sf /etc/nginx/sites-available/pes-supply /etc/nginx/sites-enabled/pes-supply 2>/dev/null || true
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

echo "─── [9/10] SSL certificates"
# Run certbot for all 4 domains (DNS must point to this VM first)
certbot certonly --nginx \
  -d pes.supply -d www.pes.supply \
  -d staging.pes.supply \
  -d api.pes.supply \
  -d api-staging.pes.supply \
  --agree-tos --non-interactive --email admin@pes.supply || \
  echo "⚠️ Certbot skipped — run manually after DNS is live"

echo "─── [10/10] Firewall"
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo ""
echo "✅ VM bootstrap complete."
echo "Next: scaffold Medusa, copy .env files, start PM2:"
echo "  cd ~"
echo "  npx create-medusa-app@latest medusa-pes-supply --no-browser"
echo "  cp /var/www/pes-supply/medusa-backend/medusa-config.ts medusa-pes-supply/"
echo "  cp /var/www/pes-supply/medusa-backend/.env.template medusa-pes-supply/.env"
echo "  # Fill in .env values then:"
echo "  cd medusa-pes-supply && npx medusa migrations run"
echo "  pm2 start /var/www/pes-supply/scripts/pm2-ecosystem.config.js"
echo "  pm2 save"
