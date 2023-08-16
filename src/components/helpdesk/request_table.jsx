import React, { useState } from 'react';
import '../../css/helpdesk/requst_table.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Import the date picker
import 'react-datepicker/dist/react-datepicker.css';
const RequestTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  const [data, setData] = useState([
    {
      programNo: '001',
      UserName: 'Tarek',
      Number: '12345',
      Date: '2023-08-25',
      Type: 'Individual',
      ProgramType: 'Orange bay',
      Payment: 'Credit Card',
      Provider: 'Orange bay',
    },
    {
      programNo: '002',
      UserName: 'Tarek Fouad',
      Number: '67890',
      Date: '2023-08-26',
      Type: 'Company',
      ProgramType: 'Omarina',
      Payment: 'PayPal',
      Provider: 'Omarina',
    },
    // Add more fake data here...
  ]);

  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = () => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleFilter = (field, value) => {
    const filtered = data.filter((item) => item[field] === value);
    setFilteredData(filtered);
  };

  const itemsPerPage = 4; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-3">
     
      {/* Filter Inputs */}
      <div className="search-container float-right mt-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        <i onClick={handleSearch} className="fas fa-search search-button"></i>
      </div>
      <div className="filter-container float-left mt-1">   
      {/* Date Picker */}
      <div className="date-picker-container ">
          <DatePicker
            selected={new Date()} // Set the selected date value
            onChange={(date) => console.log(date)} // Handle date change
            className="date-picker-input"
          />
        </div>

        <select className='search-input' onChange={(e) => handleFilter('Provider', e.target.value)}>
          <option value="">Filter by Provider</option>
          <option value="Orange bay">Orange bay</option>
          <option value="Omarina">Omarina </option>
          {/* Add provider options here */}
        </select>

        <select onChange={(e) => handleFilter('Payment', e.target.value)} className='search-input'>
          <option value="">Filter by Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="PayPal">Paypal</option>
          <option value="Credit Card">Credit Card</option>
          {/* Add payment method options here */}
        </select>

        <select className='search-input' onChange={(e) => handleFilter('Type', e.target.value)}>
          <option value="">Filter by Type</option>
          <option value="Company">Company</option>
          <option value="Individual"> Individual </option>
          {/* Add type options here */}
        </select>
      </div>
    
      <div className="table-container">
      {filteredData.length === 0 ? (
          <p className="no-data-message">No matching data found. <a href="/helpdesk">[return to table]</a> </p>
        ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Program No</th>
              <th>Username</th>
              <th>Number</th>
              <th>Date</th>
              <th>Type</th>
              <th>Program Type</th>
              <th>Payment</th>
              <th>Provider</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.programNo}</td>
                <td>{item.UserName}</td>
                <td>{item.Number}</td>
                <td>{item.Date}</td>
                <td>{item.Type}</td>
                <td>{item.ProgramType}</td>
                <td>{item.Payment}</td>
                <td>{item.Provider}</td>
                <td>
                <i
                className="fas fa-angle-double-right detail-button"
                onClick={() => openModal(item)}
              ></i>                </td>
              </tr>
            ))}
          </tbody>
        </table>
         )}
       
        <div className="pagination">
          {Array.from({
            length: Math.ceil(filteredData.length / itemsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Details Modal"
        className="modal "
        overlayClassName="overlay"
      >
        {selectedItem && (
          <div className='float-right'>
            <h2 className=''>Details</h2>
            <h6>Program No: {selectedItem.programNo}</h6>
            <h6>Username: {selectedItem.UserName}</h6>
            <h6>Number: {selectedItem.Number}</h6>
            <h6>Date: {selectedItem.Date}</h6>
            <h6>Type: {selectedItem.Type}</h6>
            {/* Add more details here */}
            <button onClick={closeModal} className='search-button'>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RequestTable;
