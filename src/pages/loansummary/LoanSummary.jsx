import React, { useState } from "react";

import LoanSummaryTable from "./LoanSummaryTable";
import LoanSummaryView from "./LoanSummaryView";

import "./LoanSummary.css";

const LoanSummary = () => {
  const [showView, setShowView] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const [filters, setFilters] = useState({
    branch: "",
    staff: "",
    customer: "",
    loanPlanName: "",
    type: "",
    date: "",
    loanCloseStartDate: "",
    loanCloseEndDate: "",
    lastEmiStartDate: "",
    lastEmiEndDate: "",
    planType: "All",
    recoveryType: "All",
    status: "",
  });

  /* =====================================================
     FILTER CHANGE
  ===================================================== */

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("LOAN SUMMARY FILTER:", filters);
  };

  /* =====================================================
     VIEW
  ===================================================== */

  const handleView = (loan) => {
    setSelectedLoan(loan);
    setShowView(true);
  };

  /* =====================================================
     CLOSE VIEW
  ===================================================== */

  const handleCloseView = () => {
    setShowView(false);
    setSelectedLoan(null);
  };

  return (
    <div className="loan-summary-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="loan-summary-page-header">

        <div>
          <h1>LOAN SUMMARY</h1>

          <div className="loan-summary-breadcrumb">
            <span>DASHBOARD</span>
            <b>›</b>
            <strong>LOAN SUMMARY</strong>
          </div>
        </div>

      </div>


      {/* =================================================
          SEARCH SECTION
      ================================================= */}

      <div className="loan-summary-search-section">

        <h3>SEARCH BY</h3>

        <form onSubmit={handleSubmit}>

          <div className="loan-summary-filter-grid">


            {/* =================================================
                COLUMN 1
            ================================================= */}

            <div className="loan-summary-filter-column">

              {/* BRANCH */}

              <div className="loan-summary-form-group">

                <label>BRANCH</label>

                <div className="loan-summary-select-wrapper">

                  <select
                    name="branch"
                    value={filters.branch}
                    onChange={handleFilterChange}
                  >

                    <option value="">
                      Select Branch
                    </option>

                    <option value="SHREEJA GROUP">
                      SHREEJA GROUP
                    </option>

                    <option value="BRANCH M FINANCE">
                      BRANCH M FINANCE
                    </option>

                  </select>

                  {filters.branch && (
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          branch: "",
                        }))
                      }
                    >
                      ×
                    </button>
                  )}

                </div>

              </div>


              {/* LOAN PLAN NAME */}

              <div className="loan-summary-form-group">

                <label>LOAN PLAN NAME</label>

                <div className="loan-summary-select-wrapper">

                  <select
                    name="loanPlanName"
                    value={filters.loanPlanName}
                    onChange={handleFilterChange}
                  >

                    <option value="">
                      Select Loan Plan
                    </option>

                    <option value="NORMAL PLAN 12 EMI 36%">
                      NORMAL PLAN 12 EMI 36%
                    </option>

                    <option value="NORMAL PLAN 24 EMI 30%">
                      NORMAL PLAN 24 EMI 30%
                    </option>

                  </select>

                  {filters.loanPlanName && (
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          loanPlanName: "",
                        }))
                      }
                    >
                      ×
                    </button>
                  )}

                </div>

              </div>


              {/* DATE */}

              <div className="loan-summary-form-group">

                <label>DATE</label>

                <input
                  type="date"
                  name="date"
                  value={filters.date}
                  onChange={handleFilterChange}
                />

              </div>


              {/* RECOVERY TYPE */}

              <div className="loan-summary-form-group">

                <label>
                  RECOVERY TYPE <span>*</span>
                </label>

                <select
                  name="recoveryType"
                  value={filters.recoveryType}
                  onChange={handleFilterChange}
                >

                  <option value="All">
                    All
                  </option>

                  <option value="Monthly">
                    Monthly
                  </option>

                  <option value="Weekly">
                    Weekly
                  </option>

                  <option value="Daily">
                    Daily
                  </option>

                </select>

              </div>

            </div>


            {/* =================================================
                COLUMN 2
            ================================================= */}

            <div className="loan-summary-filter-column">

              {/* STAFF */}

              <div className="loan-summary-form-group">

                <label>
                  STAFF (TYPE HERE)
                </label>

                <div className="loan-summary-select-wrapper">

                  <select
                    name="staff"
                    value={filters.staff}
                    onChange={handleFilterChange}
                  >

                    <option value="">
                      Select Staff
                    </option>

                    <option value="ADMIN">
                      ADMIN
                    </option>

                    <option value="STAFF01">
                      STAFF01
                    </option>

                    <option value="STAFF02">
                      STAFF02
                    </option>

                  </select>

                  {filters.staff && (
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          staff: "",
                        }))
                      }
                    >
                      ×
                    </button>
                  )}

                </div>

              </div>


              {/* TYPE */}

              <div className="loan-summary-form-group">

                <label>TYPE</label>

                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                >

                  <option value="">
                    Select Plan Type
                  </option>

                  <option value="Individual">
                    Individual
                  </option>

                  <option value="Group">
                    Group
                  </option>

                  <option value="Joint">
                    Joint
                  </option>

                </select>

              </div>


              {/* LAST EMI START DATE */}

              <div className="loan-summary-form-group">

                <label>
                  LAST EMI START DATE
                </label>

                <input
                  type="date"
                  name="lastEmiStartDate"
                  value={filters.lastEmiStartDate}
                  onChange={handleFilterChange}
                />

              </div>


              {/* STATUS */}

              <div className="loan-summary-form-group">

                <label>
                  SELECT STATUS <span>*</span>
                </label>

                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >

                  <option value="">
                    Select Status
                  </option>

                  <option value="Running">
                    Running
                  </option>

                  <option value="Closed">
                    Closed
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

            </div>


            {/* =================================================
                COLUMN 3
            ================================================= */}

            <div className="loan-summary-filter-column">

              {/* CUSTOMER */}

              <div className="loan-summary-form-group">

                <label>
                  CUSTOMER (TYPE HERE)
                </label>

                <div className="loan-summary-select-wrapper">

                  <select
                    name="customer"
                    value={filters.customer}
                    onChange={handleFilterChange}
                  >

                    <option value="">
                      Select Customer
                    </option>

                    <option value="DEEPAK">
                      DEEPAK
                    </option>

                    <option value="AKSHAY GARG">
                      AKSHAY GARG
                    </option>

                    <option value="KOYEL SARKAR">
                      KOYEL SARKAR
                    </option>

                  </select>

                  {filters.customer && (
                    <button
                      type="button"
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          customer: "",
                        }))
                      }
                    >
                      ×
                    </button>
                  )}

                </div>

              </div>


              {/* LOAN CLOSE START */}

              <div className="loan-summary-form-group">

                <label>
                  LOAN CLOSE START DATE
                </label>

                <input
                  type="date"
                  name="loanCloseStartDate"
                  value={filters.loanCloseStartDate}
                  onChange={handleFilterChange}
                />

              </div>


              {/* LAST EMI END */}

              <div className="loan-summary-form-group">

                <label>
                  LAST EMI END DATE
                </label>

                <input
                  type="date"
                  name="lastEmiEndDate"
                  value={filters.lastEmiEndDate}
                  onChange={handleFilterChange}
                />

              </div>


            </div>


            {/* =================================================
                COLUMN 4
            ================================================= */}

            <div className="loan-summary-filter-column">

              {/* LOAN CLOSE END */}

              <div className="loan-summary-form-group">

                <label>
                  LOAN CLOSE END DATE
                </label>

                <input
                  type="date"
                  name="loanCloseEndDate"
                  value={filters.loanCloseEndDate}
                  onChange={handleFilterChange}
                />

              </div>


              {/* SELECT PLAN TYPE */}

              <div className="loan-summary-form-group">

                <label>
                  SELECT PLAN TYPE <span>*</span>
                </label>

                <select
                  name="planType"
                  value={filters.planType}
                  onChange={handleFilterChange}
                >

                  <option value="All">
                    All
                  </option>

                  <option value="Individual">
                    Individual
                  </option>

                  <option value="Group">
                    Group
                  </option>

                  <option value="Joint">
                    Joint
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              SUBMIT
          ================================================= */}

          <button
            type="submit"
            className="loan-summary-submit-btn"
          >
            <span>➤</span>
            SUBMIT
          </button>

        </form>

      </div>


      {/* =================================================
          TABLE
      ================================================= */}

      <LoanSummaryTable
        onView={handleView}
      />


      {/* =================================================
          VIEW POPUP
      ================================================= */}

      {showView && selectedLoan && (
        <LoanSummaryView
          loan={selectedLoan}
          onClose={handleCloseView}
        />
      )}

    </div>
  );
};

export default LoanSummary;