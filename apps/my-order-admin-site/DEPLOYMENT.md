# Deployment Guide - Soul Order Platform Admin Site

This admin site is designed for easy deployment with both mock and real API support.

## Quick Deployment Setup

### 1. Mock API Mode (Default - for Testing/Demo)
The app runs in mock API mode by default, using local product data and mock CRUD operations.

**No additional setup required** - just build and deploy!

```bash
npm run build
# Deploy the dist folder to your hosting platform
```

### 2. Real API Mode (for Production)

To switch to real API mode:

#### Step 1: Configure API Settings
Edit `src/config/apiConfig.js`:
```javascript
const API_CONFIG = {
  // Change this to false for production
  USE_MOCK_API: false,
    // Set your real API base URL
  REAL_API_BASE_URL: 'https://your-api-domain.com/api',
  // Or use environment variable: import.meta.env.VITE_API_BASE_URL
}
```

#### Step 2: Set Environment Variables (Optional)
Create a `.env` file in the root directory:
```
VITE_API_BASE_URL=https://your-api-domain.com/api
```

Note: Vite uses `VITE_` prefix for environment variables that should be exposed to the client.

#### Step 3: Build and Deploy
```bash
npm run build
# Deploy the dist folder to your hosting platform
```

## API Endpoints Required for Real API Mode

Your backend API should provide these endpoints:

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category={category}` - Get products by category
- `POST /api/products` - Add new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Users
- `GET /api/users` - Get all users
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Orders
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/{id}` - Update order status

## Data Structures

### Product Object
```javascript
{
  id: number|string,
  name: string,
  category: string,
  subCategory: string,
  tag: string,
  detail: string,
  image: string,
  hasOptions: boolean,
  basePrice: number,
  soldOut: boolean,
  options?: array // if hasOptions is true
}
```

### User Object
```javascript
{
  id: number|string,
  name: string,
  email: string,
  phone: string,
  membership: string,
  joinDate: string,
  totalOrders: number,
  totalSpent: number,
  status: 'active'|'inactive'
}
```

### Order Object
```javascript
{
  id: string,
  customerName: string,
  customerEmail: string,
  orderDate: string,
  status: string,
  paymentStatus: string,
  totalAmount: number,
  completedDate: string|null,
  products: array
}
```

## Easy Deployment Platforms

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard if needed
3. Deploy automatically on git push

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Set environment variables if needed

### Traditional Hosting
1. Run `npm run build`
2. Upload the `dist` folder contents to your web server
3. Configure your web server to serve the React app

## Development vs Production

### Development
- Uses mock API by default
- All product data is local
- No backend required
- Perfect for frontend development and testing

### Production
- Switch `USE_MOCK_API` to `false`
- Requires real backend API
- Environment variables for configuration
- Full CRUD operations with real data

## Benefits of This Setup

1. **Easy Testing**: Mock API allows immediate testing without backend
2. **Flexible Deployment**: Switch between mock and real API with one config change
3. **Real Product Data**: Uses actual product data from user site
4. **Zero Dependencies**: Mock mode requires no external services
5. **Production Ready**: Real API mode supports full production deployment

## Support

For questions about deployment or API integration, refer to the API service code in:
- `src/services/apiService.js` - Main API service
- `src/services/mockApi.js` - Mock API implementation
- `src/config/apiConfig.js` - Configuration settings
