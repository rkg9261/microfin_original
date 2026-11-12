import React, { useEffect, useState } from "react";

import "./BranchCenter.css";
import "../../components/common/Table.css";
import "../../components/common/Search.css";

import BranchCenterTable from "./BranchCenterTable";
import BranchCenterForm from "./BranchCenterForm";
import { AddButton } from "../../components/buttons";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../store/useSwaggerEntity";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBranches } from "../../store/slices/branchSlice";

const BranchCenter = () => {
  const dispatch = useAppDispatch();
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );
  const { items: branchCenters, save, remove } = useSwaggerEntity("branchCenter");
  const [branch, setBranch] = useState("");
  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const filteredData = branchCenters.filter((item) => {
    const value = search.toLowerCase();
    const matchesBranch =
      branch === "" ||
      String(item.branchId ?? "") === branch ||
      String(item.branch ?? "") === branch;

    return (
      matchesBranch &&
      (
        String(item.code || "").toLowerCase().includes(value) ||
        String(item.name || "").toLowerCase().includes(value) ||
        String(item.branch || "").toLowerCase().includes(value)
      )
    );
  });

  const handleSave = async (data) => {
    try {
      await save(data, editing);
      setEditing(null);
      setOpenForm(false);
    } catch (error) {
      toast.error(error || "Unable to save branch center.");
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
      toast.error(error || "Unable to delete branch center.");
    }
  };

  return (
    <div className="branch-center-page">
      <div className="branch-center-filter-card">
        <h3>FILTER BY</h3>
        <div className="branch-center-filter-grid">
          <div>
            <label>BRANCH</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              disabled={branchesLoading}
            >
              <option value="">
                {branchesLoading ? "Loading branches..." : "Select Branch"}
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
        </div>
      </div>

      <div className="branch-center-header">
        <div>
          <h2>BRANCH CENTER LIST</h2>
          <p>Manage Branch Center</p>
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
          placeholder="Search Branch Center..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <BranchCenterTable
        data={filteredData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {openForm && (
        <BranchCenterForm
          data={editing}
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

export default BranchCenter;
