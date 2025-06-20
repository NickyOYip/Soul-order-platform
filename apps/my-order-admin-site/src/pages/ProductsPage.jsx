import { useState, useEffect } from 'react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import ProductModal from '../components/ProductModal';
import apiService from '../services/apiService';
import { serviceCategories, getSubCategoriesByCategory } from '../services/mockApi';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);  const [selectedCategory, setSelectedCategory] = useState('candles'); // Start with candles like user site
  const [selectedSubCategory, setSelectedSubCategory] = useState('七日星體蠟燭'); // Start with first candle subcategory
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  // Load products from API service
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllProducts();
        
        // Deduplicate products by id to avoid React key conflicts
        const uniqueProducts = data.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id && p.category === product.category)
        );
        
        setProducts(uniqueProducts);
        setFilteredProducts(uniqueProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Get subcategories for selected category
  const availableSubCategories = getSubCategoriesByCategory(selectedCategory);  // Reset subcategory when category changes and set default
  useEffect(() => {
    if (availableSubCategories.length > 0) {
      const defaultSubCategory = availableSubCategories[0].id || availableSubCategories[0].key;
      setSelectedSubCategory(defaultSubCategory);
    } else {
      setSelectedSubCategory('');
    }
  }, [selectedCategory, availableSubCategories]);// Filter products
  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (selectedSubCategory) {
      filtered = filtered.filter(product => product.subCategory === selectedSubCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.detail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedSubCategory, searchTerm]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowModal(true);
  };  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };
  const handleToggleProductStatus = async (product) => {
    try {
      const newDisabledStatus = !product.disabled;
      await apiService.toggleProductStatus(product.id);
      
      // Update the product in the local state
      setProducts(products.map(p => 
        p.id === product.id 
          ? { ...p, disabled: newDisabledStatus }
          : p
      ));
      
      console.log(`Product ${product.name} ${newDisabledStatus ? 'disabled' : 'enabled'} successfully`);
    } catch (error) {
      console.error('Failed to toggle product status:', error);
    }
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        // Update existing product
        const updatedProduct = await apiService.updateProduct(editingProduct.id, productData);
        setProducts(products.map(p => 
          p.id === editingProduct.id ? updatedProduct : p
        ));
      } else {
        // Add new product
        const newProduct = await apiService.addProduct(productData);
        setProducts([...products, newProduct]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Failed to save product:', error);    }
  };

  // Get category info for display
  const getCategoryInfo = (categoryId) => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    return category || { name: '全部服務', description: '所有魔法與靈性服務' };
  };

  const currentCategoryInfo = getCategoryInfo(selectedCategory);

  return (
    <div className="space-y-8">
      {/* Hero Section - matching user site style */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">產品管理</h1>
        <p className="text-xl mb-6">
          {currentCategoryInfo.description} - 管理所有產品的新增、編輯和刪除
        </p>
        <div className="flex justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>即時編輯</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>分類管理</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-white rounded-full mr-2"></div>
            <span>庫存控制</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">服務分類</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 max-w-6xl mx-auto">
            {serviceCategories.filter(cat => cat.id !== 'all').map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 text-sm rounded-full font-medium transition-all text-center ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        {availableSubCategories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-center text-gray-700">
              {currentCategoryInfo.name} - 子分類
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 max-w-4xl mx-auto">
              {availableSubCategories.map((subCategory) => (
                <button
                  key={subCategory.id || subCategory.key}
                  onClick={() => setSelectedSubCategory(subCategory.id || subCategory.key)}
                  className={`px-3 py-2 text-sm rounded-full font-medium transition-all text-center ${
                    selectedSubCategory === (subCategory.id || subCategory.key)
                      ? 'bg-indigo-500 text-white shadow-lg'
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  {subCategory.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="搜尋產品名稱、標籤或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>          <button
            onClick={handleAddProduct}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            新增產品
          </button>
        </div>

        <h4 className="text-lg font-bold mb-6 text-center text-gray-600">
          {selectedSubCategory || currentCategoryInfo.name} ({filteredProducts.length} 個產品)
        </h4>

        {loading ? (
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (              <div key={`${product.category}-${product.subCategory}-${product.id}-${product.name}`} className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden ${product.disabled ? 'opacity-60 bg-gray-50' : ''}`}>                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover ${product.disabled ? 'grayscale' : ''}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-gray-500 ${product.image ? 'hidden' : ''}`}>
                    <span className="text-4xl">🔮</span>
                  </div>

                  {/* Disabled Overlay */}
                  {product.disabled && (
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                      <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                        已停用
                      </span>
                    </div>
                  )}

{/* Admin Action Buttons - Only Edit Button */}
                  <div className="absolute top-2 right-2">                    <button
                      onClick={() => handleEditProduct(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors"
                      title="編輯產品"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>                  {/* Sold Out Badge - Removed overlay to not block admin buttons */}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        {product.tag && (
                          <span className="inline-block bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
                            {product.tag}
                          </span>
                        )}
                        {product.soldOut && (
                          <span className="inline-block bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                            已售完
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        HK$ {product.basePrice?.toLocaleString() || '0'}
                      </div>
                      {product.hasOptions && (
                        <div className="text-xs text-gray-500">起價</div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {product.detail}
                  </p>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>分類: {product.subCategory}</span>
                    <span>ID: {product.id}</span>
                  </div>

                  {product.hasOptions && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-indigo-600 font-medium">
                        ✨ 此產品有多種選項
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">沒有找到產品</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? '請嘗試不同的搜尋關鍵字' : '此分類目前沒有產品'}
            </p>
            <button
              onClick={handleAddProduct}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              新增第一個產品
            </button>
          </div>
        )}
      </div>      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={editingProduct}
          categories={serviceCategories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSave={handleSaveProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
