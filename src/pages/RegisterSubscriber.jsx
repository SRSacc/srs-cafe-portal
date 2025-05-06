import { useState } from 'react';
import dayjs from 'dayjs';
import { User, Building2, Loader2 } from 'lucide-react';
import { registerSubscriber } from '../api/subscriber';
import { SUBSCRIPTION_TYPES, calculateEndTime, calculateExpirationDate, validateSubscriptionTiming } from '../utils/subscriptionUtils';
import {compressImage} from '../utils/imageCompression';
const Toast = ({ message, type = 'success' }) => (
  <div className={`fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg border ${type === 'error' ? 'border-red-400' : 'border-white/30'} animate-fade-in-up`}>
    {message}
  </div>
);

export default function RegisterSubscriber() {
  const [activeTab, setActiveTab] = useState('regular');
  const [regularData, setRegularData] = useState({ name: '', phoneNumber: '', referral: '', type: SUBSCRIPTION_TYPES.HALF_DAY_MORNING });
  const [srsData, setSrsData] = useState({ name: '', phoneNumber: '', referral: '', type: SUBSCRIPTION_TYPES.HALF_DAY_MORNING, paymentMode: 'Self' });
  const [startDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handleRegularChange = (e) => {
    setRegularData({ ...regularData, [e.target.name]: e.target.value });
  };

  const handleSrsChange = (e) => {
    setSrsData({ ...srsData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // create preview
        const previewUrl = URL.createObjectURL(file);
        setImage(previewUrl);
  
        // compress image
        const compressedFile = await compressImage(file);
        setCompressedImage(compressedFile);
      } catch (error) {
        console.error('Error compressing image:', error);
        setToast({ message: 'Error compressing image. Please try again.', type: 'error' });
        setTimeout(() => setToast({ message: '', type:'success' }), 3000);}
      // setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Validate form
    const data = activeTab === 'regular' ? regularData : srsData;
    const currentDateTime = dayjs();

    // Validate subscription timing
    const timeValidation = validateSubscriptionTiming(data.type, currentDateTime);
    if (!timeValidation.isValid) {
      setToast({ message: timeValidation.message, type: 'error' });
      setTimeout(() => setToast({ message: '', type:'success' }), 3000);
      return;
    }

    // Validate form
    if (!data.name.trim()) {
      setToast({ message: 'Please enter a name', type: 'error' });
      setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
      return;
    }
    if (!data.phoneNumber.trim()) {
      setToast({ message: 'Please enter a phone number', type: 'error' });
      setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
      return;
    }
    if (!data.type || data.type === 'Select type') {
      setToast({ message: 'Please select a subscription type', type: 'error' });
      setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('referral', data.referral);
    formData.append('subscriptionType', data.type);
    formData.append('subscriberType', activeTab === 'regular' ? 'Regular Subscriber' : 'SRS Worker');
    formData.append('startDateTime', currentDateTime.format('YYYY-MM-DD HH:mm:ss')); // Format current date and time
    formData.append('endDateTime', calculateEndTime(currentDateTime, data.type));
    formData.append('expirationDate',calculateExpirationDate(currentDateTime, data.type).format('YYYY-MM-DD HH:mm:ss'));  // Format expiration date and time
    // formData.append('startDate', startDate);
    formData.append('workerType', activeTab);

    if (activeTab === 'srs') {
      formData.append('paymentMode', data.paymentMode);
    }

    if (compressedImage) {
      formData.append('image', compressedImage);
    } else if (image) {
      const file = document.querySelector('input[type="file"]').files[0];
      formData.append('image', file);
    }

    setLoading(true);
    try {
      await registerSubscriber(formData);
      setToast({ message: 'Subscriber registered successfully!', type: 'success' });
      // Reset form
      if (activeTab === 'regular') {
        setRegularData({ name: '', phoneNumber: '', referral: '', type: SUBSCRIPTION_TYPES.HALF_DAY_MORNING });
      } else {
        setSrsData({ name: '', phoneNumber: '', referral: '', type: SUBSCRIPTION_TYPES.HALF_DAY_MORNING, paymentMode: 'Self' });
      }
      setImage(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setToast({ 
        message: 'Network error. Please try again later.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
    }
  };


  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg m:p-10 px-5 py-10 rounded-3xl shadow-2xl text-white">
      <h2 className="text-2xl m:text-3xl font-bold mb-8 text-center text-balance">Register New Subscriber</h2>

      {/* Tab Switch */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-white/10 w-full rounded-full p-1 gap-2">
          <button
            className={`px-1 sm:px-6 py-1 sm:py-2 rounded-full flex items-center text-center gap-1 sm:gap-2 text-sm transition w-1/2 ${activeTab === 'regular' ? 'bg-white text-black font-semibold' : 'text-white hover:bg-white/20'}`}
            onClick={() => setActiveTab('regular')}
          >
            <User size={16} /> Regular Subscriber
          </button>
          <button
            className={`px-1 sm:px-6 py-1 sm:py-2 rounded-full flex items-center text-center gap-1 sm:gap-2 text-sm transition w-1/2 ${activeTab === 'srs' ? 'bg-white text-black font-semibold' : 'text-white hover:bg-white/20'}`}
            onClick={() => setActiveTab('srs')}
          >
            <Building2 size={16} /> SRS Worker
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={activeTab === 'regular' ? regularData.name : srsData.name}
            onChange={activeTab === 'regular' ? handleRegularChange : handleSrsChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter full name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={activeTab === 'regular' ? regularData.phoneNumber : srsData.phoneNumber}
            onChange={activeTab === 'regular' ? handleRegularChange : handleSrsChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter phone number"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Referral</label>
          <input
            type="text"
            name="referral"
            value={activeTab === 'regular' ? regularData.referral : srsData.referral}
            onChange={activeTab === 'regular' ? handleRegularChange : handleSrsChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter referral name or code"
        
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Subscription Type</label>
          <select
            name="type"
            value={activeTab === 'regular' ? regularData.type : srsData.type}
            onChange={activeTab === 'regular' ? handleRegularChange : handleSrsChange}
            className="w-full bg-white/20 border border-white/30 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option label="Select type"></option>
            <option value="Half-day (morning)" className="text-black">Half-day (morning)</option>
            <option value="Half-day (night)" className="text-black">Half-day (night)</option>
            <option value="Full day" className="text-black">Full day</option>
            <option value="Weekly (day-only)" className="text-black">Weekly (day-only)</option>
            <option value="Weekly (full-access)" className="text-black">Weekly (full-access)</option>
            <option value="Bi-weekly (day-only)" className="text-black">Bi-weekly (day-only)</option>
            <option value="Bi-weekly (full-access)" className="text-black">Bi-weekly (full-access)</option>
            <option value="Monthly (day-only)" className="text-black">Monthly (day-only)</option>
            <option value="Monthly (full-access)" className="text-black">Monthly (full-access)</option>
          </select>
        </div>

        {activeTab === 'srs' && (
          <div>
            <label className="block mb-1 text-sm font-medium">Payment Mode</label>
            <select
              name="paymentMode"
              value={srsData.paymentMode}
              onChange={handleSrsChange}
              className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option className="text-black" value="Self">Self</option>
              <option className="text-black" value="Company">Company</option>
            </select>
          </div>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium">Date of Subscription</label>
          <input
            type="text"
            value={startDate}
            disabled
            className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-white text-black font-semibold py-3 rounded-lg transition shadow-md flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-200'}`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Registering...
              </>
            ) : (
              'Register Subscriber'
            )}
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      {toast.message && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
