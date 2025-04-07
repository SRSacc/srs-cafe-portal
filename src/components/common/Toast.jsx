import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Toast({ message, type = 'error', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 sm:right-1 md:right-4 z-50 md:m-0 m-4 animate-slide-in">
      <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
        <span className={`text-${type === 'error' ? 'red' : 'green'}-500 font-medium`}>
          {message}
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}