import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchUserData } from '../api/auth';
import Logo from "../assets/SRSLogoWhite.svg";
import {
  Settings,
  Database,
  Users,
  Bell,
  LogOut,
  Menu
} from "lucide-react";

// , icon: <Settings size={20} /> 
// , icon: <Database size={20} />
// , icon: <Users size={20} /> 
// , icon: <Bell size={20} /> 
const navItems = [
  { name: 'System Config', path: '/admin2/system'},
  { name: 'Database', path: '/admin2/database'},
  { name: 'User Management', path: '/admin2/users'},
  { name: 'Notifications', path: '/admin2/notifications'},
];

export default function Admin2Layout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUser] = useState('');
  const navigate = useNavigate();


  // Fetch user information after component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token)
        .then((response) => {
          const userInfo = `${response.data.username} (${response.data.role})`;
          setUser(userInfo);
        })
        .catch((error) => {
          console.error("Error loading user", error);
          setUser('Unknown User');
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

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
      <aside className={`fixed lg:static top-0 left-0 z-40 h-full w-64 bg-black p-6 flex flex-col justify-between border-r border-white/10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className="flex items-center gap-3 mb-10">
            <img src={Logo} alt="SRS Logo" className="w-12 h-12" />
            <h1 className="text-xl font-semibold tracking-wide">SRS Café</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    isActive ? 'bg-white text-black font-medium' : 'hover:bg-gray-900 text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Logout Button section */}
        <div>
          <div className="mt-4 text-sm text-white">
            <p className="font-medium">Logged in: {userName || 'Loading...'}</p>
            <button onClick={handleLogout} className="mt-2 bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition">
              <LogOut size={16} className="inline-block mr-2" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-black via-gray-900 to-gray-950 overflow-y-auto">
        {/* Page Header */}
        <header className="sticky top-0 z-30 lg:z-20 backdrop-blur-md bg-white/5 px-8 py-4 border-b border-white/10 lg:pl-8 pl-16">
          <h2 className="text-2xl font-semibold capitalize">
            {location.pathname.split('/').pop() || 'Dashboard'}
          </h2>
        </header>

        {/* Page Content */}
        <main className="py-4 px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
