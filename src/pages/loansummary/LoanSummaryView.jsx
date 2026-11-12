import React from "react";

import "./LoanSummary.css";

const LoanSummaryView = ({
  loan,
  onClose,
}) => {

  if (!loan) {
    return null;
  }

  return (
    <div className="loan-summary-modal-overlay">

      <div className="loan-summary-view-modal">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="loan-summary-view-header">

          <h2>
            LOAN DETAILS
          </h2>

          <button
            type="button"
            className="loan-summary-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* =================================================
            BODY
        ================================================= */}

        <div className="loan-summary-view-body">


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="loan-summary-view-column">

            <div className="loan-summary-detail-row">

              <strong>
                BRANCH NAME
              </strong>

              <span>:</span>

              <p>
                {loan.branch} ({loan.branchCode})
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                MEMBER NAME
              </strong>

              <span>:</span>

              <p>
                {loan.memberName}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                MEMBER CODE
              </strong>

              <span>:</span>

              <p>
                {loan.memberCode}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                MOBILE
              </strong>

              <span>:</span>

              <p>
                {loan.mobile}
              </p>

            </div>


            <div className="loan-summary-detail-title">
              LOAN PLAN DETAILS
            </div>


            <div className="loan-summary-detail-row">

              <strong>
                PLAN NAME
              </strong>

              <span>:</span>

              <p>
                {loan.planName}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                PLAN TYPE
              </strong>

              <span>:</span>

              <p>
                {loan.planType}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                RECOVERY TYPE
              </strong>

              <span>:</span>

              <p>
                {loan.recoveryType}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                EMI
              </strong>

              <span>:</span>

              <p>
                {loan.emi}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                PLAN AMOUNT
              </strong>

              <span>:</span>

              <p>
                ₹ {loan.planAmount}
              </p>

            </div>

          </div>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="loan-summary-view-column">

            <div className="loan-summary-detail-title">
              PREVIOUS LOAN DETAILS
            </div>


            <div className="loan-summary-detail-row">

              <strong>
                LOAN APPLICATION NO.
              </strong>

              <span>:</span>

              <p>
                {loan.loanId}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                STAFF
              </strong>

              <span>:</span>

              <p>
                {loan.staff}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                BRANCH CENTER
              </strong>

              <span>:</span>

              <p>
                {loan.branchCenter}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                DISBURSEMENT DATE
              </strong>

              <span>:</span>

              <p>
                {loan.disbursementDate}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                EMI START DATE
              </strong>

              <span>:</span>

              <p>
                {loan.emiStartDate}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                EMI LAST DATE
              </strong>

              <span>:</span>

              <p>
                {loan.emiLastDate}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                LOAN CLOSE DATE
              </strong>

              <span>:</span>

              <p>
                {loan.loanCloseDate || "-"}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                DISBURSED AMOUNT
              </strong>

              <span>:</span>

              <p>
                ₹ {loan.disbAmount}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                RECOVERY AMOUNT
              </strong>

              <span>:</span>

              <p>
                ₹ {loan.recoveryAmount}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                PENALTY
              </strong>

              <span>:</span>

              <p>
                ₹ {loan.penalty}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                DUE AMOUNT
              </strong>

              <span>:</span>

              <p>
                ₹ {loan.dueAmount}
              </p>

            </div>


            <div className="loan-summary-detail-row">

              <strong>
                STATUS
              </strong>

              <span>:</span>

              <p
                className={
                  loan.status === "Running"
                    ? "loan-summary-running"
                    : loan.status === "Closed"
                    ? "loan-summary-closed"
                    : "loan-summary-pending"
                }
              >
                {loan.status}
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="loan-summary-view-footer">

          <button
            type="button"
            onClick={onClose}
          >
            CLOSE
          </button>

        </div>

      </div>

    </div>
  );
};

export default LoanSummaryView;