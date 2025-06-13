import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Toast from '../components/Toast';
import { useCart } from '../contexts/CartContext';

const LovePage = ({ onNavigate }) => {
  const { addToCart } = useCart();
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

  const handleAddToCart = (product) => {
    const cartItem = {
      id: `love-${product.id}-${Date.now()}`,
      name: product.name,
      price: product.options?.[0]?.price || product.price,
      quantity: 1,
      type: 'love_service',
      selectedOption: product.options?.[0] || null,
      image: product.image
    };

    addToCart(cartItem);
    showToast(`已將「${cartItem.name}」加入購物車！`, 'success');
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
      </div>      {/* Services Grid */}
      {products.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">選擇您的紅線服務</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                service={product} 
                onClick={handleServiceClick}
                onAddToCart={handleAddToCart}
                cardType="lovers"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暫無可用的月老紅線服務</p>
        </div>
      )}

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
