import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);

  // Load orders from API service
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };    loadOrders();
  }, []);

  // Filter orders
  useEffect(() => {
    let filtered = orders;
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }
    
    if (selectedDate) {
      filtered = filtered.filter(order => order.orderDate === selectedDate);
    }
      if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerIgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm)
      );
    }
    
    setFilteredOrders(filtered);
  }, [orders, selectedStatus, selectedDate, searchTerm]);  const statusOptions = [
    { value: 'all', label: '全部狀態' },
    { value: '待處理', label: '待處理' },
    { value: '處理中', label: '處理中' },
    { value: '已完成', label: '已完成' },
    { value: '已取消', label: '已取消' }
  ];  const getStatusColor = (status) => {
    switch (status) {
      case '已完成':
        return 'bg-green-100 text-green-800';
      case '處理中':
        return 'bg-blue-100 text-blue-800';
      case '待處理':
        return 'bg-yellow-100 text-yellow-800';
      case '已取消':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }};
  
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiService.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: newStatus,
              completedDate: newStatus === '已完成' ? new Date().toISOString().split('T')[0] : null
            }
          : order
      ));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const calculateStats = () => {
    const totalRevenue = orders
      .filter(order => order.status === '已完成')
      .reduce((sum, order) => sum + order.totalAmount, 0);
    
    const pendingOrders = orders.filter(order => order.status === '處理中').length;
    const completedOrders = orders.filter(order => order.status === '已完成').length;
    const totalOrders = orders.length;

    return { totalRevenue, pendingOrders, completedOrders, totalOrders };
  };
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setViewingOrder({ ...order });
    setShowOrderDetail(true);
  };

  const closeOrderDetail = () => {
    setShowOrderDetail(false);
    setSelectedOrder(null);
    setViewingOrder(null);
  };

  const handleViewOrderSave = async () => {
    try {
      await apiService.updateOrder(viewingOrder.id, viewingOrder);
      setOrders(orders.map(order => 
        order.id === viewingOrder.id 
          ? viewingOrder
          : order
      ));
      setSelectedOrder(viewingOrder);
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };
  const handleViewOrderChange = (field, value) => {
    setViewingOrder({
      ...viewingOrder,
      [field]: value
    });
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">訂單管理</h2>
        <p className="text-gray-600">管理所有訂單和交易記錄</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            <p className="text-sm text-gray-600">總訂單數</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.pendingOrders}</p>
            <p className="text-sm text-gray-600">處理中</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
            <p className="text-sm text-gray-600">已完成</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">HK$ {stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-600">總收入</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜尋訂單編號、客戶名稱或 email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            訂單列表 ({filteredOrders.length})
          </h3>
        </div>
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  訂單編號
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  客戶資料
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  產品
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  訂單狀態
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      @{order.customerIgName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.customerPhone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.products.map((product, index) => (
                        <div key={index}>
                          {product.name} x{product.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    HK$ {order.totalAmount}
                  </td>                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-semibold rounded-full px-2 py-1 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>下單: {order.orderDate}</div>
                    {order.completedDate && (
                      <div>完成: {order.completedDate}</div>
                    )}
                  </td>                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => viewOrderDetails(order)}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>      {/* Order Detail Modal */}
      {showOrderDetail && selectedOrder && viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-96 overflow-y-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                訂單詳情 - {selectedOrder.id}
              </h3>
              <button
                onClick={closeOrderDetail}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">客戶 Instagram</label>
                  <p className="text-sm text-gray-900">@{selectedOrder.customerIgName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">聯絡電話</label>
                  <p className="text-sm text-gray-900">{selectedOrder.customerPhone}</p>
                </div>
              </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">訂單商品</label>
                <div className="space-y-3">
                  {selectedOrder.products.map((product, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                          
                          {/* Selected Options */}
                          {product.selectedOptions && Object.keys(product.selectedOptions).length > 0 && (
                            <div className="mt-2 space-y-1">
                              <p className="text-xs font-medium text-gray-600">選項:</p>
                              {Object.entries(product.selectedOptions).map(([optionNo, value]) => (
                                <div key={optionNo} className="text-xs text-gray-700">
                                  <span className="font-medium">選項 {optionNo}:</span>
                                  <span className="ml-1">{value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Selected Add-ons */}
                          {product.selectedAddOns && product.selectedAddOns.length > 0 && (
                            <div className="mt-2 space-y-1">
                              <p className="text-xs font-medium text-gray-600">加購項目:</p>
                              {product.selectedAddOns.map((addOn, addOnIndex) => (
                                <div key={addOnIndex} className="text-xs text-gray-700">
                                  <span>{addOn.name}</span>
                                  {addOn.price > 0 && (
                                    <span className="ml-1 text-green-600 font-medium">+HK$ {addOn.price}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-right ml-4">
                          <p className="text-sm font-medium text-gray-900">x{product.quantity}</p>
                          <p className="text-sm text-gray-600">HK$ {product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div><div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">訂單狀態</label>
                  <select
                    value={viewingOrder.status}
                    onChange={(e) => handleViewOrderChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="待處理">待處理</option>
                    <option value="處理中">處理中</option>
                    <option value="已完成">已完成</option>
                    <option value="已取消">已取消</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">總金額</label>
                  <p className="text-sm text-gray-900">HK$ {selectedOrder.totalAmount}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">下單日期</label>
                  <p className="text-sm text-gray-900">{selectedOrder.orderDate}</p>
                </div>
                {selectedOrder.completedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">完成日期</label>
                    <p className="text-sm text-gray-900">{selectedOrder.completedDate}</p>
                  </div>
                )}
              </div>
            </div>            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={closeOrderDetail}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                關閉
              </button>
              <button
                onClick={handleViewOrderSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                儲存變更
              </button>
            </div>          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
