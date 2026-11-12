import React from "react";
import "./IndividualLoan.css";

const IndividualLoanView = ({ loan, onClose }) => {
  if (!loan) return null;

  return (
    <div className="individual-loan-modal-overlay">

      <div className="individual-loan-details-modal">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="individual-loan-details-header">

          <h2>LOAN DETAILS</h2>

          <button
            type="button"
            className="individual-loan-details-close-icon"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* =====================================================
            BODY
        ===================================================== */}

        <div className="individual-loan-details-body">

          {/* ===================================================
              LEFT SIDE
          =================================================== */}

          <div className="individual-loan-details-left">

            {/* Branch */}

            <div className="loan-detail-row">

              <span className="loan-detail-label">
                BRANCH NAME
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.branchName || "-"}
                {loan.branchCode
                  ? ` (${loan.branchCode})`
                  : ""}
              </span>

            </div>


            {/* Member */}

            <div className="loan-detail-row">

              <span className="loan-detail-label">
                MEMBER NAME
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.member || "-"}
              </span>

            </div>


            {/* Previous Loan Plan */}

            <div className="loan-details-section-title">
              PREVIOUS LOAN PLAN DETAILS
            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                PLAN NAME
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.planName || "-"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                PLAN TYPE
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.planType || "-"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                TYPE OF INTEREST
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.interestType || "-"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                RECOVERY TYPE
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.recoveryType || "-"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                NUMBER OF PAYMENTS
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.numberOfPayments || "-"}
              </span>

            </div>


            {/* New Loan */}

            <div className="loan-details-new-loan">

              <div className="loan-detail-row">

                <span className="loan-detail-label">
                  NEW LOAN AMOUNT
                </span>

                <span className="loan-detail-colon">
                  :
                </span>

                <span className="loan-detail-value">
                  {loan.newLoanAmount || "0"}
                </span>

              </div>


              <div className="loan-detail-row">

                <span className="loan-detail-label">
                  CREATE AT
                </span>

                <span className="loan-detail-colon">
                  :
                </span>

                <span className="loan-detail-value">
                  {loan.createAt || "-"}
                </span>

              </div>

            </div>

          </div>


          {/* ===================================================
              RIGHT SIDE
          =================================================== */}

          <div className="individual-loan-details-right">

            <div className="loan-details-section-title right-title">
              PREVIOUS LOAN DETAILS
            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN APPLICATION NO.
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanApplicationNo || "-"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                DUE NO OF EMI
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.dueNoOfEmi || "-"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                FIRST EMI DATE
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.firstEmiDate || "-"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LAST EMI DATE
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.lastEmiDate || "-"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN TOTAL AMOUNT
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanTotalAmount || "0"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN PRINCIPAL AMOUNT
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanPrincipalAmount || "0"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN INTEREST AMOUNT
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanInterestAmount || "0"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN DUE AMOUNT
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanDueAmount || "0"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN DUE PRINCIPAL AMOUNT
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanDuePrincipalAmount || "0"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN DUE INTEREST AMOUNT
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanDueInterestAmount || "0"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN FORECLOSE CHARGES
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanForecloseCharges || "0"}
              </span>

            </div>


            <div className="loan-detail-row">

              <span className="loan-detail-label">
                LOAN INTEREST WRITE OFF AMOUNT
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span className="loan-detail-value">
                {loan.loanInterestWriteOffAmount || "0"}
              </span>

            </div>


            {/* Status */}

            <div className="loan-detail-status-row">

              <span className="loan-detail-label">
                STATUS
              </span>

              <span className="loan-detail-colon">
                :
              </span>

              <span
                className={`loan-detail-status ${
                  loan.status === "APPROVED"
                    ? "approved"
                    : "pending"
                }`}
              >
                {loan.status || "PENDING"}
              </span>

            </div>

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="individual-loan-details-footer">

          <button
            type="button"
            className="individual-loan-details-close-button"
            onClick={onClose}
          >
            CLOSE
          </button>

        </div>

      </div>

    </div>
  );
};

export default IndividualLoanView;