import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

const ServiceCard = ({ service, onClick }) => {
  const { addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState(0);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    let serviceToAdd;
    if (service.hasOptions && service.options) {
      // If service has options, add the selected option
      const option = service.options[selectedOption];
      serviceToAdd = {
        ...service,
        selectedOption: option,
        price: option.price,
        name: `${service.name} - ${option.name}`
      };
    } else {
      // Use basePrice or price for simple services
      serviceToAdd = {
        ...service,
        price: service.basePrice || service.price || 0
      };
    }
    
    addToCart(serviceToAdd);
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg fade-in z-50';
    toast.textContent = `${serviceToAdd.name} 已加入購物車`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 500);
    }, 2000);
  };

  const getCurrentPrice = () => {
    if (service.hasOptions && service.options) {
      return service.options[selectedOption]?.price || service.basePrice;
    }
    return service.basePrice || service.price || 0;
  };

  const getPriceRange = () => {
    if (service.hasOptions && service.options && service.options.length > 1) {
      const prices = service.options.map(option => option.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;
    }
    return `$${getCurrentPrice()}`;
  };

  const getServiceIcon = (category) => {
    switch (category) {
      case 'candles':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'frequency':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'tarot':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      case 'love':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'astrology':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case 'psychic':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'healing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'talisman':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'cleansing':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h2a2 2 0 012 2v1m-6 0h6m0 0v10a2 2 0 01-2 2H10a2 2 0 01-2-2V7m8 0V6a2 2 0 00-2-2H10a2 2 0 00-2 2v1" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        );
    }
  };

  return (
    <div className="card bg-white rounded-lg shadow-lg overflow-hidden group">
      <div className="h-48 bg-pink-200 flex items-center justify-center">
        {getServiceIcon(service.category)}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{service.name}</h3>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">{service.description}</p>
        
        {/* Service Options */}
        {service.hasOptions && service.options && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">選擇方案</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {service.options.map((option, index) => (
                <option key={index} value={index}>
                  {option.name} - ${option.price}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-pink-600">
              {service.hasOptions ? `$${getCurrentPrice()}` : getPriceRange()}
            </span>
            {service.hasOptions && service.options && service.options.length > 1 && (
              <div className="text-xs text-gray-500">
                價格範圍: {getPriceRange()}
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            {onClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClick(service);
                }}
                className="px-3 py-2 border border-pink-500 text-pink-500 rounded-lg flex items-center space-x-1 hover:bg-pink-50 transition-colors"
              >
                <EyeIcon className="h-4 w-4" />
                <span className="text-sm">詳情</span>
              </button>
            )}
            <button
              onClick={handleAddToCart}
              className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2 group-hover:scale-105 transition-transform"
            >
              <PlusIcon className="h-4 w-4" />
              <span>加入購物車</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
