import React, { useEffect, useState } from "react";

import "./StaffBranches.css";

import { validateRequired } from "../../utils/validation";
import "../../utils/validation.css";

import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBranches } from "../../store/slices/branchSlice";
import { fetchEmployees } from "../../store/slices/employeeSlice";

const getEmployeeLabel = (employee) => {
  const name = [employee.firstName, employee.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const code = employee.employeeCode || "";
  if (name && code) return `${name} (${code})`;
  return name || code || `Staff ${employee.employeeId ?? employee.id}`;
};

const StaffBranchesForm = ({
  data,
  onClose,
  onSave,
}) => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: employees, loading: employeesLoading } = useAppSelector(
    (state) => state.employee
  );

  const [formData, setFormData] = useState({
    branchId: "",
    staffId: "",
    employeeCode: "",
    employeeName: "",
    remark: "",
    status: "ACTIVE",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const branchId =
        data.branchId != null && data.branchId !== ""
          ? String(data.branchId)
          : "";
      const staffId =
        data.staffId != null && data.staffId !== ""
          ? String(data.staffId)
          : "";

      setFormData({
        branchId,
        staffId,
        employeeCode: data.employeeCode ?? "",
        employeeName: data.employeeName ?? "",
        remark: data.remark ?? "",
        status: data.status ?? "ACTIVE",
      });
    } else {
      const defaultBranchId = branches[0]?.branchId ?? branches[0]?.id;
      setFormData({
        branchId:
          defaultBranchId != null ? String(defaultBranchId) : "",
        staffId: "",
        employeeCode: "",
        employeeName: "",
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

  const handleStaffChange = (e) => {
    const value = e.target.value;
    const employee = employees.find(
      (item) => String(item.employeeId ?? item.id) === value
    );

    const name = employee
      ? [employee.firstName, employee.lastName].filter(Boolean).join(" ").trim()
      : "";

    setFormData((prev) => ({
      ...prev,
      staffId: value,
      employeeName: name,
      employeeCode: employee?.employeeCode || "",
    }));

    setErrors((prev) => ({
      ...prev,
      staffId: "",
      employeeName: "",
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
          name: "staffId",
          label: "Staff",
        },
        {
          name: "remark",
          label: "Remark",
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
    <div className="staff-modal">
      <div className="staff-modal-content">
        <div className="staff-modal-header">
          <h2>{data ? "Edit" : "Add New"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form
          className="staff-form"
          onSubmit={handleSubmit}
        >
          <div className="staff-form-group">
            <label>
              Branch Name *
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

          <div className="staff-form-group">
            <label>
              Staff ID *
            </label>

            <select
              value={formData.staffId}
              onChange={handleStaffChange}
              disabled={employeesLoading}
              className={errors.staffId ? "error-input" : ""}
            >
              <option value="">
                {employeesLoading
                  ? "Loading staff..."
                  : employees.length
                  ? "Select Staff"
                  : "No staff available"}
              </option>

              {employees.map((employee) => {
                const id = employee.employeeId ?? employee.id;
                return (
                  <option key={id} value={String(id)}>
                    {getEmployeeLabel(employee)}
                  </option>
                );
              })}
            </select>

            {errors.staffId && (
              <p className="error-text">
                {errors.staffId}
              </p>
            )}
          </div>

          <div className="staff-form-group">
            <label>
              Remark *
            </label>

            <input
              type="text"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
              className={errors.remark ? "error-input" : ""}
            />

            {errors.remark && (
              <p className="error-text">
                {errors.remark}
              </p>
            )}
          </div>

          <div className="staff-form-group">
            <label>
              Status *
            </label>

            <div className="radio-group">
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

          <div className="staff-form-buttons">
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

export default StaffBranchesForm;
