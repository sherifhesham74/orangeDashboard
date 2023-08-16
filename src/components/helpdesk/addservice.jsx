import React, { useState } from 'react';
import '../../css/helpdesk/add_service_form.css';
import { Link } from 'react-router-dom';

const AddServiceForm = ({defaultRequestNo, onAddService }) => {
  const [requestNo, setRequestNo] = useState('123'); // Default requestNo
  const [requesterName, setRequesterName] = useState('');
  const [requestDate, setRequestDate] = useState('');
  const [requestTime, setRequestTime] = useState('');
  const [providerName, setProviderName] = useState('');
  const [requestCategory, setRequestCategory] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [periodTime, setPeriodTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requesterName || !requestDate || !requestTime || !providerName || !requestCategory || !customerType || !periodTime) {
      alert('Please fill all the input fields');
      return;
    }
    const newService = {
        requestNo: defaultRequestNo,
      requestNo,
      requesterName,
      requestDate,
      requestTime,
      providerName,
      requestCategory,
      customerType,
      periodTime,
    };

    
    const existingData = JSON.parse(localStorage.getItem('serviceData')) || [];
  
    // Update the data array with the new service
    const newData = [...existingData, newService];
  
    // Save the updated data to local storage
    localStorage.setItem('serviceData', JSON.stringify(newData));
    // onAddService(newService);
    // Clear form fields after submission
    // Show success message
    setSuccessMessage('Service added successfully');


    setRequesterName('');
    setRequestDate('');
    setRequestTime('');
    setProviderName('');
    setRequestCategory('');
    setCustomerType('');
    setPeriodTime('');
  };

  return (
    <div className="add-service-form-container">
      <h2>Add New Service</h2>
      {successMessage && <p className="success-message">{successMessage} <br /> <a href="/requesttable"> [check here] </a>  </p> }
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Requester Name"
          value={requesterName}
          onChange={(e) => setRequesterName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Requeste date"
          value={requestDate}
          onChange={(e) => setRequestDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Requeste time"
          value={requestTime}
          onChange={(e) => setRequestTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="provider name"
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Requeste category"
          value={requestCategory}
          onChange={(e) => setRequestCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="customer type"
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="period time"
          value={periodTime}
          onChange={(e) => setPeriodTime(e.target.value)}
          required
        />
        {/* Add other input fields here */}
        <Link to="/helpdesk">
          <button type="submit" onClick={handleSubmit}>
            Add Service
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddServiceForm;
