const API_URL = 'https://srsapp-api.onrender.com/api';

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
  const response = await fetch(`${API_URL}/users/subscribers/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return handleResponse(response);
}
