import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const OrderSuccessModal = ({ isOpen, orderDetails, onClose }) => {
  if (!isOpen || !orderDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 slide-in">
        <div className="text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800">訂單提交成功！</h2>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-2">訂單編號</div>
            <div className="text-xl font-bold text-pink-600">#{orderDetails.id}</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-2">訂單金額</div>
            <div className="text-2xl font-bold text-gray-800">${orderDetails.total}</div>
          </div>
          
          <p className="text-gray-600 mb-6">
            感謝您的購買！我們會盡快處理您的訂單並與您聯繫。
          </p>
          
          <p className="text-sm text-gray-500 mb-6">
            請保存訂單編號以便查詢訂單狀態
          </p>
          
          <button
            onClick={onClose}
            className="w-full btn-primary py-3 rounded-lg font-medium"
          >
            返回首頁
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
