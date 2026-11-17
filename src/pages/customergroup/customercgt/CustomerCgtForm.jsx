import React, { useEffect, useMemo, useState } from "react";

import "../../../components/common/CommonForm.css";
import "../../../components/buttons/Button.css";
import "../../../utils/validation.css";
import { validateRequired } from "../../../utils/validation";
import { CloseButton } from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { fetchEmployees } from "../../../store/slices/employeeSlice";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import api from "../../../api/axiosInstance";
import API from "../../../api/endpoints";

const getEmployeeLabel = (employee) => {
  const name = [employee.firstName, employee.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const code = employee.employeeCode || "";
  if (name && code) return `${name} (${code})`;
  return name || code || `Staff ${employee.employeeId ?? employee.id}`;
};

const toDateInput = (value) => {
  if (!value || value === "-") return "";
  return String(value).slice(0, 10);
};

const todayDate = () => new Date().toISOString().slice(0, 10);

const emptyForm = (defaultBranchId = "") => ({
  id: null,
  branchId: defaultBranchId,
  memberId: "",
  groupId: "",
  cgtStaffId: "",
  grtStaffId: "",
  cgtstatus: false,
  grtstatus: false,
  cgtDate: "",
  grtDate: "",
  createdDate: null,
});

const mapDetailToForm = (detail) => ({
  id: detail.id ?? null,
  branchId:
    detail.branchId != null && detail.branchId !== ""
      ? String(detail.branchId)
      : "",
  memberId:
    detail.memberId != null && detail.memberId !== ""
      ? String(detail.memberId)
      : "",
  groupId:
    detail.groupId != null && detail.groupId !== ""
      ? String(detail.groupId)
      : "",
  cgtStaffId:
    detail.cgtStaffId != null && detail.cgtStaffId !== ""
      ? String(detail.cgtStaffId)
      : "",
  grtStaffId:
    detail.grtStaffId != null && detail.grtStaffId !== ""
      ? String(detail.grtStaffId)
      : "",
  cgtstatus: detail.cgtstatus === true || detail.cgtStatus === true,
  grtstatus: detail.grtstatus === true || detail.grtStatus === true,
  cgtDate: toDateInput(detail.cgtdate || detail.cgtDate),
  grtDate: toDateInput(detail.grtdate || detail.grtDate),
  createdDate: detail.createdDate || null,
});

const CustomerCgtForm = ({ data, onSave, onClose }) => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: employees, loading: employeesLoading } = useAppSelector(
    (state) => state.employee
  );
  const { items: groups, loading: groupsLoading } = useSwaggerEntity("group");
  const { items: groupMembers } = useSwaggerEntity("groupMember");
  const { items: allMembers } = useSwaggerEntity("member");

  const [formData, setFormData] = useState(() => emptyForm());
  const [errors, setErrors] = useState({});
  const [detailLoading, setDetailLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(false);
  const [cgtLocked, setCgtLocked] = useState(false);
  const [groupMemberOptions, setGroupMemberOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const mapped = mapDetailToForm(data);
      setFormData(mapped);
      setCgtLocked(mapped.cgtstatus === true);
    } else {
      setFormData(emptyForm(""));
      setCgtLocked(false);
    }
    setErrors({});
  }, [data]);

  const branchGroups = useMemo(() => {
    if (!formData.branchId) return [];
    return groups.filter(
      (group) => String(group.branchId ?? "") === String(formData.branchId)
    );
  }, [groups, formData.branchId]);

  // Branch → Group → Member: load members for selected group
  useEffect(() => {
    const groupId = formData.groupId;
    if (!groupId) {
      setGroupMemberOptions([]);
      return;
    }

    let cancelled = false;

    const loadMembersForGroup = async () => {
      setMembersLoading(true);
      try {
        const selectedGroup = groups.find(
          (group) => String(group.id) === String(groupId)
        );
        const groupName = selectedGroup?.groupName || selectedGroup?.name || "";

        const candidates = (groupMembers || []).filter((item) => {
          if (
            item.groupId != null &&
            String(item.groupId) === String(groupId)
          ) {
            return true;
          }
          return (
            Boolean(groupName) &&
            (item.groupName === groupName || item.name === groupName)
          );
        });

        const resolved = await Promise.all(
          candidates.map(async (item) => {
            let memberId = item.memberId;
            if (memberId == null || memberId === "") {
              try {
                const detail = await api.get(API.GROUP_MEMBER_BY_ID(item.id));
                memberId = detail?.data?.memberId;
              } catch {
                memberId = null;
              }
            }

            if (memberId == null || memberId === "") return null;

            const member = allMembers.find(
              (m) => String(m.memberId ?? m.id) === String(memberId)
            );

            return {
              memberId: String(memberId),
              memberName:
                member?.memberName ||
                item.memberName ||
                `Member ${memberId}`,
            };
          })
        );

        if (!cancelled) {
          const unique = [];
          const seen = new Set();
          resolved.filter(Boolean).forEach((row) => {
            if (seen.has(row.memberId)) return;
            seen.add(row.memberId);
            unique.push(row);
          });
          setGroupMemberOptions(unique);
        }
      } catch {
        if (!cancelled) setGroupMemberOptions([]);
      } finally {
        if (!cancelled) setMembersLoading(false);
      }
    };

    loadMembersForGroup();

    return () => {
      cancelled = true;
    };
  }, [formData.groupId, groups, groupMembers, allMembers]);

  // When member selected, load existing CGT/GRT detail
  useEffect(() => {
    if (data) return;

    const memberId = formData.memberId;
    if (!memberId) return;

    let cancelled = false;

    const loadMemberDetail = async () => {
      setDetailLoading(true);
      try {
        const response = await api.get(
          API.MEMBER_CGT_GRT_DETAIL(memberId, formData.groupId || undefined)
        );
        if (cancelled || !response?.data) return;

        const mapped = mapDetailToForm(response.data);
        setFormData((prev) => ({
          ...prev,
          id: mapped.id,
          cgtStaffId: mapped.cgtStaffId,
          grtStaffId: mapped.grtStaffId,
          cgtstatus: mapped.cgtstatus,
          grtstatus: mapped.grtstatus,
          cgtDate: mapped.cgtDate,
          grtDate: mapped.grtDate,
          createdDate: mapped.createdDate,
          branchId: prev.branchId || mapped.branchId,
          groupId: prev.groupId || mapped.groupId,
          memberId: prev.memberId,
        }));
        setCgtLocked(mapped.cgtstatus === true);
      } catch {
        if (!cancelled) {
          setCgtLocked(false);
          setFormData((prev) => ({
            ...prev,
            id: null,
            cgtStaffId: "",
            grtStaffId: "",
            cgtstatus: false,
            grtstatus: false,
            cgtDate: "",
            grtDate: "",
            createdDate: null,
          }));
        }
      } finally {
        if (!cancelled) setDetailLoading(false);
      }
    };

    loadMemberDetail();

    return () => {
      cancelled = true;
    };
  }, [data, formData.memberId, formData.groupId]);

  const showGrtSection = formData.cgtstatus === true;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const next = { ...prev, [name]: checked };
        if (name === "cgtstatus") {
          if (checked && !prev.cgtDate) next.cgtDate = todayDate();
          if (!checked) {
            next.grtstatus = false;
            next.grtDate = "";
          }
        }
        if (name === "grtstatus" && checked && !prev.grtDate) {
          next.grtDate = todayDate();
        }
        return next;
      });
      return;
    }

    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      // Cascade resets
      if (name === "branchId") {
        next.groupId = "";
        next.memberId = "";
        next.id = null;
        next.cgtStaffId = "";
        next.grtStaffId = "";
        next.cgtstatus = false;
        next.grtstatus = false;
        next.cgtDate = "";
        next.grtDate = "";
        next.createdDate = null;
        setCgtLocked(false);
      }

      if (name === "groupId") {
        next.memberId = "";
        next.id = null;
        next.cgtStaffId = "";
        next.grtStaffId = "";
        next.cgtstatus = false;
        next.grtstatus = false;
        next.cgtDate = "";
        next.grtDate = "";
        next.createdDate = null;
        setCgtLocked(false);
      }

      return next;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      { name: "branchId", label: "Branch" },
      { name: "groupId", label: "Group" },
      { name: "memberId", label: "Member" },
      { name: "cgtStaffId", label: "CGT Staff" },
    ];

    if (showGrtSection) {
      requiredFields.push({ name: "grtStaffId", label: "GRT Staff" });
    }

    const validationErrors = validateRequired(formData, requiredFields);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const selectedMember =
      groupMemberOptions.find(
        (item) => String(item.memberId) === String(formData.memberId)
      ) ||
      allMembers.find(
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
    const grtStaffId = showGrtSection
      ? formData.grtStaffId
      : formData.grtStaffId || formData.cgtStaffId;
    const grtStaff = employees.find(
      (item) => String(item.employeeId ?? item.id) === String(grtStaffId)
    );

    onSave({
      id: formData.id,
      branchId: formData.branchId,
      memberId: formData.memberId,
      groupId: formData.groupId || null,
      cgtStaffId: formData.cgtStaffId,
      grtStaffId,
      cgtstaff: cgtStaff || null,
      grtstaff: grtStaff || cgtStaff || null,
      cgtstatus: formData.cgtstatus,
      grtstatus: showGrtSection ? formData.grtstatus : false,
      cgtDate: formData.cgtDate || null,
      grtDate: showGrtSection ? formData.grtDate || null : null,
      createdDate: formData.createdDate,
      branch: selectedBranch?.branchName || selectedBranch?.name || "",
      memberName:
        selectedMember?.memberName || selectedMember?.name || "",
      groupName: selectedGroup?.groupName || selectedGroup?.name || "",
      cgtStaff: getEmployeeLabel(cgtStaff || {}),
      grtStaff: getEmployeeLabel(grtStaff || {}),
    });
  };

  return (
    <div className="common-modal">
      <div className="common-modal-content customer-cgt-modal">
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
                disabled={branchesLoading || cgtLocked}
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
                Group <span>*</span>
              </label>
              <select
                name="groupId"
                value={formData.groupId}
                onChange={handleChange}
                disabled={cgtLocked || !formData.branchId || groupsLoading}
                className={errors.groupId ? "error-input" : ""}
              >
                <option value="">
                  {!formData.branchId
                    ? "Select branch first"
                    : groupsLoading
                    ? "Loading groups..."
                    : branchGroups.length
                    ? "Select Group"
                    : "No groups for this branch"}
                </option>
                {branchGroups.map((group) => (
                  <option key={group.id} value={String(group.id)}>
                    {group.groupName || group.name || `Group ${group.id}`}
                  </option>
                ))}
              </select>
              {errors.groupId && (
                <p className="error-text">{errors.groupId}</p>
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
                disabled={
                  cgtLocked ||
                  Boolean(data) ||
                  !formData.groupId ||
                  membersLoading
                }
                className={errors.memberId ? "error-input" : ""}
              >
                <option value="">
                  {!formData.groupId
                    ? "Select group first"
                    : membersLoading || detailLoading
                    ? "Loading members..."
                    : groupMemberOptions.length
                    ? "Select Member"
                    : "No members in this group"}
                </option>
                {groupMemberOptions.map((member) => (
                  <option key={member.memberId} value={String(member.memberId)}>
                    {member.memberName}
                  </option>
                ))}
              </select>
              {errors.memberId && (
                <p className="error-text">{errors.memberId}</p>
              )}
            </div>
          </div>

          <div className="customer-cgt-section">
            <div className="customer-cgt-section-title">CGT</div>
            <div className="customer-cgt-section-row">
              <div className="common-form-group customer-cgt-staff-field">
                <label>
                  CGT Staff <span>*</span>
                </label>
                <select
                  name="cgtStaffId"
                  value={formData.cgtStaffId}
                  onChange={handleChange}
                  disabled={employeesLoading || cgtLocked}
                  className={errors.cgtStaffId ? "error-input" : ""}
                >
                  <option value="">
                    {employeesLoading
                      ? "Loading staff..."
                      : "Select CGT Staff"}
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

              <div className="common-form-group customer-cgt-status-field">
                <label>CGT Status</label>
                <label className="customer-cgt-status-check">
                  <input
                    type="checkbox"
                    name="cgtstatus"
                    checked={formData.cgtstatus}
                    onChange={handleChange}
                    disabled={cgtLocked}
                  />
                  <span>Success</span>
                </label>
              </div>

              <div className="common-form-group customer-cgt-date-field">
                <label>CGT Date</label>
                <input
                  type="date"
                  name="cgtDate"
                  value={formData.cgtDate}
                  onChange={handleChange}
                  disabled={cgtLocked}
                />
              </div>
            </div>
          </div>

          {showGrtSection && (
            <div className="customer-cgt-section">
              <div className="customer-cgt-section-title">GRT</div>
              <div className="customer-cgt-section-row">
                <div className="common-form-group customer-cgt-staff-field">
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
                      {employeesLoading
                        ? "Loading staff..."
                        : "Select GRT Staff"}
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

                <div className="common-form-group customer-cgt-status-field">
                  <label>GRT Status</label>
                  <label className="customer-cgt-status-check">
                    <input
                      type="checkbox"
                      name="grtstatus"
                      checked={formData.grtstatus}
                      onChange={handleChange}
                    />
                    <span>Success</span>
                  </label>
                </div>

                <div className="common-form-group customer-cgt-date-field">
                  <label>GRT Date</label>
                  <input
                    type="date"
                    name="grtDate"
                    value={formData.grtDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

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

export default CustomerCgtForm;
