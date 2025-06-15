// 魔法蠟燭 - Magic Candle Products Data
// This file contains 七日星體蠟燭 and 戀人蠟燭儀式 products

// 七日星體蠟燭 (7-Day Planetary Candles)
export const candleProducts = [
  {
    id: 1,
    name: 'Love Me Lots',
    category: 'candles',
    subCategory: '七日星體蠟燭',
    tag: '愛情蠟燭',
    detail: '強力愛情吸引蠟燭，專為增強個人魅力、吸引真愛、深化感情連結而設計的七日星體蠟燭。',
    image: '/images/love-me-lots-candle.jpg',
    hasOptions: false,
    basePrice: 988
  },
  {
    id: 2,
    name: 'Intranquil 舊情復熾',
    category: 'candles',
    subCategory: '七日星體蠟燭',
    tag: '復合蠟燭',
    detail: '專為重燃舊情、修復關係、召回失去的愛人而設計的強力復合七日星體蠟燭。',
    image: '/images/intranquil-candle.jpg',
    hasOptions: false,
    basePrice: 988
  },
  {
    id: 3,
    name: 'Coconut 椰子',
    category: 'candles',
    subCategory: '七日星體蠟燭',
    tag: '淨化蠟燭',
    detail: '椰子淨化蠟燭，能夠清除負能量、淨化環境、帶來平靜安寧，適合空間及心靈淨化。',
    image: '/images/coconut-candle.jpg',
    hasOptions: false,
    basePrice: 988
  },
  {
    id: 4,
    name: 'Money Machine 金錢機器',
    category: 'candles',
    subCategory: '七日星體蠟燭',
    tag: '財運蠟燭',
    detail: '強力財運蠟燭，專為吸引財富、增加收入、帶來商業成功和投資運勢而設計。',
    image: '/images/money-machine-candle.jpg',
    hasOptions: false,
    basePrice: 988
  },
  {
    id: 5,
    name: 'Come Back to Me 你會回來',
    category: 'candles',
    subCategory: '七日星體蠟燭',
    tag: '召回蠟燭',
    detail: '終極召回蠟燭，專為召喚失去的愛人、修復破裂關係、重新點燃愛火而設計的強力蠟燭。',
    image: '/images/come-back-to-me-candle.jpg',
    hasOptions: false,
    basePrice: 988
  },
  {
    id: 6,
    name: '紅戀人蠟燭儀式',
    category: 'candles',
    subCategory: '戀人蠟燭儀式',
    tag: '關係連結',
    detail: '增加同對方關係連結&緣份，令雙方關係更親密更CLOSE，復合上修復破碎關係，令對方重新喜歡你。',
    image: '/images/red-lovers-candle.jpg',
    hasOptions: true,
    basePrice: 688,
    options: [
      {
        optionNo: 1,
        optionType: 'multiple selection',
        optionTitle: '額外服務',
        optionDetails: [
          {
            name: '綁紅線',
            description: '月老紅線加持，增強愛情連結',
            additionalPrice: 12
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: '玫瑰白戀人蠟燭儀式',
    category: 'candles',
    subCategory: '戀人蠟燭儀式',
    tag: '和平幸福',
    detail: '增加同對方關係連結&緣份，使關係和平/幸福和持久，復合上修復破碎關係，淨化 愈合關係中的不安全感。',
    image: '/images/white-lovers-candle.jpg',
    hasOptions: true,
    basePrice: 688,
    options: [
      {
        optionNo: 1,
        optionType: 'multiple selection',
        optionTitle: '額外服務',
        optionDetails: [
          {
            name: '綁紅線',
            description: '月老紅線加持，增強愛情連結',
            additionalPrice: 12
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: '自家款魔法蠟燭',
    category: 'candles',
    subCategory: '自家款魔法蠟燭',
    tag: '客製蠟燭',
    detail: '專業手工製作的魔法蠟燭，根據不同需求調配特殊能量，為愛情、事業、療癒等各種目的提供強力支持。',
    image: '/images/custom-magic-candle.jpg',
    hasOptions: true,
    basePrice: 95,
    options: [
      {
        optionNo: 1,
        optionType: 'detail card',
        optionTitle: '蠟燭類型',
        optionDetails: [
          {
            name: 'RETURN TO ME #下一位前度',
            description: '適合復合&修復關係 | 鎖住對方的心&牽起紅線',
            additionalPrice: 0
          },
          {
            name: 'BRING BACK MY LOVE #帶回我的愛人',
            description: '讓前任想起你從而回到你身邊 | 你們的愛情得以繼續發展',
            additionalPrice: 0
          },
          {
            name: 'COME TO ME #桃花朵朵開',
            description: '提升桃花運&拉進關係 | 吸引姻緣/有質素的感情開係',
            additionalPrice: 0
          },
          {
            name: 'ADAM AND EVE #亞當夏娃',
            description: '保持戀愛熱度&增加情侶連結 | 讓二人關係日益宰固',
            additionalPrice: 0
          },
          {
            name: 'HOLD YOUR MAN #留在我身邊',
            description: '可以留住你所喜歡的人 | 讓對方更堅定的愛你',
            additionalPrice: 0
          },
          {
            name: 'MAGNET #吸引力法寶',
            description: '令對方主動接近你 | 使處於冷戰關係僵硬和好如初',
            additionalPrice: 0
          },
          {
            name: 'HOT SEX #性愛自修室',
            description: '令對方對你增加激情和渴望 | 增加雙方性生活契合度',
            additionalPrice: 0
          },
          {
            name: 'IMPROVE #愛情推進器',
            description: '提升和改善雙方開係 | 促進溝通&促使和好如初',
            additionalPrice: 0
          },
          {
            name: 'MISS ME MORE #想見你',
            description: '讓對方時常想念你&夢見你 | 讓對方回味與你的甜蜜回憶',
            additionalPrice: 0
          },
          {
            name: 'NO ONE BUT ME #非你不可',
            description: '令出軌的愛人回到自己身邊 | 只對你一心一意&願意安定下來',
            additionalPrice: 0
          },
          {
            name: 'ATTRACTION #萬人迷',
            description: '有助於讓你吸引到你所喜歡的人*不太熟悉的階段或陌生的人* | 讓別人對你產生好感（不限愛情）',
            additionalPrice: 0
          },
          {
            name: 'UNBLOCKER #打開心鎖',
            description: '*如果對方封鎖你就燒UNBLOCKER* | 打開你與對方的心結 解除封鎖',
            additionalPrice: 0
          },
          {
            name: 'CLEANSING #去去障礙走',
            description: '消除雙方的負能量&障礙物 | 令關係更加融洽',
            additionalPrice: 0
          },
          {
            name: 'OPEN ROAD #萬能開路資',
            description: '萬能為你清理路上障礙 | 為你打開新的道路 走出瓶頸',
            additionalPrice: 0
          },
          {
            name: 'HEALING #源癒自身',
            description: '緩解焦慮 增加正能量 | 可以加快療癒 讓早日康復*當你感到疲倦和虚弱的時候*',
            additionalPrice: 0
          },
          {
            name: 'MONEY RAIN #豐盛金雨',
            description: '解決財務問题 | 吸引到更多的金錢和財富 | 讓豐盛不斷接近你形成財富氣場',
            additionalPrice: 0
          },
          {
            name: 'BETTER BUSINESS #工作狂人',
            description: '提升事業運&令你在事業上成功*上班族* | 提升業績 招財*跑數&自僱人士* | 給店鋪吸引到更多的客戶生意和金錢',
            additionalPrice: 0
          },
          {
            name: 'DRAGON BLOOD #龍血',
            description: '提升自身勇氣 | 讓人果斷克服困難 | 增加（愛情/事業）好運 | 抵抗外來惡煞',
            additionalPrice: 55
          }
        ]
      },
      {
        optionNo: 2,
        optionType: 'detail card',
        optionTitle: '蠟燭尺寸',
        optionDetails: [
          {
            name: '小',
            description: '可以燒4小時左右',
            additionalPrice: 0
          },
          {
            name: '中',
            description: '可以燒15小時左右',
            additionalPrice: 185
          },
          {
            name: '大',
            description: '可以燒30小時左右',
            additionalPrice: 303
          }
        ]
      }
    ]
  }
];
