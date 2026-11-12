import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { AddButton } from "../../../components/buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../../../store/slices/employeeSlice";
import {
  mapEmployeeToApi,
} from "../../../api/employeeApi";
import EmployeeForm from "./EmployeeForm";
import EmployeeTable from "./EmployeeTable";
import "./Employee.css";

const Employee = () => {
  const dispatch = useAppDispatch();
  const { items: employees, loading, saving } = useAppSelector(
    (state) => state.employee
  );
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );

  const [branchFilter, setBranchFilter] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchBranches());
  }, [dispatch]);

  const filteredEmployees = useMemo(() => {
    if (!branchFilter) return employees;
    return employees.filter(
      (item) => String(item.branchId ?? "") === String(branchFilter)
    );
  }, [employees, branchFilter]);

  const handleSave = async (formData) => {
    try {
      const payload = mapEmployeeToApi(formData, editing);
      if (editing) {
        const id = editing.employeeId ?? editing.id;
        await dispatch(updateEmployee({ id, data: payload })).unwrap();
        toast.success("Employee updated successfully.");
      } else {
        await dispatch(createEmployee(payload)).unwrap();
        toast.success("Employee saved successfully.");
      }
      setEditing(null);
      setOpenForm(false);
    } catch (error) {
      toast.error(error || "Unable to save employee.");
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteEmployee(id)).unwrap();
  };

  const exportExcel = () => {
    const rows = [
      [
        "SR",
        "Name",
        "Employee Code",
        "Email",
        "Designation",
        "Mobile",
        "Branch",
        "KYC Status",
        "Login Status",
      ],
      ...filteredEmployees.map((item, index) => [
        index + 1,
        item.name || "",
        item.employeeCode || "",
        item.email || "",
        item.designationName || "",
        item.mobileNumber || "",
        item.branchName || "",
        item.kycStatus || "",
        item.loginStatus || "",
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "employees.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="employee-page">
      <div className="employee-filter-card">
        <h3>SEARCH BY</h3>
        <div className="employee-filter-grid">
          <div>
            <label>BRANCH</label>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
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
        </div>
      </div>

      <div className="employee-header">
        <div>
          <h2>STAFF LIST</h2>
          <p>Manage Employees</p>
        </div>
        <div className="employee-header-actions">
          <button type="button" className="employee-excel-btn" onClick={exportExcel}>
            DOWNLOAD EXCEL
          </button>
          <AddButton
            text="Add New"
            onClick={() => {
              setEditing(null);
              setOpenForm(true);
            }}
          />
        </div>
      </div>

      <EmployeeTable
        data={filteredEmployees}
        loading={loading}
        onEdit={(row) => {
          setEditing(row);
          setOpenForm(true);
        }}
        onDelete={handleDelete}
      />

      {openForm && (
        <EmployeeForm
          data={editing}
          loading={saving}
          onClose={() => {
            setEditing(null);
            setOpenForm(false);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Employee;
