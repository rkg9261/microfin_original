import React, { useEffect, useState } from "react";

import "./BranchCenter.css";

import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBranches } from "../../store/slices/branchSlice";

const BranchCenterForm = ({
  data,
  onClose,
  onSave,
}) => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );

  const [formData, setFormData] = useState({
    branchId: "",
    name: "",
    description: "",
    remark: "",
    status: "ACTIVE",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const branchId =
        data.branchId != null && data.branchId !== ""
          ? String(data.branchId)
          : "";

      setFormData({
        branchId,
        name: data.name ?? "",
        description: data.description ?? "",
        remark: data.remark ?? "",
        status: data.status ?? "ACTIVE",
      });
    } else {
      const defaultBranchId = branches[0]?.branchId ?? branches[0]?.id;
      setFormData({
        branchId:
          defaultBranchId != null ? String(defaultBranchId) : "",
        name: "",
        description: "",
        remark: "",
        status: "ACTIVE",
      });
    }
    setErrors({});
  }, [data, branches]);

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

    const validation = validateRequired(
      formData,
      [
        {
          name: "branchId",
          label: "Branch Name",
        },
        {
          name: "name",
          label: "Center Name",
        },
      ]
    );

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    onSave(formData);
  };

  return (
    <div className="branch-center-modal">
      <div className="branch-center-modal-content">
        <div className="branch-center-modal-header">
          <h2>{data ? "EDIT" : "ADD NEW"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form
          className="branch-center-form"
          onSubmit={handleSubmit}
        >
          <div className="branch-center-form-grid">
            <div className="branch-center-form-group">
              <label>
                Branch Name <span>*</span>
              </label>

              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleChange}
                disabled={branchesLoading}
                className={errors.branchId ? "error-input" : ""}
              >
                <option value="">
                  {branchesLoading
                    ? "Loading branches..."
                    : branches.length
                    ? "Select Company Branch"
                    : "No branches available"}
                </option>

                {branches.map((branch) => {
                  const id = branch.branchId ?? branch.id;
                  return (
                    <option key={id} value={String(id)}>
                      {branch.branchName || branch.name || `Branch ${id}`}
                    </option>
                  );
                })}
              </select>

              {errors.branchId && (
                <p className="error-text">
                  {errors.branchId}
                </p>
              )}
            </div>

            <div className="branch-center-form-group">
              <label>
                Remark
              </label>

              <input
                type="text"
                name="remark"
                value={formData.remark}
                onChange={handleChange}
              />
            </div>

            <div className="branch-center-form-group">
              <label>
                Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error-input" : ""}
              />

              {errors.name && (
                <p className="error-text">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="branch-center-form-group">
              <label>
                Description
              </label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="branch-center-form-group">
              <label>
                Status
              </label>

              <div className="branch-center-radio-group">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="ACTIVE"
                    checked={formData.status === "ACTIVE"}
                    onChange={handleChange}
                  />
                  Active
                </label>

                <label>
                  <input
                    type="radio"
                    name="status"
                    value="INACTIVE"
                    checked={formData.status === "INACTIVE"}
                    onChange={handleChange}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="branch-center-form-buttons">
            <SaveButton
              text="Save"
              type="submit"
            />

            <CancelButton
              text="Cancel"
              type="button"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchCenterForm;
