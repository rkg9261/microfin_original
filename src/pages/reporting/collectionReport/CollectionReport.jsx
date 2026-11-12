import React, { useState } from "react";
import "./CollectionReport.css";

import CollectionReportForm from "./CollectionReportForm";
import CollectionReportTable from "./CollectionReportTable";

const CollectionReport = () => {

  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
    loanType: "All",
    ledgerAccount: "",
    recoveryType: "All",

    planType: "All",
    paymentType: "All",
    applicationNo: "",
    paymentStatus: "All",

    staff: "",
    member: "",

    paymentDate: "",
    paymentStartDate: "",
    paymentEndDate: "",
  });


  // =========================================================
  // COLLECTION DATA
  // =========================================================

  const [collections] = useState([
    {
      id: 1,
      loanId: "LN10001",
      memberName: "AJAY KUMAR",
      memberCode: "MEM001",
      mobile: "9876543210",
      paymentType: "EMI",
      centerName: "CENTER A",
      payDate: "08/27/2026",
      amount: 2500,
      receivedBy: "ADMIN",
      payMode: "CASH",
      status: "PAID",
    },

    {
      id: 2,
      loanId: "LN10002",
      memberName: "RAHUL SHARMA",
      memberCode: "MEM002",
      mobile: "9876543211",
      paymentType: "EMI",
      centerName: "CENTER B",
      payDate: "08/27/2026",
      amount: 1800,
      receivedBy: "ADMIN",
      payMode: "UPI",
      status: "PAID",
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
      ledgerAccount: "",
      recoveryType: "All",

      planType: "All",
      paymentType: "All",
      applicationNo: "",
      paymentStatus: "All",

      staff: "",
      member: "",

      paymentDate: "",
      paymentStartDate: "",
      paymentEndDate: "",
    });

  };


  // =========================================================
  // RETURN
  // =========================================================

  return (

    <div className="collection-report-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="collection-report-header">

        <div>

          <h2>COLLECTION REPORT</h2>

          <p>
            Member collection reporting
          </p>

        </div>

      </div>


      {/* =====================================================
          FORM
      ===================================================== */}

      <CollectionReportForm

        filters={filters}

        onGetRecord={handleGetRecord}

        onReset={handleReset}

      />


      {/* =====================================================
          TABLE
      ===================================================== */}

      <CollectionReportTable

        data={collections}

      />

    </div>

  );
};

export default CollectionReport;