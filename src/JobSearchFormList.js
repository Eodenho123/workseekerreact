import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobSearchFormsList.css'; // Import your CSS file for styling

const JobSearchFormsList = ({ companyId, onClose }) => {
  const [jobSearchForms, setJobSearchForms] = useState([]);

  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(
          `https://workseekerrestapi.azurewebsites.net/api/companies/${companyId}/search`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setJobSearchForms(response.data);
      } catch (error) {
        console.error('Error fetching job search:', error);
      }
    };

    fetchJobOffers();
  }, [companyId]);

  const handleDelete = async (formId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(
        `https://workseekerrestapi.azurewebsites.net/api/companies/${companyId}/search/${formId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the list after successful deletion
      setJobSearchForms((prevForms) =>
        prevForms.filter((form) => form.id !== formId)
      );
    } catch (error) {
      console.error('Error deleting job search form:', error);
    }
  };

  const handleEdit = (formId) => {
    // Implement the edit functionality if needed
    console.log(`Editing job search form with ID: ${formId}`);
  };

  return (
    <div className="job-search-forms-list">
      <h2>My Search Forms</h2>
      {jobSearchForms.map((form) => (
        <div key={form.id} className="job-search-form-row">
          <div className="job-search-form-details">
            <p>
              <strong>Title:</strong> {form.title}
            </p>
            <p>
              <strong>Description:</strong> {form.description}
            </p>
            <p>
              <strong>Experience:</strong> {form.experience}
            </p>
            <p>
              <strong>Skills:</strong> {form.skills}
            </p>
          </div>
          <div className="job-search-form-actions">
            <button className="edit-button" onClick={() => handleDelete(form.id)}>Delete</button>
          </div>
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default JobSearchFormsList;