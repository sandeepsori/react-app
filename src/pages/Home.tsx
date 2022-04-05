import React from 'react';
import "./style.css";
import Plan from './Plan';

const Home = () => {
  return (
    <div className="content">
      <div>
        <h5>Welcome Jack!!</h5>
      </div>
      <Plan/>
    </div>
  );
};
  
export default Home;