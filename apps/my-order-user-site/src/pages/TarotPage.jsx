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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">占卜分類</h2>        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-4xl mx-auto">
          {tarotSubCategories.map((subCat) => (
            <button
              key={subCat.key}
              onClick={() => setSelectedSubCategory(subCat.key)}
              className={`px-3 py-2 text-sm rounded-full font-medium transition-all flex items-center justify-center gap-2 ${
                selectedSubCategory === subCat.key
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <span className="text-base">{subCat.icon}</span>
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
          </>        )}
      </div>      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {selectedSubCategory === '門市占卜' ? '門市占卜流程' : 
           selectedSubCategory === '線上占卜' ? '線上占卜流程' : 
           selectedSubCategory === '電話占卜' ? '電話占卜流程' : '占卜流程'}
        </h2>
          {selectedSubCategory === '門市占卜' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">選擇時長</h3>
                <p className="text-gray-600 text-sm">選擇需要占卜的時長</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">預約確認</h3>
                <p className="text-gray-600 text-sm">付款後店主聯絡確認訂單後會幫忙預約時間</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">光臨門市</h3>
                <p className="text-gray-600 text-sm">光臨門市享受私人專屬占卜服務</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">4</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">專屬服務</h3>
                <p className="text-gray-600 text-sm">享受完整的占卜體驗與指引</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 mt-6">
              <h4 className="font-bold text-gray-800 mb-4">門市占卜詳細說明</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-indigo-600 mb-3">預約與到店</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 建議提前1-3天預約，確保有您喜愛的占卜師</li>
                    <li>• 請準時到達，遲到可能影響占卜時間</li>
                    <li>• 門市地址：台北市大安區○○路○○號</li>
                    <li>• 營業時間：週一至週日 10:00-22:00</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-600 mb-3">占卜過程</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 占卜時間約30分鐘，深度解讀您的問題</li>
                    <li>• 可選擇不同牌陣：愛情、事業、健康等</li>
                    <li>• 占卜師會詳細解釋每張牌的意義</li>
                    <li>• 您可以隨時提問，進行互動討論</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700">
                  <strong>溫馨提醒：</strong>請帶著開放的心態，明確的問題來占卜。避免重複占卜同一問題，給予宇宙足夠的時間為您安排。
                </p>
              </div>
            </div>
          </div>
        )}        {selectedSubCategory === '線上占卜' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">下單選擇</h3>
                <p className="text-gray-600 text-sm">下單適合自身情況的占卜plan</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">填寫資料</h3>
                <p className="text-gray-600 text-sm">付款後店主聯絡確認訂單後填寫表格（1.中/英文名 2.生日 3.大致情況）</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">專業占卜</h3>
                <p className="text-gray-600 text-sm">占卜師會在二十四小時內為你占卜</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">4</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">收到結果</h3>
                <p className="text-gray-600 text-sm">發送占卜結果給你（包括文字解釋和牌面照片）🫸🏻若對結果不明白可提出疑問🫷🏻</p>
              </div>            </div>
          </div>
        )}{selectedSubCategory === '電話占卜' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">選擇時長</h3>
                <p className="text-gray-600 text-sm">選擇需要占卜的時長</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">預約時間</h3>
                <p className="text-gray-600 text-sm">付款後店主聯絡確認訂單後為你預約時間</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">連線占卜</h3>
                <p className="text-gray-600 text-sm">可選電話連線或錄音方式進行📲</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">4</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">即時問答</h3>
                <p className="text-gray-600 text-sm">占卜師和客人須同時在線，客人可在所選時間內任問</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 mt-6">
              <h4 className="font-bold text-gray-800 mb-4">電話占卜詳細說明</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-indigo-600 mb-3">預約與通話</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 可預約當日或未來7天內的時段</li>
                    <li>• 占卜師會在約定時間主動致電給您</li>
                    <li>• 請確保手機暢通，並準備好筆記</li>
                    <li>• 通話時間約20-30分鐘</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-600 mb-3">占卜內容</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 即時抽牌與牌義解釋</li>
                    <li>• 可針對牌面進行深度討論</li>
                    <li>• 提供具體的行動建議</li>
                    <li>• 解答您當下的疑問與困惑</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700">
                  <strong>通話小提醒：</strong>建議在安靜的環境中進行占卜，準備好您想詢問的問題清單，這樣能讓占卜更加順暢有效。
                </p>
              </div>
            </div>
          </div>
        )}

        {(selectedSubCategory === '快速占卜' || selectedSubCategory === '進階占卜') && (
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
        )}
      </div>{/* CTA Section */}
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
