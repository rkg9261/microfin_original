import React, { useEffect, useMemo, useState } from "react";
import "./GroupMemberDisbursement.css";
import GroupMemberDisbursementTable from "./GroupMemberDisbursementTable";
import GroupMemberDisbursementForm from "./GroupMemberDisbursementForm";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import { fetchEmployees } from "../../../store/slices/employeeSlice";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import { getEmployeeLabel } from "../disbursementDisplayUtils";

const emptyFilters = () => ({
  member: "",
  disbursementDateFrom: "",
  disbursementDateTo: "",
  emiEndDateFrom: "",
  emiEndDateTo: "",
  branch: "",
  staff: "",
  group: "",
});

const GroupMemberDisbursement = () => {
  const dispatch = useAppDispatch();
  const { save } = useSwaggerEntity("groupMemberDisbursement");
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: employees, loading: employeesLoading } = useAppSelector(
    (state) => state.employee
  );
  const { items: groups } = useSwaggerEntity("group");

  const [filters, setFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const branchGroups = useMemo(() => {
    if (!filters.branch) return groups;
    return groups.filter(
      (group) => String(group.branchId ?? "") === String(filters.branch)
    );
  }, [groups, filters.branch]);

  const handleChange = (field, value) => {
    setFilters((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "branch") next.group = "";
      return next;
    });
  };

  const handleSubmit = () => {
    setAppliedFilters({ ...filters });
  };

  const handleReset = () => {
    const reset = emptyFilters();
    setFilters(reset);
    setAppliedFilters(reset);
  };

  const handleAdd = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (record) => {
    setEditData(record);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditData(null);
  };

  const handleSave = async (formData) => {
    try {
      await save(formData, editData);
      handleCloseForm();
    } catch (error) {
      toast.error(error || "Unable to save group disbursement.");
    }
  };

  return (
    <div className="group-disbursement-page">
      <div className="group-disbursement-header">
        <h1>GROUP MEMBER DISBURSEMENT</h1>
        <div className="group-disbursement-breadcrumb">
          <span>DASHBOARD</span>
          <span>›</span>
          <strong>GROUP MEMBER DISBURSEMENT</strong>
        </div>
      </div>

      <div className="group-disbursement-search-card">
        <div className="group-disbursement-search-title">SEARCH BY</div>

        <div className="group-disbursement-filter-grid">
          <div className="group-disbursement-field">
            <label>MEMBER (TYPE HERE)</label>
            <div className="group-disbursement-input-wrapper">
              <input
                type="text"
                value={filters.member}
                onChange={(e) => handleChange("member", e.target.value)}
                placeholder="Search member"
              />
              {filters.member && (
                <button
                  type="button"
                  className="group-disbursement-clear"
                  onClick={() => handleChange("member", "")}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="group-disbursement-field">
            <label>DISBURSEMENT DATE FROM</label>
            <input
              type="date"
              value={filters.disbursementDateFrom}
              onChange={(e) =>
                handleChange("disbursementDateFrom", e.target.value)
              }
            />
          </div>

          <div className="group-disbursement-field">
            <label>DISBURSEMENT DATE TO</label>
            <input
              type="date"
              value={filters.disbursementDateTo}
              onChange={(e) =>
                handleChange("disbursementDateTo", e.target.value)
              }
            />
          </div>

          <div className="group-disbursement-field">
            <label>EMI END DATE FROM</label>
            <input
              type="date"
              value={filters.emiEndDateFrom}
              onChange={(e) => handleChange("emiEndDateFrom", e.target.value)}
            />
          </div>

          <div className="group-disbursement-field">
            <label>EMI END DATE TO</label>
            <input
              type="date"
              value={filters.emiEndDateTo}
              onChange={(e) => handleChange("emiEndDateTo", e.target.value)}
            />
          </div>

          <div className="group-disbursement-field">
            <label>BRANCH</label>
            <div className="group-disbursement-input-wrapper">
              <select
                value={filters.branch}
                onChange={(e) => handleChange("branch", e.target.value)}
                disabled={branchesLoading}
              >
                <option value="">
                  {branchesLoading ? "Loading..." : "All Branches"}
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
            </div>
          </div>

          <div className="group-disbursement-field">
            <label>STAFF ID</label>
            <div className="group-disbursement-input-wrapper">
              <select
                value={filters.staff}
                onChange={(e) => handleChange("staff", e.target.value)}
                disabled={employeesLoading}
              >
                <option value="">
                  {employeesLoading ? "Loading..." : "All Staff"}
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
            </div>
          </div>

          <div className="group-disbursement-field">
            <label>GROUP</label>
            <div className="group-disbursement-input-wrapper">
              <select
                value={filters.group}
                onChange={(e) => handleChange("group", e.target.value)}
              >
                <option value="">All Groups</option>
                {branchGroups.map((group) => (
                  <option key={group.id} value={String(group.id)}>
                    {group.groupName || group.name || `Group ${group.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="group-disbursement-buttons">
          <button
            type="button"
            className="group-disbursement-submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            type="button"
            className="group-disbursement-print"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            type="button"
            className="group-disbursement-print"
            onClick={() => window.print()}
          >
            Get Print
          </button>
        </div>
      </div>

      <GroupMemberDisbursementTable
        filters={appliedFilters}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />

      {showForm && (
        <GroupMemberDisbursementForm
          data={editData}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default GroupMemberDisbursement;
