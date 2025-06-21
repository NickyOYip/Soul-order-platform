import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { getMembershipName } from '../services/api';
import PhoneInput from './PhoneInput';

const LoginModal = ({ isOpen, onClose }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);  const [formData, setFormData] = useState({
    phone: '',
    igName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register, guestLogin } = useAuth();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let userData;
      // Try login first, if it fails, automatically register
      try {
        userData = await login(formData);
      } catch (loginError) {
        // If login fails, try to register instead
        userData = await register(formData);
      }
      
      // Show welcome message with user data
      setWelcomeUser(userData);
      setShowWelcome(true);
      
      // Auto close welcome after 3 seconds
      setTimeout(() => {
        setShowWelcome(false);
        onClose();
        setFormData({ phone: '', igName: '' });
      }, 3000);
    } catch (err) {
      setError(err.message || '操作失敗，請重試');
    } finally {
      setLoading(false);
    }
  };
  const handleGuestLogin = () => {
    guestLogin();
    onClose();
  };
  const handleCloseModal = () => {
    setShowWelcome(false);
    setFormData({ phone: '', igName: '' });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  // Welcome screen after successful login/register
  if (showWelcome && welcomeUser) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 slide-in text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✨</span>
            </div>            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {welcomeUser.isGuest ? '歡迎！' : '歡迎回來！'}
            </h2>            <p className="text-gray-600">
              {welcomeUser.isGuest ? '訪客模式' : `@${welcomeUser.igName}`}
            </p>
          </div>
          
          {welcomeUser.membership && (
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">您的會員等級</p>
              <p className="text-lg font-semibold text-pink-600">
                {getMembershipName(welcomeUser.membership) || welcomeUser.membership}
              </p>
            </div>
          )}
            <p className="text-gray-500 text-sm">
            {welcomeUser.isGuest 
              ? '正在為您準備訪客體驗...' 
              : welcomeUser.membership 
                ? '正在為您準備專屬的魔法服務...'
                : '感謝您的加入，正在為您準備魔法服務...'
            }
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 slide-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            登入 / 註冊
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-6 text-center">
          <p className="text-gray-600 text-sm">
            輸入您的電話號碼和 Instagram 用戶名即可自動登入或註冊
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <PhoneInput
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            id="phone"
            required
            label="電話號碼"
          />          <div>
            <label className="block text-gray-700 mb-2" htmlFor="igName">
              Instagram 用戶名
            </label>
            <input
              type="text"
              id="igName"
              name="igName"
              value={formData.igName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="請輸入您的 Instagram 用戶名"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '處理中...' : '開始使用'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleGuestLogin}
            className="w-full btn-secondary py-3 rounded-lg font-medium"
          >
            以訪客身份繼續
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
