import React, { useState } from 'react';
import './styles/Supervisor.css';

const Supervisor = ({ workers, addWorker, deleteWorker }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', rate: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddWorker = () => {
    if (formData.firstName && formData.lastName && formData.email && formData.rate) {
      addWorker(formData);
      setFormData({ firstName: '', lastName: '', email: '', rate: '' }); // Reset form
    }
  };

  return (
    <div className="supervisor-container">
      <h1>Supervisor View</h1>
      <div className="input-container">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rate"
          placeholder="Rate"
          value={formData.rate}
          onChange={handleChange}
        />
        <button onClick={handleAddWorker}>Add</button>
      </div>
      <table className='data-table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Rate</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker, index) => (
            <tr key={index}>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.email}</td>
              <td>{worker.rate}</td>
              <td>
                <button onClick={() => deleteWorker(worker.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Supervisor;
