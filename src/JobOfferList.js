import React from 'react';

const JobOfferList = ({ jobOffers }) => {
  return (
    <div>
      <h2>Job Offers</h2>
      <ul>
        {jobOffers.map(jobOffer => (
          <li key={jobOffer.id}>{jobOffer.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default JobOfferList;