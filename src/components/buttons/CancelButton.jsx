import React from "react";
import "./Button.css";

const CancelButton = ({ onClick }) => {
  return (
    <button className="btn btn-cancel" onClick={onClick}>
      Cancel
    </button>
  );
};

export default CancelButton;