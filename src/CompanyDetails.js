import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompanyDetails.css';
import CreateSearchFormPage from './CreateSearchFormPage';

const JobOfferDetails = ({ offer }) => {
  return (
    <div className="job-offer-details">
      <h3 className="offer-title">{offer.title}</h3>
      <div className="offer-details">
        <p><strong>Start Date:</strong> {offer.startDate}</p>
        <p><strong>End Date:</strong> {offer.endDate}</p>
        <p><strong>Description:</strong> {offer.description}</p>
        <p><strong>Requirements:</strong> {offer.requirements}</p>
      </div>
    </div>
  );
};

const ApplyForm = ({ handleApply, setExperience, setSkills, experience, skills }) => {
  return (
    <div className="apply-form">
      <label htmlFor="experience">Experience:</label>
      <input
        type="text"
        id="experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <label htmlFor="skills">Skills:</label>
      <input
        type="text"
        id="skills"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <button onClick={handleApply}>Apply</button>
    </div>
  );
};

const CompanyDetails = ({ companyId, dataType }) => {
  const [jobOffers, setJobOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [showCreateSearchForm, setShowCreateSearchForm] = useState(false);

  const [showJobOffers, setShowJobOffers] = useState(true);
  const [showCreateSearchButton, setShowCreateSearchButton] = useState(true);

  useEffect(() => {
    axios.get(`https://workseekerrestapi.azurewebsites.net/api/companies/${companyId}/offers`)
      .then(response => setJobOffers(response.data))
      .catch(error => console.error('Error fetching job offers:', error));
  }, [companyId]);

  const handleOfferClick = (offerId) => {
    const offer = jobOffers.find(offer => offer.id === offerId);
    setSelectedOffer(offer);
  };


  const handleApply = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `https://workseekerrestapi.azurewebsites.net/api/companies/${companyId}/offers/${selectedOffer.id}/applications`,
        {
          ApplicationDate: new Date().toISOString(),
          Experience: experience,
          Skills: skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert('Application submitted successfully:', response.data);
      // Reset the form after successful submission
      setExperience('');
      setSkills('');
      setSelectedOffer('');
    } catch (error) {
      alert('Error submitting application:', error);
    }
  };

  return (
    <div className="company-details">

      {showJobOffers && dataType === 'offers' && (
        <div>
          <h2>Job Offers</h2>
          <ul className="job-offer-list">
            {jobOffers.map(offer => (
              <li key={offer.id}>
                <button onClick={() => handleOfferClick(offer.id)}>{offer.title}</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedOffer && (
        <>
          <JobOfferDetails offer={selectedOffer} />
          <ApplyForm
            handleApply={handleApply}
            setExperience={setExperience}
            setSkills={setSkills}
            experience={experience}
            skills={skills}
          />
        </>
      )}
    </div>
  );
};

export default CompanyDetails;