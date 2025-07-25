import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchUserData } from '../api/auth';
import { Clock, CreditCard, Bell } from "lucide-react";
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

// , icon: <Clock size={20} /> 
// , icon: <CreditCard size={20} /> 
// , icon: <Bell size={20} /> 
const navItems = [
  { name: 'Work Hours', path: '/worker/hours'},
  { name: 'Subscription', path: '/worker/subscription'},
  { name: 'Notifications', path: '/worker/notifications'},
];

export default function WorkerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUser] = useState('');
  const navigate = useNavigate();

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
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        navItems={navItems}
        userName={userName}
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      <div className="flex-1 bg-gradient-to-br from-black via-gray-900 to-gray-950 overflow-y-auto">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <main className="py-4 px-8 text-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
