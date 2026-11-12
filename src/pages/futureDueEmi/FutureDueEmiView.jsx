import React from "react";
import {
  FaTimes,
  FaUser,
  FaMoneyBillWave,
  FaBuilding,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

const FutureDueEmiView = ({
  record,
  onClose,
  onPayNow,
}) => {
  return (
    <div
      className="future-due-emi-view-overlay"
      onClick={onClose}
    >

      <div
        className="future-due-emi-view-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* HEADER */}

        <div className="future-due-emi-view-header">

          <div className="future-due-emi-view-title">

            <div className="future-due-emi-view-icon">
              <FaUser />
            </div>

            <div>
              <h3>
                FUTURE DUE EMI DETAILS
              </h3>

              <p>
                Loan ID : {record.loanId}
              </p>
            </div>

          </div>

          <button
            type="button"
            className="future-due-emi-view-close"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>

        {/* BODY */}

        <div className="future-due-emi-view-body">

          {/* MEMBER */}

          <div className="future-due-emi-view-section">

            <div className="future-due-emi-view-section-title">
              <FaUser />
              <h4>MEMBER DETAILS</h4>
            </div>

            <div className="future-due-emi-view-grid">

              <div>
                <span>MEMBER NAME</span>

                <strong>
                  {record.memberName}
                </strong>
              </div>

              <div>
                <span>MEMBER CODE</span>

                <strong>
                  {record.memberCode}
                </strong>
              </div>

              <div>
                <span>CONTACT NUMBER</span>

                <strong>
                  <FaPhone />
                  {record.mobile}
                </strong>
              </div>

              <div>
                <span>TYPE</span>

                <strong>
                  {record.type}
                </strong>
              </div>

            </div>

          </div>

          {/* EMI */}

          <div className="future-due-emi-view-section">

            <div className="future-due-emi-view-section-title">
              <FaMoneyBillWave />
              <h4>EMI DETAILS</h4>
            </div>

            <div className="future-due-emi-view-grid">

              <div>
                <span>LOAN ID</span>

                <strong>
                  {record.loanId}
                </strong>
              </div>

              <div>
                <span>LOAN TYPE</span>

                <strong>
                  {record.loanType}
                </strong>
              </div>

              <div>
                <span>PREVIOUS DATE</span>

                <strong>
                  <FaCalendarAlt />
                  {record.previousDate}
                </strong>
              </div>

              <div>
                <span>FUTURE EMI DATE</span>

                <strong>
                  <FaCalendarAlt />
                  {record.emiDate}
                </strong>
              </div>

              <div>
                <span>ADVANCE EMI</span>

                <strong>
                  {record.advanceEmi}
                </strong>
              </div>

              <div>
                <span>EMI NUMBER</span>

                <strong>
                  {record.emiNo}
                </strong>
              </div>

              <div>
                <span>DUES</span>

                <strong>
                  {record.dues}
                </strong>
              </div>

              <div>
                <span>ADVANCE</span>

                <strong>
                  ₹ {record.advance}
                </strong>
              </div>

              <div>
                <span>EMI TOTAL</span>

                <strong>
                  ₹{" "}
                  {record.emiTotal.toLocaleString(
                    "en-IN"
                  )}
                  /-
                </strong>
              </div>

              <div className="future-due-emi-view-amount">
                <span>PAYABLE AMOUNT</span>

                <strong>
                  ₹{" "}
                  {record.payableAmount.toLocaleString(
                    "en-IN"
                  )}
                  /-
                </strong>
              </div>

            </div>

          </div>

          {/* STAFF */}

          <div className="future-due-emi-view-section">

            <div className="future-due-emi-view-section-title">
              <FaBuilding />
              <h4>
                STAFF DETAILS
              </h4>
            </div>

            <div className="future-due-emi-view-grid">

              <div>
                <span>STAFF</span>

                <strong>
                  {record.staff}
                </strong>
              </div>

              <div>
                <span>STAFF CODE</span>

                <strong>
                  {record.staffCode}
                </strong>
              </div>

              <div>
                <span>BRANCH</span>

                <strong>
                  {record.branch}
                </strong>
              </div>

              <div>
                <span>GROUP</span>

                <strong>
                  {record.group}
                </strong>
              </div>

            </div>

          </div>

          {/* STATUS */}

          <div className="future-due-emi-view-status">

            <div>
              <span>
                PREVIOUS PAYMENT STATUS
              </span>

              <strong className="pending">
                {record.previousStatus}
              </strong>
            </div>

            <div>
              <span>
                CURRENT STATUS
              </span>

              <strong
                className={
                  record.status.toLowerCase()
                }
              >
                {record.status}
              </strong>
            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="future-due-emi-view-footer">

          {record.status !== "Paid" && (
            <button
              type="button"
              className="future-due-emi-pay-btn"
              onClick={() =>
                onPayNow(record)
              }
            >
              <FaMoneyBillWave />
              PAY NOW
            </button>
          )}

          <button
            type="button"
            className="future-due-emi-close-btn"
            onClick={onClose}
          >
            CLOSE
          </button>

        </div>

      </div>

    </div>
  );
};

export default FutureDueEmiView;