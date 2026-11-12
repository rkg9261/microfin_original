import React from "react";
import { FaPlus } from "react-icons/fa";
import "./Button.css";

const AddButton = ({
  children = "Add New",
  onClick,
  type = "button",
}) => {
  return (
    <button
      className="btn btn-add"
      type={type}
      onClick={onClick}
    >
      <FaPlus />
      <span>{children}</span>
    </button>
  );
};

export default AddButton;