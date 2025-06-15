import { useState, useEffect } from 'react';
import { api, tarotSubCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';

const TarotPage = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState('線上占卜');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const tarotProducts = await api.getTarotProducts();
        setProducts(tarotProducts);
      } catch (error) {
        console.error('Failed to load tarot products:', error);
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

  // Filter products by selected subcategory
  const filteredProducts = products.filter(product => 
    product.subCategory === selectedSubCategory
  );
  const getCurrentProducts = () => {
    return products.filter(product => product.subCategory === selectedSubCategory);
  };

  return (
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
        </div>      </div>      {/* Main Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        {/* Subcategory Filter */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">占卜分類</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {tarotSubCategories.map((subCat) => (
            <button
              key={subCat.key}
              onClick={() => setSelectedSubCategory(subCat.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                selectedSubCategory === subCat.key
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <span className="text-lg">{subCat.icon}</span>
              <span>{subCat.label}</span>
            </button>
          ))}
        </div>        
        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.map((product) => (                <ProductCard
                  key={product.id}
                  service={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </>
        )}        {/* Information Section */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            {selectedSubCategory === '線上占卜' ? '線上塔羅占卜說明' : 
             selectedSubCategory === '門市占卜' ? '門市塔羅占卜說明' : '快速占卜服務說明'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-3">服務特色</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {selectedSubCategory === '線上占卜' ? (
                  <>
                    <li>• 深度專業分析</li>
                    <li>• 針對性主題解讀</li>
                    <li>• 詳細文字報告</li>
                    <li>• 具體行動建議</li>
                  </>
                ) : selectedSubCategory === '門市占卜' ? (
                  <>
                    <li>• 面對面專業占卜</li>
                    <li>• 即時互動解讀</li>
                    <li>• 舒適門市環境</li>
                    <li>• 30分鐘深度占卜</li>
                  </>
                ) : (
                  <>
                    <li>• 快速回覆服務</li>
                    <li>• 經濟實惠價格</li>
                    <li>• 簡潔精準解讀</li>
                    <li>• 即時指引建議</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3">適合對象</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {selectedSubCategory === '線上占卜' ? (
                  <>
                    <li>• 需要深度分析的問題</li>
                    <li>• 重要人生決策時刻</li>
                    <li>• 感情事業規劃需求</li>
                    <li>• 希望詳細了解趨勢</li>
                  </>
                ) : selectedSubCategory === '門市占卜' ? (
                  <>
                    <li>• 喜歡面對面交流</li>
                    <li>• 需要即時回饋互動</li>
                    <li>• 一個範疇深度探討</li>
                    <li>• 追求完整占卜體驗</li>
                  </>
                ) : (
                  <>
                    <li>• 需要快速答案的時候</li>
                    <li>• 簡單是非題決策</li>
                    <li>• 尋求即時指引</li>
                    <li>• 初次體驗塔羅占卜</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="text-center mt-6">
            <button className="bg-indigo-500 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-indigo-600 transition-colors">
              了解更多塔羅占卜
            </button>
          </div>
        </div>
      </div>      {/* How It Works Section */}
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
      </div>      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-200 to-purple-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">準備好探索您的未來了嗎？</h2>
        <p className="text-gray-600 mb-6">
          讓塔羅牌為您揭示人生的奧秘與可能性
        </p>
        <button 
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
