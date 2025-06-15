// 潛意識讀心 - Psychic Products Data
// This file contains all psychic reading and mind reading products

export const psychicProducts = [
  {
    id: 1,
    name: '潛意識讀心',
    category: 'psychic',
    subCategory: '潛意識讀心',
    tag: '心靈讀取',
    detail: '拿著你的問題，直接去對方的潛意識找答案！可以知道對方最心底的想法！！心靈圖卡所呈現是一針見血的！！在讀心之前請確定自己是否能接受。讀心的工作是在潛意識中進行，本人不會有任何感覺，也不會得悉自己的想法被你知道。注意：僅接受開放式問題，不接受是否題。例如開放式問題：「你對我有什麼感覺？」；是否題：「你對我有沒有好感？」',
    image: '/images/psychic-mind-reading.jpg',
    hasOptions: true,
    basePrice: 100,
    options: [
      {
        optionNo: 1,
        optionType: 'dropdown',
        optionTitle: '問題數量',        optionDetails: [
          {
            name: '一題',
            description: '單題潛意識讀心服務',
            additionalPrice: 0,
            tag: 'Basic'
          },
          {
            name: '三題',
            description: '三題潛意識讀心套餐',
            additionalPrice: 180,
            tag: 'Popular'
          },
          {
            name: '五題',
            description: '五題潛意識讀心套餐',
            additionalPrice: 350,
            tag: 'Best Value'
          }
        ]
      }
    ]
  }
];
