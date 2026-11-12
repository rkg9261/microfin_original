import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import LoanHistoryTable from "./LoanHistoryTable";

import "./LoanHistory.css";

const LoanHistory = () => {

  // =========================================================
  // FILTER STATES
  // =========================================================

  const [branch, setBranch] = useState("");

  const [staff, setStaff] = useState("");

  const [paymentDate, setPaymentDate] = useState("");

  const [historyType, setHistoryType] = useState("");

  const [action, setAction] = useState("");


  // =========================================================
  // GET RECORD
  // =========================================================

  const handleGetRecord = () => {

    console.log("Loan History Filters:", {
      branch,
      staff,
      paymentDate,
      historyType,
      action,
    });

  };


  // =========================================================
  // CLEAR BRANCH
  // =========================================================

  const clearBranch = () => {
    setBranch("");
  };


  // =========================================================
  // CLEAR STAFF
  // =========================================================

  const clearStaff = () => {
    setStaff("");
  };


  return (

    <div className="loan-history-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="loan-history-header">

        <div className="loan-history-title">
          LOANHISTORY
        </div>


        <div className="loan-history-breadcrumb">

          <span>
            ●
          </span>

          <span>
            DASHBOARD
          </span>

          <span>
            ›
          </span>

          <strong>
            LOANHISTORY
          </strong>

        </div>

      </div>


      {/* =====================================================
          FILTER CARD
      ===================================================== */}

      <div className="loan-history-filter-card">

        <div className="loan-history-filter-title">
          FILTER BY
        </div>


        <div className="loan-history-filter-grid">


          {/* =================================================
              BRANCH
          ================================================= */}

          <div className="loan-history-field">

            <label>
              BRANCH
            </label>

            <div className="loan-history-select-wrapper">

              <select
                value={branch}
                onChange={(e) =>
                  setBranch(e.target.value)
                }
              >

                <option value="">
                  Select Branch
                </option>

                <option value="KOLKATA - DALHOUSIE">
                  KOLKATA - DALHOUSIE
                </option>

                <option value="JAGATAPURA">
                  JAGATAPURA
                </option>

                <option value="LASKARHAT">
                  LASKARHAT
                </option>

                <option value="SHREEJA GROUP">
                  SHREEJA GROUP
                </option>

                <option value="RAM CAPITAL TRUST">
                  RAM CAPITAL TRUST
                </option>

              </select>


              {branch && (

                <button
                  type="button"
                  className="loan-history-clear"
                  onClick={clearBranch}
                >
                  ×
                </button>

              )}

            </div>

          </div>


          {/* =================================================
              STAFF
          ================================================= */}

          <div className="loan-history-field">

            <label>
              STAFF (TYPE HERE)
            </label>

            <div className="loan-history-select-wrapper">

              <select
                value={staff}
                onChange={(e) =>
                  setStaff(e.target.value)
                }
              >

                <option value="">
                  Select Staff
                </option>

                <option value="ADMIN">
                  ADMIN
                </option>

                <option value="DINESH">
                  DINESH
                </option>

                <option value="STAFF01">
                  STAFF01
                </option>

                <option value="STAFF02">
                  STAFF02
                </option>

              </select>


              {staff && (

                <button
                  type="button"
                  className="loan-history-clear"
                  onClick={clearStaff}
                >
                  ×
                </button>

              )}

            </div>

          </div>


          {/* =================================================
              PAYMENT DATE
          ================================================= */}

          <div className="loan-history-field">

            <label>
              PAYMENT DATE
            </label>

            <input
              type="date"
              value={paymentDate}
              onChange={(e) =>
                setPaymentDate(e.target.value)
              }
            />

          </div>


          {/* =================================================
              HISTORY TYPE
          ================================================= */}

          <div className="loan-history-field">

            <label>
              HISTORY TYPE <span>*</span>
            </label>

            <select
              value={historyType}
              onChange={(e) =>
                setHistoryType(e.target.value)
              }
            >

              <option value="">
                Select Action
              </option>

              <option value="PAYMENT">
                PAYMENT
              </option>

              <option value="DISBURSEMENT">
                DISBURSEMENT
              </option>

              <option value="LOAN TOPUP">
                LOAN TOPUP
              </option>

              <option value="LOAN CLOSE">
                LOAN CLOSE
              </option>

              <option value="EMI">
                EMI
              </option>

            </select>

          </div>


          {/* =================================================
              SELECT ACTION
          ================================================= */}

          <div className="loan-history-field action-field">

            <label>
              SELECT ACTION <span>*</span>
            </label>

            <select
              value={action}
              onChange={(e) =>
                setAction(e.target.value)
              }
            >

              <option value="">
                Select Action
              </option>

              <option value="VIEW">
                VIEW
              </option>

              <option value="EDIT">
                EDIT
              </option>

              <option value="DELETE">
                DELETE
              </option>

            </select>

          </div>


          {/* =================================================
              GET RECORD
          ================================================= */}

          <div className="loan-history-button-field">

            <button
              type="button"
              className="loan-history-get-button"
              onClick={handleGetRecord}
            >

              GET RECORD

            </button>

          </div>


        </div>

      </div>


      {/* =====================================================
          HISTORY TABLE
      ===================================================== */}

      <LoanHistoryTable />

    </div>

  );
};

export default LoanHistory;