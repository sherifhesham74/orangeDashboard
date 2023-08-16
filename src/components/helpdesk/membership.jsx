import React, { useState } from 'react';
import '../../css/helpdesk/requst_table.css';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; // Import the date picker
import Modal from 'react-modal';

import 'react-datepicker/dist/react-datepicker.css';
const MembershipTable = () => {
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
      RequestID: "001",
      RequestName: "John",
      Number: "12345",
      Email: "orange@admin",
      Occupation: "Individual",
      MembershipType: "Shark Pass",
    },
    {
      RequestID: "003",
      RequestName: "yara",
      Number: "62984",
      Email: "omarina@admin",
      Occupation: "Company",
      MembershipType: "Mermaid",
    },
    {
      RequestID: "004",
      RequestName: "sherif",
      Number: "11522",
      Email: "omarina@admin",
      Occupation: "Individual",
      MembershipType: "Mermaid",
    },
    {
      RequestID: "005",
      RequestName: "Loaa",
      Number: "33396",
      Email: "omarina@admin",
      Occupation: "Company",
      MembershipType: "Mermaid",
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
    <div className="container">
    
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
    
        <select className='search-input ' onChange={(e) => handleFilter('MembershipType', e.target.value)}>
          <option value="">Filter by membership Type</option>
          <option value="Shark Pass">Shark Pass</option>
          <option value="Mermaid"> Mermaid </option>
          {/* Add type options here */}
        </select>
      </div>
    
      <div className="table-container">
      {filteredData.length === 0 ? (
          <p className="no-data-message">No matching data found. <a href="/helpdesk">[return to table]</a> </p>
        ) : (
        <table className="table">
          <thead > 
            <tr>
              <th >Request ID</th>
              <th>Requester Name</th>
              <th>Number</th>
              <th>Email</th>
              <th>Occupation</th>
              <th>Membership Type</th>
              <th>Details</th>
           
            </tr>
          </thead>
          <tbody >
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.RequestID}</td>
                <td>{item.RequestName}</td>
                <td>{item.Number}</td>
                <td>{item.Email}</td>
                <td>{item.Occupation}</td>
                <td>{item.MembershipType}</td>
               
                <td>
                <i
                className="fas fa-angle-double-right detail-button"
                onClick={() => openModal(item)}
              ></i>                 </td>
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
            <h6>Request ID: {selectedItem.RequestID}</h6>
            <h6>Request Name: {selectedItem.RequestName}</h6>
            <h6>Email: {selectedItem.Email}</h6>
            <h6>Occupation: {selectedItem.Occupation}</h6>
            <h6>Membership Type: {selectedItem.MembershipType}</h6>
            {/* Add more details here */}
            <button onClick={closeModal} className='search-button mt-5'>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MembershipTable;
