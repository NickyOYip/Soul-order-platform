// API Configuration for Easy Deployment
// Switch between mock and real API by changing USE_MOCK_API

const API_CONFIG = {
  // Set to false when deploying to production with real API
  // Can be overridden by VITE_USE_MOCK_API environment variable
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API !== 'false',
  
  // Real API endpoints (configure these for production)
  REAL_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  
  ENDPOINTS: {
    PRODUCTS: '/products',
    USERS: '/users', 
    ORDERS: '/orders',
    AUTH: '/auth'
  }
};

export default API_CONFIG;
