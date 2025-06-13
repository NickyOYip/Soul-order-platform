import { useState } from 'react';
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product, service, onAddToCart, onClick, cardType = 'planetary' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Support both product and service props for backwards compatibility
  const item = product || service;
  if (!item) return null;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddOnChange = (addOn, isChecked) => {
    if (isChecked) {
      setSelectedAddOns([...selectedAddOns, addOn]);
    } else {
      setSelectedAddOns(selectedAddOns.filter(addon => addon.name !== addOn.name));
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const getTotalPrice = () => {
    let basePrice = 0;
    
    // Handle different product/service structures
    if (cardType === 'custom' && selectedSize) {
      basePrice = selectedSize.price;
    } else if (cardType === 'service' && item.hasOptions && item.options) {
      basePrice = item.options[selectedOption]?.price || item.basePrice || item.price || 0;
    } else {
      basePrice = item.price || item.basePrice || 0;
    }
    
    const addOnTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return basePrice + addOnTotal;
  };  const handleAddToCart = () => {
    if (onAddToCart) {
      setIsAdding(true);
      
      let cartItem;
      
      if (cardType === 'custom') {
        // Handle custom candles with size selection
        cartItem = {
          ...item,
          selectedSize: selectedSize,
          selectedAddOns: selectedAddOns,
          totalPrice: getTotalPrice()
        };
      } else if (cardType === 'service') {
        // Handle service cards with options
        if (item.hasOptions && item.options) {
          const option = item.options[selectedOption];
          cartItem = {
            ...item,
            selectedOption: option,
            price: option.price,
            name: `${item.name} - ${option.name}`,
            selectedAddOns: selectedAddOns,
            totalPrice: getTotalPrice()
          };
        } else {
          cartItem = {
            ...item,
            price: item.basePrice || item.price || 0,
            selectedAddOns: selectedAddOns,
            totalPrice: getTotalPrice()
          };
        }
      } else {
        // Handle product cards (planetary, lovers)
        cartItem = {
          ...item,
          selectedAddOns: selectedAddOns,
          totalPrice: getTotalPrice()
        };
      }
      
      onAddToCart(cartItem);
      
      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsAdding(false);
      }, 2000);
    }
  };

  // Get styling based on card type
  const getCardStyling = () => {
    switch (cardType) {
      case 'lovers':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200',
          image: 'bg-gradient-to-br from-pink-200 to-rose-200',
          icon: 'bg-gradient-to-r from-pink-400 to-rose-400',
          iconText: '💕',
          price: 'text-rose-600',
          button: 'border-rose-300 text-rose-600 hover:bg-rose-50',
          bullet: 'bg-pink-400'
        };
      case 'custom':
        return {
          container: 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200',
          image: 'bg-gradient-to-br from-purple-200 to-indigo-200',
          icon: 'bg-gradient-to-r from-purple-400 to-indigo-400',
          iconText: '🕯️',
          price: 'text-purple-600',
          button: 'border-purple-300 text-purple-600 hover:bg-purple-50',
          bullet: 'bg-purple-400'
        };
      case 'service':
        return {
          container: 'bg-white border-gray-200',
          image: 'bg-pink-200',
          icon: 'bg-gradient-to-r from-pink-400 to-pink-600',
          iconText: getServiceIcon(),
          price: 'text-pink-600',
          button: 'border-pink-300 text-pink-600 hover:bg-pink-50',
          bullet: 'bg-pink-400'
        };
      case 'planetary':
      default:
        return {
          container: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200',
          image: 'bg-gradient-to-br from-yellow-200 to-orange-200',
          icon: 'bg-gradient-to-r from-yellow-400 to-orange-400',
          iconText: item.planet || '⭐',
          price: 'text-orange-600',
          button: 'border-orange-300 text-orange-600 hover:bg-orange-50',
          bullet: 'bg-yellow-400'
        };
    }
  };

  // Get service icon for service cards
  const getServiceIcon = () => {
    if (cardType !== 'service') return '🔮';
    
    switch (item.category) {
      case 'candles': return '🕯️';
      case 'frequency': return '🔮';
      case 'tarot': return '🃏';
      case 'astrology': return '⭐';
      case 'love': return '💕';
      case 'psychic': return '🧠';
      default: return '✨';
    }
  };
  const styling = getCardStyling();
  
  return (
    <div className={`${styling.container} rounded-lg p-6 border hover:shadow-lg transition-shadow relative`}>
      {/* Success Notification */}
      {showSuccess && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10 animate-pulse">
          已加入購物車！
        </div>
      )}
      
      {/* Product/Service Image Placeholder */}
      <div className={`w-full h-48 ${styling.image} rounded-lg mb-4 flex items-center justify-center`}>
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center ${styling.icon} text-white font-bold shadow-lg`}>
            <span className="text-sm">{styling.iconText}</span>
          </div>
          <span className="text-xs text-gray-600">產品圖片即將上線</span>
        </div>
      </div>      {/* Basic Info */}
      <div className="text-center mb-4">
        <h3 className="font-bold text-gray-800 mb-2 text-lg">{item.name}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500">
            {item.day || item.color || item.category}
            {item.color && item.day && ` | ${item.color}`}
          </span>
          <span className={`text-2xl font-bold ${styling.price}`}>
            ${cardType === 'custom' && selectedSize ? selectedSize.price : getTotalPrice()}
          </span>
        </div>
      </div>      {/* Service Options (for service cards and lovers cards with options) */}
      {(cardType === 'service' || cardType === 'lovers') && item.hasOptions && item.options && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">選擇方案</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          >
            {item.options.map((option, index) => (
              <option key={index} value={index}>
                {option.name} - ${option.price}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Size Selection (for custom candles) */}
      {cardType === 'custom' && item.sizeOptions && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">選擇尺寸:</h4>
          <div className="grid grid-cols-3 gap-2">
            {item.sizeOptions.map((size, index) => (
              <button
                key={index}
                onClick={() => handleSizeChange(size)}
                className={`p-2 border rounded-lg text-center transition-colors ${
                  selectedSize?.size === size.size
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                <div className="font-medium text-sm">{size.size}</div>
                <div className="text-xs text-gray-600">${size.price}</div>
              </button>
            ))}
          </div>
          {selectedSize && (
            <p className="text-xs text-gray-600 mt-1 text-center">
              燃燒時間: {selectedSize.burnTime}
            </p>
          )}
        </div>
      )}

      {/* Add-ons Selection */}
      {item.addOns && item.addOns.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">可選加購項目:</h4>
          {item.addOns.map((addOn, index) => (
            <label key={index} className="flex items-center justify-between text-sm mb-1 cursor-pointer">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-pink-500 focus:ring-pink-500"
                  onChange={(e) => handleAddOnChange(addOn, e.target.checked)}
                />
                <span>{addOn.name}</span>
              </div>
              <span className={`${styling.price} font-medium`}>+${addOn.price}</span>
            </label>
          ))}
        </div>
      )}      {/* Expandable Details */}
      {isExpanded && (
        <div className="border-t pt-4 mb-4 space-y-3">
          {/* Description */}
          {item.description && (
            <div className="mb-3">
              <span className="font-medium text-gray-700">詳細說明:</span>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
          )}
          
          {/* Selected Option Details for services */}
          {((cardType === 'service' || cardType === 'lovers') && item.hasOptions && item.options && selectedOption !== null) && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">當前選擇方案:</span>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">方案:</span>
                  <span className="font-medium">{item.options[selectedOption].name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">價格:</span>
                  <span className={`font-medium ${styling.price}`}>${item.options[selectedOption].price}</span>
                </div>
                {item.options[selectedOption].duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">時長:</span>
                    <span>{item.options[selectedOption].duration}</span>
                  </div>
                )}
                {item.options[selectedOption].questionCount && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">提問數量:</span>
                    <span>{item.options[selectedOption].questionCount}</span>
                  </div>
                )}
                {item.options[selectedOption].description && (
                  <div className="mt-2">
                    <span className="text-gray-600">說明:</span>
                    <p className="text-gray-600 mt-1">{item.options[selectedOption].description}</p>
                  </div>
                )}
                {item.options[selectedOption].includes && (
                  <div className="mt-2">
                    <span className="text-gray-600">包含服務:</span>
                    <ul className="mt-1 space-y-1">
                      {item.options[selectedOption].includes.map((include, index) => (
                        <li key={index} className="flex items-center text-xs text-gray-600">
                          <div className={`w-2 h-2 ${styling.bullet} rounded-full mr-2`}></div>
                          {include}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-2 text-sm">
            {item.magicalOil && (
              <div>
                <span className="font-medium text-gray-700">魔法油:</span> {item.magicalOil}
              </div>
            )}
            {item.herbs && (
              <div>
                <span className="font-medium text-gray-700">神聖草藥:</span> {item.herbs}
              </div>
            )}
            {item.purpose && (
              <div>
                <span className="font-medium text-gray-700">功效:</span> {item.purpose}
              </div>
            )}
            {item.burnTime && (
              <div>
                <span className="font-medium text-gray-700">
                  {cardType === 'lovers' ? '儀式時間' : '燃燒時間'}:
                </span> {item.burnTime}
              </div>
            )}
            {item.element && (
              <div>
                <span className="font-medium text-gray-700">對應元素:</span> {item.element}
              </div>
            )}
          </div>

          {item.features && (
            <div className="border-t pt-3">
              <p className="text-xs text-gray-600 mb-2 font-medium">包含服務:</p>
              <ul className="space-y-1">
                {item.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-xs text-gray-600">
                    <div className={`w-2 h-2 ${styling.bullet} rounded-full mr-2`}></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleToggleExpand}
          className={`w-full py-2 px-4 border ${styling.button} rounded-lg text-sm transition-colors flex items-center justify-center gap-2`}
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
        </button>        <button 
          onClick={handleAddToCart}
          disabled={isAdding || showSuccess || (cardType === 'custom' && !selectedSize)}
          className={`btn-primary py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 w-full ${
            isAdding || showSuccess || (cardType === 'custom' && !selectedSize)
              ? 'opacity-75 cursor-not-allowed' 
              : 'hover:bg-pink-600'
          }`}
        >
          {showSuccess ? (
            '已加入購物車 ✓'
          ) : isAdding ? (
            '加入中...'
          ) : (
            <>
              <PlusIcon className="h-4 w-4" />
              <span>加入購物車</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
