// 月老紅線 - Love Red Thread Products Data
// This file contains all love and red thread products

export const loveProducts = [
  {
    id: 1,
    name: '紅線查詢',
    category: 'love',
    subCategory: '月老紅線',
    tag: '紅線檢測',
    detail: '專業查詢您的紅線狀況及姻緣指數，包含完整的紅線分析報告。服務內容包括：是否有紅線、是否有姻緣線、是否正緣、紅線整體指數、雙方阻礙度、第三方阻礙度等詳細分析，為您的感情發展提供專業指導。',
    image: '/images/red-thread-query.jpg',
    hasOptions: false,
    basePrice: 100
  },
  {
    id: 2,
    name: '紅線調頻',
    category: 'love',
    subCategory: '月老紅線',
    tag: '紅線調整',
    detail: '需紅線查詢後才能進行調整。根據紅線查詢結果進行專業調頻，優化各項指數和狀態。調頻內容包括：紅線指數、正緣指數、緣份指數、紅線粗幼度、紅線深淺度、雙方阻礙度、第三方阻礙度等全方位調整，促進感情發展。',
    image: '/images/red-thread-adjustment.jpg',
    hasOptions: true,
    basePrice: 150,
    options: [
      {
        optionNo: 1,
        optionType: 'dropdown',
        optionTitle: '調頻次數',
        optionDetails: [
          {
            name: '一次',
            description: '單次紅線調頻服務',
            additionalPrice: 0
          },
          {
            name: '三次',
            description: '三次完整調頻療程',
            additionalPrice: 250
          }
        ]
      }
    ]
  }
];
