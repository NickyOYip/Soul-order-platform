// 魔法蠟燭 - Magic Candle Products Data
// This file contains 七日星體蠟燭 and 戀人蠟燭儀式 products

// 七日星體蠟燭 (7-Day Planetary Candles)
export const candleProducts = [  {
    id: 1,
    name: 'Love Me Lots',
    category: 'candles',
    subCategory: '七日星體蠟燭',
    tag: '愛情蠟燭',
    detail: '強力愛情吸引蠟燭，專為增強個人魅力、吸引真愛、\n深化感情連結而設計的七日星體蠟燭。',
    image: '/images/love-me-lots-candle.jpg',
    hasOptions: false,
    basePrice: 988,
    soldOut: false
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
    basePrice: 988,
    soldOut: true
  },
  {
    id: 3,
    name: 'Coconut 椰子',
    category: 'candles',
    subCategory: '七日星體蠟燭',
    tag: '淨化蠟燭',
    detail: '椰子淨化蠟燭，能夠清除負能量、淨化環境、帶來平靜安寧，適合空間及心靈淨化。',
    image: '/images/coconut-candle.jpg',
    hasOptions: false,    basePrice: 988,
    soldOut: false
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
    basePrice: 988,
    soldOut: false
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
    basePrice: 988,
    soldOut: false
  },
  {
    id: 6,    name: '紅戀人蠟燭儀式',
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
        optionDetails: [          {
            name: '綁紅線',
            description: '月老紅線加持，增強愛情連結',
            additionalPrice: 12,
            tag: 'Add-on'
          }
        ]
      }
    ]
  },
  {
    id: 7,    name: '玫瑰白戀人蠟燭儀式',
    category: 'candles',
    subCategory: '戀人蠟燭儀式',
    tag: '和平幸福',
    detail: '增加同對方關係連結&緣份，使關係和平/幸福和持久，復合上修復破碎關係，淨化 愈合關係中的不安全感。',
    image: '/images/white-lovers-candle.jpg',
    hasOptions: true,
    basePrice: 688,
    soldOut: false,
    options: [
      {
        optionNo: 1,
        optionType: 'multiple selection',
        optionTitle: '額外服務',
        optionDetails: [
          {
            name: '綁紅線',
            description: '月老紅線加持，增強愛情連結',
            additionalPrice: 12,
            tag: 'Add-on'
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
    basePrice: 0,
    soldOut: false,
    options: [
      {
        optionNo: 1,
        optionType: 'detail card',
        optionTitle: '蠟燭類型',
        optionDetails: [          {
            name: 'RETURN TO ME #下一位前度',
            description: '適合復合&修復關係 | 鎖住對方的心&牽起紅線',
            additionalPrice: 0,
            tag: 'Love'
          },
          {
            name: 'BRING BACK MY LOVE #帶回我的愛人',
            description: '讓前任想起你從而回到你身邊 | 你們的愛情得以繼續發展',
            additionalPrice: 0,
            tag: 'Love'
          },
          {
            name: 'COME TO ME #桃花朵朵開',
            description: '提升桃花運&拉進關係 | 吸引姻緣/有質素的感情開係',
            additionalPrice: 0,
            tag: 'Love'
          },
          {
            name: 'ADAM AND EVE #亞當夏娃',
            description: '保持戀愛熱度&增加情侶連結 | 讓二人關係日益宰固',
            additionalPrice: 0,
            tag: 'Love'
          },
          {
            name: 'HOLD YOUR MAN #留在我身邊',
            description: '可以留住你所喜歡的人 | 讓對方更堅定的愛你',
            additionalPrice: 0,
            tag: 'Love'
          },
          {
            name: 'MAGNET #吸引力法寶',
            description: '令對方主動接近你 | 使處於冷戰關係僵硬和好如初',
            additionalPrice: 0,
            tag: 'Love'
          },
          {
            name: 'HOT SEX #性愛自修室',
            description: '令對方對你增加激情和渴望 | 增加雙方性生活契合度',
            additionalPrice: 0,
            tag: 'Passion'
          },          {
            name: 'IMPROVE #愛情推進器',
            description: '提升和改善雙方開係 | 促進溝通&促使和好如初',
            additionalPrice: 0,
            tag: 'Love'
          },
          {
            name: 'MISS ME MORE #想見你',
            description: '讓對方時常想念你&夢見你 | 讓對方回味與你的甜蜜回憶',
            additionalPrice: 0,
            tag: 'Love'
          },
          {
            name: 'NO ONE BUT ME #非你不可',
            description: '令出軌的愛人回到自己身邊 | 只對你一心一意&願意安定下來',
            additionalPrice: 0,
            tag: 'Loyalty'
          },
          {
            name: 'ATTRACTION #萬人迷',
            description: '有助於讓你吸引到你所喜歡的人*不太熟悉的階段或陌生的人* | 讓別人對你產生好感（不限愛情）',
            additionalPrice: 0,
            tag: 'Attraction'
          },
          {
            name: 'UNBLOCKER #打開心鎖',
            description: '*如果對方封鎖你就燒UNBLOCKER* | 打開你與對方的心結 解除封鎖',
            additionalPrice: 0,
            tag: 'Healing'
          },
          {
            name: 'CLEANSING #去去障礙走',
            description: '消除雙方的負能量&障礙物 | 令關係更加融洽',
            additionalPrice: 0,
            tag: 'Cleansing'
          },
          {
            name: 'OPEN ROAD #萬能開路資',
            description: '萬能為你清理路上障礙 | 為你打開新的道路 走出瓶頸',
            additionalPrice: 0,
            tag: 'Success'
          },
          {
            name: 'HEALING #源癒自身',
            description: '緩解焦慮 增加正能量 | 可以加快療癒 讓早日康復*當你感到疲倦和虚弱的時候*',
            additionalPrice: 0,
            tag: 'Healing'
          },
          {
            name: 'MONEY RAIN #豐盛金雨',
            description: '解決財務問题 | 吸引到更多的金錢和財富 | 讓豐盛不斷接近你形成財富氣場',
            additionalPrice: 0,
            tag: 'Wealth'
          },
          {
            name: 'BETTER BUSINESS #工作狂人',
            description: '提升事業運&令你在事業上成功*上班族* | 提升業績 招財*跑數&自僱人士* | 給店鋪吸引到更多的客戶生意和金錢',
            additionalPrice: 0,
            tag: 'Career'
          },
          {
            name: 'DRAGON BLOOD #龍血',
            description: '提升自身勇氣 | 讓人果斷克服困難 | 增加（愛情/事業）好運 | 抵抗外來惡煞',
            additionalPrice: 55,
            tag: 'Premium'
          }
        ]
      },      {
        optionNo: 2,
        optionType: 'horizontal detail card',
        optionTitle: '蠟燭尺寸',        optionDetails: [
          {
            name: '小',
            description: '4小時',
            additionalPrice: 95,
            tag: ''
          },
          {
            name: '中',
            description: '15小時',
            additionalPrice: 280,
            tag: ''
          },
          {
            name: '大',
            description: '30小時',
            additionalPrice: 398,
            tag: ''
          }
        ]
      }    ]
  },
  // 意念草藥蠟燭 (Intention Herbal Candles) - Small Size
  {
    id: 9,
    name: '愛情 Love',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '愛情蠟燭',
    detail: '香味：茉莉\n\n情侣及新對象均適用\n燃點強烈吸引力和慾望\n創造激情體驗 令彼此沉醉於關係中\n透過喚醒內在感官體驗\n令大家充滿相互欣賞和渴望的感覺',
    image: '',
    hasOptions: false,    basePrice: 288,
    soldOut: false
  },  {
    id: 10,
    name: '清理 Cleansing',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '淨化蠟燭',
    detail: '香味：檸檬草、鼠尾草、絲柏\n\n清理心靈中的困惑\n為你打開不同的可能性\n清理限制性及自己破壞的思維\n釋放舊有創傷及過時信念\n清理情緒不穩及靈性貧乏的人對你造成的影響',
    image: '',
    hasOptions: false,
    basePrice: 288,
    soldOut: true
  },  {
    id: 11,
    name: '解決問題 Problem Solving',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '關係蠟燭',
    detail: '香味：金銀花\n\n可用於解決兩性/人際關係的問題\n令你更容易解決問題\n軟化各人態度 令大家好過開心一點\n減低障礙 令你更容易走到想要的結果',
    image: '',
    hasOptions: false,
    basePrice: 288
  },  {
    id: 12,
    name: '金錢 Money',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '財運蠟燭',
    detail: '香味：金銀花、廣藿香、西柚\n\n接通宇宙中無限的豐盛\n明白豐盛是可以由內在顯化而來的\n清理豐盛路上的靈性及情緒障礙\n吸引金錢豐盛',
    image: '',
    hasOptions: false,
    basePrice: 288
  },  {
    id: 13,
    name: '顯化奇蹟 Miracle Manifestation',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '顯化蠟燭',
    detail: '香味：玫瑰、金銀花\n\n幫助您尋求精神領域的幫助\n以顯化奇蹟並帶來生活中所需的改變\n可配合冥想使用',
    image: '',
    hasOptions: false,
    basePrice: 288
  },
  // 意念草藥蠟燭 (Intention Herbal Candles) - Large Size
  {
    id: 14,
    name: 'SOULMATE',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '靈魂伴侶',
    detail: '香味：柔和花香味\n\n加強你和你的靈魂伴侶的感情\n深化你和你的靈魂伴侶的連結\n助你感受更深層次的愛\n將你最好的一面帶出來',
    image: '',
    hasOptions: false,
    basePrice: 488
  },  {
    id: 15,
    name: 'Attraction Love',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '吸引愛情',
    detail: '香味：薰衣草、肉桂、廣霍香\n\n增加機會認識對象\n提升戀愛能量\n令你變得更吸引\n令你吸引到你想要的對象\n減低障礙\n\n適合人士：很想拍拖但苦無機會有對象但不知對方心意',
    image: '',
    hasOptions: false,
    basePrice: 488
  },  {
    id: 16,
    name: 'Love\'s Enchantment',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '愛情魅惑',
    detail: '香味：檸檬草、茉莉花、橙花\n\n令對象對你越來越熱情\n增加甜蜜感覺\n令他更加主動\n令二人關係更好\n令對方越來越愛你\n\n適合人士：本身自己有對象有拍拖的人士感情比較冷淡',
    image: '',
    hasOptions: false,
    basePrice: 488
  },  {
    id: 17,
    name: 'SUCCESS',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '成功蠟燭',
    detail: '香味：法國香草、廣藿香、杜松和乳香\n\n增加戀愛機會\n令你沒有害怕\n提升智慧 選對對象\n令心儀的人喜歡你\n減低障礙\n\n適合人士：想成功拍拖/有對象但不知對方心意',
    image: '',
    hasOptions: false,
    basePrice: 488
  },  {
    id: 18,
    name: 'Energy and Will',
    category: 'candles',
    subCategory: '意念草藥蠟燭',
    tag: '能量意志',
    detail: '香味：檀香，生薑，乳香\n\n增加能量\n如失戀人士會令你重整能量\n令你感覺較好\n變得開心一點\n\n適合人士：失戀人士/覺得很傷心 自卑',
    image: '',
    hasOptions: false,
    basePrice: 488
  }
];
