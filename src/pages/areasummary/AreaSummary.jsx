import React, { useState } from "react";
import { useConfirm } from "../../components/common/ConfirmModal";

import AreaSummaryTable from "./AreaSummaryTable";
import AreaSummaryForm from "./AreaSummaryForm";
import AreaSummaryView from "./AreaSummaryView";

import "./AreaSummary.css";

const AreaSummary = () => {
  const confirm = useConfirm();

  const [branchSearch, setBranchSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);

  const [editingArea, setEditingArea] = useState(null);
  const [viewingArea, setViewingArea] = useState(null);

  /* =====================================================
     OPEN ADD FORM
  ===================================================== */

  const handleAddNew = () => {
    setEditingArea(null);
    setShowForm(true);
  };

  /* =====================================================
     OPEN VIEW
  ===================================================== */

  const handleView = (area) => {
    setViewingArea(area);
    setShowView(true);
  };

  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const handleEdit = (area) => {
    setEditingArea(area);
    setShowForm(true);
  };

  /* =====================================================
     CLOSE FORM
  ===================================================== */

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingArea(null);
  };

  /* =====================================================
     CLOSE VIEW
  ===================================================== */

  const handleCloseView = () => {
    setShowView(false);
    setViewingArea(null);
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSave = (formData) => {
    console.log("AREA SUMMARY SAVED:", formData);

    setShowForm(false);
    setEditingArea(null);
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (area) => {
    const confirmDelete = await confirm({
      title: "Confirm Delete",
      message: `Are you sure you want to delete "${area.areaName}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
    });

    if (!confirmDelete) return;

    console.log("DELETE AREA:", area);
  };

  return (
    <div className="area-summary-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="area-summary-page-header">
        <div>
          <h1>AREA SUMMARY</h1>

          <div className="area-summary-breadcrumb">
            <span>DASHBOARD</span>
            <span>›</span>
            <strong>AREA SUMMARY</strong>
          </div>
        </div>
      </div>


      {/* =================================================
          SEARCH / FILTER
      ================================================= */}

      <div className="area-summary-filter-card">

        <div className="area-summary-filter-title">
          FILTER BY
        </div>

        <div className="area-summary-filter-row">

          <div className="area-summary-filter-field">

            <label>
              BRANCH
            </label>

            <div className="area-summary-select-wrapper">

              <select
                value={branchSearch}
                onChange={(e) =>
                  setBranchSearch(e.target.value)
                }
              >

                <option value="">
                  Select Branch
                </option>

                <option value="SHREEJA GROUP">
                  SHREEJA GROUP
                </option>

                <option value="KOLKATA - DALHOUSIE">
                  KOLKATA - DALHOUSIE
                </option>

                <option value="JAGATAPURA">
                  JAGATAPURA
                </option>

                <option value="LASKARHAT">
                  LASKARHAT
                </option>

                <option value="RAM CAPITAL TRUST">
                  RAM CAPITAL TRUST
                </option>

              </select>

              {branchSearch && (
                <button
                  type="button"
                  className="area-summary-clear-filter"
                  onClick={() => setBranchSearch("")}
                >
                  ×
                </button>
              )}

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <AreaSummaryTable
        branchSearch={branchSearch}
        onAddNew={handleAddNew}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />


      {/* =================================================
          ADD / EDIT FORM
      ================================================= */}

      {showForm && (
        <AreaSummaryForm
          area={editingArea}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}


      {/* =================================================
          VIEW DETAILS
      ================================================= */}

      {showView && viewingArea && (
        <AreaSummaryView
          area={viewingArea}
          onClose={handleCloseView}
        />
      )}

    </div>
  );
};

export default AreaSummary;