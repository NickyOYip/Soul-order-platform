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
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-8">        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {selectedSubCategory === '門市占卜' ? '門市占卜流程' : 
           selectedSubCategory === '線上占卜' ? '線上占卜流程' : 
           selectedSubCategory === '電話占卜' ? '電話占卜流程' : 
           selectedSubCategory === '其他服務' ? '其他服務流程' : '占卜流程'}
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
                    <li>• 建議提前3-7天預約，不接受當天預約</li>
                    <li>• 請準時到達，遲到可能影響占卜時間</li>
                    <li>• 門市地址：觀塘中美中心A座9樓19室</li>
                    <li>• 門市以預約制形式開放，不接受Walk in</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-indigo-600 mb-3">占卜過程</h5>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 占卜時間約30-60分鐘，深度解讀您的問題</li>
                    <li>• 可選擇不同範疇：愛情、事業、金錢等</li>
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
                <p className="text-gray-600 text-sm">付款後店主聯絡確認訂單後填寫表格<br />（1.中/英文名 2.生日 3.大致情況）</p>
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
                <p className="text-gray-600 text-sm">發送占卜結果給你<br />（包括文字解釋和牌面照片）<br />🫸🏻若對結果不明白可提出疑問🫷🏻</p>
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
                </div>                <h3 className="font-bold text-gray-800 mb-2">即時問答</h3>
                <p className="text-gray-600 text-sm">占卜師和客人須同時在線，客人可在所選時間內任問</p>
              </div>
            </div>
              <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-xl p-6 mt-6 border border-indigo-100 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">電話占卜詳細說明</h4>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h5 className="text-lg font-bold text-gray-800">預約與通話</h5>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">可預約當日或未來7天內的時段</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">占卜師會在約定時間主動致電給您</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">請確保手機暢通，並準備好筆記</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">通話時間約20-30分鐘</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4l-2 16h14l-2-16M10 9v6M14 9v6" />
                      </svg>
                    </div>
                    <h5 className="text-lg font-bold text-gray-800">占卜內容</h5>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">即時抽牌與牌義解釋</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">可針對牌面進行深度討論</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">提供具體的行動建議</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700">解答您當下的疑問與困惑</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 relative">
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h6 className="font-bold text-lg mb-2">📞 通話小提醒</h6>
                      <p className="text-sm leading-relaxed opacity-95">
                        建議在安靜的環境中進行占卜，準備好您想詢問的問題清單，這樣能讓占卜更加順暢有效。保持開放的心態，讓塔羅牌的智慧為您指引方向。
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-70"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        )}

        {selectedSubCategory === '其他服務' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">選擇服務</h3>
                <p className="text-gray-600 text-sm">選擇適合自身情況的服務</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">確認訂單</h3>
                <p className="text-gray-600 text-sm">付款後店主聯絡確認訂單</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">提出問題</h3>
                <p className="text-gray-600 text-sm">提出想查詢的問題</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">4</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2">收到結果</h3>
                <p className="text-gray-600 text-sm">二十四小時內收到結果</p>
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
        </p>        <a 
          href="https://wa.me/message/5QMJWPEC4TICA1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          開始塔羅占卜
        </a>
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
