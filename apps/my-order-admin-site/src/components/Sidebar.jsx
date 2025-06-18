const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    {
      id: 'dashboard',
      name: '總覽',
      icon: '📊'
    },
    {
      id: 'products',
      name: '產品管理',
      icon: '🛍️'
    },
    {
      id: 'users',
      name: '用戶管理',
      icon: '👥'
    },
    {
      id: 'orders',
      name: '訂單管理',
      icon: '📋'
    }
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">解憂雜貨店</h2>
        <p className="sidebar-subtitle">管理後台</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`nav-button ${currentPage === item.id ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>      {/* Footer */}
      <div className="sidebar-footer">
        © 2025 解憂雜貨店
      </div>
    </div>
  );
};

export default Sidebar;
