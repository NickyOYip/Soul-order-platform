// Mock API for Admin Site - Easy deployment with real product data
// This file imports all product data from local admin site data files and provides API methods

// Import all product data from local admin site data
import { candleProducts } from '../data/product/candleProducts.js';
import { tarotProducts } from '../data/product/tarotProducts.js';
import { psychicProducts } from '../data/product/psychicProducts.js';
import { frequencyProducts } from '../data/product/frequencyProducts.js';
import { loveProducts } from '../data/product/loveProducts.js';
import { astrologyProducts } from '../data/product/astrologyProducts.js';

// Service categories and subcategories configuration
export const serviceCategories = [
  { id: 'all', name: '全部服務', description: '所有魔法與靈性服務' },
  { id: 'candles', name: '魔法蠟燭', description: '注入能量的神聖蠟燭' },
  { id: 'frequency', name: '靈擺調頻', description: '能量頻率調整服務' },
  { id: 'tarot', name: '塔羅占卜', description: '古老智慧的指引' },
  { id: 'astrology', name: '命理占星', description: '八字與紫微斗數' },
  { id: 'love', name: '月老紅線', description: '愛情與姻緣服務' },
  { id: 'psychic', name: '心靈探索', description: '潛意識與心靈療癒' },
];

export const candleSubCategories = [
  { id: '七日星體蠟燭', label: '七日星體蠟燭' },
  { id: '戀人蠟燭儀式', label: '戀人蠟燭儀式' },
  { id: '自家款魔法蠟燭', label: '自家款魔法蠟燭' },
  { id: '意念草藥蠟燭', label: '意念草藥蠟燭' }
];

export const frequencySubCategories = [
  { id: '愛情調頻', label: '愛情調頻' },
  { id: '事業財運調頻', label: '事業財運調頻' },
  { id: '自身調頻', label: '自身調頻' },
  { id: '單項 & 加急', label: '單項 & 加急' }
];

export const tarotSubCategories = [
  { key: '線上占卜', label: '線上占卜', icon: '🔮', color: 'indigo' },
  { key: '電話占卜', label: '電話占卜', icon: '📞', color: 'green' },
  { key: '其他服務', label: '其他服務', icon: '⚡', color: 'teal' },
  { key: '門市占卜', label: '門市占卜', icon: '🏪', color: 'purple' }
];

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

// Get subcategories for a specific category
export const getSubCategoriesByCategory = (category) => {
  switch (category) {
    case 'candles':
      return candleSubCategories;
    case 'frequency':
      return frequencySubCategories;
    case 'tarot':
      return tarotSubCategories;
    case 'astrology':
      return [{ id: '八字&紫微斗數', label: '八字&紫微斗數' }];
    case 'love':
      return [{ id: '月老紅線', label: '月老紅線' }];
    case 'psychic':
      return [{ id: '潛意識讀心', label: '潛意識讀心' }];
    default:
      return [];
  }
};

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: '陳小美',
    email: 'chen@example.com',
    phone: '0912345678',
    membershipLevel: 'VIP',
    membership: 'VIP',
    joinDate: '2024-01-15',
    totalOrders: 12,
    orders: 12,
    totalSpent: 15600,
    status: 'active'
  },
  {
    id: 2,
    name: '李大華',
    email: 'lee@example.com',
    phone: '0987654321',
    membershipLevel: '金級會員',
    membership: '金級會員',
    joinDate: '2024-02-20',
    totalOrders: 3,
    orders: 3,
    totalSpent: 2940,
    status: 'active'
  },
  {
    id: 3,
    name: '王小明',
    email: 'wang@example.com',
    phone: '0933333333',
    membershipLevel: '普通會員',
    membership: '普通會員',
    joinDate: '2024-03-10',
    totalOrders: 1,
    orders: 1,
    totalSpent: 988,
    status: 'inactive'
  },
  {
    id: 4,
    name: '張小花',
    email: 'zhang@example.com',
    phone: '0944444444',
    membershipLevel: '白金級會員',
    membership: '白金級會員',
    joinDate: '2024-04-15',
    totalOrders: 8,
    orders: 8,
    totalSpent: 7800,
    status: 'active'
  }
];

// Mock data for orders
const mockOrders = [
  {
    id: 'ORD001',
    customerName: '陳小美',
    customerEmail: 'chen@example.com',
    date: '2024-01-20',
    orderDate: '2024-01-20',
    status: 'completed',
    paymentStatus: '已付款',
    total: 2964,
    totalAmount: 2964,
    completedDate: '2024-01-20',
    items: [
      { name: 'Love Me Lots', quantity: 1, price: 988 },
      { name: 'Intranquil 舊情復熾', quantity: 2, price: 988 }
    ],
    products: [
      { name: 'Love Me Lots', quantity: 1, price: 988 },
      { name: 'Intranquil 舊情復熾', quantity: 2, price: 988 }
    ]
  },
  {
    id: 'ORD002', 
    customerName: '李大華',
    customerEmail: 'lee@example.com',
    date: '2024-01-25',
    orderDate: '2024-01-25',
    status: 'processing',
    paymentStatus: '已付款',
    total: 1476,
    totalAmount: 1476,
    completedDate: null,
    items: [
      { name: '靈擺調頻 - 愛情調頻', quantity: 1, price: 1476 }
    ],
    products: [
      { name: '靈擺調頻 - 愛情調頻', quantity: 1, price: 1476 }
    ]
  },
  {
    id: 'ORD003',
    customerName: '王小明', 
    customerEmail: 'wang@example.com',
    date: '2024-02-01',
    orderDate: '2024-02-01',
    status: 'pending',
    paymentStatus: '未付款',
    total: 988,
    totalAmount: 988,
    completedDate: null,
    items: [
      { name: 'Break Up 分手蠟燭', quantity: 1, price: 988 }
    ],
    products: [
      { name: 'Break Up 分手蠟燭', quantity: 1, price: 988 }
    ]
  },
  {
    id: 'ORD004',
    customerName: '張小花',
    customerEmail: 'zhang@example.com', 
    date: '2024-02-05',
    orderDate: '2024-02-05',
    status: '已取消',
    paymentStatus: '已退款',
    total: 1690,
    totalAmount: 1690,
    completedDate: null,
    items: [
      { name: '靈擺調頻 - 事業財運調頻', quantity: 1, price: 1690 }
    ],
    products: [
      { name: '靈擺調頻 - 事業財運調頻', quantity: 1, price: 1690 }
    ]
  }
];

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
  }
};

export default mockApi;
