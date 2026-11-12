import React from "react";
import "./Button.css";

const CalculateEmiButton = ({ onClick }) => {
  return (
    <button className="btn btn-emi" onClick={onClick}>
      Calculate EMI
    </button>
  );
};

export default CalculateEmiButton;