import React, { useState } from "react";

import "./OnlinePaymentReport.css";

import OnlinePaymentReportTable from "./OnlinePaymentReportTable";
import OnlinePaymentReportView from "./OnlinePaymentReportView";


const OnlinePaymentReport = () => {

  // =========================================================
  // SELECTED PAYMENT
  // =========================================================

  const [selectedPayment, setSelectedPayment] = useState(null);


  // =========================================================
  // ONLINE PAYMENT DATA
  // =========================================================

  const [paymentData] = useState([

    {
      id: 1,

      name: "PARAMJIT KAUR",

      email: "9876543213@GMAIL.COM",

      mobile: "9876543213",

      amount: 164,

      orderId: "9876543213_441",

      receivedBy: "ADMIN",

      date: "2026-06-19 23:05:50",

      branch: "SHREEJA GROUP",

      status: "SUCCESS",

    },

    {
      id: 2,

      name: "SANGITA BALU KHARE",

      email: "9529386632@GMAIL.COM",

      mobile: "9529386632",

      amount: 386,

      orderId: "9529386632_482",

      receivedBy: "ADMIN",

      date: "2026-06-11 11:53:29",

      branch: "SHREEJA GROUP",

      status: "SUCCESS",

    },


  ]);


  // =========================================================
  // VIEW PAYMENT
  // =========================================================

  const handleView = (payment) => {

    setSelectedPayment(payment);

  };


  // =========================================================
  // CLOSE VIEW
  // =========================================================

  const handleCloseView = () => {

    setSelectedPayment(null);

  };


  return (

    <div className="online-payment-report-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="online-payment-report-header">

        <h2>
          ONLINEPAYMENTREPORT
        </h2>

      </div>


      {/* =====================================================
          REPORT TABLE
      ===================================================== */}

      <OnlinePaymentReportTable
        data={paymentData}
        onView={handleView}
      />


      {/* =====================================================
          VIEW DETAILS
      ===================================================== */}

      {selectedPayment && (

        <OnlinePaymentReportView
          payment={selectedPayment}
          onClose={handleCloseView}
        />

      )}

    </div>

  );

};


export default OnlinePaymentReport;