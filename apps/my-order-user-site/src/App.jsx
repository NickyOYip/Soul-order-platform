import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CandlesPage from './pages/CandlesPage';
import FrequencyPage from './pages/FrequencyPage';
import TarotPage from './pages/TarotPage';
import AstrologyPage from './pages/AstrologyPage';
import LovePage from './pages/LovePage';
import PsychicPage from './pages/PsychicPage';
import MembershipPage from './pages/MembershipPage';
import CartPage from './pages/CartPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});

  const navigateToPage = (pageId, params = {}) => {
    setCurrentPage(pageId);
    setPageParams(params);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateToPage} />;
      case 'candles':
        return <CandlesPage onNavigate={navigateToPage} />;
      case 'frequency':
        return <FrequencyPage onNavigate={navigateToPage} />;
      case 'tarot':
        return <TarotPage onNavigate={navigateToPage} />;
      case 'astrology':
        return <AstrologyPage onNavigate={navigateToPage} />;
      case 'love':
        return <LovePage onNavigate={navigateToPage} />;
      case 'psychic':
        return <PsychicPage onNavigate={navigateToPage} />;
      case 'membership':
        return <MembershipPage onNavigate={navigateToPage} />;
      case 'cart':
        return <CartPage onNavigate={navigateToPage} />;
      default:
        return <HomePage onNavigate={navigateToPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen" style={{backgroundColor: '#ffeef3'}}>
          <Navigation 
            currentPage={currentPage} 
            onNavigate={navigateToPage} 
          />
          
          <main className="container mx-auto px-4 py-8">
            {renderCurrentPage()}
          </main>
          
          <footer className="bg-black text-white py-8 mt-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-pink-400 mb-4">你之解憂雜貨店</h3>
                  <p className="text-gray-300">
                    「宇宙裡一定充滿著我們相遇的機率」💫<br />
                    為您提供心靈療癒與指引的溫暖空間
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">服務項目</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>塔羅占卜</li>
                    <li>魔法蠟燭</li>
                    <li>月老紅線</li>
                    <li>八字 & 紫微斗數</li>
                    <li>靈擺調頻</li>
                    <li>潛意識讀心</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">聯絡我們</h4>
                  <div className="space-y-2 text-gray-300">
                    <p>Email:soulcwu.hk@gmail.com</p>
                    <p>Instagram: @soul_cwu.hk</p>
                    <p>Whatsapp:90350140</p>
                    <p>門市地址:觀塘中美中心A座9樓19室（門市行預約制）</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 你之解憂雜貨店. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
