import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { useCart } from '../contexts/CartContext';

const AstrologyPage = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getAstrologyProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load astrology products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const handleAddToCart = (product) => {
    // Convert astrology product to cart item format
    const cartItem = {
      id: `astrology_${product.id}`,
      name: product.name,
      price: product.price,
      type: 'astrology_reading',
      description: product.description,
      details: {
        duration: product.duration,
        includes: product.includes,
        areas: product.areas,
        features: product.features
      }
    };
    
    addToCart(cartItem);
    showToast(`已將「${product.name}」加入購物車！`, 'success');
    console.log('Added to cart:', cartItem);
  };
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">八字 & 紫微斗數</h1>
        <p className="text-xl mb-6">
          根據你的出生時間，解讀命盤奧秘，了解天生性格與人生軌跡
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>古老智慧</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>精準分析</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>人生指導</span>
          </div>        </div>
      </div>

      {/* Service Types Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">命理服務</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">八字命理</h3>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• 五行分析與平衡</li>
              <li>• 性格特質解讀</li>
              <li>• 大運流年預測</li>
              <li>• 事業財運分析</li>
              <li>• 感情婚姻指導</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">紫微斗數</h3>
            </div>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>• 星盤命宮分析</li>
              <li>• 人際關係解讀</li>
              <li>• 健康運勢預測</li>
              <li>• 子女運與家庭</li>
              <li>• 遷移與環境運</li>
            </ul>          </div>
        </div>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">選擇您的命理分析</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                service={product}
                cardType="service"
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暫無可用的命理服務</p>
        </div>
      )}

      {/* What You Need Section */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">您需要提供</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-center">出生資訊</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                出生年月日（農曆或國曆）
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                出生時間（時辰）
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                出生地點
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                性別
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 text-center">諮詢重點</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                想了解的人生領域
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                目前遇到的困擾
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                未來規劃方向
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                特別關心的問題
              </li>
            </ul>          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-200 to-orange-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">準備好了解您的命運軌跡了嗎？</h2>
        <p className="text-gray-600 mb-6">
          讓古老的命理智慧為您揭示人生的秘密與可能性
        </p>
        <button 
          onClick={() => products.length > 0 && handleAddToCart(products[0])}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
        >
          預約命理分析
        </button>
      </div>
      
      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

export default AstrologyPage;
