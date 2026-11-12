import React from "react";
import "./Button.css";

const SaveButton = ({ onClick }) => {
  return (
    <button className="btn btn-save" onClick={onClick}>
      Save
    </button>
  );
};

export default SaveButton;