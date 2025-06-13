import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { useCart } from '../contexts/CartContext';

const CandlesPage = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [selectedSubCategory, setSelectedSubCategory] = useState('planetary');
  const [planetaryProducts, setPlanetaryProducts] = useState([]);
  const [loversProducts, setLoversProducts] = useState([]);
  const [customProducts, setCustomProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });const subCategories = [
    { id: 'planetary', label: '七日星體蠟燭', description: '根據七大星體能量製作的專業蠟燭' },
    { id: 'lovers', label: '戀人蠟燭儀式', description: '專為愛情關係設計的浪漫蠟燭儀式' },
    { id: 'custom', label: '自家款魔法蠟燭', description: '獨家配方的特製魔法蠟燭' }
  ];  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        if (selectedSubCategory === 'planetary') {
          const products = await api.getPlanetaryCandleProducts();
          setPlanetaryProducts(products);
        } else if (selectedSubCategory === 'lovers') {
          const products = await api.getLoversCandleProducts();
          setLoversProducts(products);
        } else if (selectedSubCategory === 'custom') {
          const products = await api.getCustomCandleProducts();
          setCustomProducts(products);
        }
      } catch (error) {
        console.error('Failed to load candle products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedSubCategory]);
  const handleServiceClick = (service) => {
    console.log('Service clicked:', service);
  };  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const handleAddToCart = (product) => {
    // Convert product to cart item format for planetary candles
    const cartItem = {
      id: `planetary_${product.id}`,
      name: product.name,
      price: product.totalPrice || product.price,
      type: 'planetary_candle',
      description: product.description,
      details: {
        planet: product.planet,
        day: product.day,
        color: product.color,
        burnTime: product.burnTime,
        selectedAddOns: product.selectedAddOns || []
      }
    };
    
    addToCart(cartItem);
    showToast(`已將「${product.name}」加入購物車！`, 'success');
    console.log('Added to cart:', cartItem);
  };  const handleLoversAddToCart = (product) => {
    // Convert lovers product to cart item format
    const basePrice = product.totalPrice || product.price;
    const cartItem = {
      id: `lovers_${product.id}`,
      name: product.name,
      price: basePrice,
      type: 'lovers_candle',
      description: product.description,
      details: {
        color: product.color,
        burnTime: product.burnTime,
        selectedAddOns: product.selectedAddOns || []
      }
    };
    
    addToCart(cartItem);
    
    // Create detailed message for lovers candles with add-ons
    let message = `已將「${product.name}」加入購物車！`;
    if (product.selectedAddOns && product.selectedAddOns.length > 0) {
      const addOnNames = product.selectedAddOns.map(addon => addon.name).join('、');
      message += ` (含 ${addOnNames})`;
    }
    
    showToast(message, 'success');
    console.log('Added to cart:', cartItem);
  };

  const handleCustomAddToCart = (product) => {
    // Convert custom product to cart item format
    const basePrice = product.totalPrice || product.price;
    const cartItem = {
      id: `custom_${product.id}_${product.selectedSize?.size || 'small'}`,
      name: `${product.name} (${product.selectedSize?.size || '小'})`,
      price: basePrice,
      type: 'custom_candle',
      description: product.description,
      details: {
        selectedSize: product.selectedSize,
        burnTime: product.selectedSize?.burnTime,
        selectedAddOns: product.selectedAddOns || []
      }
    };
    
    addToCart(cartItem);
    
    // Create detailed message for custom candles with size and add-ons
    let message = `已將「${product.name}」(${product.selectedSize?.size || '小'})加入購物車！`;
    if (product.selectedAddOns && product.selectedAddOns.length > 0) {
      const addOnNames = product.selectedAddOns.map(addon => addon.name).join('、');
      message += ` (含 ${addOnNames})`;
    }
    
    showToast(message, 'success');
    console.log('Added to cart:', cartItem);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">魔法蠟燭</h1>
        <p className="text-xl mb-6">
          特製的魔法蠟燭，注入各種能量與意圖，為你帶來所需的改變
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
        </div>
      </div>      {/* Subcategory Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">蠟燭分類</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {subCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedSubCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedSubCategory === category.id
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-pink-50 text-pink-600 border border-pink-200 hover:bg-pink-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
          {/* Category Description */}
        <div className="text-center">
          <div className="bg-pink-50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-pink-700">
              {subCategories.find(cat => cat.id === selectedSubCategory)?.description}
            </p>
          </div>
        </div>
      </div>      {/* Subcategory Content */}
      {selectedSubCategory === 'planetary' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">七日星體蠟燭</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <>              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {planetaryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cardType="planetary"
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}

          {/* Information Section */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">七日星體蠟燭使用指南</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-3">使用方法</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 選擇對應星體能量的蠟燭</li>
                  <li>• 在安靜空間點燃，讓其持續燃燒7天</li>
                  <li>• 每日觀察蠟燭燃燒狀況並記錄</li>
                  <li>• 配合提供的魔法油進行儀式</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-3">注意事項</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 確保燃燒環境安全</li>
                  <li>• 建議在對應星體日開始燃燒</li>
                  <li>• 保持正面意圖與專注</li>
                  <li>• 燃燒完畢後保留蠟燭殘留物</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-primary px-8 py-3 rounded-full font-medium text-lg">
              諮詢星體蠟燭專家
            </button>
          </div>
        </div>
      )}      {selectedSubCategory === 'lovers' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">戀人蠟燭儀式</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <>              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {loversProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cardType="lovers"
                    onAddToCart={handleLoversAddToCart}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Information Section */}
          <div className="bg-gradient-to-r from-pink-100 to-red-100 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">戀人蠟燭儀式進行方式</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-pink-600 font-bold">1</span>
                </div>
                <p className="text-sm text-gray-600">準備神聖空間</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-pink-600 font-bold">2</span>
                </div>
                <p className="text-sm text-gray-600">點燃蠟燭祈願</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-pink-600 font-bold">3</span>
                </div>
                <p className="text-sm text-gray-600">進行愛情冥想</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-pink-600 font-bold">4</span>
                </div>
                <p className="text-sm text-gray-600">感謝與結束</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-primary px-8 py-3 rounded-full font-medium text-lg">
              諮詢愛情蠟燭專家
            </button>
          </div>
        </div>
      )}      {selectedSubCategory === 'custom' && (
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">自家款魔法蠟燭</h2>
          
          {loading ? (
            <div className="flex items-center justify-center min-h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <>              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {customProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    cardType="custom"
                    onAddToCart={handleCustomAddToCart}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Information Section */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">自家款魔法蠟燭特色</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">🌟</span>
                </div>
                <h4 className="font-bold text-gray-700 mb-2">獨家配方</h4>
                <p className="text-sm text-gray-600">每款蠟燭都有獨特的魔法油和草藥配方</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">🔥</span>
                </div>
                <h4 className="font-bold text-gray-700 mb-2">多種尺寸</h4>
                <p className="text-sm text-gray-600">提供小、中、大三種尺寸，滿足不同需求</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">✨</span>
                </div>
                <h4 className="font-bold text-gray-700 mb-2">能量加持</h4>
                <p className="text-sm text-gray-600">可選龍血樹脂加持，增強法術效力</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="btn-primary px-8 py-3 rounded-full font-medium text-lg">
              諮詢客製化蠟燭
            </button>
          </div>
        </div>
      )}

      {/* How to Use Section */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">使用方法</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">1</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">選擇意圖</h3>
            <p className="text-gray-600 text-sm">根據您的需求選擇適合的蠟燭類型</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">2</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">點燃蠟燭</h3>
            <p className="text-gray-600 text-sm">在安靜的環境中點燃，專注於您的願望</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-600">3</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">感受能量</h3>
            <p className="text-gray-600 text-sm">讓蠟燭的能量引導您達成目標</p>
          </div>
        </div>
      </div>      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-200 to-pink-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">需要客製化蠟燭？</h2>
        <p className="text-gray-600 mb-6">
          我們可以根據您的特殊需求製作專屬的魔法蠟燭
        </p>
        <button className="btn-primary px-6 py-3 rounded-full font-medium">
          聯絡客製服務
        </button>
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
