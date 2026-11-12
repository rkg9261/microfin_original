import React from "react";
import {
  FaTimes,
  FaUser,
  FaMoneyBillWave,
  FaBuilding,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

const DueEmiView = ({
  record,
  onClose,
  onPayNow,
}) => {
  return (
    <div
      className="due-emi-view-overlay"
      onClick={onClose}
    >

      <div
        className="due-emi-view-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}

        <div className="due-emi-view-header">

          <div className="due-emi-view-heading">

            <div className="due-emi-view-icon">
              <FaUser />
            </div>

            <div>
              <h3>DUE EMI DETAILS</h3>

              <p>
                Loan ID : {record.loanId}
              </p>
            </div>

          </div>

          <button
            type="button"
            className="due-emi-view-close"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>


        {/* CONTENT */}

        <div className="due-emi-view-content">

          {/* MEMBER */}

          <div className="due-emi-view-section">

            <div className="due-emi-view-section-title">
              <FaUser />
              <h4>MEMBER DETAILS</h4>
            </div>

            <div className="due-emi-view-grid">

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
                <span>ALIAS</span>
                <strong>
                  {record.alias}
                </strong>
              </div>

              <div>
                <span>MOBILE</span>
                <strong>
                  <FaPhone />
                  {record.mobile}
                </strong>
              </div>

            </div>

          </div>


          {/* EMI */}

          <div className="due-emi-view-section">

            <div className="due-emi-view-section-title">
              <FaMoneyBillWave />
              <h4>EMI DETAILS</h4>
            </div>

            <div className="due-emi-view-grid">

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
                <span>EMI DATE</span>
                <strong>
                  <FaCalendarAlt />
                  {record.emiDate}
                </strong>
              </div>

              <div>
                <span>EMI NUMBER</span>
                <strong>
                  {record.emiNo}
                </strong>
              </div>

              <div>
                <span>ADVANCE EMI</span>
                <strong>
                  {record.advanceEmi}
                </strong>
              </div>

              <div>
                <span>PENALTY</span>
                <strong>
                  ₹ {record.penalty.toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="amount">
                <span>DUE EMI</span>
                <strong>
                  ₹{" "}
                  {record.duesEmi.toLocaleString(
                    "en-IN"
                  )}
                  /-
                </strong>
              </div>

              <div>
                <span>EMI TYPE</span>
                <strong>
                  {record.type}
                </strong>
              </div>

            </div>

          </div>


          {/* STAFF */}

          <div className="due-emi-view-section">

            <div className="due-emi-view-section-title">
              <FaBuilding />
              <h4>STAFF & BRANCH DETAILS</h4>
            </div>

            <div className="due-emi-view-grid">

              <div>
                <span>BRANCH</span>
                <strong>
                  {record.branch}
                </strong>
              </div>

              <div>
                <span>CENTER NAME</span>
                <strong>
                  {record.centerName}
                </strong>
              </div>

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

            </div>

          </div>


          {/* STATUS */}

          <div className="due-emi-view-status">

            <div>
              <span>PAYMENT STATUS</span>

              <strong
                className={
                  record.status.toLowerCase()
                }
              >
                {record.status}
              </strong>
            </div>

            <div>
              <span>RECOVERY TYPE</span>

              <strong>
                {record.recoveryType}
              </strong>
            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="due-emi-view-footer">

          {record.status !== "Paid" && (
            <button
              type="button"
              className="due-emi-modal-pay"
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
            className="due-emi-modal-close"
            onClick={onClose}
          >
            CLOSE
          </button>

        </div>

      </div>

    </div>
  );
};

export default DueEmiView;