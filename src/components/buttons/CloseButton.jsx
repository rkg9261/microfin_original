import React from "react";
import { FaTimes } from "react-icons/fa";

const CloseButton = ({ ...props }) => {
  return (
    <button
      className="btn-close-modal"
      {...props}
    >
      <FaTimes />
    </button>
  );
};

export default CloseButton;