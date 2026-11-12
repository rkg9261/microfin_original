import React from "react";

import "../../../components/common/CommonForm.css";
import "./GroupLoan.css";

const GroupLoanView = ({
  loan,
  onClose,
}) => {

  if (!loan) {
    return null;
  }


  return (
    <div className="group-loan-modal-overlay">

      <div className="group-loan-view-modal">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="group-loan-view-header">

          <h2>
            GROUP LOAN DETAILS
          </h2>

          <button
            type="button"
            className="group-loan-close-button"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        {/* =================================================
            BODY
        ================================================= */}

        <div className="group-loan-view-body">

          {/* LEFT */}

          <div className="group-loan-view-column">

            <div className="group-loan-detail-row">

              <strong>
                BRANCH NAME
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.branch} ({loan.branchCode})
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                MEMBER NAME
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.member}
              </p>

            </div>


            <div className="group-loan-view-title">
              GROUP LOAN PLAN DETAILS
            </div>


            <div className="group-loan-detail-row">

              <strong>
                PLAN NAME
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.plan}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                EMI TYPE
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.emiType}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                PLAN AMOUNT
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.planAmount}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                PENALTY SCHEME
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.penaltyScheme}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                PURPOSE
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.purpose}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                LOAN TYPE
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.loanType}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                GROUP
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.group}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                GROUP LEADER
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.groupLeader}
              </p>

            </div>

          </div>


          {/* RIGHT */}

          <div className="group-loan-view-column">

            <div className="group-loan-view-title">
              GROUP DETAILS
            </div>


            <div className="group-loan-detail-row">

              <strong>
                GROUP
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.group}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                MEMBER CODE
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.memberCode}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                STAFF
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.staff}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                AGENT ID
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.agentId}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                BRANCH CENTER
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.branchCenter}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                CENTER LEADER
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.centerLeader}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                GUARANTOR
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.guarantor || "-"}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                DESCRIPTION
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.description}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                HIDE RATE OF INTEREST
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.hideRateInterest}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                CREATED BY
              </strong>

              <span>
                :
              </span>

              <p>
                {loan.createdBy}
              </p>

            </div>


            <div className="group-loan-detail-row">

              <strong>
                STATUS
              </strong>

              <span>
                :
              </span>

              <p
                className={
                  loan.status === "APPROVED"
                    ? "group-loan-approved"
                    : "group-loan-pending"
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

        <div className="group-loan-view-footer">

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

export default GroupLoanView;