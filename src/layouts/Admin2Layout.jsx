import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, UserPlus, Users, Bell, Menu } from 'lucide-react';
import Logo from '../assets/SRSLogoWhite.svg';
import { useNotifications } from '../context/NotificationContext';

const navItems = [
  { name: 'Register', path: '/dashboard/admin2/register', icon: <UserPlus size={18} /> },
  { name: 'Subscribers', path: '/dashboard/admin2/subscribers', icon: <Users size={18} /> },
  { name: 'Notifications', path: '/dashboard/admin2/notifications', icon: <Bell size={18} /> },
];




export default function Admin2Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { newCount } = useNotifications();


  return (
    <div className="flex h-screen text-white font-sans relative">
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
      <aside className={`fixed lg:static top-0 left-0 z-40 h-full w-64 bg-black p-6 flex flex-col justify-between border-r border-white/10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <div>
          <div className="flex items-center gap-3 mb-10">
            <img src={Logo} alt="SRS Café Logo" className="w-8 h-8" />
            <h1 className="text-xl font-semibold tracking-wide">SRS Café</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? 'bg-white text-black font-medium' : 'hover:bg-gray-800 text-white'
                    }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  {item.name}

                  {/* 🔴 Show badge for Notifications only if new notifications exist */}
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
        <p className="text-xs text-gray-500">Receptionist Panel</p>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-black via-gray-900 to-gray-950 overflow-y-auto">
        {/* Page Header */}
        <header className="sticky top-0 z-30 lg:z-20 backdrop-blur-md bg-white/5 px-8 py-4 border-b border-white/10 lg:pl-8 pl-16">
          <h2 className="text-2xl font-semibold capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}