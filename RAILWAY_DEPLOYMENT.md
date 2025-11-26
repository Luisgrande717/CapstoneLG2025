# Railway Deployment Guide - Our Lady of Fatima Parish Website

Complete guide for deploying the parish website to Railway with custom domain **olfpa.church**

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start Deployment](#quick-start-deployment)
3. [Custom Domain Setup (olfpa.church)](#custom-domain-setup)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts
- [x] **Railway Account** - Sign up at [railway.app](https://railway.app) with GitHub
- [x] **MongoDB Atlas Account** - Free tier at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [x] **GoDaddy Domain** - You already have **olfpa.church** ✓

### Required Setup
- [x] **GitHub Repository** - Your code should be pushed to GitHub
- [ ] **MongoDB Atlas Database** - Follow setup below
- [ ] **Gmail App Password** - For email functionality (optional)

---

## Quick Start Deployment

### Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (M0 Sandbox - FREE)
3. Create a database user:
   - Username: `parishuser` (or any username)
   - Password: Generate a strong password and save it
4. Whitelist all IP addresses:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (format: `mongodb+srv://...`)
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `parish-db`

**Example:**
```
mongodb+srv://parishuser:YourPassword123@cluster0.xxxxx.mongodb.net/parish-db?retryWrites=true&w=majority
```

### Step 2: Deploy Backend to Railway

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub
   - Select your `Capstone2025` repository

2. **Configure Backend Service**
   - Railway will detect your monorepo
   - Click "Add Service" → "GitHub Repo"
   - Service Settings:
     - **Service Name**: `parish-backend`
     - **Root Directory**: `backend`
     - **Start Command**: Auto-detected (`npm start`)

3. **Add Environment Variables**
   - Click on your backend service
   - Go to "Variables" tab
   - Click "Raw Editor"
   - Copy and paste from `backend/.env.railway` and update values:

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://parishuser:YourPassword123@cluster0.xxxxx.mongodb.net/parish-db?retryWrites=true&w=majority
JWT_SECRET=generate-a-very-long-random-string-here-at-least-64-characters-long
CUSTOM_DOMAIN=olfpa.church
EMAIL_USER=olfperthamboy@gmail.com
EMAIL_PASSWORD=your-gmail-app-password-if-you-have-one
```

4. **Generate Public Domain**
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - You'll get a URL like: `parish-backend-production.up.railway.app`
   - **SAVE THIS URL** - you'll need it for frontend

5. **Verify Backend Deployment**
   - Visit: `https://parish-backend-production.up.railway.app/health`
   - Should see: `{"status":"OK",...}`

### Step 3: Deploy Frontend to Railway

1. **Add Frontend Service**
   - In the same Railway project, click "New" → "GitHub Repo"
   - Select the same `Capstone2025` repository

2. **Configure Frontend Service**
   - Service Settings:
     - **Service Name**: `parish-frontend`
     - **Root Directory**: `frontend`
     - **Build Command**: Auto-detected (`npm run build`)
     - **Start Command**: Auto-detected (serves `dist`)

3. **Add Environment Variable**
   - Go to "Variables" tab
   - Add this variable (use your actual backend URL from Step 2):

```bash
VITE_API_URL=https://parish-backend-production.up.railway.app
```

4. **Generate Public Domain**
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - You'll get: `parish-frontend-production.up.railway.app`
   - **SAVE THIS URL**

5. **Update Backend Variables**
   - Go back to backend service
   - Add/update the FRONTEND_URL variable:

```bash
FRONTEND_URL=https://parish-frontend-production.up.railway.app
```

   - Backend will auto-redeploy with new CORS settings

6. **Test Your Deployment**
   - Visit: `https://parish-frontend-production.up.railway.app`
   - Your website should load!

---

## Custom Domain Setup (olfpa.church)

Now let's connect your GoDaddy domain to Railway.

### Option 1: Frontend on olfpa.church, Backend on api.olfpa.church (Recommended)

#### A. Set Up Frontend Domain (www.olfpa.church and olfpa.church)

1. **In Railway - Frontend Service**
   - Go to your frontend service
   - Click "Settings" → "Networking" → "Custom Domain"
   - Add these domains:
     - `olfpa.church`
     - `www.olfpa.church`
   - Railway will show DNS instructions

2. **In GoDaddy**
   - Log in to [godaddy.com](https://godaddy.com)
   - Go to "My Products" → "Domains" → "olfpa.church"
   - Click "DNS" → "Manage DNS"
   - Add these records:

   **For root domain (olfpa.church):**
   ```
   Type: CNAME
   Name: @
   Value: [Your Railway frontend URL]
   TTL: 600 seconds
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: [Your Railway frontend URL]
   TTL: 600 seconds
   ```

   **Note:** If GoDaddy doesn't allow CNAME for `@`, use:
   ```
   Type: A
   Name: @
   Value: [Railway provides this IP in their custom domain settings]
   TTL: 600 seconds
   ```

#### B. Set Up Backend Domain (api.olfpa.church)

1. **In Railway - Backend Service**
   - Go to your backend service
   - Click "Settings" → "Networking" → "Custom Domain"
   - Add: `api.olfpa.church`
   - Railway will show DNS instructions

2. **In GoDaddy**
   - Add this DNS record:
   ```
   Type: CNAME
   Name: api
   Value: [Your Railway backend URL]
   TTL: 600 seconds
   ```

3. **Update Environment Variables**

   **Backend service variables:**
   ```bash
   CUSTOM_DOMAIN=olfpa.church
   FRONTEND_URL=https://olfpa.church
   GOOGLE_REDIRECT_URI=https://api.olfpa.church/api/google-calendar/callback
   ```

   **Frontend service variables:**
   ```bash
   VITE_API_URL=https://api.olfpa.church
   ```

4. **Wait for DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually works within 15-30 minutes
   - Check status: [whatsmydns.net](https://www.whatsmydns.net/)

5. **Verify Custom Domain**
   - Visit: `https://olfpa.church` (should load your website)
   - Visit: `https://www.olfpa.church` (should redirect/load)
   - Visit: `https://api.olfpa.church/health` (should show health check)

### SSL Certificates

Railway automatically provisions SSL certificates for all custom domains using Let's Encrypt. No additional configuration needed!

---

## Post-Deployment Configuration

### Create Admin User

You need to create an admin user to access the admin dashboard.

**Option 1: Using Railway Shell**
1. Go to your backend service in Railway
2. Click "Deployments" → Select latest deployment
3. Click "View Logs" then find the "Shell" tab
4. Run:
   ```bash
   node scripts/createAdmin.js
   ```

**Option 2: Using Railway CLI**
1. Install Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```
2. Login:
   ```bash
   railway login
   ```
3. Link to your project:
   ```bash
   railway link
   ```
4. Select backend service and run:
   ```bash
   railway run node scripts/createAdmin.js
   ```

**Option 3: Temporarily Expose Admin Creation Endpoint**
- Contact your developer to add a one-time admin creation route
- Use it once, then remove it

### Update Google OAuth (If Using Calendar)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Add to "Authorized redirect URIs":
   ```
   https://api.olfpa.church/api/google-calendar/callback
   ```
6. Save changes

### Configure Gmail App Password (Optional)

For the email subscription feature:

1. Enable 2-Factor Authentication on your Gmail account
2. Go to: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and generate password
4. Copy the 16-character password
5. Add to Railway backend variables:
   ```bash
   EMAIL_PASSWORD=your-16-char-app-password
   ```

---

## Monitoring and Maintenance

### View Logs
- Go to Railway dashboard
- Select a service
- Click "Deployments" → "View Logs"
- Real-time logs show all server activity

### Check Metrics
- Each service shows CPU, Memory, and Network usage
- Monitor costs in "Usage" tab

### Redeploy
- Push to GitHub main branch = automatic deployment
- Or click "Deploy" → "Redeploy" in Railway dashboard

### Estimated Costs
- **Free Tier**: $5/month credit (starter plan)
- **Backend**: ~$2-4/month
- **Frontend**: ~$0.50-1/month
- **Total**: ~$3-5/month (within free credit if moderate traffic)

---

## Troubleshooting

### Backend Health Check Fails
```bash
# Check if MongoDB is connected
# View logs in Railway dashboard
# Common issues:
- Wrong MongoDB URI
- MongoDB not allowing Railway IPs (use 0.0.0.0/0)
- JWT_SECRET not set
```

### CORS Errors in Browser
```bash
# Ensure these variables are set in backend:
FRONTEND_URL=https://olfpa.church
CUSTOM_DOMAIN=olfpa.church

# Check browser console for exact origin being blocked
# Add it to backend environment variables
```

### Frontend Shows "Failed to fetch"
```bash
# Check VITE_API_URL is correct:
VITE_API_URL=https://api.olfpa.church

# Verify backend is running: visit https://api.olfpa.church/health
# Check browser Network tab for actual URL being called
```

### Custom Domain Not Working
```bash
# Check DNS propagation: whatsmydns.net
# Verify CNAME points to Railway URL
# Try https:// (SSL may take up to 24hrs)
# Clear browser cache / try incognito
```

### File Uploads Not Persisting
```bash
# Railway has persistent volumes
# Check /uploads directory exists
# Verify multer configuration in backend
# Consider using cloud storage (S3, Cloudflare R2) for production
```

### Railway Build Fails
```bash
# Check build logs for specific error
# Ensure package.json has correct scripts
# Try locally: npm install && npm run build
# Check Node version matches (18+)
```

---

## Support and Resources

- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **MongoDB Atlas Docs**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

## Quick Reference

### Your URLs After Setup
- **Production Website**: https://olfpa.church
- **API Backend**: https://api.olfpa.church
- **Admin Dashboard**: https://olfpa.church/admin
- **Health Check**: https://api.olfpa.church/health

### Important Commands
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# View logs
railway logs

# Run commands in Railway environment
railway run <command>

# Open Railway dashboard
railway open
```

---

**Deployment Date**: _To be filled after deployment_
**Last Updated**: November 2025
**Maintained By**: Parish Development Team
