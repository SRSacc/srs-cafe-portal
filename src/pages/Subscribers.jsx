import { useState, useRef, useEffect } from 'react';
import { Edit, Trash2, X } from 'lucide-react';

const initialSubscribers = [
  {
    id: 1,
    name: 'Jane Doe',
    image: '/avatar1.png',
    status: 'active',
    expiresOn: '2025-04-05',
    type: 'srs',
  },
  {
    id: 2,
    name: 'Emmanuel Ogorchukwu N',
    image: '/avatar2.png',
    status: 'expiring',
    expiresOn: '2025-03-29',
    type: 'regular',
  },
  {
    id: 3,
    name: 'Chidinma Ugochukwu',
    image: '/avatar3.png',
    status: 'expired',
    expiresOn: '2025-03-20',
    type: 'srs',
  },
  {
    id: 4,
    name: 'Tony Richards',
    image: '/avatar4.png',
    status: 'active',
    expiresOn: '2025-05-05',
    type: 'regular',
  },
  {
    id: 5,
    name: 'Tony Richards',
    image: '/avatar4.png',
    status: 'active',
    expiresOn: '2025-05-05',
    type: 'regular',
  },
  {
    id: 6,
    name: 'Tony Richards',
    image: '/avatar4.png',
    status: 'active',
    expiresOn: '2025-05-05',
    type: 'regular',
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
  const [showSubscriptionFilter, setShowSubscriptionFilter] = useState(false);
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const filterRef = useRef(null);


  const filteredSubscribers = subscribers.filter((sub) => {
    const matchName = sub.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === 'all' || sub.status === filter;
    const matchSubscription =
      subscriptionFilter === 'all' || sub.subscriptionType === subscriptionFilter;
    return matchName && matchStatus && matchSubscription;
  });


  const handleSaveEdit = () => {
    setSubscribers((prev) =>
      prev.map((sub) =>
        sub.id === editModal.id
          ? {
            ...sub,
            name: editModal.name,
            subscriptionType: editModal.subscriptionType,
            paymentMode: editModal.paymentMode,
          }
          : sub
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowSubscriptionFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className="text-white">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        {/* Search Box with Filter Icon */}
        <div className="relative w-full md:w-1/1">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 pr-10 rounded-lg bg-white/10 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filter Icon Button */}
          <button
            onClick={() => setShowSubscriptionFilter((prev) => !prev)}
            className="absolute top-2.5 right-3 text-white hover:text-gray-300 focus:outline-none"
            title="Filter by subscription type"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showSubscriptionFilter && (
            <div
              ref={filterRef}
              className="absolute z-50 top-14 right-0 w-72 bg-gray-900 border border-white/20 text-white rounded-lg shadow-lg p-4"
            >
              <label className="block text-xs font-semibold text-gray-300 mb-2">Subscription Type</label>
              <select
                value={subscriptionFilter}
                onChange={(e) => setSubscriptionFilter(e.target.value)}
                className="w-full bg-white/10 border border-white/30 text-white p-2 rounded-lg focus:outline-none appearance-none"
              >


                <option label='select type'></option>
                <option value="half-day-morning" className="text-black">Half-day (morning)</option>
                <option value="half-day-night" className="text-black">Half-day (night)</option>
                <option value="full-day" className="text-black">Full day</option>
                <option value="weekly-day-only" className="text-black">Weekly (day-only)</option>
                <option value="weekly-full-access" className="text-black">Weekly (full-access)</option>
                <option value="bi-weekly-day-only" className="text-black">Bi-weekly (day-only)</option>
                <option value="bi-weekly-full-access" className="text-black">Bi-weekly (full-access)</option>
                <option value="monthly-day-only" className="text-black">Monthly (day-only)</option>
                <option value="monthly-full-access" className="text-black">Monthly (full-access)</option>

              </select>
            </div>
          )}
        </div>

        {/* Status Filters (All / Active / Expiring / Expired) */}
        <div className="flex gap-2">
          {['all', 'active', 'expiring', 'expired'].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-full text-sm transition ${filter === status
                ? 'bg-white text-black font-semibold'
                : 'bg-white/10 hover:bg-white/20 text-white'
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
            className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-md p-5 flex flex-col justify-between text-center hover:shadow-lg transition group h-50"
          >

            {/* Worker Type Badge */}
            <span className="absolute top-2 left-2 bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
              {sub.type === 'srs' ? 'SRS' : 'REG'}
            </span>

            <div className="flex flex-col justify-start items-center flex-grow">
              <img
                src={sub.image}
                alt={sub.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white/20"
              />
              <h3
                className="text-lg font-semibold mt-2 max-w-full truncate"
                title={sub.name}
              >
                {sub.name}
              </h3>

            </div>

            {/* Footer Section: Status + Expiry */}
            <div className="mt-5 space-y-1 h-[50px] flex flex-col justify-center items-center">
              <span className={`px-3 py-1 text-xs rounded-full ${statusColors[sub.status]}`}>
                {sub.status === 'expiring' ? 'Expiring Soon' : sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
              </span>
              <p className="text-xs text-gray-300">Expires on: {sub.expiresOn}</p>
            </div>

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
              {/* Name */}
              <div>
                <label className="block mb-1 text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
                  value={editModal.name}
                  onChange={(e) => setEditModal({ ...editModal, name: e.target.value })}
                />
              </div>

              {/* Status (Read-only) */}
              <div>
                <label className="block mb-1 text-sm font-medium">Status (from backend)</label>
                <input
                  type="text"
                  disabled
                  value={editModal.status}
                  className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 cursor-not-allowed"
                />
              </div>

              {/* Subscription Type */}
              <div>
                <label className="block mb-1 text-sm font-medium">Subscription Type</label>
                <select
                  value={editModal.subscriptionType || ''}
                  onChange={(e) => setEditModal({ ...editModal, subscriptionType: e.target.value })}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
                >
                  <option className="text-black" value="half-day">Half-day</option>
                  <option className="text-black" value="full-day">Full day</option>
                  <option className="text-black" value="weekly">Weekly</option>
                  <option className="text-black" value="bi-weekly">Bi-weekly</option>
                  <option className="text-black" value="monthly">Monthly</option>
                </select>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block mb-1 text-sm font-medium">Payment Mode</label>
                <select
                  value={editModal.paymentMode || ''}
                  onChange={(e) => setEditModal({ ...editModal, paymentMode: e.target.value })}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
                >
                  <option className="text-black" value="self">Self</option>
                  <option className="text-black" value="company">Company</option>
                </select>
              </div>

              {/* Save Button */}
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