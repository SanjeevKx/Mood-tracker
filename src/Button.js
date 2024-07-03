// ButtonContainer.jsx
import React from 'react';
// import './CSS/Button.css'
const Button = ({ onButtonClick }) => {
  return (
    <div>
      <button className="myButton" onClick={onButtonClick}>
        Add Data Point
      </button>
      <button className="myButton" onClick={onButtonClick}>
        Add Data Point2
      </button>
    </div>
  );
};

export default Button;
