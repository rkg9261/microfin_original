import React, { useEffect, useMemo, useState } from "react";
import { useConfirm } from "../../components/common/ConfirmModal";
import { EditButton, DeleteButton } from "../../components/buttons";
import "../../components/common/Table.css";
import "../../components/common/Search.css";
import EntriesDropdown from "../../components/common/EntriesDropdown";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteDistrict,
  fetchDistricts,
} from "../../store/slices/districtSlice";
import { fetchStates } from "../../store/slices/stateSlice";

const DistrictTable = ({ onEdit }) => {
  const confirm = useConfirm();
  const dispatch = useAppDispatch();
  const { items: districts, loading, error } = useAppSelector(
    (state) => state.districtMaster
  );
  const { items: states } = useAppSelector((state) => state.stateMaster);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  useEffect(() => {
    dispatch(fetchDistricts());
    dispatch(fetchStates());
  }, [dispatch]);

  const stateNameById = useMemo(() => {
    const map = {};
    states.forEach((state) => {
      const id = state.stateId ?? state.id;
      if (id != null) {
        map[id] = state.stateName;
      }
    });
    return map;
  }, [states]);

  const handleDelete = async (districtId) => {
    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this district?",
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmDelete) {
      return;
    }

    try {
      await dispatch(deleteDistrict(districtId)).unwrap();
      toast.success("District deleted successfully!");
    } catch (err) {
      toast.error(err || "Failed to delete district.");
    }
  };

  const filteredData = useMemo(() => {
    const value = search.trim().toLowerCase();
    if (!value) {
      return districts;
    }

    return districts.filter((item) => {
      const districtName = item.districtName?.toString().toLowerCase() || "";
      const districtCode = item.districtCode?.toString().toLowerCase() || "";
      const stateName = (
        item.stateName ||
        item.state?.stateName ||
        stateNameById[item.stateId] ||
        ""
      )
        .toString()
        .toLowerCase();
      const status = item.isActive ? "active" : "inactive";

      return (
        districtName.includes(value) ||
        districtCode.includes(value) ||
        stateName.includes(value) ||
        String(item.stateId || "").includes(value) ||
        status.includes(value)
      );
    });
  }, [districts, search, stateNameById]);

  return (
    <>
      <div className="common-search">
        <input
          type="text"
          placeholder="Search Districts..."
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
            Loading Districts...
          </div>
        ) : (
          <table className="common-table">
            <thead>
              <tr>
                <th>SR. NO.</th>
                <th>DISTRICT NAME</th>
                <th>DISTRICT CODE</th>
                <th>STATE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, Number(entries)).map((row, index) => (
                <tr key={row.districtId ?? row.id ?? index}>
                  <td>{index + 1}</td>
                  <td>{row.districtName}</td>
                  <td>{row.districtCode}</td>
                  <td>
                    {row.stateName ||
                      row.state?.stateName ||
                      stateNameById[row.stateId] ||
                      row.stateId ||
                      "-"}
                  </td>
                  <td>
                    <span
                      className={
                        row.isActive ? "status-active" : "status-inactive"
                      }
                    >
                      {row.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>
                  <td>
                    <div className="table-action">
                      <EditButton text="Edit" onClick={() => onEdit(row)} />
                      <DeleteButton
                        text="Delete"
                        onClick={() => handleDelete(row.districtId)}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "25px",
                      fontSize: "14px",
                      color: "#777",
                    }}
                  >
                    No District Found
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

export default DistrictTable;
