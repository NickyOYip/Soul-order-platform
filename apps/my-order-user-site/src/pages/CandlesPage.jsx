import { useState, useEffect } from 'react';
import { api, candleSubCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';

const CandlesPage = ({ onNavigate }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState('七日星體蠟燭');
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Load all candle products (both subcategories)
        const products = await api.getCandleProducts();
        setAllProducts(products);
      } catch (error) {
        console.error('Failed to load candle products:', error);
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
  const filteredProducts = allProducts.filter(product => 
    product.subCategory === selectedSubCategory
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">魔法蠟燭</h1>
        <p className="text-xl mb-6">
          以火焰作為媒介將您的願望透過蠟燭、魔法精油、草藥和你的意念發送給宇宙，跟宇宙許下訂單
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>手工製作</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>天然材料</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>能量注入</span>
          </div>
        </div>      </div>      {/* Main Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg">        {/* Subcategory Filter */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">蠟燭分類</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-4xl mx-auto">
          {candleSubCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedSubCategory(category.id)}
              className={`px-3 py-2 text-sm rounded-full font-medium transition-all text-center ${
                selectedSubCategory === category.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <h3 className="text-xl font-bold mb-6 text-center text-gray-700">{selectedSubCategory}</h3>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <>            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredProducts.map((product) => (                <ProductCard
                  key={product.id}
                  service={product}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </>
        )}         
          
        </div>

      

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={hideToast}
      />
    </div>
  );
};

export default CandlesPage;
