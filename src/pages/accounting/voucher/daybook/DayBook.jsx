import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaTimes,
  FaSearch,
  FaBook,
} from "react-icons/fa";

import "./DayBook.css";
import DayBookTable from "./DayBookTable";

const DayBook = () => {
  // =========================================================
  // FILTER STATES
  // =========================================================

  const [loanId, setLoanId] = useState("");
  const [date, setDate] = useState("13-08-2026");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [voucher, setVoucher] = useState("");

  const [showLoanDropdown, setShowLoanDropdown] =
    useState(false);

  // =========================================================
  // APPLIED FILTERS
  // =========================================================

  const [filters, setFilters] = useState({
    loanId: "",
    date: "13-08-2026",
    startDate: "",
    endDate: "",
    voucher: "",
  });

  // =========================================================
  // LOAN LIST
  // =========================================================

  const loanList = [
    {
      id: "LN001",
      member: "AMBEY",
    },
    {
      id: "LN002",
      member: "KIRAN DEVI",
    },
    
  ];

  // =========================================================
  // SELECT LOAN
  // =========================================================

  const handleSelectLoan = (loan) => {
    setLoanId(`${loan.id} - ${loan.member}`);
    setShowLoanDropdown(false);
  };

  // =========================================================
  // CLEAR LOAN
  // =========================================================

  const handleClearLoan = () => {
    setLoanId("");
    setShowLoanDropdown(false);
  };

  // =========================================================
  // FILTER LOANS
  // =========================================================

  const filteredLoans = loanList.filter((loan) => {
    if (!loanId) {
      return true;
    }

    return `${loan.id} ${loan.member}`
      .toLowerCase()
      .includes(loanId.toLowerCase());
  });

  // =========================================================
  // GET RECORDS
  // =========================================================

  const handleGetRecords = () => {
    setFilters({
      loanId,
      date,
      startDate,
      endDate,
      voucher,
    });
  };

  // =========================================================
  // CLEAR ALL FILTERS
  // =========================================================

  const handleClearFilters = () => {
    setLoanId("");
    setDate("13-08-2026");
    setStartDate("");
    setEndDate("");
    setVoucher("");

    setFilters({
      loanId: "",
      date: "13-08-2026",
      startDate: "",
      endDate: "",
      voucher: "",
    });
  };

  return (
    <div className="daybook-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="daybook-page-header">

        <div className="daybook-title">

          <FaBook className="daybook-title-icon" />

          <span>
            DAYBOOK
          </span>

        </div>

        <div className="daybook-breadcrumb">

          <span>
            DASHBOARD
          </span>

          <span className="breadcrumb-arrow">
            ›
          </span>

          <strong>
            DAYBOOK
          </strong>

        </div>

      </div>

      {/* =====================================================
          HEADER LINE
      ===================================================== */}

      <div className="daybook-header-line"></div>


      {/* =====================================================
          SEARCH / FILTER
      ===================================================== */}

      <div className="daybook-filter-card">

        {/* ===================================================
            TOP FILTER ROW
        =================================================== */}

        <div className="daybook-filter-top-row">

          {/* LOAN SEARCH */}

          <div className="daybook-filter-item">

            <label>
              LOAN ID / MEMBER
            </label>

            <div className="daybook-loan-select">

              <input
                type="text"
                value={loanId}
                onChange={(e) => {
                  setLoanId(e.target.value);
                  setShowLoanDropdown(true);
                }}
                onFocus={() =>
                  setShowLoanDropdown(true)
                }
              />

              {loanId && (
                <button
                  type="button"
                  className="daybook-input-clear"
                  onClick={handleClearLoan}
                >
                  <FaTimes />
                </button>
              )}

              <button
                type="button"
                className="daybook-input-arrow"
                onClick={() =>
                  setShowLoanDropdown(
                    (previous) => !previous
                  )
                }
              >
                <FaChevronDown />
              </button>

            </div>


            {/* LOAN DROPDOWN */}

            {showLoanDropdown && (

              <div className="daybook-loan-dropdown">

                {filteredLoans.length > 0 ? (

                  filteredLoans.map((loan) => (

                    <div
                      key={loan.id}
                      className="daybook-loan-option"
                      onClick={() =>
                        handleSelectLoan(loan)
                      }
                    >

                      <strong>
                        {loan.id}
                      </strong>

                      <span>
                        {loan.member}
                      </span>

                    </div>

                  ))

                ) : (

                  <div className="daybook-no-option">
                    No record found
                  </div>

                )}

              </div>

            )}

          </div>


          {/* EMPTY SELECT */}

          <div className="daybook-filter-item">

            <label>
              &nbsp;
            </label>

            <div className="daybook-empty-select">

              <input type="text" />

              <FaTimes />

              <FaChevronDown />

            </div>

          </div>


          {/* VOUCHER */}

          <div className="daybook-filter-item">

            <label>
              &nbsp;
            </label>

            <div className="daybook-voucher-select">

              <select
                value={voucher}
                onChange={(e) =>
                  setVoucher(e.target.value)
                }
              >

                <option value="">
                  Select Voucher
                </option>

                <option value="PAYMENT">
                  PAYMENT
                </option>

                <option value="RECEIPT">
                  RECEIPT
                </option>

                <option value="CONTRA">
                  CONTRA
                </option>

                <option value="JOURNAL">
                  JOURNAL
                </option>

                <option value="FUND TRANSFER">
                  FUND TRANSFER
                </option>

              </select>

              <FaChevronDown />

            </div>

          </div>

        </div>


        {/* ===================================================
            SECOND FILTER ROW
        =================================================== */}

        <div className="daybook-filter-bottom-row">

          {/* DATE */}

          <div className="daybook-filter-item">

            <label>
              DATE
            </label>

            <div className="daybook-date-input">

              <input
                type="text"
                value={date}
                placeholder="dd-mm-yyyy"
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* START DATE */}

          <div className="daybook-filter-item">

            <label>
              START DATE
            </label>

            <div className="daybook-date-input">

              <input
                type="text"
                value={startDate}
                placeholder="dd-mm-yyyy"
                onChange={(e) =>
                  setStartDate(e.target.value)
                }
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* END DATE */}

          <div className="daybook-filter-item">

            <label>
              END DATE
            </label>

            <div className="daybook-date-input">

              <input
                type="text"
                value={endDate}
                placeholder="dd-mm-yyyy"
                onChange={(e) =>
                  setEndDate(e.target.value)
                }
              />

              <FaCalendarAlt />

            </div>

          </div>


          {/* GET RECORDS */}

          <div className="daybook-get-record-area">

            <button
              type="button"
              className="daybook-get-record-btn"
              onClick={handleGetRecords}
            >

              <FaSearch />

              GET RECORDS

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          LEDGER CARD
      ===================================================== */}

      <div className="daybook-ledger-card">

        {/* ===================================================
            LEDGER HEADER
        =================================================== */}

        <div className="daybook-ledger-header">

          <div>

            <h2>
              LEDGERS
            </h2>

            <p>
              MAXIMUM RECORDS SHOW LIMIT IS 350
            </p>

          </div>


          <div className="daybook-header-actions">

            <button
              type="button"
              className="daybook-download-btn"
              onClick={() =>
                alert("Download Excel")
              }
            >

              <span>
                ⇩
              </span>

              DOWNLOAD EXCEL

            </button>


            <button
              type="button"
              className="daybook-print-btn"
              onClick={() =>
                window.print()
              }
            >

              PRINT

            </button>

          </div>

        </div>


        {/* ===================================================
            TABLE
        =================================================== */}

        <DayBookTable
          filters={filters}
        />

      </div>

    </div>
  );
};

export default DayBook;