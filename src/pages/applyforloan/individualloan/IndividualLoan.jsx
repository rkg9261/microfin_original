import React, { useState } from "react";

import IndividualLoanTable from "./IndividualLoanTable";
import IndividualLoanForm from "./IndividualLoanForm";
import IndividualLoanView from "./IndividualLoanView";

import "./IndividualLoan.css";
import { toast } from "react-toastify";
import { useSwaggerEntity } from "../../../store/useSwaggerEntity";

const IndividualLoan = () => {
  const { save } = useSwaggerEntity("individualLoan");


  const [branchSearch, setBranchSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [showView, setShowView] = useState(false);

  const [selectedLoan, setSelectedLoan] = useState(null);

  const [editLoan, setEditLoan] = useState(null);


  /* =====================================================
     ADD NEW
  ===================================================== */

  const handleAddNew = () => {

    setSelectedLoan(null);

    setEditLoan(null);

    setShowView(false);

    setShowForm(true);

  };


  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (loan) => {

    console.log("VIEW SELECTED:", loan);

    setSelectedLoan(loan);

    setShowForm(false);

    setShowView(true);

  };


  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (loan) => {

    console.log("EDIT SELECTED:", loan);

    setEditLoan(loan);

    setShowView(false);

    setShowForm(true);

  };


  /* =====================================================
     CLOSE FORM
  ===================================================== */

  const handleCloseForm = () => {

    setShowForm(false);

    setEditLoan(null);

  };


  /* =====================================================
     CLOSE VIEW
  ===================================================== */

  const handleCloseView = () => {

    setShowView(false);

    setSelectedLoan(null);

  };

  const handleSave = async (formData) => {
    try {
      await save(formData, editLoan);
      handleCloseForm();
    } catch (error) {
      toast.error(error || "Unable to save individual loan.");
    }
  };


  return (

    <div className="individual-loan-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="individual-loan-page-header">

        <div>

          <h1>
            INDIVIDUAL LOAN
          </h1>

          <div className="individual-loan-breadcrumb">
            DASHBOARD
            <span>›</span>
            INDIVIDUAL LOAN
          </div>

        </div>

      </div>


      {/* =================================================
          SEARCH
      ================================================= */}

      <div className="individual-loan-search-section">

        <h3>
          SEARCH BY
        </h3>


        <div className="individual-loan-search-fields">

          <div className="individual-loan-search-field">

            <label>
              BRANCH
            </label>

            <div className="individual-loan-input-wrapper">

              <input
                type="text"
                placeholder="Select Branch"
                value={branchSearch}
                onChange={(e) =>
                  setBranchSearch(e.target.value)
                }
              />

              {branchSearch && (

                <button
                  type="button"
                  onClick={() =>
                    setBranchSearch("")
                  }
                >
                  ×
                </button>

              )}

              <span>
                ▾
              </span>

            </div>

          </div>


          <button
            type="button"
            className="individual-loan-get-record-button"
          >
            GET RECORD
          </button>

        </div>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <IndividualLoanTable
        branchSearch={branchSearch}
        onAddNew={handleAddNew}
        onView={handleView}
        onEdit={handleEdit}
      />


      {/* =================================================
          ADD / EDIT FORM
      ================================================= */}

      {showForm && (

        <IndividualLoanForm
          loan={editLoan}
          onClose={handleCloseForm}
          onSave={handleSave}
        />

      )}


      {/* =================================================
          VIEW DETAILS
      ================================================= */}

      {showView && selectedLoan && (

        <IndividualLoanView
          loan={selectedLoan}
          onClose={handleCloseView}
        />

      )}

    </div>
  );
};

export default IndividualLoan;