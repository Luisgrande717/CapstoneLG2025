# Admin System Testing Guide

## 🎯 Quick Start Testing

### 1. Access Admin Login
- **URL**: http://localhost:5175/admin/login
- **Credentials**:
  - Email/Username: `admin@olfperthamboy.com` or `admin`
  - Password: `ParishAdmin2025!`

### 2. Backend Server Status
- **Backend URL**: http://localhost:8080
- **Health Check**: http://localhost:8080/health
- **API Base**: http://localhost:8080/api

### 3. Test Scenarios

#### Admin Authentication
✅ **Login Test**:
1. Navigate to admin login page
2. Enter credentials above
3. Should redirect to admin dashboard
4. Verify user session persists on page refresh

#### Event Management
✅ **Create Event Test**:
1. Go to Events tab in admin dashboard
2. Click "Create Event" button
3. Fill out bilingual form:
   - English Title: "Test Parish Event"
   - Spanish Title: "Evento de Prueba Parroquial"
   - Set date/time, category, location
   - Check "Published" to make it visible
4. Save event
5. Verify event appears in events list

✅ **Edit/Delete Test**:
1. Find created event in events grid
2. Click "Edit" to modify details
3. Click "Delete" to remove (confirm deletion)
4. Test publish/unpublish toggle

#### Frontend Integration
✅ **Public Events Display**:
1. Navigate to http://localhost:5175/events
2. Verify created published events appear
3. Check bilingual content displays correctly
4. Confirm unpublished events are hidden

### 4. API Testing with Curl

#### Get Events (Public)
```bash
curl http://localhost:8080/api/events
```

#### Login Test
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"credential": "admin", "password": "ParishAdmin2025!"}'
```

#### Create Event (Authenticated)
```bash
# First login to get token, then:
curl -X POST http://localhost:8080/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": {"en": "API Test Event", "es": "Evento de Prueba API"},
    "description": {"en": "Created via API", "es": "Creado por API"},
    "startDate": "2025-09-01",
    "endDate": "2025-09-01",
    "startTime": "10:00",
    "endTime": "11:00",
    "category": "Community",
    "location": "Parish Hall",
    "published": true
  }'
```

### 5. Expected Results

#### ✅ Authentication System
- [x] Login form validates input
- [x] JWT tokens generated and stored
- [x] Protected routes require authentication
- [x] User session persists across page refreshes
- [x] Logout functionality works

#### ✅ Event Management
- [x] CRUD operations for events
- [x] Bilingual content support (English/Spanish)
- [x] Form validation works
- [x] Events appear in public pages when published
- [x] Draft events hidden from public

#### ✅ User Interface
- [x] Admin dashboard loads correctly
- [x] Navigation between tabs works
- [x] Forms are responsive and accessible
- [x] Loading states and error handling
- [x] Bilingual admin interface

### 6. Security Features Verified
- [x] JWT token authentication
- [x] Role-based access control
- [x] Password hashing (bcrypt)
- [x] Protected API endpoints
- [x] CORS properly configured
- [x] Input validation and sanitization

## 🚀 Production Deployment Notes

Before deploying to production:

1. **Change Default Password**: Update admin password immediately
2. **Environment Variables**: Set proper JWT_SECRET and MongoDB credentials
3. **HTTPS Only**: Ensure SSL certificates are configured
4. **Rate Limiting**: Configure appropriate API rate limits
5. **Backup Strategy**: Implement MongoDB backup procedures
6. **Monitoring**: Set up logging and error tracking
7. **User Management**: Create additional admin/moderator accounts as needed

## 🔧 Troubleshooting

### Common Issues:
- **401 Unauthorized**: Check if JWT token is valid and not expired
- **CORS Errors**: Verify backend CORS configuration includes frontend URL
- **Database Connection**: Ensure MongoDB connection string is correct
- **Port Conflicts**: Backend on 8080, frontend on 5175 (or next available)

### Debug Commands:
```bash
# Check backend logs
cd backend && npm start

# Check frontend in development
cd frontend && npm run dev

# Test database connection
cd backend && node scripts/createAdmin.js
```