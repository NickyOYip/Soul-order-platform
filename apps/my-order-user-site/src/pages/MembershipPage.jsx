import { CheckIcon } from '@heroicons/react/24/outline';
import { membershipTiers } from '../services/api';

const MembershipPage = () => {

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

      
    </div>
  );
};

export default MembershipPage;
