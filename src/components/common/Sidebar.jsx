import { useLocation } from 'react-router-dom';
import Logo from "../../assets/SRSLogoWhite.svg";
import { LogOut } from "lucide-react";
import Button from './Button';
import NavLink from './NavLink';

export default function Sidebar({ 
  navItems, 
  userName, 
  onLogout, 
  sidebarOpen, 
  onCloseSidebar 
}) {
  const location = useLocation();

  return (
    <aside className={`fixed lg:static top-0 left-0 z-40 h-full w-64 bg-black p-6 flex flex-col justify-between border-r border-white/10 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div>
        <div className="flex items-center gap-3 mb-10">
          <img src={Logo} alt="SRS Café Logo" className="w-12 h-12" />
          <h1 className="text-xl font-semibold tracking-wide">SRS Café</h1>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              icon={item.icon}
              isActive={location.pathname === item.path}
              onClick={onCloseSidebar}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-4 text-sm text-white">
        <p className="font-medium">Logged in: {userName || 'Loading...'}</p>
        <Button
          variant="danger"
          size="sm"
          icon={<LogOut size={16} />}
          onClick={onLogout}
          className="mt-2"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
}