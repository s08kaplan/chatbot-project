import React from 'react';
import { IoSend } from "react-icons/io5";

const SendButton = ({ onSubmit, disabled }) => {
  const baseStyle = {
    fontSize: "2rem",
    cursor: disabled ? "not-allowed" : "pointer", 
    color: disabled ? "gray" : "white", 
    transition: "color 0.3s",
  };

  const hoverStyle = {
    color: "blueviolet",
  };

  
  const handleClick = (e) => {
    if (!disabled) {
      onSubmit(e); 
    }
  };

  return (
    <div onClick={handleClick} aria-disabled={disabled}>
      <IoSend
        style={baseStyle}
        onMouseEnter={(e) => {
          if (!disabled) Object.assign(e.currentTarget.style, hoverStyle); // Object.assign used to prevent re-render
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, baseStyle);  
        }}
      />
    </div>
  );
};

export default SendButton;
