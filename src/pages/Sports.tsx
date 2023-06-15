import React from 'react';
import NewsComponent from '../components/NewsComponent';
import Recommendation from '../components/Recommendation';

const GeneralPage = () => {
  const source = 'bleacher-report';

  return (
    <div>
      <div className="header">
        <Recommendation />
      </div>
      <div className="main">
      <NewsComponent categorynews='Sports' source={source}/>
      </div>
    </div>
  );
};

export default GeneralPage;
