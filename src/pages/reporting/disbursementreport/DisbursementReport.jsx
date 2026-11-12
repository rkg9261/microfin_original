import React, { useState } from "react";
import "./DisbursementReport.css";

import DisbursementReportForm from "./DisbursementReportForm";
import DisbursementReportTable from "./DisbursementReportTable";

const DisbursementReport = () => {

  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
    loanType: "All",
    loanPlanName: "",
    recoveryType: "All",

    planType: "All",
    paymentStatus: "Disbursed",
    ledgerAccount: "",

    staff: "",
    member: "",

    disbursementDate: "",
    disbursementDateFrom: "",
    disbursementDateTo: "",

    emiEndDateFrom: "",
    emiEndDateTo: "",
  });


  // =========================================================
  // DISBURSEMENT DATA
  // =========================================================

  const [disbursementData] = useState([

    {
      id: 1,
      loanId: "LN10001",
      memberName: "AJAY KUMAR",
      memberCode: "MEM001",
      mobile: "9876543210",
      centerName: "CENTER A",
      disbursementDate: "08/27/2026",
      loanStartDate: "08/27/2026",
      loanEndDate: "08/27/2027",
      loanAmount: 50000,
      disbAmount: 50000,
      staff: "STAFF 01",
      payMode: "CASH",
      status: "DISBURSED",
    },

    {
      id: 2,
      loanId: "LN10002",
      memberName: "RAHUL SHARMA",
      memberCode: "MEM002",
      mobile: "9876543211",
      centerName: "CENTER B",
      disbursementDate: "08/27/2026",
      loanStartDate: "08/27/2026",
      loanEndDate: "08/27/2027",
      loanAmount: 75000,
      disbAmount: 75000,
      staff: "STAFF 02",
      payMode: "UPI",
      status: "DISBURSED",
    },



  ]);


  // =========================================================
  // GET RECORD
  // =========================================================

  const handleGetRecord = (formData) => {

    setFilters(formData);

  };


  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    setFilters({
      branch: "",
      loanType: "All",
      loanPlanName: "",
      recoveryType: "All",

      planType: "All",
      paymentStatus: "Disbursed",
      ledgerAccount: "",

      staff: "",
      member: "",

      disbursementDate: "",
      disbursementDateFrom: "",
      disbursementDateTo: "",

      emiEndDateFrom: "",
      emiEndDateTo: "",
    });

  };


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <div className="disbursement-report-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="disbursement-report-header">

        <h2>
          DISBURSEMENT REPORT
        </h2>

      </div>


      {/* =====================================================
          FORM
      ===================================================== */}

      <DisbursementReportForm
        filters={filters}
        onGetRecord={handleGetRecord}
        onReset={handleReset}
      />


      {/* =====================================================
          TABLE
      ===================================================== */}

      <DisbursementReportTable
        data={disbursementData}
      />

    </div>

  );
};

export default DisbursementReport;