import React from 'react';
import NewsComponent from '../components/NewsComponent';
import Recommendation from '../components/Recommendation';

const GeneralPage = () => {
  const source = 'al-jazeera-english';

  return (
    <div>
      <div className="header">
        <Recommendation />
      </div>
      <div className="main">
      <NewsComponent categorynews='General' source={source}/>
      </div>
    </div>
  );
};

export default GeneralPage;
