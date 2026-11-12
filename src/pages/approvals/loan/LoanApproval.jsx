import React, { useState } from "react";

import LoanApprovalTable from "./LoanApprovalTable";

import "./LoanApproval.css";

const LoanApproval = () => {

  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    member: "",
    branch: "",
    staff: "",
    group: "",
  });


  // =========================================================
  // HANDLE FILTER CHANGE
  // =========================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Loan Approval Filters:", filters);

  };


  // =========================================================
  // PRINT
  // =========================================================

  const handlePrint = () => {

    window.print();

  };


  return (

    <div className="loan-approval-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="loan-approval-page-header">

        <div>

          <h2>
            APPROVELOAN
          </h2>

          <div className="loan-approval-breadcrumb">

            <span>
              DASHBOARD
            </span>

            <span className="breadcrumb-arrow">
              ›
            </span>

            <strong>
              APPROVELOAN
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================================
          SEARCH SECTION
      ===================================================== */}

      <div className="loan-approval-filter-card">

        <div className="loan-approval-section-title">

          SEARCH BY

        </div>


        <form
          className="loan-approval-filter-form"
          onSubmit={handleSubmit}
        >


          {/* =================================================
              MEMBER
          ================================================= */}

          <div className="loan-approval-field">

            <label>
              MEMBER (TYPE HERE)
            </label>

            <div className="loan-approval-input-with-clear">

              <input
                type="text"
                name="member"
                value={filters.member}
                onChange={handleChange}
                placeholder=""
              />

              {filters.member && (

                <button
                  type="button"
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      member: "",
                    }))
                  }
                  className="loan-approval-clear"
                >
                  ×
                </button>

              )}

              <span className="loan-approval-dropdown-arrow">
                ▼
              </span>

            </div>

          </div>


          {/* =================================================
              BRANCH
          ================================================= */}

          <div className="loan-approval-field">

            <label>
              BRANCH
            </label>

            <div className="loan-approval-input-with-clear">

              <select
                name="branch"
                value={filters.branch}
                onChange={handleChange}
              >

                <option value="">
                  Select Branch
                </option>

                <option value="SHREEJA GROUP">
                  SHREEJA GROUP
                </option>

                <option value="JAGATAPURA">
                  JAGATAPURA
                </option>

                <option value="KOLKATA">
                  KOLKATA - DALHOUSIE
                </option>

                <option value="VADODARA">
                  VADODARA
                </option>

              </select>

            </div>

          </div>


          {/* =================================================
              STAFF
          ================================================= */}

          <div className="loan-approval-field">

            <label>
              STAFF (TYPE HERE)
            </label>

            <select
              name="staff"
              value={filters.staff}
              onChange={handleChange}
            >

              <option value="">
                Select Staff
              </option>

              <option value="ADMIN">
                ADMIN
              </option>

              <option value="STAFF 01">
                STAFF 01
              </option>

              <option value="STAFF 02">
                STAFF 02
              </option>

            </select>

          </div>


          {/* =================================================
              GROUP
          ================================================= */}

          <div className="loan-approval-field">

            <label>
              GROUP
            </label>

            <select
              name="group"
              value={filters.group}
              onChange={handleChange}
            >

              <option value="">
                Select Group
              </option>

              <option value="SHREEJA GROUP">
                SHREEJA GROUP
              </option>

              <option value="BRANCH M FINANCE">
                BRANCH M FINANCE
              </option>

              <option value="JAGATAPURA GROUP">
                JAGATAPURA GROUP
              </option>

            </select>

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="loan-approval-filter-buttons">

            <button
              type="submit"
              className="loan-approval-submit-button"
            >
              Submit
            </button>


            <button
              type="button"
              className="loan-approval-print-button"
              onClick={handlePrint}
            >
              Get Print
            </button>

          </div>

        </form>

      </div>


      {/* =====================================================
          LOAN APPROVAL TABLE
      ===================================================== */}

      <LoanApprovalTable
        filters={filters}
      />

    </div>

  );

};

export default LoanApproval;