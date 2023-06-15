import React from 'react';
import NewsComponent from '../components/NewsComponent';
import SideMenu from '../components/SideMenu';
import Recommendation from '../components/Recommendation';

export default function Home() {
  const source = 'ars-technica, bloomberg, al-jazeera-english, medical-news-today, national-geographic, bleacher-report';

  return (
    <div>
      <div className="header">
        <Recommendation />
      </div>
      <div className="main">
        <NewsComponent categorynews='Home'  source={source}/>
      </div>
    </div>
  );
}
