import { homePageServiceCategories } from '../services/api';

const HomePage = ({ onNavigate }) => {
  const serviceCategories = homePageServiceCategories;
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-xl p-8 mb-10 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          歡迎來到你之解憂雜貨店
        </h1>
        <p className="text-xl mb-6 leading-relaxed">
          「宇宙裡一定充滿著我們相遇的機率」💫<br />
          這裡提供各種心靈療癒服務，幫助你解決心中煩憂
        </p>
        <button
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300 font-medium"
          onClick={() => onNavigate('services')}
        >
          立即探索
        </button>
      </div>

      {/* Service Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          服務項目
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {serviceCategories.map((category) => (
            <div 
              key={category.id}
              className={`bg-gradient-to-br ${category.color} text-white rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              onClick={() => onNavigate(category.page)}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4">
                  <div className="inline-flex items-center text-sm font-medium">
                    立即體驗 
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            className="btn-secondary px-8 py-3 rounded-full font-medium"
            onClick={() => onNavigate('services')}
          >
            查看所有服務
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          為什麼選擇我們？
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">專業可靠</h3>
            <p className="text-gray-600">經驗豐富的專業團隊，提供準確可靠的服務</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">隱私保護</h3>
            <p className="text-gray-600">嚴格保護客戶隱私，讓您安心諮詢</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">用心服務</h3>
            <p className="text-gray-600">用愛心與專業，為每位客戶提供貼心服務</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
