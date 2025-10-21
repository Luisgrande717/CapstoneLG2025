# Our Lady of Fatima Parish Website (MERN Stack)

## Purpose
This project is a bilingual, community-focused website built to serve the Our Lady of Fatima parish. It features mass schedules, upcoming events, and easy navigation—all designed for accessibility and spiritual engagement.
The site uses a modular React frontend and is evolving into a full MERN-stack application with spiritual content automation, admin tools, and community impact at its core.

## 🛠️ Tech Stack Overview (MERN)
| Technology | Status | Role | 
|------------|--------|------|
| MongoDB | Planned | Will store dynamic events, parish updates, and user data | 
| Express.js | ✅ Modernized | Powers backend API routes, including dynamic reading scraping | 
| React.js | ✅ Modernized | Manages frontend components, bilingual UI, and page routing | 
| Node.js | ✅ Modernized | Backend runtime, API orchestration, and server configuration |

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
✅ **Google Calendar Integration**: OAuth2 authentication with improved error handling and credential validation

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
- **Security**: CORS configuration, input validation, and rate limiting
- **Modularity**: Clean routing structure with separated concerns
- **API Endpoints**: Updated for production deployment with proper localhost configurations
- **Admin Authentication**: JWT-based admin authentication for content management
- **Email Management**: Subscription system with language preferences and analytics

### Mobile Responsiveness
- **Navigation**: Hamburger menu with backdrop blur and smooth animations
- **Carousel**: Fixed Slick slider configuration preventing card stacking issues
- **Touch Interactions**: Optimized for mobile devices with proper gesture support

## 🔮 Planned Features
- **Payment Integration**: Donation and e-store integration (Stripe, PayPal, Donorbox)
- **Interactive Forms**: Contact and prayer request forms with backend processing
- **Dynamic Content**: Saint of the Day module with automated content updates
- **Enhanced Scripture**: Advanced scraping for Responsorial Psalms and complete Gospel segments
- **Database Integration**: Live MongoDB connection for dynamic content management
- **TypeScript Migration**: Type safety implementation for improved developer experience
- **Testing Suite**: Comprehensive test coverage with Jest/Vitest
- **Email Automation**: Automated newsletter generation and distribution system

## 🎯 Vision
To deliver a welcoming digital home where parishioners and visitors can find worship times, daily inspiration, and ways to connect—all through an interface that is intuitive, inclusive, and spiritually enriching.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
2. Install frontend dependencies: `cd frontend && npm install`
3. Install backend dependencies: `cd backend && npm install`
4. Start development servers:
   - Frontend: `npm run dev` (runs on http://localhost:5173)
   - Backend: `npm start` (runs on http://localhost:8080)

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

### Bug Fixes (September 2025)
- **Express Compatibility**: Resolved Express 5.x compatibility issues causing API failures
- **API Endpoints**: Fixed "Cannot set property query" error affecting Readings and Events pages
- **Middleware Stability**: Optimized middleware stack for production reliability
- **Variable Naming**: Resolved naming conflicts in MongoDB query handling
- **Translation Key Display**: Fixed AboutUs page showing translation keys instead of actual content
- **Language Context**: Resolved missing language variable in useLanguage hook destructuring
- **Bilingual Content**: Ensured proper language switching functionality across all AboutUs sections
