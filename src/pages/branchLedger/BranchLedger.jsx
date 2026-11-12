import React, { useState } from "react";
import BranchLedgerTable from "./BranchLedgerTable";
import BranchLedgerForm from "./BranchLedgerForm";
import "./BranchLedger.css";

const BranchLedger = () => {
  // Only 2 initial records
  const [branchLedgers, setBranchLedgers] = useState([
    {
      id: 1,
      branch: "SHREEJA GROUP",
      ledger: "6000127240",
      remark: "BAROBISHA",
    },
    {
      id: 2,
      branch: "KOLKATA - DALHOUSIE",
      ledger: "DINESH 1",
      remark: "",
    },
  ]);

  const [selectedBranch, setSelectedBranch] = useState("");

  const [showForm, setShowForm] = useState(false);


  // ============================================
  // BRANCH LIST
  // ============================================

  const branches = [
    "SHREEJA GROUP",
    "KOLKATA - DALHOUSIE",
    "LASKARHAT",
    "JAGATPURA",
    "KALITAKUCHI",
  ];


  // ============================================
  // OPEN ADD FORM
  // ============================================

  const handleAdd = () => {
    setShowForm(true);
  };


  // ============================================
  // CLOSE FORM
  // ============================================

  const handleCancel = () => {
    setShowForm(false);
  };


  // ============================================
  // CREATE BRANCH LEDGER
  // ============================================

  const handleCreate = (formData) => {
    const newRecord = {
      id: Date.now(),
      branch: formData.branch,
      ledger: formData.ledger,
      remark: formData.description,
    };

    setBranchLedgers((previous) => [
      ...previous,
      newRecord,
    ]);

    setShowForm(false);
  };


  // ============================================
  // FILTER BY BRANCH
  // ============================================

  const filteredBranchLedgers =
    selectedBranch === ""
      ? branchLedgers
      : branchLedgers.filter(
          (item) =>
            item.branch === selectedBranch
        );


  return (
    <div className="branch-ledger-page">

      {/* ==========================================
          PAGE TOP
      ========================================== */}

      <div className="branch-ledger-top">

        <div className="branch-ledger-page-name">
          BRANCHLEDGER
        </div>

        <div className="branch-ledger-breadcrumb">

          <span>
            Dashboard
          </span>

          <span className="branch-ledger-arrow">
            ›
          </span>

          <strong>
            BRANCHLEDGER
          </strong>

        </div>

      </div>


      {/* ==========================================
          BLUE LINE
      ========================================== */}

      <div className="branch-ledger-line"></div>


      {/* ==========================================
          MAIN CARD
      ========================================== */}

      <div className="branch-ledger-card">


        {/* ========================================
            TITLE
        ======================================== */}

        <div className="branch-ledger-title-row">

          <div className="branch-ledger-title">

            <h2>
              BRANCH LEDGER LIST
            </h2>

            <button
              type="button"
              className="branch-ledger-add-btn"
              onClick={handleAdd}
              title="Add New Branch Ledger"
            >
              +
            </button>

          </div>


          <div className="branch-ledger-window-controls">

            <button type="button">
              −
            </button>

            <button type="button">
              ×
            </button>

          </div>

        </div>


        {/* ========================================
            FILTER AREA
        ======================================== */}

        <div className="branch-ledger-filter-area">

          <div className="branch-ledger-filter-field">

            <label>
              BRANCH NAME
              <span>*</span>
            </label>

            <select
              value={selectedBranch}
              onChange={(e) =>
                setSelectedBranch(e.target.value)
              }
            >

              <option value="">
                Select Company Branch
              </option>

              {branches.map((branch) => (
                <option
                  key={branch}
                  value={branch}
                >
                  {branch}
                </option>
              ))}

            </select>

          </div>

        </div>


        {/* ========================================
            TABLE
        ======================================== */}

        <BranchLedgerTable
          data={filteredBranchLedgers}
        />

      </div>


      {/* ==========================================
          ADD FORM
      ========================================== */}

      {showForm && (
        <BranchLedgerForm
          branches={branches}
          onCreate={handleCreate}
          onCancel={handleCancel}
        />
      )}

    </div>
  );
};

export default BranchLedger;