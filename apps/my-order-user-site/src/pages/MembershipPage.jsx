import { CheckIcon } from '@heroicons/react/24/outline';

const MembershipPage = () => {
  const membershipTiers = [
    {
      id: 'gold',
      name: '金卡會員',
      requirement: '單次消費 $1,000 - $1,499',
      discount: '95折優惠',
      discountPercent: '5%',
      color: 'from-yellow-300 to-yellow-500',
      textColor: 'text-black',
      benefits: [
        '所有商品享有 95 折優惠',
        '生日月享額外優惠',
        '專屬會員活動'
      ]
    },
    {
      id: 'platinum',
      name: '白金會員',
      requirement: '單次消費 $1,500 - $1,999',
      discount: '9折優惠',
      discountPercent: '10%',
      color: 'from-gray-300 to-gray-500',
      textColor: 'text-black',
      benefits: [
        '所有商品享有 9 折優惠',
        '生日月享額外優惠',
        '專屬會員活動',
        '優先預約服務'
      ]
    },
    {
      id: 'diamond',
      name: '鑽石會員',
      requirement: '單次消費 $1,999 或以上',
      discount: '85折優惠',
      discountPercent: '15%',
      color: 'from-blue-300 to-purple-500',
      textColor: 'text-white',
      benefits: [
        '所有商品享有 85 折優惠',
        '生日月享額外優惠',
        '專屬會員活動',
        '優先預約服務',
        '專屬客服支援',
        '免費生日禮物'
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">會員制度</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          成為我們的會員，享受專屬優惠與貼心服務。會員等級根據您的消費金額自動升級，讓每一次的體驗都更加珍貴。
        </p>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          會員制度說明
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">完成購買</h3>
            <p className="text-gray-600">選擇心儀的服務，完成付款</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">自動升級</h3>
            <p className="text-gray-600">根據消費金額自動獲得會員等級</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">享受優惠</h3>
            <p className="text-gray-600">未來購買享受會員專屬折扣</p>
          </div>
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {membershipTiers.map((tier, index) => (
          <div
            key={tier.id}
            className={`membership-card bg-gradient-to-br ${tier.color} rounded-xl p-6 shadow-lg ${tier.textColor} relative overflow-hidden ${
              index === 1 ? 'md:scale-105 md:shadow-2xl' : ''
            }`}
          >
            <div className="relative z-10">
              {index === 1 && (
                <div className="absolute -top-3 -right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  推薦
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
              <p className="mb-4 opacity-90">{tier.requirement}</p>
              
              <div className="mb-6">
                <div className="text-3xl font-bold">{tier.discount}</div>
                <div className="text-sm opacity-75">節省 {tier.discountPercent} 費用</div>
              </div>
              
              <ul className="space-y-3">
                {tier.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start">
                    <CheckIcon className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Benefits */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          額外會員福利
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">優先預約</h3>
            <p className="text-gray-600 text-sm">會員享有服務優先預約權</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">專屬客服</h3>
            <p className="text-gray-600 text-sm">專業客服團隊貼心服務</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">會員活動</h3>
            <p className="text-gray-600 text-sm">定期舉辦專屬會員活動</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">生日優惠</h3>
            <p className="text-gray-600 text-sm">生日月享有特別折扣優惠</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
