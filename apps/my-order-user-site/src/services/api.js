// API services for Soul Order Platform
// This file provides the API interface for the frontend
// Ready for backend integration - replace temporary data imports with actual API calls

import { candleProducts } from '../data/candleProducts.js';
import { frequencyProducts } from '../data/frequencyProducts.js';
import { tarotProducts } from '../data/tarotProducts.js';
import { psychicProducts } from '../data/psychicProducts.js';
import { astrologyProducts } from '../data/astrologyProducts.js';
import { loveProducts } from '../data/loveProducts.js';

// API base URL - for development, use '/api' or set via environment variable in build process
const API_BASE = import.meta.env?.VITE_API_BASE || '/api';

// Service categories configuration
export const serviceCategories = [
  { id: 'all', name: '全部服務', description: '所有魔法與靈性服務' },
  { id: 'candles', name: '魔法蠟燭', description: '注入能量的神聖蠟燭' },
  { id: 'frequency', name: '靈擺調頻', description: '能量頻率調整服務' },
  { id: 'tarot', name: '塔羅占卜', description: '古老智慧的指引' },
  { id: 'astrology', name: '命理占星', description: '八字與紫微斗數' },
  { id: 'love', name: '月老紅線', description: '愛情與姻緣服務' },
  { id: 'psychic', name: '心靈探索', description: '潛意識與心靈療癒' },

];

// Membership configuration
export const membershipDiscounts = {
  gold: 0.05,      // 5% discount (95% price)
  platinum: 0.10,  // 10% discount (90% price)  
  diamond: 0.15    // 15% discount (85% price)
};

export const getMembershipName = (membership) => {
  switch (membership) {
    case 'gold': return '金級會員';
    case 'platinum': return '白金級會員';
    case 'diamond': return '鑽石級會員';
    default: return '';
  }
};

// Navigation configuration - TODO: Move to backend configuration API
export const navigationItems = [
  { id: 'home', label: '首頁' },
  { id: 'membership', label: '會員制度' },
  { id: 'cart', label: '購物車' }
];

export const serviceNavigationCategories = [
  { id: 'candles', label: '魔法蠟燭', page: 'candles' },
  { id: 'frequency', label: '靈擺調頻', page: 'frequency' },
  { id: 'tarot', label: '塔羅占卜', page: 'tarot' },
  { id: 'astrology', label: '八字 & 紫微斗數', page: 'astrology' },
  { id: 'love', label: '月老紅線', page: 'love' },
  { id: 'psychic', label: '潛意識讀心', page: 'psychic' }
];

export const homePageServiceCategories = [
  {
    id: 'candles',
    name: '魔法蠟燭',
    description: '注入能量的神聖蠟燭，為您帶來好運與保護',
    icon: '🕯️',
    color: 'from-orange-400 to-red-400',
    page: 'candles'
  },
  {
    id: 'tarot',
    name: '塔羅占卜',
    description: '透過古老智慧解讀人生的過去、現在與未來',
    icon: '🔮',
    color: 'from-purple-400 to-indigo-400',
    page: 'tarot'
  },
  {
    id: 'love',
    name: '月老紅線',
    description: '月老牽線，為您尋找命中注定的良緣',
    icon: '💕',
    color: 'from-pink-400 to-red-400',
    page: 'love'
  },
  {
    id: 'astrology',
    name: '八字 & 紫微斗數',
    description: '根據出生時間解讀命盤奧秘，了解人生軌跡',
    icon: '⭐',
    color: 'from-amber-400 to-orange-400',
    page: 'astrology'
  },
  {
    id: 'frequency',
    name: '靈擺調頻',
    description: '運用靈擺的能量共振，調整您的能量頻率',
    icon: '🔄',
    color: 'from-teal-400 to-blue-400',
    page: 'frequency'
  },
  {
    id: 'psychic',
    name: '潛意識讀心',
    description: '透過心靈圖卡探索內心深處的真實想法',
    icon: '🧠',
    color: 'from-blue-400 to-purple-400',
    page: 'psychic'
  }
];

export const membershipTiers = [
  {
    id: 'gold',
    name: '金級會員',
    requirement: '單次消費滿HK$1000',
    discount: '所有產品服務一律95折',
    discountPercent: '5%',
    color: 'from-yellow-300 to-yellow-500',
    textColor: 'text-black',
    birthdayBenefit: '生日消費券HK$50（該月內使用）',
    validPeriod: '一年',
    upgradeCondition: '會員身份完結前的一個月內累積消費滿HK$2000',
    benefits: [
      '所有產品服務一律95折',
      '生日消費券HK$50（該月內使用）',
      '有效期限：一年'
    ]
  },
  {
    id: 'platinum',
    name: '白金級會員',
    requirement: '單次消費滿HK$1500',
    discount: '所有產品服務一律9折',
    discountPercent: '10%',
    color: 'from-gray-300 to-gray-500',
    textColor: 'text-black',
    birthdayBenefit: '生日消費券HK$100（該月內使用）',
    validPeriod: '一年',
    upgradeCondition: '會員身份完結前的一個月內累積消費滿HK$2500',
    benefits: [
      '所有產品服務一律9折',
      '生日消費券HK$100（該月內使用）',
      '有效期限：一年'
    ]
  },
  {
    id: 'diamond',
    name: '鑽石級會員',
    requirement: '單次消費滿HK$2000',
    discount: '所有產品服務一律85折',
    discountPercent: '15%',
    color: 'from-blue-300 to-purple-500',
    textColor: 'text-white',
    birthdayBenefit: '生日消費券HK$150（該月內使用）',
    validPeriod: '一年',
    upgradeCondition: '會員身份完結前的一個月內累積消費滿HK$3000',
    benefits: [
      '所有產品服務一律85折',
      '生日消費券HK$150（該月內使用）',
      '有效期限：一年'
    ]
  }
];

export const paymentMethods = [
  { id: 'FPS', name: 'FPS', icon: '💳' },
  { id: 'PayMe', name: 'PayMe', icon: '📱' },
  { id: 'Alipay', name: 'Alipay', icon: '💰' }
];

export const candleSubCategories = [
  { id: '七日星體蠟燭', label: '七日星體蠟燭' },
  { id: '戀人蠟燭儀式', label: '戀人蠟燭儀式' },
  { id: '自家款魔法蠟燭', label: '自家款魔法蠟燭' },
  { id: '意念草藥蠟燭', label: '意念草藥蠟燭' }
];

export const frequencySubCategories = [
  { id: 'love', label: '愛情調頻' },
  { id: 'career', label: '事業財運調頻' },
  { id: 'personal', label: '自身調頻' },
  { id: 'consultation', label: '單項 & 加急' }
];

export const tarotSubCategories = [
  { key: '線上占卜', label: '線上占卜', icon: '🔮', color: 'indigo' },
  { key: '電話占卜', label: '電話占卜', icon: '📞', color: 'green' },
  { key: '其他服務', label: '其他服務', icon: '⚡', color: 'teal' },
  { key: '門市占卜', label: '門市占卜', icon: '🏪', color: 'purple' }
];

// Helper function to determine membership level based on spending
function determineMembership(amount) {
  if (amount >= 1999) return 'diamond';
  if (amount >= 1500) return 'platinum';
  if (amount >= 1000) return 'gold';
  return null;
}

// Generic API request helper - ready for backend integration
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Main API object - ready for backend integration
export const api = {
  // Service Categories
  getServiceCategories: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/categories');
    return serviceCategories;
  },

  // Candle Products API
  getCandleProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/candles');
    return candleProducts;
  },

  getPlanetaryCandleProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/candles/planetary');
    return candleProducts.filter(p => p.subCategory === '七日星體蠟燭');
  },

  getPlanetaryCandleProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/candles/planetary/${id}`);
    const product = candleProducts.find(p => p.id === parseInt(id) && p.subCategory === '七日星體蠟燭');
    if (!product) {
      throw new Error('Planetary candle product not found');
    }
    return product;
  },

  getLoversCandleProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/candles/lovers');
    return candleProducts.filter(p => p.subCategory === '戀人蠟燭儀式');
  },

  getLoversCandleProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/candles/lovers/${id}`);
    const product = candleProducts.find(p => p.id === parseInt(id) && p.subCategory === '戀人蠟燭儀式');
    if (!product) {
      throw new Error('Lovers candle product not found');
    }
    return product;
  },

  // Frequency Products API
  getFrequencyLoveProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/frequency/love');
    return frequencyProducts.filter(p => p.subCategory === '愛情調頻');
  },

  getFrequencyLoveProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/frequency/love/${id}`);
    const product = frequencyProducts.find(p => p.id === parseInt(id) && p.subCategory === '愛情調頻');
    if (!product) {
      throw new Error('Frequency love product not found');
    }
    return product;
  },

  getFrequencyCareerProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/frequency/career');
    return frequencyProducts.filter(p => p.subCategory === '事業財運調頻');
  },

  getFrequencyCareerProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/frequency/career/${id}`);
    const product = frequencyProducts.find(p => p.id === parseInt(id) && p.subCategory === '事業財運調頻');
    if (!product) {
      throw new Error('Frequency career product not found');
    }
    return product;
  },

  getFrequencyPersonalProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/frequency/personal');
    return frequencyProducts.filter(p => p.subCategory === '自身調頻');
  },

  getFrequencyPersonalProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/frequency/personal/${id}`);
    const product = frequencyProducts.find(p => p.id === parseInt(id) && p.subCategory === '自身調頻');
    if (!product) {
      throw new Error('Frequency personal product not found');
    }
    return product;
  },

  // Single Item & Urgent Products API
  getFrequencySingleProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/frequency/single');
    return frequencyProducts.filter(p => p.subCategory === '單項 & 加急');
  },

  getFrequencySingleProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/frequency/single/${id}`);
    const product = frequencyProducts.find(p => p.id === parseInt(id) && p.subCategory === '單項 & 加急');
    if (!product) {
      throw new Error('Frequency single/urgent product not found');
    }
    return product;
  },

  // Tarot Products API
  getTarotProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/tarot');
    return tarotProducts;
  },

  getTarotProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/tarot/${id}`);
    const product = tarotProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Tarot product not found');
    }
    return product;
  },

  // Astrology Products API
  getAstrologyProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/astrology');
    return astrologyProducts;
  },

  getAstrologyProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/astrology/${id}`);
    const product = astrologyProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Astrology product not found');
    }
    return product;
  },

  // Love Products API
  getLoveProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/love');
    return loveProducts;
  },

  getLoveProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/love/${id}`);
    const product = loveProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Love product not found');
    }
    return product;
  },

  // Psychic Products API
  getPsychicProducts: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/products/psychic');
    return psychicProducts;
  },

  getPsychicProduct: async (id) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest(`/products/psychic/${id}`);
    const product = psychicProducts.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Psychic product not found');
    }
    return product;
  },

  // User Authentication API
  login: async (credentials) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials)
    // });
    
    // Temporary mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {        // Simulate checking if user exists
        // For demo purposes, if phone starts with '+852', treat as existing user
        if (credentials.phone.startsWith('+852')) {
          resolve({
            id: 1001, // Fixed user ID for existing users
            igName: credentials.igName || 'existing_user',
            phone: credentials.phone,
            membership: determineMembership(1000) // Mock with 1000 spending
          });
        } else {
          // Simulate user not found
          reject(new Error('用戶不存在'));
        }
      }, 800);
    });
  },
  register: async (userData) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify(userData)
    // });
    
    // Temporary mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(), // Generate new user ID
          ...userData,
          membership: null // New users start with no membership
        });
      }, 800);
    });
  },

  getCurrentUser: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/auth/me');
    
    // Temporary mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 200);
    });
  },

  logout: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/auth/logout', { method: 'POST' });
    
    // Temporary mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 200);
    });
  },

  // Orders API
  createOrder: async (orderData) => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/orders', {
    //   method: 'POST',
    //   body: JSON.stringify(orderData)
    // });
    
    // Temporary mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          id: Date.now(),
          ...orderData,
          createdAt: new Date().toISOString(),
          status: 'pending'
        };
        resolve(newOrder);
      }, 1000);
    });
  },

  getOrders: async () => {
    // TODO: Replace with actual API call when backend is ready
    // return await apiRequest('/orders');
    
    // Temporary mock implementation
    return new Promise((resolve) => {
      setTimeout(() => resolve([]), 500);
    });
  }
};
