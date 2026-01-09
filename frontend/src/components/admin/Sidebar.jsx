import { NavLink } from 'react-router-dom';
import { FaProjectDiagram, FaUsers, FaEnvelope, FaMailBulk, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';

const Sidebar = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/projects', icon: <FaProjectDiagram />, label: 'Projects' },
    { path: '/admin/clients', icon: <FaUsers />, label: 'Clients' },
    { path: '/admin/contacts', icon: <FaEnvelope />, label: 'Contact Forms' },
    { path: '/admin/subscribers', icon: <FaMailBulk />, label: 'Subscribers' },
  ];

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 w-auto brightness-0 invert" />
        
        </div>
      </div>

      {/* Admin Info */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            {admin?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <p className="font-semibold">{admin?.name || 'Admin'}</p>
            <p className="text-sm text-gray-400">{admin?.email || ''}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <FaSignOutAlt className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="w-full mt-2 flex items-center justify-center px-4 py-2 rounded-lg text-gray-400 hover:text-white text-sm transition-colors"
        >        
          ← Back to Website
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
