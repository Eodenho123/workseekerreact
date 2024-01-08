import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Fetch companies from API and update the state
    axios.get('https://workseekerrestapi.azurewebsites.net/api/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const handleRegister = () => {
    // Prepare data for API call
    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
      companyId: selectedCompany,
    };

    // Make API call for registration
    axios.post('https://workseekerrestapi.azurewebsites.net/api/register', userData)
      .then(response => {
        // Assuming the API returns user data upon successful registration
        const registeredUser = response.data;
        onRegister(registeredUser.username);
        alert(`Registration successful! Welcome, ${registeredUser.username}!`);
      })
      .catch(error => {
        // Display the error message from the API response, if available
        if (error.response && error.response.data) {
          alert(`Error registering user: ${error.response.data.message}`);
        } else {
          // If no specific error message is available, show a generic message
          alert('Error registering user. Please try again.');
        }
      });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Select Company:</label>
        <select onChange={e => setSelectedCompany(e.target.value)}>
          <option value="">Select Company</option>
          {companies.map(company => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;