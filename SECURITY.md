# Security Guidelines

## 🔒 Security Best Practices

This document outlines the security measures implemented in the Our Lady of Fatima Parish website and guidelines for maintaining security.

## Environment Variables

### Required Environment Variables

All sensitive configuration must be stored in environment variables, **never** hardcoded in the source code.

#### Backend `.env` File
```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Secret (use a strong, random string)
JWT_SECRET=your-strong-secret-key-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8080/api/google-calendar/oauth2callback

# Email Configuration (for mass email system)
EMAIL_USER=your-parish-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

### ⚠️ CRITICAL: Never Commit Secrets

- **NEVER** commit `.env` files to version control
- **NEVER** hardcode credentials in source files
- **NEVER** include real credentials in documentation files
- Use `.env.example` for template/reference only

## Exposed Credentials - IMMEDIATE ACTION REQUIRED

If you've accidentally committed credentials to GitHub:

1. **Rotate ALL exposed credentials immediately**:
   - Generate new MongoDB connection string
   - Create new JWT secret
   - Regenerate Google OAuth credentials
   - Reset email app passwords

2. **Revoke exposed access**:
   - MongoDB: Rotate database user passwords
   - Google Cloud Console: Delete and recreate OAuth 2.0 Client
   - Gmail: Remove app-specific passwords and create new ones

3. **Update local `.env` file** with new credentials

4. **Clear Git history** (optional, for complete cleanup):
   ```bash
   # WARNING: This rewrites history and requires force push
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch GOOGLE_CALENDAR_SETUP.md" \
   --prune-empty --tag-name-filter cat -- --all
   ```

## Security Features Implemented

### Authentication & Authorization

- **JWT-based authentication** with HttpOnly cookies
- **Admin-only routes** protected with middleware
- **Rate limiting** on authentication endpoints
- **Password hashing** using bcrypt

### API Security

- **CORS configuration** restricting allowed origins
- **Helmet.js** security headers
- **Input validation** on all user inputs
- **MongoDB injection prevention** through Mongoose
- **XSS protection** via React's built-in sanitization

### File Upload Security

- **File type validation** (images: JPG, PNG, GIF; documents: PDF, DOC, DOCX)
- **File size limits** (10MB max)
- **Multer configuration** for secure uploads
- **Static file serving** with proper MIME types

### Production Deployment Security

When deploying to production:

1. **Use environment-specific variables**:
   - Production MongoDB cluster
   - Production-grade JWT secrets (256-bit random)
   - Production OAuth redirect URIs

2. **Enable HTTPS**:
   - Use SSL/TLS certificates
   - Redirect HTTP to HTTPS
   - Set secure cookie flags

3. **Configure CORS properly**:
   - Only allow your production domain
   - Remove development URLs

4. **Rate limiting**:
   - Implement stricter rate limits
   - Add DDoS protection (Cloudflare, etc.)

5. **Monitoring**:
   - Set up error logging (Sentry, LogRocket)
   - Monitor for suspicious activity
   - Set up alerts for failed login attempts

## Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** open a public issue
2. Email the development team directly
3. Include details about the vulnerability
4. Allow reasonable time for fixing before public disclosure

## Regular Security Audits

- **Monthly**: Review access logs for suspicious activity
- **Quarterly**: Update all dependencies (`npm audit fix`)
- **Annually**: Full security audit of codebase

## Credentials Management

### MongoDB Atlas
- Use strong, unique passwords
- Enable IP whitelisting
- Use database user-specific permissions
- Rotate credentials every 90 days

### Google OAuth
- Use separate projects for dev/prod
- Restrict OAuth scopes to minimum required
- Monitor OAuth usage in Google Cloud Console
- Revoke unused tokens regularly

### Email (Nodemailer)
- Use app-specific passwords, never account password
- Restrict app password to email sending only
- Monitor for unusual sending patterns
- Rotate passwords every 90 days

## Development vs Production

### Development
```bash
MONGODB_URI=mongodb://localhost:27017/fatima-dev
JWT_SECRET=dev-secret-key
GOOGLE_REDIRECT_URI=http://localhost:8080/api/google-calendar/oauth2callback
```

### Production
```bash
MONGODB_URI=mongodb+srv://prod-user:secure-password@cluster.mongodb.net/fatima-prod
JWT_SECRET=production-256-bit-random-secret
GOOGLE_REDIRECT_URI=https://your-domain.com/api/google-calendar/oauth2callback
```

## Checklist Before Deployment

- [ ] All `.env` files excluded from git
- [ ] `.env.example` contains only placeholder values
- [ ] No hardcoded secrets in codebase
- [ ] Production credentials generated
- [ ] HTTPS enabled
- [ ] CORS configured for production domain
- [ ] Rate limiting configured
- [ ] Error logging set up
- [ ] Security headers enabled (Helmet.js)
- [ ] Dependencies updated and audited
- [ ] Backup strategy in place

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Security Best Practices](https://react.dev/learn/keeping-components-pure#side-effects-unintended-consequences)
