import React from "react";
import "./Button.css";

const ResetButton = ({
  text = "Reset",
  type = "reset",
  onClick,
  disabled = false,
}) => {

  return (

    <button
      type={type}
      className="btn btn-reset"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>

  );

};

export default ResetButton;