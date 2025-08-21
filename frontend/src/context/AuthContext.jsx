/**
 * Authentication Context for Admin System
 * 
 * Manages admin login state, JWT tokens, and user session
 * with automatic token refresh and persistent storage
 * 
 * @author Parish Development Team
 * @version 1.0.0
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// Configure axios defaults
axios.defaults.baseURL = API_URL;

/**
 * Authentication Provider Component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Set authentication token in axios headers and localStorage
   */
  const setAuthToken = useCallback((token) => {
    if (token) {
      localStorage.setItem('adminToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('adminToken');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  /**
   * Login function
   */
  const login = useCallback(async (credential, password) => {
    try {
      setIsLoading(true);
      
      const response = await axios.post('/api/auth/login', {
        credential,
        password
      });

      const { token, user: userData } = response.data.data;
      
      setAuthToken(token);
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.error || 'Login failed';
      return { success: false, error: errorMessage };
      
    } finally {
      setIsLoading(false);
    }
  }, [setAuthToken]);

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, [setAuthToken]);

  /**
   * Get current user profile
   */
  const getCurrentUser = useCallback(async () => {
    try {
      const response = await axios.get('/api/auth/me');
      const userData = response.data.data.user;
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
      
    } catch (error) {
      console.error('Get current user error:', error);
      logout();
      throw error;
    }
  }, [logout]);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (profileData) => {
    try {
      const response = await axios.put('/api/auth/profile', profileData);
      const updatedUser = response.data.data.user;
      
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
      
    } catch (error) {
      console.error('Update profile error:', error);
      
      const errorMessage = error.response?.data?.error || 'Profile update failed';
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Change password
   */
  const changePassword = useCallback(async (currentPassword, newPassword) => {
    try {
      await axios.put('/api/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      return { success: true };
      
    } catch (error) {
      console.error('Change password error:', error);
      
      const errorMessage = error.response?.data?.error || 'Password change failed';
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Check if user has admin role
   */
  const isAdmin = useCallback(() => {
    return user?.role === 'admin';
  }, [user]);

  /**
   * Check if user has moderator or admin role
   */
  const isModerator = useCallback(() => {
    return user?.role === 'admin' || user?.role === 'moderator';
  }, [user]);

  /**
   * Initialize authentication on app start
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (token) {
        setAuthToken(token);
        try {
          await getCurrentUser();
        } catch (error) {
          console.error('Failed to verify token:', error);
          logout();
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, [setAuthToken, getCurrentUser, logout]);

  /**
   * Setup axios interceptors for automatic token handling
   */
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    getCurrentUser,
    updateProfile,
    changePassword,
    isAdmin,
    isModerator
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;