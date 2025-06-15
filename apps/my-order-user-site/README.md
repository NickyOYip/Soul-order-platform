# 你之解憂雜貨店 - 用戶網站

## 項目概述

這是一個基於 React + Vite 構建的心靈療癒服務電商網站，提供塔羅占卜、魔法蠟燭、月老紅線等多種服務。

## 主要功能

### 用戶功能
- **瀏覽服務**: 查看所有可用的心靈療癒服務
- **購物車**: 添加、修改、刪除購物車中的服務
- **會員制度**: 根據消費金額自動升級會員等級（金卡、白金、鑽石）
- **結帳流程**: 填寫聯絡資訊、選擇付款方式、上傳付款證明
- **用戶認證**: 註冊、登入或以訪客身份購物

### 會員制度
- **金卡會員**: 單次消費 $1,000-1,499，享95折優惠
- **白金會員**: 單次消費 $1,500-1,999，享9折優惠
- **鑽石會員**: 單次消費 $1,999+，享85折優惠

### 付款方式
- FPS
- PayMe
- Alipay

## 技術棧

- **前端框架**: React 19 + Vite
- **樣式**: Tailwind CSS
- **圖標**: Heroicons
- **狀態管理**: React Context API
- **數據管理**: TanStack Query (for future API integration)
- **路由**: React Router DOM

## 開發指令

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 設計特色

- **粉色主題**: 靈感來自 BLACKPINK，使用粉色 (#ff5c8d) 作為主色調
- **現代化UI**: 乾淨、簡潔的設計風格
- **響應式設計**: 適配桌面和移動設備
- **動畫效果**: 卡片懸停、模態框進入等動畫
- **無障礙設計**: 良好的鍵盤導航和屏幕閱讀器支持

## 產品資料格式文檔

### 標準化產品結構

所有產品現在都使用統一的標準格式，包含以下核心字段：

```javascript
{
  id: number,                    // 產品唯一標識符
  name: string,                  // 產品名稱
  category: string,              // 產品類別
  subCategory: string,           // 產品子類別 (如無則為 'no-sub-cat')
  tag: string,                   // 產品標籤 (卡片上顯示的小標籤)
  detail: string,                // 產品詳細說明 (點擊查看更多時顯示)
  image?: string,                // 產品圖片路徑 (如無圖片則不顯示此元素)
  hasOptions: boolean,           // 是否有選項
  basePrice?: number,            // 基礎價格 (有選項時使用)
  price?: number,                // 固定價格 (無選項時使用)
  options?: Array                // 選項陣列 (新格式)
}
```

### 新選項格式結構

每個選項現在使用標準化的格式：

```javascript
{
  optionNo: number,              // 選項編號
  optionType: string,            // 選項類型: 'dropdown' | 'multiple selection' | 'detail card'
  optionTitle: string,           // 選項標題
  optionDetails: [               // 選項詳情陣列
    {
      name: string,              // 選項名稱
      description: string,       // 選項描述
      additionalPrice: number    // 附加價格 (基於 basePrice)
    }
  ]
}
```

### 選項類型說明

#### 1. Dropdown 類型
用於單選下拉選單，用戶只能選擇一個選項：
```javascript
{
  optionNo: 1,
  optionType: 'dropdown',
  optionTitle: '材質選擇',
  optionDetails: [
    {
      name: '不鏽鋼',
      description: '耐用防鏽',
      additionalPrice: 0
    },
    {
      name: '黃銅',
      description: '溫暖金色調，精緻表面處理',
      additionalPrice: 100
    }
  ]
}
```

#### 2. Detail Card 類型
用於顯示詳細資訊的卡片選擇：
```javascript
{
  optionNo: 2,
  optionType: 'detail card',
  optionTitle: '包裝選項',
  optionDetails: [
    {
      name: '標準包裝',
      description: '基本環保包裝',
      additionalPrice: 0
    },
    {
      name: '禮品包裝',
      description: '包含緞帶和訊息卡',
      additionalPrice: 50
    }
  ]
}
```

#### 3. Multiple Selection 類型 (未來功能)
用於多選功能，預留給未來實作：
```javascript
{
  optionNo: 3,
  optionType: 'multiple selection',
  optionTitle: '配件選擇',
  optionDetails: [
    {
      name: '額外鏈條',
      description: '額外20cm鏈條',
      additionalPrice: 30
    },
    {
      name: '刻字服務',
      description: '客製姓名或訊息',
      additionalPrice: 80
    }
  ]
}
```

### 產品類別與對應結構

#### 1. 基礎服務型產品

**類別**: `candles`, `frequency`, `tarot`, `astrology`, `love`, `psychic`, `healing`, `talisman`, `cleansing`, `consultation`

```javascript
{
  id: 1,
  name: "魔法蠟燭",
  category: "candles",
  subCategory: "energy-candles",
  tag: "手工製作",
  detail: "特製的魔法蠟燭，注入各種能量與意圖，為你帶來所需的改變...",
  image: "/images/candle.jpg",
  hasOptions: true,
  basePrice: 300,
  options: [
    {
      optionNo: 1,
      optionType: 'dropdown',
      optionTitle: '蠟燭尺寸',
      optionDetails: [
        {
          name: '小型蠟燭',
          description: '適合個人空間淨化或日常祈願，3-5小時燃燒時間',
          additionalPrice: 0
        }
      ]
    }
  ]
}
```

#### 2. 星座蠟燭產品

**類別**: `planetary-candles`

```javascript
{
  id: 1,
  name: "太陽能量蠟燭 - 成功領導",
  category: "planetary-candles",
  subCategory: "solar-energy",
  tag: "星期日",
  detail: "美國原裝進口，專為提升領導力與事業成功而設計...",
  image: "/images/solar-candle.jpg",
  hasOptions: false,
  price: 988,
  // 特殊屬性
  planet: "太陽",
  day: "星期日",
  color: "金黃色",
  magicalOil: "肉桂、橙花、檀香",
  herbs: "月桂葉、向日葵花瓣、金盞花",
  element: "火",
  purpose: "成功、領導力、活力、權威",
  burnTime: "7天持續燃燒",
  features: ["含蠟燭報告解讀", "魔法油/草藥儀式", "資深巫師手工打造"]
}
```

#### 3. 愛人蠟燭儀式

**類別**: `lovers-candles`

```javascript
{
  id: 1,
  name: "紅戀人蠟燭儀式",
  category: "lovers-candles",
  subCategory: "love-ritual",
  tag: "關係連結",
  detail: "增加關係連結，復合，親密。專業愛情儀式蠟燭...",
  image: "/images/red-lovers-candle.jpg",
  hasOptions: true,
  basePrice: 688,
  // 特殊屬性
  color: "紅色",
  magicalOil: "玫瑰、依蘭依蘭、檀香",
  herbs: "玫瑰花瓣、迷迭香、肉桂",
  element: "火",
  purpose: "關係連結、復合、增進親密",
  burnTime: "連續7天儀式",
  features: ["專業愛情儀式", "增強關係連結", "復合能量", "親密度提升"]
}
```

#### 4. 客製魔法蠟燭

**類別**: `custom-candles`

```javascript
{
  id: 1,
  name: "RETURN TO ME",
  category: "custom-candles",
  subCategory: "love-magic",
  tag: "召回愛人",
  detail: "召回失去的愛人，重新點燃愛情火花...",
  image: "/images/return-to-me-candle.jpg",
  hasOptions: true,
  basePrice: 95,
  // 特殊屬性
  purpose: "召回愛人、重燃愛情",
  magicalOil: "玫瑰、依蘭依蘭、龍血",
  herbs: "玫瑰花瓣、迷迭香、肉桂",
  element: "火"
}
```

### 購物車資料結構

當產品加入購物車時，會添加以下字段：

```javascript
{
  ...productData,                // 原始產品資料
  quantity: number,              // 數量
  selectedOptions?: Array,       // 選擇的選項 (新格式)
  totalPrice: number,            // 總價格 (basePrice + 所有 additionalPrice)
  customDetails?: Object         // 自定義詳情
}
```

選擇的選項格式：
```javascript
selectedOptions: [
  {
    optionNo: 1,
    selectedDetail: {
      name: "中型蠟燭",
      description: "適合家庭或辦公室空間，8-12小時燃燒時間",
      additionalPrice: 200
    }
  }
]
```

### 價格計算邏輯

總價格計算方式：
```javascript
const totalPrice = basePrice + selectedOptions.reduce((sum, option) => {
  return sum + option.selectedDetail.additionalPrice;
}, 0);
```

### ProductCard 組件整合

ProductCard 組件現在統一處理所有產品類型，根據以下字段顯示：

- **name**: 產品名稱
- **tag**: 小標籤 (右上角)
- **price/basePrice**: 價格顯示
- **detail**: 詳細說明 (點擊查看更多)
- **hasOptions**: 決定是否顯示選項按鈕
- **特殊顯示字段**: `day`, `color`, `planet` (用於圖標和標籤)

### 資料驗證指南

1. **必填字段**: `id`, `name`, `category`, `subCategory`, `tag`, `detail`
2. **價格字段**: 必須包含 `price` 或 `basePrice` 其中之一
3. **選項驗證**: 當 `hasOptions: true` 時，必須提供 `options` 陣列
4. **選項格式**: 每個選項必須包含 `optionNo`, `optionType`, `optionTitle`, `optionDetails`
5. **圖片字段**: `image` 為可選，如無圖片則不顯示圖片元素

### 擴展新產品類型

要添加新的產品類型：

1. 在 `api.js` 中定義產品資料結構，遵循標準格式
2. 設定適當的 `category`, `subCategory`, `tag`
3. 如需選項，使用新的選項格式
4. 在 `ProductCard.jsx` 中添加任何特殊顯示邏輯
5. 更新相應的購物車處理邏輯

這個標準化格式確保了所有產品在 ProductCard 組件中的一致性顯示，同時保持了足夠的靈活性來處理不同類型的產品特殊需求。

### 會員制度資料結構 (Membership System)

```javascript
// 會員等級判定
function determineMembership(amount) {
  if (amount >= 1999) return 'diamond';
  if (amount >= 1500) return 'platinum'; 
  if (amount >= 1000) return 'gold';
  return null;
}

// 會員折扣率
export const membershipDiscounts = {
  gold: 0.05,      // 5% 折扣 (95% 價格)
  platinum: 0.10,  // 10% 折扣 (90% 價格)
  diamond: 0.15    // 15% 折扣 (85% 價格)
};

// 會員等級名稱
export const getMembershipName = (membership) => {
  switch (membership) {
    case 'gold': return '金卡會員';
    case 'platinum': return '白金會員';
    case 'diamond': return '鑽石會員';
    default: return '';
  }
};
```

### API 服務結構

#### 服務查詢

```javascript
// 獲取所有服務
api.getServices() => Promise<Array<Service>>

// 根據類別獲取服務
api.getServicesByCategory(category: string) => Promise<Array<Service>>

// 獲取星座蠟燭
api.getPlanetaryCandles() => Promise<Array<PlanetaryCandle>>

// 獲取愛人蠟燭
api.getLoversCandles() => Promise<Array<LoversCandle>>

// 獲取客製蠟燭
api.getCustomCandles() => Promise<Array<CustomCandle>>

// 獲取線上塔羅
api.getTarotOnline() => Promise<Array<TarotOnline>>
```

#### 訂單相關

```javascript
// 提交訂單
api.submitOrder(orderData: {
  items: Array<CartItem>,        // 購物車項目
  userInfo: UserInfo,            // 用戶資訊
  paymentMethod: string,         // 付款方式
  totalAmount: number,           // 總金額
  membership?: string            // 會員等級
}) => Promise<OrderResponse>

// 獲取訂單
api.getOrders() => Promise<Array<Order>>
```

### 組件整合模式

#### ProductCard 組件

ProductCard 組件根據 `cardType` 屬性渲染不同類型的產品卡片：

- `service` - 基礎服務卡片
- `planetary` - 星座蠟燭卡片
- `lovers` - 愛人蠟燭卡片
- `custom` - 客製蠟燭卡片
- `tarot-online` - 線上塔羅卡片

```jsx
<ProductCard 
  product={productData}
  cardType="planetary"
  onAddToCart={handleAddToCart}
/>
```

### 資料驗證指南

1. **必填字段檢查**: 所有產品必須包含 `id`, `name`, `category`, `description`
2. **價格驗證**: 必須包含 `price` 或 `basePrice` 其中之一
3. **選項驗證**: 當 `hasOptions: true` 時，必須提供 `options` 陣列
4. **類型特定驗證**: 每種產品類型都有其特定的必填字段

### 擴展新產品類型

要添加新的產品類型：

1. 在 `api.js` 中定義產品資料結構
2. 在 `ProductCard.jsx` 中添加對應的卡片類型
3. 創建專門的產品頁面組件
4. 更新路由配置
5. 添加相應的購物車處理邏輯

這個文檔涵蓋了平台中所有產品資料格式，為開發者提供了完整的資料結構參考和整合指南。
