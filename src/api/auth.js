  // Function to fetch (POST) user data
export async function loginUser({ username, password, role }) {
    const response = await fetch('https://srsapp-api.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
  
    return response.json(); // expected: { token, user }
  }
  

  // Function to fetch (GET) user data
export async function fetchUserData(token) {
  const response = await fetch('https://srsapp-api.onrender.com/api/users/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return response.json(); // Expected to return user data like { username, role, etc. }
}
