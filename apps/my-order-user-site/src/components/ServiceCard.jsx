import { PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

const ServiceCard = ({ service, onClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(service);
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg fade-in z-50';
    toast.textContent = `${service.name} 已加入購物車`;
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

  const getServiceIcon = (category) => {
    switch (category) {
      case 'divination':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        );
      case 'products':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        );
      case 'psychic':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
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
    <div
      className="card bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
      onClick={() => onClick && onClick(service)}
    >
      <div className="h-48 bg-pink-200 flex items-center justify-center">
        {getServiceIcon(service.category)}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{service.name}</h3>
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{service.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-600">${service.price}</span>
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
  );
};

export default ServiceCard;
