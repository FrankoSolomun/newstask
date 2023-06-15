import React from 'react';
import NewsComponent from '../components/NewsComponent';
import Recommendation from '../components/Recommendation';

const GeneralPage = () => {
  const source = 'national-geographic';

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
