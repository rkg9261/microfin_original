import React, { useEffect, useMemo, useState } from "react";
import { useConfirm } from "../../components/common/ConfirmModal";
import "../../components/common/Table.css";
import "../../components/common/Search.css";
import EntriesDropdown from "../../components/common/EntriesDropdown";
import { EditButton, DeleteButton } from "../../components/buttons";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteDesignation,
  fetchDesignations,
} from "../../store/slices/designationSlice";

const DesignationTable = ({ onEdit }) => {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { items: designations, loading, error } = useAppSelector(
    (state) => state.designation
  );

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  useEffect(() => {
    dispatch(fetchDesignations());
  }, [dispatch]);

  const handleDelete = async (designationId) => {
    const confirmed = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this designation?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmed) {
      return;
    }

    try {
      await dispatch(deleteDesignation(designationId)).unwrap();
      toast.success("Designation deleted successfully!");
    } catch (err) {
      toast.error(err || "Failed to delete designation.");
    }
  };

  const filteredData = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) {
      return designations;
    }

    return designations.filter((item) => {
      const name = (item.designationName || item.name || "")
        .toString()
        .toLowerCase();
      const code = (item.designationCode || "")
        .toString()
        .toLowerCase();
      const status = item.isActive === false || item.status === "INACTIVE"
        ? "inactive"
        : "active";

      return (
        name.includes(value) ||
        code.includes(value) ||
        status.includes(value)
      );
    });
  }, [designations, search]);

  return (
    <>
      <div className="common-search">
        <input
          type="text"
          placeholder="Search Designation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && (
        <div
          style={{
            padding: "12px 15px",
            marginBottom: "15px",
            color: "#b42318",
            background: "#fee4e2",
            border: "1px solid #fecdca",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <div className="table-card">
        <EntriesDropdown value={entries} onChange={setEntries} />

        {loading ? (
          <div
            style={{
              padding: "30px",
              textAlign: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >
            Loading Designations...
          </div>
        ) : (
          <table className="common-table">
            <thead>
              <tr>
                <th>SR. NO.</th>
                <th>DESIGNATION NAME</th>
                <th>DESIGNATION CODE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, Number(entries)).map((row, index) => {
                const id = row.designationId ?? row.id;
                const isActive =
                  row.isActive !== false &&
                  String(row.status || "ACTIVE").toUpperCase() !== "INACTIVE";

                return (
                  <tr key={id ?? index}>
                    <td>{index + 1}</td>
                    <td>{row.designationName || row.name}</td>
                    <td>{row.designationCode || "-"}</td>
                    <td>
                      <span
                        className={
                          isActive ? "status-active" : "status-inactive"
                        }
                      >
                        {isActive ? "ACTIVE" : "INACTIVE"}
                      </span>
                    </td>
                    <td>
                      <div className="table-action">
                        <EditButton text="Edit" onClick={() => onEdit(row)} />
                        <DeleteButton
                          text="Delete"
                          onClick={() => handleDelete(id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      textAlign: "center",
                      padding: "25px",
                      fontSize: "14px",
                      color: "#777",
                    }}
                  >
                    No Designation Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DesignationTable;
