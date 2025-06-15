import { useState } from 'react';
import { ShoppingCartIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { membershipDiscounts, getMembershipName, api, paymentMethods } from '../services/api';
import OrderSuccessModal from '../components/OrderSuccessModal';
import Toast from '../components/Toast';

const CartPage = ({ onNavigate }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  
  // Debug logging for cart page
  console.log('=== CartPage Debug ===');
  console.log('Current cart:', cart);
  console.log('Cart count:', cart.length);
  console.log('User:', user);
  console.log('===================');
  
  const [checkoutData, setCheckoutData] = useState({
    phone: user?.phone || '',
    instagram: user?.instagram || '',
    paymentMethod: '',
    paymentProof: null
  });
    const [loading, setLoading] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const subtotal = getCartTotal();
  const discount = user?.membership ? subtotal * membershipDiscounts[user.membership] : 0;
  const total = subtotal - discount;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkoutData.phone || !checkoutData.instagram || !checkoutData.paymentMethod || !checkoutData.paymentProof) {
      alert('請填寫所有必填欄位並上傳付款證明');
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
      setShowOrderSuccess(true);
      clearCart();
      
      // Reset form
      setCheckoutData({
        phone: user?.phone || '',
        instagram: user?.instagram || '',
        paymentMethod: '',
        paymentProof: null
      });
      
    } catch (error) {
      console.error('Order failed:', error);
      alert('訂單提交失敗，請重試');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
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
  return (
    <>
      <div className="space-y-8">        {/* Header with Back Button and Title */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>返回首頁</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 flex-1 text-center">購物車</h1>
          
          {/* Spacer for centering */}
          <div className="w-16"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">購物清單</h2>
              
              <div className="space-y-4">                {cart.map((item, index) => {                  // Calculate item price including options
                  let itemPrice = item.basePrice || item.price || 0;
                  if (item.selectedOptions && item.hasOptions && item.options) {
                    item.options.forEach(option => {
                      if ((option.optionType === 'dropdown' || option.optionType === 'detail card') && item.selectedOptions[option.optionNo]) {
                        const selectedDetail = option.optionDetails.find(
                          detail => detail.name === item.selectedOptions[option.optionNo]
                        );
                        if (selectedDetail) {
                          itemPrice += selectedDetail.additionalPrice || 0;
                        }
                      }
                    });
                  }
                  
                  // Add multiple selection option prices
                  if (item.selectedMultiple && item.hasOptions && item.options) {
                    item.options.forEach(option => {
                      if (option.optionType === 'multiple selection' && item.selectedMultiple[option.optionNo]) {
                        item.selectedMultiple[option.optionNo].forEach(selectedName => {
                          const selectedDetail = option.optionDetails.find(
                            detail => detail.name === selectedName
                          );
                          if (selectedDetail) {
                            itemPrice += selectedDetail.additionalPrice || 0;
                          }
                        });
                      }
                    });
                  }
                    return (                  <div key={`${item.id}-${index}`} className="border-b border-gray-200 pb-4">
                    {/* Product Info Section */}
                    <div className="mb-3">
                      {/* Product Name */}
                      <h3 className="font-medium text-gray-800 mb-2">{item.name}</h3>
                      
                      {/* Base Price */}
                      <div className="text-sm text-gray-600 mb-2">
                        基本價格: ${item.basePrice || item.price || 0}
                      </div>
                      
                      {/* Selected Options */}
                      {((item.selectedOptions && Object.keys(item.selectedOptions).length > 0) || 
                        (item.selectedMultiple && Object.keys(item.selectedMultiple).length > 0)) && (
                        <div className="text-sm mb-3 bg-gray-50 p-2 rounded">
                          <div className="font-medium text-gray-700 mb-1">已選擇的選項:</div>
                          
                          {/* Dropdown and Detail Card Options */}
                          {item.selectedOptions && item.options?.map(option => {
                            const selectedValue = item.selectedOptions[option.optionNo];
                            if (selectedValue && (option.optionType === 'dropdown' || option.optionType === 'detail card')) {
                              const selectedDetail = option.optionDetails.find(
                                detail => detail.name === selectedValue
                              );
                              return (
                                <div key={option.optionNo} className="mb-1">
                                  <div className="text-gray-600">
                                    {option.optionTitle}: {selectedValue}
                                  </div>
                                  {selectedDetail?.additionalPrice > 0 && (
                                    <div className="text-pink-600 text-sm">
                                      +${selectedDetail.additionalPrice}
                                    </div>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          })}
                          
                          {/* Multiple Selection Options */}
                          {item.selectedMultiple && item.options?.map(option => {
                            const selectedValues = item.selectedMultiple[option.optionNo];
                            if (selectedValues && selectedValues.length > 0 && option.optionType === 'multiple selection') {
                              return (
                                <div key={option.optionNo} className="mb-1">
                                  {selectedValues.map(value => {
                                    const selectedDetail = option.optionDetails.find(
                                      detail => detail.name === value
                                    );
                                    return (
                                      <div key={value}>
                                        <div className="text-gray-600">
                                          {option.optionTitle}: {value}
                                        </div>
                                        {selectedDetail?.additionalPrice > 0 && (
                                          <div className="text-pink-600 text-sm">
                                            +${selectedDetail.additionalPrice}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}
                    </div>
                    
                    {/* Bottom Section - Total Price, Quantity Controls and Delete Button - Same Level */}
                    <div className="flex items-center justify-between">
                      {/* Total Price */}
                      <div className="font-medium text-gray-800 text-base">
                        總計: ${itemPrice} x {item.quantity}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
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
                        
                        {/* Total Amount */}
                        <span className="font-medium text-gray-800 w-20 text-right">
                          ${itemPrice * item.quantity}
                        </span>
                          {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>                  </div>
                  );
                })}
              </div>
              
              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>小計:</span>
                    <span>${subtotal}</span>
                  </div>
                  
                  {user?.membership && (
                    <div className="flex justify-between text-pink-600">
                      <span>{getMembershipName(user.membership)}折扣:</span>
                      <span>-${discount.toFixed(0)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>總計:</span>
                    <span>${total.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">結帳資訊</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    電話號碼 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={checkoutData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                </div>

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
                  <label className="block text-gray-700 mb-2">付款方式 *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          checkoutData.paymentMethod === method.id
                            ? 'border-pink-500 bg-pink-50'
                            : 'border-gray-300 hover:border-pink-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={checkoutData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{method.icon}</span>
                          <span className="font-medium">{method.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {checkoutData.paymentMethod && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">付款資訊</h4>
                    <p className="text-sm text-gray-600">
                      {checkoutData.paymentMethod === 'FPS' && 'FPS ID: 1234567890'}
                      {checkoutData.paymentMethod === 'PayMe' && '掃描 PayMe QR 碼或搜尋: yourzahuodian'}
                      {checkoutData.paymentMethod === 'Alipay' && '掃描支付寶 QR 碼或轉賬至: alipay@example.com'}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="paymentProof">
                    上傳付款證明 *
                  </label>
                  <input
                    type="file"
                    id="paymentProof"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    請上傳付款截圖或收據
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '提交中...' : `確認訂單 ($${total.toFixed(0)})`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={showOrderSuccess}
        orderDetails={orderDetails}
        onClose={() => {
          setShowOrderSuccess(false);
          onNavigate('home');
        }}
      />
    </>
  );
};

export default CartPage;
