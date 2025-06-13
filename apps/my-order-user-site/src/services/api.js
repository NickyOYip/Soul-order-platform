// Mock API services
const API_BASE = '/api';

// Mock data - Comprehensive Magical Services
const mockServices = [
  // Candle Services
  {
    id: 1,
    name: '魔法蠟燭',
    category: 'candles',
    description: '特製的魔法蠟燭，注入各種能量與意圖，為你帶來所需的改變。',
    image: '/images/candle.jpg',
    hasOptions: true,
    basePrice: 300,
    options: [
      {
        name: '小型蠟燭',
        price: 300,
        description: '適合個人空間淨化或日常祈願',
        duration: '3-5小時燃燒時間'
      },
      {
        name: '中型蠟燭',
        price: 500,
        description: '適合家庭或辦公室空間',
        duration: '8-12小時燃燒時間'
      },
      {
        name: '大型蠟燭',
        price: 800,
        description: '適合重要儀式或大空間淨化',
        duration: '15-20小時燃燒時間'
      }
    ],
    candleTypes: [
      { name: '愛情蠟燭', color: '粉紅色', purpose: '增進感情運勢' },
      { name: '財富蠟燭', color: '金色', purpose: '提升財運' },
      { name: '健康蠟燭', color: '綠色', purpose: '促進身心健康' },
      { name: '保護蠟燭', color: '白色', purpose: '驅邪護身' },
      { name: '智慧蠟燭', color: '藍色', purpose: '增強直覺和智慧' },
      { name: '淨化蠟燭', color: '紫色', purpose: '清除負能量' }
    ]
  },

  // Frequency Adjustment Services
  {
    id: 2,
    name: '靈擺調頻',
    category: 'frequency',
    description: '運用靈擺的能量共振，調整你的能量頻率，解決生活中的困擾。',
    image: '/images/pendulum.jpg',
    hasOptions: true,
    basePrice: 600,
    options: [
      {
        name: '基礎調頻',
        price: 600,
        description: '單一問題的能量調整',
        duration: '30分鐘',
        includes: ['能量檢測', '基本調頻', '建議指導']
      },
      {
        name: '深度調頻',
        price: 1000,
        description: '全面的能量場調整',
        duration: '60分鐘',
        includes: ['全面能量掃描', '多層次調頻', '能量報告', '後續建議']
      },
      {
        name: '專業調頻療程',
        price: 1500,
        description: '三次連續調頻療程',
        duration: '3次 × 45分鐘',
        includes: ['初診評估', '三次調頻', '進度追蹤', '個人化建議']
      }
    ],
    frequencyTypes: [
      { name: '情感調頻', focus: '情緒平衡與關係和諧' },
      { name: '財富調頻', focus: '金錢能量與豐盛意識' },
      { name: '健康調頻', focus: '身體能量與療癒' },
      { name: '靈性調頻', focus: '靈性成長與直覺開發' },
      { name: '事業調頻', focus: '工作運勢與目標達成' }
    ]
  },

  // Tarot Reading Services
  {
    id: 3,
    name: '塔羅占卜',
    category: 'tarot',
    description: '透過古老的塔羅牌智慧，為你解讀人生的過去、現在與未來。',
    image: '/images/tarot.jpg',
    hasOptions: true,
    basePrice: 500,
    options: [
      {
        name: '單一問題占卜',
        price: 500,
        description: '針對特定問題的深入解讀',
        cards: '3張牌',
        duration: '20分鐘',
        includes: ['問題分析', '牌面解讀', '建議指導']
      },
      {
        name: '生活全面占卜',
        price: 800,
        description: '愛情、事業、財運全方位解讀',
        cards: '7張牌',
        duration: '40分鐘',
        includes: ['多面向分析', '詳細解讀', '未來指引', '書面報告']
      },
      {
        name: '年度運勢占卜',
        price: 1200,
        description: '未來一年的完整運勢預測',
        cards: '12張牌',
        duration: '60分鐘',
        includes: ['月份分析', '重點事件', '注意事項', '詳細報告', '後續諮詢']
      }
    ],
    readingTypes: [
      { name: '愛情占卜', focus: '感情運勢與關係發展' },
      { name: '事業占卜', focus: '工作機會與職涯發展' },
      { name: '財運占卜', focus: '金錢運勢與投資建議' },
      { name: '健康占卜', focus: '身心健康與生活建議' },
      { name: '決策占卜', focus: '重要決定的指引' },
      { name: '靈性占卜', focus: '心靈成長與靈性發展' }
    ]
  },

  // Astrology Services
  {
    id: 4,
    name: '八字命理',
    category: 'astrology',
    description: '根據你的出生八字，解讀命盤奧秘，了解天生性格與人生軌跡。',
    image: '/images/bazi.jpg',
    hasOptions: true,
    basePrice: 800,
    options: [
      {
        name: '基礎八字分析',
        price: 800,
        description: '個人性格與基本運勢分析',
        duration: '45分鐘',
        includes: ['五行分析', '性格解讀', '基本運勢']
      },
      {
        name: '詳細命盤解讀',
        price: 1200,
        description: '完整的命理分析與建議',
        duration: '75分鐘',
        includes: ['詳細命盤', '大運分析', '流年運勢', '改運建議']
      },
      {
        name: '專業命理諮詢',
        price: 1800,
        description: '深度命理分析與人生規劃',
        duration: '90分鐘',
        includes: ['全面分析', '人生規劃', '開運指導', '書面報告', '後續諮詢']
      }
    ]
  },
  {
    id: 5,
    name: '紫微斗數',
    category: 'astrology',
    description: '中國古代星相學精髓，透過紫微星盤預測你的命運與機遇。',
    image: '/images/ziwei.jpg',
    hasOptions: true,
    basePrice: 900,
    options: [
      {
        name: '基礎星盤解讀',
        price: 900,
        description: '個人星盤與基本運勢',
        duration: '50分鐘'
      },
      {
        name: '深度命理分析',
        price: 1400,
        description: '詳細的命宮分析與運勢預測',
        duration: '80分鐘'
      },
      {
        name: '專業紫微諮詢',
        price: 2000,
        description: '完整的命理分析與人生指導',
        duration: '100分鐘'
      }
    ]
  },

  // Red Thread Services
  {
    id: 6,
    name: '月老紅線',
    category: 'love',
    description: '月老牽線，為你尋找命中注定的良緣，讓愛情之花綻放。',
    image: '/images/redstring.jpg',
    hasOptions: true,
    basePrice: 800,
    options: [
      {
        name: '基礎紅線服務',
        price: 800,
        description: '單身者的緣分牽引',
        duration: '3-7天生效',
        includes: ['紅線儀式', '愛情護身符', '戀愛指導']
      },
      {
        name: '深度姻緣服務',
        price: 1200,
        description: '增強感情運勢與婚姻緣分',
        duration: '7-15天生效',
        includes: ['專業儀式', '姻緣符咒', '感情諮詢', '後續追蹤']
      },
      {
        name: '專業媒合服務',
        price: 1800,
        description: '全方位的愛情運勢提升',
        duration: '持續30天',
        includes: ['個人分析', '配對指導', '愛情風水', '定期諮詢']
      }
    ],
    loveTypes: [
      { name: '招桃花', purpose: '吸引新的愛情機會' },
      { name: '挽回感情', purpose: '修復破裂的感情' },
      { name: '增進感情', purpose: '讓現有關係更加穩固' },
      { name: '催婚姻', purpose: '促進結婚機會' },
      { name: '化解爛桃花', purpose: '避免不良的感情糾纏' }
    ]
  },
  // Subconscious Mind Reading
  {
    id: 7,
    name: '潛意識讀心',
    category: 'psychic',
    description: '深入探索你的潛意識世界，發掘內心深處的秘密與智慧。開放式問題，讓你自由探索內心世界。',
    image: '/images/mindreading.jpg',
    hasOptions: true,
    basePrice: 100,
    options: [
      {
        name: '1題探索',
        price: 100,
        description: '單一問題的深度潛意識探索',
        questionCount: '1題',
        includes: ['潛意識掃描', '問題解讀', '內在訊息傳達']
      },
      {
        name: '3題探索',
        price: 280,
        description: '三個問題的全面潛意識分析',
        questionCount: '3題',
        includes: ['深度心靈連結', '多角度分析', '整合性指導', '情緒釋放']
      },
      {
        name: '5題探索',
        price: 450,
        description: '五個問題的完整心靈探索',
        questionCount: '5題',
        includes: ['全方位掃描', '深層智慧解讀', '生命藍圖分析', '療癒建議', '未來指引']
      }
    ],
    readingAreas: [
      { name: '情感創傷療癒', focus: '處理過往的情感創傷' },
      { name: '人生目的探索', focus: '發現真正的人生使命' },
      { name: '內在恐懼釋放', focus: '克服深層的恐懼與限制' },
      { name: '天賦才能發掘', focus: '發現隱藏的才能與潛力' },
      { name: '關係模式分析', focus: '了解人際關係的深層模式' },
      { name: '自由提問', focus: '任何你想了解的內在世界問題' }
    ]
  },

  // Additional Services
  {
    id: 8,
    name: '水晶療癒',
    category: 'healing',
    description: '運用天然水晶的能量，淨化身心靈，提升個人振動頻率。',
    image: '/images/crystal.jpg',
    hasOptions: true,
    basePrice: 600,
    options: [
      {
        name: '個人水晶療癒',
        price: 600,
        description: '針對個人需求的水晶能量療癒',
        duration: '45分鐘'
      },
      {
        name: '空間水晶淨化',
        price: 900,
        description: '居家或辦公空間的能量淨化',
        duration: '60分鐘'
      },
      {
        name: '水晶陣法設置',
        price: 1300,
        description: '專業水晶陣法的設計與設置',
        duration: '90分鐘'
      }
    ]
  },
  {
    id: 9,
    name: '符咒製作',
    category: 'talisman',
    description: '手工製作的靈性符咒，為你帶來保護、好運與心願達成。',
    image: '/images/talisman.jpg',
    hasOptions: true,
    basePrice: 500,
    options: [
      {
        name: '個人護身符',
        price: 500,
        description: '專屬的個人保護符咒'
      },
      {
        name: '招財符咒',
        price: 800,
        description: '提升財運的專用符咒'
      },
      {
        name: '客製化符咒',
        price: 1200,
        description: '根據個人需求客製的特殊符咒'
      }
    ]
  },
  {
    id: 10,
    name: '能量清理',
    category: 'cleansing',
    description: '清除負面能量，淨化身心靈，重建正面的能量場。',
    image: '/images/cleansing.jpg',
    hasOptions: true,
    basePrice: 800,
    options: [
      {
        name: '個人能量清理',
        price: 800,
        description: '個人負能量的清除與淨化',
        duration: '60分鐘'
      },
      {
        name: '空間能量清理',
        price: 1200,
        description: '居家或工作空間的能量淨化',
        duration: '90分鐘'
      },
      {
        name: '深度能量重建',
        price: 1800,
        description: '完整的能量場重建與保護',        duration: '120分鐘'
      }
    ]
  },

  // Consultation Services
  {
    id: 11,
    name: '單項 & 加急',
    category: 'consultation',
    description: '查詢數值：HK$10/1項',
    image: '/images/consultation.jpg',
    hasOptions: true,
    basePrice: 10,
    options: [
      {
        name: '單項查詢',
        price: 10,
        description: '標準查詢服務',
        duration: '1項',
        includes: ['專業數值分析', '詳細解讀報告']
      },
      {
        name: '加急查詢',
        price: 20,
        description: '優先處理，快速回覆',
        duration: '1項',
        includes: ['專業數值分析', '詳細解讀報告', '優先處理', '快速回覆']
      }
    ]
  }
];

// Detailed Planetary Candle Products
const planetaryCandleProducts = [
  {
    id: 1,
    name: '太陽能量蠟燭 - 成功領導',
    planet: '太陽',
    day: '星期日',
    color: '金黃色',
    price: 988,
    description: '美國原裝進口，專為提升領導力與事業成功而設計',
    features: ['含蠟燭報告解讀', '魔法油/草藥儀式', '資深巫師手工打造'],
    magicalOil: '肉桂、橙花、檀香',
    herbs: '月桂葉、向日葵花瓣、金盞花',
    element: '火',
    purpose: '成功、領導力、活力、權威',
    burnTime: '7天持續燃燒'
  },
  {
    id: 2,
    name: '月亮直覺蠟燭 - 夢境指引',
    planet: '月亮',
    day: '星期一',
    color: '銀白色',
    price: 988,
    description: '美國原裝進口，強化直覺力與夢境接收能力',
    features: ['含蠟燭報告解讀', '魔法油/草藥儀式', '資深巫師手工打造'],
    magicalOil: '茉莉、薰衣草、檀香木',
    herbs: '薄荷、鼠尾草、月見草',
    element: '水',
    purpose: '直覺、情感、夢境、療癒',
    burnTime: '7天持續燃燒'
  },
  {
    id: 3,
    name: '火星勇氣蠟燭 - 行動力量',
    planet: '火星',
    day: '星期二',
    color: '紅色',
    price: 988,
    description: '美國原裝進口，激發內在勇氣與行動決心',
    features: ['含蠟燭報告解讀', '魔法油/草藥儀式', '資深巫師手工打造'],
    magicalOil: '龍血樹脂、黑胡椒、薑',
    herbs: '迷迭香、薄荷、紅辣椒',
    element: '火',
    purpose: '勇氣、行動力、保護、戰勝困難',
    burnTime: '7天持續燃燒'
  },
  {
    id: 4,
    name: '水星智慧蠟燭 - 溝通學習',
    planet: '水星',
    day: '星期三',
    color: '橙色',
    price: 988,
    description: '美國原裝進口，提升溝通技巧與學習能力',
    features: ['含蠟燭報告解讀', '魔法油/草藥儀式', '資深巫師手工打造'],
    magicalOil: '薄荷、尤加利、檸檬草',
    herbs: '迷迭香、百里香、紫蘇',
    element: '風',
    purpose: '溝通、學習、智慧、記憶力',
    burnTime: '7天持續燃燒'
  },
  {
    id: 5,
    name: '木星豐盛蠟燭 - 幸運擴展',
    planet: '木星',
    day: '星期四',
    color: '藍色',
    price: 988,
    description: '美國原裝進口，帶來豐盛與幸運的宇宙能量',
    features: ['含蠟燭報告解讀', '魔法油/草藥儀式', '資深巫師手工打造'],
    magicalOil: '乳香、雪松、肉豆蔻',
    herbs: '鼠尾草、羅勒、肉桂皮',
    element: '風',
    purpose: '豐盛、擴展、幸運、機會',
    burnTime: '7天持續燃燒'
  },
  {
    id: 6,
    name: '金星愛情蠟燭 - 美麗和諧',
    planet: '金星',
    day: '星期五',
    color: '綠色',
    price: 988,
    description: '美國原裝進口，增強愛情魅力與人際和諧',
    features: ['含蠟燭報告解讀', '魔法油/草藥儀式', '資深巫師手工打造'],
    magicalOil: '玫瑰、檀香、依蘭依蘭',
    herbs: '玫瑰花瓣、薰衣草、茉莉花',
    element: '土',
    purpose: '愛情、美麗、和諧、魅力',
    burnTime: '7天持續燃燒'
  },
  {
    id: 7,
    name: '土星淨化蠟燭 - 紀律保護',
    planet: '土星',
    day: '星期六',
    color: '紫色',
    price: 988,
    description: '美國原裝進口，強化紀律與深度保護能量',
    features: ['含蠟燭報告解讀', '魔法油/草藥儀式', '資深巫師手工打造'],
    magicalOil: '沒藥、雪松、松樹',
    herbs: '鼠尾草、迷迭香、黑胡椒',
    element: '土',
    purpose: '紀律、保護、淨化、去除障礙',
    burnTime: '7天持續燃燒'
  },
  {
    id: 8,
    name: '七星護身蠟燭組合 - 全方位守護',
    planet: '七星',
    day: '全週',
    color: '七彩漸變',
    price: 6888,
    description: '美國原裝進口，包含七支星體蠟燭的完整套組',
    features: ['含詳細星體報告', '完整魔法油草藥套組', '專屬儀式指導書'],
    magicalOil: '七種星體專屬配方',
    herbs: '21種神聖草藥組合',
    element: '全元素',
    purpose: '全方位能量平衡與守護',
    burnTime: '49天完整週期'
  },
  {
    id: 9,
    name: '新月許願蠟燭 - 月相能量',
    planet: '月亮',
    day: '新月日',
    color: '深藍銀光',
    price: 988,
    description: '美國原裝進口，特別適合新月時期的願望顯化',
    features: ['含月相報告解讀', '新月專屬魔法油', '許願儀式指導'],
    magicalOil: '茉莉、白檀香、月見草油',
    herbs: '白鼠尾草、薰衣草、銀葉',
    element: '水',
    purpose: '新開始、願望顯化、直覺開發',
    burnTime: '7天持續燃燒'
  },
  {
    id: 10,
    name: '滿月釋放蠟燭 - 能量清理',
    planet: '月亮',
    day: '滿月日',
    color: '純白金邊',
    price: 988,
    description: '美國原裝進口，專為滿月能量釋放與清理而設計',
    features: ['含滿月報告解讀', '釋放專屬魔法油', '清理儀式指導'],
    magicalOil: '白鼠尾草、薄荷、檸檬',
    herbs: '白鼠尾草、迷迭香、海鹽',
    element: '水',
    purpose: '釋放負能量、情感清理、重新開始',
    burnTime: '7天持續燃燒'  }
];

// Lovers Candle Ritual Products
const loversCandleProducts = [
  {
    id: 1,
    name: '紅戀人蠟燭儀式',
    type: 'lovers_ritual',
    color: '紅色',
    price: 688,
    description: '增加關係連結，復合，親密',
    features: ['專業愛情儀式', '增強關係連結', '復合能量', '親密度提升'],
    magicalOil: '玫瑰、依蘭依蘭、檀香',
    herbs: '玫瑰花瓣、迷迭香、肉桂',
    element: '火',
    purpose: '關係連結、復合、增進親密',
    burnTime: '連續7天儀式',
    addOns: [
      {
        name: '紅線加持',
        price: 12,
        description: '月老紅線加持，增強愛情連結'
      }
    ]
  },
  {
    id: 2,
    name: '玫瑰白戀人蠟燭儀式',
    type: 'lovers_ritual',
    color: '玫瑰白色',
    price: 688,
    description: '和平幸福持久，淨化不安全感',
    features: ['愛情和諧儀式', '淨化負面情緒', '增進安全感', '持久幸福'],
    magicalOil: '白玫瑰、茉莉、薰衣草',
    herbs: '白玫瑰花瓣、薰衣草、白鼠尾草',
    element: '水',
    purpose: '和平、幸福、淨化不安全感',
    burnTime: '連續7天儀式',
    addOns: [
      {
        name: '紅線加持',
        price: 12,
        description: '月老紅線加持，增強愛情連結'
      }
    ]  }
];

// Custom Magic Candles Products
const customCandleProducts = [
  {
    id: 1,
    name: 'RETURN TO ME',
    type: 'custom_magic',
    description: '召回失去的愛人，重新點燃愛情火花',
    purpose: '召回愛人、重燃愛情',
    magicalOil: '玫瑰、依蘭依蘭、龍血',
    herbs: '玫瑰花瓣、迷迭香、肉桂',
    element: '火',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 2,
    name: 'BRING BACK MY LOVE',
    type: 'custom_magic',
    description: '強力召回分離的愛情，修復破碎的關係',
    purpose: '召回愛情、修復關係',
    magicalOil: '玫瑰、檀香、茉莉',
    herbs: '玫瑰花瓣、薰衣草、迷迭香',
    element: '水',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 3,
    name: 'COME TO ME',
    type: 'custom_magic',
    description: '吸引特定的人來到你身邊',
    purpose: '吸引特定對象、增強魅力',
    magicalOil: '依蘭依蘭、茉莉、檀香',
    herbs: '玫瑰花瓣、薄荷、百里香',
    element: '風',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 4,
    name: 'ADAM AND EVE',
    type: 'custom_magic',
    description: '平衡陰陽能量，促進完美結合',
    purpose: '陰陽平衡、完美結合',
    magicalOil: '檀香、玫瑰、雪松',
    herbs: '玫瑰花瓣、薰衣草、鼠尾草',
    element: '土',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 5,
    name: 'HOLD YOUR MAN',
    type: 'custom_magic',
    description: '牢牢抓住你的男人，防止外遇',
    purpose: '鞏固關係、防止出軌',
    magicalOil: '檀香、迷迭香、雪松',
    herbs: '迷迭香、薄荷、肉桂',
    element: '土',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 6,
    name: 'MAGNET',
    type: 'custom_magic',
    description: '如磁鐵般強烈吸引力，無法抗拒',
    purpose: '強烈吸引、無法抗拒',
    magicalOil: '茉莉、依蘭依蘭、薄荷',
    herbs: '薄荷、迷迭香、百里香',
    element: '風',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 7,
    name: 'HOT SEX',
    type: 'custom_magic',
    description: '點燃激情，增強性魅力和慾望',
    purpose: '點燃激情、增強性魅力',
    magicalOil: '依蘭依蘭、檀香、薑',
    herbs: '迷迭香、肉桂、薄荷',
    element: '火',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 8,
    name: 'IMPROVE',
    type: 'custom_magic',
    description: '改善現有關係，提升愛情品質',
    purpose: '改善關係、提升品質',
    magicalOil: '玫瑰、薰衣草、檀香',
    herbs: '玫瑰花瓣、薰衣草、百里香',
    element: '水',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 9,
    name: 'MISS ME MORE',
    type: 'custom_magic',
    description: '讓對方更加思念你，無法忘懷',
    purpose: '增強思念、無法忘懷',
    magicalOil: '茉莉、玫瑰、檀香',
    herbs: '玫瑰花瓣、茉莉花、薰衣草',
    element: '水',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 10,
    name: 'NO ONE BUT ME',
    type: 'custom_magic',
    description: '讓對方眼中只有你，排除所有競爭者',
    purpose: '專一愛情、排除競爭',
    magicalOil: '檀香、迷迭香、雪松',
    herbs: '迷迭香、薄荷、鼠尾草',
    element: '土',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 11,
    name: 'ATTRACTION',
    type: 'custom_magic',
    description: '增強個人魅力，吸引理想對象',
    purpose: '增強魅力、吸引對象',
    magicalOil: '依蘭依蘭、茉莉、玫瑰',
    herbs: '玫瑰花瓣、薄荷、百里香',
    element: '風',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 12,
    name: 'UNBLOCKER',
    type: 'custom_magic',
    description: '清除愛情路上的障礙和阻擋',
    purpose: '清除障礙、暢通愛情路',
    magicalOil: '檸檬、薄荷、尤加利',
    herbs: '白鼠尾草、迷迭香、薄荷',
    element: '風',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 13,
    name: 'CLEANSING',
    type: 'custom_magic',
    description: '淨化負能量，清潔心靈空間',
    purpose: '淨化負能量、清潔心靈',
    magicalOil: '白鼠尾草、薰衣草、檸檬',
    herbs: '白鼠尾草、薰衣草、迷迭香',
    element: '水',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 14,
    name: 'OPEN ROAD',
    type: 'custom_magic',
    description: '打開新機會之路，迎接美好未來',
    purpose: '開啟機會、迎接未來',
    magicalOil: '檸檬、薄荷、迷迭香',
    herbs: '迷迭香、百里香、薄荷',
    element: '風',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 15,
    name: 'HEALING',
    type: 'custom_magic',
    description: '療癒心靈創傷，恢復內在平衡',
    purpose: '療癒創傷、恢復平衡',
    magicalOil: '薰衣草、檀香、茉莉',
    herbs: '薰衣草、洋甘菊、檸檬香茅',
    element: '水',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 16,
    name: 'MONEY RAIN',
    type: 'custom_magic',
    description: '招來財富如雨水般源源不絕',
    purpose: '招財進寶、財源廣進',
    magicalOil: '肉桂、薄荷、檀香',
    herbs: '肉桂、薄荷、迷迭香',
    element: '土',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]
  },
  {
    id: 17,
    name: 'BETTER BUSINESS',
    type: 'custom_magic',
    description: '提升事業運勢，改善商業環境',
    purpose: '提升事業、改善商業',
    magicalOil: '肉桂、檀香、迷迭香',
    herbs: '月桂葉、迷迭香、百里香',
    element: '火',
    sizeOptions: [
      { size: '小', price: 95, burnTime: '約4小時' },
      { size: '中', price: 280, burnTime: '約15小時' },
      { size: '大', price: 398, burnTime: '約30小時' }
    ],
    addOns: [
      { name: 'DRAGON BLOOD', price: 55, description: '龍血樹脂加持，增強法術效力' }
    ]  }
];

// Tarot Reading Products
const tarotOnlineProducts = [
  {
    id: 1,
    name: '脫單',
    description: '尋找愛情的機會與方向',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['塔羅牌解讀', '愛情運勢分析', '行動建議']
  },
  {
    id: 2,
    name: '暗戀曖昧',
    description: '解讀暗戀對象的心意',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['對方心意解讀', '發展可能性', '互動建議']
  },
  {
    id: 3,
    name: '有對象',
    description: '現有關係的發展分析',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['關係現況分析', '未來發展', '關係建議']
  },
  {
    id: 4,
    name: '斷聯冷淡',
    description: '改善關係冷淡狀況',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['問題癥結分析', '改善方法', '重燃愛火建議']
  },
  {
    id: 5,
    name: '分手復合',
    description: '復合可能性與建議',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['復合機率評估', '最佳時機', '復合策略']
  },
  {
    id: 6,
    name: '愛情選擇',
    description: '多個對象間的選擇建議',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['對象比較分析', '最佳選擇建議', '感情發展預測']
  },
  {
    id: 7,
    name: '工作機會',
    description: '職場機會的分析',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['工作運勢分析', '機會評估', '發展建議']
  },
  {
    id: 8,
    name: '求職',
    description: '求職運勢與建議',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['求職運勢', '面試運', '成功策略']
  },
  {
    id: 9,
    name: '轉工打算',
    description: '轉換工作的時機分析',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['轉職時機', '新工作運勢', '注意事項']
  },
  {
    id: 10,
    name: '生意發展',
    description: '事業發展前景',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['事業運勢', '發展方向', '投資建議']
  },
  {
    id: 11,
    name: '創業打算',
    description: '創業時機與方向',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['創業時機', '行業選擇', '成功要素']
  },
  {
    id: 12,
    name: '工作選擇',
    description: '工作機會的比較分析',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['選擇比較', '優劣分析', '最佳決策']
  },
  {
    id: 13,
    name: '財運',
    description: '財務運勢分析',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['財運走勢', '賺錢機會', '理財建議']
  },
  {
    id: 14,
    name: '學業',
    description: '學習運勢與建議',
    price: 100,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['學習運勢', '考試運', '學習建議']
  },
  {
    id: 15,
    name: '人際關係',
    description: '人際互動分析',
    price: 200,
    category: 'tarot',
    type: 'online_reading',
    reportType: ['文字報告', '語音報告'],
    turnaround: '24小時內回報',
    includes: ['人際運勢', '關係分析', '社交建議']
  }
];

const tarotStoreProducts = [
  {
    id: 1,
    name: '30分鐘門市占卜',
    description: '基礎面對面塔羅占卜諮詢',
    price: 250,
    category: 'tarot',
    type: 'store_reading',
    duration: '30分鐘',
    serviceType: ['預約制', '現場服務'],
    includes: ['面對面諮詢', '即時互動', '深度解讀', '問題討論']
  },
  {
    id: 2,
    name: '延長時間',
    description: '每10分鐘延長服務',
    price: 50,
    category: 'tarot',
    type: 'store_extension',
    duration: '每10分鐘',
    serviceType: ['需先預約基礎服務'],
    includes: ['延續諮詢', '深入探討', '詳細解答']
  }
];

const tarotPhoneProducts = [
  {
    id: 1,
    name: '30分鐘電話占卜',
    description: '語音即時塔羅占卜諮詢',
    price: 200,
    category: 'tarot',
    type: 'phone_reading',
    duration: '30分鐘',
    serviceType: ['預約制', '即時通話'],
    includes: ['電話諮詢', '即時解讀', '語音指導', '後續建議']
  },
  {
    id: 2,
    name: '45分鐘電話占卜',
    description: '深度語音塔羅占卜諮詢',
    price: 280,
    category: 'tarot',
    type: 'phone_reading',
    duration: '45分鐘',
    serviceType: ['預約制', '即時通話'],
    includes: ['深度諮詢', '多面向分析', '詳細解讀', '全面建議']
  },
  {
    id: 3,
    name: '60分鐘電話占卜',
    description: '完整語音塔羅占卜諮詢',
    price: 350,
    category: 'tarot',
    type: 'phone_reading',
    duration: '60分鐘',
    serviceType: ['預約制', '即時通話'],
    includes: ['完整諮詢', '全方位分析', '深入解讀', '人生指導', '後續支持']
  }
];

const tarotOtherProducts = [
  {
    id: 1,
    name: 'Yes No Maybe',
    description: '簡單是非題占卜',
    price: 15,
    category: 'tarot',
    type: 'quick_reading',
    duration: '即時',
    serviceType: ['即時回覆', '快速服務'],
    includes: ['簡單問題', '快速解答', '是非判斷']
  },
  {
    id: 2,
    name: '神諭卡建議牌',
    description: '神諭卡指引建議',
    price: 20,
    category: 'tarot',
    type: 'oracle_reading',
    duration: '即時',
    serviceType: ['即時回覆', '圖文並茂'],
    includes: ['神諭卡抽選', '圖卡解讀', '靈性指引']
  },
  {
    id: 3,
    name: '一條問題占卜',
    description: '單一問題深度占卜',
    price: 60,
    category: 'tarot',
    type: 'single_question',
    duration: '2-4小時回覆',
    serviceType: ['深度分析', '詳細解讀'],
    includes: ['問題深度分析', '多角度解讀', '具體建議', '後續指導']
  }
];

// Frequency Love Products
const frequencyLoveProducts = [
  {
    id: 1,
    name: '暗戀Plan',
    category: 'frequency',
    description: '+好感＋吸引力＋關注度＋主動+熱情 ＋表白成功率＋交流',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['好感度提升', '吸引力增強', '關注度增加', '主動性提高']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['好感度提升', '吸引力增強', '關注度增加', '主動性提高', '熱情激發']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['好感度提升', '吸引力增強', '關注度增加', '主動性提高', '熱情激發', '表白成功率']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '持續追蹤', '效果優化']
      }
    ],
    effects: ['好感度提升', '吸引力增強', '關注度增加', '主動性提高', '熱情激發', '表白成功率', '交流順暢']
  },
  {
    id: 2,
    name: '曖昧Plan',
    category: 'frequency',
    description: '+喜愛+優先度+主動＋了解度+成為情侶的機會＋真誠-發展阻礙',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['喜愛度提升', '優先度增加', '主動性增強', '了解度加深']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['喜愛度提升', '優先度增加', '主動性增強', '了解度加深', '成為情侶機會']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['喜愛度提升', '優先度增加', '主動性增強', '了解度加深', '成為情侶機會', '真誠度提高']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '發展阻礙減少', '效果優化']
      }
    ],
    effects: ['喜愛度提升', '優先度增加', '主動性增強', '了解度加深', '成為情侶機會', '真誠度提高', '發展阻礙減少']  },
  {
    id: 3,
    name: '戀愛升溫Plan A',
    category: 'frequency',
    description: '+愛意度＋甜蜜＋新鮮感＋寵愛+長久度+和諧+陪伴',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['愛意度增強', '甜蜜感提升', '新鮮感增加', '寵愛度提高']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['愛意度增強', '甜蜜感提升', '新鮮感增加', '寵愛度提高', '長久度加強']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['愛意度增強', '甜蜜感提升', '新鮮感增加', '寵愛度提高', '長久度加強', '和諧增進']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '陪伴質量提升', '效果優化']
      }
    ]
  },
  {
    id: 4,
    name: '戀愛升溫Plan B',
    category: 'frequency',
    description: '+安全感+態度＋溝通＋耐性 -逃避 -負能量 -爭吵',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['安全感提升', '態度改善', '溝通增進', '耐性增強']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['安全感提升', '態度改善', '溝通增進', '耐性增強', '逃避減少']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['安全感提升', '態度改善', '溝通增進', '耐性增強', '逃避減少', '負能量清除']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '爭吵減少', '效果優化']
      }
    ]
  },
  {
    id: 5,
    name: '戀愛升溫Plan C',
    category: 'frequency',
    description: '+性事契合度+激情＋性慾＋持久度+魅力＋情趣＋愛意',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['性事契合度', '激情提升', '性慾增強', '持久度改善']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['性事契合度', '激情提升', '性慾增強', '持久度改善', '魅力增加']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['性事契合度', '激情提升', '性慾增強', '持久度改善', '魅力增加', '情趣豐富']
      },      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',        includes: ['全方位調頻', '送天使卡指引', '愛意加深', '效果優化']
      }
    ]
  },
  {
    id: 6,
    name: '桃花脫單Plan',
    category: 'frequency',
    description: '+異性緣+桃花運＋自信心＋個人魅力+脫單機率＋交際能力 -爛桃花',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['異性緣提升', '桃花運增強', '自信心提高', '個人魅力增加']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['異性緣提升', '桃花運增強', '自信心提高', '個人魅力增加', '脫單機率增加']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['異性緣提升', '桃花運增強', '自信心提高', '個人魅力增加', '脫單機率增加', '交際能力提升']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '爛桃花減少', '效果優化']
      }
    ]
  },
  {
    id: 7,
    name: '斷聯冷淡Plan A',
    category: 'frequency',
    description: '+思念＋新鮮感＋主動聯繫＋溝通度 -不滿-雙方障礙度-負面情緒',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['思念增強', '新鮮感提升', '主動聯繫增加', '溝通度改善']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['思念增強', '新鮮感提升', '主動聯繫增加', '溝通度改善', '不滿減少']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['思念增強', '新鮮感提升', '主動聯繫增加', '溝通度改善', '不滿減少', '雙方障礙減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '負面情緒清除', '效果優化']
      }
    ]
  },
  {
    id: 8,
    name: '斷聯冷淡Plan B',
    category: 'frequency',
    description: '+關注＋新鮮感＋主動聯繫＋分享慾＋在意 -逃避-第三方阻礙',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['關注度提升', '新鮮感增加', '主動聯繫增強', '分享慾提高']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['關注度提升', '新鮮感增加', '主動聯繫增強', '分享慾提高', '在意度增加']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['關注度提升', '新鮮感增加', '主動聯繫增強', '分享慾提高', '在意度增加', '逃避減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '第三方阻礙減少', '效果優化']
      }
    ]
  },
  {
    id: 9,
    name: '冷戰爭吵Plan A',
    category: 'frequency',
    description: '＋珍惜＋主動聯繫＋溝通度 -誤會 -阻礙 -固執-負面情緒',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['珍惜度增強', '主動聯繫提升', '溝通度改善', '誤會減少']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['珍惜度增強', '主動聯繫提升', '溝通度改善', '誤會減少', '阻礙減少']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['珍惜度增強', '主動聯繫提升', '溝通度改善', '誤會減少', '阻礙減少', '固執減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '負面情緒清除', '效果優化']
      }
    ]
  },
  {
    id: 10,
    name: '冷戰爭吵Plan B',
    category: 'frequency',
    description: '＋理解＋和諧＋溝通＋聆聽 -自我 -誤會 -負面情緒',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['理解力提升', '和諧增進', '溝通能力改善', '聆聽能力增強']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['理解力提升', '和諧增進', '溝通能力改善', '聆聽能力增強', '自我中心減少']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['理解力提升', '和諧增進', '溝通能力改善', '聆聽能力增強', '自我中心減少', '誤會減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '負面情緒清除', '效果優化']
      }
    ]
  },
  {
    id: 11,
    name: '鎖心專一Plan A',
    category: 'frequency',
    description: '+愛意度＋專一＋新鮮感＋在乎+穩定度/長久度＋信任＋吸引力',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['愛意度提升', '專一度增強', '新鮮感增加', '在乎度提高']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['愛意度提升', '專一度增強', '新鮮感增加', '在乎度提高', '穩定度加強']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['愛意度提升', '專一度增強', '新鮮感增加', '在乎度提高', '穩定度加強', '信任度提升']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '吸引力持續增強', '效果優化']
      }
    ]
  },
  {
    id: 12,
    name: '鎖心專一Plan B',
    category: 'frequency',
    description: '+愛意度＋專一+新鮮感 -花心 -外遇指數 -逃避 -厭倦',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['愛意度提升', '專一度增強', '新鮮感增加', '花心減少']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['愛意度提升', '專一度增強', '新鮮感增加', '花心減少', '外遇指數降低']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['愛意度提升', '專一度增強', '新鮮感增加', '花心減少', '外遇指數降低', '逃避減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '厭倦消除', '效果優化']
      }
    ]
  },
  {
    id: 13,
    name: '分手復合Plan A',
    category: 'frequency',
    description: '＋珍惜＋主動聯繫＋溝通度 -誤會 -阻礙 -固執-負面情緒',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['珍惜度增強', '主動聯繫提升', '溝通度改善', '誤會減少']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['珍惜度增強', '主動聯繫提升', '溝通度改善', '誤會減少', '阻礙減少']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['珍惜度增強', '主動聯繫提升', '溝通度改善', '誤會減少', '阻礙減少', '固執減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '負面情緒清除', '效果優化']
      }
    ]
  },
  {
    id: 14,
    name: '分手復合Plan B',
    category: 'frequency',
    description: '＋理解＋和諧＋溝通＋聆聽 -自我 -誤會 -負面情緒',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['理解力提升', '和諧增進', '溝通能力改善', '聆聽能力增強']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['理解力提升', '和諧增進', '溝通能力改善', '聆聽能力增強', '自我中心減少']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['理解力提升', '和諧增進', '溝通能力改善', '聆聽能力增強', '自我中心減少', '誤會減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '負面情緒清除', '效果優化']
      }
    ]
  },
  {
    id: 15,
    name: '婚姻關係Plan A',
    category: 'frequency',
    description: '+愛意度＋感情常鮮＋關愛＋體貼+性生活 +顧家+寵愛',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['愛意度提升', '感情保鮮', '關愛增強', '體貼度提高']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['愛意度提升', '感情保鮮', '關愛增強', '體貼度提高', '性生活改善']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['愛意度提升', '感情保鮮', '關愛增強', '體貼度提高', '性生活改善', '顧家度提升']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '寵愛度增強', '效果優化']
      }
    ]
  },
  {
    id: 16,
    name: '婚姻關係Plan B',
    category: 'frequency',
    description: '婆媳糾紛/二人矛盾 -誘惑 -負面情緒 爭吵 -外在因素 -厭倦 -冷淡',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['婆媳糾紛減少', '二人矛盾緩解', '誘惑抵抗力增強', '負面情緒減少']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['婆媳糾紛減少', '二人矛盾緩解', '誘惑抵抗力增強', '負面情緒減少', '爭吵減少']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['婆媳糾紛減少', '二人矛盾緩解', '誘惑抵抗力增強', '負面情緒減少', '爭吵減少', '外在因素影響減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '厭倦冷淡消除', '效果優化']
      }
    ]
  },
  {
    id: 17,
    name: '婚姻關係Plan C',
    category: 'frequency',
    description: '+愛意度＋溝通能力＋和諧＋忠誠＋性生活 -負面情緒 -爭吵',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['愛意度提升', '溝通能力改善', '和諧增進', '忠誠度提高']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['愛意度提升', '溝通能力改善', '和諧增進', '忠誠度提高', '性生活改善']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['愛意度提升', '溝通能力改善', '和諧增進', '忠誠度提高', '性生活改善', '負面情緒減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '爭吵減少', '效果優化']
      }
    ]
  },
  {
    id: 18,
    name: '放下過去Move on Plan',
    category: 'frequency',
    description: '+異性緣＋自愛 -喜愛 -執着 -思念 -留戀 -負面情緒',
    image: '/images/frequency-love.jpg',
    hasOptions: true,
    basePrice: 333,
    options: [
      {
        name: '3日',
        price: 333,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['異性緣提升', '自愛能力增強', '過往喜愛減少', '執著減少']
      },
      {
        name: '5日',
        price: 500,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['異性緣提升', '自愛能力增強', '過往喜愛減少', '執著減少', '思念減少']
      },
      {
        name: '7日',
        price: 688,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['異性緣提升', '自愛能力增強', '過往喜愛減少', '執著減少', '思念減少', '留戀減少']
      },
      {
        name: '包月',
        price: 1580,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '負面情緒清除', '效果優化']
      }
    ]
  }
];

// Frequency Career Products
const frequencyCareerProducts = [
  {
    id: 1,
    name: '財源滾滾Plan',
    category: 'frequency',
    description: '＋正財指數 ＋偏財指數 ＋貴人指數＋賺錢機會 -破財指數',
    image: '/images/frequency-career.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['正財指數提升', '偏財運增強', '貴人運增加', '賺錢機會增多']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['正財指數提升', '偏財運增強', '貴人運增加', '賺錢機會增多', '破財指數降低']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['正財指數提升', '偏財運增強', '貴人運增加', '賺錢機會增多', '破財指數降低']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '持續財運提升', '效果優化']
      }
    ]
  },
  {
    id: 2,
    name: '尋找工作Plan',
    category: 'frequency',
    description: '＋成功率/面試機會 ＋第一印象分＋競爭力 ＋自信 -障礙',
    image: '/images/frequency-career.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['求職成功率', '面試機會增加', '第一印象分提升', '競爭力增強']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['求職成功率', '面試機會增加', '第一印象分提升', '競爭力增強', '自信提升']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['求職成功率', '面試機會增加', '第一印象分提升', '競爭力增強', '自信提升', '求職障礙清除']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '持續求職運提升', '效果優化']
      }
    ]
  },
  {
    id: 3,
    name: '上班族Plan',
    category: 'frequency',
    description: '+貴人指數 ＋人際關係 ＋競爭力+行動力 ＋收入回報',
    image: '/images/frequency-career.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['貴人指數提升', '人際關係改善', '競爭力增強', '行動力提高']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['貴人指數提升', '人際關係改善', '競爭力增強', '行動力提高', '收入回報增加']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['貴人指數提升', '人際關係改善', '競爭力增強', '行動力提高', '收入回報增加']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',        includes: ['全方位調頻', '送天使卡指引', '職場運勢全面提升', '效果優化']
      }
    ]
  },
  {
    id: 4,
    name: '跑數Plan',
    category: 'frequency',
    description: '+開單率 ＋客源量 ＋回頭客指數＋競爭力 -障礙',
    image: '/images/frequency-career.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['開單率提升', '客源量增加', '回頭客指數提高', '競爭力增強']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['開單率提升', '客源量增加', '回頭客指數提高', '競爭力增強', '業務障礙減少']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['開單率提升', '客源量增加', '回頭客指數提高', '競爭力增強', '業務障礙減少']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '業績持續提升', '效果優化']
      }
    ]
  },
  {
    id: 5,
    name: '做生意Plan',
    category: 'frequency',
    description: '+收入回報 ＋客源量 ＋回頭客指數+競爭力 ＋客人滿意度',
    image: '/images/frequency-career.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['收入回報增加', '客源量提升', '回頭客指數提高', '競爭力增強']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['收入回報增加', '客源量提升', '回頭客指數提高', '競爭力增強', '客人滿意度提升']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['收入回報增加', '客源量提升', '回頭客指數提高', '競爭力增強', '客人滿意度提升']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '生意興旺持續', '效果優化']
      }
    ]
  },
  {
    id: 6,
    name: '上司關係Plan',
    category: 'frequency',
    description: '+人際關係 ＋工作表現 ＋上司信任度＋認同感 -障礙',
    image: '/images/frequency-career.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['人際關係改善', '工作表現提升', '上司信任度增加', '認同感提高']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['人際關係改善', '工作表現提升', '上司信任度增加', '認同感提高', '職場障礙減少']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['人際關係改善', '工作表現提升', '上司信任度增加', '認同感提高', '職場障礙減少']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '上司關係持續改善', '效果優化']
      }
    ]
  }
];

// Frequency Personal Products
const frequencyPersonalProducts = [
  {
    id: 1,
    name: '個人情緒plan',
    category: 'frequency',
    description: '＋樂觀度＋正能量＋自信心-憂鬱指數 -焦慮/壓力指數',
    image: '/images/frequency-personal.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['樂觀度提升', '正能量增強', '自信心建立', '憂鬱指數降低']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['樂觀度提升', '正能量增強', '自信心建立', '憂鬱指數降低', '焦慮壓力緩解']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['樂觀度提升', '正能量增強', '自信心建立', '憂鬱指數降低', '焦慮壓力緩解']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '情緒持續穩定', '效果優化']
      }
    ]
  },
  {
    id: 2,
    name: '人際關係plan',
    category: 'frequency',
    description: '+交際能力 ＋幸運 +自信心+第一印象+受歡迎程度',
    image: '/images/frequency-personal.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['交際能力提升', '幸運值增加', '自信心建立', '第一印象改善']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['交際能力提升', '幸運值增加', '自信心建立', '第一印象改善', '受歡迎程度提高']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['交際能力提升', '幸運值增加', '自信心建立', '第一印象改善', '受歡迎程度提高']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '人際關係全面改善', '效果優化']
      }
    ]
  },
  {
    id: 3,
    name: '身體健康plan',
    category: 'frequency',
    description: '+健康值＋免疫力＋新陳代謝＋睡眠質素 -病痛',
    image: '/images/frequency-personal.jpg',
    hasOptions: true,
    basePrice: 255,
    options: [
      {
        name: '3日',
        price: 255,
        description: '3日調頻服務',
        duration: '3日',
        includes: ['健康值提升', '免疫力增強', '新陳代謝改善', '睡眠質素提高']
      },
      {
        name: '5日',
        price: 388,
        description: '5日調頻服務',
        duration: '5日',
        includes: ['健康值提升', '免疫力增強', '新陳代謝改善', '睡眠質素提高', '病痛減輕']
      },
      {
        name: '7日',
        price: 555,
        description: '7日調頻服務',
        duration: '7日',
        includes: ['健康值提升', '免疫力增強', '新陳代謝改善', '睡眠質素提高', '病痛減輕']
      },
      {
        name: '包月',
        price: 1250,
        description: '包月調頻服務（隔日做一次）',
        duration: '包月',
        includes: ['全方位調頻', '送天使卡指引', '健康狀態持續改善', '效果優化']
      }
    ]  }
];

// Consultation Products
const consultationProducts = [
  {
    id: 1,
    name: '單項查詢',
    category: 'consultation',
    description: '查詢數值：HK$10/1項',
    image: '/images/consultation.jpg',
    hasOptions: true,
    basePrice: 10,
    options: [
      {
        name: '單項查詢',
        price: 10,
        description: '標準查詢服務',
        duration: '1項',
        includes: ['專業數值分析', '詳細解讀報告']
      }
    ]
  },
  {
    id: 2,
    name: '加急查詢',
    category: 'consultation',
    description: '加急20/1項',
    image: '/images/consultation-express.jpg',
    hasOptions: true,
    basePrice: 20,
    options: [
      {
        name: '加急查詢',
        price: 20,
        description: '優先處理，快速回覆',
        duration: '1項',
        includes: ['專業數值分析', '詳細解讀報告', '優先處理', '快速回覆']
      }
    ]  }
];

// Love Red Thread Products
const loveProducts = [
  {
    id: 1,
    name: '紅線查詢',
    category: 'love',
    description: '查詢紅線狀況及姻緣指數',
    image: '/images/red-thread-query.jpg',
    hasOptions: false,
    price: 100,
    includes: [
      '是否有紅線',
      '是否有姻緣線', 
      '是否正緣',
      '紅線整體指數',
      '雙方阻礙度',
      '第三方阻礙度'
    ]
  },
  {
    id: 2,
    name: '紅線調頻',
    category: 'love',
    description: '需紅線查詢後才能進行調整',
    image: '/images/red-thread-adjustment.jpg',
    hasOptions: true,
    basePrice: 150,
    options: [
      {
        name: '一次調頻',
        price: 150,
        description: '單次紅線調頻服務',
        duration: '一次',
        includes: ['紅線指數調整', '正緣指數提升', '緣份指數優化', '紅線粗幼度調節']
      },
      {
        name: '三次調頻',
        price: 400,
        description: '三次完整調頻療程',
        duration: '三次',
        includes: [
          '紅線指數調整',
          '正緣指數提升', 
          '緣份指數優化',
          '紅線粗幼度調節',
          '紅線深淺度改善',
          '雙方阻礙度降低',
          '第三方阻礙度減少'
        ]
      }
    ]
  }
];

// Astrology Products
const astrologyProducts = [
  {
    id: 1,
    name: '流年運程',
    description: '學/事業/健康/財運/感情/人際',
    price: 688,
    category: 'astrology',
    type: 'annual_fortune',
    duration: '90分鐘',
    includes: ['八字命盤分析', '紫微斗數解讀', '流年運勢', '各領域詳細預測', '開運建議', '書面報告'],
    areas: ['學業運勢', '事業發展', '健康狀況', '財運分析', '感情運勢', '人際關係']
  },
  {
    id: 2,
    name: '雙人合盤',
    description: '雙方命盤、愛情/婚姻觀、相處狀況',
    price: 988,
    category: 'astrology',
    type: 'couple_analysis',
    duration: '120分鐘',
    includes: ['雙方八字命盤', '紫微斗數合盤', '愛情觀分析', '婚姻適配度', '相處建議', '關係發展預測', '詳細書面報告'],
    features: ['命盤相合度', '性格匹配分析', '愛情發展趨勢', '婚姻運勢', '相處模式建議']
  }
];

let mockOrders = [];
let orderIdCounter = 10000;

// Mock user data
let mockUser = null;

// Service categories
export const serviceCategories = [
  { id: 'all', name: '全部服務', description: '所有魔法與靈性服務' },
  { id: 'candles', name: '魔法蠟燭', description: '注入能量的神聖蠟燭' },
  { id: 'frequency', name: '靈擺調頻', description: '能量頻率調整服務' },
  { id: 'tarot', name: '塔羅占卜', description: '古老智慧的指引' },
  { id: 'astrology', name: '命理占星', description: '八字與紫微斗數' },
  { id: 'love', name: '月老紅線', description: '愛情與姻緣服務' },
  { id: 'psychic', name: '心靈探索', description: '潛意識與心靈療癒' },
  { id: 'healing', name: '水晶療癒', description: '天然水晶能量療癒' },
  { id: 'talisman', name: '符咒製作', description: '靈性符咒與護身符' },
  { id: 'cleansing', name: '能量清理', description: '負能量清除與淨化' }
];

// API functions
export const api = {
  // Services
  getServices: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockServices), 500);
    });
  },

  getServicesByCategory: (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category === 'all') {
          resolve(mockServices);
        } else {
          const filtered = mockServices.filter(service => service.category === category);
          resolve(filtered);
        }
      }, 300);
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
  getServiceCategories: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(serviceCategories), 200);
    });
  },

  // Planetary Candle Products
  getPlanetaryCandleProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(planetaryCandleProducts), 300);
    });
  },
  getPlanetaryCandleProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = planetaryCandleProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Planetary candle product not found'));
        }
      }, 300);
    });
  },

  // Lovers Candle Products
  getLoversCandleProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(loversCandleProducts), 300);
    });
  },
  getLoversCandleProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = loversCandleProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Lovers candle product not found'));
        }
      }, 300);
    });
  },

  // Custom Magic Candles Products
  getCustomCandleProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(customCandleProducts), 300);
    });
  },

  getCustomCandleProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = customCandleProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Custom candle product not found'));
        }
      }, 300);
    });  },

  // Tarot Reading Products
  getTarotOnlineProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(tarotOnlineProducts), 300);
    });
  },

  getTarotStoreProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(tarotStoreProducts), 300);
    });
  },

  getTarotPhoneProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(tarotPhoneProducts), 300);
    });
  },

  getTarotOtherProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(tarotOtherProducts), 300);
    });
  },

  getTarotProduct: (category, id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let products = [];
        switch (category) {
          case 'online':
            products = tarotOnlineProducts;
            break;
          case 'store':
            products = tarotStoreProducts;
            break;
          case 'phone':
            products = tarotPhoneProducts;
            break;
          case 'other':
            products = tarotOtherProducts;
            break;
          default:
            reject(new Error('Invalid tarot category'));
            return;
        }
        
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Tarot product not found'));
        }
      }, 300);
    });  },

  // Astrology Products
  getAstrologyProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(astrologyProducts), 300);
    });
  },
  getAstrologyProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = astrologyProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Astrology product not found'));
        }
      }, 300);
    });
  },

  // Frequency Products
  getFrequencyLoveProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(frequencyLoveProducts), 300);
    });
  },

  getFrequencyLoveProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = frequencyLoveProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Frequency love product not found'));
        }
      }, 300);
    });
  },

  getFrequencyCareerProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(frequencyCareerProducts), 300);
    });
  },

  getFrequencyCareerProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = frequencyCareerProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Frequency career product not found'));
        }
      }, 300);
    });
  },

  getFrequencyPersonalProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(frequencyPersonalProducts), 300);
    });
  },

  getFrequencyPersonalProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = frequencyPersonalProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Frequency personal product not found'));
        }
      }, 300);
    });  },

  // Consultation Products
  getConsultationProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(consultationProducts), 300);
    });
  },

  getConsultationProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = consultationProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Consultation product not found'));
        }
      }, 300);
    });  },

  // Love Red Thread Products
  getLoveProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(loveProducts), 300);
    });
  },

  getLoveProduct: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = loveProducts.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Love product not found'));
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
