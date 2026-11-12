import React from "react";

import { FaTimes } from "react-icons/fa";

const AdvanceSecurityView = ({
  record,
  onClose,
}) => {

  if (!record) {
    return null;
  }

  return (
    <div
      className="advance-security-modal-overlay"
      onClick={onClose}
    >

      <div
        className="advance-security-view-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* =========================================
            MODAL HEADER
        ========================================= */}

        <div className="advance-security-modal-header">

          <div>

            <h2>
              ADVANCE SECURITY DETAILS
            </h2>

            <p>
              Loan ID : {record.loanId}
            </p>

          </div>


          <button
            type="button"
            className="advance-security-modal-close"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>


        {/* =========================================
            DETAILS
        ========================================= */}

        <div className="advance-security-details">

          {/* LOAN ID */}

          <div className="advance-security-detail-item">

            <label>
              LOAN ID
            </label>

            <strong>
              {record.loanId}
            </strong>

          </div>


          {/* MEMBER NAME */}

          <div className="advance-security-detail-item">

            <label>
              MEMBER NAME
            </label>

            <strong>
              {record.memberName}
            </strong>

          </div>


          {/* MEMBER CODE */}

          <div className="advance-security-detail-item">

            <label>
              MEMBER CODE
            </label>

            <strong>
              {record.memberCode}
            </strong>

          </div>


          {/* ALIAS */}

          <div className="advance-security-detail-item">

            <label>
              ALIAS
            </label>

            <strong>
              {record.alias}
            </strong>

          </div>


          {/* MOBILE */}

          <div className="advance-security-detail-item">

            <label>
              MOBILE
            </label>

            <strong>
              {record.mobile}
            </strong>

          </div>


          {/* TYPE */}

          <div className="advance-security-detail-item">

            <label>
              TYPE
            </label>

            <strong>
              {record.type}
            </strong>

          </div>


          {/* CENTER */}

          <div className="advance-security-detail-item">

            <label>
              CENTER NAME
            </label>

            <strong>
              {record.centerName}
            </strong>

          </div>


          {/* BRANCH */}

          <div className="advance-security-detail-item">

            <label>
              BRANCH
            </label>

            <strong>
              {record.branch}
            </strong>

          </div>


          {/* PAYMENT DATE */}

          <div className="advance-security-detail-item">

            <label>
              PAYMENT DATE
            </label>

            <strong>
              {record.payDate}
            </strong>

          </div>


          {/* AMOUNT */}

          <div className="advance-security-detail-item">

            <label>
              AMOUNT
            </label>

            <strong className="detail-amount">
              ₹{" "}
              {record.amount.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>


          {/* RECEIVED BY */}

          <div className="advance-security-detail-item">

            <label>
              RECEIVED BY
            </label>

            <strong>
              {record.receivedBy}
            </strong>

          </div>


          {/* CREATED */}

          <div className="advance-security-detail-item">

            <label>
              CREATED AT
            </label>

            <strong>
              {record.createdAt}
            </strong>

          </div>


          {/* STATUS */}

          <div className="advance-security-detail-item">

            <label>
              STATUS
            </label>

            {record.status === "Approved" ? (

              <span className="advance-security-status approved">
                Approved
              </span>

            ) : (

              <span className="advance-security-status pending">
                Pending
              </span>

            )}

          </div>

        </div>


        {/* =========================================
            FOOTER
        ========================================= */}

        <div className="advance-security-modal-footer">

          <button
            type="button"
            className="advance-security-close-button"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdvanceSecurityView;