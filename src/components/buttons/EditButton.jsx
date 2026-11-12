import React from "react";
import { FaEdit } from "react-icons/fa";
import "./Button.css";

const EditButton = ({
  children = "",
  onClick,
}) => {
  return (
    <button
      className="btn btn-edit"
      onClick={onClick}
    >
      <FaEdit />
      {children}
    </button>
  );
};

export default EditButton;