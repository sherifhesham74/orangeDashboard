import React, { useState } from 'react';
import RequestTable from './request_table'; // Import your RequestTable component
import MembershipTable from './membership'; // Import your MembershipComponent component
import '../../css/helpdesk/helpdesk.css';

const HelpDesk = () => {
  const [activeComponent, setActiveComponent] = useState('requestTable'); // Start with 'requestTable' as active

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className='container '>
  <div className="buttons-container  mb-3">
        <button
          onClick={() => handleComponentChange('requestTable')}
          className={`menu-button ${activeComponent === 'requestTable' ? 'active-button' : ''}`}
        >
         Programs
        </button>
        <button
          onClick={() => handleComponentChange('membership')}
          className={`menu-button ${activeComponent === 'membership' ? 'active-button' : ''}`}
        >
          Membership
        </button>
      </div>
      {activeComponent === 'requestTable' ? <RequestTable /> : <MembershipTable/>}
    </div>
  );
};

export default HelpDesk;
