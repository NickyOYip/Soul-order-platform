const Dashboard = () => {
  // Mock data for dashboard statistics
  const stats = [
    {
      title: '總產品數',
      value: '45',
      icon: '🛍️',
      color: 'blue'
    },
    {
      title: '總用戶數',
      value: '1,234',
      icon: '👥',
      color: 'green'
    },
    {
      title: '今日訂單',
      value: '23',
      icon: '📋',
      color: 'purple'
    },
    {
      title: '總收入',
      value: '$12,345',
      icon: '💰',
      color: 'yellow'
    }
  ];

  const recentOrders = [
    {
      id: '#001',
      customer: '張小明',
      product: '愛情蠟燭',
      amount: '$299',
      status: '已完成',
      date: '2025-06-18'
    },
    {
      id: '#002',
      customer: '李小華',
      product: '塔羅占卜',
      amount: '$199',
      status: '處理中',
      date: '2025-06-18'
    },
    {
      id: '#003',
      customer: '王小美',
      product: '靈擺調頻',
      amount: '$399',
      status: '已完成',
      date: '2025-06-17'
    }
  ];
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="page-header">
        <h2 className="page-title">總覽</h2>
        <p className="page-description">歡迎來到解憂雜貨店管理後台</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-content">
              <div className={`stat-icon ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>      {/* Recent Orders */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">最近訂單</h3>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>客戶</th>
                <th>產品</th>
                <th>金額</th>
                <th>狀態</th>
                <th>日期</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="font-medium">{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.amount}</td>
                  <td>
                    <span className={`badge ${
                      order.status === '已完成' 
                        ? 'badge-green' 
                        : 'badge-yellow'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
