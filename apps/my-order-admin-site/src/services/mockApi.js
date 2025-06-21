// Mock API for Admin Site - Easy deployment with real product data
// This file imports all product data from local admin site data files and provides API methods

// Import all product data from local admin site data
import { candleProducts } from '../data/product/candleProducts.js';
import { tarotProducts } from '../data/product/tarotProducts.js';
import { psychicProducts } from '../data/product/psychicProducts.js';
import { frequencyProducts } from '../data/product/frequencyProducts.js';
import { loveProducts } from '../data/product/loveProducts.js';
import { astrologyProducts } from '../data/product/astrologyProducts.js';

// Import mock data
import { mockUsers } from '../data/user/users.js';
import { mockOrders } from '../data/order/orders.js';
import { 
  serviceCategories, 
  candleSubCategories, 
  frequencySubCategories, 
  tarotSubCategories,
  getSubCategoriesByCategory 
} from '../data/product/categories.js';

// Re-export categories for backwards compatibility
export { 
  serviceCategories, 
  candleSubCategories, 
  frequencySubCategories, 
  tarotSubCategories,
  getSubCategoriesByCategory 
};

// Combine all products into one array
export const getAllProducts = () => {
  return [
    ...candleProducts,
    ...tarotProducts,
    ...psychicProducts,
    ...frequencyProducts,
    ...loveProducts,
    ...astrologyProducts
  ];
};

// Get products by category
export const getProductsByCategory = (category) => {
  const allProducts = getAllProducts();
  if (category === 'all') {
    return allProducts;
  }
  return allProducts.filter(product => product.category === category);
};

// Get products by subcategory
export const getProductsBySubCategory = (category, subCategory) => {
  const categoryProducts = getProductsByCategory(category);
  if (!subCategory) {
    return categoryProducts;
  }
  return categoryProducts.filter(product => product.subCategory === subCategory);
};

// Mock API functions for CRUD operations
export const mockApi = {
  // Product APIs
  getAllProducts: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getAllProducts());
      }, 100);
    });
  },

  // Get products by category
  getProductsByCategory: (category) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getProductsByCategory(category));
      }, 100);
    });
  },

  // Add new product (mock)
  addProduct: (productData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newProduct = {
          ...productData,
          id: Date.now() // Simple ID generation for mock
        };
        resolve(newProduct);
      }, 200);
    });
  },

  // Update product (mock)
  updateProduct: (id, productData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ...productData, id });
      }, 200);
    });
  },
  // Toggle product status (disable/enable instead of delete)
  toggleProductStatus: (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, id, action: 'toggled' });
      }, 200);
    });
  },

  // User APIs
  getAllUsers: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockUsers);
      }, 100);
    });
  },
  updateUser: (id, userData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ ...userData, id });
      }, 200);
    });
  },

  deleteUser: (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, id });
      }, 200);
    });
  },

  // Order APIs
  getAllOrders: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockOrders);
      }, 100);
    });
  },
  updateOrderStatus: (id, status) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, id, status });
      }, 200);
    });
  },

  updateOrder: (id, orderData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, id, data: orderData });
      }, 200);
    });
  }
};

export default mockApi;
