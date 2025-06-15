import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';

const AstrologyPage = ({ onNavigate }) => {
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
      </div>      {/* Main Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">八字&紫微斗數服務</h2>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {products.map((product) => (                <ProductCard
                  key={product.id}
                  service={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </>
        )}

        {/* Information Section */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">命理分析服務說明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-3">服務特色</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 專業八字命盤分析</li>
                <li>• 紫微斗數詳細解讀</li>
                <li>• 全面運勢預測</li>
                <li>• 個人化改善建議</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3">分析範圍</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 學業與事業發展</li>
                <li>• 健康狀況預測</li>
                <li>• 財運分析指導</li>
                <li>• 感情與人際關係</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-6">
            <button className="bg-amber-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-amber-600 transition-colors">
              了解更多命理服務
            </button>
          </div>
        </div>
      </div>

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
        </p>        <button 
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
