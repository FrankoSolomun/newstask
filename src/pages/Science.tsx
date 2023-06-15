import React from 'react';
import NewsComponent from '../components/NewsComponent';
import Recommendation from '../components/Recommendation';

const GeneralPage = () => {
  const source = 'next-big-future';

  return (
    <div>
      <div className="header">
        <Recommendation />
      </div>
      <div className="main">
        <NewsComponent categorynews='Science' source={source}/>
      </div>
    </div>
  );
};

export default GeneralPage;
