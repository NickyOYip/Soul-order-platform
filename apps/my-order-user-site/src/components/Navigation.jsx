import { useState } from 'react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { getMembershipName, navigationItems, serviceNavigationCategories } from '../services/api';
import LoginModal from './LoginModal';

const Navigation = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();  const navItems = navigationItems;
  const serviceCategories = serviceNavigationCategories;

  const handleNavClick = (pageId) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  };

  const handleServiceClick = (page) => {
    // Navigate directly to the service page
    onNavigate(page);
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-2xl font-bold text-pink-400 hover:text-pink-300 transition-colors"
          >
            你之解憂雜貨店
          </button>          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link py-2 text-white hover:text-pink-300 transition-colors ${
                  currentPage === item.id ? 'active-nav' : ''
                }`}
              >
                {item.label}
                {item.id === 'cart' && (
                  <span className="bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs ml-2">
                    {getCartCount()}
                  </span>
                )}
              </button>
            ))}
            
            {/* Services Dropdown */}
            <div className="relative">              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                onMouseEnter={() => setIsServicesDropdownOpen(true)}                className={`nav-link py-2 text-white hover:text-pink-300 transition-colors flex items-center ${
                  ['candles', 'frequency', 'tarot', 'astrology', 'love', 'psychic'].includes(currentPage) ? 'active-nav' : ''
                }`}
              >
                服務與產品
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </button>
                {isServicesDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  {serviceCategories.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceClick(service.page)}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      {service.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User Status & Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-pink-300">
                    {user.name}
                    {user.membership && ` (${getMembershipName(user.membership)})`}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
                  >
                    登出
                  </button>
                </div>
              ) : (
                <span className="text-pink-300">訪客</span>
              )}
            </div>

            {!user && (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="btn-primary px-4 py-2 rounded-full text-sm"
              >
                登入/註冊
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 py-3 bg-black border-t border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left py-2 text-white hover:text-pink-300 transition-colors"
              >
                {item.label}
                {item.id === 'cart' && (
                  <span className="bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs ml-2">
                    {getCartCount()}
                  </span>
                )}
              </button>
            ))}
              {/* Mobile Services Menu */}
            <div className="border-t border-gray-700 pt-3 mt-3">
              <div className="space-y-1">
                {serviceCategories.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.page)}
                    className="block w-full text-left py-2 text-white hover:text-pink-300 transition-colors"
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            </div>
            
            {user && (
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="text-pink-300 py-2">
                  {user.name}
                  {user.membership && ` (${getMembershipName(user.membership)})`}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-white hover:text-pink-300 transition-colors"
                >
                  登出
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
