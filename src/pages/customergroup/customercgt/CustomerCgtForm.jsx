import React, { useEffect, useState } from "react";

import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";
import { validateRequired } from "../../../utils/validation";
import {
  SaveButton,
  CancelButton,
  CloseButton,
} from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { fetchEmployees } from "../../../store/slices/employeeSlice";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

const getEmployeeLabel = (employee) => {
  const name = [employee.firstName, employee.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const code = employee.employeeCode || "";
  if (name && code) return `${name} (${code})`;
  return name || code || `Staff ${employee.employeeId ?? employee.id}`;
};

const CustomerCgtForm = ({ data, onSave, onClose }) => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: employees, loading: employeesLoading } = useAppSelector(
    (state) => state.employee
  );
  const { items: members } = useSwaggerEntity("member");
  const { items: groups } = useSwaggerEntity("group");

  const [formData, setFormData] = useState({
    branchId: "",
    memberId: "",
    groupId: "",
    cgtStaffId: "",
    grtStaffId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFormData({
        branchId:
          data.branchId != null && data.branchId !== ""
            ? String(data.branchId)
            : "",
        memberId:
          data.memberId != null && data.memberId !== ""
            ? String(data.memberId)
            : "",
        groupId:
          data.groupId != null && data.groupId !== ""
            ? String(data.groupId)
            : "",
        cgtStaffId:
          data.cgtStaffId != null && data.cgtStaffId !== ""
            ? String(data.cgtStaffId)
            : "",
        grtStaffId:
          data.grtStaffId != null && data.grtStaffId !== ""
            ? String(data.grtStaffId)
            : "",
      });
    } else {
      const defaultBranchId = branches[0]?.branchId ?? branches[0]?.id;
      setFormData({
        branchId: defaultBranchId != null ? String(defaultBranchId) : "",
        memberId: "",
        groupId: "",
        cgtStaffId: "",
        grtStaffId: "",
      });
    }
    setErrors({});
  }, [data, branches]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateRequired(formData, [
      { name: "branchId", label: "Branch" },
      { name: "memberId", label: "Member" },
      { name: "cgtStaffId", label: "CGT Staff" },
      { name: "grtStaffId", label: "GRT Staff" },
    ]);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const selectedMember = members.find(
      (item) =>
        String(item.memberId ?? item.id) === String(formData.memberId)
    );
    const selectedGroup = groups.find(
      (item) => String(item.id) === String(formData.groupId)
    );
    const selectedBranch = branches.find(
      (item) =>
        String(item.branchId ?? item.id) === String(formData.branchId)
    );
    const cgtStaff = employees.find(
      (item) =>
        String(item.employeeId ?? item.id) === String(formData.cgtStaffId)
    );
    const grtStaff = employees.find(
      (item) =>
        String(item.employeeId ?? item.id) === String(formData.grtStaffId)
    );

    onSave({
      branchId: formData.branchId,
      memberId: formData.memberId,
      groupId: formData.groupId || null,
      cgtStaffId: formData.cgtStaffId,
      grtStaffId: formData.grtStaffId,
      branch: selectedBranch?.branchName || selectedBranch?.name || "",
      memberName: selectedMember?.memberName || "",
      groupName: selectedGroup?.groupName || selectedGroup?.name || "",
      cgtStaff: getEmployeeLabel(cgtStaff || {}),
      grtStaff: getEmployeeLabel(grtStaff || {}),
    });
  };

  return (
    <div className="common-modal">
      <div className="common-modal-content">
        <div className="common-modal-header">
          <h2>{data ? "EDIT CUSTOMER CGT" : "ADD NEW"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form className="common-form customer-cgt-form" onSubmit={handleSubmit}>
          <div className="common-form-grid">
            <div className="common-form-group">
              <label>
                Branch <span>*</span>
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
                    ? "Select Branch"
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
                <p className="error-text">{errors.branchId}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                Member <span>*</span>
              </label>
              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className={errors.memberId ? "error-input" : ""}
              >
                <option value="">Select Member</option>
                {members.map((member) => {
                  const id = member.memberId ?? member.id;
                  return (
                    <option key={id} value={String(id)}>
                      {member.memberName || `Member ${id}`}
                    </option>
                  );
                })}
              </select>
              {errors.memberId && (
                <p className="error-text">{errors.memberId}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>Group</label>
              <select
                name="groupId"
                value={formData.groupId}
                onChange={handleChange}
              >
                <option value="">Select Group</option>
                {groups.map((group) => (
                  <option key={group.id} value={String(group.id)}>
                    {group.groupName || group.name || `Group ${group.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="common-form-group">
              <label>
                CGT Staff <span>*</span>
              </label>
              <select
                name="cgtStaffId"
                value={formData.cgtStaffId}
                onChange={handleChange}
                disabled={employeesLoading}
                className={errors.cgtStaffId ? "error-input" : ""}
              >
                <option value="">
                  {employeesLoading ? "Loading staff..." : "Select CGT Staff"}
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
              {errors.cgtStaffId && (
                <p className="error-text">{errors.cgtStaffId}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                GRT Staff <span>*</span>
              </label>
              <select
                name="grtStaffId"
                value={formData.grtStaffId}
                onChange={handleChange}
                disabled={employeesLoading}
                className={errors.grtStaffId ? "error-input" : ""}
              >
                <option value="">
                  {employeesLoading ? "Loading staff..." : "Select GRT Staff"}
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
              {errors.grtStaffId && (
                <p className="error-text">{errors.grtStaffId}</p>
              )}
            </div>
          </div>

          <div className="common-form-buttons">
            <SaveButton type="submit" text="Save" />
            <CancelButton type="button" text="Cancel" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerCgtForm;
