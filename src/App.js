// App.js
import React, { useState, useEffect } from 'react';
import CompaniesList from './CompaniesList';
import CompanyDetails from './CompanyDetails';
import EmployeeList from './EmployeeList';
import JobOfferList from './JobOfferList';
import JobSearchForm from './JobSearchFormList';
import Login from './Login';
import Register from './Register';
import axios from 'axios';
import CreateSearchFormPage from './CreateSearchFormPage';
import JobSearchFormsList from './JobSearchFormList';
import './App.css';

const App = () => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showCreateSearchForm, setShowCreateSearchForm] = useState(false);
  const [showJobOffers, setShowJobOffers] = useState(true);
  const [showJobSearchForms, setShowJobSearchForms] = useState(false);

  useEffect(() => {
    // Fetch companies, employees, and job offers from API
    axios.get('https://workseekerrestapi.azurewebsites.net/api/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));

    axios.get('https://workseekerrestapi.azurewebsites.net/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));

  }, []);

  const handleSelectCompany = (companyId) => {
    setSelectedCompany(companyId);
    setSelectedEmployee(null);
    setShowJobOffers(true);
    setShowJobSearchForms(false); // Add this line to hide job search forms
    axios
      .get(
        `https://workseekerrestapi.azurewebsites.net/api/companies/${companyId}/offers`
      )
      .then((response) => setJobOffers(response.data))
      .catch((error) => alert('Error fetching job offers:', error));
  };


  const handleMySearchFormsClick = (companyId) => {
    setSelectedCompany(companyId);
    setShowJobSearchForms(true);
    setShowJobOffers(false); // Add this line to hide job offers
  };

  const handleEmployeeClick = (employeeId) => {
    setSelectedEmployee(employeeId);
    setSelectedCompany(null); // Reset selected company when an employee is selected
  };

  const handleLogout = () => {
    setAuthenticatedUser(null);
    setSelectedCompany(null);
    setSelectedEmployee(null);

    localStorage.removeItem('accessToken');
  };

  const handleLogin = (username) => {
    setAuthenticatedUser(username);
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleRegister = (username) => {
    setAuthenticatedUser(username);
    setShowLogin(false);
    setShowRegister(false);
  };

  const toggleLoginRegister = () => {
    setShowLogin(!showLogin);
    setShowRegister(!showRegister);
  };

  const handleCreateSearchForm = () => {
    setShowCreateSearchForm(true);
  };

  const handleCloseCreateSearchForm = () => {
    setShowCreateSearchForm(false);
  };

  const handleBackToCompanies = () => {
    setShowCreateSearchForm(false);
  };

  return (
    <div className="app-container">
      <h1>WorkSeeker</h1>

      {!authenticatedUser && (
        <div className="login-register-container">
          {showLogin && <Login onLogin={handleLogin} />}
          {showRegister && <Register onRegister={handleRegister} />}
          <button onClick={toggleLoginRegister}>
            {showLogin ? 'Register' : 'Login'}
          </button>
        </div>
      )}

      {authenticatedUser && (
        <>
          <p>
            Welcome, {authenticatedUser}!{' '}
            <button onClick={handleLogout}>Logout</button>
          </p>

          {showCreateSearchForm && (
            <>
              <button onClick={handleBackToCompanies}>Back to Companies</button>
              <CreateSearchFormPage onClose={handleCloseCreateSearchForm} />
            </>
          )}

          {!selectedCompany && !selectedEmployee && !showCreateSearchForm && (
            <>
              <button onClick={handleCreateSearchForm}>Create Search Form</button>
              <CompaniesList
                companies={companies}
                onSelectCompany={handleSelectCompany}
                onMySearchFormsClick={handleMySearchFormsClick}
              />
            </>
          )}
          {showJobSearchForms && (
        <JobSearchFormsList
          companyId={selectedCompany}
          onClose={() => setShowJobSearchForms(false)}
        />
      )}

          {selectedCompany && !showCreateSearchForm && (
            <div>
              <button onClick={() => setSelectedCompany(null)}>
                Back to Companies
              </button>
              <CompanyDetails companyId={selectedCompany} dataType="offers" />
              <CompanyDetails
                companyId={selectedCompany}
                dataType="jobsearchforms"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;