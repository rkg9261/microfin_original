import React from "react";

import {
  CloseButton,
} from "../../../components/buttons";


const SettlementReportView = ({
  settlement,
  onClose,
}) => {

  if (!settlement) {
    return null;
  }


  return (

    <div
      className="settlement-view-overlay"
      onClick={onClose}
    >


      <div
        className="settlement-view-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* =====================================================
            BLUE TOP BORDER
        ===================================================== */}

        <div className="settlement-view-top-border" />


        {/* =====================================================
            DETAILS
        ===================================================== */}

        <div className="settlement-view-content">


          {/* ===================================================
              LEFT COLUMN
          =================================================== */}

          <div className="settlement-view-column">


            <div className="settlement-detail-row">

              <strong>
                BRANCH NAME :
              </strong>

              <span>
                {settlement.branchName}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                PAYMENT MODE :
              </strong>

              <span>
                {settlement.payMode}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                MEMBER NAME :
              </strong>

              <span>
                {settlement.memberName}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                MEMBER CODE :
              </strong>

              <span>
                {settlement.memberCode}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                MEMBER (C/O) ALIAS :
              </strong>

              <span>
                {settlement.alias}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                MEMBER CONTACT NUMBER :
              </strong>

              <span>
                {settlement.memberMobile}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                MEMBER EMAIL :
              </strong>

              <span>
                {settlement.memberEmail}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                LOAN APPLICATION NUMBER :
              </strong>

              <span>
                {settlement.loanApplicationNumber}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                LOAN EMI START DATE :
              </strong>

              <span>
                {settlement.loanEmiStartDate}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                LOAN EMI END DATE :
              </strong>

              <span>
                {settlement.loanEmiEndDate}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                LOAN TYPE :
              </strong>

              <span>
                {settlement.loanType}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                TOTAL PLAN AMOUNT :
              </strong>

              <span>
                {settlement.totalPlanAmount}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                TOTAL AMOUNT PAID :
              </strong>

              <span>
                {settlement.totalAmountPaid}
              </span>

            </div>


          </div>


          {/* ===================================================
              RIGHT COLUMN
          =================================================== */}

          <div className="settlement-view-column">


            <div className="settlement-detail-row">

              <strong>
                TOTAL AMOUNT DUE WITHOUT INTEREST :
              </strong>

              <span>
                {settlement.amountDueWithoutInterest}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                TOTAL AMOUNT DUE :
              </strong>

              <span>
                {settlement.totalAmountDue}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                TOTAL INSTALLMENT PAID :
              </strong>

              <span>
                {settlement.totalInstallmentPaid}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                TOTAL INSTALLMENT DUE :
              </strong>

              <span>
                {settlement.totalInstallmentDue}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                LOAN PRE CLOSING CHARGE TYPE :
              </strong>

              <span>
                {settlement.preClosingChargeType}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                LOAN PRE CLOSING CHARGE (%) :
              </strong>

              <span>
                {settlement.preClosingCharge}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                REASON :
              </strong>

              <span>
                {settlement.reason}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                SETTLEMENT DATE :
              </strong>

              <span>
                {settlement.settlementDate}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                REMARK :
              </strong>

              <span>
                {settlement.remark || ""}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                LOAN SETTLED BY :
              </strong>

              <span>
                {settlement.loanSettledBy}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                TOTAL AMOUNT PAID WITH SETTLEMENT :
              </strong>

              <span>
                {settlement.totalAmountPaidWithSettlement}
              </span>

            </div>


            <div className="settlement-detail-row">

              <strong>
                SETTLEMENT STATUS :
              </strong>

              <span>
                {settlement.settlementStatus}
              </span>

            </div>


          </div>


        </div>


        {/* =====================================================
            CLOSE BUTTON
        ===================================================== */}

        <div className="settlement-view-footer">

          <CloseButton
            onClick={onClose}
          />

        </div>


      </div>

    </div>

  );

};


export default SettlementReportView;