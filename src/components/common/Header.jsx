import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Header({ onOpenSidebar }) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 lg:z-20 backdrop-blur-md bg-white/5 px-8 py-4 border-b border-white/10 lg:pl-8 pl-16">
      <div className="lg:hidden absolute top-4 left-4">
        <button onClick={onOpenSidebar} className="p-2 bg-gray-800 rounded-md">
          <Menu size={24} />
        </button>
      </div>
      <h2 className="text-2xl font-semibold capitalize">
        {location.pathname.split('/').pop() || 'Dashboard'}
      </h2>
    </header>
  );
}