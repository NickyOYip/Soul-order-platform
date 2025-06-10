import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ServiceCard from '../components/ServiceCard';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: '全部服務' },
    { id: 'divination', label: '占卜服務' },
    { id: 'products', label: '魔法商品' },
    { id: 'love', label: '愛情運勢' },
    { id: 'astrology', label: '命理分析' },
    { id: 'psychic', label: '心靈療癒' }
  ];

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

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
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-pink-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-pink-500 hover:text-pink-500'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
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

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">需要個人化諮詢？</h2>
        <p className="text-gray-600 mb-6">
          我們的專業團隊隨時為您提供量身訂做的服務建議
        </p>
        <button className="btn-primary px-6 py-3 rounded-full font-medium">
          聯絡我們
        </button>
      </div>
    </div>
  );
};

export default ServicesPage;
