import React, { useState } from "react";

import SalaryApprovalTable from "./SalaryApprovalTable";

import "./SalaryApproval.css";

const SalaryApproval = () => {
  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
    date: "",
  });

  // =========================================================
  // HANDLE CHANGE
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

    console.log("Salary Approval Filter:", filters);
  };

  return (
    <div className="salary-approval-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="salary-approval-page-header">

        <div>
          <h2>APPROVESALARY</h2>

          <div className="salary-approval-breadcrumb">
            <span>DASHBOARD</span>

            <span className="salary-approval-breadcrumb-arrow">
              ›
            </span>

            <strong>APPROVESALARY</strong>
          </div>
        </div>

      </div>


      {/* =====================================================
          SEARCH BY
      ===================================================== */}

      <div className="salary-approval-filter-card">

        <div className="salary-approval-filter-title">
          SEARCH BY
        </div>


        <form
          className="salary-approval-filter-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              BRANCH
          ================================================= */}

          <div className="salary-approval-field">

            <label>
              BRANCH
            </label>

            <div className="salary-approval-select-wrapper">

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

                <option value="KOLKATA - DALHOUSIE">
                  KOLKATA - DALHOUSIE
                </option>

                <option value="JAGATAPURA">
                  JAGATAPURA
                </option>

                <option value="VADODARA">
                  VADODARA
                </option>

                <option value="BRANCH M FINANCE">
                  BRANCH M FINANCE
                </option>

              </select>

            </div>

          </div>


          {/* =================================================
              DATE
          ================================================= */}

          <div className="salary-approval-field">

            <label>
              DATE
            </label>

            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleChange}
            />

          </div>


          {/* Empty space to match screenshot */}

          <div className="salary-approval-filter-empty"></div>

          <div className="salary-approval-filter-empty"></div>

        </form>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <SalaryApprovalTable
        filters={filters}
      />

    </div>
  );
};

export default SalaryApproval;