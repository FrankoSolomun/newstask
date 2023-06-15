import React from 'react';
import NewsComponent from '../components/NewsComponent';
import Recommendation from '../components/Recommendation';

const GeneralPage = () => {
  const source = 'bloomberg';

  return (
    <div>
      <div className="header">
        <Recommendation />
      </div>
      <div className="main">
      <NewsComponent categorynews='Business' source={source}/>
      </div>
    </div>
  );
};

export default GeneralPage;
