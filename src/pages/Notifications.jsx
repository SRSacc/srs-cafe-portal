import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Bell, X } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext'; // ✅ context

dayjs.extend(relativeTime);

const statusColors = {
  expiring: 'text-yellow-400',
  expired: 'text-red-500',
};

export default function Notifications() {
  const { notifications, markAllAsRead } = useNotifications(); // ✅ get from context
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  // ✅ Mark all as read once the page is viewed
  useEffect(() => {
    markAllAsRead();
  }, []);

  return (
    <div className="text-white">
      <div className="mb-6">
        {/* <h1 className="text-3xl font-bold mb-1">Notifications</h1> */}
        <p className="text-gray-400">Latest subscription updates.</p>
      </div>

      {/* Notification List */}
      <ul className="space-y-4">
        {notifications
          .sort((a, b) => dayjs(b.expirationDate).unix() - dayjs(a.expirationDate).unix())
          .map((notif) => (
            <li
              key={notif.id}
              className="flex items-start gap-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition relative"
            >
              {/* Dot for new */}
              {notif.isNew && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}

              <img
                src={notif.image}
                alt={notif.name}
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />

              <div className="flex-1">
                <p className="text-sm">
                  <button
                    className="font-semibold hover:underline text-white"
                    onClick={() => setSelectedSubscriber(notif)}
                  >
                    {notif.name}
                  </button>{' '}
                  {notif.message}
                </p>
                <p className="text-xs text-gray-400">
                  {dayjs(notif.expirationDate).fromNow()}
                </p>
              </div>
            </li>
          ))}
      </ul>

      {/* Subscriber Detail Modal */}
      {selectedSubscriber && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-sm w-full text-white relative">
            <button
              onClick={() => setSelectedSubscriber(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <img
                src={selectedSubscriber.image}
                alt={selectedSubscriber.name}
                className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/20 mb-4"
              />
              <h3 className="text-xl font-bold mb-1">{selectedSubscriber.name}</h3>
              <p className={`text-sm mb-2 ${statusColors[selectedSubscriber.status]}`}>
                {selectedSubscriber.status === 'expiring' ? 'Expiring Soon' : 'Expired'}
              </p>

              <div className="text-sm text-gray-300 space-y-1">
                <p>
                  <span className="text-white">Subscription:</span>{' '}
                  {selectedSubscriber.subscriptionType}
                </p>
                <p>
                  <span className="text-white">Expires On:</span>{' '}
                  {dayjs(selectedSubscriber.expirationDate).format('MMM D, YYYY')}
                </p>
                <p>
                  <span className="text-white">Worker Type:</span>{' '}
                  {selectedSubscriber.type === 'srs' ? 'SRS' : 'Regular'}
                </p>
                {selectedSubscriber.paymentMode && (
                  <p>
                    <span className="text-white">Payment Mode:</span>{' '}
                    {selectedSubscriber.paymentMode}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
