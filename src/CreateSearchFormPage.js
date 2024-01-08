import React, { useState } from 'react';
import axios from 'axios';

const CreateSearchFormPage = ({ companyId, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleCreateForm = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Assuming you have stored the token in localStorage

      // Prepare data for API call
      const formData = {
        Title: title,
        Description: description,
        Experience: experience,
        Skills: skills,
        Requirements: requirements,
      };

      // Make API call for creating search form
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        // Handle case where refreshToken is not available
        alert('Refresh token not found. Please log in.');
        return;
      }

      // Make API call to get current user using refreshToken
      const currUserResponse = await axios.post(
        'https://workseekerrestapi.azurewebsites.net/api/currentUser',
        {
          refreshToken: refreshToken,
        }
      );
    const currentUser = currUserResponse.data;
    const compId = currentUser.companyId;
    console.log(currentUser);
    const response = await axios.post(
        `https://workseekerrestapi.azurewebsites.net/api/companies/${compId}/search`,
        formData,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );

      console.log('Search form created successfully:', response.data);

      // Reset the form after successful creation
      setTitle('');
      setDescription('');
      setExperience('');
      setSkills('');
      setRequirements('');

      // Close the page
      onClose();
    } catch (error) {
      alert('Error creating search form:', error);
    }
  };

  return (
    <div className="create-search-form">
      <h2>Create Search Form</h2>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Experience:</label>
        <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Skills:</label>
        <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Requirements:</label>
        <input type="text" value={requirements} onChange={(e) => setRequirements(e.target.value)} />
      </div>
      <button onClick={handleCreateForm}>Create Search Form</button>
    </div>
  );
};

export default CreateSearchFormPage;