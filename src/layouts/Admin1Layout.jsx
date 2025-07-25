import { useState, useEffect } from 'react'; 
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, UserPlus, Users, Bell, Menu, LogOut } from 'lucide-react';
import Logo from '../assets/SRSLogoWhite.svg';
import { useNotifications } from '../context/NotificationContext';
import { fetchUserData } from '../api/auth';

// , icon: <Users size={18} />
// , icon: <UserPlus size={18} /> 
// , icon: <Bell size={18} /> 

const navItems = [
  { name: 'Dashboard', path: '/admin1/dashboard'},
  { name: 'Register', path: '/admin1/register'},
  { name: 'Notifications', path: '/admin1/notifications'},
];

export default function Admin1Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUser] = useState('');
  const { newCount } = useNotifications();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoading(true);
      fetchUserData(token)
        .then((response) => {
          const userInfo = `${response.data.username} (${response.data.role})`;
          setUser(userInfo);
        })
        .catch((error) => {
          console.error("Error loading user", error);
          setUser('Unknown User');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen text-white font-sans relative bg-black">
      {/* Mobile & Tablet Menu Toggle */}
      {!sidebarOpen && (
        <div className="lg:hidden absolute top-4 left-4 z-50">
          <button onClick={() => setSidebarOpen(true)} className="p-2 bg-gray-800 rounded-md">
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Overlay for closing sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static top-0 left-0 z-40 h-full w-64 bg-black/90 p-6 flex flex-col justify-between border-r border-white/10 backdrop-blur-sm shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className="flex items-center gap-3 mb-10">
            <img src={Logo} alt="SRS Café Logo" className="w-12 h-12" />
            <h1 className="text-xl font-semibold tracking-wide">SRS Café</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? 'bg-white text-black font-medium' : 'hover:bg-gray-800 text-white'}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  {item.name}

                  {/* Show badge for Notifications only if new notifications exist */}
                  {item.name === 'Notifications' && newCount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {newCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-4 text-sm text-white">
          <p className="font-medium">Logged in: {userName || 'Loading...'}</p>
          <button onClick={handleLogout} className="mt-2 bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition">
            <LogOut size={16} className="inline-block mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-black/90 backdrop-blur-sm overflow-y-auto">
        {/* Page Header */}
        <header className="sticky top-0 z-30 lg:z-20 backdrop-blur-md bg-white/5 px-8 py-4 border-b border-white/10 lg:pl-8 pl-16">
          <h2 className="text-2xl font-semibold capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
        </header>

        <main className="py-4 px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
