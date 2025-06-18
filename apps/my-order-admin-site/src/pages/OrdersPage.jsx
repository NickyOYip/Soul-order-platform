import { useState, useEffect } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  // Mock orders data
  useEffect(() => {
    const mockOrders = [
      {
        id: '#001',
        customerName: '張小明',
        customerEmail: 'zhang@example.com',
        products: [
          { name: '愛情蠟燭', quantity: 1, price: 299 }
        ],
        totalAmount: 299,
        status: '已完成',
        paymentStatus: '已付款',
        orderDate: '2025-06-18',
        completedDate: '2025-06-18'
      },
      {
        id: '#002',
        customerName: '李小華',
        customerEmail: 'li@example.com',
        products: [
          { name: '塔羅占卜', quantity: 1, price: 199 },
          { name: '靈擺調頻', quantity: 1, price: 255 }
        ],
        totalAmount: 454,
        status: '處理中',
        paymentStatus: '已付款',
        orderDate: '2025-06-18',
        completedDate: null
      },
      {
        id: '#003',
        customerName: '王小美',
        customerEmail: 'wang@example.com',
        products: [
          { name: '愛情蠟燭', quantity: 2, price: 598 }
        ],
        totalAmount: 598,
        status: '待付款',
        paymentStatus: '未付款',
        orderDate: '2025-06-17',
        completedDate: null
      },
      {
        id: '#004',
        customerName: '陳小強',
        customerEmail: 'chen@example.com',
        products: [
          { name: '流年運程', quantity: 1, price: 688 }
        ],
        totalAmount: 688,
        status: '已取消',
        paymentStatus: '已退款',
        orderDate: '2025-06-16',
        completedDate: null
      }
    ];
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
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
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
  }, [orders, selectedStatus, selectedDate, searchTerm]);

  const statusOptions = [
    { value: 'all', label: '全部狀態' },
    { value: '待付款', label: '待付款' },
    { value: '處理中', label: '處理中' },
    { value: '已完成', label: '已完成' },
    { value: '已取消', label: '已取消' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case '已完成':
        return 'bg-green-100 text-green-800';
      case '處理中':
        return 'bg-blue-100 text-blue-800';
      case '待付款':
        return 'bg-yellow-100 text-yellow-800';
      case '已取消':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case '已付款':
        return 'bg-green-100 text-green-800';
      case '未付款':
        return 'bg-red-100 text-red-800';
      case '已退款':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            status: newStatus,
            completedDate: newStatus === '已完成' ? new Date().toISOString().split('T')[0] : null
          }
        : order
    ));
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
            <p className="text-2xl font-bold text-purple-600">${stats.totalRevenue.toLocaleString()}</p>
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
                  付款狀態
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.customerEmail}
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
                    ${order.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(order.status)}`}
                    >
                      <option value="待付款">待付款</option>
                      <option value="處理中">處理中</option>
                      <option value="已完成">已完成</option>
                      <option value="已取消">已取消</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>下單: {order.orderDate}</div>
                    {order.completedDate && (
                      <div>完成: {order.completedDate}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-purple-600 hover:text-purple-900">
                      查看
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      編輯
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
