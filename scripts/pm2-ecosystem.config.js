/**
 * PM2 Ecosystem Config — pes.supply Azure VM
 * Deploy to: /var/www/pes-supply/pm2-ecosystem.config.js
 * Start:     pm2 start pm2-ecosystem.config.js
 * Save:      pm2 save && pm2 startup
 */
module.exports = {
  apps: [
    {
      name: 'pes-supply',
      cwd: '/var/www/pes-supply',
      script: 'node_modules/.bin/next',
      args: 'start',
      instances: 2,
      exec_mode: 'cluster',
      max_memory_restart: '512M',
      env: { NODE_ENV: 'production', PORT: 3000 },
      error_file: '/var/log/pm2/pes-supply-error.log',
      out_file: '/var/log/pm2/pes-supply-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      name: 'pes-supply-medusa',
      cwd: '/home/pesadmin/medusa-pes-supply',
      script: 'node_modules/.bin/medusa',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      env: { NODE_ENV: 'production', PORT: 9000 },
      error_file: '/var/log/pm2/medusa-error.log',
      out_file: '/var/log/pm2/medusa-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
    {
      name: 'pes-supply-sync',
      cwd: '/var/www/pes-supply',
      script: 'npx',
      args: 'tsx scripts/odoo-medusa-sync.ts',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '*/15 * * * *',
      autorestart: false,
      max_memory_restart: '256M',
      env: { NODE_ENV: 'production', SYNC_INTERVAL_MS: '0' },
      error_file: '/var/log/pm2/sync-error.log',
      out_file: '/var/log/pm2/sync-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
