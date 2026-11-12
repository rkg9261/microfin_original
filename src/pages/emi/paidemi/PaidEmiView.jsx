import React from "react";
import {
  FaTimes,
  FaUser,
  FaMoneyBillWave,
  FaBuilding,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

const PaidEmiView = ({ record, onClose }) => {
  if (!record) {
    return null;
  }

  return (
    <div
      className="paid-emi-view-overlay"
      onClick={onClose}
    >

      <div
        className="paid-emi-view-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="paid-emi-view-header">

          <div className="paid-emi-view-title">

            <div className="paid-emi-view-title-icon">
              <FaUser />
            </div>

            <div>
              <h3>PAID EMI DETAILS</h3>

              <p>
                Loan ID: {record.loanId}
              </p>
            </div>

          </div>


          <button
            type="button"
            className="paid-emi-view-close"
            onClick={onClose}
          >
            <FaTimes />
          </button>

        </div>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="paid-emi-view-content">


          {/* MEMBER DETAILS */}

          <div className="paid-emi-view-section">

            <div className="paid-emi-view-section-title">

              <FaUser />

              <h4>MEMBER DETAILS</h4>

            </div>


            <div className="paid-emi-view-grid">

              <div className="paid-emi-detail">

                <span>MEMBER NAME</span>

                <strong>
                  {record.memberName}
                </strong>

              </div>


              <div className="paid-emi-detail">

                <span>MEMBER CODE</span>

                <strong>
                  {record.memberCode}
                </strong>

              </div>


              <div className="paid-emi-detail">

                <span>ALIAS</span>

                <strong>
                  {record.alias}
                </strong>

              </div>


              <div className="paid-emi-detail">

                <span>MOBILE</span>

                <strong>
                  <FaPhone />
                  {record.mobile}
                </strong>

              </div>

            </div>

          </div>


          {/* LOAN DETAILS */}

          <div className="paid-emi-view-section">

            <div className="paid-emi-view-section-title">

              <FaMoneyBillWave />

              <h4>LOAN & EMI DETAILS</h4>

            </div>


            <div className="paid-emi-view-grid">

              <div className="paid-emi-detail">

                <span>LOAN ID</span>

                <strong>
                  {record.loanId}
                </strong>

              </div>


              <div className="paid-emi-detail">

                <span>EMI TYPE</span>

                <strong>
                  {record.type}
                </strong>

              </div>


              <div className="paid-emi-detail">

                <span>PAY DATE</span>

                <strong>
                  <FaCalendarAlt />
                  {record.payDate}
                </strong>

              </div>


              <div className="paid-emi-detail amount">

                <span>PAID AMOUNT</span>

                <strong>
                  ₹
                  {record.amount.toLocaleString(
                    "en-IN"
                  )}
                  /-
                </strong>

              </div>

            </div>

          </div>


          {/* BRANCH DETAILS */}

          <div className="paid-emi-view-section">

            <div className="paid-emi-view-section-title">

              <FaBuilding />

              <h4>BRANCH DETAILS</h4>

            </div>


            <div className="paid-emi-view-grid">

              <div className="paid-emi-detail">

                <span>BRANCH</span>

                <strong>
                  {record.branch}
                </strong>

              </div>


              <div className="paid-emi-detail">

                <span>CENTER NAME</span>

                <strong>
                  {record.centerName}
                </strong>

              </div>


              <div className="paid-emi-detail">

                <span>RECEIVED BY</span>

                <strong>
                  {record.receivedBy}
                </strong>

              </div>


              <div className="paid-emi-detail">

                <span>APPROVED BY</span>

                <strong>
                  {record.approvedBy || "-"}
                </strong>

              </div>

            </div>

          </div>


          {/* STATUS */}

          <div className="paid-emi-view-status-box">

            <div>

              <span>PAYMENT STATUS</span>

              {record.status === "Approved" ? (

                <strong className="approved">
                  ✓ Approved
                </strong>

              ) : (

                <strong className="pending">
                  Pending
                </strong>

              )}

            </div>


            <div>

              <span>CREATED</span>

              <strong>
                {record.created}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="paid-emi-view-footer">

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

export default PaidEmiView;