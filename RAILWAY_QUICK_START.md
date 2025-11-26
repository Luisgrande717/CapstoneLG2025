# Railway Deployment - Quick Start Guide

## Your Domain Setup
**Custom Domain**: olfpa.church (GoDaddy)

### Recommended URL Structure:
- **Website**: https://olfpa.church
- **API**: https://api.olfpa.church
- **Admin**: https://olfpa.church/admin

---

## Step-by-Step Deployment (30 minutes)

### 1. MongoDB Atlas Setup (5 min)
1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create M0 (FREE) cluster
3. Create database user (save password!)
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/parish-db`

### 2. Deploy Backend to Railway (10 min)
1. Sign up at [railway.app](https://railway.app) with GitHub
2. Create "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add service with root directory: `backend`
5. Add these environment variables:
   ```bash
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<generate-random-64-char-string>
   CUSTOM_DOMAIN=olfpa.church
   EMAIL_USER=olfperthamboy@gmail.com
   EMAIL_PASSWORD=<gmail-app-password>
   ```
6. Generate public domain → Save URL

### 3. Deploy Frontend to Railway (5 min)
1. In same project, add new service
2. Select same GitHub repo
3. Root directory: `frontend`
4. Add environment variable:
   ```bash
   VITE_API_URL=https://your-backend-url.up.railway.app
   ```
5. Generate public domain → Save URL

### 4. Update Backend CORS (2 min)
1. Go back to backend service
2. Add variable:
   ```bash
   FRONTEND_URL=https://your-frontend-url.up.railway.app
   ```
3. Wait for auto-redeploy

### 5. Test Deployment (2 min)
- Visit: `https://your-frontend-url.up.railway.app`
- Check: `https://your-backend-url.up.railway.app/health`

---

## Custom Domain Setup (olfpa.church)

### In Railway:
**Frontend Service:**
- Settings → Networking → Custom Domain
- Add: `olfpa.church` and `www.olfpa.church`

**Backend Service:**
- Settings → Networking → Custom Domain
- Add: `api.olfpa.church`

### In GoDaddy:
1. Log in → My Products → olfpa.church → DNS
2. Add these DNS records:

   ```
   Type: CNAME, Name: @, Value: [Railway frontend URL]
   Type: CNAME, Name: www, Value: [Railway frontend URL]
   Type: CNAME, Name: api, Value: [Railway backend URL]
   ```

3. Wait 15-30 minutes for DNS propagation

### Update Railway Variables:

**Backend:**
```bash
FRONTEND_URL=https://olfpa.church
CUSTOM_DOMAIN=olfpa.church
```

**Frontend:**
```bash
VITE_API_URL=https://api.olfpa.church
```

---

## Post-Deployment

### Create Admin User:
Use Railway CLI or dashboard shell:
```bash
railway run node scripts/createAdmin.js
```

### Access Your Site:
- Website: https://olfpa.church
- Admin: https://olfpa.church/admin
- Health: https://api.olfpa.church/health

---

## Important Files Created

✅ [frontend/src/config/api.js](frontend/src/config/api.js) - Centralized API config
✅ [backend/.env.railway](backend/.env.railway) - Backend env template
✅ [frontend/.env.railway](frontend/.env.railway) - Frontend env template
✅ [railway.json](railway.json) - Railway config
✅ [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) - Full documentation

---

## Cost Estimate
- Free tier: $5/month credit
- Expected usage: $3-5/month
- Should stay within free tier!

---

## Need Help?
See [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md) for detailed troubleshooting.
