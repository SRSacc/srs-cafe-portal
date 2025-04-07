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
export async function getSubscribers() {
  const response = await fetch(`${API_URL}/users/subscribers`, {
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
  const response = await fetch(`${API_URL}/users/subscribers/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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
