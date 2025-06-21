// Mock order data for admin site
export const mockOrders = [
  {
    id: 'ORD001',
    customerIgName: 'chen_xiaomei',
    customerPhone: '0912345678',
    date: '2024-01-20',
    orderDate: '2024-01-20',
    status: '已完成',
    total: 2964,
    totalAmount: 2964,
    completedDate: '2024-01-20',
    products: [
      { 
        name: 'Love Me Lots', 
        quantity: 1, 
        price: 988,
        category: 'candle',
        basePrice: 988,
        hasOptions: false,
        selectedOptions: {},
        selectedAddOns: []
      },
      { 
        name: 'Intranquil 舊情復熾', 
        quantity: 2, 
        price: 988,
        category: 'candle',
        basePrice: 988,
        hasOptions: true,
        selectedOptions: {
          "1": "標準版本"
        },
        selectedAddOns: []
      }
    ]
  },
  {
    id: 'ORD002', 
    customerIgName: 'lee_dahua88',
    customerPhone: '0987654321',
    date: '2024-01-25',
    orderDate: '2024-01-25',
    status: '處理中',
    total: 1476,
    totalAmount: 1476,
    completedDate: null,
    products: [
      { 
        name: '靈擺調頻 - 愛情調頻', 
        quantity: 1, 
        price: 1476,
        category: 'frequency',
        basePrice: 1476,
        hasOptions: true,
        selectedOptions: {
          "1": "遠距離調頻",
          "2": "3個月"
        },
        selectedAddOns: []
      }
    ]
  },
  {
    id: 'ORD003',
    customerIgName: 'wang.xiaoming',
    customerPhone: '0933333333',
    date: '2024-02-01',
    orderDate: '2024-02-01',
    status: '待處理',
    total: 988,
    totalAmount: 988,    completedDate: null,
    products: [
      { 
        name: 'Break Up 分手蠟燭', 
        quantity: 1, 
        price: 988,
        category: 'candle',
        basePrice: 988,
        hasOptions: true,
        selectedOptions: {
          "1": "標準版本"
        },
        selectedAddOns: []
      }
    ]
  },
  {
    id: 'ORD004',
    customerIgName: 'zhang_xiaohua2024',
    customerPhone: '0944444444',
    date: '2024-02-05',
    orderDate: '2024-02-05',
    status: '已取消',
    total: 1690,
    totalAmount: 1690,
    completedDate: null,
    products: [
      { 
        name: '靈擺調頻 - 事業財運調頻', 
        quantity: 1, 
        price: 1690,
        category: 'frequency',
        basePrice: 1690,
        hasOptions: true,
        selectedOptions: {
          "1": "遠距離調頻",
          "2": "6個月"
        },
        selectedAddOns: []
      }
    ]
  }
];
