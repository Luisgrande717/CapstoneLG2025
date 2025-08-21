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

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';

// Lazy-loaded pages for better performance
const Homepage = lazy(() => import('./pages/Homepage'));
const Login = lazy(() => import('./pages/Login'));
const Mass = lazy(() => import('./pages/Mass'));
const Events = lazy(() => import('./pages/Events'));
const Donate = lazy(() => import('./pages/Donate'));
const Sacraments = lazy(() => import('./pages/Sacraments'));
const Volunteer = lazy(() => import('./pages/Volunteer'));
const Readings = lazy(() => import('./pages/Readings'));

/**
 * Application routing configuration
 * Implements lazy loading for optimal performance
 *
 * @returns {JSX.Element} Router component with all application routes
 */
function AppRoutes() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
              console.error('Application Error:', error, errorInfo);
              // TODO: Send to error reporting service in production
            }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mass" element={<Mass />} />
                <Route path="/events" element={<Events />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/sacraments" element={<Sacraments />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/readings" element={<Readings />} />
                {/* 404 Route */}
                <Route path="*" element={<ErrorFallback error={{ message: 'Page not found' }} />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
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
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}
