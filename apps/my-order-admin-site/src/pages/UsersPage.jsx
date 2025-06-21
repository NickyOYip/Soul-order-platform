import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembership, setSelectedMembership] = useState('all');
  const [loading, setLoading] = useState(true);  const [selectedUser, setSelectedUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Load users from API service
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoading(false);
      }
    };    loadUsers();
  }, []);

  // Filter users
  useEffect(() => {
    let filtered = users;
    
    if (selectedMembership !== 'all') {
      filtered = filtered.filter(user => user.membership === selectedMembership);
    }
      if (searchTerm) {
      filtered = filtered.filter(user => 
        user.igName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }
    
    setFilteredUsers(filtered);
  }, [users, selectedMembership, searchTerm]);

  const membershipTypes = [
    { value: 'all', label: '全部' },
    { value: '普通會員', label: '普通會員' },
    { value: '金級會員', label: '金級會員' },
    { value: '白金級會員', label: '白金級會員' },
    { value: '鑽石級會員', label: '鑽石級會員' }
  ];

  const getMembershipColor = (membership) => {
    switch (membership) {
      case '鑽石級會員':
        return 'bg-purple-100 text-purple-800';
      case '白金級會員':
        return 'bg-gray-100 text-gray-800';
      case '金級會員':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };  const updateMembership = async (userId, newMembership) => {
    try {
      const user = users.find(u => u.id === userId);
      await apiService.updateUser(userId, { ...user, membership: newMembership });
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, membership: newMembership }
          : user
      ));
    } catch (error) {
      console.error('Failed to update user membership:', error);
    }
  };

  const viewUserDetails = async (user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
    setLoadingOrders(true);
    
    try {
      // Get all orders and filter by user
      const allOrders = await apiService.getAllOrders();
      const userSpecificOrders = allOrders.filter(order => 
        order.customerIgName === user.igName || order.userId === user.id
      );
      setUserOrders(userSpecificOrders);
    } catch (error) {
      console.error('Failed to load user orders:', error);
      setUserOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const closeUserDetail = () => {
    setShowUserDetail(false);
    setSelectedUser(null);
    setUserOrders([]);
  };

  const openEditModal = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleEditSave = async () => {
    try {
      await apiService.updateUser(editingUser.id, editingUser);
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? editingUser
          : user
      ));
      closeEditModal();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleEditChange = (field, value) => {
    setEditingUser({
      ...editingUser,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">用戶管理</h2>
        <p className="text-gray-600">管理所有用戶資料和會員狀態</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            <p className="text-sm text-gray-600">總用戶數</p>
          </div>
        </div>        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {users.filter(u => u.membership !== '普通會員').length}
            </p>
            <p className="text-sm text-gray-600">高級會員</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.membership === '鑽石級會員').length}
            </p>
            <p className="text-sm text-gray-600">鑽石會員</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              HK$ {users.reduce((sum, user) => sum + user.totalSpent, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">總消費金額</p>
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
              placeholder="搜尋用戶名稱、email 或電話..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          {/* Membership Filter */}
          <div>
            <select
              value={selectedMembership}
              onChange={(e) => setSelectedMembership(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {membershipTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            用戶列表 ({filteredUsers.length})
          </h3>
        </div>        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  用戶資料
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  聯絡方式
                </th>                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  會員等級
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  消費/訂單
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-medium">
                            {user.igName && user.igName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          @{user.igName}
                        </div>
                        <div className="text-sm text-gray-500">
                          加入日期: {user.joinDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.phone}</div>
                    <div className="text-sm text-gray-500">聯絡電話</div>
                  </td>                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMembershipColor(user.membership)}`}>
                      {user.membership}
                    </span>
                  </td><td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">HK$ {user.totalSpent.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{user.orders} 筆訂單</div>
                  </td>                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      className="text-purple-600 hover:text-purple-900"
                      onClick={() => viewUserDetails(user)}
                    >
                      查看
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => openEditModal(user)}
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                用戶詳細資料
              </h3>
              <button
                onClick={closeUserDetail}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {loadingOrders ? (
                <div className="text-center py-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5 mx-auto text-purple-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" strokeWidth={4} />
                    <path className="opacity-75" fill="none" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                </div>
              ) : (
                <div>                  {/* User Info */}
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-800">用戶資訊</h4>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">用戶 ID:</span> {selectedUser.id}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">用戶名稱:</span> @{selectedUser.igName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">聯絡電話:</span> {selectedUser.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">加入日期:</span> {selectedUser.joinDate}
                      </p>
                    </div>
                  </div>{/* User Membership */}
                  <div className="mb-4">
                    <h4 className="text-md font-semibold text-gray-800">會員狀態</h4>
                    <div className="mt-2">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getMembershipColor(selectedUser.membership)}`}>
                        {selectedUser.membership}
                      </span>
                    </div>
                  </div>

                  {/* User Orders */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">訂單紀錄 ({userOrders.length})</h4>
                    <div className="mt-2 space-y-4">
                      {userOrders.length === 0 ? (
                        <p className="text-sm text-gray-500">此用戶尚無訂單紀錄。</p>
                      ) : (
                        userOrders.map(order => (
                          <div key={order.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-900">
                                  訂單編號: <span className="font-medium">{order.id}</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                  訂單日期: {new Date(order.date).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <span className={`text-xs font-semibold rounded-full px-2 py-1 ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                  {order.status === 'completed' ? '已完成' : '未完成'}
                                </span>
                              </div>
                            </div>                            <div className="mt-2">
                              <p className="text-sm text-gray-900">
                                總金額: <span className="font-medium">HK$ {order.totalAmount}</span>
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">              <h3 className="text-lg font-semibold text-gray-900">
                編輯用戶資料 - ID: {editingUser.id} (@{editingUser.igName})
              </h3>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 space-y-4">              {/* Instagram Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram 用戶名
                </label>
                <input
                  type="text"
                  value={editingUser.igName}
                  onChange={(e) => handleEditChange('igName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Instagram 用戶名"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  聯絡電話
                </label>
                <input
                  type="text"
                  value={editingUser.phone}
                  onChange={(e) => handleEditChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="聯絡電話"
                />
              </div>

              {/* Membership */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  會員等級
                </label>
                <select
                  value={editingUser.membership}
                  onChange={(e) => handleEditChange('membership', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="普通會員">普通會員</option>
                  <option value="金級會員">金級會員</option>
                  <option value="白金級會員">白金級會員</option>
                  <option value="鑽石級會員">鑽石級會員</option>
                </select>
              </div>

              {/* Join Date (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  加入日期
                </label>
                <input
                  type="text"
                  value={editingUser.joinDate}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleEditSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                儲存變更
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
