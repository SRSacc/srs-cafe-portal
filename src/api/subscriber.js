import { mockSubscribers } from '../mocks/subscriberData';

const API_URL = 'https://srsapp-api.onrender.com/api';

// Helper function to check if we should use mock data
const shouldUseMockData = () => {
  const token = localStorage.getItem('token');
  return !token || token === 'mock-token';
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// Get all subscribers
export async function getSubscribers(page = 1, limit = 12) {
  // Use mock data if no token is present
  if (shouldUseMockData()) {
    // Simulate pagination with mock data
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = mockSubscribers.slice(start, end);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          subscribers: paginatedData,
          pagination: {
            total: mockSubscribers.length,
            page: page,
            limit: limit,
            pages: Math.ceil(mockSubscribers.length / limit)
          }
        });
      }, 300); // Simulate network delay
    });
  }

  const response = await fetch(`${API_URL}/users/subscribers?page=${page}&limit=${limit}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
}

// Register new subscriber
export async function registerSubscriber(formData) {
  const response = await fetch(`${API_URL}/users/subscribers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  return handleResponse(response);
}

// Update subscriber
export async function updateSubscriber(id, data) {
  // In mock mode, just simulate success
  if (shouldUseMockData()) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Subscriber updated successfully (mock)' });
      }, 300);
    });
  }

  const isImageUpdate = id.includes('/image');
  
  const response = await fetch(`${API_URL}/users/subscribers/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      ...(!isImageUpdate && { 'Content-Type': 'application/json' })
    },
    body: isImageUpdate ? data : JSON.stringify(data),
  });
  return handleResponse(response);
}

// Delete subscriber
export async function deleteSubscriber(id) {
  // In mock mode, just simulate success
  if (shouldUseMockData()) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Subscriber deleted successfully (mock)' });
      }, 300);
    });
  }

  const response = await fetch(`${API_URL}/users/subscribers/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
}
