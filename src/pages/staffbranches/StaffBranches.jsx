import React, { useEffect, useMemo, useState } from "react";

import "./StaffBranches.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import StaffBranchesTable from "./StaffBranchesTable";
import StaffBranchesForm from "./StaffBranchesForm";

import { AddButton } from "../../components/buttons";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../store/useSwaggerEntity";
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

const StaffBranches = () => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: employees, loading: employeesLoading } = useAppSelector(
    (state) => state.employee
  );
  const { items: staffBranches, save, remove } = useSwaggerEntity("staffBranch");

  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchEmployees());
  }, [dispatch]);

  const staffOptions = useMemo(
    () =>
      employees.map((employee) => {
        const id = employee.employeeId ?? employee.id;
        return {
          id,
          label: getEmployeeLabel(employee),
          name: [employee.firstName, employee.lastName]
            .filter(Boolean)
            .join(" ")
            .trim(),
        };
      }),
    [employees]
  );

  const filteredData = staffBranches.filter((item) => {
    const matchesSearch = String(item.employeeName || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesBranch =
      selectedBranch === "" ||
      String(item.branchId ?? "") === selectedBranch ||
      String(item.branch ?? "") === selectedBranch;
    const matchesStaff =
      selectedStaff === "" ||
      String(item.staffId ?? "") === selectedStaff ||
      String(item.employeeName ?? "") === selectedStaff;

    return matchesSearch && matchesBranch && matchesStaff;
  });

  const saveStaffBranch = async (newData) => {
    try {
      await save(newData, editing);
      setEditing(null);
      setOpenForm(false);
    } catch (error) {
      toast.error(error || "Unable to save staff branch.");
    }
  };

  const handleEdit = (row) => {
    setEditing(row);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await remove(id);
    } catch (error) {
      toast.error(error || "Unable to delete staff branch.");
    }
  };

  return (
    <div className="staff-branches-page">
      <div className="staff-filter-card">
        <h3>Filter By</h3>
        <div className="staff-filter-grid">
          <div>
            <label>Branch</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              disabled={branchesLoading}
            >
              <option value="">
                {branchesLoading ? "Loading branches..." : "All Branches"}
              </option>
              {branches.map((item) => {
                const id = item.branchId ?? item.id;
                return (
                  <option key={id} value={String(id)}>
                    {item.branchName || item.name || `Branch ${id}`}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label>Staff</label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              disabled={employeesLoading}
            >
              <option value="">
                {employeesLoading ? "Loading staff..." : "All Staff"}
              </option>
              {staffOptions.map((staff) => (
                <option key={staff.id} value={String(staff.id)}>
                  {staff.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="staff-header">
        <div>
          <h2>Staff Branches List</h2>
          <p>Manage Staff Branches</p>
        </div>
        <AddButton
          text="Add New"
          onClick={() => {
            setEditing(null);
            setOpenForm(true);
          }}
        />
      </div>

      <div className="common-search">
        <input
          type="text"
          placeholder="Search Staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <StaffBranchesTable
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {openForm && (
        <StaffBranchesForm
          data={editing}
          onClose={() => {
            setEditing(null);
            setOpenForm(false);
          }}
          onSave={saveStaffBranch}
        />
      )}
    </div>
  );
};

export default StaffBranches;
