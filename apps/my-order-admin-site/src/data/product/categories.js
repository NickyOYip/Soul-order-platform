// Service categories and subcategories configuration
export const serviceCategories = [
  { id: 'all', name: '全部服務', description: '所有魔法與靈性服務' },
  { id: 'candles', name: '魔法蠟燭', description: '注入能量的神聖蠟燭' },
  { id: 'frequency', name: '靈擺調頻', description: '能量頻率調整服務' },
  { id: 'tarot', name: '塔羅占卜', description: '古老智慧的指引' },
  { id: 'astrology', name: '命理占星', description: '八字與紫微斗數' },
  { id: 'love', name: '月老紅線', description: '愛情與姻緣服務' },
  { id: 'psychic', name: '潛意識讀心', description: '潛意識與心靈療癒' },
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
