import React, { useEffect, useMemo, useState } from "react";

import CloseButton from "../../../components/buttons/CloseButton";
import "../../../components/buttons/Button.css";
import "../../../components/common/CommonForm.css";
import "../../../utils/validation.css";
import { validateRequired } from "../../../utils/validation";
import "./GroupLoan.css";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { fetchEmployees } from "../../../store/slices/employeeSlice";
import { fetchLoanPlans } from "../../../store/slices/loanPlanSlice";
import { fetchPenaltySchemes } from "../../../store/slices/penaltySchemeSlice";
import { fetchPurposes } from "../../../store/slices/purposeSlice";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

const FALLBACK_PURPOSES = [
  { id: 1, name: "Personal" },
  { id: 2, name: "Business" },
  { id: 3, name: "Education" },
  { id: 4, name: "Medical" },
];

const getEmployeeLabel = (employee) => {
  const name = [employee.firstName, employee.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const code = employee.employeeCode || "";
  if (name && code) return `${name} (${code})`;
  return name || code || `Staff ${employee.employeeId ?? employee.id}`;
};

const emptyForm = () => ({
  branchId: "",
  planId: "",
  branchCenterId: "",
  description: "",
  agentId: "",
  memberId: "",
  groupId: "",
  guarantorId: "",
  groupLeaderId: "",
  purposeId: "",
  loanType: "Single Ledger",
  penaltySchemeId: "",
  hideRateInterest: "NO",
  createdDate: null,
});

const GroupLoanForm = ({ loan, onClose, onSave }) => {
  const isEdit = Boolean(loan);
  const dispatch = useAppDispatch();

  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: employees, loading: employeesLoading } = useAppSelector(
    (state) => state.employee
  );
  const { items: loanPlans, loading: plansLoading } = useAppSelector(
    (state) => state.loanPlan
  );
  const { items: penaltySchemes, loading: penaltyLoading } = useAppSelector(
    (state) => state.penaltyScheme
  );
  const { items: purposes, loading: purposesLoading } = useAppSelector(
    (state) => state.purpose
  );

  const { items: members } = useSwaggerEntity("member");
  const { items: groups } = useSwaggerEntity("group");
  const { items: branchCenters } = useSwaggerEntity("branchCenter");

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
    dispatch(fetchLoanPlans());
    dispatch(fetchPenaltySchemes());
    dispatch(fetchPurposes());
  }, [dispatch]);

  useEffect(() => {
    if (loan) {
      setFormData({
        branchId:
          loan.branchId != null && loan.branchId !== ""
            ? String(loan.branchId)
            : "",
        planId:
          loan.planId != null && loan.planId !== ""
            ? String(loan.planId)
            : "",
        branchCenterId:
          loan.branchCenterId != null && loan.branchCenterId !== ""
            ? String(loan.branchCenterId)
            : "",
        description: loan.description || "",
        agentId:
          loan.agentId != null && loan.agentId !== ""
            ? String(loan.agentId)
            : "",
        memberId:
          loan.memberId != null && loan.memberId !== ""
            ? String(loan.memberId)
            : "",
        groupId:
          loan.groupId != null && loan.groupId !== ""
            ? String(loan.groupId)
            : "",
        guarantorId:
          loan.guarantorId != null && loan.guarantorId !== ""
            ? String(loan.guarantorId)
            : "",
        groupLeaderId:
          loan.groupLeaderId != null && loan.groupLeaderId !== ""
            ? String(loan.groupLeaderId)
            : "",
        purposeId:
          loan.purposeId != null && loan.purposeId !== ""
            ? String(loan.purposeId)
            : "",
        loanType: loan.loanType || "Single Ledger",
        penaltySchemeId:
          loan.penaltySchemeId != null && loan.penaltySchemeId !== ""
            ? String(loan.penaltySchemeId)
            : "",
        hideRateInterest:
          loan.hideRateInterest ||
          (loan.hideRateOfInterestInPrint ? "YES" : "NO"),
        createdDate: loan.createdDate || null,
      });
    } else {
      setFormData(emptyForm());
    }
    setErrors({});
  }, [loan]);

  const purposeOptions = useMemo(() => {
    const list = (purposes || [])
      .map((item) => ({
        id: item.id ?? item.purposeId,
        name: item.purposeName || item.name || `Purpose ${item.id}`,
      }))
      .filter((item) => item.id != null);
    return list.length ? list : FALLBACK_PURPOSES;
  }, [purposes]);

  const filteredCenters = useMemo(() => {
    if (!formData.branchId) return branchCenters;
    return branchCenters.filter(
      (center) =>
        String(center.branchId ?? "") === String(formData.branchId) ||
        !center.branchId
    );
  }, [branchCenters, formData.branchId]);

  const filteredGroups = useMemo(() => {
    if (!formData.branchId) return groups;
    return groups.filter(
      (group) =>
        String(group.branchId ?? "") === String(formData.branchId) ||
        !group.branchId
    );
  }, [groups, formData.branchId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "branchId") {
        next.branchCenterId = "";
        next.groupId = "";
      }
      return next;
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateRequired(formData, [
      { name: "branchId", label: "Branch" },
      { name: "planId", label: "Plan" },
      { name: "agentId", label: "Agent" },
      { name: "memberId", label: "Member" },
      { name: "groupLeaderId", label: "Group Leader" },
      { name: "purposeId", label: "Purpose" },
      { name: "description", label: "Description" },
      { name: "loanType", label: "Loan Type" },
    ]);

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSave({
      ...formData,
      id: loan?.id,
      hideRateOfInterestInPrint: formData.hideRateInterest,
    });
  };

  return (
    <div className="group-loan-modal-overlay">
      <div className="group-loan-form-modal">
        <div className="group-loan-form-header">
          <h2>{isEdit ? "EDIT GROUP LOAN" : "CREATE NEW LOAN"}</h2>
          <CloseButton onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit} className="group-loan-form-body">
          <div className="group-loan-form-grid">
            <div>
              <div className="group-loan-form-group">
                <label>
                  BRANCH <span>*</span>
                </label>
                <select
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleChange}
                  className={errors.branchId ? "error-input" : ""}
                  disabled={branchesLoading}
                >
                  <option value="">
                    {branchesLoading ? "Loading branches..." : "Select branch"}
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

              <div className="group-loan-form-group">
                <label>BRANCH CENTER</label>
                <select
                  name="branchCenterId"
                  value={formData.branchCenterId}
                  onChange={handleChange}
                >
                  <option value="">Select Branch Center</option>
                  {filteredCenters.map((center) => (
                    <option key={center.id} value={String(center.id)}>
                      {center.name ||
                        center.branchCenterName ||
                        `Center ${center.id}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group-loan-form-group">
                <label>
                  AGENT <span>*</span>
                </label>
                <select
                  name="agentId"
                  value={formData.agentId}
                  onChange={handleChange}
                  className={errors.agentId ? "error-input" : ""}
                  disabled={employeesLoading}
                >
                  <option value="">
                    {employeesLoading ? "Loading agents..." : "Select Agent"}
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
                {errors.agentId && (
                  <p className="error-text">{errors.agentId}</p>
                )}
              </div>

              <div className="group-loan-form-group">
                <label>GROUP</label>
                <select
                  name="groupId"
                  value={formData.groupId}
                  onChange={handleChange}
                >
                  <option value="">Select Group</option>
                  {filteredGroups.map((group) => (
                    <option key={group.id} value={String(group.id)}>
                      {group.groupName || group.name || `Group ${group.id}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="group-loan-form-group">
                <label>
                  GROUP LEADER <span>*</span>
                </label>
                <select
                  name="groupLeaderId"
                  value={formData.groupLeaderId}
                  onChange={handleChange}
                  className={errors.groupLeaderId ? "error-input" : ""}
                >
                  <option value="">Select Group Leader</option>
                  {members.map((member) => {
                    const id = member.memberId ?? member.id;
                    return (
                      <option key={id} value={String(id)}>
                        {member.memberName || `Member ${id}`}
                      </option>
                    );
                  })}
                </select>
                {errors.groupLeaderId && (
                  <p className="error-text">{errors.groupLeaderId}</p>
                )}
              </div>

              <div className="group-loan-form-group">
                <label>
                  PURPOSE <span>*</span>
                </label>
                <select
                  name="purposeId"
                  value={formData.purposeId}
                  onChange={handleChange}
                  className={errors.purposeId ? "error-input" : ""}
                  disabled={purposesLoading}
                >
                  <option value="">Select Purpose</option>
                  {purposeOptions.map((purpose) => (
                    <option key={purpose.id} value={String(purpose.id)}>
                      {purpose.name}
                    </option>
                  ))}
                </select>
                {errors.purposeId && (
                  <p className="error-text">{errors.purposeId}</p>
                )}
              </div>

              <div className="group-loan-form-group">
                <label>
                  LOAN TYPE <span>*</span>
                </label>
                <select
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  className={errors.loanType ? "error-input" : ""}
                >
                  <option value="Single Ledger">Single Ledger</option>
                  <option value="Multiple Ledger">Multiple Ledger</option>
                </select>
                {errors.loanType && (
                  <p className="error-text">{errors.loanType}</p>
                )}
              </div>
            </div>

            <div>
              <div className="group-loan-form-group">
                <label>
                  PLAN <span>*</span>
                </label>
                <select
                  name="planId"
                  value={formData.planId}
                  onChange={handleChange}
                  className={errors.planId ? "error-input" : ""}
                  disabled={plansLoading}
                >
                  <option value="">
                    {plansLoading ? "Loading plans..." : "Select Plan"}
                  </option>
                  {loanPlans.map((plan) => (
                    <option key={plan.id} value={String(plan.id)}>
                      {plan.planName || `Plan ${plan.id}`}
                      {plan.numberOfEmi || plan.numberOfEMI
                        ? ` (${plan.numberOfEmi || plan.numberOfEMI} EMI)`
                        : ""}
                    </option>
                  ))}
                </select>
                {errors.planId && (
                  <p className="error-text">{errors.planId}</p>
                )}
              </div>

              <div className="group-loan-form-group">
                <label>
                  DESCRIPTION <span>*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className={errors.description ? "error-input" : ""}
                />
                {errors.description && (
                  <p className="error-text">{errors.description}</p>
                )}
              </div>

              <div className="group-loan-form-group">
                <label>
                  MEMBER <span>*</span>
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

              <div className="group-loan-form-group">
                <label>GUARANTOR</label>
                <select
                  name="guarantorId"
                  value={formData.guarantorId}
                  onChange={handleChange}
                >
                  <option value="">Select Guarantor</option>
                  {members.map((member) => {
                    const id = member.memberId ?? member.id;
                    return (
                      <option key={id} value={String(id)}>
                        {member.memberName || `Member ${id}`}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="group-loan-form-group">
                <label>PENALTY SCHEME</label>
                <select
                  name="penaltySchemeId"
                  value={formData.penaltySchemeId}
                  onChange={handleChange}
                  disabled={penaltyLoading}
                >
                  <option value="">
                    {penaltyLoading
                      ? "Loading schemes..."
                      : "Select Penalty Scheme"}
                  </option>
                  {penaltySchemes.map((scheme) => {
                    const id = scheme.penaltySchemeId ?? scheme.id;
                    return (
                      <option key={id} value={String(id)}>
                        {scheme.schemeName ||
                          scheme.penaltySchemeName ||
                          `Scheme ${id}`}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="group-loan-form-group">
                <label>HIDE RATE OF INTEREST IN PRINT</label>
                <div className="group-loan-radio-group">
                  <label>
                    <input
                      type="radio"
                      name="hideRateInterest"
                      value="YES"
                      checked={formData.hideRateInterest === "YES"}
                      onChange={handleChange}
                    />
                    <span className="radio-yes">YES</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="hideRateInterest"
                      value="NO"
                      checked={formData.hideRateInterest === "NO"}
                      onChange={handleChange}
                    />
                    <span className="radio-no">NO</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="group-loan-form-footer">
            <button type="submit" className="btn btn-save">
              {isEdit ? "UPDATE" : "CREATE"}
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupLoanForm;
