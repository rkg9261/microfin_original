import React from "react";

import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaRupeeSign,
  FaReceipt,
  FaUserShield,
  FaCalendarAlt,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";


const OnlinePaymentReportView = ({
  payment,
  onClose,
}) => {

  if (!payment) {

    return null;

  }


  return (

    <div
      className="online-payment-view-overlay"
      onClick={onClose}
    >


      <div
        className="online-payment-view-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="online-payment-view-header">

          <div>

            <h2>
              PAYMENT DETAILS
            </h2>

            <p>
              Paytm collection payment information
            </p>

          </div>


          <button
            type="button"
            className="online-payment-view-close"
            onClick={onClose}
          >

            <FaTimes />

          </button>

        </div>


        {/* =====================================================
            PAYMENT STATUS
        ===================================================== */}

        <div className="online-payment-status-box">

          <FaCheckCircle />

          <div>

            <span>
              PAYMENT STATUS
            </span>

            <strong>
              {payment.status}
            </strong>

          </div>

        </div>


        {/* =====================================================
            DETAILS
        ===================================================== */}

        <div className="online-payment-details-grid">


          {/* MEMBER NAME */}

          <div className="online-payment-detail-item">

            <div className="online-payment-detail-icon">
              <FaUser />
            </div>

            <div>

              <label>
                MEMBER NAME
              </label>

              <strong>
                {payment.name}
              </strong>

            </div>

          </div>


          {/* EMAIL */}

          <div className="online-payment-detail-item">

            <div className="online-payment-detail-icon">
              <FaEnvelope />
            </div>

            <div>

              <label>
                EMAIL
              </label>

              <strong>
                {payment.email}
              </strong>

            </div>

          </div>


          {/* MOBILE */}

          <div className="online-payment-detail-item">

            <div className="online-payment-detail-icon">
              <FaPhone />
            </div>

            <div>

              <label>
                MOBILE
              </label>

              <strong>
                {payment.mobile}
              </strong>

            </div>

          </div>


          {/* AMOUNT */}

          <div className="online-payment-detail-item">

            <div className="online-payment-detail-icon">
              <FaRupeeSign />
            </div>

            <div>

              <label>
                PAYMENT AMOUNT
              </label>

              <strong className="online-payment-detail-amount">

                ₹ {Number(payment.amount).toLocaleString("en-IN")}

              </strong>

            </div>

          </div>


          {/* ORDER ID */}

          <div className="online-payment-detail-item">

            <div className="online-payment-detail-icon">
              <FaReceipt />
            </div>

            <div>

              <label>
                ORDER ID
              </label>

              <strong>
                {payment.orderId}
              </strong>

            </div>

          </div>


          {/* RECEIVED BY */}

          <div className="online-payment-detail-item">

            <div className="online-payment-detail-icon">
              <FaUserShield />
            </div>

            <div>

              <label>
                RECEIVED BY
              </label>

              <strong>
                {payment.receivedBy}
              </strong>

            </div>

          </div>


          {/* DATE */}

          <div className="online-payment-detail-item">

            <div className="online-payment-detail-icon">
              <FaCalendarAlt />
            </div>

            <div>

              <label>
                PAYMENT DATE
              </label>

              <strong>
                {payment.date}
              </strong>

            </div>

          </div>


          {/* BRANCH */}

          <div className="online-payment-detail-item">

            <div className="online-payment-detail-icon">
              <FaBuilding />
            </div>

            <div>

              <label>
                BRANCH
              </label>

              <strong>
                {payment.branch}
              </strong>

            </div>

          </div>


        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="online-payment-view-footer">

          <button
            type="button"
            className="online-payment-close-btn"
            onClick={onClose}
          >

            CLOSE

          </button>

        </div>


      </div>

    </div>

  );

};


export default OnlinePaymentReportView;