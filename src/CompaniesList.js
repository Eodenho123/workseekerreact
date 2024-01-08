import React from 'react';
import './App.css';

const CompaniesList = ({ companies, onSelectCompany, onMySearchFormsClick }) => {
  return (
    <div>
      <h2>Companies</h2>
      <ul className="company-list">
        {companies.map(company => (
          <li key={company.id}>
            <button className='company-button' onClick={() => onSelectCompany(company.id)}>
              {company.name}
            </button>
            <button className='my-search-forms-button' onClick={() => onMySearchFormsClick(company.id)}>
              My Search Forms
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CompaniesList;