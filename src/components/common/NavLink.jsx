import { Link } from 'react-router-dom';
import NotificationBadge from './NotificationBadge';

export default function NavLink({ 
  to, 
  icon, 
  children, 
  isActive, 
  onClick,
  badgeCount 
}) {
  return (
    <Link
      to={to}
      className={`relative flex items-center gap-3 px-4 py-2 rounded-lg transition ${
        isActive ? 'bg-white text-black font-medium' : 'hover:bg-gray-900 text-white'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
      <NotificationBadge count={badgeCount} />
    </Link>
  );
}