import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';

const LovePage = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getLoveProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load love products:', error);
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
  
  const handleServiceClick = (service) => {
    console.log('Service clicked:', service);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">月老紅線 🧧</h1>
        <p className="text-xl mb-6">
          月老牽線，為你尋找命中注定的良緣，讓愛情之花綻放 💕
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>月老加持</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>姻緣天定</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>愛情圓滿</span>
          </div>
        </div>
      </div>      {/* Main Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">月老紅線服務</h2>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <>
            {/* Product Grid */}            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  service={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </>
        )}

        {/* Information Section */}
        <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">月老紅線服務說明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-3">服務特色</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 專業紅線狀況檢測</li>
                <li>• 姻緣指數深度分析</li>
                <li>• 個人化調頻服務</li>
                <li>• 月老靈力加持</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3">服務流程</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 先進行紅線查詢</li>
                <li>• 了解目前姻緣狀況</li>
                <li>• 根據結果進行調頻</li>
                <li>• 提升感情發展機會</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-6">
            <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-pink-600 transition-colors">
              了解更多月老服務
            </button>
          </div>        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">月老紅線流程</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">1</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">紅線查詢</h3>
            <p className="text-gray-600 text-sm">檢測目前紅線狀況</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">2</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">詳細分析</h3>
            <p className="text-gray-600 text-sm">了解姻緣指數與阻礙</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">3</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">專業調頻</h3>
            <p className="text-gray-600 text-sm">根據結果進行調整</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">4</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">姻緣提升</h3>
            <p className="text-gray-600 text-sm">感情機會大幅改善</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-200 to-red-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">準備好尋找您的真愛了嗎？</h2>
        <p className="text-gray-600 mb-6">
          讓月老為您牽起紅線，找到命中注定的另一半
        </p>
        <button 
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-3 rounded-full font-medium hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
        >
          開始紅線查詢
        </button>
      </div>

      {/* Toast Component */}
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={hideToast} 
      />
    </div>
  );
};

export default LovePage;
