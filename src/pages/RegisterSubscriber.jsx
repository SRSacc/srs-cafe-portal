import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { User, Building2 } from 'lucide-react';

export default function RegisterSubscriber() {
  const [activeTab, setActiveTab] = useState('regular');
  const [regularData, setRegularData] = useState({ name: '', phone: '', referral: '', type: 'daily' });
  const [srsData, setSrsData] = useState({ name: '', phone: '', referral: '', type: 'daily', paymentMode: 'self' });
  const [startDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [image, setImage] = useState(null);

  const handleRegularChange = (e) => {
    setRegularData({ ...regularData, [e.target.name]: e.target.value });
  };

  const handleSrsChange = (e) => {
    setSrsData({ ...srsData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = activeTab === 'regular'
      ? { ...regularData, startDate, image }
      : { ...srsData, startDate, image };

    console.log('Registering Subscriber:', data);
    // Add API call or alert here
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Register New Subscriber</h2>

      {/* Tab Switch */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-white/10 rounded-full p-1 gap-2">
          <button
            className={`px-6 py-2 rounded-full flex items-center gap-2 text-sm transition ${
              activeTab === 'regular' ? 'bg-white text-black font-semibold' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('regular')}
          >
            <User size={16} /> Regular Subscriber
          </button>
          <button
            className={`px-6 py-2 rounded-full flex items-center gap-2 text-sm transition ${
              activeTab === 'srs' ? 'bg-white text-black font-semibold' : 'text-white hover:bg-white/20'
            }`}
            onClick={() => setActiveTab('srs')}
          >
            <Building2 size={16} /> SRS Worker
          </button>
        </div>
      </div>

      {/* Dynamic Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block mb-1 text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={activeTab === 'regular' ? regularData.name : srsData.name}
            onChange={activeTab === 'regular' ? handleRegularChange : handleSrsChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter full name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={activeTab === 'regular' ? regularData.phone : srsData.phone}
            onChange={activeTab === 'regular' ? handleRegularChange : handleSrsChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
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
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Enter referral name or code"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Subscription Type</label>
          <select
            name="type"
            value={activeTab === 'regular' ? regularData.type : srsData.type}
            onChange={activeTab === 'regular' ? handleRegularChange : handleSrsChange}
            className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option className="text-black" value="daily">Daily</option>
            <option className="text-black" value="weekly">Weekly</option>
            <option className="text-black" value="monthly">Monthly</option>
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
              <option className="text-black" value="self">Self</option>
              <option className="text-black" value="company">Company</option>
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
          {/* Preview Image necessary? */}
          {/* {image && <img src={image} alt="Preview" className="mt-4 h-28 w-28 object-cover rounded-full border-2 border-white/30" />} */}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition shadow-md"
          >
            Register Subscriber
          </button>
        </div>
      </form>
    </div>
  );
}
