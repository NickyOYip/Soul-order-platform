import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

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

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-content">
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
