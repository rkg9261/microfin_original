import React, { useState } from "react";
import "./DueEmiReport.css";

import DueEmiReportForm from "./DueEmiReportForm";
import DueEmiReportTable from "./DueEmiReportTable";

const DueEmiReport = () => {

  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    date: "",
    branch: "",
    designation: "",
    staff: "",
  });

  // =========================================================
  // DUE EMI DATA
  // =========================================================

  const [dueEmis] = useState([
    {
      id: 1,
      loanId: "LN10001",
      memberName: "AJAY KUMAR",
      memberCode: "MEM001",
      mobile: "9876543210",
      type: "MONTHLY",
      collectionCenter: "CENTER A",
      emiDate: "08/27/2026",
      dues: 2,
      emi: 2500,
      status: "DUE",
    },

    {
      id: 2,
      loanId: "LN10002",
      memberName: "RAHUL SHARMA",
      memberCode: "MEM002",
      mobile: "9876543211",
      type: "MONTHLY",
      collectionCenter: "CENTER B",
      emiDate: "08/27/2026",
      dues: 1,
      emi: 1800,
      status: "DUE",
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
      date: "",
      branch: "",
      designation: "",
      staff: "",
    });

  };

  // =========================================================
  // RETURN
  // =========================================================

  return (

    <div className="due-emi-report-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="due-emi-report-header">

        <div>

          <h2>DUE EMI REPORT</h2>

          <p>
            Member due EMI reporting
          </p>

        </div>

      </div>


      {/* =====================================================
          FORM
      ===================================================== */}

      <DueEmiReportForm

        filters={filters}

        onGetRecord={handleGetRecord}

        onReset={handleReset}

      />


      {/* =====================================================
          TABLE
      ===================================================== */}

      <DueEmiReportTable
        data={dueEmis}
      />

    </div>

  );
};

export default DueEmiReport;