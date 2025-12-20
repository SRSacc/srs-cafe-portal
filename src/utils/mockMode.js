/**
 * Utility functions for mock data mode
 */

/**
 * Check if the app is running in development mode
 */
export const isDevelopmentMode = () => {
  return import.meta.env.DEV;
};

/**
 * Check if we should use mock data
 * Returns true if:
 * - Running in development mode AND
 * - No token exists OR token is the mock-token
 */
export const shouldUseMockData = () => {
  if (!isDevelopmentMode()) {
    return false;
  }
  
  const token = localStorage.getItem('token');
  return !token || token === 'mock-token';
};

/**
 * Set a mock token for development mode
 * Only works in development mode
 */
export const setMockToken = () => {
  if (isDevelopmentMode() && !localStorage.getItem('token')) {
    localStorage.setItem('token', 'mock-token');
    return 'mock-token';
  }
  return localStorage.getItem('token');
};
