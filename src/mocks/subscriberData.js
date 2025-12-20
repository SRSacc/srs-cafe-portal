// Mock subscriber data for development
export const mockSubscribers = [
  {
    _id: '1',
    subscriberDetails: {
      fullName: 'John Doe',
      name: 'John Doe',
      status: 'active',
      subscriptionType: 'Monthly (full-access)',
      paymentMode: 'Self',
      image: null,
      subscriberType: 'SRS Worker',
      startDateTime: '2025-12-01 09:00:00',
      endDateTime: '2025-12-01 17:00:00',
      expirationDate: '2026-01-01 17:00:00'
    },
    createdAt: '2025-11-25T10:00:00Z'
  },
  {
    _id: '2',
    subscriberDetails: {
      fullName: 'Jane Smith',
      name: 'Jane Smith',
      status: 'expiring',
      subscriptionType: 'Weekly (day-only)',
      paymentMode: 'Company',
      image: null,
      subscriberType: 'SRS Worker',
      startDateTime: '2025-12-15 08:00:00',
      endDateTime: '2025-12-15 16:00:00',
      expirationDate: '2025-12-22 16:00:00'
    },
    createdAt: '2025-12-15T08:00:00Z'
  },
  {
    _id: '3',
    subscriberDetails: {
      fullName: 'Bob Johnson',
      name: 'Bob Johnson',
      status: 'expired',
      subscriptionType: 'Daily',
      paymentMode: null,
      image: null,
      subscriberType: 'Regular',
      startDateTime: '2025-12-10 10:00:00',
      endDateTime: '2025-12-10 18:00:00',
      expirationDate: '2025-12-11 18:00:00'
    },
    createdAt: '2025-12-10T10:00:00Z'
  },
  {
    _id: '4',
    subscriberDetails: {
      fullName: 'Alice Williams',
      name: 'Alice Williams',
      status: 'active',
      subscriptionType: 'Bi-weekly (full-access)',
      paymentMode: 'Self',
      image: null,
      subscriberType: 'SRS Worker',
      startDateTime: '2025-12-05 09:00:00',
      endDateTime: '2025-12-05 17:00:00',
      expirationDate: '2025-12-19 17:00:00'
    },
    createdAt: '2025-12-05T09:00:00Z'
  },
  {
    _id: '5',
    subscriberDetails: {
      fullName: 'Charlie Brown',
      name: 'Charlie Brown',
      status: 'active',
      subscriptionType: 'Half-day (morning)',
      paymentMode: null,
      image: null,
      subscriberType: 'Regular',
      startDateTime: '2025-12-18 06:00:00',
      endDateTime: '2025-12-18 12:00:00',
      expirationDate: '2025-12-19 12:00:00'
    },
    createdAt: '2025-12-18T06:00:00Z'
  },
  {
    _id: '6',
    subscriberDetails: {
      fullName: 'Diana Prince',
      name: 'Diana Prince',
      status: 'expiring',
      subscriptionType: 'Monthly (day-only)',
      paymentMode: 'Company',
      image: null,
      subscriberType: 'SRS Worker',
      startDateTime: '2025-11-20 09:00:00',
      endDateTime: '2025-11-20 17:00:00',
      expirationDate: '2025-12-21 17:00:00'
    },
    createdAt: '2025-11-20T09:00:00Z'
  },
  {
    _id: '7',
    subscriberDetails: {
      fullName: 'Ethan Hunt',
      name: 'Ethan Hunt',
      status: 'active',
      subscriptionType: 'Weekly (full-access)',
      paymentMode: 'Self',
      image: null,
      subscriberType: 'SRS Worker',
      startDateTime: '2025-12-14 08:00:00',
      endDateTime: '2025-12-14 20:00:00',
      expirationDate: '2025-12-21 20:00:00'
    },
    createdAt: '2025-12-14T08:00:00Z'
  },
  {
    _id: '8',
    subscriberDetails: {
      fullName: 'Fiona Green',
      name: 'Fiona Green',
      status: 'expired',
      subscriptionType: 'Half-day (night)',
      paymentMode: null,
      image: null,
      subscriberType: 'Regular',
      startDateTime: '2025-12-12 18:00:00',
      endDateTime: '2025-12-13 00:00:00',
      expirationDate: '2025-12-13 00:00:00'
    },
    createdAt: '2025-12-12T18:00:00Z'
  },
  {
    _id: '9',
    subscriberDetails: {
      fullName: 'George Miller',
      name: 'George Miller',
      status: 'active',
      subscriptionType: 'Monthly (full-access)',
      paymentMode: 'Company',
      image: null,
      subscriberType: 'SRS Worker',
      startDateTime: '2025-11-22 09:00:00',
      endDateTime: '2025-11-22 17:00:00',
      expirationDate: '2025-12-22 17:00:00'
    },
    createdAt: '2025-11-22T09:00:00Z'
  },
  {
    _id: '10',
    subscriberDetails: {
      fullName: 'Hannah White',
      name: 'Hannah White',
      status: 'active',
      subscriptionType: 'Daily',
      paymentMode: null,
      image: null,
      subscriberType: 'Regular',
      startDateTime: '2025-12-20 10:00:00',
      endDateTime: '2025-12-20 18:00:00',
      expirationDate: '2025-12-21 18:00:00'
    },
    createdAt: '2025-12-20T10:00:00Z'
  },
  {
    _id: '11',
    subscriberDetails: {
      fullName: 'Ian Foster',
      name: 'Ian Foster',
      status: 'expiring',
      subscriptionType: 'Bi-weekly (day-only)',
      paymentMode: 'Self',
      image: null,
      subscriberType: 'SRS Worker',
      startDateTime: '2025-12-07 08:00:00',
      endDateTime: '2025-12-07 16:00:00',
      expirationDate: '2025-12-21 16:00:00'
    },
    createdAt: '2025-12-07T08:00:00Z'
  },
  {
    _id: '12',
    subscriberDetails: {
      fullName: 'Julia Roberts',
      name: 'Julia Roberts',
      status: 'active',
      subscriptionType: 'Weekly (day-only)',
      paymentMode: 'Company',
      image: null,
      subscriberType: 'SRS Worker',
      startDateTime: '2025-12-16 09:00:00',
      endDateTime: '2025-12-16 17:00:00',
      expirationDate: '2025-12-23 17:00:00'
    },
    createdAt: '2025-12-16T09:00:00Z'
  }
];

export const mockUserData = {
  data: {
    username: 'demo-admin',
    role: 'Admin1'
  }
};
