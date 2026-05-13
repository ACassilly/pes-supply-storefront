#!/bin/bash
# ============================================================================
# nginx + Let's Encrypt setup for pes.supply
# Run ONCE on the Azure VM as pesadmin via: bash scripts/setup-nginx-pes-supply.sh
# Mirrors the canonical pattern used for portlandialogistics.com
# ============================================================================
set -e

DOMAIN="pes.supply"
WWW_DOMAIN="www.pes.supply"
APP_PORT=3000
EMAIL="alex@cassilly.capital"

echo "=== Setting up nginx + certbot for $DOMAIN ==="

# ── 1. Install nginx + certbot (if not already)
sudo apt-get update -q
sudo apt-get install -y nginx certbot python3-certbot-nginx ufw

# ── 2. UFW firewall rules
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

# ── 3. Write nginx site config
sudo tee /etc/nginx/sites-available/pes-supply > /dev/null << NGINX
server {
    listen 80;
    server_name $DOMAIN $WWW_DOMAIN;

    # certbot will add HTTPS config here
    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }
}
NGINX

# ── 4. Enable site
sudo ln -sf /etc/nginx/sites-available/pes-supply /etc/nginx/sites-enabled/pes-supply
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# ── 5. Issue Let's Encrypt cert
echo "Issuing TLS cert for $DOMAIN and $WWW_DOMAIN..."
sudo certbot --nginx \
  -d $DOMAIN \
  -d $WWW_DOMAIN \
  --non-interactive \
  --agree-tos \
  --email $EMAIL \
  --redirect

# ── 6. Auto-renew cron (idempotent)
(crontab -l 2>/dev/null | grep -v certbot; echo "0 3 * * * /usr/bin/certbot renew --quiet") | crontab -

echo ""
echo "✅ nginx + TLS for $DOMAIN configured."
echo "   pes.supply → http://127.0.0.1:$APP_PORT (pm2: pes-supply)"
echo "   Run 'sudo certbot certificates' to verify cert status."
