import React, { useState } from "react";
import "./CibilReportEquifax.css";

import CibilReportEquifaxForm from "./CibilReportEquifaxForm";
import CibilReportEquifaxTable from "./CibilReportEquifaxTable";

const CibilReportEquifax = () => {

  // =========================================================
  // FILTER STATE
  // =========================================================

  const [filters, setFilters] = useState({
    branch: "",
    member: "",
    status: "",
    startDate: "",
    endDate: "",
    date: "",
  });

  // =========================================================
  // SHOW RECORDS
  // =========================================================

  const [showRecords, setShowRecords] = useState(false);

  // =========================================================
  // EQUFAX DATA
  // =========================================================

  const [equifaxData] = useState([
    {
      id: 1,
      name: "SUMIT KUMAR",
      branch: "KOLKATA - DALHOUSIE",
      idProof: "ABCDE1234F",
      date: "08/27/2026",
      address: "KOLKATA, WEST BENGAL",
      creditScore: 742,
      status: "COMPLETED",
    },

    {
      id: 2,
      name: "RAHUL SHARMA",
      branch: "BRANCH M FINANCE",
      idProof: "FGHIJ5678K",
      date: "08/26/2026",
      address: "KOLKATA, WEST BENGAL",
      creditScore: 718,
      status: "COMPLETED",
    },

    {
      id: 3,
      name: "PRIYA DEVI",
      branch: "ADITYAPUR",
      idProof: "LMNOP9012Q",
      date: "08/25/2026",
      address: "JAMSHEDPUR, JHARKHAND",
      creditScore: 685,
      status: "COMPLETED",
    },

    {
      id: 4,
      name: "SUNIL KUMAR",
      branch: "SHREEJA GROUP",
      idProof: "RSTUV3456W",
      date: "08/24/2026",
      address: "PATNA, BIHAR",
      creditScore: 654,
      status: "PENDING",
    },

    {
      id: 5,
      name: "NEHA SINGH",
      branch: "KOLKATA - DALHOUSIE",
      idProof: "XYZAB7890C",
      date: "08/23/2026",
      address: "KOLKATA, WEST BENGAL",
      creditScore: 731,
      status: "COMPLETED",
    },

    {
      id: 6,
      name: "AJAY KUMAR",
      branch: "BRANCH M FINANCE",
      idProof: "PQRSX4567Y",
      date: "08/22/2026",
      address: "HOWRAH, WEST BENGAL",
      creditScore: 698,
      status: "COMPLETED",
    },

    {
      id: 7,
      name: "SANJU ROY",
      branch: "ADITYAPUR",
      idProof: "TUVWX1234Z",
      date: "08/21/2026",
      address: "JAMSHEDPUR, JHARKHAND",
      creditScore: 721,
      status: "PENDING",
    },
  ]);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  // =========================================================
  // GET RECORD
  // =========================================================

  const handleGetRecord = (formData) => {

    setFilters(formData);

    setShowRecords(true);

  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {

    setFilters({
      branch: "",
      member: "",
      status: "",
      startDate: "",
      endDate: "",
      date: "",
    });

    setShowRecords(false);

  };

  // =========================================================
  // FILTER DATA
  // =========================================================

  const filteredData = equifaxData.filter((item) => {

    const branchMatch =
      !filters.branch ||
      item.branch === filters.branch;

    const memberMatch =
      !filters.member ||
      item.name
        .toLowerCase()
        .includes(filters.member.toLowerCase());

    const statusMatch =
      !filters.status ||
      item.status === filters.status;

    return (
      branchMatch &&
      memberMatch &&
      statusMatch
    );

  });

  // =========================================================
  // RETURN
  // =========================================================

  return (

    <div className="cibil-equifax-page">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="cibil-equifax-header">

        <div>

          <h2>CIBILREPORTEQUIFAX</h2>

        </div>

      </div>


      {/* =====================================================
          FORM
      ===================================================== */}

      <CibilReportEquifaxForm
        filters={filters}
        onChange={handleChange}
        onGetRecord={handleGetRecord}
        onReset={handleReset}
      />


      {/* =====================================================
          TABLE
      ===================================================== */}

      <CibilReportEquifaxTable
        data={showRecords ? filteredData : []}
      />

    </div>

  );

};

export default CibilReportEquifax;