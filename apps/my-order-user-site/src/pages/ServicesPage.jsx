import { useEffect, useState } from 'react';
import { api, serviceCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

const ServicesPage = ({ initialCategory = 'all' }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await api.getServicesByCategory(selectedCategory);
        setServices(data);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [selectedCategory]);

  const handleServiceClick = (service) => {
    // Future: Navigate to service detail page
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
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">服務與產品</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          探索我們完整的心靈療癒服務，每一項服務都經過精心設計，為您帶來內心的平靜與指引
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {serviceCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-500 hover:text-pink-500'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Category Description */}
      {selectedCategory !== 'all' && (
        <div className="text-center mb-8">
          <div className="bg-pink-50 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-pink-700">
              {serviceCategories.find(cat => cat.id === selectedCategory)?.description}
            </p>
          </div>
        </div>
      )}

      {/* Services Grid */}
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">          {services.map((service) => (
            <ProductCard 
              key={service.id} 
              service={service} 
              onClick={handleServiceClick}
              cardType="service"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.458.902-6.05 2.376a9.06 9.06 0 002.884-5.17C8.34 12.073 8 11.98 8 12s.34.073.834.206A9.06 9.06 0 0111 12h1z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">此分類暫無可用服務</p>
        </div>
      )}

      {/* Featured Services Section */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">熱門服務推薦</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-pink-500 mb-3">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">愛情運勢</h3>
            <p className="text-gray-600 text-sm">專業的感情諮詢與月老紅線服務</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-pink-500 mb-3">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">命理占星</h3>
            <p className="text-gray-600 text-sm">深度八字與紫微斗數解析</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-pink-500 mb-3">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">能量療癒</h3>
            <p className="text-gray-600 text-sm">魔法蠟燭與能量調頻服務</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-200 to-pink-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">需要個人化諮詢？</h2>
        <p className="text-gray-600 mb-6">
          我們的專業團隊隨時為您提供量身訂做的服務建議，歡迎透過Instagram私訊聯絡
        </p>
        <div className="flex justify-center space-x-4">
          <button className="btn-primary px-6 py-3 rounded-full font-medium">
            Instagram 諮詢
          </button>
          <button className="border border-pink-500 text-pink-500 px-6 py-3 rounded-full font-medium hover:bg-pink-50 transition-colors">
            查看會員方案
          </button>
        </div>      </div>
    </div>
  );
};

export default ServicesPage;
