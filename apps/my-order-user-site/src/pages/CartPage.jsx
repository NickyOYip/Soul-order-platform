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
  
  // Order limits configuration
  const ORDER_LIMITS = {
    maxItems: 10,        // Maximum number of different items
    maxQuantity: 20,     // Maximum total quantity
    maxValue: 5000       // Maximum order value in HK$
  };
  
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

  // Calculate item price function (moved up to avoid hoisting issues)
  const calculateItemPrice = (item) => {
    let itemPrice = item.basePrice || item.price || 0;
    
    console.log('Calculate Item Price Debug:', {
      itemName: item.name,
      basePrice: item.basePrice,
      price: item.price,
      initialPrice: itemPrice,
      hasOptions: item.hasOptions,
      selectedOptions: item.selectedOptions,
      selectedAddOns: item.selectedAddOns,
      selectedMultiple: item.selectedMultiple
    });
    
    if (item.selectedOptions && item.hasOptions && item.options) {
      item.options.forEach(option => {
        if (item.selectedOptions[option.optionNo]) {
          const selectedDetail = option.optionDetails?.find(detail => 
            detail.name === item.selectedOptions[option.optionNo]
          );
          if (selectedDetail) {
            itemPrice += selectedDetail.additionalPrice || 0;
          }
        }
      });
    }
    
    // Add prices from selectedAddOns
    if (item.selectedAddOns && item.selectedAddOns.length > 0) {
      item.selectedAddOns.forEach(addOn => {
        itemPrice += addOn.price || 0;
      });
    }
    
    // Add prices from selectedMultiple
    if (item.selectedMultiple && item.options) {
      Object.entries(item.selectedMultiple).forEach(([optionNo, selectedItems]) => {
        const option = item.options.find(opt => opt.optionNo.toString() === optionNo.toString());
        if (option && selectedItems) {
          selectedItems.forEach(itemName => {
            const selectedDetail = option.optionDetails?.find(detail => detail.name === itemName);
            if (selectedDetail) {
              itemPrice += selectedDetail.additionalPrice || 0;
            }
          });
        }
      });
    }
    
    console.log('Final calculated price:', itemPrice);
    return itemPrice;
  };  const subtotal = getCartTotal();
  
  // Calculate local cart total as backup
  const localCartTotal = cart.reduce((total, item) => {
    const itemPrice = calculateItemPrice(item);
    return total + (itemPrice * item.quantity);
  }, 0);
  
  // Use local calculation if getCartTotal returns 0 but we have items
  const actualSubtotal = (subtotal === 0 && cart.length > 0) ? localCartTotal : subtotal;
  
  const discount = user?.membership ? actualSubtotal * membershipDiscounts[user.membership] : 0;
  const total = actualSubtotal - discount;

  // Debug logging
  console.log('Cart Total Debug:', {
    cart: cart,
    getCartTotalResult: subtotal,
    localCartTotal: localCartTotal,
    actualSubtotal: actualSubtotal,
    discount: discount,
    total: total,
    user: user,
    membership: user?.membership
  });

  // Calculate order statistics
  const totalItems = cart.length;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Check order limits
  const orderLimitChecks = {
    itemsExceeded: totalItems > ORDER_LIMITS.maxItems,
    quantityExceeded: totalQuantity > ORDER_LIMITS.maxQuantity,
    valueExceeded: total > ORDER_LIMITS.maxValue,
    hasExceeded: function() {
      return this.itemsExceeded || this.quantityExceeded || this.valueExceeded;
    }
  };

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
    
    // Check order limits before proceeding
    if (orderLimitChecks.hasExceeded()) {
      let limitMessage = '訂單超出限制：';
      if (orderLimitChecks.itemsExceeded) limitMessage += ` 商品種類不能超過${ORDER_LIMITS.maxItems}種`;
      if (orderLimitChecks.quantityExceeded) limitMessage += ` 總數量不能超過${ORDER_LIMITS.maxQuantity}件`;
      if (orderLimitChecks.valueExceeded) limitMessage += ` 總金額不能超過HK$${ORDER_LIMITS.maxValue}`;
      
      setToast({ show: true, message: limitMessage, type: 'error' });
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
    
    try {      const orderData = {
        items: cart,
        subtotal: actualSubtotal,
        discount,
        total,
        customerInfo: {
          phone: checkoutData.phone,
          instagram: checkoutData.instagram,
          userId: user?.id
        },
        paymentMethod: checkoutData.paymentMethod,
        paymentProof: checkoutData.paymentProof.name
      };      const order = await api.createOrder(orderData);
      
      // Store order with pricing details
      const orderWithPricing = {
        ...order,
        orderSubtotal: actualSubtotal,
        orderDiscount: discount,
        orderTotal: total,
        orderItems: cart
      };
      
      setOrderDetails(orderWithPricing);
      setCurrentStep(3);
      
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
      </div>    );
  }

  // Function to get Chinese category name
  const getCategoryDisplayName = (categoryId) => {
    const categoryMap = {
      'candles': '魔法蠟燭',
      'tarot': '塔羅占卜',
      'love': '月老紅線',
      'astrology': '八字 & 紫微斗數',
      'frequency': '靈擺調頻',
      'psychic': '潛意識讀心'
    };
    return categoryMap[categoryId] || categoryId;
  };

  return (
    <>
      <div className="space-y-8">        {/* Header with Title */}
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">購物車</h1>
        </div>{/* Step Indicator - Full Width Mobile Responsive */}
        <div className="px-2 py-6 sm:px-6 sm:py-8">
          <nav aria-label="結帳步驟" className="w-full">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-2xl mx-auto">
              {/* Background connecting line */}
              <div className="absolute top-4 sm:top-5 md:top-6 left-0 right-0 h-0.5 bg-gray-300 z-0"></div>
              
              {/* Progress line */}
              <div 
                className="absolute top-4 sm:top-5 md:top-6 left-0 h-0.5 bg-pink-500 transition-all duration-500 z-10"
                style={{ 
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
                }}
              ></div>
              
              {/* Steps */}
              <div className="relative flex justify-between items-start z-20">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center z-30" style={{ width: '33.333%' }}>                    {/* Step Circle */}
                    <div
                      className={`relative z-40 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-200 shadow-sm ${
                        currentStep > step.id
                          ? 'bg-white border-pink-500 text-pink-500'
                          : currentStep === step.id
                          ? 'bg-pink-500 border-pink-500 text-white shadow-md'
                          : 'bg-white border-gray-300 text-gray-500'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm sm:text-base md:text-lg font-bold relative z-50">{step.id}</span>
                      )}
                    </div>
                    
                    {/* Step Label */}
                    <span className={`mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm font-medium text-center leading-tight relative z-30 ${
                      currentStep >= step.id ? 'text-pink-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                    
                    {/* Step Description - Hidden on very small screens */}
                    <span className={`hidden sm:block mt-1 text-xs text-center leading-tight relative z-30 ${
                      currentStep >= step.id ? 'text-pink-500' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>{/* Step 1: Cart Items */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">購物清單</h2>
              </div>
                <div className="divide-y divide-gray-100">
                {cart.map((item, index) => {
                  const itemPrice = calculateItemPrice(item);
                  
                  // Debug logging for each cart item
                  console.log(`Cart Item ${index}:`, {
                    name: item.name,
                    hasOptions: item.hasOptions,
                    options: item.options,
                    selectedOptions: item.selectedOptions,
                    selectedAddOns: item.selectedAddOns,
                    selectedMultiple: item.selectedMultiple
                  });
                  
                  return (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                              <p className="text-sm text-gray-500">{getCategoryDisplayName(item.category)}</p>                              {/* Selected Options */}
                              {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                <div className="mt-1 space-y-0.5">
                                  {Object.entries(item.selectedOptions).map(([optionNo, value]) => {
                                    const option = item.options?.find(opt => opt.optionNo.toString() === optionNo.toString());
                                    const selectedDetail = option?.optionDetails?.find(detail => detail.name === value);
                                    if (!value) return null;
                                    
                                    return (
                                      <div key={optionNo} className="text-xs">
                                        <span className="text-gray-600">{option?.optionTitle || option?.optionName}:</span>                                        <span className="ml-1 text-gray-800 font-medium">{value}</span>
                                        {selectedDetail?.additionalPrice > 0 && (
                                          <span className="ml-1 text-green-600 font-medium">+HK$ {selectedDetail.additionalPrice}</span>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                              
                              {/* Selected Add-ons */}
                              {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                                <div className="mt-1 space-y-0.5">
                                  {item.selectedAddOns.map((addOn, idx) => (
                                    <div key={idx} className="text-xs">
                                      <span className="text-gray-600">加購:</span>                                      <span className="ml-1 text-gray-800 font-medium">{addOn.name}</span>
                                      {addOn.price > 0 && (
                                        <span className="ml-1 text-green-600 font-medium">+HK$ {addOn.price}</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Selected Multiple */}
                              {item.selectedMultiple && Object.keys(item.selectedMultiple).length > 0 && (
                                <div className="mt-1 space-y-0.5">
                                  {Object.entries(item.selectedMultiple).map(([optionNo, selectedItems]) => {
                                    const option = item.options?.find(opt => opt.optionNo.toString() === optionNo.toString());
                                    if (!selectedItems || selectedItems.length === 0) return null;
                                    
                                    return (
                                      <div key={optionNo} className="text-xs">
                                        <span className="text-gray-600">{option?.optionTitle || option?.optionName}:</span>
                                        <div className="ml-1 flex flex-wrap gap-1 mt-1">
                                          {selectedItems.map((itemName, idx) => {
                                            const selectedDetail = option?.optionDetails?.find(detail => detail.name === itemName);
                                            return (
                                              <span key={idx} className="inline-flex items-center">                                                <span className="text-gray-800 font-medium">{itemName}</span>
                                                {selectedDetail?.additionalPrice > 0 && (
                                                  <span className="ml-1 text-green-600 font-medium">+HK$ {selectedDetail.additionalPrice}</span>
                                                )}
                                                {idx < selectedItems.length - 1 && <span className="text-gray-400 mx-1">•</span>}
                                              </span>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                            
                            {/* Delete Button */}
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-2"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                          
                          {/* Quantity and Price Row */}
                          <div className="flex items-center justify-between mt-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-100 rounded-lg">
                              <button
                                onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-l-lg transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 h-8 flex items-center justify-center text-sm font-medium bg-white border-x border-gray-200">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-r-lg transition-colors"
                              >
                                +
                              </button>
                            </div>
                              {/* Price */}
                            <div className="text-right">
                              <p className="font-semibold text-lg text-gray-900">HK$ {itemPrice * item.quantity}</p>
                              <p className="text-xs text-gray-500">單價: HK$ {itemPrice}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>            {/* Cart Summary */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">訂單摘要</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">                  <div className="flex justify-between text-gray-600">
                    <span>小計</span>
                    <span className="font-medium">HK$ {subtotal}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>會員折扣 ({getMembershipName(user?.membership)})</span>
                      <span className="font-medium">-HK$ {discount}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>總計</span>
                      <span>HK$ {total}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={proceedToCheckout}
                  className="w-full mt-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                >
                  前往結帳
                </button>
              </div>
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
                  return (                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-medium">HK$ {itemPrice * item.quantity}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>小計</span>
                  <span>HK$ {subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>會員折扣</span>
                    <span>-HK$ {discount}</span>
                  </div>                )}                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>總計</span>
                  <span>HK$ {total}</span>
                </div>
              </div>
              
              {/* Back Button */}
              <div className="mt-6 pt-4 border-t">
                <button
                  onClick={() => prevStep()}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100 w-full justify-center"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span className="text-sm">返回購物車</span>
                </button>
              </div>
            </div>{/* Checkout Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">填寫資料</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">                {/* Enhanced Phone Input Section */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">聯絡電話</span>
                    {user && (
                      <span className="ml-auto text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">已登入用戶</span>
                    )}
                  </div>                  {user ? (
                    <div className="relative">
                      <input
                        type="text"
                        value={checkoutData.phone ? checkoutData.phone.replace(/^(\+\d{1,3})(\d)/, '$1 $2') : ''}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                        readOnly
                        disabled
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <PhoneInput
                      value={checkoutData.phone}
                      onChange={handleInputChange}
                      name="phone"
                      id="phone"
                      required
                      label="電話號碼"
                      showLabel={false}
                      className="mt-0"
                    />
                  )}
                </div>

                {/* Enhanced Instagram Input Section */}
                <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Instagram 帳號</span>
                    {user && (
                      <span className="ml-auto text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">已登入用戶</span>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">@</span>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={checkoutData.instagram}
                      onChange={handleInputChange}
                      placeholder={user ? "" : "請輸入您的 Instagram 用戶名"}
                      className={`w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200 ${
                        user 
                          ? 'bg-gray-100 text-gray-600 cursor-not-allowed' 
                          : 'bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500'
                      }`}
                      readOnly={user}
                      disabled={user}
                      required
                    />
                    {user && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>                {/* Enhanced Payment Method Section */}
                <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-4 border border-gray-200 relative">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">付款方式</span>
                  </div>                  <div className="relative overflow-visible">
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={checkoutData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white transition-all duration-200 appearance-none relative z-50"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1rem 1rem'
                      }}
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
                </div>

                {/* Enhanced Payment Proof Upload Section */}
                <div className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">付款證明</span>
                  </div>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                    checkoutData.paymentProof 
                      ? 'border-green-400 bg-green-50' 
                      : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                  }`}>
                    <input
                      type="file"
                      id="paymentProof"
                      name="paymentProof"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      required
                    />
                    <label htmlFor="paymentProof" className="cursor-pointer block">
                      {checkoutData.paymentProof ? (
                        <div className="text-green-600">
                          <svg className="h-12 w-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-green-700 font-medium mb-2">檔案上傳成功！</p>
                          <p className="text-sm text-green-600">
                            已選擇: {checkoutData.paymentProof.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">點擊可重新選擇檔案</p>
                        </div>
                      ) : (
                        <div className="text-gray-600">
                          <CloudArrowUpIcon className="h-12 w-12 mx-auto text-orange-400 mb-4" />
                          <p className="text-gray-700 font-medium mb-2">點擊上傳付款證明</p>
                          <p className="text-sm text-gray-500 mb-1">支援 JPG, PNG 格式</p>
                          <p className="text-xs text-gray-400">檔案大小請勿超過 10MB</p>
                        </div>
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
        )}        {/* Step 3: Order Complete */}
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
                <h3 className="font-semibold text-gray-800 mb-4">訂單詳情</h3>                {/* Ordered Items */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">訂購項目</h4>
                  <div className="space-y-4">
                    {(orderDetails.orderItems || cart).map((item, index) => {
                      const itemPrice = calculateItemPrice(item);
                      return (
                        <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between gap-4">
                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-800">{item.name}</h5>
                                  <p className="text-sm text-gray-600">{getCategoryDisplayName(item.category)}</p>
                                  
                                  {/* Selected Options */}
                                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                    <div className="mt-1 space-y-0.5">
                                      {Object.entries(item.selectedOptions).map(([optionNo, value]) => {
                                        const option = item.options?.find(opt => opt.optionNo.toString() === optionNo.toString());
                                        const selectedDetail = option?.optionDetails?.find(detail => detail.name === value);
                                        if (!value) return null;
                                        
                                        return (
                                          <div key={optionNo} className="text-xs">
                                            <span className="text-gray-600">{option?.optionTitle || option?.optionName}:</span>
                                            <span className="ml-1 text-gray-800 font-medium">{value}</span>
                                            {selectedDetail?.additionalPrice > 0 && (
                                              <span className="ml-1 text-green-600 font-medium">+HK$ {selectedDetail.additionalPrice}</span>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                  
                                  {/* Selected Add-ons */}
                                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                                    <div className="mt-1 space-y-0.5">
                                      {item.selectedAddOns.map((addOn, idx) => (
                                        <div key={idx} className="text-xs">
                                          <span className="text-gray-600">加購:</span>
                                          <span className="ml-1 text-gray-800 font-medium">{addOn.name}</span>
                                          {addOn.price > 0 && (
                                            <span className="ml-1 text-green-600 font-medium">+HK$ {addOn.price}</span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Selected Multiple */}
                                  {item.selectedMultiple && Object.keys(item.selectedMultiple).length > 0 && (
                                    <div className="mt-1 space-y-0.5">
                                      {Object.entries(item.selectedMultiple).map(([optionNo, selectedItems]) => {
                                        const option = item.options?.find(opt => opt.optionNo.toString() === optionNo.toString());
                                        if (!selectedItems || selectedItems.length === 0) return null;
                                        
                                        return (
                                          <div key={optionNo} className="text-xs">
                                            <span className="text-gray-600">{option?.optionTitle || option?.optionName}:</span>
                                            <div className="ml-1 flex flex-wrap gap-1 mt-1">
                                              {selectedItems.map((itemName, idx) => {
                                                const selectedDetail = option?.optionDetails?.find(detail => detail.name === itemName);
                                                return (
                                                  <span key={idx} className="inline-flex items-center">
                                                    <span className="text-gray-800 font-medium">{itemName}</span>
                                                    {selectedDetail?.additionalPrice > 0 && (
                                                      <span className="ml-1 text-green-600 font-medium">+HK$ {selectedDetail.additionalPrice}</span>
                                                    )}
                                                    {idx < selectedItems.length - 1 && <span className="text-gray-400 mx-1">•</span>}
                                                  </span>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Quantity and Price Row */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="text-sm text-gray-600">
                                  數量: {item.quantity}
                                </div>
                                <div className="text-right">
                                  <div className="font-semibold text-gray-900">HK$ {itemPrice * item.quantity}</div>
                                  {item.quantity > 1 && (
                                    <div className="text-xs text-gray-500">單價: HK$ {itemPrice}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-3">訂單摘要</h4>
                </div>
                
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
                  </div>                  {/* Pricing breakdown */}
                  <div className="border-t pt-2 mt-4 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">小計:</span>
                      <span>HK$ {(orderDetails.orderSubtotal || actualSubtotal || 0).toFixed(2)}</span>
                    </div>
                    {(orderDetails.orderDiscount || discount) > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>會員折扣:</span>
                        <span>-HK$ {(orderDetails.orderDiscount || discount || 0).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>訂單總額:</span>
                      <span>HK$ {(orderDetails.orderTotal || total || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons with Screenshot Reminder */}
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-700 text-sm">
                    📱 記得截圖此頁面並發送給我們確認訂單！
                  </p>
                </div>
                  <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      clearCart();
                      onNavigate('services');
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    繼續購物
                  </button>
                  <button
                    onClick={() => {
                      clearCart();
                      onNavigate('home');
                    }}
                    className="flex-1 btn-primary py-3 rounded-lg font-medium"
                  >
                    返回首頁
                  </button>
                </div>
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
