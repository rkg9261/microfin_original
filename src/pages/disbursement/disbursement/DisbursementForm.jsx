import React, { useEffect, useState } from "react";
import { CloseButton } from "../../../components/buttons";
import "../../../components/common/CommonForm.css";
import "../../../components/buttons/Button.css";
import "../../../utils/validation.css";
import { validateRequired } from "../../../utils/validation";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { fetchEmployees } from "../../../store/slices/employeeSlice";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import { getEmployeeLabel } from "../disbursementDisplayUtils";
import "./Disbursement.css";

const emptyForm = () => ({
  id: null,
  branchId: "",
  memberId: "",
  staffId: "",
  disbursementDate: "",
  emiEndDate: "",
  createdDate: null,
});

const DisbursementForm = ({ data, onClose, onSave }) => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: employees, loading: employeesLoading } = useAppSelector(
    (state) => state.employee
  );
  const { items: members } = useSwaggerEntity("member");

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id ?? null,
        branchId: data.branchId != null ? String(data.branchId) : "",
        memberId: data.memberId != null ? String(data.memberId) : "",
        staffId: data.staffId != null ? String(data.staffId) : "",
        disbursementDate: String(data.disbursementDate || data.disDate || "").slice(0, 10),
        emiEndDate: String(data.emiEndDate || "").slice(0, 10),
        createdDate: data.createdDate || null,
      });
    } else {
      setFormData(emptyForm());
    }
    setErrors({});
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRequired(formData, [
      { name: "branchId", label: "Branch" },
      { name: "memberId", label: "Member" },
      { name: "staffId", label: "Staff" },
      { name: "disbursementDate", label: "Disbursement Date" },
      { name: "emiEndDate", label: "EMI End Date" },
    ]);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSave(formData);
  };

  return (
    <div className="common-modal">
      <div className="common-modal-content" style={{ width: 720 }}>
        <div className="common-modal-header">
          <h2>{data ? "EDIT DISBURSEMENT" : "ADD DISBURSEMENT"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form className="common-form" onSubmit={handleSubmit}>
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
                  {branchesLoading ? "Loading..." : "Select Branch"}
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
              {errors.branchId && <p className="error-text">{errors.branchId}</p>}
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
              {errors.memberId && <p className="error-text">{errors.memberId}</p>}
            </div>

            <div className="common-form-group">
              <label>
                Staff <span>*</span>
              </label>
              <select
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                disabled={employeesLoading}
                className={errors.staffId ? "error-input" : ""}
              >
                <option value="">
                  {employeesLoading ? "Loading..." : "Select Staff"}
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
              {errors.staffId && <p className="error-text">{errors.staffId}</p>}
            </div>

            <div className="common-form-group">
              <label>
                Disbursement Date <span>*</span>
              </label>
              <input
                type="date"
                name="disbursementDate"
                value={formData.disbursementDate}
                onChange={handleChange}
                className={errors.disbursementDate ? "error-input" : ""}
              />
              {errors.disbursementDate && (
                <p className="error-text">{errors.disbursementDate}</p>
              )}
            </div>

            <div className="common-form-group">
              <label>
                EMI End Date <span>*</span>
              </label>
              <input
                type="date"
                name="emiEndDate"
                value={formData.emiEndDate}
                onChange={handleChange}
                className={errors.emiEndDate ? "error-input" : ""}
              />
              {errors.emiEndDate && (
                <p className="error-text">{errors.emiEndDate}</p>
              )}
            </div>
          </div>

          <div className="common-form-buttons">
            <button type="submit" className="btn btn-save">
              Save
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisbursementForm;
