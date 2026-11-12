import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const AcGroupForm = ({
  group,
  onSave,
  onCancel,
}) => {

  const [formData, setFormData] = useState({
    group: "",
    status: "Active",
    type: "DR",
  });

  useEffect(() => {

    if (group) {
      setFormData({
        group: group.group || "",
        status: group.status || "Active",
        type: group.type || "DR",
      });
    } else {
      setFormData({
        group: "",
        status: "Active",
        type: "DR",
      });
    }

  }, [group]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!formData.group.trim()) {
      alert("Please enter group name.");
      return;
    }

    onSave(formData);
  };

  return (
    <div
      className="acgroup-modal-overlay"
      onClick={onCancel}
    >

      <div
        className="acgroup-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* MODAL HEADER */}
        <div className="acgroup-modal-header">

          <h2>
            {group ? "UPDATE" : "ADD GROUP"}
          </h2>

          <button
            type="button"
            className="acgroup-modal-close"
            onClick={onCancel}
          >
            <FaTimes />
          </button>

        </div>

        {/* FORM */}
        <form
          className="acgroup-form"
          onSubmit={handleSubmit}
        >

          <div className="acgroup-form-grid">

            {/* GROUP */}
            <div className="acgroup-form-field">

              <label>
                GROUP <span>*</span>
              </label>

              <input
                type="text"
                name="group"
                value={formData.group}
                onChange={handleChange}
                placeholder="Enter group"
              />

            </div>

            {/* STATUS */}
            <div className="acgroup-form-field">

              <label>
                SELECT STATUS <span>*</span>
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>

            {/* TYPE */}
            <div className="acgroup-form-field">

              <label>
                TYPE <span>*</span>
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >

                <option value="DR">
                  Dr
                </option>

                <option value="CR">
                  Cr
                </option>

              </select>

            </div>

          </div>

          {/* BUTTONS */}
          <div className="acgroup-form-actions">

            <button
              type="submit"
              className="acgroup-update-button"
            >
              {group ? "UPDATE" : "CREATE"}
            </button>

            <button
              type="button"
              className="acgroup-cancel-button"
              onClick={onCancel}
            >
              CANCEL
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AcGroupForm;