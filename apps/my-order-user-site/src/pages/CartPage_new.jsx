import { useState } from 'react';
import { ShoppingCartIcon, TrashIcon, ArrowLeftIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { membershipDiscounts, getMembershipName, api, paymentMethods } from '../services/api';
import Toast from '../components/Toast';
import PhoneInput from '../components/PhoneInput';

const CartPage = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  const [checkoutData, setCheckoutData] = useState({
    phone: user?.phone || '',
    instagram: user?.instagram || '',
    paymentMethod: '',
    paymentProof: null
  });
  
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const subtotal = getCartTotal();
  const discount = user?.membership ? subtotal * membershipDiscounts[user.membership] : 0;
  const total = subtotal - discount;

  const steps = [
    { id: 1, name: '購物車', description: '確認商品' },
    { id: 2, name: '確認訂單', description: '填寫資料並付款' },
    { id: 3, name: '完成', description: '訂單成功' }
  ];

  const handleInputChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setCheckoutData({
      ...checkoutData,
      paymentProof: e.target.files[0]
    });
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      setToast({ show: true, message: '購物車是空的', type: 'error' });
      return;
    }
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkoutData.phone || !checkoutData.instagram || !checkoutData.paymentMethod || !checkoutData.paymentProof) {
      setToast({ show: true, message: '請填寫所有必填欄位並上傳付款證明', type: 'error' });
      return;
    }

    setLoading(true);
    
    try {
      const orderData = {
        items: cart,
        subtotal,
        discount,
        total,
        customerInfo: {
          phone: checkoutData.phone,
          instagram: checkoutData.instagram,
          userId: user?.id
        },
        paymentMethod: checkoutData.paymentMethod,
        paymentProof: checkoutData.paymentProof.name
      };

      const order = await api.createOrder(orderData);
      setOrderDetails(order);
      setCurrentStep(3);
      clearCart();
      
      setToast({ show: true, message: '訂單提交成功！', type: 'success' });
      
    } catch (error) {
      console.error('Order failed:', error);
      setToast({ show: true, message: '訂單提交失敗，請重試', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // Empty cart check only for step 1
  if (cart.length === 0 && currentStep === 1) {
    return (
      <div className="text-center py-12">
        <ShoppingCartIcon className="h-24 w-24 mx-auto text-pink-300 mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">您的購物車是空的</h2>
        <p className="text-gray-600 mb-6">還沒有選擇任何服務，去看看我們的精彩服務吧！</p>
        <button
          className="btn-primary px-6 py-3 rounded-lg font-medium"
          onClick={() => onNavigate('services')}
        >
          繼續購物
        </button>
      </div>
    );
  }

  const calculateItemPrice = (item) => {
    let itemPrice = item.basePrice || item.price || 0;
    
    if (item.selectedOptions && item.hasOptions && item.options) {
      item.options.forEach(option => {
        if (item.selectedOptions[option.optionNo]) {
          const selectedDetail = option.optionDetails.find(detail => 
            detail.name === item.selectedOptions[option.optionNo]
          );
          if (selectedDetail) {
            itemPrice += selectedDetail.additionalPrice || 0;
          }
        }
      });
    }
    
    return itemPrice;
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header with Back Button and Title */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => currentStep === 1 ? onNavigate('home') : prevStep()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            {currentStep === 1 ? '返回首頁' : '上一步'}
          </button>
          <h1 className="text-2xl font-bold text-gray-800">購物車結帳</h1>
          <div></div>
        </div>

        {/* Step Indicator */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <nav aria-label="結帳步驟">
            <ol className="flex items-center justify-between">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step.id
                          ? 'bg-pink-500 border-pink-500 text-white'
                          : 'border-gray-300 text-gray-500'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <div className="ml-4 min-w-0">
                      <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-pink-600' : 'text-gray-500'}`}>
                        {step.name}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-6">
                      <div className={`h-0.5 ${currentStep > step.id ? 'bg-pink-500' : 'bg-gray-300'}`}></div>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Step 1: Cart Items */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">購物清單</h2>
              
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const itemPrice = calculateItemPrice(item);
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.category} - {item.subCategory}</p>
                          
                          {/* Selected Options */}
                          {item.selectedOptions && item.hasOptions && (
                            <div className="mt-2 space-y-1">
                              {Object.entries(item.selectedOptions).map(([optionNo, value]) => {
                                const option = item.options?.find(opt => opt.optionNo === optionNo);
                                return (
                                  <p key={optionNo} className="text-xs text-gray-500">
                                    {option?.optionName}: {value}
                                  </p>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-semibold text-gray-800">NT$ {itemPrice * item.quantity}</p>
                            <p className="text-xs text-gray-500">單價: NT$ {itemPrice}</p>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">訂單摘要</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>小計</span>
                  <span>NT$ {subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>會員折扣 ({getMembershipName(user?.membership)})</span>
                    <span>-NT$ {discount}</span>
                  </div>
                )}
                
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>總計</span>
                    <span>NT$ {total}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={proceedToCheckout}
                className="w-full mt-6 btn-primary py-3 rounded-lg font-medium"
              >
                前往結帳
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Checkout Form */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">訂單確認</h3>
              
              <div className="space-y-3 mb-6">
                {cart.map((item, index) => {
                  const itemPrice = calculateItemPrice(item);
                  return (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-medium">NT$ {itemPrice * item.quantity}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>小計</span>
                  <span>NT$ {subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>會員折扣</span>
                    <span>-NT$ {discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>總計</span>
                  <span>NT$ {total}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">填寫資料</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <PhoneInput
                  value={checkoutData.phone}
                  onChange={handleInputChange}
                  name="phone"
                  id="phone"
                  required
                  label="電話號碼"
                />

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="instagram">
                    Instagram 用戶名 *
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={checkoutData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="paymentMethod">
                    付款方式 *
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={checkoutData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="">請選擇付款方式</option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.name}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Payment Proof Upload */}
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="paymentProof">
                    付款證明 *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                    <input
                      type="file"
                      id="paymentProof"
                      name="paymentProof"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      required
                    />
                    <label htmlFor="paymentProof" className="cursor-pointer">
                      <CloudArrowUpIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">點擊上傳付款證明</p>
                      <p className="text-sm text-gray-500">支援 JPG, PNG 格式</p>
                      {checkoutData.paymentProof && (
                        <p className="text-sm text-green-600 mt-2">
                          已選擇: {checkoutData.paymentProof.name}
                        </p>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '處理中...' : '確認訂單'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 3: Order Complete */}
        {currentStep === 3 && orderDetails && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">訂單提交成功！</h2>
              <p className="text-gray-600 mb-6">感謝您的訂購，我們會盡快處理您的訂單</p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-gray-800 mb-4">訂單詳情</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">訂單編號:</span>
                    <span className="font-mono font-medium">{orderDetails.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">訂單日期:</span>
                    <span>{new Date(orderDetails.createdAt).toLocaleDateString('zh-TW')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">付款方式:</span>
                    <span>{checkoutData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">聯絡電話:</span>
                    <span>{checkoutData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Instagram:</span>
                    <span>@{checkoutData.instagram}</span>
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>訂單總額:</span>
                      <span>NT$ {total}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => onNavigate('services')}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  繼續購物
                </button>
                <button
                  onClick={() => onNavigate('home')}
                  className="flex-1 btn-primary py-3 rounded-lg font-medium"
                >
                  返回首頁
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type}
        onClose={hideToast}
      />
    </>
  );
};

export default CartPage;
