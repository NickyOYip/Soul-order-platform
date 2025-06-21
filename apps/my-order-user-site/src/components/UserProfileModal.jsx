import { useState } from 'react';
import { XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import PhoneInput from './PhoneInput';

const UserProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();  const [formData, setFormData] = useState({
    phone: user?.phone || '',
    igName: user?.igName || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Update user data
      updateUser(formData);
      setSuccess(true);
      
      // Auto close success message after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message || '更新失敗，請重試');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {    setFormData({
      phone: user?.phone || '',
      igName: user?.igName || ''
    });
    setError('');
    setSuccess(false);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 slide-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <UserCircleIcon className="h-6 w-6" />
            個人資料
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            個人資料更新成功！
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
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
              placeholder="Instagram 用戶名"
              required
            />
          </div>

          <PhoneInput
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            id="phone"
            required
            label="電話號碼"
          />

          {user.membership && (
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4">
              <label className="block text-gray-700 mb-2">會員等級</label>
              <div className="text-lg font-semibold text-pink-600">
                {user.membership}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '更新中...' : '更新資料'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileModal;
