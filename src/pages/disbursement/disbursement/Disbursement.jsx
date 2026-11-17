import React, { useEffect, useState } from "react";
import "./Disbursement.css";
import DisbursementTable from "./DisbursementTable";
import DisbursementForm from "./DisbursementForm";
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
});

const Disbursement = () => {
  const dispatch = useAppDispatch();
  const { save } = useSwaggerEntity("disbursement");
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: employees, loading: employeesLoading } = useAppSelector(
    (state) => state.employee
  );

  const [filters, setFilters] = useState(emptyFilters);
  const [searchFilters, setSearchFilters] = useState(emptyFilters);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setSearchFilters({ ...filters });
  };

  const handleReset = () => {
    const reset = emptyFilters();
    setFilters(reset);
    setSearchFilters(reset);
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
      toast.error(error || "Unable to save disbursement.");
    }
  };

  return (
    <div className="disbursement-page">
      <div className="disbursement-page-heading">
        <h2>DISBURSEMENT</h2>
      </div>

      <div className="disbursement-search-card">
        <div className="disbursement-search-header">
          <span>SEARCH BY</span>
        </div>

        <div className="disbursement-search-body">
          <div className="disbursement-field">
            <label>MEMBER (TYPE HERE)</label>
            <div className="disbursement-input-wrapper">
              <input
                type="text"
                value={filters.member}
                onChange={(e) => handleFilterChange("member", e.target.value)}
                placeholder="Search member"
              />
              {filters.member && (
                <button
                  type="button"
                  className="disbursement-clear-btn"
                  onClick={() => handleFilterChange("member", "")}
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="disbursement-field">
            <label>DISBURSEMENT DATE FROM</label>
            <input
              type="date"
              value={filters.disbursementDateFrom}
              onChange={(e) =>
                handleFilterChange("disbursementDateFrom", e.target.value)
              }
            />
          </div>

          <div className="disbursement-field">
            <label>DISBURSEMENT DATE TO</label>
            <input
              type="date"
              value={filters.disbursementDateTo}
              onChange={(e) =>
                handleFilterChange("disbursementDateTo", e.target.value)
              }
            />
          </div>

          <div className="disbursement-field">
            <label>EMI END DATE FROM</label>
            <input
              type="date"
              value={filters.emiEndDateFrom}
              onChange={(e) =>
                handleFilterChange("emiEndDateFrom", e.target.value)
              }
            />
          </div>

          <div className="disbursement-field">
            <label>EMI END DATE TO</label>
            <input
              type="date"
              value={filters.emiEndDateTo}
              onChange={(e) =>
                handleFilterChange("emiEndDateTo", e.target.value)
              }
            />
          </div>

          <div className="disbursement-field">
            <label>SELECT BRANCH</label>
            <select
              value={filters.branch}
              onChange={(e) => handleFilterChange("branch", e.target.value)}
              disabled={branchesLoading}
            >
              <option value="">
                {branchesLoading ? "Loading branches..." : "All Branches"}
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

          <div className="disbursement-field">
            <label>STAFF ID</label>
            <select
              value={filters.staff}
              onChange={(e) => handleFilterChange("staff", e.target.value)}
              disabled={employeesLoading}
            >
              <option value="">
                {employeesLoading ? "Loading staff..." : "All Staff"}
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

          <div className="disbursement-filter-buttons">
            <button
              type="button"
              className="disbursement-submit-button"
              onClick={handleSearch}
            >
              Submit
            </button>
            <button
              type="button"
              className="disbursement-reset-button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <DisbursementTable
        filters={searchFilters}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />

      {showForm && (
        <DisbursementForm
          data={editData}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Disbursement;
