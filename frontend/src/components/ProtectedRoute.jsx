/**
 * Protected Route Component
 * 
 * Provides route protection for admin-only pages with
 * authentication checks and role-based access control
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * ProtectedRoute component for admin authentication
 * 
 * @param {Object} props - Component props
 * @param {JSX.Element} props.children - Child components to render if authenticated
 * @param {string} props.requiredRole - Required role ('admin' or 'moderator')
 * @returns {JSX.Element} Protected content or redirect
 */
const ProtectedRoute = ({ children, requiredRole = 'moderator' }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Admin access required.</p>
      </div>
    );
  }

  if (requiredRole === 'moderator' && !['admin', 'moderator'].includes(user?.role)) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Moderator or admin access required.</p>
      </div>
    );
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;