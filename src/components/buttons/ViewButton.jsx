import React from "react";
import { FaEye } from "react-icons/fa";
import "./Button.css";

const ViewButton = ({
  onClick,
  title = "View",
}) => {
  return (
    <button
      type="button"
      className="btn btn-view"
      onClick={onClick}
      title={title}
    >
      <FaEye />
    </button>
  );
};

export default ViewButton;