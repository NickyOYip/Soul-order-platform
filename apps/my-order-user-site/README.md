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
- **無障礙設計**: 良好的鍵盤導航和屏幕閱讀器支持+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
