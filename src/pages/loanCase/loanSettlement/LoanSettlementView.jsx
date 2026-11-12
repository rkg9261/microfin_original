import React from "react";

import {
  FaTimes,
} from "react-icons/fa";

import CloseButton from "../../../components/buttons/CloseButton";

const LoanSettlementView = ({
  settlement,
  onClose,
}) => {

  // =====================================================
  // FORMAT AMOUNT
  // =====================================================

  const formatAmount = (amount) => {

    return Number(amount || 0).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );

  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    const parts = date.split("-");

    if (parts.length !== 3) {
      return date;
    }

    return `${parts[2]}-${parts[1]}-${parts[0]}`;

  };


  return (

    <div
      className="loan-settlement-modal-overlay"
      onClick={onClose}
    >

      <div
        className="loan-settlement-view-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* =================================================
            MODAL HEADER
        ================================================= */}

        <div className="loan-settlement-modal-header">

          <h2>
            SETTLEMENT DETAILS
          </h2>


          {/* CROSS ICON */}

          <button
            type="button"
            className="loan-settlement-modal-close-icon"
            onClick={onClose}
            aria-label="Close"
          >

            <FaTimes />

          </button>

        </div>


        {/* =================================================
            MODAL BODY
        ================================================= */}

        <div className="loan-settlement-modal-body">


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="loan-settlement-details-column">


            <div className="loan-settlement-detail-row">

              <span>
                BRANCH NAME
              </span>

              <strong>:</strong>

              <p>
                {settlement.branch}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                PAYMENT MODE
              </span>

              <strong>:</strong>

              <p>
                {settlement.paymentMode}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                MEMBER NAME
              </span>

              <strong>:</strong>

              <p>
                {settlement.memberName}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                MEMBER CODE
              </span>

              <strong>:</strong>

              <p>
                {settlement.memberCode}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                MEMBER ALIAS
              </span>

              <strong>:</strong>

              <p>
                {settlement.memberAlias}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                MEMBER CONTACT NUMBER
              </span>

              <strong>:</strong>

              <p>
                {settlement.memberMobile}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                MEMBER EMAIL
              </span>

              <strong>:</strong>

              <p>
                {settlement.memberEmail}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                LOAN APPLICATION NUMBER
              </span>

              <strong>:</strong>

              <p>
                {settlement.loanId}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                LOAN EMI START DATE
              </span>

              <strong>:</strong>

              <p>
                {settlement.loanEmiStartDate}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                LOAN EMI END DATE
              </span>

              <strong>:</strong>

              <p>
                {settlement.loanEmiEndDate}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                LOAN TYPE
              </span>

              <strong>:</strong>

              <p>
                {settlement.planType}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                TOTAL PLAN AMOUNT
              </span>

              <strong>:</strong>

              <p>
                {formatAmount(
                  settlement.planAmount
                )}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                TOTAL AMOUNT PAID
              </span>

              <strong>:</strong>

              <p>
                {formatAmount(
                  settlement.paidAmount
                )}
              </p>

            </div>

          </div>


          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="loan-settlement-details-column">


            <div className="loan-settlement-detail-row">

              <span>
                TOTAL AMOUNT DUE WITHOUT INTEREST
              </span>

              <strong>:</strong>

              <p>
                {formatAmount(
                  settlement.totalAmountDueWithoutInterest
                )}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                PAID INTEREST AMT
              </span>

              <strong>:</strong>

              <p>
                {formatAmount(
                  settlement.paidInterestAmount
                )}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                TOTAL AMOUNT DUE
              </span>

              <strong>:</strong>

              <p>
                {formatAmount(
                  settlement.dueAmount
                )}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                TOTAL INSTALLMENT PAID
              </span>

              <strong>:</strong>

              <p>
                {settlement.totalInstallmentPaid}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                TOTAL INSTALLMENT DUE
              </span>

              <strong>:</strong>

              <p>
                {settlement.totalInstallmentDue}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                LOAN PRE CLOSING CHARGE TYPE
              </span>

              <strong>:</strong>

              <p>
                {settlement.loanPreClosingChargeType}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                LOANPRE CLOSING CHARGE (%)
              </span>

              <strong>:</strong>

              <p>
                {formatAmount(
                  settlement.loanPreClosingCharge
                )}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                REASON
              </span>

              <strong>:</strong>

              <p>
                {settlement.reason}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                SETTLEMENT DATE
              </span>

              <strong>:</strong>

              <p>
                {formatDate(
                  settlement.settlementDate
                )}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                REMARK
              </span>

              <strong>:</strong>

              <p>
                {settlement.remark || "-"}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                LOAN SETTLED BY
              </span>

              <strong>:</strong>

              <p>
                {settlement.loanSettledBy}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                TOTAL AMOUNT PAID WITH SETTLEMENT
              </span>

              <strong>:</strong>

              <p>
                {formatAmount(
                  settlement.settleAmount
                )}
              </p>

            </div>


            <div className="loan-settlement-detail-row">

              <span>
                SETTLEMENT STATUS
              </span>

              <strong>:</strong>

              <p>
                {settlement.settlementStatus}
              </p>

            </div>

          </div>

        </div>


        {/* =================================================
            MODAL FOOTER
        ================================================= */}

        <div className="loan-settlement-modal-footer">

          <CloseButton
            onClick={onClose}
          >
            CLOSE
          </CloseButton>

        </div>

      </div>

    </div>

  );
};

export default LoanSettlementView;