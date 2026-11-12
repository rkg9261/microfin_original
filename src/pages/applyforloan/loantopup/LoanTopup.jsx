import React, { useState } from "react";
import "./LoanTopup.css";

import LoanTopupTable from "./LoanTopupTable";
import LoanTopupAddForm from "./LoanTopupAddForm";
import LoanTopupApproveForm from "./LoanTopupApproveForm";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

const LoanTopup = () => {
  const { save } = useSwaggerEntity("loanTopup");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showApproveForm, setShowApproveForm] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState(null);

  const [branchSearch, setBranchSearch] = useState("");
  const [memberSearch, setMemberSearch] = useState("");

  /* =====================================================
     OPEN ADD NEW
  ===================================================== */

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  /* =====================================================
     CLOSE ADD NEW
  ===================================================== */

  const handleCloseAdd = () => {
    setShowAddForm(false);
  };

  /* =====================================================
     CREATE LOAN TOPUP
  ===================================================== */

  const handleCreateLoanTopup = async (data) => {
    try {
      await save(data, null);
      setShowAddForm(false);
    } catch (error) {
      toast.error(error || "Unable to create loan topup.");
    }
  };

  /* =====================================================
     OPEN APPROVE FORM
  ===================================================== */

  const handleLoanTopupApprove = (loan) => {
    setSelectedLoan(loan);
    setShowApproveForm(true);
  };

  /* =====================================================
     CLOSE APPROVE FORM
  ===================================================== */

  const handleCloseApprove = () => {
    setShowApproveForm(false);
    setSelectedLoan(null);
  };

  /* =====================================================
     APPROVE LOAN TOPUP
  ===================================================== */

  const handleApproveLoanTopup = (data) => {
    console.log("APPROVE LOAN TOPUP:", data);

    // API will be added later

    setShowApproveForm(false);
    setSelectedLoan(null);
  };

  return (
    <div className="loan-topup-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="loan-topup-page-header">

        <h2>LOAN TOPUP</h2>

        <div className="loan-topup-breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Loan Topup</strong>
        </div>

      </div>


      {/* =================================================
          SEARCH SECTION
      ================================================= */}

      <div className="loan-topup-search-section">

        <div className="loan-topup-search-title">
          SEARCH BY
        </div>

        <div className="loan-topup-search-grid">

          {/* BRANCH */}

          <div className="loan-topup-search-field">

            <label>BRANCH</label>

            <div className="loan-topup-search-input-wrapper">

              <input
                type="text"
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
              />

              {branchSearch && (
                <button
                  type="button"
                  className="loan-topup-search-clear"
                  onClick={() => setBranchSearch("")}
                >
                  ×
                </button>
              )}

              <span className="loan-topup-search-arrow">
                ▼
              </span>

            </div>

          </div>


          {/* MEMBER */}

          <div className="loan-topup-search-field">

            <label>MEMBER (TYPE HERE)</label>

            <div className="loan-topup-search-input-wrapper">

              <input
                type="text"
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
              />

              {memberSearch && (
                <button
                  type="button"
                  className="loan-topup-search-clear"
                  onClick={() => setMemberSearch("")}
                >
                  ×
                </button>
              )}

              <span className="loan-topup-search-arrow">
                ▼
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <LoanTopupTable
        branchSearch={branchSearch}
        memberSearch={memberSearch}
        onAddNew={handleAddNew}
        onApprove={handleLoanTopupApprove}
      />


      {/* =================================================
          ADD NEW MODAL
      ================================================= */}

      {showAddForm && (
        <LoanTopupAddForm
          onClose={handleCloseAdd}
          onCreate={handleCreateLoanTopup}
        />
      )}


      {/* =================================================
          APPROVE MODAL
      ================================================= */}

      {showApproveForm && (
        <LoanTopupApproveForm
          loan={selectedLoan}
          onClose={handleCloseApprove}
          onCreate={handleApproveLoanTopup}
        />
      )}

    </div>
  );
};

export default LoanTopup;