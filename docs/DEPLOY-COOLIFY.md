# Deploying EffectiveBuzz to Coolify

This guide covers the production deployment of the EffectiveBuzz multi-surface architecture onto a self-hosted **Coolify** instance.

## 1. Domain & DNS Configuration

EffectiveBuzz uses host-based routing. You must point the following DNS records (A or CNAME) to your Coolify server's IP:

- `@` (marketing)
- `app` (SaaS platform)
- `docs` (documentation)
- `admin` (internal operations)
- `status` (system monitor)
- `api` (backend services)

## 2. Coolify Application Setup

1. **New Application:** Create a new application in Coolify from your GitHub repository.
2. **Build Pack:** Select **Docker**. Coolify will automatically detect the `Dockerfile`.
3. **Domains:** Enter all domains separated by commas:
   `https://effectivebuzz.online, https://app.effectivebuzz.online, https://docs.effectivebuzz.online, https://admin.effectivebuzz.online, https://status.effectivebuzz.online, https://api.effectivebuzz.online`
4. **Environment Variables:** Configure the following:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `REDIS_URL`: Your Redis connection string.
   - `GEMINI_API_KEY`: Required for live AI SDR features.
   - `JWT_SECRET`: Random string for signing tokens.
   - `APP_BASE_DOMAINS=effectivebuzz.online`

## 3. SSL & Certificates

Coolify handles Let's Encrypt SSL certificates automatically for all domains listed in the "Domains" field. Ensure your DNS records are fully propagated before triggering a deployment to ensure successful ACME challenges.

## 4. Admin Lockdown

The `admin` surface is protected by the `update-traefik.sh` script which applies Basic Auth at the proxy level (Traefik). 

To update the admin credentials:
1. Generate a new bcrypt hash.
2. Update the `ADMIN_HASH` in `update-traefik.sh`.
3. Run `./update-traefik.sh` on the server after the application is healthy.

## 5. Post-Deployment Verification

After deployment, verify all surfaces:
- Check `https://effectivebuzz.online` for the marketing site.
- Check `https://app.effectivebuzz.online` for the SaaS dashboard.
- Check `https://api.effectivebuzz.online/api/v2/auth/health` for backend status.
