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
      const existingItem = prevCart.find(item => item.id === service.id);
      
      let newCart;
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + service.quantity }
            : item
        );
        console.log('Updated existing item quantity');
      } else {
        newCart = [...prevCart, { ...service, quantity: service.quantity }];
        console.log('Added new item to cart');
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

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
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
