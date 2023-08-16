import React, { useState } from 'react';
import '../../css/sidebar.css';


function Sidebar({ setSelectedTab }) {
  const [openDropdown, setOpenDropdown] = useState('');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setOpenDropdown('');
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? '' : dropdown);
  };

  return (
    <div className="sidebar">
      <h2>OrangBay</h2>
      <ul>
        <li onClick={() => handleTabClick("Reservations")} className="tab">
          Reservations
        </li>
        <li className={`dropdown ${openDropdown === "Maintains" && "open"}`}>
          <div
            onClick={() => toggleDropdown("Maintains")}
            className="dropdown-btn"
          >
            Maintains{" "}
            <span className={`arrow ${openDropdown === "Maintains" && "open"}`}>
              &#9660;
            </span>
          </div>
          {openDropdown === "Maintains" && (
            <div className="dropdown-content">
              <div onClick={() => handleTabClick("Service Categories")}>
                Service Categories
              </div>
              <div onClick={() => handleTabClick("Programs")}>Programs</div>
              <div onClick={() => handleTabClick("Services")}>Services</div>
              <div onClick={() => handleTabClick("User Types")}>User Types</div>
            </div>
          )}
        </li>
        <li className={`dropdown ${openDropdown === "Tasks" && "open"}`}>
          <div onClick={() => toggleDropdown("Tasks")} className="dropdown-btn">
            Tasks  <span className={`arrow ${openDropdown === 'Tasks' && 'open'}`}>&#9660;</span>
          </div>
          {openDropdown === "Tasks" && (
            <div className="dropdown-content">
              <div onClick={() => handleTabClick("Customer Users")}>
                Customer Users
              </div>
              <div onClick={() => handleTabClick("User Managment")}>
                User Managment
              </div>
            </div>
          )}
        </li>
        {/* Add other tabs and dropdowns */}
      </ul>
    </div>
  );
}

export default Sidebar;
