# AWS Hosting Guide — Benade (Laravel 13 + React/Inertia.js)

## App Profile Summary

| Property | Value |
|---|---|
| Backend | Laravel 13, PHP 8.3 |
| Frontend | React 19 + Inertia.js (SSR-capable) |
| Database | SQLite (~94KB, single file) |
| Web server | Nginx + PHP-FPM |
| Email | Laravel Mail (contact form notifications) |
| Assets | Compiled via Vite → `/public/build/` |
| Auth | Fortify with 2FA |

---

## Recommendation: AWS Lightsail — ~$5–7/month

For a portfolio site with SQLite, Lightsail is the clear winner. It bundles compute, SSD storage, static IP, DNS, and generous bandwidth into a flat monthly fee with no surprise bills. No VPC, load balancer, or RDS setup required.

### Why not other AWS services?

| Option | Why it's worse |
|---|---|
| **EC2 alone** | Same price but no bundled bandwidth/IP; more setup work |
| **Elastic Beanstalk** | Overhead and cost for a single-server app |
| **ECS / Fargate** | Container orchestration is overkill here |
| **App Runner** | Doesn't support PHP natively |
| **RDS** | Completely unnecessary — SQLite handles the load fine |
| **Amplify** | React-only; can't run PHP backend |

---

## Architecture

```
User → Route 53 (DNS) → Lightsail Instance (Nginx + PHP-FPM + Laravel)
                               │
                         /public/build/   ← Vite compiled assets (served by Apache)
                         storage/app/database.sqlite
                               │
                         SES (outbound email for contact form)
```

Optional upgrade path: add **CloudFront** in front of Lightsail to cache static assets and get global edge performance (free tier: 1TB/month).

---

## Step-by-Step Setup

### 1. Create the Lightsail Instance

> **Note:** Bitnami-packaged blueprints (including the old LAMP blueprint) will no longer receive updates after May 19, 2026. Use the native **Ubuntu** blueprint instead.

1. Go to [Lightsail console](https://lightsail.aws.amazon.com/)
2. **Create instance** → Linux/Unix → **OS Only** → **Ubuntu 24.04 LTS**
3. Choose the **$5/month** plan: 1 vCPU, 1GB RAM, 40GB SSD, 2TB transfer
4. Name it (e.g., `benade-prod`) and launch

### 2. Attach a Static IP

In Lightsail → **Networking** → Create static IP → attach to your instance. This gives you a fixed IP that survives reboots (free while attached).

### 3. Set Up DNS with Route 53 (or your registrar)

If using Route 53 (~$0.50/month per hosted zone):
```
A  benade.com    →  <your-static-ip>
A  www.benade.com →  <your-static-ip>
```

Or skip Route 53 and point your existing domain registrar's A records at the static IP directly (free).

### 4. Deploy the Application

SSH into your instance:
```bash
# Lightsail → Instance → Connect (browser SSH, or use the downloaded key)
ssh -i ~/.ssh/LightsailDefaultKey.pem ubuntu@<your-static-ip>
```

**Install Nginx, PHP-FPM 8.3, and required extensions:**
```bash
sudo apt-get update
sudo apt-get install -y nginx \
  php8.3-fpm php8.3-sqlite3 php8.3-xml php8.3-mbstring \
  php8.3-curl php8.3-zip php8.3-bcmath php8.3-tokenizer

sudo systemctl enable nginx php8.3-fpm
sudo systemctl start nginx php8.3-fpm
```

**Install Composer:**
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

**Install Node.js (for building assets — one-time only):**
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Deploy the app:**
```bash
# Standard Ubuntu Apache document root
sudo mkdir -p /var/www/benade
cd /var/www/benade

# Clone or upload your project (example with git)
sudo git clone https://github.com/your-username/benade.git .

# Set permissions
sudo chown -R www-data:www-data /var/www/benade
sudo chmod -R 775 storage bootstrap/cache

# Install PHP dependencies (production only, no dev packages)
composer install --no-dev --optimize-autoloader

# Build frontend assets (on server, one-time; or upload pre-built /public/build/)
npm ci
npm run build

# Copy and configure .env
cp .env.example .env
php artisan key:generate
```

**Edit `.env` for production:**
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://benade.com

DB_CONNECTION=sqlite
DB_DATABASE=/var/www/benade/database/database.sqlite

MAIL_MAILER=ses
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_DEFAULT_REGION=us-east-1
MAIL_FROM_ADDRESS=noreply@benade.com
MAIL_FROM_NAME="Benade"
```

**Run migrations:**
```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5. Configure Nginx Server Block

> **Note:** Nginx does not read `.htaccess` files. The Laravel URL rewrite rule goes directly in the config below — no other changes to the app are needed.

Create `/etc/nginx/sites-available/benade`:
```nginx
server {
    listen 80;
    server_name benade.com www.benade.com;
    root /var/www/benade/public;
    index index.php;

    # Laravel URL rewriting (replaces .htaccess)
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Deny access to hidden files
    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    error_log /var/log/nginx/benade-error.log;
    access_log /var/log/nginx/benade-access.log;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/benade /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t          # verify config is valid
sudo systemctl reload nginx
```

### 6. Enable HTTPS with Let's Encrypt (free SSL)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d benade.com -d www.benade.com
```

Certbot automatically updates your Nginx config for HTTPS and sets up a cron job for auto-renewal. Done.

### 7. Configure Email with Amazon SES

SES is the cheapest AWS email option: **$0.10 per 1,000 emails** (effectively free for a contact form).

1. Go to **SES console** → Verify your domain (add DNS TXT/DKIM records)
2. Request production access (takes ~24h; sandbox only allows verified addresses)
3. Create **IAM user** with `AmazonSESFullAccess` policy → generate access keys
4. Add those keys to `.env` as shown above

Laravel's SES mailer works out of the box — no extra packages needed.

### 8. Secure the SQLite Database

The SQLite file must not be inside the web root:
```bash
# Move it outside /public/
mkdir -p /var/www/benade/database
mv storage/app/database.sqlite database/database.sqlite
sudo chown www-data:www-data database/database.sqlite

# Update DB_DATABASE in .env accordingly
```

The `/database/` directory is already above `/public/`, so it's not web-accessible. Confirm your `DB_DATABASE` path in `.env` is absolute.

### 9. Set Up Automated Backups (optional, ~$0.05/GB/month)

In Lightsail → your instance → **Snapshots** → Enable automatic snapshots (daily, keeps 7). At ~40GB instance size, this costs about **$2/month** but gives you full server restore in minutes.

---

## Cost Breakdown

| Service | Monthly Cost |
|---|---|
| Lightsail instance ($5 plan) | $5.00 |
| Static IP (free while attached) | $0.00 |
| Route 53 hosted zone (optional) | $0.50 |
| SES email (contact form, ~100 emails) | $0.01 |
| Lightsail snapshots (optional) | ~$2.00 |
| SSL certificate (Let's Encrypt) | $0.00 |
| **Total (without snapshots)** | **~$5.50/month** |
| **Total (with snapshots)** | **~$7.50/month** |

---

## Optional: Add CloudFront for Asset Caching

If you want faster global load times for CSS/JS/images without changing your server:

1. Create a **CloudFront distribution** → Origin: your Lightsail static IP
2. Set cache behavior: cache `/build/*` for 1 year (assets are content-hashed by Vite)
3. Point your domain's CNAME to the CloudFront URL
4. CloudFront free tier: **1TB/month** — more than enough for a portfolio

This cuts asset load time significantly for international visitors and reduces server bandwidth usage.

---

## Deployment Workflow (After Initial Setup)

For future updates, a simple shell script:
```bash
#!/bin/bash
# deploy.sh (run on server via ssh)
cd /var/www/benade
git pull origin main
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
sudo systemctl reload nginx php8.3-fpm
echo "Deployed."
```

Run from your local machine:
```bash
ssh -i ~/.ssh/LightsailDefaultKey.pem ubuntu@<ip> 'bash /var/www/benade/deploy.sh'
```

---

## Upgrade Path

If the site grows beyond a portfolio:

| Need | Solution | Added Cost |
|---|---|---|
| More traffic | Upgrade Lightsail plan (1-click) | +$5–10/mo |
| Multiple servers | Migrate to EC2 + RDS PostgreSQL | +$15–30/mo |
| Zero-downtime deploys | Add Lightsail load balancer | +$18/mo |
| Switch from SQLite | RDS PostgreSQL t4g.micro | +$13/mo |
| CDN (already handling load) | CloudFront | ~$0 (free tier) |

For a portfolio site that stays a portfolio site, the $5/month Lightsail setup is sufficient indefinitely.
