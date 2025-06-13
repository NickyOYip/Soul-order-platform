import { useState } from 'react';

const CustomCandleCard = ({ product, onAddToCart }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0]); // Default to first size
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSizeChange = (sizeOption) => {
    setSelectedSize(sizeOption);
  };

  const handleAddOnChange = (addOn, isChecked) => {
    if (isChecked) {
      setSelectedAddOns([...selectedAddOns, addOn]);
    } else {
      setSelectedAddOns(selectedAddOns.filter(item => item.name !== addOn.name));
    }
  };

  const getTotalPrice = () => {
    const sizePrice = selectedSize ? selectedSize.price : 0;
    const addOnTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return sizePrice + addOnTotal;
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      const cartItem = {
        ...product,
        selectedSize: selectedSize,
        selectedAddOns: selectedAddOns,
        totalPrice: getTotalPrice()
      };
      onAddToCart(cartItem);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200 hover:shadow-lg transition-shadow">
      {/* Product Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-lg mb-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-bold shadow-lg">
            <span className="text-sm">🕯️</span>
          </div>
          <span className="text-xs text-gray-600">產品圖片即將上線</span>
        </div>
      </div>

      {/* Basic Product Info */}
      <div className="text-center mb-4">
        <h3 className="font-bold text-gray-800 mb-2 text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="text-center mb-3">
          <span className="text-2xl font-bold text-indigo-600">${getTotalPrice()}</span>
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-4 p-3 bg-purple-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">選擇尺寸:</h4>
        <div className="grid grid-cols-3 gap-2">
          {product.sizeOptions.map((sizeOption, index) => (
            <label
              key={index}
              className={`border rounded-lg p-2 cursor-pointer transition-colors text-center ${
                selectedSize?.size === sizeOption.size
                  ? 'border-purple-500 bg-purple-100'
                  : 'border-gray-300 hover:border-purple-300'
              }`}
            >
              <input
                type="radio"
                name="size"
                value={sizeOption.size}
                checked={selectedSize?.size === sizeOption.size}
                onChange={() => handleSizeChange(sizeOption)}
                className="sr-only"
              />
              <div className="text-xs font-medium">{sizeOption.size}</div>
              <div className="text-xs text-purple-600">${sizeOption.price}</div>
              <div className="text-xs text-gray-500">{sizeOption.burnTime}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Add-ons Selection */}
      {product.addOns && product.addOns.length > 0 && (
        <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">可選加購項目:</h4>
          {product.addOns.map((addOn, index) => (
            <label key={index} className="flex items-center justify-between text-sm mb-1 cursor-pointer">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-purple-500 focus:ring-purple-500"
                  onChange={(e) => handleAddOnChange(addOn, e.target.checked)}
                />
                <span>{addOn.name}</span>
              </div>
              <span className="text-indigo-600 font-medium">+${addOn.price}</span>
            </label>
          ))}
        </div>
      )}

      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-t pt-4 mb-4 space-y-3">
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium text-gray-700">魔法油:</span> {product.magicalOil}
            </div>
            <div>
              <span className="font-medium text-gray-700">神聖草藥:</span> {product.herbs}
            </div>
            <div>
              <span className="font-medium text-gray-700">功效:</span> {product.purpose}
            </div>
            <div>
              <span className="font-medium text-gray-700">元素:</span> {product.element}
            </div>
          </div>

          {selectedSize && (
            <div className="border-t pt-3">
              <p className="text-xs text-gray-600 mb-2 font-medium">已選尺寸詳情:</p>
              <div className="text-xs text-gray-600">
                <div>尺寸: {selectedSize.size}</div>
                <div>價格: ${selectedSize.price}</div>
                <div>燃燒時間: {selectedSize.burnTime}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleToggleExpand}
          className="w-full py-2 px-4 border border-indigo-300 text-indigo-600 rounded-lg text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
        >
          <span>查看詳情</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button 
          onClick={handleAddToCart}
          className="btn-primary w-full py-2 px-4 rounded-lg text-sm hover:bg-pink-600 transition-colors"
        >
          加入購物車
        </button>
      </div>
    </div>
  );
};

export default CustomCandleCard;
