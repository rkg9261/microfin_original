import React, { useState } from "react";

import "./CibilReportExperian.css";

import CibilReportExperianTable from "./CibilReportExperianTable";

const CibilReportExperian = () => {

  // =========================================================
  // CIBIL REPORT DATA
  // =========================================================

  const [cibilData] = useState([
    {
      id: 1,
      name: "SUMIT KUMAR",
      mobile: "9407359196",
      pancard: "ABCDE1234F",
      date: "08/27/2026",
      creditReportLink: "https://experian.com/report/10001",
      creditScore: 742,
      status: "COMPLETED",
    },

    {
      id: 2,
      name: "RAHUL SHARMA",
      mobile: "9876543210",
      pancard: "FGHIJ5678K",
      date: "08/26/2026",
      creditReportLink: "https://experian.com/report/10002",
      creditScore: 718,
      status: "COMPLETED",
    },

  

  ]);


  return (

    <div className="cibil-report-experian-page">


      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="cibil-report-experian-header">

        <h2>
          CIBILREPORTEXPERIAN
        </h2>

      </div>


      {/* =====================================================
          FILTER SECTION
      ===================================================== */}

      <div className="cibil-report-experian-filter-card">

        <div className="cibil-report-experian-filter-title">

          FILTER BY

        </div>


        {/* Empty filter area as shown in screenshot */}

        <div className="cibil-report-experian-filter-content">

        </div>

      </div>


      {/* =====================================================
          CIBIL TABLE
      ===================================================== */}

      <CibilReportExperianTable
        data={cibilData}
      />


    </div>

  );

};

export default CibilReportExperian;