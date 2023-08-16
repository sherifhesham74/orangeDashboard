import React, { useEffect, useState } from 'react';
import '../../css/dahsboard.css';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css'; // Import the sidebar styles
import { FaHome, FaCalendar, FaShoppingCart, FaFileAlt, FaClipboardList, FaTools, FaTasks, FaUser, FaCogs, FaQuestionCircle } from 'react-icons/fa';
import { Link, Route, Routes } from 'react-router-dom';
import Reservations from '../reservations/reservation';
import ProgramDashboardTable from '../programs/programtable';
import HelpDesk from '../helpdesk/helpdesk';
import RequestTable from '../helpdesk/request_table';
import AddServiceForm from '../helpdesk/addservice';
import { useLocation } from 'react-router-dom';
import MembershipTable from '../helpdesk/membership';

// const data = [
//   { name: 'Program 1', maxCapacity: 100 },
//   { name: 'Program 2', maxCapacity: 75 },
//   { name: 'Program 3', maxCapacity: 120 },
//   // ... Add more data ...
// ];
function Dashboard() {
  const [selectedTab, setSelectedTab] = useState('Reservations');
  const location = useLocation();
  const isReservationsActive = location.pathname === '/reservations';
  const isProgramsActive = location.pathname === '/program';
  const ishelpdeskActive = location.pathname === '/helpdesk';
  // const [programData, setProgramData] = useState([]);


  return (
    <div className="dashboard">
      {/* <ProgramDashboardTable data={programData} /> */}
      <Sidebar width="250px">
        <Menu>
          <h2 className="title-heading mt-2"> OrangeBay</h2>

          <FaClipboardList className={` sideee menu-icon `} />

          <SubMenu
            label=" Reservations"
            className={` sideee dash-title ${
              isReservationsActive ? "active" : ""
            }`}
            component={<Link to="/reservations" />}
          >
            <FaTools className="menu-icon" />
            <SubMenu label="Maintain" >
              <MenuItem> service categories </MenuItem>
              <MenuItem
                className={` ${isProgramsActive ? "active" : ""}`}
                component={<Link to="/program" />}
              >
                {" "}
                programs{" "}
              </MenuItem>
              <MenuItem> services </MenuItem>
              <MenuItem> user types </MenuItem>
            </SubMenu>
            <FaTasks className="menu-icon" />
            <SubMenu label="Tasks">
              <MenuItem> Customer Users </MenuItem>
              <MenuItem> User Managment </MenuItem>
            </SubMenu>
            <FaUser className="menu-icon" />
            <SubMenu label="Reservations User">
              <MenuItem> Reservations </MenuItem>
              <MenuItem> Actions </MenuItem>
            </SubMenu>
            <FaCogs className="menu-icon" />
            <SubMenu label="Process">
              <MenuItem> Actions </MenuItem>
              <MenuItem> Reservations Cards </MenuItem>
              <MenuItem> Transactions </MenuItem>
              <MenuItem> Show Calender </MenuItem>
            </SubMenu>
            <FaQuestionCircle className="menu-icon" />
            <MenuItem    className={` ${ishelpdeskActive ? "active" : ""}`}
                component={<Link to="/helpdesk" />}> Help Desk </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div className="content ">
        <Routes>
          <Route path="/reservations" element={<Reservations />} />
          <Route
            path="/program"
            element={<ProgramDashboardTable  />}
          />
          <Route path="/helpdesk" element={<HelpDesk />} />
         <Route path='/membership' element={<MembershipTable />} />
          <Route path='/serviceform' element={<AddServiceForm/>} />
          <Route path="/requesttable" element={<RequestTable />} />
        </Routes>{" "}
        {/* Render the Routes component */}
      </div>
    </div>
  );
}

export default Dashboard;
