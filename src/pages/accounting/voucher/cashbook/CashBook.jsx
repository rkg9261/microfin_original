import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaTimes,
  FaSearch,
  FaPrint,
  FaBook,
} from "react-icons/fa";

import "./CashBook.css";
import CashBookTable from "./CashBookTable";

const CashBook = () => {
  // =========================================================
  // FILTER STATES
  // =========================================================

  const [branch, setBranch] = useState("");
  const [selectDate, setSelectDate] = useState("13-08-2026");
  const [bankLedger, setBankLedger] = useState("");

  const [showBranchDropdown, setShowBranchDropdown] =
    useState(false);

  const [showBankDropdown, setShowBankDropdown] =
    useState(false);

  // =========================================================
  // APPLIED FILTERS
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
    date: "13-08-2026",
    bankLedger: "",
  });

  // =========================================================
  // BRANCH DATA
  // =========================================================

  const branches = [
    {
      id: 1,
      name: "MAIN BRANCH",
    },
    {
      id: 2,
      name: "LASKARHAT",
    },
 
  ];

  // =========================================================
  // BANK LEDGER DATA
  // =========================================================

  const bankLedgers = [
    {
      id: 1,
      name: "STATE BANK OF INDIA",
    },
    {
      id: 2,
      name: "HDFC BANK",
    },
    {
      id: 3,
      name: "ICICI BANK",
    },
    {
      id: 4,
      name: "AXIS BANK",
    },
  ];

  // =========================================================
  // SELECT BRANCH
  // =========================================================

  const handleSelectBranch = (item) => {
    setBranch(item.name);
    setShowBranchDropdown(false);
  };

  // =========================================================
  // SELECT BANK
  // =========================================================

  const handleSelectBank = (item) => {
    setBankLedger(item.name);
    setShowBankDropdown(false);
  };

  // =========================================================
  // CLEAR BRANCH
  // =========================================================

  const handleClearBranch = () => {
    setBranch("");
    setShowBranchDropdown(false);
  };

  // =========================================================
  // CLEAR BANK
  // =========================================================

  const handleClearBank = () => {
    setBankLedger("");
    setShowBankDropdown(false);
  };

  // =========================================================
  // GET RECORDS
  // =========================================================

  const handleGetRecords = () => {
    setFilters({
      branch,
      date: selectDate,
      bankLedger,
    });
  };

  // =========================================================
  // FILTER BRANCH
  // =========================================================

  const filteredBranches = branches.filter((item) =>
    item.name
      .toLowerCase()
      .includes(branch.toLowerCase())
  );

  // =========================================================
  // FILTER BANK
  // =========================================================

  const filteredBanks = bankLedgers.filter((item) =>
    item.name
      .toLowerCase()
      .includes(bankLedger.toLowerCase())
  );

  // =========================================================
  // PRINT CASHBOOK
  // =========================================================

  const handlePrintCashBook = () => {
    window.print();
  };

  // =========================================================
  // PRINT BANKBOOK
  // =========================================================

  const handlePrintBankBook = () => {
    window.print();
  };

  // =========================================================
  // PRINT BOTH
  // =========================================================

  const handlePrintBoth = () => {
    window.print();
  };

  return (
    <div className="cashbook-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="cashbook-page-header">

        <div className="cashbook-title">

          <FaBook className="cashbook-title-icon" />

          <span>
            CASHBOOK
          </span>

        </div>

        <div className="cashbook-breadcrumb">

          <span>
            DASHBOARD
          </span>

          <span className="cashbook-breadcrumb-arrow">
            ›
          </span>

          <strong>
            CASHBOOK
          </strong>

        </div>

      </div>


      {/* =====================================================
          BLUE HEADER LINE
      ===================================================== */}

      <div className="cashbook-header-line"></div>


      {/* =====================================================
          SEARCH / FILTER SECTION
      ===================================================== */}

      <div className="cashbook-filter-card">

        <div className="cashbook-filter-grid">


          {/* =================================================
              SELECT BRANCH
          ================================================= */}

          <div className="cashbook-filter-item">

            <label>
              SELECT BRANCH
            </label>

            <div className="cashbook-select-box">

              <input
                type="text"
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                  setShowBranchDropdown(true);
                }}
                onFocus={() =>
                  setShowBranchDropdown(true)
                }
                placeholder=""
              />

              {branch && (
                <button
                  type="button"
                  className="cashbook-clear-btn"
                  onClick={handleClearBranch}
                >
                  <FaTimes />
                </button>
              )}

              <button
                type="button"
                className="cashbook-arrow-btn"
                onClick={() =>
                  setShowBranchDropdown(
                    (prev) => !prev
                  )
                }
              >
                <FaChevronDown />
              </button>

            </div>


            {/* BRANCH DROPDOWN */}

            {showBranchDropdown && (

              <div className="cashbook-dropdown">

                {filteredBranches.length > 0 ? (

                  filteredBranches.map((item) => (

                    <div
                      key={item.id}
                      className="cashbook-dropdown-item"
                      onClick={() =>
                        handleSelectBranch(item)
                      }
                    >
                      {item.name}
                    </div>

                  ))

                ) : (

                  <div className="cashbook-no-option">
                    No branch found
                  </div>

                )}

              </div>

            )}

          </div>


          {/* =================================================
              SELECT DATE
          ================================================= */}

          <div className="cashbook-filter-item">

            <label>
              SELECT DATE
            </label>

            <div className="cashbook-date-box">

              <input
                type="text"
                value={selectDate}
                placeholder="dd-mm-yyyy"
                onChange={(e) =>
                  setSelectDate(e.target.value)
                }
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* =================================================
              SELECT BANK LEDGER
          ================================================= */}

          <div className="cashbook-filter-item">

            <label>
              SELECT BANK LEDGER
            </label>

            <div className="cashbook-select-box">

              <input
                type="text"
                value={bankLedger}
                onChange={(e) => {
                  setBankLedger(e.target.value);
                  setShowBankDropdown(true);
                }}
                onFocus={() =>
                  setShowBankDropdown(true)
                }
              />

              {bankLedger && (
                <button
                  type="button"
                  className="cashbook-clear-btn"
                  onClick={handleClearBank}
                >
                  <FaTimes />
                </button>
              )}

              <button
                type="button"
                className="cashbook-arrow-btn"
                onClick={() =>
                  setShowBankDropdown(
                    (prev) => !prev
                  )
                }
              >
                <FaChevronDown />
              </button>

            </div>


            {/* BANK DROPDOWN */}

            {showBankDropdown && (

              <div className="cashbook-dropdown">

                {filteredBanks.length > 0 ? (

                  filteredBanks.map((item) => (

                    <div
                      key={item.id}
                      className="cashbook-dropdown-item"
                      onClick={() =>
                        handleSelectBank(item)
                      }
                    >
                      {item.name}
                    </div>

                  ))

                ) : (

                  <div className="cashbook-no-option">
                    No bank ledger found
                  </div>

                )}

              </div>

            )}

          </div>


          {/* =================================================
              GET RECORDS
          ================================================= */}

          <div className="cashbook-get-record-area">

            <button
              type="button"
              className="cashbook-get-record-btn"
              onClick={handleGetRecords}
            >

              <FaSearch />

              GET RECORDS

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          GREEN ACTION BAR
      ===================================================== */}

      <div className="cashbook-action-bar">

        <div className="cashbook-action-title">
          CASH BOOK
        </div>


        <button
          type="button"
          className="cashbook-action-btn"
          onClick={handlePrintCashBook}
        >

          <FaPrint />

          Print Cashbook

        </button>


        <button
          type="button"
          className="cashbook-action-btn"
          onClick={handlePrintBankBook}
        >

          <FaPrint />

          Print Bankbook

        </button>


        <button
          type="button"
          className="cashbook-action-btn"
          onClick={handlePrintBoth}
        >

          <FaPrint />

          Print Cash Book & Bank Book

        </button>

      </div>


      {/* =====================================================
          RECORD TABLES
      ===================================================== */}

      <CashBookTable
        filters={filters}
      />

    </div>
  );
};

export default CashBook;