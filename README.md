# Our Lady of Fatima Parish Website (MERN Stack)

![Project Status](https://img.shields.io/badge/status-active%20development-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-✅%20Integrated-success)
![Express.js](https://img.shields.io/badge/Express.js-✅%20Modernized-success)
![React](https://img.shields.io/badge/React-✅%20v19-success)
![Node.js](https://img.shields.io/badge/Node.js-✅%20v18+-success)

## Purpose
This project is a bilingual, community-focused website built to serve the Our Lady of Fatima parish. It features mass schedules, upcoming events, and easy navigation—all designed for accessibility and spiritual engagement.

**Current Status**: Fully functional MERN-stack application with admin dashboard, Google Calendar integration, mass email system, announcement management, and bilingual support (English/Spanish).

### 🎯 Key Features
- ✅ **Bilingual Support**: Complete English/Spanish translation system
- ✅ **Google Calendar Integration**: Auto-sync parish events from olfperthamboy@gmail.com
- ✅ **Admin Dashboard**: Full content management (events, announcements, subscribers)
- ✅ **Mass Email System**: Bulk email with attachments and language filtering
- ✅ **Announcement Management**: File uploads (images/PDFs) with priority-based display
- ✅ **Email Subscriptions**: Newsletter signup with language preferences
- ✅ **Daily Scripture**: Auto-fetched Gospel readings from USCCB
- ✅ **Secure Authentication**: JWT-based admin auth with bcrypt password hashing
- ✅ **Mobile Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack Overview (MERN)
| Technology | Status | Role |
|------------|--------|------|
| MongoDB Atlas | ✅ Integrated | Stores events, announcements, user accounts, email subscriptions, and OAuth tokens |
| Express.js | ✅ Modernized | Powers backend API routes, authentication, file uploads, and email services |
| React.js | ✅ Modernized | Manages frontend components, bilingual UI, page routing, and admin dashboard |
| Node.js | ✅ Modernized | Backend runtime, API orchestration, Google Calendar sync, and email automation |

## 📈 Recent Modernization (2025 Standards)
This codebase has been comprehensively updated to 2025 development standards for improved maintainability, performance, and developer experience:

### Frontend Modernization
- **React 19 Patterns**: Implemented modern React patterns with lazy loading, Suspense, and error boundaries
- **Enhanced Language System**: Expanded bilingual support with 70+ translation keys and localStorage persistence
- **Professional UI/UX**: Fixed navbar positioning with two-tier layout, consistent styling, and professional capitalization
- **Mobile-First Design**: Improved responsive design with proper carousel functionality and touch interactions
- **Performance Optimization**: Added code splitting, lazy loading, and optimized component rendering
- **About Us Transformation**: Complete redesign from volunteer section to comprehensive parish information with side navigation, scrollable content cards, and enhanced UX for long-form content

### Backend Modernization
- **Express.js Stability**: Optimized with Express 4.x for production stability and compatibility
- **Enhanced API Design**: Improved routing structure with proper error responses and fallback content
- **Middleware Optimization**: Fixed Express 5.x compatibility issues affecting API endpoints
- **Security Improvements**: Added CORS configuration, rate limiting, and input validation
- **Documentation**: Comprehensive JSDoc comments throughout the codebase

### Code Quality & Developer Experience
- **ESLint & Prettier**: Configured for consistent code formatting and quality enforcement
- **Comprehensive Documentation**: Added detailed JSDoc comments and inline documentation
- **Modern Dependency Management**: Updated to latest stable versions of all packages
- **Error Handling**: Implemented proper error boundaries and graceful failure handling 



## 🚧 Current Features & Progress
✅ **Core Pages**: Built with modernized React components and comprehensive documentation
✅ **Bilingual System**: Complete English/Spanish translation with localStorage persistence
✅ **Fixed Navigation**: Professional two-tier navbar with consistent styling and mobile responsiveness
✅ **Multi-page Routing**: Implemented with react-router-dom and lazy loading
✅ **Event Calendar**: Interactive calendar using react-calendar with dynamic event details
✅ **Mobile-Optimized**: Responsive design with proper carousel functionality and touch interactions
✅ **Scripture Integration**: Backend scraping route pulls daily Gospel excerpt using Cheerio
✅ **Cross-Origin Support**: CORS enabled for frontend/backend development
✅ **Modern Error Handling**: Error boundaries and graceful failure states throughout
✅ **API Stability**: Fixed Express compatibility issues - Readings and Events pages now loading correctly
✅ **Code Quality**: ESLint/Prettier configured with comprehensive documentation
✅ **About Us Page**: Comprehensive three-section layout with side navigation, scrollable content cards, and detailed parish information
✅ **Admin Dashboard**: Complete content management system with event creation, calendar view, and statistics
✅ **Email Subscriptions**: Newsletter signup system with language preferences and subscription management
✅ **Admin Login Button**: User icon in navbar for easy admin access with responsive styling
✅ **Google Calendar Sync**: Full OAuth2 integration with bidirectional event import/export, token storage, and one-click sync button in admin dashboard
✅ **Announcement System**: Full-featured announcement management with file uploads (images/PDFs), priority settings, and bilingual support
✅ **Featured Announcements**: Homepage carousel displaying active announcements with automatic image/document handling
✅ **Enhanced Footer**: Updated with office hours, subscription system integration, and complete contact information
✅ **Subscriber Management**: Admin dashboard for viewing email subscribers with filtering and statistics
✅ **Mass Email System**: Send bulk emails to subscribers with attachment support (images/PDFs), language filtering, and selective targeting
✅ **Google Calendar Integration**: Parish calendar (olfperthamboy@gmail.com) as primary event source with automatic synchronization and embedded calendar view
✅ **Simplified Events Page**: Google Calendar-focused design with responsive embed and synchronized event cards from parish calendar

## 🔧 Technical Implementation Highlights

### Frontend Architecture
- **Component Structure**: Modular React components with lazy loading and Suspense
- **State Management**: Context API for language switching with localStorage persistence
- **Styling**: Scoped CSS with mobile-first responsive design principles and custom scrollbar styling
- **Performance**: Code splitting and optimized rendering patterns
- **UX Design**: Fixed-height scrollable containers with responsive breakpoints for optimal content display

### Backend Architecture
- **API Design**: RESTful Express routes with structured error handling
- **Web Scraping**: Axios & Cheerio integration for USCCB daily Gospel extraction
- **Security**: CORS configuration, input validation, rate limiting, and Helmet.js security headers
- **Modularity**: Clean routing structure with separated concerns
- **API Endpoints**: Updated for production deployment with proper localhost configurations
- **Admin Authentication**: JWT-based admin authentication for content management
- **Email Management**: Subscription system with language preferences and analytics
- **Mass Email System**: Nodemailer integration for bulk email sending with attachment support
- **File Upload System**: Multer integration for announcement and email attachment uploads with validation
- **Static File Serving**: Express static middleware for serving uploaded announcements

### Mobile Responsiveness
- **Navigation**: Hamburger menu with backdrop blur and smooth animations
- **Carousel**: Fixed Slick slider configuration preventing card stacking issues
- **Touch Interactions**: Optimized for mobile devices with proper gesture support

## 🔒 Security Features

This project follows industry best practices for web application security:

### Authentication & Authorization
- JWT-based authentication with secure token storage
- Password hashing using bcrypt (10 salt rounds)
- Admin-only routes protected with middleware
- Rate limiting on sensitive endpoints (20 requests/15 minutes)
- HttpOnly cookies for XSS protection

### API Security
- CORS configuration restricting allowed origins
- Helmet.js for security headers (CSP, HSTS, X-Frame-Options)
- Input validation and sanitization on all endpoints
- MongoDB injection prevention through Mongoose schemas
- Environment variable protection (never committed to repo)

### File Upload Security
- File type validation (images: JPG/PNG/GIF, documents: PDF/DOC/DOCX)
- File size limits (10MB max per upload)
- Multer middleware with memory storage for email attachments
- Disk storage with unique filenames for announcements
- Static file serving with proper MIME types

### OAuth Security
- Google OAuth 2.0 with offline access and refresh tokens
- State tokens signed with JWT to prevent CSRF
- Secure token storage in MongoDB with expiry tracking
- Automatic token refresh handling

### Email Security
- App-specific passwords (never account passwords)
- BCC for recipient privacy in mass emails
- HTML email sanitization
- Attachment validation before sending

**For detailed security guidelines, see [SECURITY.md](SECURITY.md)**

## 🔮 Planned Features
- **Payment Integration**: Donation and e-store integration (Stripe, PayPal, Donorbox)
- **Interactive Forms**: Contact and prayer request forms with backend processing
- **Dynamic Content**: Saint of the Day module with automated content updates
- **Enhanced Scripture**: Advanced scraping for Responsorial Psalms and complete Gospel segments
- **TypeScript Migration**: Type safety implementation for improved developer experience
- **Testing Suite**: Comprehensive test coverage with Jest/Vitest
- **Email Automation**: Automated newsletter generation and distribution system
- **Two-Factor Authentication**: Enhanced admin security with 2FA

## 🎯 Vision
To deliver a welcoming digital home where parishioners and visitors can find worship times, daily inspiration, and ways to connect—all through an interface that is intuitive, inclusive, and spiritually enriching.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB Atlas account (for database)
- Google Cloud Console account (for Calendar OAuth)
- Gmail account with app-specific password (for email features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Luisgrande717/CapstoneLG2025.git
   cd CapstoneLG2025
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `.env` with your credentials:
   ```env
   # MongoDB Connection
   MONGODB_URI=your-mongodb-connection-string

   # JWT Secret (generate a strong random string)
   JWT_SECRET=your-secure-jwt-secret

   # Google OAuth (from Google Cloud Console)
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REDIRECT_URI=http://localhost:8080/api/google-calendar/oauth2callback

   # Email Configuration (Gmail app password)
   EMAIL_USER=your-parish-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   ```

   ⚠️ **NEVER** commit your `.env` file to version control!

4. **Start development servers**
   ```bash
   # Terminal 1 - Backend server
   cd backend
   npm start
   # Runs on http://localhost:8080

   # Terminal 2 - Frontend server
   cd frontend
   npm run dev
   # Runs on http://localhost:5173
   ```

5. **Create admin account**
   ```bash
   cd backend
   node scripts/createAdmin.js
   ```

6. **Access the application**
   - **Public site**: http://localhost:5173
   - **Admin dashboard**: http://localhost:5173/admin/login

### Development Notes
- The site is fully responsive and optimized for mobile devices
- All text content supports English/Spanish translation
- ESLint and Prettier are configured for code quality
- Comprehensive JSDoc documentation is available throughout the codebase

### Recent Improvements (October 2025)
- **Admin Access Enhancement**: Added user icon button to navbar for quick admin login access
- **Responsive Admin Button**: Implemented mobile-responsive admin button with hover effects
- **Google Calendar OAuth**: Improved OAuth2 client initialization with lazy loading pattern
- **Enhanced Logging**: Added comprehensive credential validation logging for Google Calendar
- **React Hooks Compliance**: Fixed React hooks exhaustive-deps warnings in AuthContext
- **Navigation Improvements**: Replaced Navigate component with useNavigate hook for better UX
- **Google Calendar Sync Implementation**: Added complete event synchronization with JWT-signed OAuth state tokens
- **Token Persistence**: Created GoogleCalendarToken MongoDB model for secure OAuth token storage
- **Event Import/Export**: Implemented /sync and /export endpoints with duplicate prevention logic
- **Admin Dashboard Sync Button**: One-click Google Calendar sync with success feedback and event counter
- **Announcement Management System**: Complete CRUD operations for parish announcements with priority-based display
- **File Upload Integration**: Multer-based file upload system supporting images (JPG, PNG, GIF) and documents (PDF, DOC, DOCX)
- **Bilingual Announcements**: Full bilingual support with separate English/Spanish title and description fields
- **Featured Announcement Carousel**: Homepage integration displaying active announcements with automatic file type detection
- **Footer Enhancement**: Updated footer with detailed office hours, email subscription integration, and social media links
- **Announcement Toggle System**: One-click activation/deactivation with automatic deactivation of other announcements
- **Subscriber Management Dashboard**: Admin interface for viewing and managing email subscribers with filtering by language and source
- **Mass Email System**: Nodemailer-powered bulk email sending with HTML templates, attachment support, and selective targeting
- **Email Composition Interface**: Rich email composer with subject, message, file attachments, and recipient filtering options
- **Subscriber Analytics**: Real-time statistics showing total subscribers, language preferences, and subscription sources
- **Parish Calendar Integration**: Updated sync and export endpoints to use olfperthamboy@gmail.com as primary parish calendar
- **Simplified Events Page**: Removed react-calendar in favor of Google Calendar embed as the primary calendar interface
- **Enhanced Event Cards**: Redesigned event display with improved formatting, emojis for visual hierarchy, and better responsive grid layout

### Bug Fixes (September 2025)
- **Express Compatibility**: Resolved Express 5.x compatibility issues causing API failures
- **API Endpoints**: Fixed "Cannot set property query" error affecting Readings and Events pages
- **Middleware Stability**: Optimized middleware stack for production reliability
- **Variable Naming**: Resolved naming conflicts in MongoDB query handling
- **Translation Key Display**: Fixed AboutUs page showing translation keys instead of actual content
- **Language Context**: Resolved missing language variable in useLanguage hook destructuring
- **Bilingual Content**: Ensured proper language switching functionality across all AboutUs sections
