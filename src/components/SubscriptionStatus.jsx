import { getSubscriptionStatus } from '../utils/subscriptionUtils';

export const SubscriptionStatus = ({ startDateTime, endDateTime, expirationDate }) => {
  const { status, message } = getSubscriptionStatus(startDateTime, endDateTime, expirationDate);

  const statusColors = {
    pending: 'bg-blue-500',
    active: 'bg-green-500',
    expiring: 'bg-yellow-500',
    expired: 'bg-red-500'
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${statusColors[status]}`}></span>
      <span className="text-sm">{message}</span>
    </div>
  );
};