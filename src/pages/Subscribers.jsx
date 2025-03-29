import { useState } from 'react';
import { Edit, Trash2, X } from 'lucide-react';

const initialSubscribers = [
  {
    id: 1,
    name: 'Jane Doe',
    image: '/avatar1.png',
    status: 'active',
    expiresOn: '2025-04-05',
  },
  {
    id: 2,
    name: 'Emmanuel O.',
    image: '/avatar2.png',
    status: 'expiring',
    expiresOn: '2025-03-29',
  },
  {
    id: 3,
    name: 'Chidinma U.',
    image: '/avatar3.png',
    status: 'expired',
    expiresOn: '2025-03-20',
  },
  { 
    id: 4,
    name: 'Tony Richards',
    image: '/avatar4.png',
    status: 'active',
    expiresOn: '2025-05-05',
   },
];

const statusColors = {
  active: 'bg-green-600',
  expiring: 'bg-yellow-400 text-black',
  expired: 'bg-red-600',
};

function Toast({ message }) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg border border-white/20 animate-fade-in-up">
        {message}
      </div>
    );
};
  

export default function Subscribers() {
    const [subscribers, setSubscribers] = useState(initialSubscribers);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [editModal, setEditModal] = useState(null);
    const [deleteModal, setDeleteModal] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
  
    const filteredSubscribers = subscribers.filter((sub) => {
      const matchName = sub.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filter === 'all' || sub.status === filter;
      return matchName && matchStatus;
    });
  
    const handleSaveEdit = () => {
      setSubscribers((prev) =>
        prev.map((sub) =>
          sub.id === editModal.id ? { ...sub, name: editModal.name, status: editModal.status } : sub
        )
      );
      setEditModal(null);
      setToastMessage('Subscriber updated successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    };
  
    const handleConfirmDelete = () => {
      setSubscribers((prev) => prev.filter((sub) => sub.id !== deleteModal.id));
      setDeleteModal(null);
      setToastMessage('Subscriber deleted.');
      setTimeout(() => setToastMessage(''), 3000);
    };
  
    return (
      <div className="text-white">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full md:w-1/3 p-3 rounded-lg bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {['all', 'active', 'expiring', 'expired'].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  filter === status ? 'bg-white text-black font-semibold' : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                onClick={() => setFilter(status)}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
  
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
          {filteredSubscribers.map((sub) => (
            <div
              key={sub.id}
              className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition group"
            >
              <img
                src={sub.image}
                alt={sub.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white/20"
              />
              <h3 className="text-lg font-semibold mb-1">{sub.name}</h3>
              <span className={`px-3 py-1 text-xs rounded-full mb-2 ${statusColors[sub.status]}`}>
                {sub.status === 'expiring' ? 'Expiring Soon' : sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </span>
              <p className="text-xs text-gray-300">Expires on: {sub.expiresOn}</p>
  
              {/* Hover Actions */}
              <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                <button
                  onClick={() => setEditModal({ ...sub })}
                  className="bg-white/20 hover:bg-white/30 text-white p-1 rounded-full"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => setDeleteModal(sub)}
                  className="bg-white/20 hover:bg-red-600 text-white p-1 rounded-full"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Edit Modal */}
        {editModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md transform scale-100 transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Edit Subscriber</h3>
                <button onClick={() => setEditModal(null)} className="text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
                    value={editModal.name}
                    onChange={(e) => setEditModal({ ...editModal, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Status</label>
                  <select
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
                    value={editModal.status}
                    onChange={(e) => setEditModal({ ...editModal, status: e.target.value })}
                  >
                    <option className="text-black" value="active">Active</option>
                    <option className="text-black" value="expiring">Expiring Soon</option>
                    <option className="text-black" value="expired">Expired</option>
                  </select>
                </div>
                <button
                  onClick={handleSaveEdit}
                  className="w-full bg-white text-black font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Delete Modal */}
        {deleteModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-sm text-center transform scale-100 transition-transform duration-300">
              <h3 className="text-lg font-semibold mb-4">Delete {deleteModal.name}?</h3>
              <p className="text-sm text-gray-300 mb-6">This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteModal(null)}
                  className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Toast Notification */}
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    );
  }