import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import ProductOptions from './ProductOptions';

const ProductCard = ({ product, service, onClick, onNavigate }) => {
  const { addToCart } = useCart();
  const [selectedAddOns, setSelectedAddOns] = useState([]);const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedMultiple, setSelectedMultiple] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Support both product and service props for backwards compatibility
  const item = product || service;
  if (!item) return null;
  // Helper function to find first option where ALL details have additionalPrice > 0
  const findDefaultOption = () => {
    if (!item.hasOptions || !item.options) return null;
    
    for (const option of item.options) {
      const allPricesAboveZero = option.optionDetails.every(detail => detail.additionalPrice > 0);
      if (allPricesAboveZero) {
        const firstDetail = option.optionDetails[0]; // First choice in this option
        return {
          optionNo: option.optionNo,
          optionType: option.optionType,
          defaultDetail: firstDetail
        };
      }
    }
    return null;
  };

  // Calculate effective base price
  const getEffectiveBasePrice = () => {
    if (item.basePrice > 0) return item.basePrice;
    
    // If basePrice is 0, use the first detail's additionalPrice from the qualifying option
    const defaultOption = findDefaultOption();
    if (defaultOption) {
      return defaultOption.defaultDetail.additionalPrice;
    }
    return 0;
  };

  // Initialize default selections for basePrice: 0 products
  useEffect(() => {
    if (item.basePrice === 0) {
      const defaultOption = findDefaultOption();
      if (defaultOption) {
        if (defaultOption.optionType === 'dropdown' || defaultOption.optionType === 'detail card' || defaultOption.optionType === 'horizontal detail card') {
          setSelectedOptions(prev => ({
            ...prev,
            [defaultOption.optionNo]: defaultOption.defaultDetail.name
          }));
        }
        // Note: multiple selection doesn't need default selection
      }
    }  }, [item]);

  const handleAddOnChange = (addOn, isChecked) => {
    if (isChecked) {
      setSelectedAddOns([...selectedAddOns, addOn]);
    } else {
      setSelectedAddOns(selectedAddOns.filter(addon => addon.name !== addOn.name));
    }
  };
  const handleOptionChange = (optionNo, selectedValue) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionNo]: selectedValue
    }));
  };

  const handleMultipleSelectionChange = (optionNo, optionName, isChecked) => {
    setSelectedMultiple(prev => {
      const currentOptions = prev[optionNo] || [];
      if (isChecked) {
        return {
          ...prev,
          [optionNo]: [...currentOptions, optionName]
        };
      } else {
        return {
          ...prev,
          [optionNo]: currentOptions.filter(item => item !== optionName)
        };
      }
    });
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }  };  const getTotalPrice = () => {
    let basePrice = item.basePrice || 0;
    let optionTotal = 0;
    
    // Special handling for basePrice: 0
    if (item.basePrice === 0) {
      const defaultOption = findDefaultOption();
      if (defaultOption) {
        // Use the selected option's price as base, or default option's first choice price
        const selectedValue = selectedOptions[defaultOption.optionNo];
        if (selectedValue) {
          // Find the selected detail's price in the default option
          const option = item.options.find(opt => opt.optionNo === defaultOption.optionNo);
          const selectedDetail = option?.optionDetails.find(detail => detail.name === selectedValue);
          if (selectedDetail) {
            basePrice = selectedDetail.additionalPrice;
          }
        } else {
          // No selection yet, use default option's first choice
          basePrice = defaultOption.defaultDetail.additionalPrice;
        }
      }
    }
    
    // Calculate additional option prices (excluding the base option for basePrice: 0 products)
    if (item.hasOptions && item.options) {
      const defaultOption = item.basePrice === 0 ? findDefaultOption() : null;
      
      item.options.forEach(option => {
        // Skip the default option for basePrice: 0 products (already counted in basePrice)
        if (defaultOption && option.optionNo === defaultOption.optionNo) {
          return;
        }
        
        if (option.optionType === 'dropdown' && selectedOptions[option.optionNo]) {
          const selectedDetail = option.optionDetails.find(
            detail => detail.name === selectedOptions[option.optionNo]
          );
          if (selectedDetail) {
            optionTotal += selectedDetail.additionalPrice || 0;
          }
        } else if ((option.optionType === 'detail card' || option.optionType === 'horizontal detail card') && selectedOptions[option.optionNo]) {
          const selectedDetail = option.optionDetails.find(
            detail => detail.name === selectedOptions[option.optionNo]
          );
          if (selectedDetail) {
            optionTotal += selectedDetail.additionalPrice || 0;
          }
        } else if (option.optionType === 'multiple selection' && selectedMultiple[option.optionNo]) {
          selectedMultiple[option.optionNo].forEach(selectedName => {
            const selectedDetail = option.optionDetails.find(
              detail => detail.name === selectedName
            );
            if (selectedDetail) {
              optionTotal += selectedDetail.additionalPrice || 0;
            }
          });
        }
      });
    }
    
    const totalPrice = (basePrice + optionTotal) * quantity;
    
    // Debug logging for price calculation
    console.log('Price Debug:', {
      itemName: item.name,
      basePrice: basePrice,
      optionTotal: optionTotal,
      selectedOptions: selectedOptions,
      selectedMultiple: selectedMultiple,
      quantity: quantity,
      totalPrice: totalPrice
    });
    
    // Simple display price - actual cart calculations handled elsewhere
    return totalPrice;
  };

  // Check if all required options are selected
  const areAllRequiredOptionsSelected = () => {
    if (!item.hasOptions || !item.options) return true;
    
    for (const option of item.options) {      // Multiple selection is optional, dropdown and detail card are required
      if (option.optionType === 'dropdown' || option.optionType === 'detail card' || option.optionType === 'horizontal detail card') {
        if (!selectedOptions[option.optionNo]) {
          return false;
        }
      }
    }
    return true;
  };

  // Get missing required options for validation message
  const getMissingRequiredOptions = () => {
    if (!item.hasOptions || !item.options) return [];
    
    const missing = [];
    for (const option of item.options) {
      if (option.optionType === 'dropdown' || option.optionType === 'detail card' || option.optionType === 'horizontal detail card') {
        if (!selectedOptions[option.optionNo]) {
          missing.push(option.optionTitle);
        }
      }
    }
    return missing;
  };

const handleAddToCart = () => {    // Check if all required options are selected
    if (!areAllRequiredOptionsSelected()) {
      const missingOptions = getMissingRequiredOptions();
      alert(`⚠️ 請先選擇以下必填選項，然後再加入購物車:\n\n• ${missingOptions.join('\n• ')}`);
      return;
    }
    
    setIsAdding(true);
    
    const cartItem = {
      ...item,
      selectedAddOns: selectedAddOns,
      selectedOptions: selectedOptions,
      selectedMultiple: selectedMultiple,
      quantity: quantity
      // totalPrice removed - cart will calculate this
    };
    
    // Debug logging
    console.log('=== ProductCard Debug ===');
    console.log('Original item:', item);
    console.log('Selected add-ons:', selectedAddOns);
    console.log('Selected options:', selectedOptions);
    console.log('Selected multiple:', selectedMultiple);
    console.log('Quantity:', quantity);
    console.log('Cart item being added:', cartItem);
    console.log('Item basePrice:', item.basePrice);
    console.log('Item hasOptions:', item.hasOptions);
    console.log('========================');
      
    addToCart(cartItem);
    
    // Show success feedback
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsAdding(false);
      
      // Redirect to cart page after showing success message
      if (onNavigate) {
        onNavigate('cart');
      }
    }, 2000);
  };
  // Get styling for the card
  const getCardStyling = () => {
    return {
      container: 'bg-white border-gray-200',
      image: 'bg-pink-200',
      icon: 'bg-gradient-to-r from-pink-400 to-pink-600',
      iconText: '✨',
      price: 'text-pink-600',
      button: 'border-pink-300 text-pink-600 hover:bg-pink-50',
      bullet: 'bg-pink-400'
    };
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
      
      {/* 1. Product/Service Image Placeholder */}
      <div className={`w-full h-48 ${styling.image} rounded-lg mb-4 flex items-center justify-center`}>
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center ${styling.icon} text-white font-bold shadow-lg`}>
            <span className="text-sm">{styling.iconText}</span>
          </div>
          <span className="text-xs text-gray-600">產品圖片即將上線</span>
        </div>
      </div>

      {/* 2. Product Name */}
      <div className="text-center mb-3">
        <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
      </div>

      {/* 3. Tag */}
      <div className="text-center mb-3">
        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {item.tag}
        </span>
      </div>

      {/* 4. Price */}
      <div className="text-center mb-4">
        {quantity > 1 && (
          <div className="text-xs text-gray-500 mb-1">
            ${Math.round((getTotalPrice() / quantity) * 100) / 100} × {quantity}
          </div>
        )}
        <span className={`text-2xl font-bold ${styling.price}`}>
          ${getTotalPrice()}
        </span>
      </div>      {/* 5. Details Information */}
      {/* Description */}
      {item.description && (
        <div className="mb-4">
          <span className="font-medium text-gray-700">詳細說明:</span>
          <div className="text-sm text-gray-600 mt-1">
            {item.description.split('\n').map((line, i) => (
              <div key={i}>{line.trim()}</div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Information */}
      {item.detail && (
        <div className="mb-4">
          <div className="text-sm text-gray-600 leading-relaxed">
            {item.detail.split('\n').map((line, i) => (
              <div key={i}>{line.trim()}</div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Options - Always visible */}
      <ProductOptions
        item={item}
        selectedOptions={selectedOptions}
        selectedMultiple={selectedMultiple}
        onOptionChange={handleOptionChange}
        onMultipleSelectionChange={handleMultipleSelectionChange}
        baseOptionNo={item.basePrice === 0 ? findDefaultOption()?.optionNo : null}      />

      {/* 7. Quantity Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">數量</label>
        <div className="flex items-center justify-center border rounded-lg p-2 bg-gray-50">
          <button
            onClick={decrementQuantity}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            disabled={quantity <= 1}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="mx-3 w-16 text-center text-lg font-medium bg-transparent border-none outline-none"
          />
          <button
            onClick={incrementQuantity}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            disabled={quantity >= 99}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>      {/* 8. Add to Cart Button */}
      <div className="space-y-2">        {/* Validation Message */}
        {!areAllRequiredOptionsSelected() && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-600 text-center">
            <span className="font-medium">⚠️ 請選擇必填選項:</span> {getMissingRequiredOptions().join(', ')}
          </div>
        )}
        
        <button 
          onClick={handleAddToCart}
          disabled={isAdding || showSuccess || !areAllRequiredOptionsSelected()}
          className={`btn-primary py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 w-full ${
            isAdding || showSuccess || !areAllRequiredOptionsSelected()
              ? 'opacity-75 cursor-not-allowed' 
              : 'hover:bg-pink-600'
          }`}
        >
          {showSuccess ? (
            '已加入購物車 ✓'
          ) : isAdding ? (
            '加入中...'
          ) : !areAllRequiredOptionsSelected() ? (
            <>
              <span>請先選擇選項</span>
            </>
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
