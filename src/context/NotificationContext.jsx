// src/context/NotificationContext.jsx
import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      message: 'Subscription expires in 12 hours',
      status: 'expiring',
      expirationDate: '2025-03-29',
      isNew: true,
      image: '/avatar1.png',
      type: 'srs',
      subscriptionType: 'weekly-full-access',
      paymentMode: 'self',
    },
    {
      id: 2,
      name: 'Emmanuel O.',
      message: 'Subscription expired today',
      status: 'expired',
      expiresOn: '2025-03-28',
      isNew: true,
      image: '/avatar2.png',
      type: 'regular',
      subscriptionType: 'monthly-day-only',
      paymentMode: null,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isNew: false }))
    );
  };

  const newCount = notifications.filter((n) => n.isNew).length;

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, markAllAsRead, newCount }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);