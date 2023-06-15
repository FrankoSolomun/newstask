import React, { useState, useEffect } from 'react';
import './MenuPhone.scss';
import SideMenu from './SideMenu';
import { useLocation } from 'react-router-dom';

const MenuPhone = () => {
  const [clicked, setClicked] = useState(true);
  const location = useLocation();

  const handleClick = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    setClicked(true);
  }, [location.pathname]);

  return (
    <>
      <div className={`menu ${clicked ? 'active' : ''}`}>
        <h1><span>My</span>News</h1>
        <svg onClick={handleClick} width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="4" rx="1" fill="#1D1D1B" />
          <rect y="8" width="24" height="4" rx="1" fill="#1D1D1B" />
          <rect y="16" width="24" height="4" rx="1" fill="#1D1D1B" />
        </svg>
      </div>

      <div className={`dropmenu ${clicked ? 'active' : ''}`}>
        <div className='close'>
          <svg onClick={handleClick} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.82843" width="24" height="4" rx="1" transform="rotate(45 2.82843 0)" fill="#1D1D1B" />
            <rect y="16.9706" width="24" height="4" rx="1" transform="rotate(-45 0 16.9706)" fill="#1D1D1B" />
          </svg>
        </div>
        <h1><span>My</span>News</h1>
        <div className='search'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" placeholder="Search news" />
        </div>
        <SideMenu />
      </div>
    </>
  );
}

export default MenuPhone;
