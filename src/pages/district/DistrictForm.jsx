import React, { useEffect, useState } from "react";
import "../../components/common/CommonForm.css";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchStates } from "../../store/slices/stateSlice";

const DistrictForm = ({ data, onSave, onClose, loading }) => {
  const dispatch = useAppDispatch();
  const { items: states } = useAppSelector((store) => store.stateMaster);

  useEffect(() => {
    dispatch(fetchStates());
  }, [dispatch]);

  const initialForm = {
    districtName: "",
    districtCode: "",
    stateId: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        districtName: data.districtName ?? "",
        districtCode: data.districtCode ?? "",
        stateId:
          data.stateId != null && data.stateId !== ""
            ? String(data.stateId)
            : "",
        status: data.isActive ? "ACTIVE" : "INACTIVE",
      });
    } else {
      const defaultStateId = states[0]?.stateId ?? states[0]?.id;
      setFormData({
        ...initialForm,
        stateId: defaultStateId != null ? String(defaultStateId) : "",
      });
    }

    setErrors({});
  }, [data, states]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateRequired(formData, [
      { name: "districtName", label: "District Name" },
      { name: "districtCode", label: "District Code" },
      { name: "stateId", label: "State" },
      { name: "status", label: "Status" },
    ]);

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    onSave(formData);
  };

  return (
    <div className="common-modal">
      <div className="common-modal-content">
        <div className="common-modal-header">
          <h2>{data ? "Edit District" : "Add New District"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form className="common-form" onSubmit={handleSubmit}>
          <div className="common-form-grid">
            <div className="common-form-group">
              <label>
                District Name
                <span>*</span>
              </label>
              <input
                type="text"
                name="districtName"
                value={formData.districtName}
                onChange={handleChange}
                placeholder="Enter District Name"
                className={errors.districtName ? "error-input" : ""}
              />
              {errors.districtName && (
                <p className="error-text">{errors.districtName}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                District Code
                <span>*</span>
              </label>
              <input
                type="text"
                name="districtCode"
                value={formData.districtCode}
                onChange={handleChange}
                placeholder="Enter District Code"
                className={errors.districtCode ? "error-input" : ""}
              />
              {errors.districtCode && (
                <p className="error-text">{errors.districtCode}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                State
                <span>*</span>
              </label>
              <select
                name="stateId"
                value={formData.stateId}
                onChange={handleChange}
                className={errors.stateId ? "error-input" : ""}
              >
                <option value="">
                  {states.length ? "Select State" : "No states available"}
                </option>
                {states.map((state) => {
                  const id = state.stateId ?? state.id;
                  return (
                    <option key={id} value={String(id)}>
                      {state.stateName}
                    </option>
                  );
                })}
              </select>
              {errors.stateId && (
                <p className="error-text">{errors.stateId}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                Status
                <span>*</span>
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
              {errors.status && (
                <p className="error-text">{errors.status}</p>
              )}
            </div>
          </div>

          <div className="common-form-buttons">
            <SaveButton
              text={data ? "Update" : "Save"}
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

export default DistrictForm;
