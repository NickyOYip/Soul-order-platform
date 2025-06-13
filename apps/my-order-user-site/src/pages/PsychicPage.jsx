import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

const PsychicPage = ({ onNavigate }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await api.getServicesByCategory('psychic');
        setServices(data);
      } catch (error) {
        console.error('Failed to load psychic services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

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
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">潛意識讀心</h1>
        <p className="text-xl mb-6">
          深入探索你的潛意識世界，發掘內心深處的秘密與智慧 🧠✨
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>自由提問</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>深度療癒</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>內在成長</span>
          </div>
        </div>
      </div>


      {/* Services Grid */}
      {services.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">選擇您的提問方案</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">            {services.map((service) => (
              <ProductCard 
                key={service.id} 
                service={service} 
                onClick={handleServiceClick}
                cardType="service"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暫無可用的提問方案</p>
        </div>
      )}

      {/* Process Section */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">心靈探索流程</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">初步連結</h3>
            <p className="text-gray-600 text-sm">建立心靈能量連結</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">深度掃描</h3>
            <p className="text-gray-600 text-sm">探索潛意識深層訊息</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">訊息解讀</h3>
            <p className="text-gray-600 text-sm">解析並整理獲得的訊息</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">療癒指導</h3>
            <p className="text-gray-600 text-sm">提供具體的療癒建議</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">服務效益</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">釋放內在阻礙</h3>
            <p className="text-gray-600 text-sm">清除限制性信念與情緒創傷</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">發掘內在潛能</h3>
            <p className="text-gray-600 text-sm">發現隱藏的才能與天賦</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2">提升自我認識</h3>
            <p className="text-gray-600 text-sm">更深層地了解自己的內在世界</p>
          </div>
        </div>
      </div>

      {/* Privacy Section */}
      <div className="bg-gradient-to-r from-gray-100 to-blue-100 rounded-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">隱私保護承諾</h3>
          <p className="text-gray-600">
            我們嚴格保護您的隱私，所有心靈探索內容絕對保密，<br />
            讓您能夠安心地進行深度的內在探索。
          </p>
        </div>
      </div>      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-200 to-indigo-200 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">準備好探索您的內在世界了嗎？</h2>
        <p className="text-gray-600 mb-4">
          開放式問題讓你自由探索內心世界，發掘真正的自己 🌟
        </p>
        <div className="bg-white/50 rounded-lg p-4 mb-6">
          <p className="text-gray-700 font-medium">
            💭 想問什麼就問什麼 • 沒有限制的自由探索
          </p>
        </div>
        <button className="btn-primary px-6 py-3 rounded-full font-medium">
          開始提問探索
        </button>
      </div>
    </div>
  );
};

export default PsychicPage;
