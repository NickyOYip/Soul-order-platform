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
    case 'gold': return '金卡會員';
    case 'platinum': return '白金會員';
    case 'diamond': return '鑽石會員';
    default: return '';
  }
};

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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 1,
          name: credentials.name || 'Test User',
          phone: credentials.phone,
          instagram: credentials.instagram,
          membership: determineMembership(1000) // Mock with 1000 spending
        });
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
          id: Date.now(),
          ...userData,
          membership: null
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
