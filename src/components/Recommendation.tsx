import React from 'react';
import './Recommendation.scss';


const Recommendation = () => {

    return (
        <div className="recommend">
            <div className='text'>
                <h2 className='bold-text'>Make MyNews your homepage</h2>
                <h2 className='norm-text'>Every day discover what's trending on the internet!</h2>
            </div>
            <div className='buttons'>
                <button className='white-button'>GET</button>
                <button className='second-button'>No, thanks</button>
            </div>
        </div>
    );
}


export default Recommendation;