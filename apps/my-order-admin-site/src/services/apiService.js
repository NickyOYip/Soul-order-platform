// Main API Service - Easy deployment with mock/real API switching
import API_CONFIG from '../config/apiConfig';
import { mockApi } from './mockApi';

// Real API service functions (for production deployment)
const realApi = {
  getAllProducts: async () => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}?category=${category}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to add product');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Failed to update product');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  toggleProductStatus: async (id) => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}/toggle-status`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to toggle product status');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // User management APIs
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
  updateUser: async (id, userData) => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.USERS}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Order management APIs
  getAllOrders: async () => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.ORDERS}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  updateOrderStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_CONFIG.REAL_API_BASE_URL}${API_CONFIG.ENDPOINTS.ORDERS}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update order');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

// Main API service that switches between mock and real API
const apiService = {
  // Product APIs
  getAllProducts: () => {
    return API_CONFIG.USE_MOCK_API ? mockApi.getAllProducts() : realApi.getAllProducts();
  },

  getProductsByCategory: (category) => {
    return API_CONFIG.USE_MOCK_API ? mockApi.getProductsByCategory(category) : realApi.getProductsByCategory(category);
  },

  addProduct: (productData) => {
    return API_CONFIG.USE_MOCK_API ? mockApi.addProduct(productData) : realApi.addProduct(productData);
  },

  updateProduct: (id, productData) => {
    return API_CONFIG.USE_MOCK_API ? mockApi.updateProduct(id, productData) : realApi.updateProduct(id, productData);
  },
  toggleProductStatus: (id) => {
    return API_CONFIG.USE_MOCK_API ? mockApi.toggleProductStatus(id) : realApi.toggleProductStatus(id);
  },

  // User APIs
  getAllUsers: () => {
    return API_CONFIG.USE_MOCK_API ? mockApi.getAllUsers() : realApi.getAllUsers();
  },
  updateUser: (id, userData) => {
    return API_CONFIG.USE_MOCK_API ? mockApi.updateUser(id, userData) : realApi.updateUser(id, userData);
  },

  deleteUser: (id) => {
    return API_CONFIG.USE_MOCK_API ? mockApi.deleteUser(id) : realApi.deleteUser(id);
  },

  // Order APIs
  getAllOrders: () => {
    return API_CONFIG.USE_MOCK_API ? mockApi.getAllOrders() : realApi.getAllOrders();
  },
  updateOrderStatus: (id, status) => {
    return API_CONFIG.USE_MOCK_API ? mockApi.updateOrderStatus(id, status) : realApi.updateOrderStatus(id, status);
  },

  updateOrder: (id, orderData) => {
    return API_CONFIG.USE_MOCK_API ? mockApi.updateOrder(id, orderData) : realApi.updateOrder(id, orderData);
  }
};

export default apiService;
