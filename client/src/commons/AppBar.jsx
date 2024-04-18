import React from 'react';
import { ReactComponent as NoticIcon } from '../assets/icons/Vector.svg';
import { ReactComponent as LogIcon } from '../assets/icons/Vector-log.svg';
import { ReactComponent as LogOutIcon } from '../assets/icons/Frame-user.svg';
import './AppBar.css';

const AppBar = () => {
  return (
    <div className="appbar-wrapper">
      <div className="notice-icon">
        <span>
          <NoticIcon />
        </span>
        <p>1</p>
      </div>
      <div className="log-icon">
        <span style={{ color: 'white', fontSize: '32px' }}>
          {/* <LogIcon /> */}
          Welcome to our restaurant !
        </span>
        {/* <p>BETA</p> */}
      </div>
      <div className="logout-btn-container">
        <span>
          <LogOutIcon />
        </span>
        Logout
      </div>
    </div>
  );
};

export default AppBar;
