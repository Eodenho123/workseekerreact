import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Prepare data for API call
    const loginData = {
      username,
      password,
    };

    // Make API call for login
    axios.post('https://workseekerrestapi.azurewebsites.net/api/login', loginData)
      .then(response => {
        // Assuming the API returns a token upon successful login
        const token = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        if (token) {
          // If a token is returned, consider the user as logged in
          onLogin(username);
          localStorage.setItem('accessToken', token);
          localStorage.setItem('refreshToken',refreshToken)
          alert(`Welcome back, ${username}!`);
        } else {
          // Handle case where the API response does not contain a token (login failed)
          alert('Login failed: No token received.');
        }
      })
      .catch(error => {
        // Display the error message from the API response, if available
        if (error.response && error.response.data) {
          alert(`Error logging in: ${error.response.data.message}`);
        } else {
          // If no specific error message is available, show a generic message
          alert('Error logging in. Please try again.');
        }
      });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;