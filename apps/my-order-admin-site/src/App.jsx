import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductsPage />;
      case 'users':
        return <UsersPage />;
      case 'orders':
        return <OrdersPage />;
      default:
        return <Dashboard />;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="admin-layout">
      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={handlePageChange}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <button 
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
            >
              ☰
            </button>
            <h1 className="header-title">解憂雜貨店 - 管理後台</h1>
          </div>
        </header>
        
        <main className="main-section">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
