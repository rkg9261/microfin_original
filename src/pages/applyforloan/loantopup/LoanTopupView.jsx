import React from "react";

const LoanTopupView = ({ loan, onClose }) => {
  if (!loan) return null;

  return (
    <div className="loan-topup-view-overlay">

      <div className="loan-topup-view-modal">

        {/* HEADER */}
        <div className="loan-topup-view-header">
          <h2>LOAN DETAILS</h2>

          <button
            type="button"
            className="loan-topup-view-close-icon"
            onClick={onClose}
          >
            ×
          </button>
        </div>


        {/* CONTENT */}
        <div className="loan-topup-view-content">

          {/* LEFT SIDE */}
          <div className="loan-topup-view-left">

            <div className="loan-topup-view-row">
              <span>BRANCH NAME</span>
              <strong>{loan.branchName || "-"}</strong>
            </div>

            <div className="loan-topup-view-row">
              <span>MEMBER NAME</span>
              <strong>{loan.memberName || "-"}</strong>
            </div>


            <div className="loan-topup-view-section-title">
              PREVIOUS LOAN PLAN DETAILS
            </div>

            <div className="loan-topup-view-row">
              <span>PLAN NAME</span>
              <strong>{loan.planName || "-"}</strong>
            </div>

            <div className="loan-topup-view-row">
              <span>PLAN TYPE</span>
              <strong>{loan.planType || "-"}</strong>
            </div>

            <div className="loan-topup-view-row">
              <span>TYPE OF INTEREST</span>
              <strong>{loan.interestType || "-"}</strong>
            </div>

            <div className="loan-topup-view-row">
              <span>RECOVERY TYPE</span>
              <strong>{loan.recoveryType || "-"}</strong>
            </div>

            <div className="loan-topup-view-row">
              <span>NUMBER OF PAYMENTS</span>
              <strong>{loan.numberOfPayments || "-"}</strong>
            </div>


            <div className="loan-topup-view-row loan-topup-new-loan">
              <span>NEW LOAN AMOUNT</span>
              <strong>{loan.applyLoanAmount || "0"}</strong>
            </div>

            <div className="loan-topup-view-row">
              <span>CREATE AT</span>
              <strong>{loan.createdAt || "-"}</strong>
            </div>

          </div>


          {/* RIGHT SIDE */}
          <div className="loan-topup-view-right">

            <div className="loan-topup-view-section-title">
              PREVIOUS LOAN DETAILS
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN APPLICATION NO.</span>
              <strong>{loan.preLoanId || "-"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>DUE NO OF EMI</span>
              <strong>{loan.dueNoOfEmi || "-"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>FIRST EMI DATE</span>
              <strong>{loan.firstEmiDate || "-"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LAST EMI DATE</span>
              <strong>{loan.lastEmiDate || "-"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN TOTAL AMOUNT</span>
              <strong>{loan.preLoanTotalAmount || "0"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN PRINCIPAL AMOUNT</span>
              <strong>{loan.preLoanPrincipalAmount || "0"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN INTEREST AMOUNT</span>
              <strong>{loan.preLoanInterestAmount || "0"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN DUE AMOUNT</span>
              <strong>{loan.preLoanDueAmount || "0"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN DUE PRINCIPAL AMOUNT</span>
              <strong>{loan.preLoanDuePrincipalAmount || "0"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN DUE INTEREST AMOUNT</span>
              <strong>{loan.preLoanDueInterestAmount || "0"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN FORECLOSE CHARGES</span>
              <strong>{loan.preLoanForecloseCharges || "0"}</strong>
            </div>

            <div className="loan-topup-view-detail-row">
              <span>LOAN INTEREST WRITE OFF AMOUNT</span>
              <strong>{loan.preLoanInterestWriteOff || "0"}</strong>
            </div>

            <div className="loan-topup-view-status-row">
              <span>STATUS</span>

              <strong
                className={
                  String(loan.status).toLowerCase() === "approved"
                    ? "loan-topup-view-status-approved"
                    : "loan-topup-view-status-pending"
                }
              >
                {loan.status || "PENDING"}
              </strong>
            </div>

          </div>

        </div>


        {/* FOOTER */}
        <div className="loan-topup-view-footer">

          <button
            type="button"
            className="loan-topup-view-close-button"
            onClick={onClose}
          >
            CLOSE
          </button>

        </div>

      </div>

    </div>
  );
};

export default LoanTopupView;