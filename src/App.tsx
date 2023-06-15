import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import General from './pages/General';
import Home from './pages/Home';
import SideMenu from './components/SideMenu';
import Business from './pages/Business';
import Health from './pages/Health';
import Science from './pages/Science';
import Sports from './pages/Sports';
import Technology from './pages/Technology';
import Favourites from './pages/Favourites';
import { Helmet } from 'react-helmet';

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Helmet>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <title>MyNews Portal</title>
      </Helmet>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/general" element={<General />} />
          <Route path="/business" element={<Business />} />
          <Route path="/health" element={<Health />} />
          <Route path="/science" element={<Science />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/favorites" element={<Favourites />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
