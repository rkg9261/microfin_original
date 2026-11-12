import React, { useEffect, useState } from "react";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";
import { toast } from "react-toastify";

const DesignationForm = ({ data, onSave, onClose, loading }) => {
  const initialForm = {
    designationName: "",
    designationCode: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const isEditMode = Boolean(data?.designationId ?? data?.id);

  useEffect(() => {
    if (data) {
      setFormData({
        designationName: data.designationName ?? data.name ?? "",
        designationCode: data.designationCode ?? "",
        status:
          data.isActive === false ||
          String(data.status || "").toUpperCase() === "INACTIVE"
            ? "INACTIVE"
            : "ACTIVE",
      });
    } else {
      setFormData({ ...initialForm });
    }

    setErrors({});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateRequired(formData, [
      { name: "designationName", label: "Designation Name" },
      { name: "designationCode", label: "Designation Code" },
      { name: "status", label: "Status" },
    ]);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      toast.error("Please fill all required fields.");
      return;
    }

    setErrors({});

    if (onSave) {
      await onSave({
        designationName: formData.designationName.trim(),
        designationCode: formData.designationCode.trim(),
        status: formData.status,
      });
    }
  };

  return (
    <div className="common-modal">
      <div className="common-modal-content">
        <div className="common-modal-header">
          <h2>{isEditMode ? "Edit Designation" : "Add New Designation"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form className="common-form" onSubmit={handleSubmit}>
          <div className="common-form-grid">
            <div className="common-form-group">
              <label>
                Designation Name <span>*</span>
              </label>
              <input
                type="text"
                name="designationName"
                placeholder="Enter Designation Name"
                value={formData.designationName}
                onChange={handleChange}
                className={errors.designationName ? "error-input" : ""}
                disabled={loading}
              />
              {errors.designationName && (
                <p className="error-text">{errors.designationName}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                Designation Code <span>*</span>
              </label>
              <input
                type="text"
                name="designationCode"
                placeholder="Enter Designation Code"
                value={formData.designationCode}
                onChange={handleChange}
                className={errors.designationCode ? "error-input" : ""}
                disabled={loading}
              />
              {errors.designationCode && (
                <p className="error-text">{errors.designationCode}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                Status <span>*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={errors.status ? "error-input" : ""}
                disabled={loading}
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              {errors.status && (
                <p className="error-text">{errors.status}</p>
              )}
            </div>
          </div>

          <div className="common-form-buttons">
            <SaveButton
              text={isEditMode ? "Update Designation" : "Save Designation"}
              type="submit"
              disabled={loading}
            />
            <CancelButton
              text="Cancel"
              type="button"
              onClick={onClose}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DesignationForm;
