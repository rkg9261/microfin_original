import React from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaPlus,
  FaArrowLeft,
  FaRedo,
  FaTimes,
} from "react-icons/fa";

import PaymentForm from "./PaymentForm";

import "./Payment.css";


const Payment = () => {

  const navigate = useNavigate();

  const location = useLocation();


  // =========================================================
  // GET VOUCHER TYPE FROM URL
  // =========================================================

  const getVoucherType = () => {

    const path =
      location.pathname.toLowerCase();


    if (path === "/receipt") {

      return "Receipt";

    }


    if (path === "/contra") {

      return "Contra";

    }


    if (path === "/journal") {

      return "Journal";

    }


    return "Payment";

  };


  const voucherType =
    getVoucherType();


  // =========================================================
  // GET PAGE HEADING
  // =========================================================

  const getVoucherHeading = () => {

    switch (voucherType) {

      case "Receipt":

        return "RECEIPTVOUCHER";


      case "Contra":

        return "CONTRAVOUCHER";


      case "Journal":

        return "JOURNALVOUCHER";


      default:

        return "PAYMENTVOUCHER";

    }

  };


  const voucherHeading =
    getVoucherHeading();


  // =========================================================
  // NAVIGATION
  // =========================================================

  const goToPayment = () => {

    navigate("/payment");

  };


  const goToReceipt = () => {

    navigate("/receipt");

  };


  const goToContra = () => {

    navigate("/contra");

  };


  const goToJournal = () => {

    navigate("/journal");

  };


  // =========================================================
  // BACK
  // =========================================================

  const goBack = () => {

    navigate("/voucher-entries");

  };


  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    navigate("/payment");

  };


  return (

    <div className="payment-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="payment-page-header">


        <div className="payment-page-title">

          <h2>
            {voucherHeading}
          </h2>

        </div>


        <div className="payment-breadcrumb">

          <span>
            DASHBOARD
          </span>

          <span>
            ›
          </span>

          <strong>
            {voucherHeading}
          </strong>

        </div>

      </div>


      {/* =====================================================
          BLUE LINE
      ===================================================== */}

      <div className="payment-heading-line"></div>


      {/* =====================================================
          VOUCHER NAVIGATION
      ===================================================== */}

      <div className="payment-top-navigation">


        {/* ===================================================
            VOUCHER TITLE
        =================================================== */}

        <div className="payment-voucher-title">

          VOUCHER

        </div>


        {/* ===================================================
            PAYMENT
        =================================================== */}

        <button
          type="button"
          className={
            `payment-nav-btn ${
              voucherType === "Payment"
                ? "payment-nav-active"
                : ""
            }`
          }
          onClick={goToPayment}
        >

          <FaPlus />

          PAYMENT

        </button>


        {/* ===================================================
            RECEIPT
        =================================================== */}

        <button
          type="button"
          className={
            `payment-nav-btn ${
              voucherType === "Receipt"
                ? "payment-nav-active"
                : ""
            }`
          }
          onClick={goToReceipt}
        >

          <FaPlus />

          RECEIPT

        </button>


        {/* ===================================================
            CONTRA
        =================================================== */}

        <button
          type="button"
          className={
            `payment-nav-btn ${
              voucherType === "Contra"
                ? "payment-nav-active"
                : ""
            }`
          }
          onClick={goToContra}
        >

          <FaPlus />

          CONTRA

        </button>


        {/* ===================================================
            JOURNAL
        =================================================== */}

        <button
          type="button"
          className={
            `payment-nav-btn ${
              voucherType === "Journal"
                ? "payment-nav-active"
                : ""
            }`
          }
          onClick={goToJournal}
        >

          <FaPlus />

          JOURNAL

        </button>


        {/* ===================================================
            SPACER
        =================================================== */}

        <div className="payment-top-spacer"></div>


        {/* ===================================================
            BACK
        =================================================== */}

        <button
          type="button"
          className="payment-back-btn"
          onClick={goBack}
        >

          <FaArrowLeft />

          BACK

        </button>


        {/* ===================================================
            RESET
        =================================================== */}

        <button
          type="button"
          className="payment-reset-small"
          onClick={handleReset}
          title="Reset"
        >

          <FaRedo />

        </button>


        {/* ===================================================
            CLOSE
        =================================================== */}

        <button
          type="button"
          className="payment-close-small"
          onClick={goBack}
          title="Close"
        >

          <FaTimes />

        </button>

      </div>


      {/* =====================================================
          SAME FORM
      ===================================================== */}

      <PaymentForm
        voucherType={voucherType}
      />

    </div>

  );

};


export default Payment;