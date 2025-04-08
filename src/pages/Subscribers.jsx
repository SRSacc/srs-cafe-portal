import { Users, UserCheck, Clock, AlertTriangle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Edit, Trash2, X } from 'lucide-react';
import { getSubscribers, updateSubscriber, deleteSubscriber } from '../api/subscriber';
import avatar from '../assets/avatar.png';


const statusColors = {
  active: 'bg-green-600',
  expiring: 'bg-yellow-400 text-black',
  expired: 'bg-red-600',
};

function Toast({ message }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg border border-white/30 animate-fade-in-up">
      {message}
    </div>
  );
};



export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [editingSub, setEditingSub] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showSubscriptionFilter, setShowSubscriptionFilter] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const filterRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const hoverTimerRef = useRef(null);
  const [detailModal, setDetailModal] = useState(null);


  const filteredSubscribers = subscribers.filter((sub) => {
    if (!sub) return false;

    const subscriberName = sub.subscriberDetails?.fullName || sub.subscriberDetails?.name || '';
    const matchName = subscriberName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === 'all' || sub.subscriberDetails?.status === filter;
    const matchSubscription =
      subscriptionFilter === 'all' ||
      subscriptionFilter === '' ||
      (sub.subscriberDetails?.subscriptionType?.toLowerCase() === subscriptionFilter.toLowerCase());

    return matchName && matchStatus && matchSubscription;
  });


  // Add this handler for image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditModal({ ...editModal, newImage: file });
      };
      reader.readAsDataURL(file);
    }
  };


  // Update handleSaveEdit function
  const handleSaveEdit = async () => {
    try {
      setLoading(true);

      // If only updating image, use the dedicated image endpoint
      if (editModal.newImage) {
        const formData = new FormData();
        formData.append('image', editModal.newImage);
        await updateSubscriber(`${editModal.id}/image`, formData);
      } else {
        // For other updates, use the main update endpoint
        const updateData = {
          fullName: editModal.name,
          subscriptionType: editModal.subscriptionType,
          paymentMode: editModal.paymentMode,
          status: editModal.status
        };
        await updateSubscriber(editModal.id, updateData);
      }

      // Refresh subscribers list
      const updatedSubscribers = await getSubscribers();
      setSubscribers(updatedSubscribers);

      setEditModal(null);
      setImagePreview(null);
      setToastMessage('Subscriber updated successfully!');
    } catch (error) {
      setToastMessage('Failed to update subscriber: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setToastMessage(''), 3000);
    }
  };

  const handleCardHover = (subscriberId, isHovering) => {
    if (isHovering) {
      hoverTimerRef.current = setTimeout(() => {
        setHoveredCard(subscriberId);
      }, 10000); // 10 seconds
    } else {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      setHoveredCard(null);
    }
  };

  const handleCardClick = (sub) => {
    setDetailModal({
      id: sub._id,
      name: sub.subscriberDetails?.fullName || sub.subscriberDetails?.name,
      status: sub.subscriberDetails?.status,
      subscriptionType: sub.subscriberDetails?.subscriptionType,
      paymentMode: sub.subscriberDetails?.paymentMode,
      image: sub.subscriberDetails?.image,
      subscriberType: sub.subscriberDetails?.subscriberType,
      expiresOn: sub.subscriberDetails?.expiresOn
    });
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await deleteSubscriber(deleteModal.id);

      // Refresh subscribers list
      const updatedSubscribers = await getSubscribers();
      setSubscribers(updatedSubscribers);

      setDeleteModal(null);
      setToastMessage('Subscriber deleted successfully.');
    } catch (error) {
      setToastMessage('Failed to delete subscriber: ' + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setToastMessage(''), 3000);
    }
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

  // Add fetch subscribers effect
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const data = await getSubscribers();
        console.log('Received subscribers:', data); // Log the received data
        setSubscribers(data);
      } catch (err) {
        setError(err.message);
        setToastMessage('Failed to load subscribers: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Add loading state check before the return statement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }
  // Update the stats calculation
  const stats = {
    totalActive: subscribers.filter(sub => sub.subscriberDetails?.status === 'active').length,
    expiredSubscribers: subscribers.filter(sub => sub.subscriberDetails?.status === 'expired').length,
    expiringNext7Days: subscribers.filter(sub => sub.subscriberDetails?.status === 'expiring').length,
    recentRegistrations: subscribers.filter(sub => {
      const registrationDate = new Date(sub.createdAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return registrationDate >= sevenDaysAgo;
    }).length
  };

  // Update the stats grid in the return statement
  return (
    <div className="text-white space-y-6">
      {/* Stats Grid */}
      <div className="flex w-90% md:w-auto sm:grid sm:grid-cols-4 gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0">
        {/* Active Subscribers */}
        <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl flex-shrink-0 w-1/4 md:w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-green-400" />
            <div className="lg:block">
              <p className="text-xs lg:text-sm text-gray-300 hidden lg:block">Active Subscribers</p>
              <h3 className="text-base sm:text-lg lg:text-2xl font-bold">{stats.totalActive}</h3>
            </div>
          </div>
        </div>

        {/* Expiring Soon */}
        <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl flex-shrink-0 w-1/4 sm:w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-400" />
            <div className="lg:block">
              <p className="text-xs lg:text-sm text-gray-300 hidden lg:block">Expiring Soon</p>
              <h3 className="text-base sm:text-lg lg:text-2xl font-bold">{stats.expiringNext7Days}</h3>
            </div>
          </div>
        </div>

        {/* Expired Subscribers */}
        <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl flex-shrink-0 w-1/4 sm:w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-red-400" />
            <div className="lg:block">
              <p className="text-xs lg:text-sm text-gray-300 hidden lg:block">Expired Subscribers</p>
              <h3 className="text-base sm:text-lg lg:text-2xl font-bold">{stats.expiredSubscribers}</h3>
            </div>
          </div>
        </div>

        {/* New This Week */}
        <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl flex-shrink-0 w-1/4 sm:w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-400" />
            <div className="lg:block">
              <p className="text-xs lg:text-sm text-gray-300 hidden lg:block">New This Week</p>
              <h3 className="text-base sm:text-lg lg:text-2xl font-bold">{stats.recentRegistrations}</h3>
            </div>
          </div>
        </div>
      </div>

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
                <option value="all" className="text-black">All Types</option>
                <option value="half-day (morning)" className="text-black">Half-day (morning)</option>
                <option value="half-day (night)" className="text-black">Half-day (night)</option>
                <option value="daily" className="text-black">Full day</option>
                <option value="weekly (day only)" className="text-black">Weekly (day-only)</option>
                <option value="weekly (full-access)" className="text-black">Weekly (full-access)</option>
                <option value="bi-weekly (day-only)" className="text-black">Bi-weekly (day-only)</option>
                <option value="bi-weekly (full-access)" className="text-black">Bi-weekly (full-access)</option>
                <option value="monthly (day-only)" className="text-black">Monthly (day-only)</option>
                <option value="monthly (full-access)" className="text-black">Monthly (full-access)</option>
              </select>
            </div>
          )}
        </div>

        {/* Status Filters (All / Active / Expiring / Expired) */}
        <div className="flex gap-2 md:flex-nowrap flex-wrap">
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
            key={sub._id}
            className="relative bg-white/10 backdrop-blur-md rounded-xl shadow-md p-5 flex flex-col justify-between text-center hover:shadow-lg transition group h-50 cursor-pointer"
            onClick={() => handleCardClick(sub)}
            onMouseEnter={() => handleCardHover(sub._id, true)}
            onMouseLeave={() => handleCardHover(sub._id, false)}
          >
            {/* Worker Type Badge */}
            <span className="absolute top-2 left-2 bg-white/20 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
              {sub.subscriberDetails?.subscriberType === 'SRS Worker' ? 'SRS' : 'REG'}
            </span>

            <div className="flex flex-col justify-start items-center flex-grow">
              <img
                src={sub.subscriberDetails?.image || avatar}
                alt={sub.subscriberDetails?.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white/20"
              />
              <h3
                className="text-lg font-semibold mt-2 max-w-full truncate"
                title={sub.subscriberDetails?.name}
              >
                {sub.subscriberDetails?.name}
              </h3>
            </div>

            {/* Card Footer Section: Status + Expiry */}
            <div className="mt-5 space-y-1 h-[50px] flex flex-col justify-center items-center">
              <span className={`px-3 py-1 text-xs rounded-full ${statusColors[sub.subscriberDetails?.status || 'active']}`}>
                {(sub.subscriberDetails?.status || 'active').charAt(0).toUpperCase() + (sub.subscriberDetails?.status || 'active').slice(1)}
              </span>
              <p className="text-xs text-gray-300">Expires on: {sub.subscriberDetails?.expiresOn || 'N/A'}</p>
            </div>

            {/* Detailed Info Overlay */}
            {hoveredCard === sub.id && (
              <div className="absolute inset-0 bg-gray-900/90 backdrop-blur-xl sm:hidden rounded-xl p-4 transform transition-all duration-300 ease-in-out z-10">
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                      />
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">{sub.name}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${statusColors[sub.status]}`}>
                          {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="text-left space-y-2">
                      <div>
                        <p className="text-xs text-gray-400">Subscription Type</p>
                        <p className="text-sm">{sub.subscriptionType.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Worker Type</p>
                        <p className="text-sm">{sub.type.toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Expiration Date</p>
                        <p className="text-sm">{sub.expiresOn}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditModal({ ...sub })}
                      className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal(sub)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Hover Actions */}
            <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
              <button
                onClick={() => setEditModal({
                  id: sub._id,
                  name: sub.subscriberDetails?.fullName || sub.subscriberDetails?.name,
                  status: sub.subscriberDetails?.status,
                  subscriptionType: sub.subscriberDetails?.subscriptionType,
                  paymentMode: sub.subscriberDetails?.paymentMode,
                  image: sub.subscriberDetails?.image,
                  subscriberType: sub.subscriberDetails?.subscriberType  // Add this line
                })}
                className="bg-white/20 hover:bg-white/30 text-white p-1 rounded-full"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => setDeleteModal({
                  id: sub._id,
                  name: sub.subscriberDetails?.fullName || sub.subscriberDetails?.name
                })}
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
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="half-day-morning">Half-day (Morning)</option>
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="half-day-night">Half-day (Night)</option>
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="daily">Daily</option>
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="weekly-day-only">Weekly (Day Only)</option>
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="weekly-full-access">Weekly (Full Access)</option>
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="bi-weekly-day-only">Bi-weekly (Day Only)</option>
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="bi-weekly-full-access">Bi-weekly (Full Access)</option>
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="monthly-day-only">Monthly (Day Only)</option>
                  <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="monthly-full-access">Monthly (Full Access)</option>
                </select>
              </div>

              {/* Payment Mode */}
              {/* Only show payment mode for SRS Worker */}
              {editModal.subscriberType === 'SRS Worker' && (
                <div className='mb-4'>
                  <label className="block mb-1 text-sm font-medium">Payment Mode</label>
                  <select
                    value={editModal.paymentMode || ''}
                    onChange={(e) => setEditModal({ ...editModal, paymentMode: e.target.value })}
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
                  >
                    <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="self">Self</option>
                    <option className="text-white rounded-lg bg-gray-700 border border-gray-600" value="company">Company</option>
                  </select>
                </div>
              )}

              {/* Save Button */}
              {/* Image Upload */}
              <div>
                <label className="block mb-1 text-sm font-medium">Profile Image</label>
                <div className="flex items-center gap-4">
                  <img
                    src={imagePreview || editModal.image}
                    alt={editModal.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white/30"
                  />
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                    <p className="text-xs text-gray-400 mt-1">Recommended: Square image, max 5MB</p>
                  </div>
                </div>
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

      {/* Detail Modal */}
      {detailModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={(e) => {
          if (e.target === e.currentTarget) {
            setDetailModal(null);
          }
        }}>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative">
            {/* Close button */}
            <button
              onClick={() => setDetailModal(null)}
              className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Image Section (50% height) */}
            <div className="h-[300px] relative">
              <img
                src={detailModal.image || avatar}
                alt={detailModal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">{detailModal.name}</h2>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${statusColors[detailModal.status]}`}>
                  {detailModal.status?.charAt(0).toUpperCase() + detailModal.status?.slice(1)}
                </span>
              </div>
            </div>

            {/* Details Section (50% height) */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Subscription Type</p>
                  <p className="text-white">{detailModal.subscriptionType}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Subscriber Type</p>
                  <p className="text-white">{detailModal.subscriberType}</p>
                </div>
                {detailModal.subscriberType === 'SRS Worker' && (
                  <div>
                    <p className="text-gray-400 text-sm">Payment Mode</p>
                    <p className="text-white">{detailModal.paymentMode}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-400 text-sm">Expires On</p>
                  <p className="text-white">{detailModal.expiresOn || 'N/A'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setEditModal(detailModal);
                    setDetailModal(null);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteModal({ id: detailModal.id, name: detailModal.name });
                    setDetailModal(null);
                  }}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}
