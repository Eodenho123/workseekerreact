// EmployeeList.js
import React from 'react';

const EmployeeList = ({ employees, onEmployeeClick }) => {
  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id} onClick={() => onEmployeeClick(employee.id)}>
            {employee.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;