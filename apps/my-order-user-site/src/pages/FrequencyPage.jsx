import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { useCart } from '../contexts/CartContext';

const FrequencyPage = ({ onNavigate }) => {
  const { addToCart } = useCart();  const [selectedSubCategory, setSelectedSubCategory] = useState('love');
  const [loveProducts, setLoveProducts] = useState([]);
  const [careerProducts, setCareerProducts] = useState([]);
  const [personalProducts, setPersonalProducts] = useState([]);
  const [consultationProducts, setConsultationProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const subCategories = [
    { 
      id: 'love', 
      label: '愛情調頻'
    },
    { 
      id: 'career', 
      label: '事業財運調頻'
    },
    { 
      id: 'personal', 
      label: '自身調頻'
    },
    { 
      id: 'consultation', 
      label: '單項 & 加急'
    }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {        if (selectedSubCategory === 'love') {
          const products = await api.getFrequencyLoveProducts();
          setLoveProducts(products);
        } else if (selectedSubCategory === 'career') {
          const products = await api.getFrequencyCareerProducts();
          setCareerProducts(products);
        } else if (selectedSubCategory === 'personal') {
          const products = await api.getFrequencyPersonalProducts();
          setPersonalProducts(products);        } else if (selectedSubCategory === 'consultation') {
          const products = await api.getFrequencySingleProducts();
          setConsultationProducts(products);
        }
      } catch (error) {
        console.error('Failed to load frequency products:', error);
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
  };  const handleAddToCart = (product) => {
    // Convert frequency product to cart item format
    const cartItem = {
      id: `frequency_${product.id}_${product.selectedOption?.name || 'default'}`,
      name: product.selectedOption ? `${product.name} - ${product.selectedOption.name}` : product.name,
      price: product.totalPrice || product.selectedOption?.price || product.basePrice || product.price,
      type: 'frequency_adjustment',
      description: product.description,
      details: {
        category: product.category,
        duration: product.selectedOption?.duration,
        includes: product.selectedOption?.includes,
        bonus: product.selectedOption?.name === '包月' ? '送天使卡指引' : null
      }
    };
    
    addToCart(cartItem);
    showToast(`已將「${cartItem.name}」加入購物車！`, 'success');
    console.log('Added to cart:', cartItem);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">靈擺調頻</h1>
        <p className="text-xl mb-6">
          通過靈擺鏈接高我，影響潛意識，建議定期調整 🔄✨
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>高我連接</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>潛意識調整</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>定期維護</span>
          </div>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">資料需求</h2>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center">
              <span className="text-purple-600 mr-2">👥</span>
              <span>雙方姓名</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-purple-600 mr-2">🎂</span>
              <span>生日資料</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-purple-600 mr-2">📷</span>
              <span>相片（如有）</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">調頻分類</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {subCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedSubCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedSubCategory === category.id
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>      {/* Subcategory Content */}
      {selectedSubCategory === 'love' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">愛情調頻</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {/* Product Grid */}              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {loveProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    service={product}
                    cardType="service"
                    onAddToCart={handleAddToCart}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {selectedSubCategory === 'career' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">事業財運調頻</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {/* Product Grid */}              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {careerProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    service={product}
                    cardType="service"
                    onAddToCart={handleAddToCart}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {selectedSubCategory === 'personal' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">自身調頻</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {/* Product Grid */}              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {personalProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    service={product}
                    cardType="service"
                    onAddToCart={handleAddToCart}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </>
          )}        </div>
      )}

      {selectedSubCategory === 'consultation' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">單項 & 加急</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>          ) : (            <>
              {/* Product Grid */}              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {consultationProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    service={product}
                    cardType="service"
                    onAddToCart={handleAddToCart}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Special Offers */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">特別優惠</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-lg font-semibold text-orange-600 mb-2">
              凡買包月調頻PLAN 送天使卡指引 🎁
            </div>
            <div className="text-gray-600">
              隔日做一次，持續效果更佳
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={hideToast} 
      />
    </div>
  );
};

export default FrequencyPage;
