import React, { useState } from 'react';
import { FaSort, FaFilter, FaEdit } from 'react-icons/fa';
import '../../css/program-dashboard-table.css';

function ProgramDashboardTable() {
  const [data, setData] = useState([
    { id: 1, name: 'Go Island', maxCapacity: 100 },
    { id: 2, name: 'Classic', maxCapacity: 75 },
    { id: 3, name: 'Go Island', maxCapacity: 100 },
    { id: 4, name: 'Classic 2', maxCapacity: 75 },
    { id: 5, name: 'omarina', maxCapacity: 100 },
    { id: 6, name: 'go orange', maxCapacity: 75 },
    // Add more data here...
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  // Pagination
  const itemsPerPage = 3; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-header-cell text-center" onClick={() => handleSort('name')}>
              Name
              <div className="icon-container">
                {sortConfig.key === 'name' && (
                  <FaSort className={sortConfig.direction === 'descending' ? 'sort-desc' : 'sort-asc'} />
                )}
                <FaFilter className="filter-icon" />
              </div>
            </th>
            <th className="table-header-cell text-center ml-5" onClick={() => handleSort('maxCapacity')}>
              Max Capacity
              <div className="icon-container">
                {sortConfig.key === 'maxCapacity' && (
                  <FaSort className={sortConfig.direction === 'descending' ? 'sort-desc' : 'sort-asc'} />
                )}
                <FaFilter className="filter-icon" />
              </div>
            </th>
            <th className="table-header-cell text-center ml-5">Details</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {currentItems.map((item) => (
            <tr key={item.id} className="table-row">
              <td className="table-cell text-center">{item.name}</td>
              <td className="table-cell text-center">{item.maxCapacity}</td>
              <td className="table-cell text-center">
                <FaEdit className="edit-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProgramDashboardTable;
