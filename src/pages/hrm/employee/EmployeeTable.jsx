import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import EntriesDropdown from "../../../components/common/EntriesDropdown";
import { useConfirm } from "../../../components/common/ConfirmModal";
import "../../../components/common/Table.css";
import "../../../components/common/Search.css";
import "./Employee.css";

const statusClass = (value) => {
  const raw = String(value || "").toUpperCase();
  if (raw === "ACTIVE") return "active";
  if (raw === "PENDING") return "pending";
  return "inactive";
};

const EmployeeTable = ({
  data = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  const confirm = useConfirm();
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const filteredData = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) return data;

    return data.filter((item) => {
      const haystack = [
        item.name,
        item.firstName,
        item.lastName,
        item.employeeCode,
        item.email,
        item.mobileNumber,
        item.designationName,
        item.branchName,
      ]
        .map((part) => String(part || "").toLowerCase())
        .join(" ");

      return haystack.includes(value);
    });
  }, [data, search]);

  const handleDelete = async (row) => {
    const id = row.employeeId ?? row.id;
    const confirmed = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this employee?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });
    if (!confirmed) return;

    try {
      await onDelete(id);
      toast.success("Employee deleted successfully.");
    } catch (error) {
      toast.error(error || "Unable to delete employee.");
    }
  };

  return (
    <div className="employee-table-card">
      <div className="table-toolbar">
        <EntriesDropdown value={entries} onChange={setEntries} />
        <div className="table-search">
          <input
            type="text"
            placeholder="Search by Name, Mobile, Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="common-table-wrapper">
        <table className="common-table">
          <thead>
            <tr>
              <th>SR.</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>DESIGNATION</th>
              <th>MOBILE</th>
              <th>BRANCH</th>
              <th>KYC STATUS</th>
              <th>LOGIN STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  Loading employees...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No Employee Found
                </td>
              </tr>
            ) : (
              filteredData.slice(0, entries).map((row, index) => {
                const id = row.employeeId ?? row.id;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="employee-name-cell">
                        <strong>{row.name || "-"}</strong>
                        <span>({row.employeeCode || id})</span>
                      </div>
                    </td>
                    <td>{row.email || "-"}</td>
                    <td>{row.designationName || "-"}</td>
                    <td>{row.mobileNumber || "-"}</td>
                    <td>{row.branchName || "-"}</td>
                    <td>
                      <span className={`employee-status ${statusClass(row.kycStatus)}`}>
                        {String(row.kycStatus || "PENDING").toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className={`employee-status ${statusClass(row.loginStatus)}`}>
                        {String(row.loginStatus || "INACTIVE").toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div
                        className="employee-task-menu"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className="employee-task-btn"
                          onClick={() =>
                            setOpenMenuId((prev) => (prev === id ? null : id))
                          }
                        >
                          Task ▾
                        </button>
                        {openMenuId === id && (
                          <div className="employee-task-dropdown">
                            <button type="button" onClick={() => onEdit(row)}>
                              Edit
                            </button>
                            <button type="button" onClick={() => handleDelete(row)}>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
