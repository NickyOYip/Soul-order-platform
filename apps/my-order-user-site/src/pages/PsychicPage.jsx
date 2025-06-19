import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';

const PsychicPage = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getPsychicProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load psychic products:', error);
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
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">潛意識讀心</h1>
        <p className="text-xl mb-6">
          拿著你的問題，直接去對方的潛意識找答案！一針見血地了解對方內心深處的想法
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>心靈圖卡</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>一針見血</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>潛意識探索</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">潛意識讀心服務</h2>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">潛意識讀心說明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-700 mb-3">服務特色</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 直接讀取潛意識想法</li>
                <li>• 心靈圖卡一針見血</li>
                <li>• 完全隱密不被發現</li>
                <li>• 僅接受開放式問題</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-700 mb-3">注意事項</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 讀心前請確定能接受真相</li>
                <li>• 對方不會有任何感覺</li>
                <li>• 不會得悉被讀心</li>
                <li>• 結果可能出乎意料</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 font-medium mb-2">問題類型說明</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-green-700">
                <strong>✓ 開放式問題（接受）</strong><br />
                「你對我有什麼感覺？」
              </div>
              <div className="text-red-700">
                <strong>✗ 是否題（不接受）</strong><br />
                「你對我有沒有好感？」
              </div>
            </div>
          </div>
        </div>
      </div>      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">讀心流程</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">提出問題</h3>
            <p className="text-gray-600 text-sm">準備開放式問題</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">連結潛意識</h3>
            <p className="text-gray-600 text-sm">進入對方潛意識層面</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">圖卡解讀</h3>
            <p className="text-gray-600 text-sm">心靈圖卡呈現真相</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">獲得答案</h3>
            <p className="text-gray-600 text-sm">一針見血的真實回答</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">準備好探索真相了嗎？</h2>
        <p className="text-gray-600 mb-6">
          直接從潛意識找到最真實的答案，但請確保您能承受真相
        </p>        <a 
          href="https://wa.me/message/5QMJWPEC4TICA1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          開始潛意識讀心
        </a>
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

export default PsychicPage;
