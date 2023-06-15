import React, { FunctionComponent } from 'react';
import './SideMenu.scss';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '../icons/HomeIcon';
import GeneralIcon from '../icons/GeneralIcon';
import BusinessIcon from '../icons/BusinessIcon';
import HealthIcon from '../icons/HealthIcon';
import ScienceIcon from '../icons/ScienceIcon';
import SportsIcon from '../icons/SportsIcon';
import TechnologyIcon from '../icons/TechnologyIcon';
import FavouriteIcon from '../icons/FavouriteIcon';

interface MenuItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
}



const MenuItem: FunctionComponent<MenuItemProps> = ({ id, icon, label }) => {
  const location = useLocation();

  const isActive = location.pathname === `/${id}` || (location.pathname === '/' && id === 'home');

  return (
    <Link to={`/${id}`} className={`button ${isActive ? 'active' : ''}`} >
        {icon}
        <div>{label}</div>
    </Link>
  );
};

const SideMenu: FunctionComponent = () => {
  const menuItems: MenuItemProps[] = [
    {
      id: '',
      icon: <HomeIcon />,
      label: 'Home',
    },
    {
      id: 'general',
      icon: <GeneralIcon />,
      label: 'General',
    },
    {
      id: 'business',
      icon: <BusinessIcon />,
      label: 'Business',
    },
    {
      id: 'health',
      icon: <HealthIcon />,
      label: 'Health',
    },
    {
      id: 'science',
      icon: <ScienceIcon />,
      label: 'Science',
    },
    {
      id: 'sports',
      icon: <SportsIcon />,
      label: 'Sports',
    },
    {
      id: 'technology',
      icon: <TechnologyIcon />,
      label: 'Technology',
    },
    {
      id: 'favorites',
      icon: <FavouriteIcon />,
      label: 'Favorites',
    },
  ];

  return (
    <div className="container" >
      {menuItems.map((item) => (
          <MenuItem key={item.id} id={item.id} icon={item.icon} label={item.label}/>
      ))}
    </div>
  );
};

export default SideMenu;
