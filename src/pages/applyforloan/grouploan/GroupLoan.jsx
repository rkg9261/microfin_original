import React, { useEffect, useState } from "react";

import GroupLoanTable from "./GroupLoanTable";
import GroupLoanForm from "./GroupLoanForm";
import GroupLoanView from "./GroupLoanView";

import "./GroupLoan.css";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchBranches } from "../../../store/slices/branchSlice";

const GroupLoan = () => {
  const dispatch = useAppDispatch();
  const { save } = useSwaggerEntity("groupLoan");
  const { items: branches, loading: branchesLoading } = useAppSelector(
    (state) => state.branch
  );

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const [showForm, setShowForm] = useState(false);
  const [showView, setShowView] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState(null);

  const [branchSearch, setBranchSearch] = useState("");

  /* =====================================================
     ADD NEW
  ===================================================== */

  const handleAddNew = () => {
    setSelectedLoan(null);
    setShowView(false);
    setShowForm(true);
  };

  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (loan) => {
    setSelectedLoan(loan);
    setShowForm(false);
    setShowView(true);
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (loan) => {
    setSelectedLoan(loan);
    setShowView(false);
    setShowForm(true);
  };

  /* =====================================================
     CLOSE FORM
  ===================================================== */

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedLoan(null);
  };

  /* =====================================================
     CLOSE VIEW
  ===================================================== */

  const handleCloseView = () => {
    setShowView(false);
    setSelectedLoan(null);
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSave = async (formData) => {
    try {
      await save(formData, selectedLoan);
      setShowForm(false);
      setSelectedLoan(null);
    } catch (error) {
      toast.error(error || "Unable to save group loan.");
    }
  };

  return (
    <div className="group-loan-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="group-loan-page-header">

        <div>
          <h1>GROUP LOAN</h1>

          <div className="group-loan-breadcrumb">
            <span>DASHBOARD</span>
            <b>›</b>
            <strong>GROUP LOAN</strong>
          </div>
        </div>

      </div>


      {/* =================================================
          SEARCH SECTION
      ================================================= */}

      <div className="group-loan-search-section">

        <h3>SEARCH BY</h3>

        <div className="group-loan-search-row">

          <div className="group-loan-search-field">

            <label>
              BRANCH
            </label>

            <div className="group-loan-select-wrapper">

              <select
                value={branchSearch}
                onChange={(e) =>
                  setBranchSearch(e.target.value)
                }
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

              {branchSearch && (
                <button
                  type="button"
                  className="group-loan-clear-select"
                  onClick={() => setBranchSearch("")}
                >
                  ×
                </button>
              )}

            </div>

          </div>


          <button
            type="button"
            className="group-loan-get-record-btn"
          >
            GET RECORD
          </button>


          <button
            type="button"
            className="group-loan-print-btn"
            onClick={() => window.print()}
          >
            GET PRINT
          </button>

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <GroupLoanTable
        branchSearch={branchSearch}
        onAddNew={handleAddNew}
        onView={handleView}
        onEdit={handleEdit}
      />


      {/* =================================================
          ADD / EDIT FORM
      ================================================= */}

      {showForm && (
        <GroupLoanForm
          loan={selectedLoan}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}


      {/* =================================================
          VIEW DETAILS
      ================================================= */}

      {showView && selectedLoan && (
        <GroupLoanView
          loan={selectedLoan}
          onClose={handleCloseView}
        />
      )}

    </div>
  );
};

export default GroupLoan;