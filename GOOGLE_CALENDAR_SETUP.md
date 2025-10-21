# Google Calendar Integration Setup

## Issue
When clicking "Connect Google Calendar" button, you get an error: "Failed to connect to Google Calendar"

## Root Cause
The Google Cloud Console OAuth redirect URIs need to be configured to allow your local development URLs.

## Solution Steps

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Select Your Project
- Click on the project dropdown at the top
- Select your existing project (or create a new one)

### 3. Enable Google Calendar API
- Go to "APIs & Services" > "Library"
- Search for "Google Calendar API"
- Click on it and press "ENABLE"

### 4. Configure OAuth Consent Screen
- Go to "APIs & Services" > "OAuth consent screen"
- Choose "External" user type
- Fill in required fields:
  - App name: "Our Lady of Fatima Parish"
  - User support email: Your email
  - Developer contact email: Your email
- Add scopes:
  - `https://www.googleapis.com/auth/calendar.events`
  - `https://www.googleapis.com/auth/calendar.readonly`
- Add your email as a test user

### 5. Create/Update OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth 2.0 Client ID"
- Application type: "Web application"
- Name: "Fatima Parish Admin"
- **Authorized redirect URIs** - ADD BOTH:
  ```
  http://localhost:8080/api/google-calendar/oauth2callback
  http://localhost:5175/admin
  ```

### 6. Update .env File (if credentials changed)
Your current credentials in `backend/.env`:
```
GOOGLE_CLIENT_ID=76085018587-5np5gord632lls1l43o29t10gs80suvd.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
GOOGLE_REDIRECT_URI=http://localhost:8080/api/google-calendar/oauth2callback
```

### 7. Restart Backend Server
After making changes:
```bash
cd backend
npm start
```

### 8. Test the Connection
1. Log into admin dashboard: http://localhost:5175/admin/login
2. Click "Connect Google Calendar"
3. You should be redirected to Google's OAuth page
4. Grant permissions
5. You'll be redirected back to your admin dashboard

## Current Status
✅ Google Calendar route is configured in backend
✅ Environment variables are set
❌ OAuth redirect URIs need to be added in Google Cloud Console

## For Production Deployment
When deploying to Netlify, add these redirect URIs:
```
https://your-netlify-domain.netlify.app/admin
https://your-backend-domain.com/api/google-calendar/oauth2callback
```
