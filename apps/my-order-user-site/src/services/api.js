// Mock API services
const API_BASE = '/api';

// Mock data
const mockServices = [
  {
    id: 1,
    name: '塔羅占卜',
    price: 800,
    description: '透過塔羅牌的智慧，解讀你的過去、現在與未來，為你指引方向。',
    category: 'divination',
    image: '/images/tarot.jpg'
  },
  {
    id: 2,
    name: '魔法蠟燭',
    price: 500,
    description: '特製的魔法蠟燭，點燃後能幫助淨化空間，帶來好運與正能量。',
    category: 'products',
    image: '/images/candle.jpg'
  },
  {
    id: 3,
    name: '月老紅線',
    price: 1200,
    description: '尋找你命中注定的另一半，讓月老為你牽起紅線，連結你們的姻緣。',
    category: 'love',
    image: '/images/redstring.jpg'
  },
  {
    id: 4,
    name: '八字&紫微斗數',
    price: 1500,
    description: '通過你的出生時間，解讀你的命盤，了解你的人生軌跡與潛能。',
    category: 'astrology',
    image: '/images/astrology.jpg'
  },
  {
    id: 5,
    name: '靈擺調頻',
    price: 700,
    description: '通過靈擺的擺動，連接你的潛意識，幫助你找到問題的答案。',
    category: 'divination',
    image: '/images/pendulum.jpg'
  },
  {
    id: 6,
    name: '潛意識讀心',
    price: 1000,
    description: '深入你的潛意識，發掘隱藏的情緒與想法，幫助你更了解自己。',
    category: 'psychic',
    image: '/images/mindreading.jpg'
  }
];

let mockOrders = [];
let orderIdCounter = 10000;

// Mock user data
let mockUser = null;

// API functions
export const api = {
  // Services
  getServices: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockServices), 500);
    });
  },

  getService: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const service = mockServices.find(s => s.id === parseInt(id));
        if (service) {
          resolve(service);
        } else {
          reject(new Error('Service not found'));
        }
      }, 300);
    });
  },

  // User/Auth
  login: (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock login - always succeeds
        mockUser = {
          id: 1,
          name: credentials.name || 'Test User',
          phone: credentials.phone,
          instagram: credentials.instagram,
          membership: determineMembership(1000) // Mock with 1000 spending
        };
        resolve(mockUser);
      }, 800);
    });
  },

  register: (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockUser = {
          id: Date.now(),
          ...userData,
          membership: null
        };
        resolve(mockUser);
      }, 800);
    });
  },

  getCurrentUser: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUser), 200);
    });
  },

  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        mockUser = null;
        resolve();
      }, 200);
    });
  },

  // Orders
  createOrder: (orderData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder = {
          id: ++orderIdCounter,
          ...orderData,
          createdAt: new Date().toISOString(),
          status: 'pending'
        };
        
        mockOrders.push(newOrder);
        
        // Update user membership if applicable
        if (mockUser) {
          const newMembership = determineMembership(orderData.total);
          if (newMembership) {
            mockUser.membership = newMembership;
          }
        }
        
        resolve(newOrder);
      }, 1000);
    });
  },

  getOrders: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOrders), 500);
    });
  }
};

// Helper function to determine membership level
function determineMembership(amount) {
  if (amount >= 1999) return 'diamond';
  if (amount >= 1500) return 'platinum';
  if (amount >= 1000) return 'gold';
  return null;
}

// Membership discount rates
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
