import React, { useEffect, useState } from "react";
import {
  createLeaveMaster,
  updateLeaveMaster,
} from "../../store/slices/leaveSlice";
import { useAppDispatch } from "../../store/hooks";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";
import { toast } from "react-toastify";

const toStatusLabel = (status) => {
  if (status === true || String(status ?? "").toUpperCase() === "ACTIVE") {
    return "ACTIVE";
  }
  if (status === false || String(status ?? "").toUpperCase() === "INACTIVE") {
    return "INACTIVE";
  }
  return "ACTIVE";
};

const LeaveForm = ({ data, onSave, onClose }) => {
  const dispatch = useAppDispatch();

  const initialForm = {
    name: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name || data.leaveName || "",
        status: toStatusLabel(data.status),
      });
    } else {
      setFormData(initialForm);
    }
    setErrors({});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateRequired(formData, [
      { name: "name", label: "Leave Name" },
      { name: "status", label: "Status" },
    ]);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setSaving(true);

    const payload = {
      id: data ? Number(data.id) : 0,
      name: formData.name.trim(),
      leaveName: formData.name.trim(),
      status: formData.status,
      createdDate: data?.createdDate,
    };

    try {
      let response;

      if (data) {
        response = await dispatch(
          updateLeaveMaster({ id: Number(data.id), data: payload })
        ).unwrap();
        toast.success("Leave Master updated successfully.");
      } else {
        response = await dispatch(createLeaveMaster(payload)).unwrap();
        toast.success("Leave Master added successfully.");
      }

      if (onSave) {
        onSave(response);
      }

      onClose();
    } catch (error) {
      toast.error(
        (typeof error === "string" && error) ||
          error?.response?.data?.message ||
          error?.response?.data?.title ||
          (data
            ? "Failed to update Leave Master."
            : "Failed to add Leave Master.")
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="common-modal">
      <div className="common-modal-content">
        <div className="common-modal-header">
          <h2>{data ? "Edit Leave" : "Add New Leave"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form className="common-form" onSubmit={handleSubmit}>
          <div className="common-form-grid">
            <div className="common-form-group">
              <label>
                Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error-input" : ""}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="common-form-group">
              <label>
                Select Status <span>*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={errors.status ? "error-input" : ""}
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
              {errors.status && <p className="error-text">{errors.status}</p>}
            </div>
          </div>

          <div className="common-form-buttons">
            <SaveButton
              text={
                saving
                  ? "Saving..."
                  : data
                  ? "Update Leave"
                  : "Save Leave"
              }
              type="submit"
            />
            <CancelButton text="Cancel" type="button" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
