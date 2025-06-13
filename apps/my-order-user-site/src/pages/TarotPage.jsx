import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { useCart } from '../contexts/CartContext';

const TarotPage = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [selectedSubCategory, setSelectedSubCategory] = useState('online');
  const [onlineProducts, setOnlineProducts] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [phoneProducts, setPhoneProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const subCategories = [
    { id: 'online', label: '線上占卜', description: '24小時內回報，文字或語音報告' },
    { id: 'store', label: '門市占卜', description: '面對面專業諮詢，即時互動解讀' },
    { id: 'phone', label: '電話占卜', description: '語音即時諮詢，靈活時間安排' },
    { id: 'other', label: '其他服務', description: '快速簡單占卜，即時回覆' }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        if (selectedSubCategory === 'online') {
          const products = await api.getTarotOnlineProducts();
          setOnlineProducts(products);
        } else if (selectedSubCategory === 'store') {
          const products = await api.getTarotStoreProducts();
          setStoreProducts(products);
        } else if (selectedSubCategory === 'phone') {
          const products = await api.getTarotPhoneProducts();
          setPhoneProducts(products);
        } else if (selectedSubCategory === 'other') {
          const products = await api.getTarotOtherProducts();
          setOtherProducts(products);
        }
      } catch (error) {
        console.error('Failed to load tarot products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedSubCategory]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const handleAddToCart = (product) => {
    // Convert tarot product to cart item format
    const cartItem = {
      id: `tarot_${selectedSubCategory}_${product.id}`,
      name: product.name,
      price: product.price,
      type: 'tarot_reading',
      description: product.description,
      details: {
        category: selectedSubCategory,
        duration: product.duration,
        includes: product.includes,
        reportType: product.reportType,
        serviceType: product.serviceType
      }
    };
    
    addToCart(cartItem);
    showToast(`已將「${product.name}」加入購物車！`, 'success');
    console.log('Added to cart:', cartItem);
  };

  const getCurrentProducts = () => {
    switch (selectedSubCategory) {
      case 'online': return onlineProducts;
      case 'store': return storeProducts;
      case 'phone': return phoneProducts;
      case 'other': return otherProducts;
      default: return [];
    }
  };  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">塔羅占卜</h1>
        <p className="text-xl mb-6">
          透過古老的塔羅牌智慧，為你解讀人生的過去、現在與未來
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>古老智慧</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>精準解讀</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>人生指引</span>
          </div>
        </div>
      </div>

      {/* Subcategory Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">占卜方式</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {subCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedSubCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedSubCategory === category.id
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Category Description */}
        <div className="text-center">
          <div className="bg-indigo-50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-indigo-700">
              {subCategories.find(cat => cat.id === selectedSubCategory)?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Online Reading Services */}
      {selectedSubCategory === 'online' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">線上占卜服務</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {getCurrentProducts().map((product) => (
                  <ProductCard
                    key={product.id}
                    service={product}
                    cardType="service"
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}

          {/* Information Section */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">線上占卜服務說明</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-3">服務特色</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 24小時內完成解讀</li>
                  <li>• 提供文字或語音報告</li>
                  <li>• 專業塔羅師親自解讀</li>
                  <li>• 詳細分析與具體建議</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-3">適合對象</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 時間靈活的客戶</li>
                  <li>• 需要深度思考的問題</li>
                  <li>• 希望保留報告的客戶</li>
                  <li>• 不方便面談的情況</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-indigo-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-indigo-600 transition-colors">
              了解更多線上占卜
            </button>
          </div>
        </div>
      )}

      {/* Store Reading Services */}
      {selectedSubCategory === 'store' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">門市占卜服務</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {getCurrentProducts().map((product) => (
                  <ProductCard
                    key={product.id}
                    service={product}
                    cardType="service"
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}

          {/* Store Information */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">門市占卜優勢</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🤝</div>
                <h4 className="font-bold text-gray-700 mb-2">面對面互動</h4>
                <p className="text-sm text-gray-600">即時溝通，深度交流</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold text-gray-700 mb-2">即時解答</h4>
                <p className="text-sm text-gray-600">問題立即釐清</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-bold text-gray-700 mb-2">精準指導</h4>
                <p className="text-sm text-gray-600">個人化建議</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-purple-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-purple-600 transition-colors">
              預約門市占卜
            </button>
          </div>
        </div>
      )}

      {/* Phone Reading Services */}
      {selectedSubCategory === 'phone' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">電話占卜服務</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {getCurrentProducts().map((product) => (
                  <ProductCard
                    key={product.id}
                    service={product}
                    cardType="service"
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}

          {/* Phone Reading Information */}
          <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">電話占卜特色</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-3">服務優勢</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 時間地點靈活安排</li>
                  <li>• 語音即時互動</li>
                  <li>• 保護個人隱私</li>
                  <li>• 多種時長選擇</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-3">預約方式</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 提前24小時預約</li>
                  <li>• 緊急服務當日安排</li>
                  <li>• 彈性改期服務</li>
                  <li>• 專業客服協助</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-pink-600 transition-colors">
              預約電話占卜
            </button>
          </div>
        </div>
      )}

      {/* Other Services */}
      {selectedSubCategory === 'other' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">其他占卜服務</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {getCurrentProducts().map((product) => (
                  <ProductCard
                    key={product.id}
                    service={product}
                    cardType="service"
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}

          {/* Quick Services Information */}
          <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">快速服務特色</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold text-gray-700 mb-2">快速回覆</h4>
                <p className="text-sm text-gray-600">最快即時回覆</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-bold text-gray-700 mb-2">經濟實惠</h4>
                <p className="text-sm text-gray-600">親民的價格</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-bold text-gray-700 mb-2">精準簡潔</h4>
                <p className="text-sm text-gray-600">直接有效</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-teal-600 transition-colors">
              立即開始占卜
            </button>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">占卜流程</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600">1</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">選擇服務</h3>
            <p className="text-gray-600 text-sm">選擇適合的占卜方式</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600">2</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">提出問題</h3>
            <p className="text-gray-600 text-sm">明確描述您的疑問</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600">3</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">專業解讀</h3>
            <p className="text-gray-600 text-sm">資深占卜師解讀</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-indigo-600">4</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">獲得指引</h3>
            <p className="text-gray-600 text-sm">收到詳細建議</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">準備好探索您的未來了嗎？</h2>
        <p className="text-gray-600 mb-6">
          讓塔羅牌為您揭示人生的奧秘與可能性
        </p>
        <button 
          onClick={() => setSelectedSubCategory('online')}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          開始塔羅占卜
        </button>
      </div>

      {/* Toast Component */}
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

export default TarotPage;
