import { useState, useEffect } from 'react';

const ProductModal = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'candles',
    subCategory: '',
    basePrice: 0,
    detail: '',
    image: '',
    hasOptions: false,
    soldOut: false
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const categories = [
    { value: 'candles', label: '蠟燭' },
    { value: 'tarot', label: '塔羅' },
    { value: 'frequency', label: '調頻' },
    { value: 'psychic', label: '通靈' },
    { value: 'love', label: '月老紅線' },
    { value: 'astrology', label: '八字紫微' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {product ? '編輯產品' : '新增產品'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              產品名稱 *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="輸入產品名稱"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              主類別 *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              子類別 *
            </label>
            <input
              type="text"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="輸入子類別"
            />
          </div>

          {/* Base Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              基礎價格 *
            </label>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          {/* Product Detail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              產品詳情
            </label>
            <textarea
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="輸入產品詳細描述"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              圖片網址
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="hasOptions"
                checked={formData.hasOptions}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                有選項配置
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="soldOut"
                checked={formData.soldOut}
                onChange={handleChange}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                目前缺貨
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              {product ? '更新' : '新增'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
