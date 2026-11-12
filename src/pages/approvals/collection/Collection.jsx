import React, { useState } from "react";
import CollectionTable from "./CollectionTable";
import "./Collection.css";

const Collection = () => {
  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
    ledgerAccount: "",
    date: "",
    staffId: "",
    customer: "",
  });

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // GET RECORD
  // =========================================================

  const handleGetRecord = (e) => {
    e.preventDefault();

    console.log("Collection filters:", filters);
  };

  return (
    <div className="collection-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="collection-page-header">

        <h2>COLLECTION</h2>

        <div className="collection-breadcrumb">

          <span>⌂ DASHBOARD</span>

          <span className="collection-breadcrumb-arrow">
            ›
          </span>

          <strong>COLLECTION</strong>

        </div>

      </div>


      {/* =====================================================
          SEARCH CARD
      ===================================================== */}

      <div className="collection-filter-card">

        <div className="collection-filter-title">
          SEARCH BY
        </div>


        <form
          className="collection-filter-form"
          onSubmit={handleGetRecord}
        >

          {/* =================================================
              BRANCH
          ================================================= */}

          <div className="collection-field">

            <label>
              BRANCH
            </label>

            <div className="collection-select-box">

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

              <span className="collection-select-icons">
                ×⌄
              </span>

            </div>

          </div>


          {/* =================================================
              LEDGER ACCOUNT
          ================================================= */}

          <div className="collection-field">

            <label>
              SELECT LEDGER ACCOUNT
            </label>

            <select
              name="ledgerAccount"
              value={filters.ledgerAccount}
              onChange={handleChange}
            >

              <option value="">
                Select Ledger Account
              </option>

              <option value="CASH">
                CASH
              </option>

              <option value="BANK">
                BANK
              </option>

              <option value="UPI">
                UPI
              </option>

              <option value="COLLECTION ACCOUNT">
                COLLECTION ACCOUNT
              </option>

            </select>

          </div>


          {/* =================================================
              DATE
          ================================================= */}

          <div className="collection-field">

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


          {/* =================================================
              STAFF ID
          ================================================= */}

          <div className="collection-field">

            <label>
              STAFF ID <span>*</span>
            </label>

            <div className="collection-select-box">

              <select
                name="staffId"
                value={filters.staffId}
                onChange={handleChange}
              >

                <option value="">
                  Select Staff
                </option>

                <option value="ADM01">
                  ADMIN (ADM01)
                </option>

                <option value="SLF015">
                  DINESH 1 (SLF015)
                </option>

                <option value="SLF016">
                  STAFF 2 (SLF016)
                </option>

              </select>

              <span className="collection-select-icons">
                ×⌄
              </span>

            </div>

          </div>


          {/* =================================================
              CUSTOMER
          ================================================= */}

          <div className="collection-field collection-customer-field">

            <label>
              CUSTOMER (TYPE HERE)
            </label>

            <input
              type="text"
              name="customer"
              placeholder=""
              value={filters.customer}
              onChange={handleChange}
            />

            <span className="collection-customer-clear">
              ×⌄
            </span>

          </div>


          {/* =================================================
              BUTTON
          ================================================= */}

          <div className="collection-submit-wrapper">

            <button
              type="submit"
              className="collection-get-record-btn"
            >
              GET RECORD
            </button>

          </div>

        </form>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <CollectionTable
        filters={filters}
      />

    </div>
  );
};

export default Collection;