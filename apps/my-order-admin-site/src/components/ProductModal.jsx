import { useState, useEffect } from 'react';
import { PhotoIcon, XMarkIcon, ExclamationTriangleIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { serviceCategories } from '../services/mockApi';
import ProductOptionsEditor from './ProductOptionsEditor';

const ProductModal = ({ product, onSave, onClose, selectedCategory, selectedSubCategory }) => {  const [formData, setFormData] = useState({
    name: '',
    category: 'candles',
    subCategory: '',
    basePrice: 0,
    detail: '',
    image: '',
    hasOptions: false,
    soldOut: false,
    disabled: false,
    options: []
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      // For new products, use the selected category and subcategory
      setFormData(prev => ({
        ...prev,
        category: selectedCategory || 'candles',
        subCategory: selectedSubCategory || ''
      }));
    }
  }, [product, selectedCategory, selectedSubCategory]);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
  };

  return (    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            {product ? '編輯產品' : '新增產品'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-0">
          {/* 1. Photo Section - Like card image */}
          <div className="relative h-48 bg-gray-100">
            {formData.image ? (
              <img
                src={formData.image}
                alt="Product preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-500 text-sm">產品圖片</span>
                </div>
              </div>
            )}
            
            {/* Image Upload/Delete Controls */}
            <div className="absolute top-2 right-2 flex gap-2">
              <label className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                <PhotoIcon className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {formData.image && (
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Content like card content */}
          <div className="p-6 space-y-4">
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

            {/* 2. Status Section - Sold Out / Disable */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h4 className="text-sm font-medium text-gray-700">產品狀態</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="soldOut"
                    checked={formData.soldOut}
                    onChange={handleChange}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <ExclamationTriangleIcon className="w-4 h-4 text-red-500 ml-2" />
                  <label className="ml-2 text-sm text-gray-700">目前缺貨</label>
                </div>
                {formData.soldOut && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                    已售完
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="disabled"
                    checked={formData.disabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <EyeSlashIcon className="w-4 h-4 text-orange-500 ml-2" />
                  <label className="ml-2 text-sm text-gray-700">停用產品</label>
                </div>
                {formData.disabled && (
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                    已停用
                  </span>
                )}
              </div>
            </div>

            {/* Category Display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">產品分類</h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {serviceCategories.find(cat => cat.id === (selectedCategory || formData.category))?.name || selectedCategory || formData.category}
                </span>
                {(selectedSubCategory || formData.subCategory) && (
                  <span className="inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedSubCategory || formData.subCategory}
                  </span>
                )}
              </div>
            </div>

            {/* 3. Base Price - Like card price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                基礎價格 *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">HK$</span>
                <input
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1"
                  className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                  placeholder="0"
                />
              </div>
            </div>            {/* 4. Product Details - Like card detail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                產品詳情
              </label>
              <textarea
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="輸入產品詳細描述..."
              />            </div>

            {/* Options Configuration Toggle */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasOptions"
                    checked={formData.hasOptions}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700">
                    有選項配置
                  </label>
                </div>
                {formData.hasOptions && (
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs font-medium">
                    已啟用
                  </span>
                )}
              </div>
              
              {/* Options Editor */}
              {formData.hasOptions && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <ProductOptionsEditor
                    options={formData.options || []}
                    onOptionsChange={(options) => setFormData(prev => ({ ...prev, options }))}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 p-6 pt-4 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              {product ? '更新產品' : '新增產品'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
