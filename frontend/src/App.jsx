/**
 * Main Application Component for Our Lady of Fatima Parish Website
 *
 * A modern MERN stack application providing bilingual parish services including:
 * - Mass schedules and events
 * - Daily scripture readings via web scraping
 * - Community engagement features (donations, volunteering, sacraments)
 * - Responsive design with mobile-first approach
 *
 * @author Parish Development Team
 * @version 2.0.0
 * @since 2025
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css';

// Context Providers
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy-loaded pages for better performance
const Homepage = lazy(() => import('./pages/Homepage'));
const Mass = lazy(() => import('./pages/Mass'));
const Events = lazy(() => import('./pages/Events'));
const Donate = lazy(() => import('./pages/Donate'));
const Sacraments = lazy(() => import('./pages/Sacraments'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Readings = lazy(() => import('./pages/Readings'));

// Admin components
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

/**
 * Public Layout Component
 * Standard layout with navbar and footer for public pages
 */
function PublicLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

/**
 * Admin Layout Component  
 * Clean layout without main navbar for admin pages
 */
function AdminLayout({ children }) {
  return (
    <div className="app-layout admin-layout">
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
}

/**
 * Application routing configuration
 * Implements lazy loading and conditional layouts
 *
 * @returns {JSX.Element} Router component with all application routes
 */
function AppRoutes() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Application Error:', error, errorInfo);
        // TODO: Send to error reporting service in production
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes with Standard Layout */}
          <Route path="/" element={<PublicLayout><Homepage /></PublicLayout>} />
          <Route path="/mass" element={<PublicLayout><Mass /></PublicLayout>} />
          <Route path="/events" element={<PublicLayout><Events /></PublicLayout>} />
          <Route path="/donate" element={<PublicLayout><Donate /></PublicLayout>} />
          <Route path="/sacraments" element={<PublicLayout><Sacraments /></PublicLayout>} />
          <Route path="/about-us" element={<PublicLayout><AboutUs /></PublicLayout>} />
          <Route path="/readings" element={<PublicLayout><Readings /></PublicLayout>} />
          
          {/* Admin Routes with Clean Layout */}
          <Route 
            path="/admin/login" 
            element={
              <AdminLayout>
                <AdminLogin />
              </AdminLayout>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminLayout>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </AdminLayout>
            } 
          />
          
          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <PublicLayout>
                <ErrorFallback error={{ message: 'Page not found' }} />
              </PublicLayout>
            } 
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

/**
 * Root Application Component
 * Wraps the entire application with necessary providers
 *
 * @returns {JSX.Element} Complete application with context providers
 */
export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}
