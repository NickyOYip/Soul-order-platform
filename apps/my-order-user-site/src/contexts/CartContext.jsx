import { useState, createContext, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);  const addToCart = (service) => {
    console.log('=== Cart Context Debug ===');
    console.log('Received service:', service);
    
    setCart(prevCart => {
      // Create a more comprehensive comparison function that includes options
      const isSameCartItem = (cartItem, newItem) => {
        // First check if it's the same product
        if (cartItem.id !== newItem.id) {
          return false;
        }
        
        // Compare selectedOptions
        const cartOptions = cartItem.selectedOptions || {};
        const newOptions = newItem.selectedOptions || {};
        const cartOptionsKeys = Object.keys(cartOptions);
        const newOptionsKeys = Object.keys(newOptions);
        
        if (cartOptionsKeys.length !== newOptionsKeys.length) {
          return false;
        }
        
        for (const key of cartOptionsKeys) {
          if (cartOptions[key] !== newOptions[key]) {
            return false;
          }
        }
        
        // Compare selectedMultiple
        const cartMultiple = cartItem.selectedMultiple || {};
        const newMultiple = newItem.selectedMultiple || {};
        const cartMultipleKeys = Object.keys(cartMultiple);
        const newMultipleKeys = Object.keys(newMultiple);
        
        if (cartMultipleKeys.length !== newMultipleKeys.length) {
          return false;
        }
        
        for (const key of cartMultipleKeys) {
          const cartArray = cartMultiple[key] || [];
          const newArray = newMultiple[key] || [];
          
          if (cartArray.length !== newArray.length) {
            return false;
          }
          
          // Sort arrays for comparison
          const sortedCartArray = [...cartArray].sort();
          const sortedNewArray = [...newArray].sort();
          
          for (let i = 0; i < sortedCartArray.length; i++) {
            if (sortedCartArray[i] !== sortedNewArray[i]) {
              return false;
            }
          }
        }
        
        return true;
      };
      
      const existingItemIndex = prevCart.findIndex(item => isSameCartItem(item, service));
      
      let newCart;
      if (existingItemIndex !== -1) {
        // Same item with same options - update quantity
        newCart = prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + service.quantity }
            : item
        );
        console.log('Updated existing item quantity (same product + same options)');
      } else {
        // Different item or same item with different options - add as new item
        newCart = [...prevCart, { ...service, quantity: service.quantity }];
        console.log('Added new item to cart (different product or different options)');
      }
      
      console.log('Previous cart:', prevCart);
      console.log('New cart:', newCart);
      console.log('========================');
      
      return newCart;
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
  };
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter((_, i) => i !== index));
    } else {
      setCart(prevCart =>
        prevCart.map((item, i) =>
          i === index ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      let itemPrice = item.basePrice || item.price || 0;
      
      // Add option prices for dropdown and detail card types
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
      
      // Add prices for multiple selection options
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
      
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
