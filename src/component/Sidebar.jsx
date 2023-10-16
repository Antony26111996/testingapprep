import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarStyle = {
    width: '250px',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: isOpen ? '0' : '-250px', // Initially hidden
    backgroundColor: '#333',
    color: '#fff',
    transition: 'left 0.3s ease-in-out',
    zIndex: 1,
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '24px',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 2,
  };

  return (
    <div style={sidebarStyle}>
      <button style={buttonStyle} onClick={toggleSidebar}>
        &#9776; Toggle Sidebar
      </button>
      <ul>
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;
