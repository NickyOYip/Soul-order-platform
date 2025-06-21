import { homePageServiceCategories } from '../services/api';

const HomePage = ({ onNavigate }) => {
  const serviceCategories = homePageServiceCategories;
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white rounded-xl p-8 mb-10 shadow-lg">
        <h3 className="text-3xl text-center md:text-4xl font-bold mb-4">
          歡迎光臨<br />你の解憂雜貨店
        </h3>
        <h3 className="text-1xl text-center md:text-2xl font-bold mb-4">
          這裡提供各種心靈療癒服務<br />幫助你解決心中煩憂
        </h3>
      </div>

      {/* Service Categories Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          產品與服務
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
        

      </section>

      {/* Features Section */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          為什麼選擇我們？
        </h2>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
  <div className="text-center">
    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v5h6v-5c0-1.657-1.343-3-3-3zM4 20h16a1 1 0 001-1v-1H3v1a1 1 0 001 1z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold mb-2">價格透明</h3>
    <p className="text-gray-600">價格公開透明，無隱藏費用</p>
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h10v2H4v-2z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold mb-2">客製化服務</h3>
    <p className="text-gray-600">根據你的需求量身打造專屬解決方案</p>
  </div>
  <div className="text-center">
    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l-6-5.5a4 4 0 115.656-5.656L12 10.172l.344-.328a4 4 0 115.656 5.656L12 20z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold mb-2">提供一對一指導支援</h3>
    <p className="text-gray-600">教你用什麼心態去面對問題</p>
    <p className="text-gray-600">幫你建立健康嘅溝通模式</p>
  </div>
</div>

      </section>
    </div>
  );
};

export default HomePage;
