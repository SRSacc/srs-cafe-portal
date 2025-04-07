import { useState, useEffect } from 'react';
import { CreditCard, Calendar, Clock, CheckCircle } from 'lucide-react';

const Subscription = () => {
  const [subscription, setSubscription] = useState({
    status: 'active',
    plan: 'Monthly (day-only)',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    remainingHours: 100,
    totalHours: 120
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        setLoading(true);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch('https://srsapp-api.onrender.com/api/subscription', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized access. Please login again.');
          } else if (response.status === 404) {
            throw new Error('No subscription found.');
          } else {
            throw new Error(`Failed to fetch subscription data: ${response.statusText}`);
          }
        }

        const data = await response.json();
        setSubscription(data);
      } catch (err) {
        if (err.name === 'AbortError') {
          setError('Request timeout. Please try again.');
        } else {
          setError(err.message);
        }
        console.error('Error fetching subscription:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Invalid date format:', error);
      return 'Invalid Date';
    }
  };

  if (loading) {
    return <div className="p-6">Loading subscription details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CreditCard className="text-blue-600" />
          Subscription Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Card */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className={subscription.status === 'active' ? 'text-green-600' : 'text-red-600'} />
              <h3 className="font-semibold">Status</h3>
            </div>
            <p className="text-lg capitalize">{subscription.status}</p>
          </div>

          {/* Plan Card */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="text-blue-600" />
              <h3 className="font-semibold">Current Plan</h3>
            </div>
            <p className="text-lg">{subscription.plan}</p>
          </div>

          {/* Date Range Card */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-blue-600" />
              <h3 className="font-semibold">Validity Period</h3>
            </div>
            <p className="text-lg">
              {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
            </p>
          </div>

          {/* Hours Card */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="text-blue-600" />
              <h3 className="font-semibold">Hours Usage</h3>
            </div>
            <div className="space-y-2">
              <p className="text-lg">
                {subscription.remainingHours} / {subscription.totalHours} hours remaining
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(subscription.remainingHours / subscription.totalHours) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Benefits */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Subscription Benefits</h3>
          <ul className="space-y-2">
          <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span>Steady Power Supply</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span>High-Speed Internet Connection</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span>24/7 Access to SRS Café Workspace</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span>Conducive Workspace</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Subscription;